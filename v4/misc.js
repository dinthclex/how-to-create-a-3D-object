//------------------ miscellaneous ------------------





function drawAxes(s="xyz", cx=SCREEN_WIDTH/2, cy=SCREEN_HEIGHT/2, ang1=0, dx1=SCREEN_WIDTH/4, dx2=SCREEN_WIDTH/4, dy1=SCREEN_HEIGHT/4, dy2=SCREEN_HEIGHT/4){
	/*function drawAxes (s, cx, cy, ang1,dx1, dx2, dy1, dy2) todos parâmetros são opcionais
	padrão: "xyz", letra munúscula, seta para uma lado; letra maiúscula, seta para o outro lado.
	*/
	let c = document.getElementById("background");
	let ctx = c.getContext("2d");
	
	let x1,y1,x2,y2, x3,y3,ang3, x4,y4 ,ang2,r;
	
	let s1, s2, s3;
	let ss="xyz";//standard string
	let col1, col2, col3;
	let cx2,cy2;
	
	//guarda os valores dos estilos de contexto do canvas
	let styl = {};
	styl.strokeStyle = ctx.strokeStyle;
	styl.fillStyle = ctx.fillStyle;
	
	
	s = s.match(/[A-Za-z]/g);
	if(s == null){ s1="x"; s2="y"; }
	else {			s1=(s.length>=1 ? s[0] : ss[0]); ss=ss.replace(s1, ""); //se s1='z', ss:"xyz"->ss:"xy"
					s2=(s.length>=2 ? s[1] : ss[0]); ss=ss.replace(s2, ""); //x "xy"->"y"
					s3=(s.length>=3 ? s[2] : ss[0]);                     //y "y"->""
					}
	col1 = ( s1=='x'||s1=='X' ? "Red" : ( s1=='y'||s1=='Y' ? "Green" : "Blue" ) );
	col2 = ( s2=='x'||s2=='X' ? "Red" : ( s2=='y'||s2=='Y' ? "Green" : "Blue" ) );
	col3 = ( s3=='x'||s3=='X' ? "Red" : ( s3=='y'||s3=='Y' ? "Green" : "Blue" ) );
	
	//ang1 = (Date.now()/10000)*TWO_PI;
	r= Math.max(5, ((dx1+dx2+dy1+dy2)/4)*(20/300)*1);
	ctx.font = Math.max(10, (1.8*r))+"px consolas";
	ctx.lineWidth = 1 +  ( ((dx1+dx2+dy1+dy2)/4)   )/185;
	
	
	//desenha os eixos fixos (eixos globais)
	//eixo z
	x1 = cx+dx1*Math.cos(ang1+PI); y1 = cy+dx1*Math.sin(ang1+PI);
	x2 = cx+dx2*Math.cos(ang1   ); y2 = cy+dx2*Math.sin(ang1   );
	ctx.strokeStyle = col1;
	ctx.beginPath();
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.stroke();
	//eixo z, seta
	if(s1==s1.toLowerCase()){
	ctx.beginPath();
	ang2 = ang1 -3*QUARTER_PI;
	ctx.moveTo(x2+r*Math.cos(ang2),y2+r*Math.sin(ang2));
	ctx.lineTo(x2,y2);
	ang2 = ang1 +3*QUARTER_PI;
	ctx.lineTo(x2+r*Math.cos(ang2),y2+r*Math.sin(ang2));
	ctx.stroke(); }
	else {
	ctx.beginPath();
	ang2 = ang1 -1*QUARTER_PI;
	ctx.moveTo(x1+r*Math.cos(ang2),y1+r*Math.sin(ang2));
	ctx.lineTo(x1,y1);
	ang2 = ang1 +1*QUARTER_PI;
	ctx.lineTo(x1+r*Math.cos(ang2),y1+r*Math.sin(ang2));
	ctx.stroke(); }
	//eixo z, texto: 'z'
	ctx.fillStyle = col1;
	//ctx.font=(r/5)+"em consolas";
	x3=x2-2*r; x3 = x3<0 ? x2+2*r : x3 ;
	y3=y2+2*r; y3 = y3<0 ? y2-2*r : y3 ;
	ctx.fillText(s1.toLowerCase(), x3, y3);
	
	//eixo x
	x1 = cx+dy1*Math.cos(ang1-HALF_PI); y1 = cy+dy1*Math.sin(ang1-HALF_PI);
	x2 = cx+dy2*Math.cos(ang1+HALF_PI); y2 = cy+dy2*Math.sin(ang1+HALF_PI);
	ctx.strokeStyle = col2;
	ctx.beginPath();
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.stroke();
	//eixo x, seta
	if(s2==s2.toLowerCase()){
	ctx.beginPath();
	ang2 = ang1 +5*QUARTER_PI;
	ctx.moveTo(x2+r*Math.cos(ang2),y2+r*Math.sin(ang2));
	ctx.lineTo(x2,y2);
	ang2 = ang1 -1*QUARTER_PI;
	ctx.lineTo(x2+r*Math.cos(ang2),y2+r*Math.sin(ang2));
	ctx.stroke(); }
	else {
	ctx.beginPath();
	ang2 = ang1 +1*QUARTER_PI;
	ctx.moveTo(x1+r*Math.cos(ang2),y1+r*Math.sin(ang2));
	ctx.lineTo(x1,y1);
	ang2 = ang1 +3*QUARTER_PI;
	ctx.lineTo(x1+r*Math.cos(ang2),y1+r*Math.sin(ang2));
	ctx.stroke(); }
	//eixo x, texto: 'x'
	ctx.fillStyle = col2;
	//ctx.font=(r/5)+"em consolas";
	x3=x2-2*r; x3 = x3<0 ? x2+2*r : x3 ;
	y3=y2-2*r; y3 = y3<0 ? y2+2*r : y3 ;
	ctx.fillText(s2.toLowerCase(), x3, y3);
	
	//eixo y
	ctx.fillStyle = col3;
	ctx.strokeStyle = col3;
	if(s3==s3.toLowerCase()){
	//eixo y, traseira da seta
	// linha 1
	cx2 = (0.15*dx1)*Math.cos(ang1+3*QUARTER_PI);
	cy2 = (0.15*dx1)*Math.sin(ang1+3*QUARTER_PI);
	if( (cx+cx2) < 0 ){ cx2=-cx2; }
	if( (cy+cy2) < 0 ){ cy2=-cy2; }
	x1 = cx+cx2-0.6*r; y1 = cy+cy2-0.6*r;
	x2 = cx+cx2+0.6*r; y2 = cy+cy2+0.6*r;
	x3 = cx+cx2+0.6*r; y3 = cy+cy2-0.6*r;
	x4 = cx+cx2-0.6*r; y4 = cy+cy2+0.6*r;
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
	// linha 2
	ctx.beginPath();
	ctx.moveTo(x3, y3);
	ctx.lineTo(x4, y4);
	ctx.stroke(); }
	else {
	//eixo y, frente da seta
	ctx.beginPath();
	cx2 = (0.15*dx1)*Math.cos(ang1+3*QUARTER_PI);
	cy2 = (0.15*dx1)*Math.sin(ang1+3*QUARTER_PI);
	x1 = cx+cx2;
	y1 = cy+cy2;
	ctx.arc(x1,y1, r*0.75, 0, TWO_PI, false);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(x1,y1, r*0.15, 0, TWO_PI, false);
	ctx.fill(); }
	//eixo y, texto: 'y'
	x1 = cx+cx2-2*r; x1 = x1 < 0 ? cx+cx2+2*r : x1 ;
	y1 = cy+cy2+2*r; y1 = y1 < 0 ? cy+cy2-2*r : y1 ;
	ctx.fillText(s3.toLowerCase(), x1, y1);
	
	//restaura os valores dos estilos de contexto do canvas
	ctx.strokeStyle = styl.strokeStyle;
	ctx.fillStyle = styl.fillStyle;
	
}

