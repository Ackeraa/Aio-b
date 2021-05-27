module Poj
  class PojSpider

    def spide_languages
      spider, account = PojDispatcher.instance.distribute(:any) 
      login(spider, account)
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
      url = "http://poj.org/problemlist"
      page = Nokogiri::HTML(URI.open(url))
      total = page.xpath('/html/body/center').css('a').size
      (1..total).each do |i|
        puts "spide problems from poj page #{i}"
        page.css('table')[4].children[2..]
          .each do |tr|
            problems << {
              vid: tr.css('td')[0].text,
              name: tr.css('td')[1].text,
              source: 'poj'
            } unless tr.text.strip.empty?
          end
        url = "http://poj.org/problemlist?volume=#{i + 1}"
        page = Nokogiri::HTML(URI.open(url))
      end
      problems.last
    end

    def spide_problem(problem_id)
      r = -> s do
        s.to_s
         .gsub("<var>", "$")
         .gsub("</var>", "$")
         .gsub("≦", " \\le ")
         .gsub('&', '\\')
         .gsub(/\$\w\$/) { |c| "${" + c[1] + "}$" }
      end

      url = "http://poj.org/problem?id=#{problem_id}"
      page = Nokogiri::HTML(URI.open(url))
      problem = {}

      t_m = page.css('div.plm tr')[0].text
              .strip.gsub(/[^0-9]/, ' ').split
      time_limit = t_m[0].to_i
      memory_limit = t_m[1].to_i

      description = page.css('div.ptx')[0].text
      input = page.css('div.ptx')[1].text
      output = page.css('div.ptx')[2].text
      sample_input = page.css('pre')[0].text
      sample_output = page.css('pre')[1].text

      samples = [
        {
          sample_input: sample_input,
          sample_output: sample_output,
        }
      ]
      problem = {
        time_limit: time_limit,
        memory_limit: memory_limit,
        description: description,
        input: input,
        output: output,
        samples: samples,
      }
    end

    def submit(problem_id, language, code, account = nil)
      spider, account, spider_id = PojDispatcher.instance.distribute(account)

      url = "https://atcoder.jp/contests/#{problem_id.split('_').first}/tasks/#{problem_id}"
      begin
        page = spider.get(url)
        form = page.form(class: 'form-horizontal form-code-submit')
        raise RuntimeError, "Not Login" unless form
        form.field_with(name: 'data.LanguageId').value = language
        form.sourceCode = code
        page = spider.submit(form)
        raise RuntimeError, "Redirected" if page.uri.to_s[-2..] != "me"
      rescue RuntimeError => e
        puts e
        e.to_s == "Not Login"? login(spider, account) : sleep(2)
        retry
      end
      submission_id = page.css('tbody tr')[0].css('td a').last['href'].split('/').last

      PojDispatcher.instance.recycle(spider_id || account)

      get_submission(problem_id, submission_id)
    end

    private

      def login(spider, account)
        puts "Login......"
        page = spider.get('https://atcoder.jp/login')
        form = page.form(:class => 'form-horizontal' )
        form.username = account[:name]
        form.password = account[:password]
        page = spider.submit(form)
        puts "Login Successful"
      end

      def get_submission(problem_id, submission_id)
        url = "https://atcoder.jp/contests/#{problem_id.split('_').first}/submissions/#{submission_id}"
        while true
          page = Nokogiri::HTML(URI.open(url))
          result = page.css('table tr')[6].css('td').last.text
          break unless result == 'WJ'
          sleep 0.5
        end
        record = page.css('table tr').map{ |x| x.css('td').text }
        submission = {
          #submit_time: record[0],
          #score: record[4],
          code_size: record[5],
          result: record[6],
          time_usage: record[6] == 'CE' ?  nil : record[7],
          memory_usage: record[6] == 'CE' ? nil : record[8]
        }
      end
  end
end

if __FILE__ == $0
  threads = []
  start = Time.now
  1.times { |i|
    threads << Thread.new {
      spider = AtcoderSpider.new
      #puts spider.submit("agc00#{1}_a", '4003', 1)
      spider.spide_problem("agc001_c")
    }
  }
  threads.each(&:join)
  puts Time.now - start
end
