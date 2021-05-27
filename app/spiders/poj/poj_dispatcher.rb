module Poj
  class PojDispatcher < Dispatcher
    include Singleton

    def initialize
      data = [
        { name: 'test_for_aio', password: 'test_for_aio_0' },
        { name: 'test_for_aio1', password: 'test_for_aio_0' },
        { name: 'test_for_aio2', password: 'test_for_aio_0' },
        { name: 'test_for_aio3', password: 'test_for_aio_0' },
        { name: 'test_for_aio4', password: 'test_for_aio_0' },
      ]
      super(0.5, 40, data)    
    end
  end
end

if __FILE__ == $0
  threads = []
  10.times {
    threads << Thread.new {
      user = {username: "a", password:"b"}
      spider = PojDispatcher.instance.distribute(user)
      puts spider
      sleep(2)
      PojDispatcher.instance.recycle(user)
    }
  }
  threads.each(&:join)
end