function intersectSegments(x1,y1,x2,y2,    x3,y3,x4,y4, ex=false){ //Reta 1: P1(x1,y1)->P2(x2,y2)    Reta 2: P3(x3,y3)->P4(x4,y4)    extendedLine (estender a linha além dos segmentos?)
	/*
	Objetivo: saber se as retas se cruzam.
	Como? por meio de suas equações.
	Como usar suas equações? (1) Usar a forma paramétrica para cada coordenada (x e y) de cada uma das duas equações (eq. da reta 1 e eq. da reta 2), 
	                         (2) igualar e, então, (3) encontrar o x e o y em que são iguais, ou seja o mesmo ponto (em que se interceptam).
	método de resolução: como se trata de um sistema de equações lineares com duas incógnitas, podemos 
	                     utilizar a eliminação sistemática (é o mesmo que a Regra de Cramer). A ideia é 
						 manipular as equações originais de forma a eliminar todas as variáveis, exceto uma, 
						 para que possamos resolver para essa variável diretamente.
	
	Determinantes
	
	O determinates é um número associado a uma matriz quadrada.
	
	1) Representação paramétrica das retas:
	Reta 1:
	x = x1 + t*(x2 - x1)
	y = y1 + t*(y2 - y1)
	
	Reta 2:
	x = x3 + u*(x4 - x3)
	y = y3 + u*(y4 - y3)
	
	2) igualando as equações:
	x1 + t*(x2 - x1) = x3 + u*(x4 - x3)
	y1 + t*(y2 - y1) = y3 + u*(y4 - y3)
	
	3) reorganizando o sistema:
	Aqui obtém-se um sistema de equações lineares com duas incógnitas ('t' e 'u'), pois x1,x2,x3,x4,y1,y2,y3,y4 já são conhecidos.
	(x2 - x1)*t - (x4 - x3)*u = (x3 - x1)
	(y2 - y1)*t - (y4 - y3)*u = (y3 - y1)
	
	simplificando:
	a=(x2 - x1)    b=-(x4 - x3)    e=(x3 - x1)    x=t
	c=(y2 - y1)    d=-(y4 - y3)    f=(y3 - y1)    y=u
	
	eliminação sistemática (ideia central da Regra de Cramer):

	 I) at + bu = e
	II) ct + du = f
	
	Onde a, b, c, d e e são constantes conhecidas e t e u são as variáveis que queremos encontrar.
	
	eliminar 'u' (para resolver 't'):
	    adt + bdu = ed     I) *d
	    bct + bdu = bf    II) *b
	subtrair a segunda da primeira:
	    adt + bdu  - bct - bdu = ed - bf
		adt - bct = ed - bf
		(ad - bc)*t = (ed - bf)
	resolvendo para 't':
	    t = (ed - bf) / (ad - bc)
		
	eliminar 't' (para resolver 'u'):
	    act + bcu = ec     I) *c
	    act + adu = af    II) *a
	subtrair a primeira da segunda (para ficar 'ad-bc' também):
	    act + adu - act - bcu = af - ec
		adu - bcu = af - ec
	    (ad - bc)*u = (af - ec)
	resolvendo para 'u':
	    u = (af - ec) / (ad - bc)
		
	Até aqui nada de matrizes, apenas manipulação algébrica das equações. As matrizes são apenas um outro jeito 
	de apresentar a mesma coisa.
	
	4) Notação matricial (onde os Determinantes entram):
	reconhecendo os determinates:
	(x2 - x1)*t - (x4 - x3)*u = (x3 - x1)    | (x2 - x1) -(x4 - x3) | * | t | = | (x3 - x1) |
	(y2 - y1)*t - (y4 - y3)*u = (y3 - y1)    | (y2 - y1) -(y4 - y3) |   | u | = | (y3 - y1) |
	
	a=(x2 - x1)    b=-(x4 - x3)    e=(x3 - x1)    x=t
	c=(y2 - y1)    d=-(y4 - y3)    f=(y3 - y1)    y=u
	
	 I) at + bu = e    |a b| * |t| = |e|
	II) ct + du = f    |c d|   |u|   |f|
	
	
	O determinante de uma matriz 2x2 |a b| é definido como (ad - bc).
	                                 |c d|
	Se chamarmos a matriz 2x2 de A, o vetor coluna de variáveis de X e o vetor coluna de resultados de B, temos:
	A * X = B
	
	t = (ed - bf) / (ad - bc)
	      |e b|   /   |a b| 
	      |f d|       |c d|
	u = (af - ec) / (ad - bc)
	      |a e|   /   |a b|
	      |c f|       |c d|
	Se o determinante de |a b| é (ad - bc),
	                     |c d|
	   o determinante de |e b| é (ed - bf) e 
	                     |f d|
	   o determinante de |a e| é (af - ec), então:
	                     |c f|
						 
	5) resolução pela Regra de Cramer:
	A solução para esse sistema de equações lineares pode ser encontrada usando a Regra de Cramer. A regra de Cramer diz que:

	t = det(At) / det(A)
	u = det(Au) / det(A)
	
	Onde:
	
	det(A) é o determinante da matriz A.
	det(At) é o determinante da matriz formada substituindo a primeira coluna de A (a coluna associada a t) pelo vetor B.
	det(Au) é o determinante da matriz formada substituindo a segunda coluna de A (a coluna associada a u) pelo vetor B.
	
	6) Cáculo dos determinantes:
	
	det(A)  = ( a*d ) - ( b*c ) = ( (x2 - x1)*-(y4 - y3) ) - ( -(x4 - x3)*(y2 - y1) )
	det(At) = ( e*d ) - ( b*f ) = ( (x3 - x1)*-(y4 - y3) ) - ( -(x4 - x3)*(y3 - y1) )
	det(Au) = ( a*f ) - ( e*c ) = ( (x2 - x1)* (y3 - y1) ) - (  (x3 - x1)*(y2 - y1) )
	
	                                                                                               */


	let a,b,c,d,e,f, detA,detAt,detAu, t,u, x,y;
	a=(x2 - x1);    b=-(x4 - x3);    e=(x3 - x1);
	c=(y2 - y1);    d=-(y4 - y3);    f=(y3 - y1);
	
	detA = (a*d - b*c);
	
	if(detA == 0){
		return null; // são paralelas ou coincidentes
	}
	detAt = (e*d - b*f);
	    t = detAt / detA;
		
	detAu = (a*f - e*c);
	    u = detAu / detA;
	
	x = x1 + t*(x2 - x1); // ou x = x3 + u*(x4 - x3);
	y = y1 + t*(y2 - y1); // ou y = y3 + u*(y4 - y3);

	if( t < 0 || t > 1 || u < 0 || u > 1 ){
		if(ex) {
			return {x:x, y:y, inSeg:false}; }
		return null; // interceptam-se fora dos limites dos segmentos
	}
	
	return {x:x, y:y, inSeg:true}; // interceptam-se dentro dos limites dos segmentos (in segment)
	
}

