class CalcLogic {
	numberNow = 1;
	numberSignNow = "+";
	number1 = "0";
	number2 = "0";
	methodNow = null;
	result = null;
	isEnd = false;
	notation = "DEC";
	maxLen = 12;
	memNum = "";
	hexInput="";
	history = [];
	curHist = "";
	histN2 = "";
	
	constructor()
	{
		Math.newSqrt = (x, n) => {
			if(x < 0 && n%2 != 1) return NaN;
				return (x < 0 ? -1 : 1) * Math.pow(Math.abs(x), 1/n);
		}

		Math.actan = (x) => {
			return Math.PI / 2 - Math.atan(x); 
		}
		
		Math.ctan = (x) => { 
			return 1 / Math.tan(x); 
		}

		this.updateNotation();
	}
	
	updateInput()
	{
		let viewNum = NaN;
		
		this.updateMemAction();

		if(this.result == null)
		{
			if(this["number" + this.numberNow] == "" || this["number" + this.numberNow] == "-"){
				this["number" + this.numberNow] = "0";
				this.numberSignNow = "+";
				viewNum = 0;
			}else{
				viewNum = this["number" + this.numberNow];
			}
			
		}
		else if(this.result!= NaN && this.result != Infinity)
		{
			
			if(this.result==0){
				viewNum = "0";
			}else if(Math.abs(this.result)>999999999999 || Math.abs(this.result)<0.0000000001){
				viewNum = this.result.toExponential();
			}else{
				viewNum = this.noExp(this.result);
				if(viewNum.indexOf(".")>=0){
					viewNum = this.roundNum(viewNum);
				}
			}
		}

		this["number" + this.numberNow] = "" + viewNum;

		if(this.notation == "HEX"){
			this["number" + this.numberNow] = this.normalFloor(this["number" + this.numberNow]);
			viewNum = this.toHex(viewNum).toUpperCase();
		}

		$("#window").val(viewNum);
	}

	updateMemAction(mode){
		if(this.methodNow == null && mode!="noClear"){
			$("#memAction")[0].innerText = "";
		}else{
			let num = this.roundNum((+this.number1).toString());
			if(this.notation == "HEX")
				num = this.toHex(num);
			$("#memAction")[0].innerText = num + " " + this.methodNow;
		}
	}

	updateMemNum(){
		if(this.memNum == ""){
			$("#memNum")[0].innerText = "";
		}else{
			let num = this.roundNum((+this.memNum).toString());
			if(this.notation == "HEX")
				num = this.toHex(num);
			$("#memNum")[0].innerText = num;
		}
	}

	updateNotation(){
		if(this.notation=="DEC"){
			$("#decSpan").css("font-weight","bold");
			$("#hexSpan").css("font-weight","");
			$(".notHex").removeClass("disabled");
			$(".btnLet").addClass("disabled");
		}
		else{
			$("#decSpan").css("font-weight","");
			$("#hexSpan").css("font-weight","bold");
			$(".notHex").addClass("disabled");
			$(".btnLet").removeClass("disabled");
		}
	}

	checkEnd(){
		if(this.isEnd){
			this.btnPressClean();
			this.isEnd = false;
		}
	}

	checkResult(){
		if(this.result != null){
			/*
			if(this.numberNow==1){
				this.number1 = "" + this.result;
			}
			else{
				this.number1 = this.number2;
			}
			this.numberNow = 1;
			this.numberSignNow = this.number1[0]=='-'?"-":"+";*/
			this.result = null;
		}
	}

	checkAction(){
		if(this.methodNow!=null && this.numberNow==2){
			this.btnPressResult("clear");
		}
		//this.updateInput();
	}

	checkRules(mode){
		this.checkEnd();
		this.checkResult();
		if(mode=="binary")this.checkAction();
	}
	
	_btnAnimation(name)
	{
		$(`#btn${name}`).css('background-color','#797979');
		setTimeout(()=>{
			$(`#btn${name}`).css('background-color','');
		},100);
	}

