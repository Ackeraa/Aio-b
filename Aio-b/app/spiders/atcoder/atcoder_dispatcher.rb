require('singleton')

module Atcoder
  class AtcoderDispatcher < Dispatcher
    include Singleton

    def initialize
      data = [
        { username: 'test_for_aio', password: 'test_for_aio_0' },
        { username: 'test_for_aio2', password: 'test_for_aio_0' },
        { username: 'test_for_aio3', password: 'test_for_aio_0' },
        { username: 'test_for_aio4', password: 'test_for_aio_0' },
        { username: 'test_for_aio5', password: 'test_for_aio_0' },
      ]
      super(0.5, 40, data)    
    end
  end
end

if __FILE__ == $0
  threads = []
  1000.times {
    threads << Thread.new {
      user, spider, spider_id = AtcoderDispatcher.instance.distribute(:system, 1)
      sleep(2)
      AtcoderDispatcher.instance.recycle(:system, spider_id, 1)
    }
  }
  threads.each(&:join)
end