function drawTriangle(x1,y1, x2,y2, x3,y3 , seg={sega:true, segb:true, segc:true}, ang={anga:true, angb:true, angc:true}, fill=false, col={a:"Black", b:"Black", c:"Black", fill: "rgba(0,0,0,0.5)"}, w=1){
	let c = document.getElementById("background");
	let ctx = c.getContext("2d");
	
	//apenas para seleção
	let dx, dy, sega, segb, segc, cos, ang2, hpi;
	hpi = Math.round(HALF_PI*10000000000)/10000000000;//limita a precisão em 10 casa após a vírgula
	
	if(fill){
	// triângulo preenchido
	ctx.fillStyle = col.fill;
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.lineTo(x3, y3);
	ctx.closePath();
	ctx.fill();}
	
	// segmento a (x1,y1) -> (x2,y2)
	if(seg.sega){
	ctx.lineWidth = w;
	ctx.strokeStyle = col.a;
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();}
	// segmento b (x2,y2) -> (x3,y3)
	if(seg.segb){
	ctx.lineWidth = w;
	ctx.strokeStyle = col.b;
	ctx.beginPath();
	ctx.moveTo(x2, y2);
	ctx.lineTo(x3, y3);
	ctx.stroke();}
	// segmento c (x3,y3) -> (x1,y1)
	if(seg.segc){
	ctx.lineWidth = w;
	ctx.strokeStyle = col.c;
	ctx.beginPath();
	ctx.moveTo(x3, y3);
	ctx.lineTo(x1, y1);
	ctx.stroke();}
	
	
	//seleciona se vai desenhar um arco ou um quadrado (ângulo reto) por meio da lei dos cossenos
	dx = x2 - x1;
	dy = y2 - y1;
	sega = Math.sqrt( dx*dx + dy*dy );
	dx = x3 - x2;
	dy = y3 - y2;
	segb = Math.sqrt( dx*dx + dy*dy );
	dx = x1 - x3;
	dy = y1 - y3;
	segc = Math.sqrt( dx*dx + dy*dy );
	
	
	// ângulo aposto ao segmento a
	if(ang.anga){
	cos = (sega*sega - segb*segb - segc*segc)/(-2*segb*segc);
	ang2 = Math.round(Math.acos(cos)*10000000000)/10000000000;//diminui a precisão do valor para a comparação
	if(ang2 == hpi){ rightAngle(x1,y1, x2,y2, x3,y3, col.a, w); }
	else {              acuteAngle(x2,y2, x3,y3, x1,y1, col.a, w);   } }
	
	// ângulo aposto ao segmento b
	if(ang.angb){
	cos = (segb*segb - sega*sega - segc*segc)/(-2*sega*segc);
	ang2 = Math.round(Math.acos(cos)*10000000000)/10000000000;
	if(ang2 == hpi){ rightAngle(x1,y1, x2,y2, x3,y3, col.b, w); }
	else {              acuteAngle(x2,y2, x1,y1, x3,y3, col.b, w); } }
	
	// ângulo aposto ao segmento c
	if(ang.angc){
	cos = (segc*segc - sega*sega - segb*segb)/(-2*sega*segb);
	ang2 = Math.round(Math.acos(cos)*10000000000)/10000000000;
	if(ang2 == hpi){ rightAngle(x1,y1, x2,y2, x3,y3, col.c, w); }
	else {              acuteAngle(x1,y1, x2,y2, x3,y3, col.c, w);  } }
	
}

