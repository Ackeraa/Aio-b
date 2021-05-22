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
    compile_result = self.compile(@compile_command)
    return { result: :CE, error_message: compile_result } unless compile_result.empty?
    run_result = self.run(@run_command, time_limit, memory_limit * 1025)
    return run_result
  end
  
end

if __FILE__ == $0
  code = %q{
    #include <stdio.h>
    int a[10000];
    int main()
    {
      int n;
      scanf("%d", &n);
      for (int i = -1; i < 1000; i++) a[i] = i;
      printf("%d\n", n / (n - 1));
    }
  }
  judger = CppJudger.new
  p judger.submit(code, 2, 20)
end