	btnPressNum(num) {

		this.checkRules();

		if(this["number" + this.numberNow].length - (this["number"+this.numberNow].indexOf(".")==-1?0:1) < this.maxLen)
		{
			let number = Number(num);
			if(!isNaN(number))
			{
				this._btnAnimation(number);
				
				if(this.notation=="DEC"){
					if(this["number" + this.numberNow]=="0" && this["number" + this.numberNow].toString().indexOf(".")==-1){
						this["number" + this.numberNow] = "" +  number;
					}else{
						this["number" + this.numberNow] = this["number" + this.numberNow] + "" + number;
					}
				}else{
					this.hexInput = this.toHex(this["number" + this.numberNow]);
					if(this.hexInput=="0"){
						this.hexInput = "" + number;
					}else{
						this.hexInput = this.hexInput + "" + number;
					}
					this["number" + this.numberNow] = this.toDec(this.hexInput);
				}
				
				this.updateInput();
			}
			else
			{
				console.error("Func name: btnPressNum\n\nError: var num - is not number");
			}
		}
		else
		{
			console.info(`Func name: btnPressNum\n\nInfo: var number${this.numberNow} - length more than ${this.maxLen}`);
		}		
	}
	
	btnPressBackspace()
	{

		this.checkRules();

		this._btnAnimation("Backspace");
		
		//if(this.result == null)
		//{
		let str = this["number" + this.numberNow] + "";
		if(this.notation=="DEC"){
			this["number" + this.numberNow] = str.substr(0, str.length - 1);
		}
		else{
			this.hexInput = this.toHex(this["number" + this.numberNow]);
			this.hexInput = this.hexInput.substr(0, this.hexInput.length - 1);
			this["number" + this.numberNow] = this.toDec(this.hexInput);	
		}
		
		this.updateInput();
		/*}
		else
		{
			this.btnPressClean();
		}*/
	}
	
	btnPressCleanEntry()
	{

		this.checkRules();

		this._btnAnimation("CleanEntry");

		this["number" + this.numberNow] = "0";

		this.updateInput();

		/*
		if(this.result == null)
		{
			this["number" + this.numberNow] = "";
			
			if(this.numberNow == 2)
			{
				this.numberNow = 1;
			}	

			this.updateInput();
		}
		else
		{
			this.result = null;
			
			this.updateInput();
		}*/

	}
	
	btnPressClean()
	{
		this.numberNow = 1;
		this.numberSignNow = "+";
		this.number1 = "0";
		this.number2 = "0";
		this.methodNow = null;
		this.result = null;
		this.memNum = "";

		this.updateMemNum();
		this.updateInput();
	}
	
	btnPressDot()
	{

		this.checkRules();

		this._btnAnimation("Dot");
		
		let str = this["number" + this.numberNow] + "";
		
		if(!str.includes("."))
		{
			this["number" + this.numberNow] = this["number" + this.numberNow] + ".";
			
			this.updateInput();
		}
		else
		{
			console.info("Точка уже установлена!");
		}
	}
	
	btnPressSwapSign()
	{

		this.checkRules();

		if(this["number" + this.numberNow].length == 0)
			return console.log("Нет числа");
		
		this._btnAnimation("Sign");

		if(this["number" + this.numberNow] == "0"){
			this.numberSignNow == "+";
			return;
		}
		
		if(this.numberSignNow == "+")
		{
			this.numberSignNow = "-";
			this["number" + this.numberNow] = "-" + this["number" + this.numberNow];
			this.updateInput();
		}
		else if(this.numberSignNow == "-")
		{
			this.numberSignNow = "+";
			this["number" + this.numberNow] = this["number" + this.numberNow].substring(1);
			this.updateInput();
		}
		else
		{
			console.error(`Func name: btnPressSwapSign\n\nError: var numberSignNow - unknown value`);
		}
	}
	
	btnPressPlus()
	{
		this.checkRules("binary");

		this._btnAnimation("Plus");
		
		if(this.result != null)
		{
			this.number1 ="" + this.result;
			this.number2 = "";
			this.result = null;
		}	
		
		this.methodNow = "+";
		
		this.numberNow = 2;

		setTimeout(()=>{
			this.updateInput();
		},100);
	}
	
	btnPressMinus()
	{

		this.checkRules("binary");

		this._btnAnimation("Minus");
		
		if(this.result != null)
		{
			this.number1 ="" +  this.result;
			this.number2 = "";
			this.result = null;
		}
		
		this.methodNow = "-";
		
		this.numberNow = 2;
		
		setTimeout(()=>{
			this.updateInput();
		},100);
	}
	