function rightAngle(x1,y1, x2,y2, x3,y3, col, w=1){ // desenha um quadrado na posição do ângulo de 90º. São considerados que o ponto de origem é (x1,y1) e o ângulo reto é (x2,y2)
	let c = document.getElementById("background");
	let ctx = c.getContext("2d");
	let side, v, ang;
	let x,y;
	let sega={}, segb={}, segc={};
	//                                                           _____o (x3,y3)
	//                                                      _____     |
	//                                                 _____          |
	//                                            _____               |
	//                         (segmento c)  _____              ______|  (segmento b)
	//             |                    _____                  |       |
	//             |               _____                       |       |  <---- ângulo reto (90º)
	//             |          _____                            |       |
	//             |     _____                        _________|_______o (x2, y2)
	//    (origem) |_____            _________________
	// ... (x1,y1) o_________________  (segmento a)   .........................................> (eixo x)
	//             |
	//             |
	//             |
	//             v
	//          (eixo y)
	
	
	
	//a rotação é sempre em torno da origem de um sistema de coordenadas
	// dimensão = alvo - origem
	// (x1,y1) origem
	// (x2,y2) onde fica o ângulo reto
	// (x3,y3) terceiro ponto
	
	//obtém os valores ()
	//segmento a
	sega.dx = x2 - x1;
	sega.dy = y2 - y1;
	sega.leng = Math.sqrt( sega.dx*sega.dx + sega.dy*sega.dy );
	sega.ang = Math.atan2(sega.dy, sega.dx);//partindo do eixo x positivo
	//segmento b
	segb.dx = x3 - x2;// ou x2 - x3
	segb.dy = y3 - y2;// ou y2 - y3
	segb.leng = Math.sqrt( segb.dx*segb.dx + segb.dy*segb.dy );
	segb.ang = Math.atan2(segb.dy, segb.dx);//partindo do eixo x positivo
	//segmento c
	segc.dx = x3 - x1;//origem em (x1,y1)
	segc.dy = y3 - y1;//origem em (x1,y1)
	segc.leng = Math.sqrt( segc.dx*segc.dx + segc.dy*segc.dy );
	segc.ang = Math.atan2(segc.dy, segc.dx);//partindo do eixo x positivo
	
	//define a medida do lado do quadrado
	//etapa 1 (define um tamnho, 1/25 do maior segmento)
	v = Math.max(sega.leng, segb.leng);
	side = v / 25;
	//etapa 2 (limita a metade do tamanho do menor segmento)
	v = Math.min(sega.leng, segb.leng) / 2;
	if(side > v){
		side = v;
	}
	//etapa 3 (limita em em tamnho, 50)
	if(side > 50){
		side = 50;
	}
	
	//desenha o quadrado (ângulo reto)
	//conto inferior direito
	ctx.fillStyle = col;
	ctx.lineWidth = w;
	ctx.beginPath();
	x = x2; y = y2;
	//ctx.moveTo(x, y);
	//canto inferior esquerdo
	ang = 4*QUARTER_PI;
	x = x+side*Math.cos(sega.ang+ang); y = y+side*Math.sin(sega.ang+ang);
	ctx.moveTo(x, y);
	//y3' = -x      *     sin(ang)      + y      *     cos(ang)
	  v   = -segc.dx*Math.sin(sega.ang) + segc.dy*Math.cos(sega.ang);
	 if(v < 0){
		//para cima
		ang = -2*QUARTER_PI;
		x = x+side*Math.cos(sega.ang+ang); y = y+side*Math.sin(sega.ang+ang);
		ctx.fillStyle = "Yellow";
	 } else {
		//para baixo
		ang = 2*QUARTER_PI;
		x = x+side*Math.cos(sega.ang+ang); y = y+side*Math.sin(sega.ang+ang);
		ctx.fillStyle = "Purple";
	 }
	ctx.lineTo(x, y);
	//para direita
	ang = 0;
	x = x+side*Math.cos(sega.ang+ang); y = y+side*Math.sin(sega.ang+ang);
	ctx.lineTo(x, y);
	//ctx.closePath();
	ctx.stroke();
}

