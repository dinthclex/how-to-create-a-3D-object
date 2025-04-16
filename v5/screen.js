//------------------ screen ------------------

// funções de desenho: drawObjectOnCanvasZXTopView(), drawObjectZXTopView(), drawObjectZYSideView() e drawXY()

var cubang = 0;

function drawScreen(){ // troca de nome dos eixos: z (3D) torna-se x (2D na tela, no canvas do JavaScript)  e  x (3D) torna-se y (2D na tela, no canvas do JavaScript)
	if(info.originAxis===undefined || info.originAxis!==undefined&&info.originAxis){
		if(info.worldOriginAxis===undefined || info.worldOriginAxis!==undefined&&info.worldOriginAxis){
		//desenha os eixos globais (Espaço do Mundo)
		drawAxes("zx", 1,1, 0, 10,SCREEN_WIDTH, 10,SCREEN_HEIGHT);
		}
	}
	
	drawScene();
	screenText();
}

function drawScene(){
	let c = document.getElementById("background");
	let ctx = c.getContext("2d");
	let sw=SCREEN_WIDTH, sh=SCREEN_HEIGHT, scx=SCREEN_CENTER_X, scy=SCREEN_CENTER_Y;
	let obj;
	if(scene.objects.length == 0) return;
	
	if(info.screenXY===undefined || info.screenXY!==undefined&&info.screenXY){
	//desenha um retângulo que representa a tela (screen)
	ctx.fillStyle = "rgba(0,0,0,0.3)";
	ctx.fillRect(scx-sw/2,scy-sh/2, sw, sh);
	}
	if(info.originAxis===undefined || info.originAxis!==undefined&&info.originAxis){
		if(info.screenOrigin===undefined || info.screenOrigin!==undefined&&info.screenOrigin){
		//desenha os eixos no Espaço de Tela
		drawAxes("xy", scx, scy, 0, SCREEN_WIDTH/2+5, SCREEN_WIDTH/2+5, SCREEN_HEIGHT/2+5, SCREEN_HEIGHT/2+5);
		}
	}
	
	//desenha todos os objetos contidos na cena
	for(let j=0; j<scene.objects.length; j+=1){
		obj = scene.objects[j];
		if(info.worldPoints===undefined || info.worldPoints!==undefined&&info.worldPoints){
		//desenha um único objeto da lista de objetos contidos na cena
		drawObjectOnCanvasZXTopView(obj);
		}
		//desenha o objeto em destaque, (1) na vista de topo (zx) e (2) na vista lateral (zy)
		if(obj.active){
			drawObjectZXTopView(obj, camera.position.z, camera.position.x, camera.rotation.y, info.moveView.bits2);
			drawObjectZXTopView(obj, camera.topView.z, camera.topView.x, camera.topView.ang, info.topView.bits2);
			drawObjectZYSideView(obj, camera.sideView.z, camera.sideView.y, camera.sideView.ang, info.sideView.bits2);
		}
		
		drawXY(obj); // desenha os objetos na tela com a vista de perpectiva
	}
}

function drawXY(obj){ // desenha os objetos na tela com a vista de perpectiva
	let c = document.getElementById("background");
	let ctx = c.getContext("2d");
	let gx,gy,gz;
	let rx,ry,rz,ang;
	let sw=SCREEN_WIDTH, sh=SCREEN_HEIGHT, d=FOCAL_LENGTH, scx= SCREEN_CENTER_X, scy=SCREEN_CENTER_Y, sx, sy; // projeção na tela (2D)
	let hli = obj.active ? obj.highlightIndex : -1; // highlight index
	let cam = {};
	let col;
	let perc = (Date.now()%10000)/10000;
	let verts = obj.getTransformedValues();
	
	cam.x = camera.position.x; cam.y = camera.position.y; cam.z = camera.position.z;
	cam.rx = camera.rotation.x; cam.ry = camera.rotation.y; cam.rz = camera.rotation.z;
	
	for(let i=0; i < verts.length; i+=1){
		//***Espaço do Modelo (coordenadas locais do objeto)
		let p = verts[i];
		
		//***Espaço do Mundo (coordenadas globais)
		gx=obj.position.x+p.x; gy=obj.position.y+p.y; gz=obj.position.z+p.z;
		
		//***Espaço da Câmera (coordenadas locais da câmera)
		//transformações (tradução, rotação e escala)
		//tradução para a câmera (a câmera é considerada na origem do sistema de coordenadas)
		tx = gx - cam.x;
		ty = gy - cam.y;
		tz = gz - cam.z;
		
		//rotação em torno do eixo y da câmera
		ang = cam.ry;
		rz =  tz*Math.cos(ang) + tx*Math.sin(ang);
		rx = -tz*Math.sin(ang) + tx*Math.cos(ang);
		tz=rz; tx=rx;
		//point(800+tz,600+tx, "Red", 8);
		
		//***Espaço de Projeção (é um plano, onde todos os pontos são projetados)
		//faz a transformação de perspectiva
		sx = (tx/tz)*d;
		sy = (ty/tz)*d;
		
		//***Espaço de Tela (é o recorte desse plano)
		//recorte vai aqui (cliping)
		if( sx>=(-sw/2) && sx<=(sw/2) && sy>=(-sh/2) && sy<=(sh/2) ){ col = "Green"; }//dentro do recorte do espaço de projeção
		else { col = "Blue"; }//fora do recorte
		col = i==hli?"Cyan":col;
		
		
		if(i==hli){
			if(info.screenMeasure===undefined || info.screenMeasure!==undefined&&info.screenMeasure){
			//desenha as medidas (no espaço de tela) (vista de perspectiva)
			//medida 'sx'
			line(scx+sx,scy+sy, scx   ,scy+sy, "Red"  , 2, "filledArrow", "solid", "filledArrow");
			//desenha o texto 'sx'
			ctx.fillStyle = "Red";
			ctx.font = "bold 1em consolas";
			ctx.fillText("sx", scx+sx/2-ctx.measureText("sx").width/2, scy+sy-5);
			ctx.fill();
			//medida 'sy'
			line(scx+sx,scy+sy, scx+sx,scy   , "Green", 2, "filledArrow", "solid", "filledArrow");
			//desenha o texto 'sy'
			ctx.fillStyle = "Green";
			ctx.font = "bold 1em consolas";
			ctx.fillText("sy", scx+sx+5, scy+sy/2);
			ctx.fill();
			}
		}
			
		//projeta os pontos na tela
		if(info.projectedPointsXY===undefined || info.projectedPointsXY!==undefined&&info.projectedPointsXY){
		point(scx+sx,scy+sy, testPoint(scx+sx,scy+sy,5)?"Purple":col);
		changeHighlight(obj, i, scx+sx,scy+sy, 5);
		}
	}
}