	btnPressStar()
	{
		this.checkRules("binary");

		this._btnAnimation("Star");
		
		if(this.result != null)
		{
			this.number1 ="" +  this.result;
			this.number2 = "";
			this.result = null;
		}
		
		this.methodNow = "*";
		
		this.numberNow = 2;
		
		setTimeout(()=>{
			this.updateInput();
		},100);
	}
	
	btnPressSlash()
	{
		this.checkRules("binary");

		this._btnAnimation("Slash");
		
		if(this.result != null)
		{
			this.number1 ="" +  this.result;
			this.number2 = "";
			this.result = null;
		}
		
		this.methodNow = "/";
		
		this.numberNow = 2;
		
		setTimeout(()=>{
			this.updateInput();
		},100);
	}
	
	btnPressDiv()
	{
		this.checkRules("binary");

		this._btnAnimation("Div");
		
		if(this.result != null)
		{
			this.number1 ="" +  this.result;
			this.number2 = "";
			this.result = null;
		}
		
		this.methodNow = "div";
		
		this.numberNow = 2;
		
		setTimeout(()=>{
			this.updateInput();
		},100);
	}
	
	btnPressMod()
	{
		this.checkRules("binary");

		this._btnAnimation("Mod");
		
		if(this.result != null)
		{
			this.number1 = "" + this.result;
			this.number2 = "";
			this.result = null;
		}
		
		this.methodNow = "mod";
		
		this.numberNow = 2;
		
		setTimeout(()=>{
			this.updateInput();
		},100);
	}
	
	btnPressSqrtXY()
	{
		this.checkRules("binary");

		this._btnAnimation("SqrtXY");
		
		if(this.result != null)
		{
			this.number1 ="" +  this.result;
			this.number2 = "";
			this.result = null;
		}
		
		this.methodNow = "sqrt";
		
		this.numberNow = 2;
		
		setTimeout(()=>{
			this.updateInput();
		},100);
	}
	
	btnPressPowerXY()
	{
		this.checkRules("binary");

		this._btnAnimation("PowerXY");
		
		if(this.result != null)
		{
			this.number1 = "" + this.result;
			this.number2 = "";
			this.result = null;
		}
		
		this.methodNow = "power";
		
		this.numberNow = 2;
		
		setTimeout(()=>{
			this.updateInput();
		},100);
	}
	
	btnPressSqrtX2()
	{
		this.checkRules();

		this._btnAnimation("SqrtX2");
		/*
		if(this.result != null)
		{
			this.number1 = this.result;
			this.result = null;
		}
		
		this.methodNow = "sqrt";
		
		this.numberNow = 2;
		this.number2 = "2";
		
		this.btnPressResult();*/
		this.result = Math.pow(this["number" + this.numberNow],1/2);

		this.curHist += "sqrt_2" + " " + this["number" + this.numberNow] +  " = " + this.result + "\n";

		this["number" + this.numberNow] = ""+this.result;
		if(isNaN(this.result) || this.result == Infinity || Math.abs(this.result)>999999999999 || Math.abs(this.result)<0.0000000001){
			this.isEnd = true;
		}
		this.updateInput();
	}
	
	btnPressPowerX2()
	{
		this.checkRules();

		this._btnAnimation("PowerX2");
		/*
		if(this.result != null)
		{
			this.number1 = this.result;
			this.result = null;
		}
		
		this.methodNow = "power";
		
		this.numberNow = 2;
		this.number2 = "2";
		
		this.btnPressResult();*/

		this.result = Math.pow(this["number" + this.numberNow],2);

		this.curHist += "pow_2" + " " + this["number" + this.numberNow] +  " = " + this.result + "\n";

		this["number" + this.numberNow] = ""+this.result;
		if(isNaN(this.result) || this.result == Infinity || Math.abs(this.result)>999999999999 || Math.abs(this.result)<0.0000000001){
			this.isEnd = true;
		}
		this.updateInput();
	}
	
