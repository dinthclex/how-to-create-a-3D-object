//------------------------------ input ------------------------------



//----------- mouse -----------

//----------- mouse -----------



//----------- teclado -----------
var keys = { left:false, right:false, up:false, down:false,
			 w:false, s:false, a:false, d:false };
			 

			 
function keyboardInit(){
	window.addEventListener("keydown", keyDownFunc);
	window.addEventListener("keyup", keyUpFunc);
}

function keyDownFunc(event){
	event.preventDefault();
	
	let k = event.key;
	// setas
		 if(k == "ArrowLeft"){  keys.left  = true; }
	else if(k == "ArrowRight"){ keys.right = true; }
		 if(k == "ArrowUp"){    keys.up    = true; }
	else if(k == "ArrowDown"){  keys.down  = true; }
	// wasd
		 if(k == "a"){ keys.a = true; }
	else if(k == "d"){ keys.d = true; }
		 if(k == "w"){ keys.w = true; }
	else if(k == "s"){ keys.s = true; }
}
function keyUpFunc(event){
	event.preventDefault();
	
	let k = event.key;
	// setas
		 if(k == "ArrowLeft"){  keys.left  = false; }
	else if(k == "ArrowRight"){ keys.right = false; }
		 if(k == "ArrowUp"){    keys.up    = false; }
	else if(k == "ArrowDown"){  keys.down  = false; }
	// wasd
		 if(k == "a"){ keys.a = false; }
	else if(k == "d"){ keys.d = false; }
		 if(k == "w"){ keys.w = false; }
	else if(k == "s"){ keys.s = false; }
}
//----------- teclado -----------



//------------------------------ input ------------------------------