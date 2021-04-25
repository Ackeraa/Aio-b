#Need to be removed maybe.
require('httparty')
require('open-uri')
require('nokogiri')
require('./atcoder_dispatcher.rb')

class Spider

  def spide_languages
    user, spider = AtcoderDispatchher.instance.target_distribute(:none) 
    login(user, spider)
    page = spider.get('https://atcoder.jp/contests/agc001/tasks/agc001_a')
    languages = page.xpath('//*[@id="select-lang"]/select').css('option')
        .reject { |option| option.text.nil? || option.text.empty? }
        .map do |option|
          {
            id: option.attributes['value']&.value || nil,
            value: option.text
          }
        end 
  end

  def spide_problems(n = nil)
    problems = []
    i = 1
    begin
      url = "https://atcoder.jp/contests/archive?page=#{i}"
      page = Nokogiri::HTML(open(url))
      links = page.css('tbody tr').map { |tr| tr.css('td a')[1]['href'] }
      links.each do |link| 
        url = "https://atcoder.jp#{link}/tasks"
        page = Nokogiri::HTML(open(url))
        page.css('tbody tr').each do |tr| 
          problems << {
            vid: tr.css('td a')[1]['href'].split('/').last,
            name: tr.css('td a')[1].text,
            source: 'atcoder'
          }
        end
      end
      i += 1
    end until links.empty?
    problems
  end

  def spide_problem
    replace = -> (s) do
      s.to_s
       .gsub("<var>", "$")
       .gsub("</var>", "$")
       .gsub(/\$\w\$/) { |c| "${" + c[1] + "}$" }
    end

    url = 'https://atcoder.jp/contests/abc196/tasks/abc196_d'
    page = Nokogiri::HTML(open(url))
    problem = {}

    t_m = page.xpath('//*[@id="main-container"]/div[1]/div[2]/p')
              .text.strip.gsub(/[^0-9]/, ' ').split
    time_limit = t_m[0].to_i
    memory_limit = t_m[1].to_i
    description = page.xpath('//*[@id="task-statement"]/span/span[2]/div[1]/section/p')
    hint = page.xpath('//*[@id="task-statement"]/span/span[2]/div[2]/section/ul')
    input = page.xpath('//*[@id="task-statement"]/span/span[2]/div[3]/div[1]/section').children[2..]
    output = page.xpath('//*[@id="task-statement"]/span/span[2]/div[3]/div[2]/section').children[2..]

    i = 4
    samples = []
    begin
      sample_input = page.xpath("//*[@id='task-statement']/span/span[2]/div[#{i}]/section")
        .children[2]
      sample_output = page.xpath("//*[@id='task-statement']/span/span[2]/div[#{i + 1}]/section")
        .children[2]
      sample_hint = page.xpath("//*[@id='task-statement']/span/span[2]/div[#{i + 1}]/section")
        .children[3..]
      samples << {
        sample_input: sample_input,
        sample_output: sample_output,
        sample_hint: sample_hint
      }.each_value.map{ |x| replace.call(x) }
      i += 2
    end until sample_input.nil?

    problem = {
      time_limit: time_limit,
      memory_limit: memory_limit,
      description: description,
      input: input,
      output: output,
      samples: samples,
      hint: hint
    }.each_value.map{ |x| Array == x ? x : replace.call(x) }
  end

  def submit(problem_id, language, code, user = nil)
    is_system = user.nil?
    # Use user's account if provided, otherwise system's.
    if is_system
      # Could add language as a key to improve concurrency, but not necessary for now.
      user, spider, spider_id = AtcoderDispatcher.instance.distribute(:system, problem_id)
    else
      spider = AtcoderDispatcher.instance.distribute(:user, user)
    end

    tries = 0
    begin
      page = spider.get("https://atcoder.jp/contests/#{problem_id.split('_').first}/tasks/#{problem_id}")
      form = page.form(class: 'form-horizontal form-code-submit')
      raise RuntimeError, "Not Login" unless form
      form.field_with(name: 'data.LanguageId').value = language
      form.sourceCode = code
      page = spider.submit(form)
      raise RuntimeError, "Redirected" if page.uri.to_s[-2..] != "me"
    rescue RuntimeError => e
      puts e
      tries += 1
      e.to_s == "Not Login"? login(user, spider) : sleep(2)
      return { result: "Submit Failed" if tries == TRYS }
      retry
    end

    i = 1
    url = page.uri.to_s
    while true
      submit_time_div = page.css('tbody tr').find do |tr|
        tr.css('td a')[0]['href'].split('/').last == problem_id and
          tr.css('td')[2].text.delete(' ') == user[:username]
      end
      break unless submit_time_div.nil?
      i += 1
      page = spider.get(url + "?page=#{i}")
    end
    submit_time = submit_time_div.css('td')[0].text

    # Recycle system account after got the submit time.
    if is_system
      AtcoderDispatcher.instance.recycle(:system, spider_id, problem_id)
    end
    get_result(user[:username], problem_id, submit_time)
  end

  private

    def login(user, spider)
      puts "Login......"
      page = spider.get('https://atcoder.jp/login')
      form = page.form(:class => 'form-horizontal' )
      form.username = user[:username]
      form.password = user[:password]
      page = spider.submit(form)
      puts "Login Successful"
    end

    def get_result(username, problem_id, submit_time)
      _, spider = AtcoderDispatcher.instance.distribute(:none)
      url = "https://atcoder.jp/contests/#{problem_id.split('_').first}/submissions?"\
              "f.Status=&f.Task=#{problem_id}&f.User=#{username}"
      tries = 0
      while true
        tries += 1 
        i = 1
        page = spider.get(url + "&page=#{i}")
        while true
          status = page.css('tbody tr')
            .find{ |tr| tr.css('td')[0].text == submit_time }
          break unless status.nil?
          i += 1
          page = spider.get(url + "&page=#{i}")
        end
        break unless status.css('td')[6].text == 'WJ'
        sleep 0.5
        return { result: "Submit Failed" } if tries == TRYS
      end

      status.instance_eval{ |tr| tr.css('td') }
        .map{ |td| td.text }
        .instance_eval do |td|
          {
            :submit_time => td[0],
            :score => td[4],
            :code_size => td[5],
            :result => td[6],
            :time_usage => td[6] == 'CE' ?  nil : td[7],
            :memory_usage => td[6] == 'CE' ? nil : td[8]
          }
        end
    end

end

if __FILE__ == $0
  threads = []
  start = Time.now
  5.times { |i|
    threads << Thread.new {
      spider = Spider.new
      puts spider.submit("agc00#{1}_a", '4003', 1)
    }
  }
  threads.each(&:join)
  puts Time.now - start
end