function drawObjectOnCanvasZXTopView(obj){ // desenha o objeto no Espaço do Mundo (no canvas)
	let c = document.getElementById("background");
	let ctx = c.getContext("2d");
	let gx,gy,gz;
	let hli = obj.active ? obj.highlightIndex : -1; // highlight index
	let verts = obj.getTransformedValues();
	
	for(let i=0; i<verts.length; i+=1){
		//Espaço do Modelo
		let p = verts[i];
		
		//Espaço do Mundo
		gx=obj.position.x+p.x; gy=obj.position.y+p.y; gz=obj.position.z+p.z;
		
		point(gz,gx,testPoint(gz,gx,5)?"Purple":i==hli?"Cyan":"Black");
		changeHighlight(obj, i, gz,gx, 5);
	}
}

function drawObjectZYSideView(obj, sidz=800, sidy=600, sida=0, bits=0b11111){ // desenha o objeto na vista lateral (ZY)
	//                        obj, x       , y       , ang   , bits[pontos transformados, linhas, pontos projetados, triângulos, medidas]
	let c = document.getElementById("background");
	let ctx = c.getContext("2d");
	let gx,gy,gz;
	let camx, camy, camz, camrx, camry, camrz;
	let tx,ty,tz, sidtx, sidty, sidtz;
	let rx,ry,rz;
	let d=FOCAL_LENGTH, scx= SCREEN_CENTER_X, scy=SCREEN_CENTER_Y, sx, sy;
	let hli = obj.active ? obj.highlightIndex : -1; // highlight index
	let verts = obj.getTransformedValues();
	
	//pega o valor de cada bit de acordo com a variável
	tPnts=(bits&16)==16; lins=(bits&8)==8; pPnts=(bits&4)==4; tris=(bits&2)==2; meas=(bits&1)==1;
	
	camx = camera.position.x;
	camy = camera.position.y;
	camz = camera.position.z;
	camrx = camera.rotation.x;
	camry = camera.rotation.y;
	camrz = camera.rotation.z;
	
	for(let i=0; i<verts.length; i+=1){
		//Espaço do Modelo
		let p = verts[i];
		
		//Espaço do Mundo (coordenadas globais)
		gx=obj.position.x+p.x; gy=obj.position.y+p.y; gz=obj.position.z+p.z;
		//point(gz,gx, "Black");
		
		//Espaço da Câmera
		//transformações
		//tradução para a câmera
		tx = gx - camx;
		ty = gy - camy;
		tz = gz - camz;
		//rotação em torno do eixo y da câmera (no espaço da câmera)
		rz =  Math.cos(camry)*tz + Math.sin(camry)*tx;
		rx = -Math.sin(camry)*tz + Math.cos(camry)*tx;
		tz=rz; tx=rx;
		
		//faz a transformação de perspectiva
		sx = (tx/tz)*d;
		sy = (ty/tz)*d;
		//point(scx+sx, scy+sy, "Green");
		
		//roda o ponto em torno do eixo x da câmera apenas para exibi-lo na vista lateral
		ang = -sida;
		rz =  tz*Math.cos(ang) + ty*Math.sin(ang);
		ry = -tz*Math.sin(ang) + ty*Math.cos(ang);
		sidtz=rz;  sidty=ry;
		if(tPnts){
			point(sidz+sidtz,sidy+sidty, testPoint(sidz+sidtz,sidy+sidty,5)?"Purple":i==hli?"Cyan":"Red");
			changeHighlight(obj, i, sidz+sidtz,sidy+sidty, 5);
		}
		if(lins){
			//desenha uma linha entre a câmera e o ponto do objeto no espaço do mundo (ou seja, coordenada global)
			x1 = sidz;
			y1 = sidy;
			x2 = sidz+sidtz;
			y2 = sidy+sidty;
			line(x1,y1 , x2,y2,   "Gray",0.5,   "flat",[1,1],"flat" );
		}
		
		if(pPnts){
		//espaço de projeção
		let r1,ang1, r2,ang2;
		let x3,y3, x4,y4;
		//desenha os pontos projetados
		//linha 1, entre a câmera e o ponto do objeto no espaço do mundo (coordenada global)
		x1=sidz+tz; y1=sidy+ty;    x2=sidz; y2=sidy;
		//linha 2, entre o P1 e o P2 que definem a screen (tela de projeção da câmera)
		ang = sida;
		//P1
		r1 = d/Math.cos(HALF_FOV);
		ang1 = ang - HALF_FOV;
		x3 = sidz + r1*Math.cos(ang1);
		y3 = sidy + r1*Math.sin(ang1);
		//P2
		r2 = d/Math.cos(HALF_FOV);
		ang2 = ang + HALF_FOV;
		x4 = sidz + r2*Math.cos(ang2);
		y4 = sidy + r2*Math.sin(ang2);
		//ponto de interseção, se houver, entre a linha 1 e a linha 2
		p = intersectSegments(x1,y1,x2,y2, x3,y3,x4,y4, true);
		if(p != null){
			//desenha o ponto no espaço de projeção
			point(p.x,p.y,testPoint(p.x,p.y,3)?"Purple":"Blue", 3);
			changeHighlight(obj, i, p.x,p.y, 3);
		}
		}
			
		if(i == hli){
			if(tris){
			//desenha um triângulo usando o ponto em destaque
			//ponto no espaço da câmera
			ang =  -sida;
			x1 = sidz;
			y1 = sidy;
			x2 = sidz+  tz*Math.cos(ang) + 0*Math.sin(ang);
			y2 = sidy  -tz*Math.sin(ang) + 0*Math.cos(ang);
			x3 = sidz+  tz*Math.cos(ang) + ty*Math.sin(ang);
			y3 = sidy  -tz*Math.sin(ang) + ty*Math.cos(ang);	
			drawTriangle(x1,y1, x2,y2, x3,y3 , {sega:true, segb:true, segc:true}, {anga:true, angb:false, angc:true}, false, {a:"Gray", b:"Gray", c:"Gray", fill: "rgba(0,0,0,0.1)"}, 1);
			//ponto no espaço de projeção
			ang =  -sida;
			x1 = sidz;
			y1 = sidy;
			x2 = sidz+  d*Math.cos(ang) + 0*Math.sin(ang);
			y2 = sidy  -d*Math.sin(ang) + 0*Math.cos(ang);
			x3 = sidz+  d*Math.cos(ang) + sy*Math.sin(ang);
			y3 = sidy  -d*Math.sin(ang) + sy*Math.cos(ang);
			drawTriangle(x1,y1, x2,y2, x3,y3 , {sega:false, segb:true, segc:false}, {anga:true, angb:false, angc:false}, false, {a:"Gray", b:"Gray", c:"Gray", fill: "rgba(0,0,0,0.1)"}, 1);
			}
			if(meas){
			//desenha as medidas (no espaço de tela) (vista lateral)
			//medida sy
			ang = -sida;
			x1 = sidz +  ( (d+5)*Math.cos(ang) + 0*Math.sin(ang)) ;
			y1 = sidy +  (-(d+5)*Math.sin(ang) + 0*Math.cos(ang));
			x2 = sidz +  ( (d+5)*Math.cos(ang) + sy*Math.sin(ang)) ;
			y2 = sidy +  (-(d+5)*Math.sin(ang) + sy*Math.cos(ang));
			line(x1,y1, x2,y2,   "Green",2,   "filledArrow","solid","filledArrow" );
			//texto 'sy'
			ang = -sida;
			x3 = +5;
			y3 = Math.sign(-sy)*-leng(x1,y1, x2,y2)/2;
			x4 =  x3*Math.cos(ang) + y3*Math.sin(ang);
			y4 = -x3*Math.sin(ang) + y3*Math.cos(ang);
			text("sy", x1+x4,y1+y4, "Green", "bold 1em consolas");
			//medida y
			ang = -sida;
			x1 = sidz +  ( (tz+5)*Math.cos(ang) + 0*Math.sin(ang)) ;
			y1 = sidy +  (-(tz+5)*Math.sin(ang) + 0*Math.cos(ang));
			x2 = sidz +  ( (tz+5)*Math.cos(ang) + ty*Math.sin(ang)) ;
			y2 = sidy +  (-(tz+5)*Math.sin(ang) + ty*Math.cos(ang));
			line(x1,y1, x2,y2,   "Green",2,   "filledArrow","solid","filledArrow" );
			//texto 'y'
			ang = -sida;
			x3 = +5;
			y3 = Math.sign(-sy)*-leng(x1,y1, x2,y2)/2;
			x4 =  x3*Math.cos(ang) + y3*Math.sin(ang);
			y4 = -x3*Math.sin(ang) + y3*Math.cos(ang);
			text("y", x1+x4,y1+y4, "Green", "bold 1em consolas");
			//medida d
			ang = -sida;
			x1 = sidz +   0*Math.cos(ang) + 5*Math.sin(ang);
			y1 = sidy +  -0*Math.sin(ang) + 5*Math.cos(ang);
			x2 = sidz +   d*Math.cos(ang) + 5*Math.sin(ang);
			y2 = sidy +  -d*Math.sin(ang) + 5*Math.cos(ang);
			line(x1,y1, x2,y2,   "CornflowerBlue",2,   "filledArrow","solid","filledArrow" );
			//texto 'd'
			ang = -sida;
			x3 = leng(x1,y1, x2,y2)/2;
			y3 = 12;	
			x4 =  x3*Math.cos(ang) + y3*Math.sin(ang);
			y4 = -x3*Math.sin(ang) + y3*Math.cos(ang);
			text("d", x1+x4,y1+y4, "CornflowerBlue", "bold 1em consolas");
			//medida z
			ang = -sida;
			x1 = sidz +    0*Math.cos(ang) + 18*Math.sin(ang);
			y1 = sidy +   -0*Math.sin(ang) + 18*Math.cos(ang);
			x2 = sidz +   tz*Math.cos(ang) + 18*Math.sin(ang);
			y2 = sidy +  -tz*Math.sin(ang) + 18*Math.cos(ang);
			line(x1,y1, x2,y2,   "Blue",2,   "filledArrow","solid","filledArrow" );
			//texto 'z'
			ang = -sida;
			x3 = leng(x1,y1, x2,y2)/2;
			y3 = 16;	
			x4 =  x3*Math.cos(ang) + y3*Math.sin(ang);
			y4 = -x3*Math.sin(ang) + y3*Math.cos(ang);
			text("z", x1+x4,y1+y4, "Blue", "bold 1em consolas");
			}
		}
		
	}
}