function acuteAngle(x1,y1, x2,y2, x3,y3, col="Black", w=1){// desenha um ângulo agudo >=0º e <90º. É considerado que o ponto do ângulo é (x2,y2)
	let c = document.getElementById("background");
	let ctx = c.getContext("2d");
	let r, v, seg1={}, seg2={};
	
	
	//arco
	//segmento 1
	seg1.dx = x3 - x2;
	seg1.dy = y3 - y2;
	seg1.hyp = Math.round( Math.sqrt(seg1.dx*seg1.dx  + seg1.dy*seg1.dy) * 1000) / 1000; //precisão de três casas após a vírgula. Corrige alternâncias indesejadas.
	seg1.ang = Math.atan2(seg1.dy, seg1.dx);
	//segmento 2
	seg2.dx = x1 - x2;
	seg2.dy = y1 - y2;
	seg2.hyp = Math.round( Math.sqrt(seg2.dx*seg2.dx  + seg2.dy*seg2.dy) * 1000) / 1000;
	seg2.ang = Math.atan2(seg2.dy, seg2.dx);
	//definição do raio
	//etapa 1 (define um tamnho, 1/25 do maior segmento)
	v = Math.max(seg1.hyp, seg2.hyp);
	r = v / 25;
	//etapa 2 (limita a metade do tamanho do menor segmento)
	v = Math.min(seg1.hyp, seg2.hyp) / 2;
	if(r > v){
		r = v;
	}
	//etapa 3 (limita em em tamnho, 50)
	if(r > 50){
		r = 50;
	}
	
	// coloca os dois ângulos no intervalo: ou [0, PI] ou [-PI, 0]
	v = putAnglesBetweenPI(seg1.ang, seg2.ang);
	seg1.ang = v.ang1;
	seg2.ang = v.ang2;
	// coloca os ângulos em ordem: ang1 < ang2
	if(seg2.ang < seg1.ang){ v=seg2.ang; seg2.ang=seg1.ang; seg1.ang=v; }
	//desenha o arco
	ctx.strokeStyle = col;
	ctx.lineWidth = w;
	ctx.beginPath();
	ctx.arc(x2, y2, r, seg1.ang, seg2.ang, false);
	ctx.stroke();
}

