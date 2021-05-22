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
      int n;
      scanf("%d", &n);
      printf("%d\n", n);
    }
  }
  judger = CJudger.new
  p judger.submit(code)
end
