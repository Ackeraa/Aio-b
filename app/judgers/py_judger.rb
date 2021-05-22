require('./judger.rb')

class PyJudger < Judger

  def initialize
    super
  end

  def submit(code)
    self.save(code, 'a.py')
    self.run('python3 a.py')
  end
  
end

if __FILE__ == $0
  code = %q{
    n = input()
    print(n)
  }
  judger = CJudger.new
  judger.submit(code)
end
