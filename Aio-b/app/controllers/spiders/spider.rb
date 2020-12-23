require('open-uri')
require('nokogiri')

class Spider

  def initialize
  end
  def get_limit(text, s)
    a = text.css("div.header div." + s).text.strip
    b = text.css("div.header div." + s + " div.property-title").text.strip
    a.sub(b, "").to_i
  end

  def pre_process(s)
    s.to_s.gsub("$$$", "$")
  end

  def spide_problem
    url = "https://codeforces.com/problemset/problem/1456/E"
    html = open(url)
    doc = Nokogiri::HTML(html)

    text = doc.css("div.problem-statement")
    problem = {}

    name = pre_process(text.css("div.title")[0].text)[3..]
    time_limit = get_limit(text, "time-limit")
    memory_limit = get_limit(text, "memory-limit")
    description = pre_process(text.children[1])
    input = pre_process(text.css("div.input-specification p")) 
    output = pre_process(text.css("div.output-specification p"))
    sample_text = text.css("div.sample-tests div.sample-test pre")
    samples = []
    i = 0
    begin
      samples.push([pre_process(sample_text[i]), pre_process(sample_text[i + 1])])
      i += 2
    end while i < sample_text.size
    hint = pre_process(text.css("div.note").children[1..])
    problem = {name: name, time_limit: time_limit, memory_limit: memory_limit, description: description,
               input: input, output: output, samples: samples, hint: hint }
    problem
  end
end
