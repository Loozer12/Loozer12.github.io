class CalcLogic {
	numberNow = 1;
	number1 = "";
	number2 = "";
	
	updateInput()
	{
		$("#window").val(this["number" + this.numberNow]);
	}
	
	_btnAnimation(name)
	{
		$(`#btn${name}`).css('background-color','#797979');
		setTimeout(()=>{
			$(`#btn${name}`).css('background-color','');
		},100);
	}

	btnPressNum(num) {
		
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
	
	btnPressBackspace()
	{
		this._btnAnimation("Backspace");
		
		let str = this["number" + this.numberNow] + "";
		
		this["number" + this.numberNow] = str.substr(0, str.length - 1);
		
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