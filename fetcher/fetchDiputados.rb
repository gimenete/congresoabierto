# coding: utf-8

#abredatos 2011
#T49
#fetch all diputados from congress url
require 'rubygems'
require 'open-uri'
require 'hpricot'
require 'redis'
require 'iconv'

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
  
  #ic = Iconv.new('UTF-8', 'WINDOWS-1252')
  #ic = Iconv.new('UTF-8', 'UTF-8')
  #response = ic.iconv(response + ' ')[0..-2]
  response
end


def fetch_and_save_document (url, name)   
  p url
  save_response(name,fetch_html_from_url(url))
end

def normalize_name (name)  
  name=sanitize(name)
  name=ParseSignos(name)
  name=QuitaAcentos(name)
  name=name.downcase
end

#sanitize  
def ParseSignos(str)
  str=str.gsub(",","")
  str=str.gsub(".","")
  str=str.gsub(" - ","-")
  #str=str.gsub("-"," ")
  str=str.gsub(" ","-")    
  str=str.strip
end

def QuitaAcentos (str)
  str=str.gsub("á","a").gsub("à","a").gsub("é","e").gsub("è","e").gsub("í","i").gsub("ì","i").gsub("ó","o").gsub("ò","o").gsub("ú","u").gsub("ù","u")
  str=str.gsub("Á","A").gsub("À","A").gsub("É","E").gsub("È","E").gsub("Í","I").gsub("Ì","I").gsub("Ó","O").gsub("Ò","O").gsub("Ú","U").gsub("Ù","U")
end
  
def sanitize(str)
  str.gsub("\r\n","").gsub("&nbsp;"," ").squeeze(" ").strip
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
    
  nombredip_element=doc.search("//div[@class='nombre_dip']")
  if (!nombredip_element.nil?)
    nombredip=nombredip_element.inner_text
    p nombredip

    nombrenormalizado=normalize_name(nombredip_element.inner_html)
    p nombrenormalizado
    
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
    redis.hmset "diputado:#{iddiputado}","nombre", nombredip, "nombrenormalizado", nombrenormalizado, "diputadopor", diputadopor, "grupo", grupo, "email", email, "www", www, "twitter", twitter, "foto", fotourl 
    redis.zadd "diputados", 0 , iddiputado  
    redis.hset "diputado:#{nombrenormalizado}", "id", iddiputado
  else
    p "Diputado not found at id=#{iddiputado}"
  end
end

p iddiputado
  
  
  

