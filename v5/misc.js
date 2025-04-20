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
	if(ctx.isPointInPath(mouse_x, mouse_y) && frame_onclick){
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

function getFormatedNumber(strA){
	// operando A
	if(strA === undefined){ return Number.NaN; }
	//converte para string, se não é ainda
	strA = strA.toString();
	//pega o número completo
	strA = strA.match(/[\+\-]?[0-9]+(\.[0-9]*)?|[\+\-]?\.[0-9]+/g);  //  [\+\-]?[0-9]+(\.[0-9]*)?     |     [\+\-]?\.[0-9]+
	if(strA == null){
		return Number.NaN;
	}
	strA = strA[0];
	//pega o sinal
	p = strA.match(/[\+\-]/);
	if(p != null){
		p = p[0];
		sgna = p[0] == "-" ? -1 : 1;
		//retira o sinal da string
		strA = strA.replace(p, "");
	} else {
		sgna = 1;
	}
	
	// operando A, formata o número
	//retira "0"s a esquerda  Ex.: 000000123.450000    ->    123.450000
	strA = leftTrimZero(strA);
	//retira "0"s a direita  Ex.: 123.450000    ->    123.45
	strA = rightTrimZero(strA);
	// acrescenta o "0" na parte inteira (se necessário). Ex.: "0.23" (não precisa, pois a parte inteira já está presente, o "0"), mas ".23" (precisa, pois a parte inteira não está presente, o "0", ficando "0.23")
	if(strA[0]=="."){ // Ex.: ".23"
		strA = "0" + strA; // Ex.: "0.23"
	}
	// retira o ponto se estiver na última posição da string. Ex.: "2." -> "2"
	if(strA[strA.length-1]=="."){
		strA = strA.slice(0, strA.length-1);
	}
	
	return ( sgna==-1 ? "-" : "" ) + strA;
}

function divideByStrings(strA, strB){ // divide dois números por meio de strings (método do índice de casa decimais)
	/*
	exemplos: 23/71  números primos
	
	*/
	let p, sgna, sgnb, opA, opB, v, res, rest;
	
	// operando A
	strA = getFormatedNumber(strA); // "-000005.30000" -> "-5.3"      "-.3" -> "-0.3"      ".3" -> "0.3"      "2." -> "2"
	if(strA == Number.NaN){ return Number.NaN; }
	if(strA[0]=="-"){
		sgna=-1;
		//retira o sinal da string
		strA = strA.slice(1,);
	} else { sgna=1; }
	
	// operando B
	strB = getFormatedNumber(strB); // "-000005.30000" -> "-5.3"      "-.3" -> "-0.3"      ".3" -> "0.3"      "2." -> "2"
	if(strB == Number.NaN){ return Number.NaN; }
	if(strB[0]=="-"){
		sgnb=-1;
		//retira o sinal da string
		strB = strB.slice(1,);
	} else { sgnb=1; }
	
	// divisão por 0
	if( compareByStrings(strB, "0") == 0 ){ // ( x / 0 ) = infinito
		return Infinity;
	}
	
	//tratamento de sinais
	if(sgna != sgnb){ // 1 > -1  ou  -1 < 1    (se sinais são diferentes, resulta em -)
		sgn = -1;
	} else { // 1 == 1 ou -1 == -1    (se sinais são iguais, resulta em +)
		sgn = 1;
	}
	
	/* etapas */
	
	// (1) tornar os dois operandos números inteiros
	while( strA.indexOf(".")!=-1 || strA.indexOf(".")!=-1 ){
		strA = multiplyByTens(strA, "10");
		strB = multiplyByTens(strB, "10");
	}
	
	// (2) tornar o dividendo maior que o divisor
	// define res
	res = {};
	// res.shift é usado apenas no final, depois do cálculo de divisão
	res.shift = 0;
	while( compareByStrings(strA, strB) < 0 ){ // while( dividendo < divisor ){
		strA = multiplyByTens(strA, "10"); //           dividendo *= 10;
		res.shift -= 1; //                              res.shift -= 1;
	} //                                            }
	res.str = "";
	
	// (3) faz o cálculo da divisão
	/* até aqui, 
			o divisor > 0; e
		(1) dividendo (strA) e divisor (strB) devem ser números inteiros (sem sinal), ex.: strA="1020", strB="200"; e 
		(2) o dividendo > divisor; e 
			dividendo (strA) e divisor (strB) strings sem "." e sem [+-] apenas com [0-9]+. Ex.: "1", "12", "2", "23", "54", "10000", "10001".
	*/
	// define rest
	rest = {};
	rest.str = "";
	let trnc, tLmt=15, dvd, dvs; //contador de trucagem, limte de truncagem, dividendo, divisor
	let id, pf, ids, zc; // índice do dividendo, ponto final, índice inicial de definição do dividendo atual, contador de zeros para inserir no resultado
	
	//contador para evitar loop infinito em caso de dízima periódica ou não periódica
	trnc=0;
	//índice para ir pegando algarismo a algarismo do dividendo
	id = 0;
	//inicializa o dividendo
	dvd = "0";
	//define o divisor
	dvs = strB;
	//controle do ponto final
	pf = false;
	do {
		//define o dividendo atual
		// zera contador de zeros do resultado
		zc = 0;
		// define o índice inicial do dividendo atual
		ids = id;
		//pega o dividendo atual
		while( compareByStrings(dvd, dvs) < 0 ){ // while ( dividendo < divisor )
			// adição do "0" ao resultado
			zc = id - ids; // conta os "0"s para inserir no resultado
			if(zc > 0){
				// adiciona "0" ao resultado antes do novo digito calculado
				res.str += "0"; 
			}
			
			// adição do "." ao resultado
			// adiciona o "." ao resultado, caso ainda não tenha, antes do novo digito calculado
			if(id >= strA.length && !pf){
				pf = true; res.str += ".";
			} 
			dvd += id < strA.length ? strA[id] : "0"; // pega um digito do dividendo original na posição atual (id)
			id+=1; // vai para o próximo digito do dividendo original
		}
		
		// se dividendo > divisor, então, quantas vezes divisor cabe em dividendo? x
		//calcula o novo digito
		v = 0; //                                    contador = 0 que varia de 1 (inclusive) até 9 (inclusive)
		while( compareByStrings(dvd, dvs) >= 0 ){ // while( dividendo >= divisor ){
			dvd = subtractByStrings(dvd, dvs); //        dividendo -= divisor;
			v += 1; //                                   contador += 1;
		} //                                         }
		rest.str = dvd; // define o resto atual
		res.str += v; // adiciona o novo digito calculado ao resultado
		++trnc;
	} while( compareByStrings(rest.str, "0")!=0 && trnc<tLmt); // while( resto != 0 E não atingiu o limite de truncagem )
	
	//desloca o "." ( divisões por 10) tantas vezes quanto deslocou o "." ( multiplicações por 10 ) para efetuar a etapa 2 (tornar o dividendo maior que o divisor),  x *10 /10 = x, x *100 /100 = x
	res.str = multiplyByTens(res.str, "1", res.shift);
	
	return res.str;
}

function multiplyByStrings(strA, strB){ // multiplica dois números por meio de strings (método do índice de casa decimais)
	let p, sgna, sgnb, sgn, opA, opB, v, res, carr;
	
	//operando A
	if(strA === undefined){ return Number.NaN; }
	//converte para string, se não é ainda
	strA = strA.toString();
	//pega o número completo
	strA = strA.match(/[\+\-]?[0-9]+(\.[0-9]*)?|[\+\-]?\.[0-9]+/g);  //  [\+\-]?[0-9]+(\.[0-9]*)?     |     [\+\-]?\.[0-9]+
	if(strA == null){
		return Number.NaN;
	}
	strA = strA[0];
	//pega o sinal
	p = strA.match(/[\+\-]/);
	if(p != null){
		p = p[0];
		sgna = p[0] == "-" ? -1 : 1;
		//retira o sinal da string
		strA = strA.replace(p, "");
	} else {
		sgna = 1;
	}
	
	//operando B
	if(strB === undefined){ return Number.NaN; }
	//converte para string, se não é ainda
	strB = strB.toString();
	//pega o número completo
	strB = strB.match(/[\+\-]?[0-9]+(\.[0-9]*)?|[\+\-]?\.[0-9]+/g);  //  [\+\-]?[0-9]+(\.[0-9]*)?     |     [\+\-]?\.[0-9]+
	if(strB == null){
		return Number.NaN;
	}
	strB = strB[0];
	//pega o sinal
	p = strB.match(/[\+\-]/);
	if(p != null){
		p = p[0];
		sgnb = p[0] == "-" ? -1 : 1;
		//retira o sinal da string
		strB = strB.replace(p, "");
	} else {
		sgnb = 1;
	}
	
	//tratamento de sinais
	if(sgna != sgnb){ // 1 > -1  ou  -1 < 1    (se sinais são diferentes, resulta em -)
		sgn = -1;
	} else { // 1 == 1 ou -1 == -1    (se sinais são iguais, resulta em +)
		sgn = 1;
	}
	
	// operando A
	// acrescenta o "0" na parte inteira (se necessário). Ex.: "0.23" (não precisa, pois a parte inteira já está presente, o "0"), mas ".23" (precisa, pois a parte inteira não está presente, o "0", ficando "0.23")
	if(strA[0]=="."){ // Ex.: ".23"
		strA = "0" + strA; // Ex.: "0.23"
	}
	//posição do "."
	p = strA.indexOf(".");
	if( p < 0 ){ p = strA.length; }
	opA = {};
	opA.p = p;
	// lados (esquerdo e direito)
	opA.left = p;
	v = strA.length - p - 1;
	opA.right = v < 0 ? 0 : v;
	// índice da casa decimal
	//p = índice (do ponto) na string e n = índice na string
	//start index (quando n=0)
	v = p - 0; // v = p - n (com n=0)
	if( v > 0 ){ v -= 1; }
	opA.si = v;
	// end index (quando n=(str.length-1))
	v = p - (strA.length-1); // v = p - n (com n=str.length-1)
	if( v > 0 ){ v -= 1; }
	opA.ei = v;
	//retira o "." (última coisa a se fazer aqui)
	strA = strA.replace(".", "");
	
	//operando B
	// acrescenta o "0" na parte inteira (se necessário). Ex.: "0.23" (não precisa, pois a parte inteira já está presente, o "0"), mas ".23" (precisa, pois a parte inteira não está presente, o "0", ficando "0.23")
	if(strB[0]=="."){ // Ex.: ".23"
		strB = "0" + strB; // Ex.: "0.23"
	}
	//posição do "."
	p = strB.indexOf(".");
	if( p < 0 ){ p = strB.length; }
	opB = {};
	opB.p = p;
	// lados (esquerdo e direito)
	opB.left = p;
	v = strB.length - p - 1;
	opB.right = v < 0 ? 0 : v;
	// índice da casa decimal
	//p = índice (do ponto) na string e n = índice na string
	//start index (quando n=0)
	v = p - 0; // v = p - n (com n=0)
	if( v > 0 ){ v -= 1; }
	opB.si = v;
	// end index (quando n=(str.length-1))
	v = p - (strB.length-1); // v = p - n (com n=str.length-1)
	if( v > 0 ){ v -= 1; }
	opB.ei = v;
	//retira o "." (última coisa a se fazer aqui)
	strB = strB.replace(".", "");
	
	//define res
	res = {};
	res.str = "";
	//tradução, define o valor de deslocamento (isso é feito para não acessar posições negativas no string res.str. É como se fosse uma tradução, ex.: se o menor índice de casa decimal do resultado for -3, então será traduzido para 0 )
	v = opA.ei + opB.ei;
	if(v < 0){ v = -v; } // inverte o sinal
	//senão, v = 0
	res.shift = v;
	//console.log("------------- início -------------");
	//console.log("res.shift: "+res.shift);
	//faz a multiplicação com strings (as strings, strA e strB, estão: sem o "+"|"-"; e sem o ".")
	let ia, ib;
	ib = opB.ei;//índice da casa decimal do operando B
	for(let nb=strB.length-1; nb>=0; nb-=1){//índice na string, strB, (0 a str.length-1)   strB sem o ".", ex.: "1.23" -> "123"
		ia = opA.ei;//índice da casa decimal do operando A
		for(let na=strA.length-1; na>=0; na-=1){//índice na string, strA, (0 a str.length-1)   strA sem o ".", ex.: "1.23" -> "123"
			let a, b, r, i, i2, u, d, leng, carr;
			
			//cálculo de multiplicação
			a = parseInt(strA[na]);
			b = parseInt(strB[nb]);
			r = a * b;
			
			//índice de casa decimal do resultado
			i = (ia + ib);
			// tradução para não acessar posições negativas na string do resultado (res.str)
			i = i + res.shift;
			
			//pega a unidade e a dezena da multiplicação feita
			if(r >= 10){ // se tem 2 algarismos
				u = parseInt(r.toString()[1]);
				d = parseInt(r.toString()[0]);
			} else {// r < 10, está no intervalo [0, 9]
				u = parseInt(r.toString()[0]);
				d = 0;
			}
			//soma resultado da multiplicação (unidade e dezena) com o acumulador (resultado final)
			carr = 0;
			leng = 2;//2, pois equivale a 1 para a unidade e 1 para a dezena (sempre, pelo menos 2 somas).
			i2 = 0;//vai incrementando para somar com i, isso faz com que vá avançando na string de resposta (res.str) a partir de um índice base (que nesse caso é o i)
			//console.log(+a+"("+ia+") * "+b+"("+ib+") = "+r+"("+(ia+ib)+")  res.str: "+res.str+" ("+res.str.length+")");
			for(let n=0; n<leng; n+=1){
				//let a2, b2, r2, u2;
				//adiciona "0"s a string de resposta (res.str) até o índice de resultado (i) ser acessível.
				while((i+i2)>=res.str.length){
					res.str += "0";
				}
				
				a = parseInt(res.str[i+i2]);
				b = ( n==0 ? u : (n==1 ? d : 0) );
				
				//resultado da casa atual (i)
				r = (a + carr) + b; // carr, vai um da casa anterior
				if(r >= 10){
					u = parseInt(r.toString()[1]); // Ex.: "12", pega o "2"
					carr = 1;// carr, vai um para próxima casa
				} else {
					u = parseInt(r.toString()[0]); // Ex.: "2", pega o "2"
					carr = 0;// carr, vai um para próxima casa
				}
				
				// res.str[i+i2] = u.toString(); <--- no JavaScript não é possível
				res.str = changeChar(res.str, i+i2, u.toString()); // é o mesmo que str[i] = "a" na linguagem C. No JavaScript não é possível, pois as strings são imutáveis, deve-se, então, recortá-las com str.slice(start, end)
				//console.log("    a:"+a+" b:"+b+" r:"+r+" u:"+u+" d:"+d+" carr:"+carr+" leng:"+leng+" res.str["+i+"+"+i2+"]:"+res.str[i+i2]+" res.str: "+res.str+" ("+res.str.length+") changeChar(): "+changeChar(res.str, i+i2, u.toString()));
				
				//se além da unidade e da dezena que sempre são calculados, houver um "vai um" (carry out), então, mais uma casa decimal deve ser calculada
				if(n >= 1 && carr==1){//(já cálculou a unidade (n=0) e a dezena (n=1)) e (tem carry out para a próxima casa (carr=1)), então é necessário calcular mais uma casa (leng += 1)
					leng += 1;
				}
				i2 += 1;//avanço no índice da string de resposta (res.str)
			}
			ia+=1;
		}
		ib+=1;
	}
	//console.log("opA.right:"+opA.right+" opB.right:"+opB.right);
	//console.log("------------- fim -------------");
	
	//invert a string. Ex: "01234" -> "43210"
	res.str = invertString(res.str);
	
	//define o posição do "."
	p = res.str.length - (opA.right + opB.right);
	//acrescenta o ponto, se precisar. Ex.: res.str="1234." (não precisa, pois não há casas após o ponto), porém res.str="1234.5" (precisa, pois há casas após o ponto)
	if( p < res.str.length ){
		//acrescenta o "."
		res.str = res.str.slice(0, p) + "." + res.str.slice(p);
	}
	
	//retira "0"s a esquerda  Ex.: 000000123.450000    ->    123.450000
	res.str = leftTrimZero(res.str);
	
	//retira "0"s a direita  Ex.: 123.450000    ->    123.45
	res.str = rightTrimZero(res.str);
	
	//acrescenta o sinal
	if(sgn == -1){
		res.str = "-" + res.str;
	}
	
	return res.str;
}

function changeChar(str, i, v){//substitui um valor em uma posição determinada
	// o efeito dessa função é o mesmo que str[i] = v, porém no JavaScript as strings são imutáveis, deve-se, então, recortá-las com str.slice(start, end) e adicionar o novo valor na posição desejada.
	return str.slice(0, i) + v + str.slice(i+1);//recorta a string e intercala o novo valor
}

function compareByStrings(strA, strB){ // compara duas strings numericamente
	/*
	strA: string
	strB: string
	
	retorno: retorna um número que corresponde a strA em relação a strB.
	         se strA < strB, retorna -1,
			 se strA > strB, retorna 1,
			 se strA == strB, retorna 0 e
			 se strA ou strB não são um número, retorna NaN.
	*/
	let sgna, sgnb, v, opA, opB, p, leng, cnt;
	
	//operando A
	if(strA === undefined){ return Number.NaN; }
	//converte para string, se não é ainda
	strA = strA.toString();
	//pega o número completo
	strA = strA.match(/[\+\-]?[0-9]+(\.[0-9]*)?|[\+\-]?\.[0-9]+/g);  //  [\+\-]?[0-9]+(\.[0-9]*)?     |     [\+\-]?\.[0-9]+
	if(strA == null){
		return Number.NaN;
	}
	strA = strA[0];
	
	//operando B
	if(strB === undefined){ return Number.NaN; }
	//converte para string, se não é ainda
	strB = strB.toString();
	//pega o número completo
	strB = strB.match(/[\+\-]?[0-9]+(\.[0-9]*)?|[\+\-]?\.[0-9]+/g);  //  [\+\-]?[0-9]+(\.[0-9]*)?     |     [\+\-]?\.[0-9]+
	if(strB == null){
		return Number.NaN;
	}
	strB = strB[0];
	
	// pega o sinal de A
	p = strA.match(/[\+\-]/);
	if(p != null){
		p = p[0];
		sgna = p[0] == "-" ? -1 : 1;
		//retira o sinal da string
		strA = strA.replace(p, "");
	} else {
		sgna = 1;
	}
	
	// pega o sinal de B
	p = strB.match(/[\+\-]/);
	if(p != null){
		p = p[0];
		sgnb = p[0] == "-" ? -1 : 1;
		//retira o sinal da string
		strB = strB.replace(p, "");
	} else {
		sgnb = 1;
	}
	
	// operando A
	// acrescenta o "0" na parte inteira (se necessário). Ex.: "0.23" (não precisa, pois a parte inteira já está presente, o "0"), mas ".23" (precisa, pois a parte inteira não está presente, o "0", ficando "0.23")
	if(strA[0]=="."){ // Ex.: ".23"
		strA = "0" + strA; // Ex.: "0.23"
	}
	// retira o ponto se estiver na última posição da string. Ex.: "2." -> "2"
	if(strA[strA.length-1]=="."){
		strA = strA.slice(0, strA.length-1);
	}
	//retira "0"s a esquerda  Ex.: 000000123.450000    ->    123.450000
	strA = leftTrimZero(strA);
	
	// operando B
	// acrescenta o "0" na parte inteira (se necessário). Ex.: "0.23" (não precisa, pois a parte inteira já está presente, o "0"), mas ".23" (precisa, pois a parte inteira não está presente, o "0", ficando "0.23")
	if(strB[0]=="."){ // Ex.: ".23"
		strB = "0" + strB; // Ex.: "0.23"
	}
	// retira o ponto se estiver na última posição da string. Ex.: "2." -> "2"
	if(strB[strB.length-1]=="."){
		strB = strB.slice(0, strB.length-1);
	}
	//retira "0"s a esquerda  Ex.: 000000123.450000    ->    123.450000
	strB = leftTrimZero(strB);//isso é feito por causa do teste 2/3
	
	// teste 1/3 (sinais)
	if(sgna < sgnb){
		return -1; // opA < opB
	} else if(sgna > sgnb){
		return 1; // opA > opB
	}
	// senão sgna == sgnb
	
	//operando A
	opA = {}
	//posição do ponto
	p = strA.indexOf(".");
	if( p < 0){ p = strA.length; }
	// left
	opA.left = p; //ex.: "0.523", left=1    "5.23", left=1    "52.3", left=2
	
	//operando B
	opB = {};
	//posição do ponto
	p = strB.indexOf(".");
	if( p < 0){ p = strB.length; }
	// left
	opB.left = p;
	
	// teste 2/3 (casa decimal de mais alta ordem. Ex.: a casa das dezenas vale mais que a casa das unidades)
	if(opA.left < opB.left){
		return -1; // opA < opB
	} else if(opA.left > opB.left){
		return 1; // opA > opB
	}
	//senão opA.left == opB.left
	
	// teste 3/3 (algarismo por algarismo)
	leng = Math.min(strA.length, strB.length);
	for(cnt=0; cnt<leng; cnt+=1){
		if(strA[cnt]!="." && strB[cnt]!="."){
			if(parseInt(strA[cnt]) < parseInt(strB[cnt])){
				return -1; // opA < opB
			} else if(parseInt(strA[cnt]) > parseInt(strB[cnt])){
				return 1; // opA > opB
			}
		}
	}
	// caso seja, por exemplo:
	// strA 543.21
	// strB 543.211 opB é maior (retorna -1)
	// porém
	// strA 543.21
	// strB 543.210 são iguais (retorna 0)
	if(strA.length < strB.length){
		for(cnt=cnt; cnt<strB.length; cnt+=1){
			if(parseInt(strB[cnt]) > 0){
				return -1; // opA < opB
			}
		}
	} else if(strA.length > strB.length){
		for(cnt=cnt; cnt<strA.length; cnt+=1){
			if(parseInt(strA[cnt]) > 0){
				return 1; // opA > opB
			}
		}
	}
	return 0 // são iguais
}

function subtractByStrings(strA, strB){ // subtrai dois números por meio de strings (método do preenchimento com 0s)
	let p, sgna, sgnb, sgn, opA, opB, res, carr;
	
	//pega o operando A
	if(strA === undefined){ return Number.NaN; }
	//converte para string, se não é ainda
	strA = strA.toString();
	//pega o número completo
	strA = strA.match(/[\+\-]?[0-9]+(\.[0-9]*)?|[\+\-]?\.[0-9]+/g);  //  [\+\-]?[0-9]+(\.[0-9]*)?     |     [\+\-]?\.[0-9]+
	if(strA == null){
		return Number.NaN;
	}
	strA = strA[0];
	//pega o sinal
	p = strA.match(/[\+\-]/);
	if(p != null){
		p = p[0];
		sgna = p[0] == "-" ? -1 : 1;
		//retira o sinal da string
		strA = strA.replace(p, "");
	} else {
		sgna = 1;
	}
	
	//pega o operando B
	if(strB === undefined){ return Number.NaN; }
	//converte para string, se não é ainda
	strB = strB.toString();
	//pega o número completo
	strB = strB.match(/[\+\-]?[0-9]+(\.[0-9]*)?|[\+\-]?\.[0-9]+/g);  //  [\+\-]?[0-9]+(\.[0-9]*)?     |     [\+\-]?\.[0-9]+
	if(strB == null){
		return Number.NaN;
	}
	strB = strB[0];
	//pega o sinal
	p = strB.match(/[\+\-]/);
	if(p != null){
		p = p[0];
		sgnb = p[0] == "-" ? -1 : 1;
		//retira o sinal da string
		strB = strB.replace(p, "");
	} else {
		sgnb = 1;
	}
	
	//troca o sinal de opB (inerente a subtração:    +a-(+b) = +a+(-b)    ou    +a-(-b) = +a+(+b)  ,   em suma, b tem o sinal trocado   )
	sgnb = -sgnb;
	
	if(sgna == sgnb){ // se sinais são iguais, 1 == 1 || -1 == -1, soma os números
		/* soma */
		res = addByStrings(strA, strB);
		return (sgna==-1?"-":"").toString() + res; // ou return (sgnb==-1?"-":"").toString() + res;
	} // senão subtrai (sinais são diferentes)
	
	/* subtrai */
	// para que opA seja sempre maior do que opB (em módulo, ou seja, sem o sinal)
	if( Math.abs(parseFloat(strA)) < Math.abs(parseFloat(strB)) ){ // |opA| < |opB| /* há limitação no parseFloat */
		sgn = sgnb; //opB é maior, em módulo, então pega o sinal de opB
		let t=strA;  strA=strB; strB=t;
	} else { // |opA| > |opB|
		sgn = sgna; //opA é maior, em módulo, então pega o sinal de opA
	}
	
	// operando A
	// acrescenta o "0" na parte inteira (se necessário). Ex.: "0.23" (não precisa, pois a parte inteira já está presente, o "0"), mas ".23" (precisa, pois a parte inteira não está presente, o "0", ficando "0.23")
	if(strA[0]=="."){ // Ex.: ".23"
		strA = "0" + strA; // Ex.: "0.23"
	}
	//posição do "."
	p = strA.indexOf(".");
	if( p < 0 ){ p = strA.length; }
	opA = {};
	opA.p = p;
	// lados (esquerdo e direito)
	opA.left = p;
	opA.right = strA.length - p - 1;
	opA.right = opA.right < 0 ? 0 : opA.right;
	//retira o "."
	strA = strA.replace(".", "");
	
	//operando B
	// acrescenta o "0" na parte inteira (se necessário). Ex.: "0.23" (não precisa, pois a parte inteira já está presente, o "0"), mas ".23" (precisa, pois a parte inteira não está presente, o "0", ficando "0.23")
	if(strB[0]=="."){ // Ex.: ".23"
		strB = "0" + strB; // Ex.: "0.23"
	}
	//posição do "."
	p = strB.indexOf(".");
	if( p < 0 ){ p = strB.length; }
	opB = {};
	opB.p = p;
	// lados (esquerdo e direito)
	opB.left = p;
	opB.right = strB.length - p - 1;
	opB.right = opB.right < 0 ? 0 : opB.right;
	//retira o "."
	strB = strB.replace(".", "");
	
	//preenchimento com "0"s Ex.: strA="65324653.3" strB="5.021376"   ->    strA="65324653.300000" strB="00000005.021376"
	// operando A, strA
	// lado esquerdo
	if(opA.left < opB.left){ // Ex.: opA:"5.3"  opB:"45.2"   ->  opA:"05.3"
		strA = "0".repeat(opB.left - opA.left) + strA;
	}
	// lado direito
	if(opA.right < opB.right){ // Ex.: opA:"05.3"  opB:"45.23"   ->  opA:"05.30"
		strA = strA + "0".repeat(opB.right - opA.right);
	}
	// opereando B, strB
	// lado esquerdo
	if(opB.left < opA.left){ // Ex.: opA:"45.2"  opB:"5.3"   ->  opB:"05.3"
		strB = "0".repeat(opA.left - opB.left) + strB;
	}
	// lado direito
	if(opB.right < opA.right){ // Ex.: opA:"45.23"  opB:"05.3"   ->  opB:"05.30"
		strB = strB + "0".repeat(opA.right - opB.right);
	}
	
	//faz a subtração com strings
	res = "";
	carr = 0; // carry in inicia com 0
	for(let i=strA.length-1; i>=0; i-=1){ // strA.length = strB.length
		let a, b, r;
		
		a = parseInt(strA[i]);
		b = parseInt(strB[i]);
		
		//resultado da casa atual (i)
		r = (a - carr) - b; // carr, vai um da casa anterior
		if(r < 0){
			r = r + 10;
			carr = 1;// carr, vai um para próxima casa
		} else {
			carr = 0;// carr, vai um para próxima casa
		}
		
		res += r.toString();
	}
	
	//invert a string. Ex: "01234" -> "43210"
	res = invertString(res);
	
	
	//define o posição do "."
	p = res.length - Math.max(opA.right, opB.right);
	//acrescenta o ponto, se precisar. Ex.: res="1234." (não precisa, pois não há casas após o ponto), porém res="1234.5" (precisa, pois há casas após o ponto)
	if( p < res.length ){
		//acrescenta o "."
		res = res.slice(0, p) + "." + res.slice(p);
	}
	
	//retira "0"s a esquerda  Ex.: 000000123.450000    ->    123.450000
	res = leftTrimZero(res);
	
	//retira "0"s a direita  Ex.: 123.450000    ->    123.45
	res = rightTrimZero(res);
	
	//acrescenta o sinal
	if(sgn == -1){
		res = "-" + res;
	}
	return res;
}

function rightTrimZero(str){ // retira "0"s a direita  Ex.: 123.450000    ->    123.45
	while( str.indexOf(".")>= 0 ){
		if( str.length > 1 ){
			let j;
			j= str.length-1;
			if(str[j] == "0" || str[j] == "."){
				str = str.slice(0, j);
			} else {
				break;
			}
		} else {
			break;
		}
	}
	return str;
}

function leftTrimZero(str){ // retira "0"s a esquerda  Ex.: 000000123.450000    ->    123.450000
	while(str.length > 1){
		if(str[0] == "0"){
			if(str.length > 1){
				if(str[1] != "."){
					str = str.slice(1);
				} else {
					break;
				}
			} else {
				break;
			}
		} else {
			break;
		}
	}
	return str;
}

function addByStrings(strA, strB){ // soma dois números por meio de strings (método do preenchimento com 0s)
	let p, sgna, sgnb, sgn, opA, opB, res, carr;
	
	// operando A
	if(strA === undefined){ return Number.NaN; }
	//converte para string, se não é ainda
	strA = strA.toString();
	//pega o número completo
	strA = strA.match(/[\+\-]?[0-9]+(\.[0-9]*)?|[\+\-]?\.[0-9]+/g);  //  [\+\-]?[0-9]+(\.[0-9]*)?     |     [\+\-]?\.[0-9]+
	if(strA == null){
		return Number.NaN;
	}
	strA = strA[0];
	//pega o sinal
	p = strA.match(/[\+\-]/);
	if(p != null){
		p = p[0];
		sgna = p[0] == "-" ? -1 : 1;
		//retira o sinal da string
		strA = strA.replace(p, "");
	} else {
		sgna = 1;
	}
	
	// operando B
	if(strB === undefined){ return Number.NaN; }
	//converte para string, se não é ainda
	strB = strB.toString();
	//pega o número completo
	strB = strB.match(/[\+\-]?[0-9]+(\.[0-9]*)?|[\+\-]?\.[0-9]+/g);  //  [\+\-]?[0-9]+(\.[0-9]*)?     |     [\+\-]?\.[0-9]+
	if(strB == null){
		return Number.NaN;
	}
	strB = strB[0];
	//pega o sinal
	p = strB.match(/[\+\-]/);
	if(p != null){
		p = p[0];
		sgnb = p[0] == "-" ? -1 : 1;
		//retira o sinal da string
		strB = strB.replace(p, "");
	} else {
		sgnb = 1;
	}
	
	//tratamento de sinais
	if(sgna > sgnb){ // 1 > -1    é o mesmo que  opA - opB
		/* subtrai */
		res = subtractByStrings(strA, strB);//passados sem os sinais
		return res;
	} else if(sgna < sgnb){ // -1 < 1    é o mesmo que  opB - opA
		/* subtrai */
		res = subtractByStrings(strB, strA);//passados sem os sinais
		return res;
	}
	
	/* soma */
	// 1 == 1 || -1 == -1
	sgn = sgna; // ou sgn = sgnb
	
	// operando A
	// acrescenta o "0" na parte inteira (se necessário). Ex.: "0.23" (não precisa, pois a parte inteira já está presente, o "0"), mas ".23" (precisa, pois a parte inteira não está presente, o "0", ficando "0.23")
	if(strA[0]=="."){ // Ex.: ".23"
		strA = "0" + strA; // Ex.: "0.23"
	}
	//posição do "."
	p = strA.indexOf(".");
	if( p < 0 ){ p = strA.length; }
	opA = {};
	opA.p = p;
	// lados (esquerdo e direito)
	opA.left = p;
	opA.right = strA.length - p - 1;
	opA.right = opA.right < 0 ? 0 : opA.right;
	//retira o "."
	strA = strA.replace(".", "");
	
	//operando B
	// acrescenta o "0" na parte inteira (se necessário). Ex.: "0.23" (não precisa, pois a parte inteira já está presente, o "0"), mas ".23" (precisa, pois a parte inteira não está presente, o "0", ficando "0.23")
	if(strB[0]=="."){ // Ex.: ".23"
		strB = "0" + strB; // Ex.: "0.23"
	}
	//posição do "."
	p = strB.indexOf(".");
	if( p < 0 ){ p = strB.length; }
	opB = {};
	opB.p = p;
	// lados (esquerdo e direito)
	opB.left = p;
	opB.right = strB.length - p - 1;
	opB.right = opB.right < 0 ? 0 : opB.right;
	//retira o "."
	strB = strB.replace(".", "");
	
	//preenchimento com "0"s Ex.: strA="65324653.3" strB="5.021376"   ->    strA="65324653.300000" strB="00000005.021376"
	// operando A, strA
	// lado esquerdo
	if(opA.left < opB.left){ // Ex.: opA:"5.3"  opB:"45.2"   ->  opA:"05.3"
		strA = "0".repeat(opB.left - opA.left) + strA;
	}
	// lado direito
	if(opA.right < opB.right){ // Ex.: opA:"05.3"  opB:"45.23"   ->  opA:"05.30"
		strA = strA + "0".repeat(opB.right - opA.right);
	}
	// opereando B, strB
	// lado esquerdo
	if(opB.left < opA.left){ // Ex.: opA:"45.2"  opB:"5.3"   ->  opB:"05.3"
		strB = "0".repeat(opA.left - opB.left) + strB;
	}
	// lado direito
	if(opB.right < opA.right){ // Ex.: opA:"45.23"  opB:"05.3"   ->  opB:"05.30"
		strB = strB + "0".repeat(opA.right - opB.right);
	}
	
	//faz a soma com strings
	res = "";
	carr = 0; // carry in inicia com 0
	for(let i=strA.length-1; i>=0; i-=1){ // strA.length = strB.length
		let a, b, r, u;
		
		a = parseInt(strA[i]);
		b = parseInt(strB[i]);
		
		//resultado da casa atual (i)
		r = (a + carr) + b; // carr, vai um da casa anterior
		if(r >= 10){
			u = parseInt(r.toString()[1]); // Ex.: "12", pega o "2"
			carr = 1;// carr, vai um para próxima casa
		} else {
			u = parseInt(r.toString()[0]); // Ex.: "2", pega o "2"
			carr = 0;// carr, vai um para próxima casa
		}
		res += u.toString();
				
		//último 'vai um', se houver
		if(r >= 10 && i==0){
			res += "1";
		}
	}
	
	//invert a string. Ex: "01234" -> "43210"
	res = invertString(res);
	
	
	//define o posição do "."
	p = res.length - Math.max(opA.right, opB.right);
	//acrescenta o ponto, se precisar. Ex.: res="1234." (não precisa, pois não há casas após o ponto), porém res="1234.5" (precisa, pois há casas após o ponto)
	if( p < res.length ){
		//acrescenta o "."
		res = res.slice(0, p) + "." + res.slice(p);
	}
	
	//retira "0"s a esquerda  Ex.: 000000123.450000    ->    123.450000
	res = leftTrimZero(res);
	
	//retira "0"s a direita  Ex.: 123.450000    ->    123.45
	res = rightTrimZero(res);
	
	//acrescenta o sinal
	if(sgn == -1){
		res = "-" + res;
	}
	return res;
}

function invertString(str){
	let str2;
	
	str2 = "";
	for(let i=str.length-1; i>=0; i-=1){
		str2 += str[i];
	}
	return str2;
}

function addByStrings2(strA, strB){ // soma dois números por meio de strings (método do índice)
	// soma dois valores não diretamente (a + b = c), mas indiretamente caracter por caracter das strings (Ex.: strA[0]:'8' + strB[0]:'4' = str:'12' [dezena:'1' unidade:'2'])
	/*
	addByStrings(opA, opB);
	
	Parâmetros: opA, um número, que é a primeira das parcelas da soma
				opB, um número, que é a segunda das parcelas da soma
	
	Retorna: uma string, com o resultado da soma com strings de opA com opB.
	
	Para evitar situações que ocorrem por causa da limitação da representação de números com casas decimais como esta:
	
	let v, i, d;
	
	v = 11.11;
	i = Math.trunc(v);
	d = v - i;
	
	console.log("v:"+v); // imprime "v:11.11"
	console.log("i:"+i); // imprime "i:11"
	console.log("d:"+d); // imprime "d:0.10999999999999943" deveria ser 0.11
	
	o resultado de 11.11 - 11 deveria ser 0.11, entretanto a limitação de representação fornece 0.10999999999999943 (que é um valor próximo, mas não o que buscamos).
	Esta função faz a operação de soma usando as strings fazendo com que, por exemplo, o resultado de 11.11 - 11 seja apenas "0.11".
	
	*/
	
	
	let strV, p, arrA, arrB, si, ei, res, res1, sgna, sgnb, sgn;
	
	//prepara os números
	// operando A
	//obtém o número completo
	if(strA === undefined){ return Number.NaN; }
	strA = strA.toString();
	strA = strA.match(/[\+\-]?[0-9]+(\.[0-9]*)?|[\+\-]?\.[0-9]+/g);  //  [\+\-]?[0-9]+(\.[0-9]*)?     |     [\+\-]?\.[0-9]+
	if(strA == null){
		return Number.NaN;
	}
	strA = strA[0];
	//obtém o sinal
	p = strA.match(/[\+\-]/);
	if(p != null){
		p = p[0];
		sgna = p[0] == "-" ? -1 : 1;
		//retira o sinal da string
		strA = strA.replace(p, "");
	} else {
		sgna = 1;
	}
	
	// operando B
	//obtém o número completo
	if(strB === undefined){ return Number.NaN; }
	strB = strB.toString();
	strB = strB.match(/[\+\-]?[0-9]+(\.[0-9]*)?|[\+\-]?\.[0-9]+/g);  //  [\+\-]?[0-9]+(\.[0-9]*)?     |     [\+\-]?\.[0-9]+
	if(strB == null){
		return Number.NaN;
	}
	strB = strB[0];
	//obtém o sinal
	p = strB.match(/[\+\-]/);
	if(p != null){
		p = p[0];
		sgnb = p[0] == "-" ? -1 : 1;
		//retira o sinal da string
		strB = strB.replace(p, "");
	} else {
		sgnb = 1;
	}
	
	//tratamento de sinais
	if(sgna > sgnb){ // 1 > -1    é o mesmo que  opA - opB
		strV = subtractByStrings(strA, strB);//passados sem os sinais
		return strV;
	} else if(sgna < sgnb){ // -1 < 1    é o mesmo que  opB - opA
		strV = subtractByStrings(strB, strA);//passados sem os sinais
		return strV;
	}
	
	// 1 == 1 || -1 == -1
	sgn = sgna; // ou sgn = sgnb
	
	si=+Infinity; ei=-Infinity;
	
	//operando A
	strV = strA;
	//define índice do '.'
	p = strV.indexOf(".");
	if(p<0){ p = strV.length; }
	//define valores de arrA
	arrA = [];
	for(let n=0; n<strV.length; n+=1){
		let val = strV[n];
		if(val != "."){
			let v, ob;
			v = p - n;
			if(v > 0){ v -= 1; }
			ob = {};
			ob.value = parseInt(val);
			ob.index = v;
			arrA.push(ob);
			
			if(si > v){ si = v; }
			if(ei < (v+1)){ ei = (v+1); }
		}
	}
	
	//operando B
	strV = strB;
	//define índice do '.'
	p = strV.indexOf(".");
	if(p<0){ p = strV.length; }
	//define valores de arrB
	arrB = [];
	for(let n=0; n<strV.length; n+=1){
		let val = strV[n];
		if(val != "."){
			let v, ob;
			v = p - n;
			if(v > 0){ v -= 1; }
			ob = {};
			ob.value = parseInt(val);
			ob.index = v;
			arrB.push(ob);
			
			if(si > v){ si = v; }
			if(ei < (v+1)){ ei = (v+1); }
		}
	}
	
	//soma (opA, opB e vai uns)
	res=[];
	arr1=[];
	for(let n=si; n<=ei; n+=1){
		let r, a, b, v1, n2, ob, u;
		
		//vai um, pega o valor de arr1 (vai um)
		for(n2=0; n2<arr1.length; n2+=1){ if(arr1[n2].index==n){ break; } } if(n2 == arr1.length){ v1=0; } else { v1=arr1[n2].value; }
		
		//opA, pega o valor de arrA
		for(n2=0; n2<arrA.length; n2+=1){ if(arrA[n2].index==n){ break; } } if(n2 == arrA.length){ a=0; } else { a=arrA[n2].value; }
		
		//opB, pega o valor de arrB
		for(n2=0; n2<arrB.length; n2+=1){ if(arrB[n2].index==n){ break; } } if(n2 == arrB.length){ b=0; } else { b=arrB[n2].value; }
		
		//vai um
		r = v1 + a + b;
		
		if(r >= 10){
			ob = {};
			ob.value = 1; // vai um
			ob.index = n + 1;
			arr1.push(ob);
			u = parseInt(r.toString()[1]);
		} else {
			u = parseInt(r.toString()[0]);
		}
		
		//resultado
		ob = {};
		ob.value = u;
		ob.index = n;
		res.push(ob);
		
		//último 'vai um', se houver
		if(r >= 10 && n==ei){
			ob = {};
			ob.value = 1; // vai um
			ob.index = n + 1;
			res.push(ob);
		}
	}
	
	//acrescenta o "." e inverte a string
	let en = true;
	strV="";
	for(let n=res.length-1; n>=0; n-=1){
		let ob = res[n];
		if(ob.index < 0 && en){
			en = false;
			strV += ".";
		}
		strV += res[n].value;
	}
	
	//retira "0"s a esquerda  Ex.: 000000123.450000    ->    123.450000
	while(strV.length > 1){
		if(strV[0] == "0"){
			if(strV.length > 1){
				if(strV[1] != "."){
					strV = strV.slice(1);
				} else {
					break;
				}
			} else {
				break;
			}
		} else {
			break;
		}
	}
	
	//define índice do '.' final
	p = strV.indexOf(".");
	if(p<0){ p = strV.length; }
	//retira "0"s a direita  Ex.: 123.450000    ->    123.45
	if(p < strV.length ){
		while(strV.length > 1 ){
			let j;
			j= strV.length-1;
			if(strV[j] == "0" && strV[j-1] != "."){
				strV = strV.slice(0, j);
			} else {
				break;
			}
		}
	}
	
	//acrescenta o sinal
	if(sgn == -1){
		strV = "-" + strV;
	}
	
	return strV;
}

function multiplyByTens(strV, tens, exp=null){
	/*
	multiplyByTens(strV, tens)
	
	Parâmetros: strV, uma string, que é o valor a ser multiplicado por uma potência de 10
				tens, uma string, que é a potência de 10 a ser utilizada na multiplicação. Exe.: 10, 1, 0.1, 0.01
				exp, um número, que é o expoente da base 10, se não definido, tens é utilizado para defini-lo dentro da função multiplyByTens;
				se for definido, tens não será utilizado, apenas seu sinal.
				
				Exemplo:
				10^2 = 100 aqui, a potência 100 representa tens e o expoente 2 representa exp
				10^3 = 1000 aqui, a potência 1000 representa tens e o expoente 3 representa exp
	
	Retorna: uma string, com o resultado da multiplicação com strings de strV com tens.
	
	Para evitar situações que ocorrem por causa da limitação da representação de números com casas decimais como esta:
	
	console.log(12.38 * 0.01); // imprime "0.12380000000000001" deveria ser 0.1238
	
	o resultado de 12.38 * 0.01 deveria ser 0.1238, entretanto a limitação de representação fornece 0.12380000000000001 (que é um valor próximo, mas não o que buscamos).
	Esta função faz a operação de multiplicação por 10 usando as strings fazendo com que, por exemplo, o resultado de 12.38 * 0.01 seja apenas "0.1238".
	
	Sobre multiplyByTens():
	Essa função tem a limitação de o 2º parâmetro dela ser uma potência de dez, não qualquer número como em multiplyByStrings.
	Multiplicar ou dividir por 10 significa apenas mover o "." em um sistema decimal.
	*/
	
	
	let p, ps, pf, res, str, sgna, sgnb, sgn, inc, strA, strB;
	
	strA = strV;
	strB = tens;
	
	//operando A
	if(strA === undefined){ return Number.NaN; }
	//converte para string, se não é ainda
	strA = strA.toString();
	//pega o número completo
	strA = strA.match(/[\+\-]?[0-9]+(\.[0-9]*)?|[\+\-]?\.[0-9]+/g);  //  [\+\-]?[0-9]+(\.[0-9]*)?     |     [\+\-]?\.[0-9]+
	if(strA == null){
		return Number.NaN;
	}
	strA = strA[0];
	
	// pega o sinal de A
	p = strA.match(/[\+\-]/);
	if(p != null){
		p = p[0];
		sgna = p[0] == "-" ? -1 : 1;
		//retira o sinal da string
		strA = strA.replace(p, "");
	} else {
		sgna = 1;
	}
	
	// operando A
	// acrescenta o "0" na parte inteira (se necessário). Ex.: "0.23" (não precisa, pois a parte inteira já está presente, o "0"), mas ".23" (precisa, pois a parte inteira não está presente, o "0", ficando "0.23")
	if(strA[0]=="."){ // Ex.: ".23"
		strA = "0" + strA; // Ex.: "0.23"
	}
	// retira o ponto se estiver na última posição da string. Ex.: "2." -> "2"
	if(strA[strA.length-1]=="."){
		strA = strA.slice(0, strA.length-1);
	}
	//retira "0"s a esquerda  Ex.: 000000123.450000    ->    123.450000
	strA = leftTrimZero(strA);
	
	//operando B
	if(exp==null){
	if(strB === undefined){ return Number.NaN; }
	//converte para string, se não é ainda
	strB = strB.toString();
	//pega o número completo
	strB = strB.match(/[\+\-]?[0-9]+(\.[0-9]*)?|[\+\-]?\.[0-9]+/g);  //  [\+\-]?[0-9]+(\.[0-9]*)?     |     [\+\-]?\.[0-9]+
	if(strB == null){
		return Number.NaN;
	}
	strB = strB[0];
	
	// pega o sinal de B
	p = strB.match(/[\+\-]/);
	if(p != null){
		p = p[0];
		sgnb = p[0] == "-" ? -1 : 1;
		//retira o sinal da string
		strB = strB.replace(p, "");
	} else {
		sgnb = 1;
	}
	
	// operando B
	// acrescenta o "0" na parte inteira (se necessário). Ex.: "0.23" (não precisa, pois a parte inteira já está presente, o "0"), mas ".23" (precisa, pois a parte inteira não está presente, o "0", ficando "0.23")
	if(strB[0]=="."){ // Ex.: ".23"
		strB = "0" + strB; // Ex.: "0.23"
	}
	// retira o ponto se estiver na última posição da string. Ex.: "2." -> "2"
	if(strB[strB.length-1]=="."){
		strB = strB.slice(0, strB.length-1);
	}
	//retira "0"s a esquerda  Ex.: 000000123.450000    ->    123.450000
	strB = leftTrimZero(strB);
	
	} else {
		sgnb = 1;
	}
	
	strV = strA;
	tens = strB;
	

	//tratamento de sinais
	if(sgna != sgnb){ // 1 > -1  ou  -1 < 1    (se sinais são diferentes, resulta em -)
		sgn = -1;
	} else { // 1 == 1 ou -1 == -1    (se sinais são iguais, resulta em +)
		sgn = 1;
	}
	
	if(exp == null){
		//define exp
		exp = 0;
		inc = compareByStrings(tens, "1") >= 0 ? 1 : -1 ;
		tens = tens.toString();
		for(let i=0; i<tens.length; i+=1){
			if(tens[i] == "0"){ exp+=inc; }
		}
	}
	
	// ponto start
	ps = strV.indexOf(".");
	if(ps < 0){ ps = strV.length; }
	//ponto final
	pf = ps + exp;
	//retira o "."
	str = strV.replace(".", "");
	//desloca o "."
	if(pf <= 0){
		res = "0.";
		if(pf < 0){ let d = Math.abs(pf); res += ("0").repeat(d); }
		res += str;
	} else if(pf >= str.length){
		res = str;
		if(pf > str.length){ let d = pf - str.length; res += ("0").repeat(d); }
	} else { // pf > 0 && pf < str.length
		res = str.slice(0, pf) + "." + str.slice(pf);
	}
	
	//retira "0"s a esquerda  Ex.: 000000123.450000    ->    123.450000
	res = leftTrimZero(res);
	
	//retira "0"s a direita  Ex.: 123.450000    ->    123.45
	res = rightTrimZero(res);
	
	//acrescenta o sinal
	if(sgn == -1){
		res = "-" + res;
	}
	
	return res;
}

function toRadian(v){
	return (v/360)*TWO_PI;
}

function toDegree(v){
	return (v/TWO_PI)*360;
}

function adjustPrecision(v, prec=0){ // v: valor a ter sua precisão restringida. prec: número de casas de precisam após a vírgula
	return Math.trunc(v * Math.pow(10, prec))/Math.pow(10, prec);
}




//------------------ miscellaneous ------------------