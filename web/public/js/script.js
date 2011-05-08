$(document).ready(function(){
 loadImages()
 loadParties()

  var currentPosition = 0;
  var slideWidth = 130;
  var slides = $('.mini_fighter');
  var numberOfSlides = slides.length;

  // Remove scrollbar in JS
  $('#slides_cointainer').css('overflow', 'hidden');

  // Wrap all .slides with #slideInner div
  slides
    .wrapAll('<div id="slideInner"></div>')
    // Float left to display horizontally, readjust .slides width
	.css({
      'float' : 'left',
      'width' : slideWidth
    });

  // Set #slideInner width equal to total width of all slides
  $('#slideInner').css('width', slideWidth * numberOfSlides);

  // Insert controls in the DOM
  $('#slideshow')
    .prepend('<span class="control" id="leftControl">Ver m&aacute;s diputados</span>')
    .append('<span class="control" id="rightControl">Ver m&aacute;s diputados</span>');

  // Hide left arrow control on first load
  manageControls(currentPosition);

  // Create event listeners for .controls clicks
  $('.control')
    .bind('click', function(){
    // Determine new position
	currentPosition = ($(this).attr('id')=='rightControl') ? currentPosition+1 : currentPosition-1;

	// Hide / show controls
    manageControls(currentPosition);
    // Move slideInner using margin-left
    $('#slideInner').animate({
      'marginLeft' : slideWidth*(-currentPosition)
    });
  });

  // manageControls: Hides and Shows controls depending on currentPosition
  function manageControls(position){
    // Hide left arrow if position is first slide
	if(position==0){ $('#leftControl').hide() } else{ $('#leftControl').show() }
	// Hide right arrow if position is last slide
    if(position==numberOfSlides-1){ $('#rightControl').hide() } else{ $('#rightControl').show() }
  }

  //hide default info box
  for (i=0;i<2;i++){	
		var info_container = $('#info'+i)
		info_container.hide('slow')
  }	

});

	var winner, loser;
	var fighter;
	var fighters = [];
	var type = 0
	var types = ['hulk', 'golum', 'rambo', 'yoda', 'boxer', 'goalkeeper', 'zeus', 'soldier', 'superman', 'ironman', 'darthvader', 'terminator','simpson','pirateofthecaribbean','ilikemoney']


	function flash() {
		$('#fullscreen').height($(document).height()).width($(document).width()).fadeIn(100).fadeOut(200)
		return false
	}

    
	function animatefight(){
			// var offset = $('#fighter0 img').offset();
			$('#fighter0 img')
				.animate({left:'100px', top:'-200px'}, 250)
				.animate({left:'200px', top:'0px'}, 250)
				.animate({left:'0px'}, 250)
				.animate({left:'200px'}, 250)
				.animate({left:'100px', top: '-50px'}, 250)
				.animate({left:'0px', top: '0px'}, 250)
				.animate({left:'100px', top:'-200px'}, 250)
				.animate({left:'200px', top:'0px'}, 250)
				.animate({left:'0px', top: '0px'}, 250,fightfetchdata)

			$('#fighter1 img')
				.animate({left:'-100px', top:'-200px'}, 250)
				.animate({left:'-200px', top:'0px'}, 250)
				.animate({left:'0px', top:'-50px'}, 125)
				.animate({left:'0px', top:'0px'}, 125)
				.animate({top:'-100px'}, 250)
				.animate({top:'0px', left:'0px'}, 250)
				.animate({left:'-100px', top:'-200px'}, 250)
				.animate({left:'-200px', top:'0px'}, 250)
				.animate({top:'0px', left:'0px'}, 250)
	}    


	function chooseFighterById(_id) {
		for (var i=0; i < diputados.length; i++) {
			if(diputados[i].id === _id) {
				chooseFighter(i)
				console.log('choose fighter = '+i+', '+_id)
			}
		}
	}
	
	$.address.change(function(event) {
		var tokens = event.value.split('/')
		if(tokens.length < 4)
			return
		var id1 = tokens[2]
		if(fighters[0] === undefined || fighters[0].id !== id1) {
			fighter = 0
			chooseFighterById(id1)
		}
		
		var id2 = event.value.split('/')[3]
		if(fighters[1] === undefined || fighters[1].id !== id2) {
			fighter = 1
			chooseFighterById(id2)
		}
	})

	function fightfetchdata(){
			$.getJSON('/fight/'+fighters[0].id+'/'+fighters[1].id, function(data) {
				console.log(data)
				for (i=0;i<2;i++){	
					var info_container = $('#info'+i)
					console.log(i)
					info_container.empty()
					info_container.append('<div>Puntuación:<span>' + data[i].puntuacion + '</span></div>')
					info_container.append('<div>Intervenciones:<span>' + data[i].intervenciones + '</span></div>')
					info_container.append('<div>Palabras:<span>' + data[i].palabras + '</span></div>')					
					
					for (key in data[i]) {
						if (key.indexOf('p_', 0) === 0) {
							info_container.append('<div>'+key.substring(2, 3).toUpperCase()+key.substring(3)+': <span>'+data[i][key]+'</span></div>')
						}
					}												
				}
					
				if (data[0].puntuacion > data[1].puntuacion)
				{
					punchAttackLeftToRight()
					winner=$('#fighter0')
					loser=$('#fighter1')
				}
				else{
					punchAttackRightToLeft()				
					winner=$('#fighter1')
					loser=$('#fighter0')					
				}					
				
				setTimeout(function(){
					winner.css('background-color','yellow')
					winner.append('<img class=winner src=/img/winner.png>')	
					for (i=0;i<2;i++){	
						var info_container = $('#info'+i)
						info_container.show('slow')
					}										
				},3000);

			});
	}

	function fight() {
		for (i=0;i<2;i++){	
				var info_container = $('#info'+i)
				info_container.hide()
		}
		
		if(canFight()) {
			flash()
			setTimeout(function(){
				animatefight()				
			},2000);	
		}
		else{
			alert('Imposible comenzar la lucha!')
		}
			
		//score
		//talk('menuda somanta palos le ha dao diputada 1 a diputada 2')

		return false;
	}

	function loadImagesByGroup(grupo) {
		var slides_cointainer = $('#slides_cointainer')
		slides_cointainer.empty();
		for (var i=0; i < diputados.length; i++) {
			if ((diputados[i].grupobreve==grupo) || (grupo=='')){
					var img = $('<img src="'+diputados[i].foto+'" />')
					var div = $('<div class="mini_fighter left"></div>')
					div.append(img)
					slides_cointainer.append(div)

					var func = function(k) {
						return function(){
							chooseFighter(k)
						}
					}(i)
					div.click(func)
			}
		}
	}
	
	function clean(s) {
		var r=s.toLowerCase();
		r = r.replace(new RegExp(/[àáâãäå]/g),"a");
		r = r.replace(new RegExp(/æ/g),"ae");
		r = r.replace(new RegExp(/ç/g),"c");
		r = r.replace(new RegExp(/[èéêë]/g),"e");
		r = r.replace(new RegExp(/[ìíîï]/g),"i");
		r = r.replace(new RegExp(/ñ/g),"n");                
		r = r.replace(new RegExp(/[òóôõö]/g),"o");
		r = r.replace(new RegExp(/œ/g),"oe");
		r = r.replace(new RegExp(/[ùúûü]/g),"u");
		r = r.replace(new RegExp(/[ýÿ]/g),"y");
		r = r.replace(new RegExp(/\W/g),"");
		return r;
	}
	
	$('#autocomplete').keyup(function() {
		$('#parties select').val('')
		var slides_cointainer = $('#slides_cointainer')
		slides_cointainer.empty();
		var text = clean($('#autocomplete').val())
		for (var i=0; i < diputados.length; i++) {
			if (clean(diputados[i].nombre).indexOf(text) >= 0){
				var img = $('<img src="'+diputados[i].foto+'" />')
				var div = $('<div class="mini_fighter left"></div>')
				div.append(img)
				slides_cointainer.append(div)

				var func = function(k) {
					return function(){
						chooseFighter(k)
					}
				}(i)
				div.click(func)
			}
		}
		
		if(slides_cointainer.children().size() === 0) {
			loadImages();
		}
	})

	function talk(str){
		//$('<iframe />').attr('width','0').attr('src', 'http://vozme.com/text2voice.php?lang=es&interface=full&gn=ml&text=' + str).appendTo('body'); 
	}
	
	function loadParties() {
		var parties = {}
		for (var i=0; i < diputados.length; i++) {
			parties[diputados[i].grupobreve] = ''
		}
		var combo = $('#parties select')
		combo.append('<option value="">Todos</option>')
		for (key in parties) {
			combo.append('<option value="'+key+'">'+key+'</option>')
		}
		combo.change(function() {
			$('#autocomplete').val('')
			loadImagesByGroup($(this).val())
		})
	}
	
	function loadImages() {
		var slides_cointainer = $('#slides_cointainer')
		slides_cointainer.empty();
		
		for (var i=0; i < diputados.length; i++) {
			var img = $('<img src="'+diputados[i].foto+'" />')
			var div = $('<div class="mini_fighter left"></div>')
			div.append(img)
			slides_cointainer.append(div)
		
			var func = function(k) {
				return function(){
					chooseFighter(k)
				}
			}(i)
			div.click(func)
		}
	}

	function showFightChooser(fig) {
		fighter = fig
		
		// if($('#slides_cointainer div.mini_fighter').size() === 0) loadImages()
		
		$('#select_fighter').slideDown()
	}

	function canFight() {
		return fighters[0] !== undefined && fighters[1] !== undefined
	}

	function chooseFighter(i) {

		fighters[fighter] = diputados[i]
		// $('#fighter'+fighter+' .avatar img').attr('src', diputados[i].foto)
		$('#fighter'+fighter+' .avatar img').attr('src', 'http://www.congresoabierto.com/avatars/'+types[type]+'/'+diputados[i].id+'.jpg')
		$('#fighter'+fighter+' h2').text(diputados[i].nombre)
 		$('#fighter'+fighter+' h3').text(diputados[i].grupobreve)

		talk('luchador diputado, ' + diputados[i].nombre.split(',')[1] + ', al rinj!')

		type = type + 1
		if (type >= types.length) { type = 0 }
		console.log(type)

		var enabled = canFight()
		console.log('enabled = '+enabled)
		
		if(enabled) {
			$('#fightbutton').show();
		} else {
			$('#fightbutton').hide();
		}

		$('#select_fighter').slideUp(function() {
			$('#autocomplete').val('')
			$('#parties select').val('')
			loadImages()
		});
		
 		$('#info0').hide()
 		$('#info0').empty()
 		$('#info1').hide()
 		$('#info1').empty()
		
		return false
	}



