require 'rubygems'
require 'redis'

redis = Redis.new

redis.hmset "diputado:108","prioridad", 1 #rajoy
redis.hmset "diputado:238","prioridad", 1 #rajoy
