//---------------- infoTable ----------------




var info = {
	
};
info.enable = false;
info.bar={};
info.bar.enable = false;
info.bar.mouseUp = false;
info.position = {x:0, y:0};


function infoInit(){
	let inf, infB, span;
	
	//adiciona a div#infoBar, se ainda não tem.
	infB = document.getElementById("infoBar");
	if(infB == null){
		infB = document.createElement("div");
		infB.id = "infoBar";
	}
	infB.classList.add("bar");
	// adiciona a letra "I"
	span = document.createElement("span");
	span.classList.add("key");
	span.innerHTML = "I";
	span.title = "tecla I";
	infB.appendChild(span);
	infB.addEventListener("mousedown", function(){
		inf = document.getElementById("info");
		event.preventDefault();
		info.bar.enable = true;
		info.bar.diffx = mouse_x - inf.offsetLeft;
		info.bar.diffy = mouse_y - inf.offsetTop;
	});
	
	//adiciona a div#info, se ainda não tem.
	inf = document.getElementById("info");
	if(inf == null){
		inf = document.createElement("div");
		inf.id = "info";
	}
	inf.style.display = "block";
	inf.appendChild(infB);
	//define posição
	inf.style.left = (window.innerWidth/2+100) + "px";
	document.body.appendChild(inf);
	infoAdjustTable();
	
	//adiciona os botões de seleção
	infoTitleAdd("informações");
	infoItemAdd("legend", true, null, "legenda");
	infoItemAdd("equation", true, null, "equações");
	infoItemAdd("title", true, null, "títulos");
	infoItemAdd("subtitle", true, null, "subtítulos");
	infoItemAdd("description", true, null, "descrições");
	infoItemAdd("originIndicator", true, null, "origens (indicadores) (todos)");
	infoItemAdd("originAxis", true, null, "origens (eixos) (todos)");
	infoItemAdd("divisor", true, null, "divisores");
	
	infoItemAdd("worldOriginIndicator", true, null, "origem (indicador) (no Espaço do Mundo)");
	infoItemAdd("worldOriginAxis", true, null, "origem (eixos) (no Espaço do Mundo)");
	infoItemAdd("worldPoints", true, null, "pontos (no Espaço do Mundo) (vista de cima para baixo)");
	//tela
	infoTitleAdd("tela");
	infoItemAdd("screenXY", true, null, "tela (Espaço de Tela)");
	infoItemAdd("screenOrigin", true, null, "origem (eixos) da Tela");
	infoItemAdd("screenMeasure", true, null, "medidas (x e y) da projeção do ponto em destaque na tela");
	infoItemAdd("projectedPointsXY", true, null, "pontos projetados (Espaço de Tela XY)");
	
	
	//câmera em movimento
	infoTitleAdd("câmera em movimento");
	infoItemAdd("moveView.arrow",             false, null, "origem (indicador)");
	infoItemAdd("moveView.axis",              true , null, "origem (eixos)");
	//bits para função drawObject...View()
	infoItemAdd("moveView.transformedPoints", false,    4, "pontos transformados do objeto em destaque (no Espaço da Câmera)");
	infoItemAdd("moveView.lines",             true ,    3, "linhas de referência para projeção");
	infoItemAdd("moveView.projectedPoints",   true ,    2, "pontos projetados (no Espaço de Projeção)");
	infoItemAdd("moveView.triangles",         true ,    1, "triângulos");
	infoItemAdd("moveView.measures",          true ,    0, "medidas para projeção");
	//bits para função drawCamera2D()
	infoGroupButAdd("moveView");
	
	//câmera (vista de topo)
	infoTitleAdd("câmera vista de topo");
	infoItemAdd("topView.arrow",             true, null, "origem (indicador)");
	infoItemAdd("topView.axis",              true, null, "origem (eixos)");
	//bits para função drawObject...View()
	infoItemAdd("topView.transformedPoints", true,    4, "pontos transformados do objeto em destaque (no Espaço da Câmera)");
	infoItemAdd("topView.lines",             true,    3, "linhas de referência para projeção");
	infoItemAdd("topView.projectedPoints",   true,    2, "pontos projetados (no Espaço de Projeção)");
	infoItemAdd("topView.triangles",         true,    1, "triângulos");
	infoItemAdd("topView.measures",          true,    0, "medidas para projeção");
	//bits para função drawCamera2D()
	infoGroupButAdd("topView");
	//câmera (vista lateral)
	infoTitleAdd("câmera vista lateral");
	infoItemAdd("sideView.arrow", true, null, "origem (indicador)");
	infoItemAdd("sideView.axis", true, null, "origem (eixos)");
	//bits para função drawObject...View()
	infoItemAdd("sideView.transformedPoints", true, 4, "pontos transformados do objeto em destaque (no Espaço da Câmera)");
	infoItemAdd("sideView.lines",            true, 3, "linhas de referência para projeção");
	infoItemAdd("sideView.projectedPoints",  true, 2, "pontos projetados (no Espaço de Projeção)");
	infoItemAdd("sideView.triangles",        true, 1, "triângulos");
	infoItemAdd("sideView.measures",         true, 0, "medidas para projeção");
	//bits para função drawCamera2D()
	infoGroupButAdd("sideView");
}


