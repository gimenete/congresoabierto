# coding: utf-8
#abredatos 2011
#T49

require 'rubygems'
require 'open-uri'
require 'hpricot'
#require 'redis'
require 'iconv'

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

@outputbasepath="/Users/ivanloire/Dropbox/Projects/abredatos2011/rawData/images/"
@baseurl="http://www.congreso.es"

iddiputado=1
upperlimit=20

#redis = Redis.new

while iddiputado < upperlimit do
  url = @baseurl + "/portal/page/portal/Congreso/Congreso/Diputados/BusqForm?_piref73_1333155_73_1333154_1333154.next_page=/wc/fichaDiputado&idDiputado=#{iddiputado}"
  
  p "fetching images  for id=#{iddiputado}..."
  html=fetch_html_from_url(url)
  
  doc = Hpricot(html)      
    
  nombredip_element=doc.search("//div[@class='nombre_dip']")
  if (!nombredip_element.nil?)
    foto=doc.search("//div[@id='datos_diputado']/p[1]/img")[0]
    #p foto[:src]
    fotourl=@baseurl + foto[:src]
    p fotourl 
    
    #queue foto
    url_processing="http://ope-api.pho.to/queued.php?key=1FBJMVRPFW81ACRG168LIHZRPY2K&result_size=800&methods_list=collage:template_name=coal&image_url=#{fotourl}&result_format=jpg&thumb1_size=200&thumb2_size=100"
    html=fetch_html_from_url(url_processing)
    p html
    responsefromserver = Hpricot(html)  
    idresponse=responsefromserver.search("//request_id").inner_text
    p "idresponse: #{idresponse}"
    
    #first response from server
    url_reply="http://ope-api.pho.to/get-result.php?request_id=#{idresponse}"
    html=fetch_html_from_url(url_reply)
    p html
    responsefromserver = Hpricot(html)  
    status=responsefromserver.search("//status").inner_text
    if (status=="InProgress")
      p "in progress..."
    else
      image=responsefromserver.search("//result_url").inner_text
      p "result url: #{image}"
      p "---------------------------------------------------------"
      #p html    

      image=fetch_html_from_url(image)
      save_response("#{iddiputado}.jpg", image)
      
      iddiputado=iddiputado+1  
    end
  else
    p "Diputado not found at id=#{iddiputado}"
  end
end

p iddiputado
  
  
  

