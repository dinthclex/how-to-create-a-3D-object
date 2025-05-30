var idDOM = setInterval(statDOM, 10);

function statDOM(){
	if(document.readyState == "complete"){
		clearInterval(idDOM);
		idDOM = null;
		init();
	}
}

function init(){ // chamada apenas uma vez
	keyboardInit();
	backgroundInit();
	updateInit();//inicia as multiplas chamadas
}

function backgroundInit(){
	let c = document.getElementById("background");
	c.width = BACKGROUND_WIDTH;
	c.height = BACKGROUND_HEIGHT;
}

function updateInit(){
	idUpdate = setInterval(updateFunc, 1);
}

function updateFunc(){ // camada várias vezes por segundo
	drawFunc();
}

function clearBackground(){
	let c = document.getElementById("background");
	let ctx = c.getContext("2d");
	ctx.clearRect(0, 0, c.width, c.height);
}

function drawFunc(){
	clearBackground();
	tickPlayer();
	drawPlayer();
}