function putAnglesBetweenPI(ang1, ang2){ // coloca os dois ângulos no intervalo: ou [0, PI] ou [-PI, 0]
	let absang1=Math.abs(ang1), absang2=Math.abs(ang2);
	let sgnang1 = ang1 < 0 ? -1 : 1 , sgnang2 = ang2 < 0 ? -1 : 1;
	let diff = Math.abs(ang2 - ang1);
	if(diff > PI){
		if(absang1 > absang2){
			ang1 = ang1 - sgnang1*TWO_PI;
		} else {
			ang2 = ang2 - sgnang2*TWO_PI;
		}
	}
	return {ang1:ang1, ang2:ang2}
}

function normalizeAngle(ang){ // normaliza para (-PI, PI]
	let d, i;
	d = ang / TWO_PI;
	i = Math.trunc(d);
	ang -= i*TWO_PI;
	if(ang < 0 ) ang += TWO_PI;
	//if(ang < -PI) ang += TWO_PI;
	//if(ang >  PI) ang -= TWO_PI;
	return ang;
}

function line(x1,y1, x2,y2, col="Black", wid=1, lcap="flat", dash="solid", rcap="flat"){
	/* 
	parâmetros: x1,y1,x2,y2 obrigatórios, os outros são opcionais
	Ponto 1: (x1,y1)
	Ponto 2: (x2,y2)
	No estilo do Paint.net
	lcap = flat (butt) | arrow | filledArrow | rounded
	dash = [] | [v1,v2,...] | solid | dashed | dotted | dashDot | dashDotDot
	rcap = flat (butt) | arrow | filledArrow | rounded
	*/
	let c = document.getElementById("background");
	let ctx = c.getContext("2d");
	let ld,lw,lj,ss,fs,   dx,dy,ang,  ang1,r,con,  x,y;
	//'con' is 'connector'
	
	//valores
	//dash
	if(!Array.isArray(dash)){
			   if(dash == "solid"){ // sólido
			dash = [];
		} else if(dash == "dashed"){ // tracejado
			dash = [3*wid, 1*wid];
		} else if(dash == "dotted"){ // pontilhado
			dash = [wid, wid];
		} else if(dash == "dashDot"){ // traço, ponto
			dash = [3*wid, wid, wid, wid];
		} else if(dash == "dashDotDot"){ // traço, ponto, ponto
			dash = [3*wid, wid, wid, wid, wid, wid];
		} else {
			dash = [];
		}
	}
	//ang
	dx = x2 - x1;
	dy = y2 - y1;
	ang = Math.atan2(dy, dx);
	
	//guarda valores de contexto do canvas
	lw = ctx.lineWidth;
	ld = ctx.getLineDash();
	lj = ctx.lineJoin;
	ss = ctx.strokeStyle;
	fs = ctx.fillStyle;
	
	//aplica estilo à linha
	ctx.strokeStyle = col;
	ctx.fillStyle = col;
	ctx.lineWidth = wid;
	ctx.setLineDash(dash);
	ctx.lineJoin = "miter"; // bevel, round and miter (default)
	
	//desenha o traço
	ctx.beginPath();
		 if(lcap=="flat"      ){	x = x1;
									y = y1; }
	else if(lcap=="arrow"      ){	x = x1;
									y = y1; }
	else if(lcap=="filledArrow"){	x = x1 + (4*wid)*Math.cos(ang);
									y = y1 + (4*wid)*Math.sin(ang); }
	else if(lcap=="rounded"    ){	x = x1;
									y = y1; }
	else {							x = x1;
									y = y1; }
	ctx.moveTo(x,y);
		 if(rcap=="flat"      ){	x = x2;
									y = y2; }
	else if(rcap=="arrow"      ){	x = x2;
									y = y2; }
	else if(rcap=="filledArrow"){	x = x2 - (4*wid)*Math.cos(ang);
									y = y2 - (4*wid)*Math.sin(ang); }
	else if(rcap=="rounded"    ){	x = x2;
									y = y2; }
	else {							x = x2;
									y = y2; }
	ctx.lineTo(x,y);
	ctx.stroke();
	
	// ---- extremidades, (x1,y1) e (x2,y2) ----
	ctx.setLineDash([]);
	//seta (arrow)
	r = 4*wid;
	if(lcap=="arrow"){
	//extremidade em (x1,y1)
	ctx.beginPath();
	ang1 = -1*QUARTER_PI;
	ctx.moveTo(x1+r*Math.cos(ang1+ang),y1+r*Math.sin(ang1+ang));
	ctx.lineTo(x1,y1);
	ang1 =  1*QUARTER_PI;
	ctx.lineTo(x1+r*Math.cos(ang1+ang),y1+r*Math.sin(ang1+ang));
	ctx.stroke(); }
	if(rcap=="arrow"){
	//extremidade em (x2,y2)
	ctx.beginPath();
	ang1 = -3*QUARTER_PI;
	ctx.moveTo(x2+r*Math.cos(ang1+ang),y2+r*Math.sin(ang1+ang));
	ctx.lineTo(x2,y2);
	ang1 =  3*QUARTER_PI;
	ctx.lineTo(x2+r*Math.cos(ang1+ang),y2+r*Math.sin(ang1+ang));
	ctx.stroke(); }
	
	//seta preenchida
	con = {};
	if(lcap=="filledArrow"){
	//extremidade em (x1,y1)
	ctx.beginPath();
	con.side = 5*wid;
	con.dx = con.side;
	con.dy = con.side/2;
	con.leng = Math.sqrt(con.dx*con.dx + con.dy*con.dy);
	ang1 = Math.atan2(con.dy,con.dx);
	x = x1 + con.leng*Math.cos(ang1+ang);
	y = y1 + con.leng*Math.sin(ang1+ang);
	ctx.moveTo(x,y);
	x = x1;
	y = y1;
	ctx.lineTo(x,y);
	x = x1 + con.leng*Math.cos(-ang1+ang);
	y = y1 + con.leng*Math.sin(-ang1+ang);
	ctx.lineTo(x,y);
	ctx.closePath();
	ctx.fill(); }
	if(rcap=="filledArrow"){
	//extremidade em (x2,y2)
	ctx.beginPath();
	con.side = 5*wid;
	con.dx = con.side;
	con.dy = con.side/2;
	con.leng = Math.sqrt(con.dx*con.dx + con.dy*con.dy);
	ang1 = -PI + Math.atan2(con.dy,con.dx);
	x = x2 + con.leng*Math.cos(ang1+ang);
	y = y2 + con.leng*Math.sin(ang1+ang);
	ctx.moveTo(x,y);
	x = x2;
	y = y2;
	ctx.lineTo(x,y);
	x = x2 + con.leng*Math.cos(-ang1+ang);
	y = y2 + con.leng*Math.sin(-ang1+ang);
	ctx.lineTo(x,y);
	ctx.closePath();
	ctx.fill(); }
	
	//arredondado
	if(lcap=="rounded"){
	ang1=HALF_PI*(1-0.1);
	ctx.beginPath();
	ctx.arc(x1,y1 ,wid/2,ang1+ang,-ang1+ang, false);
	ctx.fill(); }
	if(rcap=="rounded"){
	ang1=HALF_PI*(1+0.1);
	ctx.beginPath();
	ctx.arc(x2,y2 ,wid/2,-ang1+ang,ang1+ang, false);
	ctx.fill(); }
	
	//restaura os valores de contexto do canvas
	ctx.setLineDash(ld);
	ctx.lineWidth = lw;
	ctx.lineJoin = lj;
	ctx.strokeStyle = ss;
	ctx.fillStyle = fs;
}

