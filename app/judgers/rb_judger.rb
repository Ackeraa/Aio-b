require('./judger.rb')

class RbJudger < Judger

  def initialize
    super
    @run_name = 'a.rb'
    runner = `realpath $(which ruby)`.strip
    @run_command = "#{runner} #{@run_name}"
  end

  def submit(code)
    self.save(code, @run_name)
    self.run(@run_command)
  end
  
end

if __FILE__ == $0
  code = %q{
  p 2
}
  judger = RbJudger.new
  p judger.submit(code)
end
