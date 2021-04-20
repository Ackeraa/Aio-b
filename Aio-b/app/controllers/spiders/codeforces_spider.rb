#Need to be removed maybe.
require('httparty')
require('open-uri')
require('nokogiri')
require('mechanize')

class Spider

  def initialize
    @username = "test_for_aio"
    @password = "test_for_aio_"
    @agent = Mechanize.new
  end

  def login
    page = @agent.get("http://codeforces.com/enter")
    form = page.form(:id => 'enterForm')
    form.handleOrEmail = @username
    form.password = @password
    page = @agent.submit(form)

  end

  def spide_problems(n = nil)
    response = HTTParty.get("http://codeforces.com/api/problemset.problems")
    origin_problems = JSON.parse(response.body, { symbolize_names: true })[:result][:problems]
    origin_problems.slice!(n..) if not n.nil?
    problems = []
    origin_problems.reverse_each do |problem| 
      problems << { :vid => problem[:contestId].to_s + problem[:index],
                    :name => problem[:name], :source => "codeforces" }
    end
    problems
  end

  def get_limit(text, s)
    a = text.css("div.header div." + s).text.strip
    b = text.css("div.header div." + s + " div.property-title").text.strip
    a.sub(b, "").to_i
  end

  def pre_process(s)
    s.to_s.gsub("$$$", "$")
          .gsub("$$", "$")
          .gsub("&", "\\")
          .gsub(/\$\w\$/) { |c| "${" + c[1] + "}$" }
          .gsub(/\<br\>/) { |c| "<br/>" }
  end

  def spide_problem(vid)
    split_vid = vid.split(/(\d+)/, 2)
    url = "https://codeforces.com/problemset/problem/#{split_vid[1]}/#{split_vid[2]}"  
    html = open(url)
    page = Nokogiri::HTML(html)

    text = page.css("div.problem-statement")
    problem = {}

    name = pre_process(text.css("div.title")[0].text)[3..]
    time_limit = get_limit(text, "time-limit")
    memory_limit = get_limit(text, "memory-limit")
    description = pre_process(text.children[1].css("p"))
    input = pre_process(text.css("div.input-specification p")) 
    output = pre_process(text.css("div.output-specification p"))
    sample_text = text.css("div.sample-tests div.sample-test pre")
    samples = []
    i = 0
    begin
      samples.push({:sample_input => pre_process(sample_text[i]),
                    :sample_output => pre_process(sample_text[i + 1]) })
      i += 2
    end while i < sample_text.size
    hint = pre_process(text.css("div.note").children[1..])
    problem = { name: name, time_limit: time_limit, memory_limit: memory_limit, description: description,
               input: input, output: output, samples: samples, hint: hint }
  end

  def get_status
    response = HTTParty.get("http://codeforces.com/api/user.status?" +
                       "handle=#{@username}&from=1&count=1")
    result = JSON.parse(response.body, { symbolize_names: true })[:result][0]

    id = result[:id]
    verdict = result[:verdict]
    time = result[:timeConsumedMillis]
    memory = result[:memoryConsumedBytes] / 1000
    passed_test_count = result[:passedTestCount]

    return id, verdict, time, memory, passed_test_count
  end

  def submit(problem_id, language, code)
    login
    @last_id, b, c, d, e = self.get_status 
    page = @agent.get("http://codeforces.com/problemset/submit")
    form = page.form(:class => 'submit-form')
    form.submittedProblemCode = problem_id
    form.programTypeId = language 
    form.source = code.squish
    puts "--------------------------------"
    puts problem_id, language, code
    page = @agent.submit(form)
    if page.uri.to_s[-5..] != "my=on"
      return "Failed, you have submitted the same code as before"
    end

    is_started = false
    while true
      id, verdict, time, memory, passed_test_count = self.get_status
      if id != @last_id and verdict != "TESTING" and verdict != nil
        if verdict == "OK"
            return "OK - Passed #{passed_test_count} tests" 
        else
            return "#{verdict} on test #{passed_test_count}" 
        end
      elsif verdict == "TESTING" and (not is_started)
        is_started = true
      end
      sleep 0.5
    end
  end
end

if __FILE__ == $0
  spider = Spider.new
  spider.login
end