	btnPressPowerXm1()
	{
		this.checkRules();

		this._btnAnimation("PowerX-1");
		/*
		if(this.result != null)
		{
			this.number1 = this.result;
			this.result = null;
		}
		
		this.methodNow = "power";
		
		this.numberNow = 2;
		this.number2 = "-1";
		
		this.btnPressResult();*/

		this.result = Math.pow(this["number" + this.numberNow],-1);

		this.curHist += "pow_-1" + " " + this["number" + this.numberNow] +  " = " + this.result + "\n";

		this["number" + this.numberNow] = ""+this.result;
		if(isNaN(this.result) || this.result == Infinity || Math.abs(this.result)>999999999999 || Math.abs(this.result)<0.0000000001){
			this.isEnd = true;
		}
		this.updateInput();
	}
	
	btnPressSqrtX3()
	{
		this.checkRules();

		this._btnAnimation("SqrtX3");
		/*
		if(this.result != null)
		{
			this.number1 = this.result;
			this.result = null;
		}
		
		this.methodNow = "sqrt";
		
		this.numberNow = 2;
		this.number2 = "3";
		
		this.btnPressResult();*/

		this.result = Math.pow(this["number" + this.numberNow],1/3);

		this.curHist += "sqrt_3" + " " + this["number" + this.numberNow] +  " = " + this.result + "\n";

		this["number" + this.numberNow] = ""+this.result;
		if(isNaN(this.result) || this.result == Infinity || Math.abs(this.result)>999999999999 || Math.abs(this.result)<0.0000000001){
			this.isEnd = true;
		}
		this.updateInput();
	}
	
	btnPressSin()
	{
		this.checkRules();

		this._btnAnimation("Sin");
		
		/*
		if(this.result != null)
		{
			this.number1 = this.result;
			this.result = null;
		}
		
		this.methodNow = "sin";
		
		this.numberNow = 2;
		this.number2 = "0";
		
		this.btnPressResult();*/
		this.result = Math.sin(this["number" + this.numberNow]*Math.PI/180);

		this.curHist += "sin" + " " + this["number" + this.numberNow] +  " = " + this.result + "\n";

		this["number" + this.numberNow] = ""+this.result;
		if(isNaN(this.result) || this.result == Infinity || Math.abs(this.result)>999999999999 || Math.abs(this.result)<0.0000000001){
			this.isEnd = true;
		}
		this.updateInput();
	}
	
	btnPressCos()
	{
		this.checkRules();

		this._btnAnimation("Cos");
		/*
		if(this.result != null)
		{
			this.number1 = this.result;
			this.result = null;
		}
		
		this.methodNow = "cos";
		
		this.numberNow = 2;
		this.number2 = "0";
		
		this.btnPressResult();*/
		this.result = Math.cos(this["number" + this.numberNow]*Math.PI/180);

		this.curHist += "cos" + " " + this["number" + this.numberNow] +  " = " + this.result + "\n";

		this["number" + this.numberNow] = ""+this.result;
		if(isNaN(this.result) || this.result == Infinity || Math.abs(this.result)>999999999999 || Math.abs(this.result)<0.0000000001){
			this.isEnd = true;
		}
		this.updateInput();
	}
	
	btnPressTg()
	{
		this.checkRules();

		this._btnAnimation("Tg");
		/*
		if(this.result != null)
		{
			this.number1 = this.result;
			this.result = null;
		}
		
		this.methodNow = "tan";
		
		this.numberNow = 2;
		this.number2 = "0";
		
		this.btnPressResult();*/
		this.result = Math.tan(this["number" + this.numberNow]*Math.PI/180);

		this.curHist += "tg" + " " + this["number" + this.numberNow] +  " = " + this.result + "\n";

		this["number" + this.numberNow] = ""+this.result;
		if(isNaN(this.result) || this.result == Infinity || Math.abs(this.result)>999999999999 || Math.abs(this.result)<0.0000000001){
			this.isEnd = true;
		}
		this.updateInput();
	}
	