function xrot(x,y, ang){ // retorna o valor de x após a rotação
	//let tx, ty;
	return  x*Math.cos(ang) + y*Math.sin(ang);
	//ty = -x*Math.sin(ang) + y*Math.cos(ang);
}

function yrot(x,y, ang){ // retorna o valor de y após a rotação
	//let tx, ty;
	//tx =  x*Math.cos(ang) + y*Math.sin(ang);
	return -x*Math.sin(ang) + y*Math.cos(ang);
}

function leng(x1,y1, x2,y2){
	let dx=x2-x1, dy=y2-y1;
	return Math.sqrt( dx*dx + dy*dy );
}

function point(x, y, col="Black", r=5){
	let c = document.getElementById("background");
	let ctx = c.getContext("2d");
	let fs = ctx.fillStyle;
	
	ctx.fillStyle = col;
	ctx.beginPath();
	ctx.arc(x,y,r,0,TWO_PI);
	ctx.fill();
	
	ctx.fillStyle = fs;
}

function text(s, x, y, col="Black" ,fnt="normal 1em consolas", center=false){
	let c = document.getElementById("background");
	let ctx = c.getContext("2d");
	let fs,ff, v;
	//guarda valores de contexto do canvas
	fs = ctx.fillStyle;
	ff = ctx.font;
	
	ctx.font = fnt;
	v = center?-ctx.measureText(s).width/2:0;
	ctx.fillStyle = col;
	ctx.fillText(s, x+v, y);
	
	//restaura os valores de contexto do canvas
	ctx.fillStyle = fs;
	ctx.font = ff;
}

