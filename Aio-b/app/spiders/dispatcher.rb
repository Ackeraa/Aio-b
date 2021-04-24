require('mechanize')

class Dispatcher

  def initialize(gap_time = 0.5, wait_time = 60, data)
    @gap_time = gap_time
    @wait_time = wait_time
    @system_resources = Array.new(data.length) { |i| [data[i], Mechanize.new, 0] } 
    @user_resources = Hash.new
    @queue = Hash.new 
    @mutex = Mutex.new
  end

  def distribute(target, *arg)
    if target == :user
      user = arg[0]
      return @user_resources[user] if @user_resources.has_key?(user)
      @user_resources[user] = Mechanize.new
      return @user_resources[user]
    elsif target == :system
      mission_id = arg[0]
      come_time = Time.now
      @mutex.synchronize do
        sleep 4
        while true do
          (0...@system_resources.length).each do |resource_id|
            process = { resource_id: resource_id, mission_id: mission_id }
            unless @queue.has_key?(process)
              @queue[process] = 1
              @system_resources[resource_id][2] += 1
              res0 = @system_resources[resource_id][0]
              res1 = @system_resources[resource_id][1]
              @system_resources.sort!{ |a, b| a[2] <=> b[2] } 
              return res0, res1, resource_id
            end
          end
          return false if Time.now - come_time > @wait_time
          sleep @gap_time
        end
      end
    elsif target == :none
      return @system_resources[0][0], Mechanize.new
    end
  end

  def recycle(target, *arg)
    if target == :user
      @user_resources.delete({ user: arg[0] })
    elsif target == :system
      @queue.delete({ resource_id: arg[0], mission_id: arg[1] })
    elsif target == :none
     # do nothing 
    end
  end

end