	btnPressCtg()
	{
		this.checkRules();

		this._btnAnimation("Ctg");
		/*
		if(this.result != null)
		{
			this.number1 = this.result;
			this.result = null;
		}
		
		this.methodNow = "ctan";
		
		this.numberNow = 2;
		this.number2 = "0";
		
		this.btnPressResult();*/
		this.result = Math.ctan(this["number" + this.numberNow]*Math.PI/180);

		this.curHist += "ctg" + " " + this["number" + this.numberNow] +  " = " + this.result + "\n";

		this["number" + this.numberNow] = ""+this.result;
		if(isNaN(this.result) || this.result == Infinity || Math.abs(this.result)>999999999999 || Math.abs(this.result)<0.0000000001){
			this.isEnd = true;
		}
		this.updateInput();
	}
	
	btnPressArcsin()
	{
		this.checkRules();

		this._btnAnimation("Arcsin");
		/*
		if(this.result != null)
		{
			this.number1 = this.result;
			this.result = null;
		}
		
		this.methodNow = "asin";
		
		this.numberNow = 2;
		this.number2 = "0";
		
		this.btnPressResult();*/
		this.result = Math.asin(this["number" + this.numberNow]*Math.PI/180);

		this.curHist += "arcsin" + " " + this["number" + this.numberNow] +  " = " + this.result + "\n";

		this["number" + this.numberNow] = ""+this.result;
		if(isNaN(this.result) || this.result == Infinity || Math.abs(this.result)>999999999999 || Math.abs(this.result)<0.0000000001){
			this.isEnd = true;
		}
		this.updateInput();
	}
	
	btnPressArccos()
	{
		this.checkRules();

		this._btnAnimation("Arccos");
		/*
		if(this.result != null)
		{
			this.number1 = this.result;
			this.result = null;
		}
		
		this.methodNow = "acos";
		
		this.numberNow = 2;
		this.number2 = "0";
		
		this.btnPressResult();*/

		this.result = Math.acos(this["number" + this.numberNow]*Math.PI/180);

		this.curHist += "arccos" + " " + this["number" + this.numberNow] +  " = " + this.result + "\n";

		this["number" + this.numberNow] = ""+this.result;
		if(isNaN(this.result) || this.result == Infinity || Math.abs(this.result)>999999999999 || Math.abs(this.result)<0.0000000001){
			this.isEnd = true;
		}
		this.updateInput();
	}
	
	btnPressArctg()
	{
		this.checkRules();

		this._btnAnimation("Arctg");
		/*
		if(this.result != null)
		{
			this.number1 = this.result;
			this.result = null;
		}
		
		this.methodNow = "atan";
		
		this.numberNow = 2;
		this.number2 = "0";
		
		this.btnPressResult();*/

		this.result = Math.atan(this["number" + this.numberNow]*Math.PI/180);

		this.curHist += "arctg" + " " + this["number" + this.numberNow] +  " = " + this.result + "\n";

		this["number" + this.numberNow] = ""+this.result;
		if(isNaN(this.result) || this.result == Infinity || Math.abs(this.result)>999999999999 || Math.abs(this.result)<0.0000000001){
			this.isEnd = true;
		}
		this.updateInput();
	}
	
	btnPressArcctg()
	{
		this.checkRules();

		this._btnAnimation("Arcctg");
		/*
		if(this.result != null)
		{
			this.number1 = this.result;
			this.result = null;
		}
		
		this.methodNow = "actan";
		
		this.numberNow = 2;
		this.number2 = "0";
		
		this.btnPressResult();*/

		this.result = Math.actan(this["number" + this.numberNow]*Math.PI/180);

		this.curHist += "arcctg" + " " + this["number" + this.numberNow] +  " = " + this.result + "\n";

		this["number" + this.numberNow] = ""+this.result;
		if(isNaN(this.result) || this.result == Infinity || Math.abs(this.result)>999999999999 || Math.abs(this.result)<0.0000000001){
			this.isEnd = true;
		}
		this.updateInput();
	}
	
