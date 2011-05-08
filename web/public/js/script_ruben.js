function punch1(callback){
	punch("punch1", "200px", "100px", callback);
}

function punch2(callback){
	punch("punch2", "220px", "220px", callback);	
}

function punch3(callback){
	punch("punch3", "240px", "340px", callback);
}

function punch(class, start_top, end_top, callback){
	var punch = $("<img src='/img/punch.gif' class='" + class + "'/>");
	punch.appendTo('#fighter0');
	punch.css("left","200px").css("top",start_top).css("opacity","0.0");
	punch.animate({opacity: 1}, {queue: false, duration: 200})
		 .animate({left: '700px', top: end_top}, {queue: false, duration: 600})
		 .animate({opacity: 1}, 300)
		 .animate({opacity: 0.0}, 100, callback);
}

function punchAttact(){
	var punch = $("<img src='/img/punch.gif' class='punch1'/>");
	
	punch.appendTo('#fighter0');
	punch.css("left","150px").css("top","200px");
	punch.animate({left: '600px', top: "100px"}, 400)
		 
		 .animate({left: "150px", top: "220px"}, 1)
		 .animate({left: '600px', top: "220px"}, 400)
		 
		 .animate({left: "150px", top: "240px"}, 1)
		 .animate({left: '600px', top: "340px"}, 400, multiplePunchAttact);
}

function multiplePunchAttact(){
	punch1(empty);
	punch2(empty);
	punch3(rumbleLosser);
}

function rumbleLosser(){
	$("#fighter1 .avatar img").jrumble({ rumbleEvent: 'constant'});
}

function empty(){}
