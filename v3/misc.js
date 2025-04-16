//------------------ miscellaneous ------------------





function drawAxes(s="xy", cx=SCREEN_WIDTH/2, cy=SCREEN_HEIGHT/2, ang1=0, dx1=SCREEN_WIDTH/4, dx2=SCREEN_WIDTH/4, dy1=SCREEN_HEIGHT/4, dy2=SCREEN_HEIGHT/4){
	//function drawAxes (s, cx, cy, ang1,dx1, dx2, dy1, dy2) todos parâmetros são opcionais
	let c = document.getElementById("background");
	let ctx = c.getContext("2d");
	
	let x1,y1,x2,y2, x3,y3,ang3, x4,y4 ,ang2,r;
	
	let s1, s2, s3;
	let ss="xyz";//standard string
	let col1, col2, col3;
	let cx2,cy2;
	
	
	s = s.match(/[A-Za-z]/g);
	if(s == null){ s1="x"; s2="y"; }
	else {			s1=(s.length>=1 ? s[0] : ss[0]); ss=ss.replace(s1, ""); //se s1='z', ss:"xyz"->ss:"xy"
					s2=(s.length>=2 ? s[1] : ss[0]); ss=ss.replace(s2, ""); //x "xy"->"y"
					s3=(s.length>=3 ? s[2] : ss[0]);                     //y "y"->""
					}
	col1 = ( s1=='x' ? "Red" : ( s1=='y' ? "Green" : "Blue" ) );
	col2 = ( s2=='x' ? "Red" : ( s2=='y' ? "Green" : "Blue" ) );
	col3 = ( s3=='x' ? "Red" : ( s3=='y' ? "Green" : "Blue" ) );
	
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
	ang2 = ang1 -3*QUARTER_PI;
	ctx.beginPath();
	ctx.moveTo(x2,y2);
	ctx.lineTo(x2+r*Math.cos(ang2),y2+r*Math.sin(ang2));
	ctx.stroke();
	ang2 = ang1 +3*QUARTER_PI;
	ctx.beginPath();
	ctx.moveTo(x2,y2);
	ctx.lineTo(x2+r*Math.cos(ang2),y2+r*Math.sin(ang2));
	ctx.stroke();
	//eixo z, 'z'
	ctx.fillStyle = col1;
	//ctx.font=(r/5)+"em consolas";
	x3=x2-2*r; x3 = x3<0 ? x2+2*r : x3 ;
	y3=y2+2*r; y3 = y3<0 ? y2-2*r : y3 ;
	ctx.fillText(s1, x3, y3);
	
	//eixo x
	x1 = cx+dy1*Math.cos(ang1-HALF_PI); y1 = cy+dy1*Math.sin(ang1-HALF_PI);
	x2 = cx+dy2*Math.cos(ang1+HALF_PI); y2 = cy+dy2*Math.sin(ang1+HALF_PI);
	ctx.strokeStyle = col2;
	ctx.beginPath();
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.stroke();
	//eixo x, seta
	ang2 = ang1 +5*QUARTER_PI;
	ctx.beginPath();
	ctx.moveTo(x2,y2);
	ctx.lineTo(x2+r*Math.cos(ang2),y2+r*Math.sin(ang2));
	ctx.stroke();
	ang2 = ang1 -1*QUARTER_PI;
	ctx.beginPath();
	ctx.moveTo(x2,y2);
	ctx.lineTo(x2+r*Math.cos(ang2),y2+r*Math.sin(ang2));
	ctx.stroke();
	//eixo x, 'x'
	ctx.fillStyle = col2;
	//ctx.font=(r/5)+"em consolas";
	x3=x2-2*r; x3 = x3<0 ? x2+2*r : x3 ;
	y3=y2-2*r; y3 = y3<0 ? y2+2*r : y3 ;
	ctx.fillText(s2, x3, y3);
	
	//eixo y
	//eixo y, traseira da seta
	// linha 1
	//ang1 = 0;
	cx2 = (0.15*dx1)*Math.cos(ang1+3*QUARTER_PI);
	cy2 = (0.15*dx1)*Math.sin(ang1+3*QUARTER_PI);
	if( (cx+cx2) < 0 ){ cx2=-cx2; }
	if( (cy+cy2) < 0 ){ cy2=-cy2; }
	x1 = cx+cx2-0.6*r; y1 = cy+cy2-0.6*r;
	x2 = cx+cx2+0.6*r; y2 = cy+cy2+0.6*r;
	x3 = cx+cx2+0.6*r; y3 = cy+cy2-0.6*r;
	x4 = cx+cx2-0.6*r; y4 = cy+cy2+0.6*r;
	ctx.strokeStyle = col3;
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
	// linha 2
	ctx.beginPath();
	ctx.moveTo(x3, y3);
	ctx.lineTo(x4, y4);
	ctx.stroke();
	//eixo y, 'y'
	x1 = cx+cx2-2*r; x1 = x1 < 0 ? cx+cx2+2*r : x1 ;
	y1 = cy+cy2+2*r; y1 = y1 < 0 ? cy+cy2-2*r : y1 ;
	ctx.fillStyle = col3;
	//ctx.font=(r/5)+"em consolas";
	ctx.fillText(s3, x1, y1);
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
			return {x:x, y:y}; }
		return null; // interceptam-se fora dos limites dos segmentos
	}
	
	return {x:x, y:y}; // interceptam-se dentro dos limites dos segmentos
	
}



//------------------ miscellaneous ------------------