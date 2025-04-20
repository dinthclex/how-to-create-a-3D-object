//------------------------------ input ------------------------------



//----------- mouse -----------
var mouse_x;
var mouse_y;
var mouse_b;
var mouse_last_x;
var mouse_last_y;
var mouse_down_x;
var mouse_down_y;
window.addEventListener("mousemove", function(){
	let c = document.getElementById("background");
	mouse_last_x = mouse_x;
	mouse_last_y = mouse_y;
	mouse_x = event.pageX - c.offsetLeft;
	mouse_y = event.pageY - c.offsetTop;
	transform.move = true;
});
window.addEventListener("mousedown", function(){
	let c = document.getElementById("background");
	mouse_last_x = mouse_x;
	mouse_last_y = mouse_y;
	mouse_x = event.pageX - c.offsetLeft;
	mouse_y = event.pageY - c.offsetTop;
	mouse_down_x = mouse_x;
	mouse_down_y = mouse_y;
	mouse_b = event.buttons;
});
window.addEventListener("mouseup", function(){
	let c = document.getElementById("background");
	mouse_last_x = mouse_x;
	mouse_last_y = mouse_y;
	mouse_x = event.pageX - c.offsetLeft;
	mouse_y = event.pageY - c.offsetTop;
	mouse_b = event.buttons;
	if(mouse_x==mouse_down_x && mouse_y==mouse_down_y){
		frame_onclick = true;
	}
	if(info.bar.enable){ info.bar.mouseUp = true; info.bar.enable = false; }
	if(transform.bar.enable){ transform.bar.mouseUp = true; transform.bar.enable = false; }
	if(statusTable.bar.enable){ statusTable.bar.mouseUp = true; statusTable.bar.enable = false; }
	if(transform.editing){ transform.mouseUp=true; if(mouse_x!=transform.lastMouseX || mouse_y!=transform.lastMouseY){ transform.editing=false; }  }
	
});

//----------- mouse -----------



//----------- teclado -----------
var keys = { left:false, right:false, up:false, down:false,
			 w:false, s:false, a:false, d:false, i:false, t:false, v:false, 
			 enter:false, esc:false };
			 

			 
function inputInit(){
	//teclado
	window.addEventListener("keydown", keyDownFunc);
	window.addEventListener("keyup", keyUpFunc);
	
}

function keyDownFunc(event){
	//event.preventDefault();
	
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
	
		 if(k == "i"){      keys.i     = true; }
	else if(k == "t"){      keys.t     = true; }
	else if(k == "v"){      keys.v     = true; }
	else if(k == "enter"){  keys.enter = true; }
	else if(k == "escape"){ keys.esc   = true; }
}
function keyUpFunc(event){
	//event.preventDefault();
	
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
	
		 if(k == "i"){      keys.i     = false; }
	else if(k == "t"){      keys.t     = false; }
	else if(k == "v"){      keys.v     = false; }
	else if(k == "enter"){  keys.enter = false; }
	else if(k == "escape"){ keys.esc   = false; }
}
//----------- teclado -----------



//------------------------------ input ------------------------------