


if(document.readyState !== "complete"){ // "loading"
	document.addEventListener("DOMContentLoaded", init);
} else {
	init();
}


function init(){ // chamada apenas uma vez
	infoInit();
	pointsInit();
	inputInit();
	fpsInit();
	statusTableInit();
	animationInit();
	transformInit();
	cameraInit();
	playerInit();
	backgroundInit();
	loopInit();//inicia as multiplas chamadas
}

function backgroundInit(){
	let c = document.getElementById("background");
	c.width = BACKGROUND_WIDTH;
	c.height = BACKGROUND_HEIGHT;
}

var idLoop = null;
function loopInit(){
	//idLoop = setInterval(loop, 0);
	idLoop = requestAnimationFrame(loop);
}

function loop(t){ // esse é o loop, camada várias vezes por segundo
	fpsUpdate(t);
	statusTableUpdate();
	
	animationUpdate();
	updateStates();
	updateDraw(); // render
	infoUpdate();
	transformUpdate();
	
	frame_onclick=false;
	requestAnimationFrame(loop);
}

function updateStates(){
	tickPlayer();
	updateCameras();
}

function clearBackground(){
	let c = document.getElementById("background");
	let ctx = c.getContext("2d");
	ctx.clearRect(0, 0, c.width, c.height);
}

function updateDraw(){
	clearBackground();
	drawScreen();
	drawCameras();
	//drawPlayer();
}