function drawObjectZXTopView(obj, topz=SCREEN_WIDTH/2, topx=SCREEN_HEIGHT/2, topa=HALF_PI, bits=0b11111){ // desenha o objeto na vista de topo (ZX)
	//                       obj, x                  , y                   , ang         , bits[pontos transformados, linhas, pontos projetados, triângulos, medidas]
	let c = document.getElementById("background");
	let ctx = c.getContext("2d");
	let gx,gy,gz;
	let camx, camy, camz, camrx, camry, camrz, ang;
	let tx,ty,tz, toptx,topty,toptz;
	let rx,ry,rz;
	let d=FOCAL_LENGTH, scx= SCREEN_CENTER_X, scy=SCREEN_CENTER_Y, sx, sy;
	let hli = obj.active ? obj.highlightIndex : -1; // highlight index
	let verts = obj.getTransformedValues();
	
	//pega o valor	 de cada bit de acordo com a variável
	tPnts=(bits&16)==16; lins=(bits&8)==8; pPnts=(bits&4)==4; tris=(bits&2)==2; meas=(bits&1)==1;
	
	camx = camera.position.x;
	camy = camera.position.y;
	camz = camera.position.z;
	camrx = camera.rotation.x;
	camry = camera.rotation.y;
	camrz = camera.rotation.z;
	
	for(let i=0; i<verts.length; i+=1){
		//Espaço do Modelo
		let p = verts[i];
		
		//Espaço do Mundo
		gx=obj.position.x+p.x;  gy=obj.position.y+p.y;  gz=obj.position.z+p.z;
		//point(gz,gx, i==hli?"Cyan":"Black");
		
		//Espaço da Câmera
		//transformações
		//tradução para a câmera
		tx = gx - camx;
		ty = gy - camy;
		tz = gz - camz;
		//rotação em torno do eixo y da câmera (no espaço da câmera)
		rz =  Math.cos(camry)*tz + Math.sin(camry)*tx;
		rx = -Math.sin(camry)*tz + Math.cos(camry)*tx;
		tz=rz; tx=rx;
		
		//faz a transformação de perspectiva
		sx = (tx/tz)*d;
		sy = (ty/tz)*d;
		//point(scx+sx, scy+sy, "Green");
		
		//roda o ponto em torno do eixo y da câmera apenas para exibi-lo na vista de topo
		ang = -topa;
		rz =  tz*Math.cos(ang) + tx*Math.sin(ang);
		rx = -tz*Math.sin(ang) + tx*Math.cos(ang);
		toptz=rz;  toptx=rx;
		if(tPnts){
			point(topz+toptz,topx+toptx, testPoint(topz+toptz,topx+toptx,5)?"Purple":i==hli?"Cyan":"Red");
			changeHighlight(obj, i, topz+toptz, topx+toptx, 5);
		}
		if(lins){
			//desenha uma linha entre a câmera e o ponto do objeto no espaço do mundo (ou seja, coordenada global)
			line( topz+toptz,topx+toptx, topz,topx,   "Gray",0.5,   "flat",[1,1],"flat" );
		}
		if(pPnts){
			//espaço de projeção
			let r1,ang1, r2,ang2;
			let x3,y3, x4,y4;
			//desenha os pontos projetados
			//linha 1, entre a câmera e o ponto do objeto no espaço do mundo (coordenada global)
			x1=topz+toptz; y1=topx+toptx;    x2=topz; y2=topx;
			//linha 2, entre o P1 e o P2 que definem a screen (tela de projeção da câmera)
			ang = topa;
			//P1
			r1 = d/Math.cos(HALF_FOV);
			ang1 = ang - HALF_FOV;
			x3 = topz + r1*Math.cos(ang1);
			y3 = topx + r1*Math.sin(ang1);
			//P2
			r2 = d/Math.cos(HALF_FOV);
			ang2 = ang + HALF_FOV;
			x4 = topz + r2*Math.cos(ang2);
			y4 = topx + r2*Math.sin(ang2);
			//ponto de interseção, se houver, entre a linha 1 e a linha 2
			p = intersectSegments(x1,y1,x2,y2, x3,y3,x4,y4, true);
			if(p != null){
				//desenha o ponto no espaço de projeção
				point(p.x,p.y,testPoint(p.x,p.y,3)?"Purple":"Blue", 3);
				changeHighlight(obj, i, p.x,p.y, 3);
			}
		}
		if(i == hli){
			if(tris){
			//desenha um triângulo usando o ponto em destaque
			//ponto no espaço da câmera
			ang =  -topa;
			x1 = topz;
			y1 = topx;
			x2 = topz+  tz*Math.cos(ang) + 0*Math.sin(ang);
			y2 = topx  -tz*Math.sin(ang) + 0*Math.cos(ang);
			x3 = topz+  tz*Math.cos(ang) + tx*Math.sin(ang);
			y3 = topx  -tz*Math.sin(ang) + tx*Math.cos(ang);
			drawTriangle(x1,y1, x2,y2, x3,y3 , {sega:true, segb:true, segc:true}, {anga:true, angb:false, angc:true}, false, {a:"Gray", b:"Gray", c:"Gray", fill: "rgba(0,0,0,0.1)"}, 1);
			//ponto no espaço de projeção
			ang =  -topa;
			x1 = topz;
			y1 = topx;
			x2 = topz+  d*Math.cos(ang) +  0*Math.sin(ang);
			y2 = topx  -d*Math.sin(ang) +  0*Math.cos(ang);
			x3 = topz+  d*Math.cos(ang) + sx*Math.sin(ang);
			y3 = topx  -d*Math.sin(ang) + sx*Math.cos(ang);
			drawTriangle(x1,y1, x2,y2, x3,y3 , {sega:false, segb:true, segc:true}, {anga:true, angb:false, angc:false}, false, {a:"Gray", b:"Gray", c:"Gray", fill: "rgba(0,0,0,0.1)"}, 1);
			}
			if(meas){
			//desenha as medidas (no espaço de tela) (vista de topo)
			//medida sx
			ang = -topa;
			x1 = topz +   (d+5)*Math.cos(ang) +  0*Math.sin(ang);
			y1 = topx +  -(d+5)*Math.sin(ang) +  0*Math.cos(ang);
			x2 = topz +   (d+5)*Math.cos(ang) + sx*Math.sin(ang);
			y2 = topx +  -(d+5)*Math.sin(ang) + sx*Math.cos(ang);
			line(x1,y1, x2,y2,   "Red",2,   "filledArrow","solid","filledArrow" );
			//texto 'sx'
			ang = -topa-HALF_PI;
			x3 = Math.sign(sx)*leng(x1,y1, x2,y2)/2-ctx.measureText("sx").width/2;
			y3 = -5;
			x4 =  x3*Math.cos(ang) + y3*Math.sin(ang);
			y4 = -x3*Math.sin(ang) + y3*Math.cos(ang);
			text("sx", x1+x4,y1+y4, "Red", "bold 1em consolas");
			//medida x
			ang = -topa;
			x1 = topz +   (tz+5)*Math.cos(ang) +  0*Math.sin(ang);
			y1 = topx +  -(tz+5)*Math.sin(ang) +  0*Math.cos(ang);
			x2 = topz +   (tz+5)*Math.cos(ang) + tx*Math.sin(ang);
			y2 = topx +  -(tz+5)*Math.sin(ang) + tx*Math.cos(ang);
			line(x1,y1, x2,y2,   "Red",2,   "filledArrow","solid","filledArrow" );
			//texto 'x'
			ang = -topa-HALF_PI;
			x3 = Math.sign(sx)*leng(x1,y1, x2,y2)/2-ctx.measureText("x").width/2;
			y3 = -5;
			x4 =  x3*Math.cos(ang) + y3*Math.sin(ang);
			y4 = -x3*Math.sin(ang) + y3*Math.cos(ang);
			text("x", x1+x4,y1+y4, "Red", "bold 1em consolas");
			//medida d
			ang = -topa;
			x1 = topz +   0*Math.cos(ang) + (-5)*Math.sin(ang);
			y1 = topx +  -0*Math.sin(ang) + (-5)*Math.cos(ang);
			x2 = topz +   d*Math.cos(ang) + (-5)*Math.sin(ang);
			y2 = topx +  -d*Math.sin(ang) + (-5)*Math.cos(ang);
			line(x1,y1, x2,y2,   "CornflowerBlue",2,   "filledArrow","solid","filledArrow" );
			//texto 'd'
			ang = -topa;
			x3 = leng(x1,y1, x2,y2)/2-ctx.measureText("d").width/2;
			y3 = -10;
			x4 =  x3*Math.cos(ang) + y3*Math.sin(ang);
			y4 = -x3*Math.sin(ang) + y3*Math.cos(ang);
			text("d", x1+x4,y1+y4, "CornflowerBlue", "bold 1em consolas");
			//medida z
			ang = -topa;
			x1 = topz +    0*Math.cos(ang) + (-15)*Math.sin(ang);
			y1 = topx +   -0*Math.sin(ang) + (-15)*Math.cos(ang);
			x2 = topz +   tz*Math.cos(ang) + (-15)*Math.sin(ang);
			y2 = topx +  -tz*Math.sin(ang) + (-15)*Math.cos(ang);
			line(x1,y1, x2,y2,   "Blue",2,   "filledArrow","solid","filledArrow" );
			//texto 'z'
			ang = -topa;
			x3 = leng(x1,y1, x2,y2)/2-ctx.measureText("d").width/2;
			y3 = -20;
			x4 =  x3*Math.cos(ang) + y3*Math.sin(ang);
			y4 = -x3*Math.sin(ang) + y3*Math.cos(ang);
			text("z", x1+x4,y1+y4, "Blue", "bold 1em consolas");
			}
		}
		
	}
}