	btnPressResult(mode)
	{
		if(this.number1.length == 0 || this.number2.length == 0 || this.methodNow == null)
			return console.log("Нет нужных элементов для решения");
		
		let tmpRes;

		/*if(this.curHist == ""){
			this.curHist = this.number1;
		}*/
		
		switch(this.methodNow)
		{
			case "-":
			case "+":
			case "*":
			case "/":
				tmpRes = eval(`${this.number1} ${this.methodNow} ${this.number2}`);
				/*
				if(!isNaN(tmpRes))
					this.result = tmpRes.toFixed(2);
				else*/

				/*
				if(this.histN2=="") this.histN2 = this.number2;
				this.curHist += " " + this.methodNow + " " + this.histN2;*/



				this.result = tmpRes;
			break;
			
			case "mod":
				this.result = this.number1 % this.number2;
			break;
			
			case "div":
				this.result = parseInt(this.number1 / this.number2);
			break;
			
			case "sin":
			case "cos":
			case "tan":
			case "ctan":
			case "asin":
			case "acos":
			case "atan":
			case "actan":
				tmpRes = Math[this.methodNow](this["number" + this.numberNow]*Math.PI/180);
				/*
				if(!isNaN(tmpRes))
					this.result = tmpRes.toFixed(2);
				else*/
				this.result = tmpRes;
			break;
			
			case "sqrt":
				tmpRes = Math.pow(this.number1,1/this.number2);
				
				/*if(!isNaN(tmpRes))
					this.result = tmpRes.toFixed(2);
				else*/
				this.result = tmpRes;
			break;
			
			case "power":
				tmpRes = Math.pow(this.number1,this.number2);
				/*
				if(!isNaN(tmpRes))
					this.result = tmpRes.toFixed(2);
				else*/
				this.result = tmpRes;
			break;
		}

		this.curHist += (this.notation=="DEC"?"":"(hex) ") + this.convNotation(this.number1) + " " + this.methodNow + " " + this.convNotation(this.number2) +  " = " + this.convNotation(this.result.toString()) + "\n";
		/*this.histN2 = "";
		if(mode!="clear"){
			this.curHist += " = " + this.result;
		}*/

		if(isNaN(this.result) || this.result == Infinity || Math.abs(this.result)>999999999999 || Math.abs(this.result)<0.0000000001){
			this.isEnd = true;
		}

		this.numberNow = 1;
		this.number2 = "0";
		this.methodNow = null;

		this.updateHisory();

		if(mode=="clear" && !this.isEnd){
			//this.updateMemAction("noClear");
		}else{
			this.updateInput();
		}
	}

	UnaryResult(){
			
	}

	btnPressMemory(){
		if(this.memNum == ""){
			//this["number" + this.numberNow] = "0";
			return;
		}
		else{
			this["number" + this.numberNow] = this.memNum;
		}
		
		this.updateInput();
	}

	btnPressMemoryPlus(){
		this.memNum = this["number" + this.numberNow];
		this.updateMemNum();
	}

	btnPressMemoryMinus(){
		this.memNum = "";
		this.updateMemNum();
	}

	btnPressLet(_let){
		this.checkRules();

		if(this["number" + this.numberNow].length - (this["number"+this.numberNow].indexOf(".")==-1?0:1) < this.maxLen)
		{
			if(true)
			{ 
				this._btnAnimation(_let);
				
				if(this.notation=="DEC"){
					return;
				}else{
					this.hexInput = this.toHex(this["number" + this.numberNow]);
					if(this.hexInput=="0"){
						this.hexInput = "" + _let;
					}else{
						this.hexInput = this.hexInput + "" + _let;
					}
					this["number" + this.numberNow] = this.toDec(this.hexInput);
				}
				
				this.updateInput();
			}
			else
			{
				console.error("Func name: btnPressNum\n\nError: var num - is not number");
			}
		}
		else
		{
			console.info(`Func name: btnPressNum\n\nInfo: var number${this.numberNow} - length more than ${this.maxLen}`);
		}
	}

	btnPressTranslate(){
		if(this.notation=="DEC"){
			this.notation="HEX";
			if(!this.isHexMethodNow()){
				this.number1 = this["number" + this.numberNow];
				this.numberNow = 1;
				this.number2 = "0";
				this.methodNow = null;
				this.result = null;

				this.updateMemNum();
				this.updateInput();
			}
			this.number1 = this.normalFloor(this.number1);
			this.number2 = this.normalFloor(this.number2);
			this.memNum = this.normalFloor(this.memNum);
			if(this.result!=null) this.result = this.normalFloor(this.result);

		}else{
			this.notation="DEC";
			this.number1 = this.normalFloor(this.number1);
			this.number2 = this.normalFloor(this.number2);
			this.memNum = this.normalFloor(this.memNum);
			if(this.result!=null) this.result = this.normalFloor(this.result);
		}
		this.updateNotation();
		this.updateInput();
		this.updateMemNum();
	}

