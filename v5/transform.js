// -------------- transform --------------


var transform = {};
transform.changing = false;
transform.activeProperty = null;
transform.activeInput = null;
transform.activeDiv = null;
transform.lastValue = 0;
transform.move = false;
transform.mouseUp=false;
transform.lastMouseX = 0;
transform.lastMouseY = 0;
transform.editing = false;
transform.escape = false;
transform.enable = false;

transform.bar={};
transform.bar.enable = false;
transform.bar.mouseUp = false;
transform.position = {x:0, y:0};

function transformInit(){
	let trans, transB, span;
	
	//adiciona a div#transformBar, se ainda não tem.
	transB = document.getElementById("transformBar");
	if(transB == null){
		transB = document.createElement("div");
		transB.id = "transformBar";
	}
	transB.classList.add("bar");
	// adiciona a letra "T"
	span = document.createElement("span");
	span.classList.add("key");
	span.innerHTML = "T";
	span.title = "tecla T";
	transB.appendChild(span);
	transB.addEventListener("mousedown", function(){
		trans = document.getElementById("transform");
		event.preventDefault();
		transform.bar.enable = true;
		transform.bar.diffx = mouse_x - trans.offsetLeft;
		transform.bar.diffy = mouse_y - trans.offsetTop;
	});
	
	//adiciona a div#transform, se ainda não tem.
	trans = document.getElementById("transform");
	if(trans == null){
		trans = document.createElement("div");
		trans.id = "transform";
	}
	trans.style.display = "block";
	trans.appendChild(transB);
	document.body.appendChild(trans);
	
	transformPropertyTitle("Posição:");
	transformPropertyAdd("positionX", "X", scene.object.position.x, 1, "px");
	transformPropertyAdd("positionY", "Y", scene.object.position.y, 1, "px");
	transformPropertyAdd("positionZ", "Z", scene.object.position.z, 1, "px");
	transformPropertyTitle("Rotação:");
	transformPropertyAdd("rotationX", "X", scene.object.rotation.x, 1, "°" ); // grau (símbolo: °)
	transformPropertyAdd("rotationY", "Y", scene.object.rotation.y, 1, "°" );
	transformPropertyAdd("rotationZ", "Z", scene.object.rotation.z, 1, "°" );
	transformPropertyTitle("Escala:");
	transformPropertyAdd("scaleX", "X", scene.object.scale.x, 0.01, "" );
	transformPropertyAdd("scaleY", "Y", scene.object.scale.y, 0.01, "" );
	transformPropertyAdd("scaleZ", "Z", scene.object.scale.z, 0.01, "" );
}

function transformUpdate(){
	
	if( keys.t && !transform.enable){ transform.enable=true; }
	if(!keys.t &&  transform.enable){ transform.enable=false; transformToggle(); }
	
	if(transform.bar.enable){
		transformMoveTable();
	} else {
		if(transform.bar.mouseUp){
			transform.bar.mouseUp = false;
			transformAdjustTable();
		}
	}
	
	if(keys.enter && transform.changing){
		transPropSwap(transform.activeProperty, null);
	}
	if(  keys.esc && !transform.escape ){
		transform.escape = true;
		transPropSwap(transform.activeProperty, "out");
	}
	if( !keys.esc &&  transform.escape ){
		transform.escape = false;
	}
	
	
	if(transform.editing && transform.move && mouse_b == 1){
		transPropChangeValue();
	}
	
	if(transform.mouseUp){
		transform.mouseUp = false;
		if(mouse_x==transform.lastMouseX && mouse_y==transform.lastMouseY){
			transform.activeInput.focus();
		}
	}
	
	transform.move = false;
}

function transPropHasFuncInAttribute(elmt, ev, func){
	let en;
	en = false;
	ev = elmt.getAttribute(ev);
	if(ev != null){
		func = ev.match(func);
		if(func != null){
			en = true;
		}
	}
	return en;
}

