//------------------------------ input ------------------------------



//----------- mouse -----------
var mouse_x;
var mouse_y;
var mouse_b;
window.addEventListener("mousemove", function(){
	let c = document.getElementById("background");
	mouse_x = event.pageX - c.offsetLeft;
	mouse_y = event.pageY - c.offsetTop;
});
window.addEventListener("mousedown", function(){
	mouse_b = event.buttons;
});
window.addEventListener("mouseup", function(){
	mouse_b = event.buttons;
});

//----------- mouse -----------



//----------- teclado -----------
var keys = { left:false, right:false, up:false, down:false,
			 w:false, s:false, a:false, d:false };
			 

			 
function inputInit(){
	//teclado
	window.addEventListener("keydown", keyDownFunc);
	window.addEventListener("keyup", keyUpFunc);
}

function keyDownFunc(event){
	event.preventDefault();
	
	let k = event.key.toLowerCase();
	// setas
		 if(k == "arrowleft"){  keys.left  = true; }
	else if(k == "arrowright"){ keys.right = true; }
		 if(k == "arrowup"){    keys.up    = true; }
	else if(k == "arrowdown"){  keys.down  = true; }
	// wasd
		 if(k == "a"){ keys.a = true; }
	else if(k == "d"){ keys.d = true; }
		 if(k == "w"){ keys.w = true; }
	else if(k == "s"){ keys.s = true; }
	
	if(k == "i"){
		if(infoTable !== undefined){ infoTable(); }
	}
}
function keyUpFunc(event){
	event.preventDefault();
	
	let k = event.key.toLowerCase();
	// setas
		 if(k == "arrowleft"){  keys.left  = false; }
	else if(k == "arrowright"){ keys.right = false; }
		 if(k == "arrowup"){    keys.up    = false; }
	else if(k == "arrowdown"){  keys.down  = false; }
	// wasd
		 if(k == "a"){ keys.a = false; }
	else if(k == "d"){ keys.d = false; }
		 if(k == "w"){ keys.w = false; }
	else if(k == "s"){ keys.s = false; }
}
//----------- teclado -----------



//------------------------------ input ------------------------------