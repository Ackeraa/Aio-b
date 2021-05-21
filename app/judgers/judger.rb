require('./dispatcher.rb')

class Judger

  def initialize(compiler, code)
    @box = Dispatcher.instance.distribute
    @box_path = "/var/local/lib/isolate/#{@box}/box"
    @data_path = "."
    @complier = compiler
    @code = code
  end
  
  def compile
    system "echo #{@code} > #{@box_path}/a"
    result = `isolate -b #{@box} -p --full-env --run -- /usr/bin/#{@compiler} a`
  end

  def run
    datas = `ls #{data_path} | wc -l`
    result = []
    (0...datas).each do |i|
      input = "#{@data_path}/in/#{i}.in"
      output = "#{@box_path}/out/#{i}.out"
      std_output = "#{@data_path}/out/#{i}.out"
      system "isolate -b #{@box} --std_out=#{output} --run -- ./a.out<#{input}"
      result << `diff #{std_output} #{output}`
    end
    result
  end

  def upzip(filename)
    system 'mkdir in out && unzip -q 1.zip && mv *.in in && mv *.out out'
  end

  def clean
    system = 'rm -r in out'
  end

end

if __FILE__ == $0
  grader = Grader.new
  #grader.upzip('2')
  grader.compile
  p grader.run
  #grader.clean() 
end
