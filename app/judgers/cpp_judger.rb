require('./judger.rb')

class CppJudger < Judger

  def initialize
    super
    @compile_name = 'a.cpp'
    compiler = `realpath $(which g++)`.strip
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
  judger = CppJudger.new
  p judger.submit(code)
end
