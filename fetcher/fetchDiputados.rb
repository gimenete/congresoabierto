#abredatos 2011
#T49
#fetch all diputados from congress url
require 'rubygems'
require 'open-uri'
require 'hpricot'
require 'redis'

@outputbasepath="/Users/ivanloire/Dropbox/Projects/abredatos2011/rawData/diputados/"
@baseurl="http://www.congreso.es"

def save_response (filename, response)
   File.open(@outputbasepath + filename, 'w') do |f|
      f.puts response
   end
end


def fetch_html_from_url (url)
  response = ''
  open(url, "User-Agent" => "Ruby/#{RUBY_VERSION}",
      "From" => "email@addr.com",
      "Referer" => "http://www.abredatos.com/") { |f|
      response = f.read
  }
  response
end


def fetch_and_save_document (url, name)   
  p url
  save_response(name,fetch_html_from_url(url))
end


def sanitize(str)
  str.gsub("\r\n","").squeeze(" ").strip
end

iddiputado=1
upperlimit=500

redis = Redis.new
#redis = Redis.new(:host => "127.0.0.1", :port => 6380)    

while iddiputado < upperlimit do
  url = @baseurl + "/portal/page/portal/Congreso/Congreso/Diputados/BusqForm?_piref73_1333155_73_1333154_1333154.next_page=/wc/fichaDiputado&idDiputado=#{iddiputado}"
  
  #parse diputado
  p "fetching id=#{iddiputado}..."
  html=fetch_html_from_url(url)
  #p html
  
  #save_response("test.html",html)
  doc = Hpricot(html)      
    
  nombredip=doc.search("//div[@class='nombre_dip']").inner_text
  if (nombredip)
    p nombredip

    diputadopor=sanitize(doc.search("//div[@class='texto_dip']/ul/li[1]/div[1]").inner_text)
    p diputadopor

    grupo=doc.search("//div[@class='texto_dip']/ul/li[1]/div[2]/a").inner_text
    p grupo

    email=doc.search("//li[@class='correo_dip']/a").inner_text
    p email

    www=doc.search("//li[@class='webperso_dip']/a").inner_text
    p www

    twitter=""
    if (www.include? 'twitter.com')
      twitter="twitter TODO" #TODO
      p twitter   
    end

    foto=doc.search("//div[@id='datos_diputado']/p[1]/img")[0]
    #p foto[:src]
    fotourl=@baseurl + foto[:src]
    p fotourl 
    
    iddiputado=iddiputado+1   
    p iddiputado

    p "-----------------------" 
    
    #save to redis.
    redis.hmset "diputado:#{iddiputado}","nombre", nombredip, "diputadopor", diputadopor, "grupo", grupo, "email", email, "www", www, "twitter", twitter, "foto", foto 
    redis.lpush "diputados", iddiputado    
  end
end

p iddiputado
  
  
  