function transformPropertyAdd(pName="", pHol="", val="0", step="1", un=""){ // adiciona uma propriedade em div#tranform
	/* 	
		Parâmetros:
		pName: nome da propriedade
		 pHol: placeholder da tag input
		  val: valor
		 step: valor para variar ao pressionar os botões esquerdo e direito
		   un: unidade, Ex.: "degree" para grau (°); "pixel"; e "" para não definir qualquer unidade. 
		
		Retorno: nenhum
	*/
	let prop, lbut, mbut, minp, mdiv, rbut;
	
	// -------- montagem --------
	//propriedade
	prop = document.createElement("div");
	prop.classList.add("transform-property");
	prop.setAttribute("data-name", pName);
	prop.setAttribute("data-unity", un);
	
	//botão esquerdo
	lbut = document.createElement("button");
	lbut.classList.add("transform-button", "transform-button-left");
	lbut.innerHTML = "&lt;";
	
	//botão do meio
	mbut = document.createElement("div");
	mbut.classList.add("transform-property-middle");
	minp = document.createElement("input");
	minp.setAttribute("type", "text");
	minp.setAttribute("placeholder", pHol);
	minp.setAttribute("step", step);
	mdiv = document.createElement("div");
	mdiv.classList.add("transform-property-value");
	// se for °, converte para radianos
	if(un == "°"){ val = toDegree(val); }
	mdiv.innerHTML = val + ( un=="" ? "" : " "+un );
	mbut.appendChild(minp);
	mbut.appendChild(mdiv);
	
	//botão direito
	rbut = document.createElement("button");
	rbut.classList.add("transform-button", "transform-button-right");
	rbut.innerHTML = "&gt;";
	
	//monta a propiedade
	prop.appendChild(lbut);
	prop.appendChild(mbut);
	prop.appendChild(rbut);
	// -------- montagem --------
	
	// -------- eventos --------
	// botão esquerdo
	lbut.addEventListener("click", function(){ transPropDivOp(this); });
	
	//botão do meio
	mbut.addEventListener("focusin", function(){
		transPropSwap(this, "in");
	});
	mbut.addEventListener("focusout", function(){
		transform.editing = false;
		if(!transform.escape){ transPropSwap(this, "out"); }
	});
	mbut.addEventListener("mousedown", function(){
		if(!transform.editing){
			event.preventDefault();
			transform.editing = true;
			transform.activeInput = this.querySelector("input");
			transform.activeDiv = this.querySelector("div");
			transform.lastMouseX = mouse_x;
			transform.lastMouseY = mouse_y;
			transform.lastValue = transform.activeDiv.innerHTML;
		}
	});
	
	// botão direito
	rbut.addEventListener("click", function(){ transPropDivOp(this); });
	// -------- eventos --------
	
	
	//adiciona ao DOM
	document.getElementById("transform").appendChild(prop);
	
	transPropAdjustBorders(prop);
}

function transformPropertyTitle(tit){
	let trans, e;
	
	e = document.createElement("div");
	e.classList.add("title");
	e.innerHTML = tit;
	
	//adiciona o título
	trans = document.getElementById("transform");
	trans.appendChild(e);
}

