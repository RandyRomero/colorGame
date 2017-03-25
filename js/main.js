var userMessage = document.querySelector('#userMessage p')
var header = document.querySelector('header'); /* header */
var restart = document.querySelector('#btn-1'); /* new colors */
var mode = document.querySelector('#btn-2'); /* easy or hard more */
var easyMode = true;


/* define variables for rgb numbers in header */
var rgbNumHeader = [];
for(var i = 1; i <= 3; i++) {
	rgbNumHeader[i] = document.querySelector('header h1 span:nth-of-type(' + 
		i + ')');
}

/* define variables for squares */
var sqrList =[];
for(var i = 0; i <= 5; i++) {
	sqrList[i] = document.querySelector('#sqr-' + (i + 1));
}

/* change 'easy' button to 'hard' and back */
mode.addEventListener('click', function() {
	if(easyMode === true) {
		mode.textContent = 'hard';
		easyMode = false;
	} else {
		mode.textContent = 'easy';
		easyMode = true;
	}
});

/* get three random number from 0 to 255 */
function getRandomColor() {
	var rgbNums = [];
	for(var i = 0; i <= 2; i++) {
		rgbNums[i] = Math.floor(Math.random() * 256);
		// console.log(rgbNums[i])
	};
	var randomColor = [rgbNums[0], rgbNums[1], rgbNums[2]]
	return randomColor
}

/* paints all squares in different colors */
function paintSquares(sqrList, randomSquareNum, rightColor) {
	for(var i = 0; i < sqrList.length; i++) {
		randomColor = getRandomColor();
		stringColor = 'rgb(' + randomColor[0] + ', ' + randomColor[1] + ', ' + randomColor[2] + ')'
		sqrList[i].style.backgroundColor = stringColor;
	}
	// console.log(rightColorString)
	sqrList[randomSquareNum].style.backgroundColor = rightColorString;
}

/* paint all squares, header and user message to right color */
function ifWin() {
	userMessage.style.display = 'block'; /* make it visible */
	userMessage.style.color = rightColorString;
	userMessage.textContent = 'Correct!';

	header.style.backgroundColor = rightColorString;
	for(var i = 0; i < sqrList.length; i++) {
		sqrList[i].style.backgroundColor = rightColorString;
	};		
}

/* set new colors for squares */
restart.addEventListener('click', function() {
	userMessage.style.display = 'none'; /* make it vanish */ 
	header.style.backgroundColor = 'orange';
	rightColor = getRandomColor();
	rightColorString = 'rgb(' + rightColor[0] + ', ' + rightColor[1] + ', ' + rightColor[2] + ')';
	// console.log(rightColorString)

	/* put rbg notation of rgb color in header */
	for(var i = 1; i <= 3; i++) { 
		rgbNumHeader[i].textContent = rightColor[i - 1];
	};
	randomSquareNum = Math.floor(Math.random() * 6);
	// console.log(randomSquareNum)

	paintSquares(sqrList, randomSquareNum, rightColorString);
	
	/* reset eventListener with ifWin function from all squares */
	for(var i = 0; i < sqrList.length; i++) {
		sqrList[i].removeEventListener('click', ifWin);
	}

	/* set eventListener only for one square with right color */
	sqrList[randomSquareNum].addEventListener('click', ifWin);
	console.log(sqrList[randomSquareNum])
});