function strokeRect(x1, y1, w, h, col="Black", linw=1, dash=[]){
	let c = document.getElementById("background");
	let ctx = c.getContext("2d");
	let styl={};
	
	//guarda valores de contexto do canvas
	styl.ss = ctx.strokeStyle;
	styl.lw = ctx.lineWidth;
	styl.ld = ctx.getLineDash();
	
	ctx.strokeStyle = col;
	ctx.lineWidth = linw;
	ctx.setLineDash(dash);
	ctx.beginPath();
	ctx.strokeRect(x1,y1, w, h);
	
	//restaura os valores de contexto do canvas
	ctx.strokeStyle = styl.ss;
	ctx.lineWidth = styl.lw;
	ctx.setLineDash(styl.ld);
	
}

function changeHighlight(obj, i, x, y, r){//troca o índice de destaque do objeto, quando é clicado com o mouse
	let c = document.getElementById("background");
	let ctx = c.getContext("2d");
	
	ctx.beginPath();
	ctx.arc(x, y, r, 0, TWO_PI);
	if(ctx.isPointInPath(mouse_x, mouse_y) && mouse_b==1){
		obj.highlightIndex = i;
	}
}
function testPoint(x, y, r){//testa se o mouse está em cima do desenho do ponto
	let c = document.getElementById("background");
	let ctx = c.getContext("2d");
	
	ctx.beginPath();
	ctx.arc(x, y, r, 0, TWO_PI);
	return ctx.isPointInPath(mouse_x, mouse_y);
}







//------------------ miscellaneous ------------------