	showHistory(){
		$("#histDiv").css("height",window.innerHeight - $("#header")[0].clientHeight);
		if(this.curHist!=""){
			this.updateHisory();
			$("#histDiv").toggle(0);
			$("#histDiv p").toggle(0);
		}
		console.log(this.curHist);
	}

	updateHisory(){
		$("#histDiv p")[0].innerText = this.curHist;
	}

	isHexMethodNow(){
		return this.methodNow=="+"||this.methodNow=="-"||this.methodNow=="*"||this.methodNow=="/";
	}

	convNotation(strNum){
		return this.notation=="DEC"?strNum:this.toHex(strNum);
	}

	convExp(strNum){
		let tmp;
		if(Math.abs(+strNum)>999999999999 || Math.abs(+strNum)<0.0000000001){
			tmp = (+strNum).toExponential();
		}else{
			tmp = this.noExp(+strNum);
			if(tmp.indexOf(".")>=0){
				tmp = this.roundNum(tmp);
			}
		}
		return tmp;
	}

	toHex(strNum){
		if(strNum==""){
			return "";
		}else{
			strNum=this.normalFloor(strNum);
			return (+strNum).toString(16).toUpperCase();
		}
	}

	toDec(strNum){
		if(strNum==""){
			return "";
		}else{
			return parseInt(strNum,16).toString();
		}	    
	}

	normalFloor(strNum){
		if(strNum==""){
			return "";
		}else{
			return (+strNum)>=0?(Math.floor(+strNum)).toString():(Math.ceil(+strNum)).toString();
		}
	}

	noExp(num){
		if(Math.abs(num)<1){
			if(num.toString().indexOf("e")>=0){
				if(num>=0){
					return "0"+(num+1).toString().substr(1);
				}else{
					return "-0"+(num-1).toString().substr(2);
				}
			}
		}
		return ""+num;
	}

	roundNum(numStr){
		let n1=0;
		let n2=0;
		let f=false

		for(let i=0;i<numStr.length;i++){
			if(numStr[i]=="-")continue;
			if(numStr[i]=="."){
				f=true;
			}else if(!f){
				n1++;
			}else{
				n2++;
			}
		}

		if(f==false || n1+n2<=this.maxLen){
			return "" + numStr;
		}else{
			return this.noExp((+numStr).toFixed(this.maxLen-n1)).replace(/0*$/,"");
		}
	}
}

let Calc = new CalcLogic();

$( document ).keydown((e)=>{
	
	switch(e.key)
	{
		case "0":
		case "1":
		case "2":
		case "3":
		case "4":
		case "5":
		case "6":
		case "7":
		case "8":
		case "9":
			Calc.btnPressNum(e.key);
		break;
		
		case ".":
		case ",":
			Calc.btnPressDot();
		break;
		
		case "Backspace":
			Calc.btnPressBackspace();
		break;
		
		case "+":
			Calc.btnPressPlus();
		break;
		
		case "-":
			Calc.btnPressMinus();
		break;
		
		case "*":
			Calc.btnPressStar();
		break;
		
		case "/":
			Calc.btnPressSlash();
		break;
		
		case "=":
		case "Enter":
			Calc.btnPressResult();
			Calc._btnAnimation("Result");
		break;

		case "Escape":
			Calc.btnPressClean();
			Calc._btnAnimation("Clean");
		break;

		case "Delete":
			Calc.btnPressCleanEntry();
		break;

		case "A":
		case "a":
		case "Ф":
		case "ф":
			Calc.btnPressLet("A");
		break;

		case "B":
		case "b":
		case "И":
		case "и":
			Calc.btnPressLet("B");
		break;

		case "C":
		case "c":
		case "С":
		case "с":
			Calc.btnPressLet("C");
		break;

		case "D":
		case "d":
		case "В":
		case "в":
			Calc.btnPressLet("D");
		break;

		case "E":
		case "e":
		case "У":
		case "у":
			Calc.btnPressLet("E");
		break;

		case "F":
		case "f":
		case "А":
		case "а":
			Calc.btnPressLet("F");
		break;

		default:
			console.log(e.key);
		break;
		
	}
	
});

