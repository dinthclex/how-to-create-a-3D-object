//------------------ fps ------------------



var lastTime = 0;//t0
var currentTime = 0;//t1
var fpsCount = 0; // fpsa
var fpsNow = 0;
var fps = 0; // fpsb
var deltaTime = 1000; // em milisegundos. Esse é o ta da fórmula fpsb=fpsa*(tb/ta), o tb=1000 (pois representa 1s que é 1000ms);


function fpsInit(){
	lastTime = performance.now();
	currentTime = lastTime;
}

function fpsUpdate(){
	currentTime=performance.now();
	if((currentTime-lastTime) >= deltaTime){
		lastTime += deltaTime;
		fps = fpsCount * (1000/deltaTime); 
		fpsNow = fpsCount;
		fpsCount = 0;
	}
	fpsCount += 1;
}



//------------------ fps ------------------