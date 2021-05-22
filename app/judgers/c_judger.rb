require('./judger.rb')

class CJudger < Judger

  def initialize
    super
    @compile_name = 'a.c'
    compiler = `realpath $(which gcc)`.strip
    @compile_command = "#{compiler} #{@compile_name}"
    @run_command = './a.out'
  end

  def submit(code)
    self.save(code, @compile_name)
    self.compile(@compile_command)
    self.run(@run_command)
  end
  
end

if __FILE__ == $0
  code = %q{
    #include <stdio.h>
    int main()
    {
      int n;
      scanf("%d", &n);
      printf("%d\n", n);
    }
  }
  judger = CJudger.new
  p judger.submit(code)
end
