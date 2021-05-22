require('./judger.rb')

class JavaJudger < Judger

  def initialize
    super
    @compile_name = 'a.java'
    @run_name = 'Main'

    compiler = `realpath $(which javac)`.strip
    @compile_command = "#{compiler} #{@compile_name}"
    runner = `realpath $(which java)`.strip
    @run_command = "#{runner} #{@run_name}"
  end

  def submit(code)
    self.save(code, @compile_name)
    #self.compile(@compile_command)
    self.run(@run_command)
  end
  
end

if __FILE__ == $0
  code = %q{
  class Main {
    public static void main(String[] args) {
      System.out.println(1);
    }
  }
}
  judger = JavaJudger.new
  p judger.submit(code)
end
