require('./dispatcher.rb')

class Judger

  def initialize
    @box = 0#Dispatcher.instance.distribute
    @box_path = "/var/local/lib/isolate/#{@box}/box"
    @data_path = "."
  end
  
  def save(code, name)
    path = "#{@box_path}/#{name}"
    File.write(path, code)
  end

  def compile(command)
    result = `isolate -b #{@box} -p --full-env --run -- #{command}`
  end

  def run(command)
    datas = `ls #{@data_path}/in | wc -l`.to_i
    result = []
    (1..datas).each do |i|
      std_input = "#{@data_path}/in/#{i}.in"
      std_output = "#{@data_path}/out/#{i}.out"
      user_output = "#{@box_path}/out/#{i}.out"
      system "isolate -b #{@box} --full-env --run -- #{command}<#{std_input}>#{user_output}"

      result << `diff #{std_output} #{user_output}`.empty?
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
