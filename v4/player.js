var player;

//x:645 y:128 z:89 ang:(-23/360)*TWO_PI
//x:604 y:128 z:74 ang:(328/360)*TWO_PI
function playerInit(){
	player = {
	x: 500,
	y: SCREEN_HEIGHT/2,
	z: 90,
	ang: 0,
	spd: 1,
	rSpd: 0.01
};
}

function tickPlayer(){ // update player position
	let ver=0, hor=0, ang=0, pa=0, push=0, dx=0, dy=0, dt=deltaTime/4;
		 if(keys.left){  player.ang -= player.rSpd*dt; }
	else if(keys.right){ player.ang += player.rSpd*dt; }
	
	pa = player.ang;
	if(keys.w){ ver=1; } else if(keys.s){ ver=-1; } else { ver=0; }
	if(keys.d){ hor=1; } else if(keys.a){ hor=-1; } else { hor=0; }
	if(ver && hor){
			 if(ver== 1 && hor==-1){ ang = pa + 7*QUARTER_PI; } // w com a
		else if(ver== 1 && hor== 1){ ang = pa + 1*QUARTER_PI; } // w com d
		else if(ver==-1 && hor==-1){ ang = pa + 5*QUARTER_PI; } // s com a
		else if(ver==-1 && hor== 1){ ang = pa + 3*QUARTER_PI; } // s com d
		push=1;
	} else if(ver){ // 'somente w' ou 'somente s'
		if(ver==1){ ang = pa + 0*QUARTER_PI; } // somente w
		else {      ang = pa + 4*QUARTER_PI; } // somente s
		push=1;
	} else if(hor){ // 'somente d' ou 'somente a'
		if(hor==1){ ang = pa + 2*QUARTER_PI; } // somente d
		else {      ang = pa + 6*QUARTER_PI; } // somente a
		push=1;
	}
	
	if(push){
		dx = player.spd*Math.cos(ang)*dt; dy = player.spd*Math.sin(ang)*dt;
		player.z += dx;
		player.x += dy;
		push = 0;
	}
}

function drawPlayer(){
	let c = document.getElementById("background");
	let ctx = c.getContext("2d");
	let d=100;
	
	//posição do player
	ctx.fillStyle = "Black";
	ctx.beginPath();
	ctx.arc(player.z, player.x, 3, 0, TWO_PI, false);
	ctx.fill();
	
	//direção do player
	ctx.strokeStyle = "Orange";
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.moveTo(player.z, player.x);
	ctx.lineTo(player.z+d*Math.cos(player.ang), player.x+d*Math.sin(player.ang));
	ctx.stroke();
	
	drawAxes("zx", player.z, player.x, player.ang, 50, 2*50, 50, 50);
}






