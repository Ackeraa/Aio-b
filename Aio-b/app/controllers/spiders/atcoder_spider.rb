require('open-uri')
require('nokogiri')

class AtcoderSpider

  def initialize
  end

  def pre_process(s)
    s.to_s.gsub("<var>", "$").gsub("</var>", "$")
  end
  def spide_problem
    url = "https://atcoder.jp/contests/abc183/tasks/abc183_e"
    html = open(url)
    doc = Nokogiri::HTML(html)

    text = doc.css("div.col-sm-12")
    problem = {}

    t_m = text.css("p")[0].text.strip.gsub(/[^0-9]/, ' ').split
    time_limit = t_m[0].to_i
    memory_limit = t_m[1].to_i
    description = pre_process(text.css("span.lang-en div.part")[0].css("p"))
    hint = pre_process(text.css("span.lang-en div.part")[1].css("ul"))
    input = pre_process(text.css("span.lang-en div.io-style div.part section")[0])
    output = pre_process(text.css("span.lang-en div.io-style div.part section")[1]) 
    sample = pre_process(text.css("span.lang-en div.part")[2..].css("section"))

    problem = {time_limit: time_limit, memory_limit: memory_limit, description: description,
               input: input, output: output, sample: sample, hint: hint }
    problem
  end
end
