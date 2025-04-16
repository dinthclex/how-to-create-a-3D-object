var player;

function playerInit(){
	player = {
	x: 300,
	y: SCREEN_HEIGHT/2,
	z: 100,
	ang: 0,
	spd: 1,
	rSpd: 0.01
};
}

function tickPlayer(){ // update player position
	let ver=0, hor=0, ang=0, pa=0, push=0, dx=0, dy=0;
		 if(keys.left){  player.ang -= player.rSpd; }
	else if(keys.right){ player.ang += player.rSpd; }
	
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
		dx = player.spd*Math.cos(ang); dy = player.spd*Math.sin(ang);
		player.z += dx;
		player.x += dy;
		push = 0;
	}
}

function drawPlayer(){
	//FOV =  (30/360)*TWO_PI + ( (40/360)*TWO_PI ) * Math.abs(Math.sin( (Date.now()/10000)*TWO_PI ));
	//HALF_FOV = FOV/2;
	//FOCAL_LENGTH = (SCREEN_WIDTH/2)/Math.tan(HALF_FOV);
	
	drawAxes("zx", player.z, player.x, player.ang, 50, 2*50, 50, 50);
	drawPlayer2("dynamic");
	
	drawAxes("zx", GLOBAL_Z_AXIS, GLOBAL_X_AXIS, 0, 300, 2*300, 300, 300);
	drawPlayer2("static");
}

function drawPlayer2(typ){
	let c = document.getElementById("background");
	let ctx = c.getContext("2d");
	let d=FOCAL_LENGTH, ang1=0,r1=0,x1=0,y1=0, ang2=0,r2=0,x2=0,y2=0;
	let px, py, pa;
	
	if(typ=="static"){ px=GLOBAL_Z_AXIS; py=GLOBAL_X_AXIS; pa=0;          }
	else {             px=player.z;      py=player.x;      pa=player.ang; }//dynamic
	
	//posição do player
	ctx.fillStyle = "Orange";
	ctx.beginPath();
	ctx.arc(px, py, 5, 0, TWO_PI, false);
	ctx.fill();
	
	//direção do player
	ctx.strokeStyle = "Green";
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.moveTo(px, py);
	ctx.lineTo(px+d*Math.cos(pa), py+d*Math.sin(pa));
	ctx.stroke();
	/*//Espaço de Projeção
	ctx.strokeStyle = "LightGray";
	ang1 = ( (179/2)/360 )*TWO_PI;
	r1 = d/Math.cos(ang1);
	ang2 = pa - ang1;
	x1 = r1*Math.cos(ang2);
	y1 = r1*Math.sin(ang2);
	r2 = d/Math.cos(ang1);
	ang2 = pa + ang1;
	x2 = r2*Math.cos(ang2);
	y2 = r2*Math.sin(ang2);
	ctx.beginPath();
	ctx.moveTo(px+x1, py+y1);
	ctx.lineTo(px+x2, py+y2);
	ctx.stroke();*/
	//lateral esquerda (P1, r1, x1, y1)
	r1 = d/Math.cos(HALF_FOV);
	ang1 = pa - HALF_FOV;
	x1 = r1*Math.cos(ang1);
	y1 = r1*Math.sin(ang1);
	//P1 (x1, y1)
	ctx.fillStyle = "Black";
	ctx.beginPath();
	ctx.arc(px+x1, py+y1, 3, 0, TWO_PI, false);
	ctx.fill();
	//r1
	ctx.strokeStyle = "Gray";
	ctx.beginPath();
	ctx.moveTo(px, py);
	ctx.lineTo(px+x1, py+y1);
	ctx.stroke();
	//lateral direita (P2, r2, x2, y2)
	r2 = d/Math.cos(HALF_FOV);
	ang2 = pa + HALF_FOV;
	x2 = r2*Math.cos(ang2);
	y2 = r2*Math.sin(ang2);
	//P2 (x2, y2)
	ctx.fillStyle = "Black";
	ctx.beginPath();
	ctx.arc(px+x2, py+y2, 3, 0, TWO_PI, false);
	ctx.fill();
	//r2
	ctx.strokeStyle = "Gray";
	ctx.beginPath();
	ctx.moveTo(px, py);
	ctx.lineTo(px+x2, py+y2);
	ctx.stroke();
	//screen (linha de P1 até P2)
	ctx.strokeStyle = "SlateBlue";
	ctx.beginPath();
	ctx.moveTo(px+x1, py+y1);
	ctx.lineTo(px+x2, py+y2);
	ctx.stroke();
	//FOV
	ctx.strokeStyle = "Red";
	ctx.beginPath();
	ctx.arc(px, py, 20, pa-HALF_FOV, pa+HALF_FOV, false);
	ctx.stroke();
}


