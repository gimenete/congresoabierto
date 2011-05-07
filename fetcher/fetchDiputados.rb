#abredatos 2011
#T49
#fetch all diputados from congress url

require 'rubygems'
require 'open-uri'
require 'hpricot'

@outputbasepath="/Users/ivanloire/Dropbox/Projects/abredatos2011/rawData/diputados/"

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
while iddiputado < upperlimit do
  url = "http://www.congreso.es/portal/page/portal/Congreso/Congreso/Diputados/BusqForm?_piref73_1333155_73_1333154_1333154.next_page=/wc/fichaDiputado&idDiputado=#{iddiputado}"
  
  #parse diputado
  html=fetch_html_from_url(url)
  #p html
  
  #save_response("test.html",html)
  doc = Hpricot(html)      
  
  nombredip=doc.search("//div[@class='nombre_dip']").inner_text
  p nombredip

  diputadopor=sanitize(doc.search("//div[@class='texto_dip']/ul/li[1]/div[1]").inner_text)
  p diputadopor
  
  grupo=doc.search("//div[@class='texto_dip']/ul/li[1]/div[2]/a").inner_text
  p grupo
      
  iddiputado=iddiputado+1   
  p iddiputado
  
  p "-----------------------" 
end

p iddiputado
  
  
  

