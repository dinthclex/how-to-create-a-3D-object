//------------------ status ------------------



function statusUpdate(){
	let s;
	
	s = "fps: " + fps + "<br/>" +
		"player: x:"+(parseInt(player.x*100)/100)+"  y:"+(parseInt(player.y*100)/100) + " z:"+ (parseInt(player.z*100)/100) + "<br/>" +
		"player.ang: " + (parseInt(player.ang*100)/100)+"rad | "+parseInt((player.ang/TWO_PI)*360)+" graus" + "<br/>" +
		" QUARTER_PI: " + QUARTER_PI + "<br/>";
	
	document.getElementById("status").innerHTML = s;
}



//------------------ status ------------------