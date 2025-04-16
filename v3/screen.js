//------------------ screen ------------------

var cubang = 0;

function drawScreen(){ // troca de nome dos eixos: z (3D) torna-se x (2D na tela, no canvas do JavaScript)  e  x (3D) torna-se y (2D na tela, no canvas do JavaScript)
	//desenha os eixos globais (Espaço do Mundo)
	drawAxes("zx", 1,1, 0, 10,SCREEN_WIDTH, 10,SCREEN_HEIGHT);
	
	drawScene();
	screenText();
}

function drawScene(){
	let c = document.getElementById("background");
	let ctx = c.getContext("2d");
	let sw=SCREEN_WIDTH, sh=SCREEN_HEIGHT;
	let scx= 890, scy=150;
	let sx=0, sy=0, d=FOCAL_LENGTH;
	let gx=0, gy=0, gz=0;
	let tx=0, ty=0, tz=0;
	let rx=0, ry=0, ang=0;
	let x1,y1,x2,y2;
	
	
	
	//retângulo que representa a screen
	ctx.fillStyle = "rgba(0,0,0,0.3)";
	ctx.fillRect(scx-sw/2,scy-sh/2, sw, sh);
	
	//centro do cubo
	ctx.fillStyle = "Black";
	ctx.beginPath();
	ctx.arc(cube.z, cube.x, 3, 0, TWO_PI, false);
	ctx.fill();
	
	//cubang += (0.1/360)*TWO_PI;
	cubang = (10*Math.sin(Date.now()/1000)/360)*TWO_PI;
	//cube.y = Math.sin((Date.now()/10000)*TWO_PI)*100;
	
	//desenha o cubo
	for(let i=0; i<cube.vertices.length; i+=1){
		let p = cube.vertices[i];
		let pp={}; pp.x=p.x; pp.y=p.y; pp.z=p.z;//faz uma cópia dos valores, para conservar os valores originais do cubo.
		/*
		// roda em torno do eixo y do cubo
		rx =  pp.z*Math.cos(cubang) + pp.x*Math.sin(cubang);
		rz = -pp.z*Math.sin(cubang) + pp.x*Math.cos(cubang);
		pp.z = rz; pp.x = rx;
		
		// roda em torno do eixo z do cubo
		rx =  pp.x*Math.cos(cubang) + pp.y*Math.sin(cubang);
		ry = -pp.x*Math.sin(cubang) + pp.y*Math.cos(cubang);
		pp.x = rx; pp.y = ry;
		*/
		
		//desenha o ponto do cubo no background (espaço do mundo)
		gz = cube.z+pp.z; gx = cube.x+pp.x; //cube.x, .y e .z são posições globais; cube.vertices[i].x, .y e .z são posições locais do cubo. Por isso cada ponto é cube.x+cube.vertices[i].x para definir a posição nas coordenadas de mundo.
		ctx.fillStyle = "Black";
		ctx.beginPath();
		ctx.arc(gz, gx, 5, 0, TWO_PI, false);
		ctx.fill();
		
		//traduz para o player (o player, aqui, é considerado fixo, os pontos se movem ao redor do player.
		tx = gx - player.x;
		tz = gz - player.z;
		
		
		//roda o ponto do cubo em torno do eixo y do player
		ang = -player.ang;
		rx =  tx*Math.cos(ang) + tz*Math.sin(ang);
		rz = -tx*Math.sin(ang) + tz*Math.cos(ang);
		tx = rx; tz = rz;
		
		//desenha o ponto relativo ao player (espaço da câmera)
		pp.z = GLOBAL_Z_AXIS+tz; pp.x = GLOBAL_X_AXIS+tx;
		ctx.fillStyle = "Red";
		ctx.beginPath();
		ctx.arc(pp.z, pp.x, 5, 0, TWO_PI, false);
		ctx.fill();
		
		//desenha uma linha entre o player e o ponto do cubo no espaço da câmera (ou seja, coordenada local)
		ctx.lineWidth=0.5;
		ctx.setLineDash([1,1]);
		ctx.strokeStyle = "Tomato";
		ctx.beginPath();
		x1=pp.z; y1=pp.x;    x2=GLOBAL_Z_AXIS; y2=GLOBAL_X_AXIS;
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.stroke();
		ctx.setLineDash([]);
		
		//desenha uma linha entre o player e o ponto do cubo no espaço do mundo (ou seja, coordenada global)
		ctx.lineWidth=0.5;
		ctx.setLineDash([1,1]);
		ctx.strokeStyle = "Gray";
		ctx.beginPath();
		x1=gz; y1=gx;    x2=player.z; y2=player.x;
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.stroke();
		ctx.setLineDash([]);
		
		//faz a transformação de perspectiva
		gy = cube.y + pp.y;
		ty = gy - player.y;
		sx = (tx/tz)*d;
		sy = (ty/tz)*d;
		
		//projeta os pontos na tela
		ctx.fillStyle = "Green";
		ctx.beginPath();
		ctx.arc(scx+sx, scy+sy, 3, 0, TWO_PI, false);
		ctx.fill();
		
		//destaca os pontos projetados (player dinâmico)
		//linha 1, entre o player e o ponto do cubo no espaço do mundo (coordenada global)
		ctx.lineWidth = 3;
		ctx.strokeStyle = "Oange";
		ctx.beginPath();
		x1=gz; y1=gx;    x2=player.z; y2=player.x;
		/*ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.stroke();*/
		//linha 2, entre o P1 e o P2 que definem a screen (tela de projeção da câmera)
		//p1
		let r1,ang1, r2,ang2;
		let px=player.z, py=player.x, pa = player.ang;
		let x3,y3, x4,y4;
		r1 = d/Math.cos(HALF_FOV);
		ang1 = pa - HALF_FOV;
		x3 = r1*Math.cos(ang1);
		y3 = r1*Math.sin(ang1);
		/*ctx.fillStyle = "Red";
		ctx.beginPath();
		ctx.arc(px+x3, py+y3, 7, 0, TWO_PI, false);
		ctx.fill();*/
		//p2
		r2 = d/Math.cos(HALF_FOV);
		ang2 = pa + HALF_FOV;
		x4 = r2*Math.cos(ang2);
		y4 = r2*Math.sin(ang2);
		/*ctx.fillStyle = "Red";
		ctx.beginPath();
		ctx.arc(px+x4, py+y4, 7, 0, TWO_PI, false);
		ctx.fill();*/
		//ponto de interseção, se houver
		p = intersectSegments(x1,y1,x2,y2, px+x3,py+y3,px+x4,py+y4);
		if(p != null){
			ctx.fillStyle = "Blue";
			ctx.beginPath();
			ctx.arc(p.x, p.y, 3, 0, TWO_PI, false);
			ctx.fill();
		}
		
		//destaca os pontos projetados (player estático)
		//linha 1, entre o player e o ponto do cubo no espaço da câmera
		ctx.lineWidth = 3;
		ctx.strokeStyle = "Oange";
		ctx.beginPath();
		x1=pp.z; y1=pp.x;    x2=GLOBAL_Z_AXIS; y2=GLOBAL_X_AXIS;
		//linha 2, entre o P1 e o P2 que definem a screen (tela de projeção da câmera)
		//p1
		pa = 0;	
		r1 = d/Math.cos(HALF_FOV);
		ang1 = pa - HALF_FOV;
		x3 = GLOBAL_Z_AXIS + r1*Math.cos(ang1);
		y3 = GLOBAL_X_AXIS + r1*Math.sin(ang1);
		//p2
		r2 = d/Math.cos(HALF_FOV);
		ang2 = pa + HALF_FOV;
		x4 = GLOBAL_Z_AXIS + r2*Math.cos(ang2);
		y4 = GLOBAL_X_AXIS + r2*Math.sin(ang2);
		//ponto de interseção, se houver
		p = intersectSegments(x1,y1,x2,y2, x3,y3,x4,y4);
		if(p != null){
			ctx.fillStyle = "Blue";
			ctx.beginPath();
			ctx.arc(p.x, p.y, 3, 0, TWO_PI, false);
			ctx.fill();
		}
	}
}

