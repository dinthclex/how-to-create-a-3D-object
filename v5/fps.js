//------------------ fps ------------------



var lastTime = 0;//t0
var timestamp = 0;//t1
var fpsCount = 0; // fpsa
var fps = 0; // fpsb
var updateTime = 1000; // em milisegundos. Esse é o ta da fórmula fpsb=fpsa*(tb/ta), o tb=1000 (pois representa 1s que é 1000ms);
var lastFrameTimestamp = 0;
var deltaTime;//guarda o tempo em ms entre um quadro e outro

function fpsInit(){
	lastTime = performance.now();
	timestamp = lastTime;
	lastFrameTimestamp = lastTime;
}

function fpsUpdate(t){
	//timestamp = performance.now();
	timestamp = t;
	deltaTime = timestamp - lastFrameTimestamp;
	lastFrameTimestamp += deltaTime;
	if((timestamp - lastTime) >= updateTime){
		lastTime += updateTime;
		fps = fpsCount * (1000/updateTime); 
		fpsCount = 0;
	}
	fpsCount += 1;
}



//------------------ fps ------------------