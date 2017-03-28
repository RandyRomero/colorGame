var userMessage = document.querySelector('#userMessage p')
var header = document.querySelector('header'); /* header */
var restart = document.querySelector('#btn-1'); /* new colors */
var mode = document.querySelector('#btn-2'); /* easy or hard more */
var secondSqrRow = document.querySelector('main .container:nth-of-type(2)');
var hardMode = true;


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
	if(hardMode === true) {
		mode.textContent = 'easy';
		secondSqrRow.style.display = 'none';
		hardMode = false;
	} else {
		mode.textContent = 'hard';
		secondSqrRow.style.removeProperty('display');
		hardMode = true;
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

function ifLoose(){
	userMessage.style.removeProperty('color');
	userMessage.textContent = 'Try Again';
	userMessage.style.display = 'block';
	/* this is sqrList[i]; make  square which was clicked to disappear */
	this.style.backgroundColor = 'transparent';
}

/* paint all squares, header and user message to right color */
function ifWin() {
	userMessage.style.display = 'block'; /* make it visible */
	userMessage.style.color = rightColorString;
	userMessage.textContent = 'Correct!';
	mode.style.color = rightColorString;
	restart.style.color = rightColorString;
	restart.textContent = 'Play Again?';

	header.style.backgroundColor = rightColorString;
	
	for(var i = 0; i < sqrList.length; i++) {
		sqrList[i].style.backgroundColor = rightColorString;
	};

	/* stop show 'try again' when user has already given the right answer */
	for(var i = 0; i < sqrList.length; i++) {
		sqrList[i].removeEventListener('click', ifLoose);
	}

}

/* set new colors for squares */
restart.addEventListener('click', function() {
	userMessage.style.display = 'none'; /* make it vanish */ 
	header.style.removeProperty('background-color');
	mode.style.removeProperty('color');
	restart.style.removeProperty('color');
	restart.textContent = 'New Colors';

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

	/* set eventListener to show userMessage 'try again' if user makes mistake' */
	for(var i = 0; i < sqrList.length; i++) {
		if(i === randomSquareNum) {
			continue
		}
		sqrList[i].addEventListener('click', ifLoose)
	}

	/* set eventListener only for one square with right color */
	sqrList[randomSquareNum].addEventListener('click', ifWin);
	console.log(sqrList[randomSquareNum])
});