function screenText(){
	let c = document.getElementById("background");
	let ctx = c.getContext("2d");
	let str = [{text:"Espaço do Modelo (não representado)",   color:"Gray"},
			   {text:"Espaço do Mundo (pontos em preto)",     color:"Black"},
			   {text:"Espaço da Câmera (pontos em vermelho)", color:"Red"},
			   {text:"Espaço de Projeção (pontos em azul)",   color:"Blue"},
			   {text:"Espaço de Tela (pontos em verde)",      color:"Green"},
			   {text:"",                                      color:""},
			   {text:"eixo z (em azul)",                      color:"Blue"},
			   {text:"eixo x (em vermelho)",                  color:"Red"},
			   {text:"eixo y (em verde)",                     color:"Green"},
			   {text:"",                                                                       color:""},
			   {text:"controles",                                                              color:"Black"},
			   {text:"teclado: w, a, s, d, seta esquerda e seta direita",                     color:"Black"}
			 ];
	ctx.font = "bold 1em consolas";
	
	//justificado à esquerda pela maior string
	let x2 = Math.max(SCREEN_WIDTH, BACKGROUND_WIDTH) -200 - 20;
	let x1 = x2;
	for(let i=0; i<str.length; i+=1){
		let s = str[i].text;
		x2 = Math.max(SCREEN_WIDTH, BACKGROUND_WIDTH) - ctx.measureText(s).width - 20;
		if(x1 > x2){
			x1 = x2;
		}
	}
	
	//imprime o texto
	for(let i=0; i < str.length; i+=1){
		//texto em preto
		ctx.fillStyle = str[i].color;
		let s = str[i].text;
		y1 = 100+i*20;
		ctx.fillText(s, x1, y1);
	}
}



//------------------ screen ------------------