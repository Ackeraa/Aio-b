require('./judger.rb')

class CppJudger < Judger

  def initialize
    super
    @compile_name = 'a.cpp'
    compiler = `realpath $(which g++)`.strip
    @compile_command = "#{compiler} #{@compile_name}"
    @run_command = './a.out'
  end

  def submit(code, time_limit, memory_limit)
    self.save(code, @compile_name)
    self.compile(@compile_command)
    self.run(@run_command, time_limit, memory_limit * 1024)
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
      while (1) {}
    }
  }
  judger = CppJudger.new
  p judger.submit(code, 1, 128)
end
