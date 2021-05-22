require('./judger.rb')

class PyJudger < Judger

  def initialize
    super
    @compile_name = 'a.py'
    runner = `realpath $(which python3)`.strip
    @run_command = "#{runner} #{@compile_name}"
  end

  def submit(code)
    self.save(code, @compile_name)
    self.run(@run_command)
  end
  
end

if __FILE__ == $0
  code = %q{
n = input()
print(n)
}
  judger = PyJudger.new
  p judger.submit(code)
end
