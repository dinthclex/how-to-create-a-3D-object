//------------------ statusTable ------------------



var statusTable = {};
statusTable.enable = false;
statusTable.display = true;
statusTable.bar = {};
statusTable.bar.enable = false;
statusTable.bar.mouseUp = false;
statusTable.position = {x:0, y:0};

function statusTableInit(){
	let stsT, stsB, span, sts2;
	
	//adiciona a div#statusTableBar, se ainda não tem.
	stsB = document.getElementById("statusTableBar");
	if(stsB == null){
		stsB = document.createElement("div");
		stsB.id = "statusTableBar";
	}
	stsB.classList.add("bar");
	// adiciona a letra "V"
	span = document.createElement("span");
	span.classList.add("key");
	span.innerHTML = "V";
	span.title = "tecla V";
	stsB.appendChild(span);
	stsB.addEventListener("mousedown", function(){
		stsT = document.getElementById("statusTable");
		event.preventDefault();
		statusTable.bar.enable = true;
		statusTable.bar.diffx = mouse_x - stsT.offsetLeft;
		statusTable.bar.diffy = mouse_y - stsT.offsetTop;
		console.log("passou aqui");
	});
	
	
	// adiciona a pre#status, se ainda não tem
	sts2 = document.getElementById("status");
	if(sts2 == null){
		sts2 = document.createElement("pre");
		sts2.id = "status";
	}
	
	//adiciona a div#info, se ainda não tem.
	stsT = document.getElementById("statusTable");
	if(stsT == null){
		stsT = document.createElement("div");
		stsT.id = "statusTable";
	}
	stsT.style.top = (window.innerHeight - 350) + "px";
	stsT.style.display = "block";
	stsT.appendChild(stsB);
	stsT.appendChild(sts2);
	document.body.appendChild(stsT);
	statusTableAdjustTable();
}


function statusTableUpdate(){
	if( keys.v && !statusTable.enable){ statusTable.enable=true; }
	if(!keys.v &&  statusTable.enable){ statusTable.enable=false; statusToggle(); }
	
	if(statusTable.bar.enable){
		statusTableMoveTable();
	} else {
		if(statusTable.bar.mouseUp){
			statusTable.bar.mouseUp = false;
			statusTableAdjustTable();
		}
	}
	
	if(statusTable.display){
		statusUpdateValues();
	}
}

function statusUpdateValues(){
	let s;
	
	s = "fps: " + fps + "<br/>" +
		"player: x:"+(parseInt(player.x*100)/100)+"  y:"+(parseInt(player.y*100)/100) + " z:"+ (parseInt(player.z*100)/100) + "<br/>" +
		"player.ang: " + (parseInt(player.ang*100)/100)+"rad | "+parseInt((player.ang/TWO_PI)*360)+" graus" + "<br/>" +
		"mouse: "+mouse_x+","+mouse_y + " | " + mouse_b + " last: "+mouse_last_x+","+mouse_last_y + "<br/>"+
		"info: x:"+document.getElementById("info").offsetLeft+" y;"+document.getElementById("info").offsetTop+"<br/>"+
		"transform.lastValue:"+transform.lastValue+"<br/>"+
		"transform.enable:"+transform.enable+"<br/>"+
		"transform.editing:"+transform.editing+"<br/>"+
		"transform.move:"+transform.move+"<br/>"+
		"transform.activeInput:"+transform.activeInput+"<br/>"+
		"transform.activeProperty:"+transform.activeProperty+"<br/>"+
		"frame_onclick:"+frame_onclick+"<br/>"+
		"statusTable.bar.enable:"+statusTable.bar.enable+"<br/>"+
		"statusTable.enable:"+statusTable.enable;
	
	document.getElementById("status").innerHTML = s;
}

function statusToggle(){
	let e = document.getElementById("statusTable");
	
	if(e.style.display == "none"){
		e.style.display = "block";
		statusTable.display = true;
	} else {
		e.style.display = "none";
		statusTable.display = false;
	}
}

function statusTableMoveTable(){
	let e,x,y;
	
	e = document.getElementById("statusTable");
	
	x = mouse_x - statusTable.bar.diffx;
	y = mouse_y - statusTable.bar.diffy;
	
	statusTable.position.x = x;
	statusTable.position.y = y;
	
	e.style.left = x + "px";
	e.style.top = y + "px";
}

function statusTableAdjustTable(){
	let sts, bar;
	let ww, wh, wox, woy, bw, bh, bm;
	let x1, y1, x2, y2;
	
	//definição de valores
	//valores iniciais
	sts = document.getElementById("statusTable");
	bar = document.getElementById("statusTableBar");
	ww = window.innerWidth;
	wh = window.innerHeight;
	wox = window.pageXOffset;
	woy = window.pageYOffset;
	bw = bar.offsetWidth;
	bh = bar.offsetHeight;
	bm = 30;
	x1 = sts.offsetLeft;      y1 = sts.offsetTop;
	x2 = x1 + bw;             y2 = y1 + bh;
	
	//limites no eixo x
	if((x2-bm)<0){ x1=-bw+bm; } else 
	if((x1+bm)>(ww+wox)){ x1=(ww+wox)-bm; }
	
	//limites no eixo y
	if((y2-bm)<0){ y1=-bh+bm; } else 
	if(y1>(wh+woy)){ y1=(wh+woy)-bm; }
	
	//aplica os valores
	//valores finais
	sts.style.left = x1+"px";
	sts.style.top = y1+"px";
	console.log("statusTableAdjustTable();");
}



//------------------ statusTable ------------------