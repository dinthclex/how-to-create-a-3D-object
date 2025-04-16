var log;

var logText =
"player adicionado<br/>"+
"P1 adicionado<br/>"
;

function createLog(){
	let log = document.createElement("pre");
	log.style.position = "fixed";
	log.style.right = "10px";
	log.style.top = "10px";
	log.style.backgroundColor = "rgba(0,0,0, 0.0)";
	log.style.color = "Black";
	log.style.fontFamily = "consolas";
	log.innerHTML = logText;
	
	return log;
}


function appendLog(el){
	document.body.appendChild(el);
}

var idLog = setInterval(logStatusDOM, 10);
function logStatusDOM(){
	if(document.readyState == "complete"){
		clearInterval(logStatusDOM);
		logStatusDOM = null;
		logInit();
	}
}

function logInit(){
	log = createLog();
	appendLog(log);
}

