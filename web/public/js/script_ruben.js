function punch1(){
	punch("punch1", "200px", "100px");
}

function punch2(){
	punch("punch2", "220px", "220px");	
}

function punch3(){
	punch("punch3", "240px", "340px");
}

function punch(class, start_top, end_top){
	var punch = $("<img src='/img/punch.gif' class='" + class + "'/>");
	punch.appendTo('#fighter0');
	punch.css("left","200px").css("top",start_top).css("opacity","0.0");
	punch.animate({opacity: 1}, {queue: false, duration: 200})
		 .animate({left: '700px', top: end_top}, {queue: false, duration: 600})
		 .animate({opacity: 1}, 300)
		 .animate({opacity: 0.0}, 100);
}

function multi_punch1(){
	punch1(); 
	punch2();
	punch3();
	$("#fighter1 .avatar").jrumble({ rumbleEvent: 'constant'});
}
