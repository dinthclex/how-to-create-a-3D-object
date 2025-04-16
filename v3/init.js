


if(document.readyState !== "complete"){ // "loading"
	document.addEventListener("DOMContentLoaded", init);
} else {
	init();
}


function init(){ // chamada apenas uma vez
	inputInit();
	fpsInit();
	pointsInit();
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
	idLoop = setInterval(loop, 1);
}

function loop(){ // esse é o loop, camada várias vezes por segundo
	fpsUpdate();
	statusUpdate();
	
	updateStates();
	updateDraw(); // render
}

function updateStates(){
	tickPlayer();
}

function clearBackground(){
	let c = document.getElementById("background");
	let ctx = c.getContext("2d");
	ctx.clearRect(0, 0, c.width, c.height);
}

function updateDraw(){
	clearBackground();
	drawScreen();
	drawPlayer();
}