function infoGroupButAdd(grp){
	let inf, div, buts;
	//info.moveView. position focalLength projectionScreen leftPoint leftLine leftRightAngle rightPoint rightLine rightRightAngle screen fov bits
	//info.topView.  position focalLength projectionScreen leftPoint leftLine leftRightAngle rightPoint rightLine rightRightAngle screen fov bits
	//info.sideView. position focalLength projectionScreen leftPoint leftLine leftRightAngle rightPoint rightLine rightRightAngle screen fov bits
	buts = [{kp:grp, kc:"position",         val:true, bit:10, str:"pos",   tit:"posição"},
			{kp:grp, kc:"focalLength",      val:true, bit:9, str:"fLen",  tit:"distância focal"},
			{kp:grp, kc:"projectionScreen", val:true, bit:8, str:"pPlan", tit:"plano de projeção"},
			{kp:grp, kc:"leftPoint",        val:true, bit:7, str:"lPnt",  tit:"ponto esquerdo"},
			{kp:grp, kc:"leftLine",         val:true, bit:6, str:"lLin",  tit:"linha esquerda"},
			{kp:grp, kc:"leftRightAngle",   val:true, bit:5, str:"lRAng", tit:"ângulo reto esquerdo"},
			{kp:grp, kc:"rightPoint",       val:true, bit:4, str:"rPnt",  tit:"ponto direito"},
			{kp:grp, kc:"rightLine",        val:true, bit:3, str:"rLin",  tit:"linha direita"},
			{kp:grp, kc:"rightRightAngle",  val:true, bit:2, str:"rRAng", tit:"ângulo reto direito"},
			{kp:grp, kc:"screen",           val:true, bit:1, str:"scr",   tit:"tela"},
			{kp:grp, kc:"fov",              val:true, bit:0, str:"fov",   tit:"campo de visão"}];
	div = document.createElement("div");
	div.classList.add("infoGroup");
	// pos, fLen, pPlan, lPnt, lLin, lRAng, rPnt, rLin, rRAng, scr, fov
	for(let i=0; i<buts.length; i+=1){
		let but;
		but = buts[i];
		but = createInfoBut(but.kp, but.kc, but.val, but.bit, but.str, but.tit);
		div.appendChild(but);
	}
	inf = document.getElementById("info");
	inf.appendChild(div);
}





function createInfoBut(kp, kc, val, bit, desc, tit){//key parent, key child, valor, bit, descrição, título | retorna null se keyParent e keyChild forem, ambos, igual a ""
	let but;
	but = document.createElement("button");
	but.innerHTML = desc;
	but.title = tit+" | [info."+kp+"."+kc+" | info."+kp+".bits bit "+bit+"]";
	but.classList.add("infoButton");
	but.id = infoToCamelCase("info."+kp+"."+kc);
	but.setAttribute("data-bit", bit);
	if(kp!==""){
		if(kc!==""){// define o grupo kp, com kc como um de seus itens
			if(info[kp]===undefined){
				info[kp]={};
			}
			if(info[kp].bits===undefined){
				info[kp].bits = 0;
			}
			
			info[kp][kc] = {value:val, bit: bit};
			if(info[kp][kc].value){ but.classList.add("infoButtonActive"); }
			let v2 = Math.pow(2, info[kp][kc].bit);
			info[kp].bits = info[kp][kc].value? oneBitSet(info[kp].bits, v2, "set")   :  oneBitSet(info[kp].bits, v2, "unset") ;//liga ou desliga o bit
			but.onclick = function(){
				let it=info[kp][kc];
				it.value=!it.value;				
				if(it.value){ this.classList.add("infoButtonActive"); } else 
					{ this.classList.remove("infoButtonActive"); }
				let v = Math.pow(2, it.bit);
				info[kp].bits = it.value ? oneBitSet(info[kp].bits, v, "set") : oneBitSet(info[kp].bits, v, "unset");
			};
		} else {
			info[kp]=val;
			but.onclick = function(){
				info[kp]=!info[kp];
				this.innerHTML = info[kp]?"1":"0";
			};
		}
	} else if(kc!==""){
		info[kc]=val;
		but.onclick = function(){
			info[kc]=!info[kc];
			this.innerHTML = info[kc];
		};
	} else {
		return null;
	}
	
	return but;
}