$(".btnNum").click((e)=>{
	let num = e.currentTarget.dataset.num;
	Calc.btnPressNum(num);
});

$("#btnComma").click((e)=>{
	if($("#btnComma").hasClass("disabled"))return;
	Calc.btnPressDot();
});

$("#btnBackspace").click((e)=>{
	Calc.btnPressBackspace();
});

$("#btnSign").click((e)=>{
	Calc.btnPressSwapSign();
});

$("#btnSlash").click((e)=>{
	Calc.btnPressSlash();
});

$("#btnStar").click((e)=>{
	Calc.btnPressStar();
});

$("#btnMinus").click((e)=>{
	Calc.btnPressMinus();
});

$("#btnPlus").click((e)=>{
	Calc.btnPressPlus();
});

$("#btnResult").click((e)=>{
	Calc.btnPressResult();
});

$("#btnClean").click((e)=>{
	Calc.btnPressClean();
});

$("#btnCleanEntry").click((e)=>{
	Calc.btnPressCleanEntry();
});

$("#btnSqrtXY").click((e)=>{
	if($("#btnSqrtXY").hasClass("disabled"))return;
	Calc.btnPressSqrtXY();
});

$("#btnSqrtX2").click((e)=>{
	if($("#btnSqrtX2").hasClass("disabled"))return;
	Calc.btnPressSqrtX2();
});

$("#btnSqrtX3").click((e)=>{
	if($("#btnSqrtX3").hasClass("disabled"))return;
	Calc.btnPressSqrtX3();
});

$("#btnArcsin").click((e)=>{
	if($("#btnArcsin").hasClass("disabled"))return;
	Calc.btnPressArcsin();
});

$("#btnArccos").click((e)=>{
	if($("#btnArccos").hasClass("disabled"))return;
	Calc.btnPressArccos();
});

$("#btnArctg").click((e)=>{
	if($("#btnArctg").hasClass("disabled"))return;
	Calc.btnPressArctg();
});

$("#btnArcctg").click((e)=>{
	if($("#btnArcctg").hasClass("disabled"))return;
	Calc.btnPressArcctg();
});

$("#btnSin").click((e)=>{
	if($("#btnSin").hasClass("disabled"))return;
	Calc.btnPressSin();
});

$("#btnCos").click((e)=>{
	if($("#btnCos").hasClass("disabled"))return;
	Calc.btnPressCos();
});

$("#btnTg").click((e)=>{
	if($("#btnTg").hasClass("disabled"))return;
	Calc.btnPressTg();
});

$("#btnCtg").click((e)=>{
	if($("#btnCtg").hasClass("disabled"))return;
	Calc.btnPressCtg();
});

$("#btnDiv").click((e)=>{
	if($("#btnDiv").hasClass("disabled"))return;
	Calc.btnPressDiv();
});

$("#btnMod").click((e)=>{
	if($("#btnMod").hasClass("disabled"))return;
	Calc.btnPressMod();
});

$("#btnPowerXY").click((e)=>{
	if($("#btnPowerXY").hasClass("disabled"))return;
	Calc.btnPressPowerXY();
});

$("#btnPowerX2").click((e)=>{
	if($("#btnPowerX2").hasClass("disabled"))return;
	Calc.btnPressPowerX2();
});

$("#btnPowerX-1").click((e)=>{
	if($("#btnPowerX-1").hasClass("disabled"))return;
	Calc.btnPressPowerXm1();
});

$("#btnMemory").click((e)=>{
	Calc.btnPressMemory();
});

$("#btnMemoryPlus").click((e)=>{
	Calc.btnPressMemoryPlus();
});

$("#btnMemoryMinus").click((e)=>{
	Calc.btnPressMemoryMinus();
});

$(".btnLet").click((e)=>{
	if($(".btnLet").hasClass("disabled"))return;
	let _let = e.currentTarget.dataset.let;
	Calc.btnPressLet(_let);
});

$("#btnTranslate").click((e)=>{
	Calc.btnPressTranslate();
});

$("#btnHistory").click((e)=>{
	Calc.showHistory();
});



