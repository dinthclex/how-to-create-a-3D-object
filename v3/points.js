//------------------ points ------------------

var cube;

function pointsInit(){
	cube = createCube(300, SCREEN_HEIGHT/2, 700);
}


function createCube(x, y, z) {
	let hsw = SCREEN_WIDTH/2;
	let p1 = {}; p1.x=-hsw; p1.y=-hsw; p1.z=-hsw;
	let p2 = {}; p2.x=-hsw; p2.y=-hsw; p2.z= hsw;
	let p3 = {}; p3.x=-hsw; p3.y= hsw; p3.z=-hsw;
	let p4 = {}; p4.x=-hsw; p4.y= hsw; p4.z= hsw;
	
	let p5 = {}; p5.x= hsw; p5.y=-hsw; p5.z=-hsw;
	let p6 = {}; p6.x= hsw; p6.y=-hsw; p6.z= hsw;
	let p7 = {}; p7.x= hsw; p7.y= hsw; p7.z=-hsw;
	let p8 = {}; p8.x= hsw; p8.y= hsw; p8.z= hsw;
	
	let cub = {};
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
		p.y += 150; // apenas aumenta os valores de y
		
		p.y = -p.y; // troca a orientação do eixo y
	}*/
	
	return cub;
}




//------------------ points ------------------