function transPropAdjustBorders(prop){ // ajusta os cantos das bordas por meio de uma propriedade de referência (o parâmetro prop), o ajuste é feito com a adição/remoção de classes (CSS)
	let props, lbut, rbut;
	
	if(prop == null){ return; }
	
	
	props = prop.parentElement.querySelectorAll(".transform-property");
	
	// ajusta as bordas
	if(props.length > 0){ //     (1ª de um grupo)                                          /   \ 
		prop = props[0];
		lbut = prop.querySelector(".transform-button-left");
		lbut.classList.add("top-left");
		lbut.classList.remove("bottom-left");
		rbut = prop.querySelector(".transform-button-right");
		rbut.classList.add("top-right");
		rbut.classList.remove("bottom-right");
	}
	for(let i=1; i<(props.length-1); i+=1){ //     (meio de um grupo)                     |     |
		prop = props[i]; //                                                               |     |
		lbut = prop.querySelector(".transform-button-left"); //                           |     |
		lbut.classList.remove("top-left", "bottom-left"); //                              |     |
		rbut = prop.querySelector(".transform-button-right");
		rbut.classList.remove("top-right", "bottom-right");
	} //                                                                                         
	if( (props.length-1)>= 0 ){ //     (última de um grupo)                                \   /
		prop = props[(props.length-1)];
		lbut = prop.querySelector(".transform-button-left");
		lbut.classList.add("bottom-left");
		lbut.classList.remove("top-left");
		rbut = prop.querySelector(".transform-button-right");
		rbut.classList.add("bottom-right");
		rbut.classList.remove("top-right");
	}
	
}

function transPropChangeValue(){
	let div, inp, step, lv, v, u;
	inp = transform.activeInput;
	div = transform.activeDiv;
	if(inp != null){
		step = inp.getAttribute("step");
		if(step != null){
			if(div != null){
				if(transform.lastValue != ""){
					// --- é o mesmo que transform.lastValue + (mouse_x - transform.lastMouseX)*step ---
					lv = transPropGetNumber(transform.lastValue);
					v = (mouse_x - transform.lastMouseX);
					v = multiplyByTens(v, step);
					u = transPropGetUnity(transform.lastValue);
					transPropDefValue(div, addByStrings(lv, v) + " " + u);
				}
			}
		}
	}
}

function transPropGetNumber(str){
	str = str.match(/[\+\-]?[0-9]+(\.[0-9]*)?|[\+\-]?\.[0-9]+/g);
	
	return str==null ? "0" : str[0] ;
}

function transPropGetUnity(str){
	str = str.replace(/[\+\-]?[0-9]+(\.[0-9]*)?|[\+\-]?\.[0-9]+/g, "");
	return str.trim();
}

function transPropDefValue(e, v){
	let prop, axis, un;
	
	// pega a unidade ("pixel", "degree" ou "")
	un = e.parentElement.parentElement.getAttribute("data-unity").trim();
	
	v = transPropIsValid(v);
	if(v == null){ return; }
	
	//define o valor na div da propriedade
	e.innerHTML = v + ( un=="" ? "" : " "+un );
	
	//define o valor no objeto
	// pega a propriedade ( position, rotation ou scale )
	str = e.parentElement.parentElement.getAttribute("data-name").trim();
	if(str == ""){ return; }
					  prop = str.match(/position/i);
	if(prop == null){ prop = str.match(/rotation/i); }
	if(prop == null){ prop = str.match(/scale/i); }
	if(prop == null){ return; }
	prop = prop[0].toLowerCase();
	//pega o eixo ( x, y ou z )
	axis = str.slice(prop.length).trim().slice(0, 1).toLowerCase();
	
	// se for °, converte para radianos
	if(un == "°"){ v = toRadian(v); }
	//atribui o valor ao objeto
	scene.object[prop][axis] = parseFloat(v);
	
}



function transPropDivOp(e){
	let v, v1, u, inp, div, sgn, step;
	if(e==null){ return; }
	div = e.parentElement.querySelector(".transform-property-middle div");
	if(div==null){ return; }
	inp = e.parentElement.querySelector(".transform-property-middle input");
	if(inp==null){ return; }
	
	// pega o valor atual
	v1 = transPropGetNumber(div.innerHTML);
	
	//paga o valor de step
	step = inp.getAttribute("step");
	step = step == null ? 0 : step ;
	
	//se for botão esquerdo deve subtrair
	sgn = e.classList.contains("transform-button-left");
	sgn = sgn ? -1 : 1 ;
	if(sgn<0){ //troca o sinal de step. Ex: step = 2   ->  0-2=-2       ou      step = -2   ->   0-(-2)=+2
		step = subtractByStrings("0", step); // é o mesmo que 0-step = -step 
	}
	
	// aplica o novo valor
	v = addByStrings(v1, step);
	u = transPropGetUnity(div.innerHTML);
	transPropDefValue(div, v + ( u=="" ? "" : " "+u ));
}