function oneBitSet(varA, oneB, op){// ligar ou desligar um único bit em uma variável. oneB deve conter um único bit ligado ou todos desligados, seu valor definirá varA
	if(op == "set"){
		return varA | oneB; //liga o bit
	} else if(op == "unset"){
		if(varA & oneB){
			return varA ^ oneB; //xor para desligar o bit
		}
		return varA; // o bit já estava desligado
	}
}

function infoTitleAdd(tit){
	let div;
	div = document.createElement("div");
	div.classList.add("infoTitle");
	div.innerHTML = tit;
	
	document.getElementById("info").appendChild(div);
}

function infoItemAdd(key, val, bit, desc){ // nome (key), valor, bit, descrição         o nome é um objeto até três níveis   a.b.c = valor
	let div, inp, lab, kstr; //kstr, apenas para definir o title
	
	inp = document.createElement("input");
	inp.type = "checkbox";
	inp.checked = val;
	
	//tratamento de key para a definição do objeto info
	let arr = key.replaceAll(/\s/g, "").split(".");
	let key1, key2, key3;
	if(arr.length==1){// 1 nível (não tem o .bits2)
		key1=arr[0];
		info[key1] = val;
		inp.onclick = function(){ info[key1] = this.checked; };
		kstr = "";
	} else if(arr.length==2){ // 2 níveis
		key1=arr[0]; key2=arr[1];
		if(info[key1]===undefined){ info[key1]={}; }
		if(bit!==null){
			if(info[key1].bits2===undefined){ info[key1].bits2=0; }
			info[key1][key2] = {value:val, bit:bit};
		} else {
			info[key1][key2] = val;
		}
		if(bit!==null){
			let v2 = Math.pow(2, info[key1][key2].bit);
			info[key1].bits2 = info[key1][key2].value ?  oneBitSet(info[key1].bits2, v2, "set") : oneBitSet(info[key1].bits2, v2, "unset") ;
			kstr = key1+".bits2";
		}
		inp.onclick = function(){
			let it = info[key1][key2];
			if(it.value === undefined){ // se não é um objeto
				info[key1][key2] = this.checked;
			} else { // se é um objeto
				info[key1][key2].value = this.checked;
				let v = Math.pow(2, it.bit);
				info[key1].bits2 = it.value ?  oneBitSet(info[key1].bits2, v, "set") : oneBitSet(info[key1].bits2, v, "unset") ;
			}
			//console.log("info["+key1+"]["+key2+"]:"+info[key1][key2]);
		};
		
	} else if(arr.length==3){ // 3 níveis
		key1=arr[0]; key2=arr[1]; key3=arr[2];
		if(info[key1]===undefined){ info[key1]={}; }
		if(info[key1][key2]===undefined){ info[key1][key2]={}; }
		if(bit!==null){
			if(info[key1][key2].bits2===undefined){ info[key1][key2].bits2=0; }
		}
		info[key1][key2][key3] = bit!=null ? {value:val, bit:bit} : val;
		if(bit!==null){
			let v2 = Math.pow(2, info[key1][key2][key3].bit);
			info[key1][key2].bits2 = info[key1][key2][key3].value ?  oneBitSet(info[key1][key2].bits2, v, "set") : oneBitSet(info[key1][key2].bits2, v, "unset") ;
			kstr = key1+"."+key2+".bits2";
		}
		inp.onclick = function(){
			let it = info[key1][key2][key3];
			if(it.value === undefined){ // se não é um objeto
				info[key1][key2][key3] = this.checked;
			} else { // se é um objeto
				info[key1][key2][key3].value = this.checked;
				let v2 = Math.pow(2, it.bit);
				info[key1][key2].bits2 = it.value ?  oneBitSet(info[key1][key2].bits2, v2, "set") : oneBitSet(info[key1][key2].bits2, v2, "unset");
			}
		};
	} else {// 4 ou mais, calapsa em um nome único (1 nível)
		key1 = arr.toString().replaceAll(",", "");
		info[key1] = val;
		inp.onclick = function(){ info[key1] = this.checked; };
		kstr = "";
	}
	
	div = document.createElement("div");
	div.classList.add("infoItem");
	//define id no estilo "camelCase", em que segundo nome da composição tem a 1ª letra em maiúsculo
	div.id = infoToCamelCase("info."+key);
	
	lab = document.createElement("label");
	lab.innerHTML = desc;
	lab.title = "info."+key + (bit!==null ? " | info."+kstr+" bit "+bit : "" );

	
	
	div.appendChild(inp);
	div.appendChild(lab);
	
	document.getElementById("info").appendChild(div);
}

