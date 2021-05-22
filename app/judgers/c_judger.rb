require('./judger.rb')

class CJudger < Judger

  def initialize
    super
  end

  def submit(code)
    self.save(code, 'a.c')
    self.compile('gcc a.c')
    self.run('./a.out')
  end
  
end

if __FILE__ == $0
  code = %q{
    #include <stdio.h>
    int main()
    {
      printf("1\n");
    }
  }
  judger = CJudger.new
  judger.submit(code)
end
