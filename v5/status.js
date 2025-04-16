//------------------ status ------------------



function statusUpdate(){
	let s;
	
	s = "fps: " + fps + "<br/>" +
		"player: x:"+(parseInt(player.x*100)/100)+"  y:"+(parseInt(player.y*100)/100) + " z:"+ (parseInt(player.z*100)/100) + "<br/>" +
		"player.ang: " + (parseInt(player.ang*100)/100)+"rad | "+parseInt((player.ang/TWO_PI)*360)+" graus" + "<br/>" +
		"mouse: "+mouse_x+","+mouse_y + " | " + mouse_b + " last: "+mouse_last_x+","+mouse_last_y + "<br/>"+
		"info: x:"+document.getElementById("info").offsetLeft+" y;"+document.getElementById("info").offsetTop+"<br/>"+
		"transform.lastValue:"+transform.lastValue+"<br/>"+
		"transform.enable:"+transform.enable+"<br/>"+
		"transform.editing:"+transform.editing+"<br/>"+
		"transform.move:"+transform.move+"<br/>"+
		"transform.activeInput:"+transform.activeInput+"<br/>"+
		"transform.activeProperty:"+transform.activeProperty+"<br/>"+
		"frame_onclick:"+frame_onclick;
	
	document.getElementById("status").innerHTML = s;
}



//------------------ status ------------------