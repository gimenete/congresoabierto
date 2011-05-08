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

function punchAttact(){
	var punch = $("<img src='/img/punch.gif' class='punch1'/>");
	//var punch1 = $("<img src='/img/punch.gif' class='punch2'/>");
	//var punch2 = $("<img src='/img/punch.gif' class='punch3'/>");
	
	punch.appendTo('#fighter0');
	punch.css("left","150px").css("top","200px").css("opacity","0.0");
	punch.animate({opacity: 1}, 50)
		 .animate({left: '700px', top: "100px"}, 400)
		 .animate({opacity: 0.0}, 50)
		 
		 .animate({left: "150px", top: "220px"}, 1)
		 .animate({opacity: 1}, 50)
		 .animate({left: '700px', top: "220px"}, 400)
		 .animate({opacity: 0.0}, 50)
		 
		 .animate({left: "150px", top: "240px"}, 1)
		 .animate({opacity: 1}, 50)
		 .animate({left: '700px', top: "340px"}, 400)
		 .animate({opacity: 0.0}, 50)
}
