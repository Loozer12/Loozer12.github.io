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

		if(this.notation == "HEX")
			viewNum = "neDopilil";

		this["number" + this.numberNow] = "" + viewNum;
		$("#window").val(viewNum);
	}

	updateMemAction(mode){
		if(this.methodNow == null && mode!="noClear"){
			$("#memAction")[0].innerText = "";
		}else{
			$("#memAction")[0].innerText = this.roundNum((+this.number1).toString()) + " " + this.methodNow;
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
			if(!isNaN(Number(num)))
			{
				let number = Number(num);
				this._btnAnimation(number);
				
				if(this["number" + this.numberNow]==0 && this["number" + this.numberNow].toString().indexOf(".")==-1){
					this["number" + this.numberNow] = "" +  number;
				}else{
					this["number" + this.numberNow] = this["number" + this.numberNow] + "" + number;
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
	
		this["number" + this.numberNow] = str.substr(0, str.length - 1);
		
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


		if(isNaN(this.result) || this.result == Infinity || Math.abs(this.result)>999999999999 || Math.abs(this.result)<0.0000000001){
			this.isEnd = true;
		}

		this.numberNow = 1;
		this.number2 = "0";
		this.methodNow = null;

		if(mode=="clear" && !this.isEnd){
			//this.updateMemAction("noClear");
		}else{
			this.updateInput();
		}
	}

	UnaryResult(){
			
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
			Calc.btnPressResult();
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
	Calc.btnPressSqrtXY();
});

$("#btnSqrtX2").click((e)=>{
	Calc.btnPressSqrtX2();
});

$("#btnSqrtX3").click((e)=>{
	Calc.btnPressSqrtX3();
});

$("#btnArcsin").click((e)=>{
	Calc.btnPressArcsin();
});

$("#btnArccos").click((e)=>{
	Calc.btnPressArccos();
});

$("#btnArctg").click((e)=>{
	Calc.btnPressArctg();
});

$("#btnArcctg").click((e)=>{
	Calc.btnPressArcctg();
});

$("#btnSin").click((e)=>{
	Calc.btnPressSin();
});

$("#btnCos").click((e)=>{
	Calc.btnPressCos();
});

$("#btnTg").click((e)=>{
	Calc.btnPressTg();
});

$("#btnCtg").click((e)=>{
	Calc.btnPressCtg();
});

$("#btnDiv").click((e)=>{
	Calc.btnPressDiv();
});

$("#btnMod").click((e)=>{
	Calc.btnPressMod();
});

$("#btnPowerXY").click((e)=>{
	Calc.btnPressPowerXY();
});

$("#btnPowerX2").click((e)=>{
	Calc.btnPressPowerX2();
});

$("#btnPowerX-1").click((e)=>{
	Calc.btnPressPowerXm1();
});


