var camera;
var cameras;

function Camera(posx, posy, posz, rotx, roty, rotz){
	this.position = {x:posx, y:posy, z:posz };
	this.rotation = {x:rotx, y:roty, z:rotz };
	this.speed = 0.01;
}

function cameraInit(){
	camera = new Camera(0,0,0, 0,0,0);
	//vista de topo
	camera.topView = {x:800, y:0, z:950, ang:-HALF_PI}; //em um plano ZX (Z->x e X->y, ambos no canvas)
	//vista lateral (direita)
	camera.sideView = {x:0, y:600, z:1300, ang:0}; //em um plano ZY (Z->x e Y->y, ambos no canvas)
	
	cameras = [];
	cameras.push(camera);
}

function updateCameras(){
	camera.position.z = player.z;
	camera.position.x = player.x;
	camera.position.y = player.y;
	camera.rotation.y = player.ang;
}

function drawCameras(){
	//câmera movida pelo player
	if(info.originAxis===undefined || info.originAxis!==undefined&&info.originAxis){
		if(info.moveView.axis===undefined || info.moveView.axis!==undefined&&info.moveView.axis){
		drawAxes("zx", camera.position.z, camera.position.x, camera.rotation.y, 50, 2*50, 50, 50);
		}
	}
	drawCamera2D(camera.position.z, camera.position.x, camera.rotation.y, info.moveView.bits);
	
	//vista de topo
	let x,y,z,ang;
	x = camera.topView.x; y = camera.topView.y; z = camera.topView.z; ang = camera.topView.ang;
	if(info.originAxis===undefined || info.originAxis!==undefined&&info.originAxis){
		if(info.topView.axis===undefined || info.topView.axis!==undefined&&info.topView.axis){
		drawAxes("zx", z, x, ang, 50, 2*50, 50, 50);
		}
	}
	drawCamera2D(z, x, ang, info.topView.bits);
	
	//vista lateral (direita)
	x = camera.sideView.x; y = camera.sideView.y; z = camera.sideView.z; ang = camera.sideView.ang;
	if(info.originAxis===undefined || info.originAxis!==undefined&&info.originAxis){
		if(info.sideView.axis===undefined || info.sideView.axis!==undefined&&info.sideView.axis){
		drawAxes("zyX", z, y, ang, 50, 2*50, 50, 50);
		}
	}
	drawCamera2D(z, y, ang, info.sideView.bits);
	
}

function drawCamera2D(x, y, ang, en=0b11111111111){
	let c = document.getElementById("background");
	let ctx = c.getContext("2d");
	let d=FOCAL_LENGTH, ang1=0,r1=0,x1=0,y1=0, ang2=0,r2=0,x2=0,y2=0;
	let px, py, pa;
	
	let pos, fLen, pPlan, lPnt, lLin, lRAng, rPnt, rLin, rRAng, scr, fov;
	
	pos=(en&1024)==1024; fLen=(en&512)==512; pPlan=(en&256)==256; lPnt=(en&128)==128; lLin=(en&64)==64; lRAng=(en&32)==32; rPnt=(en&16)==16; rLin=(en&8)==8; rRAng=(en&4)==4; scr=(en&2)==2; fov=(en&1)==1;
	//pos=fLen=pPlan=lPnt=lLin=lRAng=rPnt=rLin=rRAng=scr=fov=true;
	
	px=x;      py=y;      pa=ang;
	
	if(pos){
	//posição da câmera
	ctx.fillStyle = "Orange";
	ctx.beginPath();
	ctx.arc(px, py, 5, 0, TWO_PI, false);
	ctx.fill();
	}
	if(fLen){
	//direção da câmera (FOCAL_LENGTH)
	ctx.strokeStyle = "Green";
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.moveTo(px, py);
	ctx.lineTo(px+d*Math.cos(pa), py+d*Math.sin(pa));
	ctx.stroke();
	}
	if(pPlan){
	//Espaço de Projeção
	ctx.strokeStyle = "LightGray";
	ang1 = ( (179/2)/360 )*TWO_PI; // half_fov de um fov de 179º 
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
	ctx.stroke();
	}
	//lateral esquerda (P1, r1, x1, y1)
	r1 = d/Math.cos(HALF_FOV);
	ang1 = pa - HALF_FOV;
	x1 = r1*Math.cos(ang1);
	y1 = r1*Math.sin(ang1);
	if(lPnt){
	//P1 (x1, y1)
	ctx.fillStyle = "Black";
	ctx.beginPath();
	ctx.arc(px+x1, py+y1, 3, 0, TWO_PI, false);
	ctx.fill();
	}
	if(lLin){
	//r1
	ctx.strokeStyle = "Gray";
	ctx.beginPath();
	ctx.moveTo(px, py);
	ctx.lineTo(px+x1, py+y1);
	ctx.stroke();
	}
	//lateral direita (P2, r2, x2, y2)
	r2 = d/Math.cos(HALF_FOV);
	ang2 = pa + HALF_FOV;
	x2 = r2*Math.cos(ang2);
	y2 = r2*Math.sin(ang2);
	if(rPnt){
	//P2 (x2, y2)
	ctx.fillStyle = "Black";
	ctx.beginPath();
	ctx.arc(px+x2, py+y2, 3, 0, TWO_PI, false);
	ctx.fill();
	}
	if(rLin){
	//r2
	ctx.strokeStyle = "Gray";
	ctx.beginPath();
	ctx.moveTo(px, py);
	ctx.lineTo(px+x2, py+y2);
	ctx.stroke();
	}
	if(lRAng){
	//ângulo reto esquerdo
	rightAngle( px, py,      px+d*Math.cos(pa), py+d*Math.sin(pa),         px+x1, py+y1,               "Green", 1);
	}
	if(rRAng){
	//ângulo reto direito
	rightAngle( px, py,      px+d*Math.cos(pa), py+d*Math.sin(pa),         px+x2, py+y2,               "Green", 1);
	}
	if(scr){
	//screen (linha de P1 até P2)
	ctx.strokeStyle = "SlateBlue";
	ctx.beginPath();
	ctx.moveTo(px+x1, py+y1);
	ctx.lineTo(px+x2, py+y2);
	ctx.stroke();
	}
	if(fov){
	//FOV
	ctx.strokeStyle = "Red";
	ctx.beginPath();
	ctx.arc(px, py, 20, pa-HALF_FOV, pa+HALF_FOV, false);
	ctx.stroke();
	}
}