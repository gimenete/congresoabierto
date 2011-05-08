$(document).ready(function(){
 loadImages()

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

});


	var fighter;
	var fighters = [];
	var type = 0
	var types = ['hulk', 'coal', 'golum', 'avatar', 'rambo', 'yoda', 'boxer', 'goalkeeper', 'zeus', 'soldier', 'superman']


	function flash() {
		$('#fullscreen').height($(document).height()).width($(document).width()).fadeIn(100).fadeOut(200)
		return false
	}

	function fight() {
		if(canFight()) {
			flash()
			$.getJSON('/fight/'+fighters[0].id+'/'+fighters[1].id, function(data) {
				console.log(data)
			});
		}
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
			.animate({left:'0px', top: '0px'}, 250)
			
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
		
		talk('menuda somanta palos le ha dado diputada 1 a diputada 2')
				
		return false;
	}
		
	function applyStyleGroup(group){
		var slides_cointainer = $('#slides_cointainer')
		if (group=='PP'){
			slides_cointainer.css('background-color','blue')			
		}
		else if (group=='PSOE'){
			slides_cointainer.css('background-color', 'red')			
		}
		else{
			slides_cointainer.css('background-color', 'white')			
		}
	}

	function loadImagesByGroup(grupo){	
		
		applyStyleGroup(grupo)
		
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
		r = r.replace(new RegExp(/\s/g),"");
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
		var slides_cointainer = $('#slides_cointainer')
		slides_cointainer.empty();
		var text = clean($('#autocomplete').val())
		for (var i=0; i < diputados.length; i++) {
			if (clean(diputados[i].nombre).indexOf(text, 0) > 0){
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
		$('<iframe />').attr('width','0').attr('src', 'http://vozme.com/text2voice.php?lang=es&interface=full&gn=ml&text=' + str).appendTo('body'); 
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
		
		console.log('choosen = '+i)
		// for (var i=0; i < diputados.length; i++) {
		// if(diputados[i].id === id ) {

		fighters[fighter] = diputados[i]
		// $('#fighter'+fighter+' .avatar img').attr('src', diputados[i].foto)
		$('#fighter'+fighter+' .avatar img').attr('src', '/avatars/'+types[type]+'/'+diputados[i].id+'.jpg')
		$('#fighter'+fighter+' h2').text(diputados[i].nombre)

		talk(diputados[i].nombre + ' al ring!')

		type = type + 1
		if (type >= types.length) { type = 0 }
		console.log(type)

		var enabled = canFight()
		if(enabled) {
			$('#fightbutton').show();
		} else {
			$('#fightbutton').hide();
		}

		$('#select_fighter').slideUp(function() {
			console.log('close')
			$('#autocomplete').val('')
			loadImages()
		});
		return false
	}

	function punch1(){
		var punch = $("<img src='/img/punch.gif' class='punch1'/>");
		punch.appendTo('#fighter0');
		punch.css("left","200px").css("top","300px").css("opacity","0.0");
		punch
			.animate({opacity: 1}, {queue: false, duration: 200})
			.animate({left: '700px', top: '100px'}, {queue: false, duration: 600})
			.animate({opacity: 1}, 300)
			.animate({opacity: 0.0}, 100);
	}


