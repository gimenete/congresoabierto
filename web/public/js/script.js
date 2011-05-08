$(document).ready(function(){
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
	loadImages()

});


	var fighter;
	var fighters = [];

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
			.animate({left:'0px'}, 500)
			.animate({left:'200px'}, 500)
			.animate({left:'0px'}, 500);
			
		$('#fighter1 img')
			.animate({left:'-100px', top:'-200px'}, 250)
			.animate({left:'-200px', top:'0px'}, 250)
			.animate({left:'0px'}, 500)
			.animate({top:'-200px'}, 500)
			.animate({top:'0px'}, 500);
		
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
	
	function talk(str){
		$('<iframe />').attr('width','0').attr('src', 'http://vozme.com/text2voice.php?lang=es&interface=full&gn=ml&text=' + str).appendTo('body'); 
	}
	
	function loadImages() {
		var slides_cointainer = $('#slides_cointainer')
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
		$('#fighter'+fighter+' .avatar img').attr('src', '/avatars/hulk/'+diputados[i].id+'.jpg')
		$('#fighter'+fighter+' h2').text(diputados[i].nombre)

		talk('diputado o diputada ' + diputados[i].nombre + '... a darse de leches!')
				
		var enabled = canFight()
		if(enabled) {
			$('#fightbutton').show();
		} else {
			$('#fightbutton').hide();
		}

		$('#select_fighter').slideUp();
		return false
	}