function transPropSwap(e, op){ // e: propriedade, op: "in", "out" ou null
	let inp, div, esc;
	if(e == null){ return; }
	inp = e.querySelector("input"); 
	div = e.querySelector(".transform-property-value");
	esc = transform.escape;
	
	if(op == null){
		inp.blur();
	} else if(op == "in"){ // da div para o input (troca mútua dos valores)
		transform.lastValue = div.innerHTML;
		inp.value = div.innerHTML;
		div.innerHTML = "";
		transform.changing = true;
		transform.activeProperty = e;
	} else if(op == "out"){ // do input para a div (restaura os valores (retroca mútua dos valores))
		let v = inp.value;
		transPropDefValue(div, esc ? transform.lastValue : v);
		transform.changing = false;
		inp.blur();
		inp.value = "";
		//transform.activeProperty = null;
	}
}

function transPropIsValid(str){
	let res, pass=true, num, un;
	
	//se tem algum espaço entre números
	res = str.match(/[0-9]+\s[0-9]+/g);
	if(res != null){ return null; }
	
	//se tem mais de 1 ponto
	res = str.match(/[\.]/g);
	if(res != null && res.length>1){ return null; }
	
	//se tem algo diferente de \d\.[a-zA-Z]
	res = str.replaceAll(/[\+\-]/g, "").replaceAll(/[0-9]/g, "").replaceAll(/[\.]/g, "").replaceAll(/[ ]/g, "").replaceAll(/[^0-9]/g, "");
	if(res != ""){ return null; }
	
	res = str.match(/[\+\-]?[0-9]+(\.[0-9]*)?|[\+\-]?\.[0-9]+\s*[^0-9]*/g); // "12.34 m"
	
	if(res == null || res.length > 1){
		return null;
	}
	
	res = res[0];
	num = transPropGetNumber(res);
	un = transPropGetUnity(res);
	
	return num + ( un=="" ? "" : " "+un );
}

function transformToggle(){
	let e = document.getElementById("transform");
	
	if(e.style.display == "none"){
		e.style.display = "block";
	} else {
		e.style.display = "none";
	}
}

function transformMoveTable(){
	let e,x,y;
	
	e = document.getElementById("transform");
	
	x = mouse_x - transform.bar.diffx;
	y = mouse_y - transform.bar.diffy;
	
	transform.position.x = x;
	transform.position.y = y;
	
	e.style.left = x + "px";
	e.style.top = y + "px";
}

function transformAdjustTable(){
	let inf, bar;
	let ww, wh, wox, woy, bw, bh, bm;
	let x1, y1, x2, y2;
	
	//definição de valores
	//valores iniciais
	inf = document.getElementById("transform");
	bar = document.getElementById("transformBar");
	ww = window.innerWidth;
	wh = window.innerHeight;
	wox = window.pageXOffset;
	woy = window.pageYOffset;
	bw = bar.offsetWidth;
	bh = bar.offsetHeight;
	bm = 30;
	x1 = inf.offsetLeft;      y1 = inf.offsetTop;
	x2 = x1 + bw;             y2 = y1 + bh;
	
	//limites no eixo x
	if((x2-bm)<0){ x1=-bw+bm; } else 
	if((x1+bm)>(ww+wox)){ x1=(ww+wox)-bm; }
	
	//limites no eixo y
	if((y2-bm)<0){ y1=-bh+bm; } else 
	if(y1>(wh+woy)){ y1=(wh+woy)-bm; }
	
	//aplica os valores
	//valores finais
	inf.style.left = x1+"px";
	inf.style.top = y1+"px";
	console.log("transformAdjustTable();");
}




// -------------- transform --------------