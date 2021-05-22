require('./judger.rb')

class CppJudger < Judger

  def initialize(if_need_sandbox = true)
    super(if_need_sandbox)
  end
  
  def submit(*args)
    if args.size == 1
      # just text
      set_text_params
      p 1 
    elsif args.size == 3
      # normal submit
      set_normal_params
      code, time_limit, memory_limit = args

      self.save(code, @compile_name)
      compile_result = self.compile(@compile_command)
      return { result: :CE, error_message: compile_result } unless compile_result.empty?

      run_result = self.run(@run_command, time_limit, memory_limit * 1025)
    elsif args.size == 4
      # with spj
      set_spj_params
      code, spj_code, time_limit, memory_limit = args

      self.save(code, @compile_name)
      compile_result = self.compile(@compile_command)
      return { result: :CE, error_message: compile_result } unless compile_result.empty?

      self.save(spj_code, @spj_compile_name)
      spj_compile_result = self.compile(@compile_command)
      return { result: :SPJ_CE, error_message: spj_compile_result } unless spj_compile_result.empty?

      run_result = self.run(@run_command, @spj_run_command, time_limit, memory_limit * 1025)
    end
  end
  
  private

    def set_text_params
      @compare_name = 'a.txt'
    end

    def set_normal_params
      @compiler = `realpath $(which g++)`.strip
      @compile_name = 'a.cpp'
      @compile_command = "#{@compiler} #{@compile_name}"
      @run_command = './a.out'
    end

    def set_spj_params
      set_normal_params
      @spj_compile_name = 'spj.cpp'
      @spj_compile_command = "#{@compiler} #{@spj_compile_name}"
      @spj_run_command = './spj.out'
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
