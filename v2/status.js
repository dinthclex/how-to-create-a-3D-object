//------------------ status ------------------



function statusFunc(){
	let s;
	
	s = "     fps: " + fps + "<br/>" + 
		"  fpsNow: " + fpsNow + "<br/>" + 
		"fpsCount: " + fpsCount;
	
	document.getElementById("status").innerHTML = s;
}



//------------------ status ------------------