function infoToCamelCase(str){ // converte par camel case. Ex.: "info.moveView.arrow" -> "infoMoveViewArrow"
	let arr, str2;
	
	//retira caracteres brancos das laterais da string
	str = str.trim();
	
	// pega nomes da composição a partir do 2º nome. Ex.: info.moveView.arrow -> [0]:".moveView" e [1]:".arrow"
	arr = str.match(/[\.\s][^\.\s]+/g);
	if(arr == null){
		return str;
	}
	
	// pega o 1º nome da composição. Ex.: info.moveView.arrow -> "info"
	str = str.match(/[^\.\s]+/);
	for(let i=0; i<arr.length; i+=1){
		str2 = arr[i].slice(1); // retira o "."
		str2 = str2[0].toUpperCase() + str2.slice(1); // converte 1ª letra para maiúscula
		str += str2;
	}
	return str;
}

function infoItemGet(key, kc){ // key = nome do item no objeto info, kc = elemento filho (input ou label; se kc="", retornará a div pai que contém as tags input e label)
	let str, e;
	
	//remove caracteres brancos das laterais da string
	key = key.trim();
	
	
	// retira o "info" ou "info." se houver
	str = key.match(/^info[\.]?/); // pega "info" ou "info." no início da string
	if(str !== null){
		str = str[0];
		key = key.slice(str.length);
	}
	
	//converte para camelCase
	key = infoToCamelCase("info."+key);
	
	//pega o item
	e = document.querySelector("#"+key+" "+kc); // estilo "camelCase", em que do segundo nome em diante da composição tem a 1ª letra em maiúsculo
	return e;
}

function infoIntemCheck(key){// marca um item da tabela info por meio da simulação de um evento click.
	e = infoItemGet(key, "input");
	if(e !== null){
		if(!e.checked){
			e.click();
		}
	}
}

function infoIntemUncheck(key){// desmarca um item da tabela info por meio da simulação de um evento click.
	e = infoItemGet(key, "input");
	if(e !== null){
		if( e.checked){
			e.click();
		}
	}
}
/*
infoItemAdd();
infoGroupButAdd();
*/
function infoGroupButGet(gkey){ // gkey: chave de grupo
	return infoItemGet(gkey, "");
}

function infoPropertyGet(gkey){
	let key1, key2, key3, arr, inf, str;
	
	// retira o "info" ou "info." se houver
	str = gkey.match(/^info[\.]?/); // pega "info" ou "info." no início da string
	if(str !== null){
		str = str[0];
		gkey = gkey.slice(str.length);
	}
	
	// pega as chaves info[key1] ou info[key1][key2]
	arr = gkey.split(".");
		 if(arr.length==1){ key1=arr[0]; 						   inf = info[key1];             } // nível 1 
	else if(arr.length==2){ key1=arr[0]; key2=arr[1];              inf = info[key1][key2];       } // nível 2
	else if(arr.length==3){ key1=arr[0]; key2=arr[1]; key3=arr[2]; inf = info[key1][key2][key3]; } // nível 3
	
	return inf;
}

function infoGroupButCheck(gkey){
	let inf;
	e = infoGroupButGet(gkey, "");
	if(e === null){ return; }
	
	inf = infoPropertyGet(gkey);
	if( inf.value){
		e.click();
	}
}

function infoGroupButUncheck(gkey){
	let inf;
	e = infoGroupButGet(gkey, "");
	if(e === null){ return; }
	
	inf = infoPropertyGet(gkey);
	if( inf.value){
		e.click();
	}
}

function infoUpdate(){
	
	if( keys.i && !info.enable){ info.enable=true; }
	if(!keys.i &&  info.enable){ info.enable=false; infoToggle(); }
	
	if(info.bar.enable){
		infoMoveTable();
	} else {
		if(info.bar.mouseUp){
			info.bar.mouseUp = false;
			infoAdjustTable();
		}
	}
	
}

function infoToggle(){
	let e = document.getElementById("info");
	
	if(e.style.display == "none"){
		e.style.display = "block";
	} else {
		e.style.display = "none";
	}
}

function infoMoveTable(){
	let e,x,y;
	
	e = document.getElementById("info");
	
	x = mouse_x - info.bar.diffx;
	y = mouse_y - info.bar.diffy;
	
	info.position.x = x;
	info.position.y = y;
	
	e.style.left = x + "px";
	e.style.top = y + "px";
}

function infoAdjustTable(){
	let inf, bar;
	let ww, wh, wox, woy, bw, bh, bm;
	let x1, y1, x2, y2;
	
	//definição de valores
	//valores iniciais
	inf = document.getElementById("info");
	bar = document.getElementById("infoBar");
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
	console.log("infoAdjustTable();");
}



//---------------- infoTable ----------------