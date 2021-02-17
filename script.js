class CalcLogic {
	numberNow = 1;
	numberSignNow = "+";
	number1 = "";
	number2 = "";
	methodNow = null;
	result = null;
	notation = "DEC";
	
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
		
		if(this.result == null)
		{
			viewNum = this["number" + this.numberNow];
		}
		else
		{
			viewNum = this.result;
		}
		
		if(this.notation == "HEX")
			viewNum = "neDopilil";
			
		$("#window").val(viewNum);
	}
	
	_btnAnimation(name)
	{
		$(`#btn${name}`).css('background-color','#797979');
		setTimeout(()=>{
			$(`#btn${name}`).css('background-color','');
		},100);
	}

	btnPressNum(num) {
		
		if(this["number" + this.numberNow].length < 12)
		{
			if(!isNaN(Number(num)))
			{
				let number = Number(num);
				this._btnAnimation(number);
				
				this["number" + this.numberNow] = this["number" + this.numberNow] + "" + number;
				
				this.updateInput();
			}
			else
			{
				console.error("Func name: btnPressNum\n\nError: var num - is not number");
			}
		}
		else
		{
			console.error(`Func name: btnPressNum\n\nError: var number${this.numberNow} - length more than 12`);
		}		
	}
	
	btnPressBackspace()
	{
		this._btnAnimation("Backspace");
		
		if(this.result == null)
		{
			let str = this["number" + this.numberNow] + "";
		
			this["number" + this.numberNow] = str.substr(0, str.length - 1);
			
			this.updateInput();
		}
		else
		{
			this.btnPressClear();
		}
	}
	
	btnPressCleanEntry()
	{
		this._btnAnimation("CleanEntry");
		
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
		}
	}
	
	btnPressClean()
	{
		this.numberNow = 1;
		this.numberSignNow = "+";
		this.number1 = "";
		this.number2 = "";
		this.methodNow = null;
		this.result = null;
		
		this.updateInput();
	}
	
	btnPressDot()
	{
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
		if(this["number" + this.numberNow].length == 0)
			return console.log("Нет числа");
		
		this._btnAnimation("Sign");
		
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
		this._btnAnimation("Plus");
		
		if(this.result != null)
		{
			this.number1 = this.result;
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
		this._btnAnimation("Minus");
		
		if(this.result != null)
		{
			this.number1 = this.result;
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
		this._btnAnimation("Star");
		
		if(this.result != null)
		{
			this.number1 = this.result;
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
		this._btnAnimation("Slash");
		
		if(this.result != null)
		{
			this.number1 = this.result;
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
		this._btnAnimation("Div");
		
		if(this.result != null)
		{
			this.number1 = this.result;
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
		this._btnAnimation("Mod");
		
		if(this.result != null)
		{
			this.number1 = this.result;
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
		this._btnAnimation("SqrtXY");
		
		if(this.result != null)
		{
			this.number1 = this.result;
			this.number2 = "";
			this.result = null;
		}
		
		this.methodNow = "newSqrt";
		
		this.numberNow = 2;
		
		setTimeout(()=>{
			this.updateInput();
		},100);
	}
	
	btnPressPowerXY()
	{
		this._btnAnimation("PowerXY");
		
		if(this.result != null)
		{
			this.number1 = this.result;
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
		this._btnAnimation("SqrtX2");
		
		if(this.result != null)
		{
			this.number1 = this.result;
			this.result = null;
		}
		
		this.methodNow = "newSqrt";
		
		this.numberNow = 2;
		this.number2 = "2";
		
		this.btnPressResult();
	}
	
	btnPressPowerX2()
	{
		this._btnAnimation("PowerX2");
		
		if(this.result != null)
		{
			this.number1 = this.result;
			this.result = null;
		}
		
		this.methodNow = "power";
		
		this.numberNow = 2;
		this.number2 = "2";
		
		this.btnPressResult();
	}
	
	btnPressPowerX1()
	{
		this._btnAnimation("PowerX-1");
		
		if(this.result != null)
		{
			this.number1 = this.result;
			this.result = null;
		}
		
		this.methodNow = "power";
		
		this.numberNow = 2;
		this.number2 = "-1";
		
		this.btnPressResult();
	}
	
	btnPressSqrtX3()
	{
		this._btnAnimation("SqrtX3");
		
		if(this.result != null)
		{
			this.number1 = this.result;
			this.result = null;
		}
		
		this.methodNow = "newSqrt";
		
		this.numberNow = 2;
		this.number2 = "3";
		
		this.btnPressResult();
	}
	
	btnPressSin()
	{
		this._btnAnimation("Sin");
		
		if(this.result != null)
		{
			this.number1 = this.result;
			this.result = null;
		}
		
		this.methodNow = "sin";
		
		this.numberNow = 2;
		this.number2 = "0";
		
		this.btnPressResult();
	}
	
	btnPressCos()
	{
		this._btnAnimation("Cos");
		
		if(this.result != null)
		{
			this.number1 = this.result;
			this.result = null;
		}
		
		this.methodNow = "cos";
		
		this.numberNow = 2;
		this.number2 = "0";
		
		this.btnPressResult();
	}
	
	btnPressTg()
	{
		this._btnAnimation("Tg");
		
		if(this.result != null)
		{
			this.number1 = this.result;
			this.result = null;
		}
		
		this.methodNow = "tan";
		
		this.numberNow = 2;
		this.number2 = "0";
		
		this.btnPressResult();
	}
	
	btnPressCtg()
	{
		this._btnAnimation("Ctg");
		
		if(this.result != null)
		{
			this.number1 = this.result;
			this.result = null;
		}
		
		this.methodNow = "ctan";
		
		this.numberNow = 2;
		this.number2 = "0";
		
		this.btnPressResult();
	}
	
	btnPressArcsin()
	{
		this._btnAnimation("Arcsin");
		
		if(this.result != null)
		{
			this.number1 = this.result;
			this.result = null;
		}
		
		this.methodNow = "asin";
		
		this.numberNow = 2;
		this.number2 = "0";
		
		this.btnPressResult();
	}
	
	btnPressArccos()
	{
		this._btnAnimation("Arccos");
		
		if(this.result != null)
		{
			this.number1 = this.result;
			this.result = null;
		}
		
		this.methodNow = "acos";
		
		this.numberNow = 2;
		this.number2 = "0";
		
		this.btnPressResult();
	}
	
	btnPressArctg()
	{
		this._btnAnimation("Arctg");
		
		if(this.result != null)
		{
			this.number1 = this.result;
			this.result = null;
		}
		
		this.methodNow = "atan";
		
		this.numberNow = 2;
		this.number2 = "0";
		
		this.btnPressResult();
	}
	
	btnPressArcctg()
	{
		this._btnAnimation("Arcctg");
		
		if(this.result != null)
		{
			this.number1 = this.result;
			this.result = null;
		}
		
		this.methodNow = "actan";
		
		this.numberNow = 2;
		this.number2 = "0";
		
		this.btnPressResult();
	}
	
	btnPressResult()
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
				
				if(!isNaN(tmpRes))
					this.result = tmpRes.toFixed(2);
				else
					this.result = tmpRes;
				
				this.updateInput();
			break;
			
			case "mod":
				this.result = this.number1 % this.number2;
				
				this.updateInput();
			break;
			
			case "div":
				this.result = parseInt(this.number1 / this.number2);
				
				this.updateInput();
			break;
			
			case "sin":
			case "cos":
			case "tan":
			case "ctan":
			case "asin":
			case "acos":
			case "atan":
			case "actan":
				tmpRes = Math[this.methodNow](this.number1);
				
				if(!isNaN(tmpRes))
					this.result = tmpRes.toFixed(2);
				else
					this.result = tmpRes;
				
				this.updateInput();
			break;
			
			case "newSqrt":
				tmpRes = this.sqrt(this.number1,this.number2);
				
				if(!isNaN(tmpRes))
					this.result = tmpRes.toFixed(2);
				else
					this.result = tmpRes;
				
				this.updateInput();
			break;
			
			case "power":
				tmpRes = Math.pow(this.number1,this.number2);
				
				if(!isNaN(tmpRes))
					this.result = tmpRes.toFixed(2);
				else
					this.result = tmpRes;
				
				this.updateInput();
			break;
			
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
	Calc.btnPressPowerX1();
});


