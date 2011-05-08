var fight_punchStart;
var fight_punchEnd;
var fight_style_sufix;

function punchAttackLeftToRight(){
	fight_punchStart = "150px";
	fight_punchEnd = "600px";
	fight_style_sufix = "_right";
	punchAttact();
}

function punchAttackRightToLeft(){
	fight_punchStart = "600px";
	fight_punchEnd = "150px";
	fight_style_sufix = "_left";
	punchAttact();
}

function punchAttact(){
	
	var punch = $("<img src='/img/punch.gif' class='punch" + fight_style_sufix + "'/>");
	
	punch.appendTo('#fighter0');
	punch.css("left",fight_punchStart).css("top","200px");
	punch.animate({left: fight_punchEnd, top: "100px"}, 400)
		 
		 .animate({left: fight_punchStart, top: "220px"}, 1)
		 .animate({left: fight_punchEnd, top: "220px"}, 400)
		 
		 .animate({left: fight_punchStart, top: "240px"}, 1)
		 .animate({left: fight_punchEnd, top: "340px"}, 400)
		 .animate({opacity: 0.0},1, multiplePunchAttact);
}

var multiplePunchAttacks = 0;
function multiplePunchAttact(){
	multiplePunchAttacks++;
	
	punch1(empty);
	punch2(empty);
	
	if (multiplePunchAttacks <= 3)
		punch3(multiplePunchAttact);
	else 
		punch3(rumbleLosser);	
}

function rumbleLosser(){
	var imgloser=loser.find('img')
	imglosser.css("opacity", "0.5")
	imgloser.jrumble({ rumbleEvent: 'constant'});
}

function empty(){}

function punch1(callback){
	punch("200px", "100px", callback);
}

function punch2(callback){
	punch("220px", "220px", callback);	
}

function punch3(callback){
	punch("240px", "340px", callback);
}

function punch(start_top, end_top, callback){
	var punch = $("<img src='/img/punch.gif' class='punch" + fight_style_sufix + "'/>");
	punch.appendTo('#fighter0');
	punch.css("left",fight_punchStart).css("top",start_top).css("opacity","0.0");
	punch.animate({opacity: 1}, {queue: false, duration: 200})
		 .animate({left: fight_punchEnd, top: end_top}, {queue: false, duration: 400})
		 .animate({opacity: 1}, 300)
		 .animate({opacity: 0.0}, 100, callback);
}