function screenText(){
	let c = document.getElementById("background");
	let ctx = c.getContext("2d");
	let str = [{text:"considerações sobre o ponto",           color:"Black"},
			   {text:"Espaço do Modelo (não representado)",   color:"Gray"},
			   {text:"Espaço do Mundo (pontos em preto)",     color:"Black"},
			   {text:"Espaço da Câmera (pontos em vermelho)", color:"Red"},
			   {text:"Espaço de Projeção (pontos em azul)",   color:"Blue"},
			   {text:"Espaço de Tela (pontos em verde)",      color:"Green"},
			   {text:"(ponto em destaque)",                   color:"Cyan"},
			   {text:"",                                      color:""},
			   {text:"eixos",                                 color:"Black"},
			   {text:"eixo z (em azul)",                      color:"Blue"},
			   {text:"eixo x (em vermelho)",                  color:"Red"},
			   {text:"eixo y (em verde)",                     color:"Green"},
			   {text:"",                                                                       color:""},
			   {text:"controles",                                                              color:"Black"},
			   {text:"teclado: i, t, w, a, s, d, seta esquerda e seta direita",                color:"Black"},
			   {text:"mouse: clique em algum ponto para trocá-lo",                             color:"Black"}
			 ];
	let str2;
	let scx= SCREEN_CENTER_X, scy=SCREEN_CENTER_Y;
	let x1, x2, y1, y2, x, y, s;
	
	if(info.divisor===undefined || info.divisor!==undefined&&info.divisor){
	//divisores
	line(BACKGROUND_WIDTH*(1/3),0,BACKGROUND_WIDTH*(1/3),1000);
	line(BACKGROUND_WIDTH*(2/3),0,BACKGROUND_WIDTH*(2/3),1000);
	}
	
	if(info.legend===undefined || info.legend!==undefined&&info.legend){
	//---legenda---
	x1=20;   y=680;
	//imprime o texto
	for(let i=0; i < 7; i+=1){
		s = str[i].text;
		y1 = y + i*20;
		text(s, x1, y1, str[i].color, "bold 1em consolas");
	}
	x1=400;   y=680;
	//imprime o texto
	for(let i=8; i < 12; i+=1){
		s = str[i].text;
		y1 = y + (i-8)*20;
		text(s, x1, y1, str[i].color, "bold 1em consolas");
	}
	x1=20;   y=830;
	//imprime o texto
	for(let i=13; i < str.length; i+=1){
		s = str[i].text;
		y1 = y + (i-13)*20;
		text(s, x1, y1, str[i].color, "bold 1em consolas");
	}
	}
	
	if(info.title===undefined || info.title!==undefined&&info.title){
	//---títulos---
	//vista de perspectiva
	//título
	x1=BACKGROUND_WIDTH*(1/3)*0.5;
	y1=190-145;
	text("vista de perpectiva", x1, y1, "Black", "bold 2em consolas", true);
	//vista de topo
	//título
	x1=BACKGROUND_WIDTH*(1/3)*1.5;
	y1=190-145;
	text("vista de topo", x1, y1, "Black", "bold 2em consolas", true);
	//vista lateral
	//título
	x1=BACKGROUND_WIDTH*(1/3)*2.5;
	y1=190-145;
	text("vista lateral", x1, y1, "Black", "bold 2em consolas", true);
	}
	if(info.subtitle===undefined || info.subtitle!==undefined&&info.subtitle){
	//---subtítulos---
	//vista de topo
	//subtítulo
	x1=BACKGROUND_WIDTH*(1/3)*1.5;
	y1=190-145+30;
	text("Espaço da câmera", x1, y1, "Red", "bold 1.5em consolas", true);
	//vista lateral
	//subtítulo
	x1=BACKGROUND_WIDTH*(1/3)*2.5;
	y1=190-145+30;
	text("Espaço da câmera", x1, y1, "Red", "bold 1.5em consolas", true);
	}
	if(info.description===undefined || info.description!==undefined&&info.description){
	//---descrições---
	//vista de topo
	//descrição
	x1=BACKGROUND_WIDTH*(1/3)*1.1;
	y1=190-145+30+30;
	text("pelo teorema de Tales ou", x1, y1, "Black", "bold 1em consolas");
	x1=BACKGROUND_WIDTH*(1/3)*1.1;
	y1= y1+20;
	text("semelhança de triângulos", x1, y1, "Black", "bold 1em consolas");
	//vista lateral
	//descrição
	x1=BACKGROUND_WIDTH*(1/3)*2.1;
	y1=190-145+30+30;
	text("pelo teorema de Tales ou", x1, y1, "Black", "bold 1em consolas");
	x1=BACKGROUND_WIDTH*(1/3)*2.1;
	y1= y1+20;
	text("semelhança de triângulos", x1, y1, "Black", "bold 1em consolas");
	}
	
	if(info.equation===undefined || info.equation!==undefined&&info.equation){
	//---equação sx---
	//proporção 1
	x1 = BACKGROUND_WIDTH*(1/3)*1.1+15;
	y1 = 150;
	x = x1;
	y = y1;
	text("x", x, y,"Red", "bold 1em consolas");
	x+=-2;
	y+=6;
	line(x,y,x+15,y,"Black",2);
	x+=-2;
	y+=14;
	text("sx", x, y,"Red", "bold 1em consolas");
	x+=22;
	y-=10;
	text("=", x, y,"Black", "bold 1em consolas");
	x+=17;
	y-=10;
	text("z", x, y,"Blue", "bold 1em consolas");
	x+=-1;
	y+=16;
	line(x,y-11,x+10,y-11, "Black",2);
	x+=-1;
	y+= 4;
	text("d", x, y,"CornflowerBlue", "bold 1em consolas");
	//proporção 2
	x1 = BACKGROUND_WIDTH*(1/3)*1.1+15+60;
	y1 = 150;
	x = x1;
	y = y1+10;
	text("ou", x, y,"Black", "bold 1em consolas");
	x = x1+35;
	y = y1;
	text("sx", x, y,"Red", "bold 1em consolas");
	x+=2;
	y+=6;
	line(x,y,x+15,y,"Black",2);
	x+=3;
	y+=14;
	text("x", x, y,"Red", "bold 1em consolas");
	x+=22;
	y-=10;
	text("=", x, y,"Black", "bold 1em consolas");
	x+=17;
	y-=10;
	text("d", x, y,"CornflowerBlue", "bold 1em consolas");
	x+=-1;
	y+=16;
	line(x,y-11,x+10,y-11, "Black",2);
	x+=1;
	y+= 4;
	text("z", x, y,"Blue", "bold 1em consolas");
	//proporção 3
	x1 = BACKGROUND_WIDTH*(1/3)*1.1+15+60+110;
	y1 = 150;
	x = x1;
	y = y1+10;
	text("ou", x, y,"Black", "bold 1em consolas");
	x = x1+35;
	y = y1;
	text("d", x, y,"CornflowerBlue", "bold 1em consolas");
	x+=-2;
	y+=6;
	line(x,y,x+15,y,"Black",2);
	x+=-2;
	y+=14;
	text("sx", x, y,"Red", "bold 1em consolas");
	x+=22;
	y-=10;
	text("=", x, y,"Black", "bold 1em consolas");
	x+=17;
	y-=10;
	text("z", x, y,"Blue", "bold 1em consolas");
	x+=-1;
	y+=16;
	line(x,y-11,x+10,y-11, "Black",2);
	x+=1;
	y+= 4;
	text("x", x, y,"Red", "bold 1em consolas");
	//proporção 4
	x1 = BACKGROUND_WIDTH*(1/3)*1.1+15+60+110+110;
	y1 = 150;
	x = x1;
	y = y1+10;
	text("ou", x, y,"Black", "bold 1em consolas");
	x = x1+35;
	y = y1;
	text("sx", x, y,"Red", "bold 1em consolas");
	x+=2;
	y+=6;
	line(x,y,x+15,y,"Black",2);
	x+=3;
	y+=14;
	text("d", x, y,"CornflowerBlue", "bold 1em consolas");
	x+=22;
	y-=10;
	text("=", x, y,"Black", "bold 1em consolas");
	x+=17;
	y-=10;
	text("x", x, y,"Red", "bold 1em consolas");
	x+=-1;
	y+=16;
	line(x,y-11,x+10,y-11, "Black",2);
	x+=1;
	y+= 4;
	text("z", x, y,"Blue", "bold 1em consolas");
	//igualdade x.d = sx.z
	x1 = BACKGROUND_WIDTH*(1/3)*1.1+2;
	x = x1;
	y = y1 +45;
	text("x", x, y, "Black", "bold 1em consolas");
	x+= 7;
	y+=-2;
	text(".", x, y, "Black", "bold 1em consolas");
	x+= 7;
	y+=+2;
	text("d = sx", x, y, "Black", "bold 1em consolas");
	x+= 51;
	y+=-2;
	text(".", x, y, "Black", "bold 1em consolas");
	x+= 7;
	y+=+2;
	text("z", x, y, "Black", "bold 1em consolas");
	//sx isolado
	x = x1 - 1;
	y = y1 + 58;
	strokeRect(x,y,85,45, "Black", 2, [3*2, 1*2]);
	x += 10;
	y += 25;
	text("sx", x,y,"Red", "bold 1em consolas");
	x+=22;
	y=y;
	text("=", x, y,"Black", "bold 1em consolas");
	x+=14;
	y+=-10;
	text("x", x, y,"Red", "bold 1em consolas");
	x+=0;
	y+=7;
	line(x,y,x+10,y, "Black",2);
	x+=0;
	y+=13;
	text("z", x, y,"Blue", "bold 1em consolas");
	x+=10;
	y-=12;
	text(".", x, y,"Black", "bold 1em consolas");
	x+=8;
	y+=2;
	text("d", x, y,"CornflowerBlue", "bold 1em consolas");
	
	//---equação sy---
	//proporção 1
	x1 = BACKGROUND_WIDTH*(1/3)*2.1+15;
	y1 = 150;
	x = x1;
	y = y1;
	text("y", x, y,"Green", "bold 1em consolas");
	x+=-2;
	y+=6;
	line(x,y,x+15,y,"Black",2);
	x+=-2;
	y+=14;
	text("sy", x, y,"Green", "bold 1em consolas");
	x+=22;
	y-=10;
	text("=", x, y,"Black", "bold 1em consolas");
	x+=17;
	y-=10;
	text("z", x, y,"Blue", "bold 1em consolas");
	x+=-1;
	y+=16;
	line(x,y-11,x+10,y-11, "Black",2);
	x+=-1;
	y+= 4;
	text("d", x, y,"CornflowerBlue", "bold 1em consolas");
	//proporção 2
	x1 = BACKGROUND_WIDTH*(1/3)*2.1+15+60;
	y1 = 150;
	x = x1;
	y = y1+10;
	text("ou", x, y,"Black", "bold 1em consolas");
	x = x1+35;
	y = y1;
	text("sy", x, y,"Green", "bold 1em consolas");
	x+=+2;
	y+=6;
	line(x,y,x+15,y,"Black",2);
	x+=+3;
	y+=14;
	text("y", x, y,"Green", "bold 1em consolas");
	x+=20;
	y-=10;
	text("=", x, y,"Black", "bold 1em consolas");
	x+=17;
	y-=10;
	text("d", x, y,"CornflowerBlue", "bold 1em consolas");
	x+=-1;
	y+=17;
	line(x,y-11,x+10,y-11, "Black",2);
	x+= 1;
	y+= 4;
	text("z", x, y,"Blue", "bold 1em consolas");
	//proporção 3
	x1 = BACKGROUND_WIDTH*(1/3)*2.1+15+60+100;
	y1 = 150;
	x = x1;
	y = y1+10;
	text("ou", x, y,"Black", "bold 1em consolas");
	x = x1+35;
	y = y1;
	text("d", x, y,"CornflowerBlue", "bold 1em consolas");
	x+=-2;
	y+=6;
	line(x,y,x+15,y,"Black",2);
	x+=-2;
	y+=14;
	text("sy", x, y,"Green", "bold 1em consolas");
	x+=22;
	y-=10;
	text("=", x, y,"Black", "bold 1em consolas");
	x+=17;
	y-=10;
	text("z", x, y,"Blue", "bold 1em consolas");
	x+=-1;
	y+=17;
	line(x,y-11,x+10,y-11, "Black",2);
	x+= 1;
	y+= 4;
	text("y", x, y,"Green", "bold 1em consolas");
	//proporção 4
	x1 = BACKGROUND_WIDTH*(1/3)*2.1+15+60+100+100;
	y1 = 150;
	x = x1;
	y = y1+10;
	text("ou", x, y,"Black", "bold 1em consolas");
	x = x1+35;
	y = y1;
	text("sy", x, y,"Green", "bold 1em consolas");
	x+=+2;
	y+=6;
	line(x,y,x+15,y,"Black",2);
	x+=+3;
	y+=14;
	text("d", x, y,"CornflowerBlue", "bold 1em consolas");
	x+=19;
	y-=10;
	text("=", x, y,"Black", "bold 1em consolas");
	x+=17;
	y-=10;
	text("y", x, y,"Green", "bold 1em consolas");
	x+=-1;
	y+=17;
	line(x,y-11,x+10,y-11, "Black",2);
	x+= 1;
	y+= 4;
	text("z", x, y,"Blue", "bold 1em consolas");
	//igualdade y.d = sy.z
	x1 = BACKGROUND_WIDTH*(1/3)*2.1+15;
	x = x1 - 13;
	y = y1 +45;
	text("y", x, y, "Black", "bold 1em consolas");
	x+= 7;
	y+=-2;
	text(".", x, y, "Black", "bold 1em consolas");
	x+= 7;
	y+=+2;
	text("d = sy", x, y, "Black", "bold 1em consolas");
	x+= 51;
	y+=-2;
	text(".", x, y, "Black", "bold 1em consolas");
	x+= 7;
	y+=+2;
	text("z", x, y, "Black", "bold 1em consolas");
	//sy isolado
	x = x1 - 14;
	y = y1 + 58;
	strokeRect(x,y,85,45, "Black", 2, [3*2, 1*2]);
	x += 10;
	y += 25;
	text("sy", x,y,"Green", "bold 1em consolas");
	x+=22;
	y=y;
	text("=", x, y,"Black", "bold 1em consolas");
	x+=14;
	y+=-10;
	text("y", x, y,"Green", "bold 1em consolas");
	x+=0;
	y+=7;
	line(x,y,x+10,y, "Black",2);
	x+=0;
	y+=13;
	text("z", x, y,"Blue", "bold 1em consolas");
	x+=10;
	y-=12;
	text(".", x, y,"Black", "bold 1em consolas");
	x+=8;
	y+=2;
	text("d", x, y,"CornflowerBlue", "bold 1em consolas");
	}
	
	if(info.originIndicator===undefined || info.originIndicator!==undefined&&info.originIndicator){
	//origens
	if(info.worldOriginIndicator===undefined || info.worldOriginIndicator!==undefined&&info.worldOriginIndicator){
	//vista de perspectiva (Espaço do Mundo)
	x=0; y=0;
	x1=x+5; y1=y+10;    x2=x+25; y2=y+50;
	line(x1,y1, x2,y2, "Black", 3, "filledArrow", "solid", "flat");
	text("origem (0,0)", x2,y2+10);
	}
	if(info.moveView.arrow===undefined || info.moveView.arrow!==undefined&&info.moveView.arrow){
	//câmera em movimento
	x=camera.position.z; y=camera.position.x;
	x1=x+5; y1=y+10;    x2=x+25; y2=y+50;
	line(x1,y1, x2,y2, "Red", 3, "filledArrow", "solid", "flat");
	text("origem (0,0)", x2,y2+10, "Red");
	}
	if(info.topView.arrow===undefined || info.topView.arrow!==undefined&&info.topView.arrow){
	//vista de topo (Espaço da Câmera)
	x=camera.topView.z; y=camera.topView.x;
	x1=x+5; y1=y+10;    x2=x+25; y2=y+50;
	line(x1,y1, x2,y2, "Red", 3, "filledArrow", "solid", "flat");
	text("origem (0,0)", x2,y2+10, "Red");
	}
	if(info.sideView.arrow===undefined || info.sideView.arrow!==undefined&&info.sideView.arrow){
	//vista lateral (Espaço da Câmera)
	x=camera.sideView.z; y=camera.sideView.y;
	x1=x-5; y1=y-10;    x2=x-25; y2=y-50;
	line(x1,y1, x2,y2, "Red", 3, "filledArrow", "solid", "flat");
	text("origem (0,0)", x2-90,y2-10, "Red");
	}
	}
}






//------------------ screen ------------------