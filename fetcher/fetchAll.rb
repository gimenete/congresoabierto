#abredatos 2011
#T49
#fetch all sessions from congress url

require 'rubygems'
require 'open-uri'
require 'hpricot'

@outputbasepath="/Users/ivanloire/Dropbox/Projects/abredatos2011/rawData"

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
  save_response(name,fetch_html_from_url(url))
end



page = 0
upperlimit=2
while page < upperlimit do
  from=page
  to=page + 10
  urllist = "http://www.congreso.es/portal/page/portal/Congreso/Congreso/Iniciativas?_piref73_2148295_73_1335437_1335437.next_page=/wc/servidorCGI&CMD=VERLST&CONF=BRSPUB.cnf&BASE=PUW9&FMT=PUWTXLTS.fmt&DOCS=#{from}-#{to}&DOCORDER=FIFO&OPDEF=Y&QUERY=%28D%29.PUBL.+%26+%28CONGRESO%29.SECC."
  listhtml=fetch_html_from_url(urllist)

  #parse list of links with hpricot
  doc = Hpricot(listhtml)
  
  doc.search( "//div[@class='resultados_encontrados']/p/a" ).each do |link|
    puts link[:href]
  end
    
  page=page+1    
end
  
  
  





