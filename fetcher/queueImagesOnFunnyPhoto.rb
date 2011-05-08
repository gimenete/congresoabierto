# coding: utf-8
#abredatos 2011
#T49

require 'rubygems'
require 'open-uri'
require 'hpricot'
require 'iconv'

def logerror (text)
   File.open(@outputbasepath + "error.txt", 'a') do |f|
      f.puts text
   end
end

def save_response (fullpath, response)
   File.open(fullpath, 'w') do |f|
      f.puts response
   end
   p "saving image to #{fullpath}"
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


@upperlimit=400 #max id diputado

def process_template(template)
  p "processing template #{template}..."
  
  iddiputado=1
  currentid_processing=0
    
  directory_name = @outputbasepath + template
  if !FileTest::directory?(directory_name)
    Dir::mkdir(directory_name)
  end
  
  while iddiputado < @upperlimit do
    
    #if file image doesn't exist
    imagefile=directory_name + "/" + iddiputado.to_s + ".jpg"
    if (File.exist?(imagefile))
      p "image #{imagefile} exists. skipping..."
      iddiputado=iddiputado+1  
    else
      url = @baseurl + "/portal/page/portal/Congreso/Congreso/Diputados/BusqForm?_piref73_1333155_73_1333154_1333154.next_page=/wc/fichaDiputado&idDiputado=#{iddiputado}"

      p "fetching images  for id=#{iddiputado}..."
      html=fetch_html_from_url(url)

      doc = Hpricot(html)        
      
      nombredip_element=doc.search("//div[@class='nombre_dip']")

      if (!nombredip_element.nil?)
        foto=doc.search("//div[@id='datos_diputado']/p[1]/img")[0]
        if (!foto.nil?)        
          fotourl=@baseurl + foto[:src]
          p fotourl     

          if (currentid_processing!=iddiputado) #in progress
            #queue foto
            url_processing="http://ope-api.pho.to/queued.php?key=1FBJMVRPFW81ACRG168LIHZRPY2K&result_size=800&methods_list=collage:template_name=#{template}&image_url=#{fotourl}&result_format=jpg&thumb1_size=200&thumb2_size=100"
            html=fetch_html_from_url(url_processing)
            #p html
            idresponse=Hpricot(html).search("//request_id").inner_text
            p "idresponse: #{idresponse}"      
          end


          #first response from server
          html=fetch_html_from_url("http://ope-api.pho.to/get-result.php?request_id=#{idresponse}")
          #p html
          status=Hpricot(html).search("//status").inner_text
          if (status=="InProgress")
            p "in progress..."
            currentid_processing=iddiputado
          elsif (status=="Error")
            p "error..."
            logerror("error processing #{iddiputado}. Error: #{status}")        
            iddiputado=iddiputado+1  
            currentid_processing=0
          else #ok, fetch image
            image=Hpricot(html).search("//result_url").inner_text
            p "result url: #{image}"
            image=fetch_html_from_url(image)
            save_response(imagefile, image)

            iddiputado=iddiputado+1  
            currentid_processing=0
          end
          p "---------------------------------------------------------"    
      else
          p "photo not found"
          iddiputado=iddiputado+1  
      end
      else
        p "Diputado not found at id=#{iddiputado}"
      end #end nombredip no nulo
    end
  end #end while
end

if (ARGV[0])
  @outputbasepath=ARGV[0]
  p "using custom path: #{ARGV[0]}"
end


if (ARGV[1]=="2")
  process_template("yoda")
  process_template("boxer")
  process_template("goalkeeper")
  process_template("zeus")
elsif (ARGV[1]=="3")
  process_template("soldier")
  process_template("superman")
  process_template("terminator")
  process_template("simpson")  
else
  process_template("hulk")
  #process_template("coal")
  process_template("golum")
  process_template("avatar")
  process_template("rambo")
  process_template("yoda")
  process_template("boxer")
  process_template("goalkeeper")
  process_template("zeus")
  process_template("soldier")
  process_template("superman")
  process_template("terminator")
  process_template("simpson")
end


  
  
  

