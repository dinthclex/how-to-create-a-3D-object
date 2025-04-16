//------------------ points ------------------

var cube;
var cubeCount=1;
var scene = {
	objects: [],
	add: function (obj){
		this.objects.push(obj);
	}
	
};

function pointsInit(){
	cube = createCube(500, SCREEN_HEIGHT/2, 450);
	cube.active = true;
	cube.highlightIndex = 7;

	scene.objects = [];
	scene.add(cube);
	
	/*//adiciona outro cubo
	cube = createCube(300, SCREEN_HEIGHT/2, 1200);
	scene.add(cube);*/
}




function createCube(x, y, z, name="Cube."+cubeCount.toString().padStart(3,"0")) {
	let hsw =SCREEN_WIDTH/2;
	let p1 = {}; p1.x=-hsw; p1.y= hsw; p1.z= hsw;
	let p2 = {}; p2.x=-hsw; p2.y= hsw; p2.z=-hsw;
	let p3 = {}; p3.x= hsw; p3.y= hsw; p3.z= hsw;
	let p4 = {}; p4.x= hsw; p4.y= hsw; p4.z=-hsw;
	
	let p5 = {}; p5.x=-hsw; p5.y=-hsw; p5.z= hsw;
	let p6 = {}; p6.x=-hsw; p6.y=-hsw; p6.z=-hsw;
	let p7 = {}; p7.x= hsw; p7.y=-hsw; p7.z= hsw;
	let p8 = {}; p8.x= hsw; p8.y=-hsw; p8.z=-hsw;
	
	let cub = {};
	
	cub.name = name;
	//variáveis apenas para destacar na visualização
	cub.active = false;//define se o objeto está em foco, apenas um por vez
	cub.highlightIndex = -1;//índice de um ponto do objeto para destacar em algum desenho
	
	cub.x = x;
	cub.y = y;
	cub.z = z;
	
	cub.vertices = [];
	cub.vertices.push(p1);
	cub.vertices.push(p2);
	cub.vertices.push(p3);
	cub.vertices.push(p4);
	cub.vertices.push(p5);
	cub.vertices.push(p6);
	cub.vertices.push(p7);
	cub.vertices.push(p8);
	
	/*for(let i=0; i<cub.vertices.length; i+=1){
		let p = cub.vertices[i];
		let perc=0.5;
		p.x *= perc; //dimuniu o tamanho do cubo
		p.y *= perc;
		p.z *= perc;
	}*/
	
	/*for(let i=0; i<cub.vertices.length; i+=1){
		let p = cub.vertices[i];
		p.y += 150; // apenas aumenta os valores de y
		
		p.y = -p.y; // troca a orientação do eixo y
	}*/
	
	cub.clone = function(){
		let obj={};
		obj.name = this.name;
		obj.active = this.active;
		obj.highlightIndex = this.highlightIndex;
		obj.x = this.x;
		obj.y = this.y;
		obj.z = this.z;
		obj.vertices = [];
		for(let i=0; i<this.vertices.length; i+=1){
			let p,x,y,z;
			p = this.vertices[i];
			let pp={}; pp.x=p.x; pp.y=p.y; pp.z=p.z;
			obj.vertices.push({x:pp.x, y:pp.y, z:pp.z});
		}
		return obj;
	}
	
	++cubeCount;
	
	return cub;
}

function animeObject(obj){
	//anima a cópia dos valores originais
	let percx, percy, perz, v;
	v = 10000;
	percx = (Date.now()%v)/v;
	v = 8000;
	percy = (Date.now()%v)/v;
	v = 6000;
	percz = (Date.now()%v)/v;
	let ang;
	let rx,ry,rz;
	let tx,ty,tz;
	
	for(let i=0; i<obj.vertices.length; i+=1){
		let p = obj.vertices[i];
		//move y
		//p.y += 100*Math.sin(TWO_PI*perc);
		
		//roda em torno de y do objeto
		ang = TWO_PI*percy;
		rz =  p.z*Math.cos(ang) + p.x*Math.sin(ang);
		rx = -p.z*Math.sin(ang) + p.x*Math.cos(ang);
		p.z=rz; p.x=rx;
		
		//roda em torno de x do objeto
		ang = TWO_PI*percx;
		rz =  p.z*Math.cos(ang) + p.y*Math.sin(ang);
		ry = -p.z*Math.sin(ang) + p.y*Math.cos(ang);
		p.z=rz; p.y=ry;
		
		//roda em torno de z do objeto
		ang = TWO_PI*percz;
		rx =  p.x*Math.cos(ang) + p.y*Math.sin(ang);
		ry = -p.x*Math.sin(ang) + p.y*Math.cos(ang);
		p.x=rx; p.y=ry;
		
	}
	
	return obj;
}




//------------------ points ------------------