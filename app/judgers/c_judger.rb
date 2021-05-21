class Grader

  def initialize

  end
  
  def compile
    box_id = 0
    result = `isolate -b #{box_id} -p --full-env --run -- /usr/bin/gcc a.c`
  end

  def run
    box_id = 0
    Dir.entries('./in')
      .reject { |f| File.directory? f }
      .each do |input| 
        output = input.split('.')[0] + '.out'
        system "isolate -b #{box_id} --run -- ./a.out<in/#{input}>#{output}"
        result = `diff out/#{output} #{output}`
        return :WA unless result.empty?
      end
    :AC
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
