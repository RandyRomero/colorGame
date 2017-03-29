var userMessage = document.querySelector('#userMessage p:first-of-type')
var header = document.querySelector('header'); /* header */
var newGame = document.querySelector('#btn-1'); /* new colors */
var mode = document.querySelector('#btn-2'); /* easy or hard more */
var secondSqrRow = document.querySelector('main .container:nth-of-type(2)');
var hardMode = true;
var youScoreString = document.querySelector('#userMessage p:nth-of-type(2)')
var youScoreNum = document.querySelector('#userMessage p span')
var score = 0;
var win = false; /* it is needed to check whether user guessed or not previous colors. if not - set score to zero */ 

/* hite user message before it is needed */
// userMessage.style.display = 'none'; 

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
		score = 0;
		youScoreNum.textContent = score;
		restart();
	} else {
		mode.textContent = 'hard';
		secondSqrRow.style.removeProperty('display');
		hardMode = true;
		score = 0;
		youScoreNum.textContent = score;
		restart();
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
	score -= 2;
	youScoreNum.textContent = score;
	win = false;
}

/* paint all squares, header and user message to right color */
function ifWin() {
	userMessage.style.color = rightColorString;
	youScoreString.style.color = rightColorString;
	userMessage.textContent = 'Correct!';
	mode.style.color = rightColorString;
	newGame.style.color = rightColorString;
	newGame.textContent = 'Play Again?';
	win = true;

	header.style.backgroundColor = rightColorString;
	
	for(var i = 0; i < sqrList.length; i++) {
		sqrList[i].style.backgroundColor = rightColorString;
	};

	/* stop show 'try again' when user has already given the right answer */
	for(var i = 0; i < sqrList.length; i++) {
		sqrList[i].removeEventListener('click', ifLoose);
	}
	/* add score */
	score += 6;
	youScoreNum.textContent = score;
}

/* set new colors for squares */
function restart() {
	userMessage.textContent = 'Give it a shot!'; 
	userMessage.style.color = 'rgb(255, 165, 0)';
	youScoreString.style.color = 'rgb(255, 165, 0)';
	header.style.removeProperty('background-color');
	mode.style.removeProperty('color');
	newGame.style.removeProperty('color');
	newGame.textContent = 'New Colors';

	rightColor = getRandomColor();
	rightColorString = 'rgb(' + rightColor[0] + ', ' + rightColor[1] + ', ' + rightColor[2] + ')';
	// console.log(rightColorString)

	/* put rbg notation of rgb color in header */
	for(var i = 1; i <= 3; i++) { 
		rgbNumHeader[i].textContent = rightColor[i - 1];
	};

	if(hardMode === true){
		randomSquareNum = Math.floor(Math.random() * 6);
		// console.log(randomSquareNum);
	} else {
		/* is it is easy mode right square should be among first three of them */
		randomSquareNum = Math.floor(Math.random() * 3);
	}
	
	// console.log(randomSquareNum)

	paintSquares(sqrList, randomSquareNum, rightColorString);
	
	/* reset eventListeners with ifWin & ifLoose function from all squares */
	for(var i = 0; i < sqrList.length; i++) {
		sqrList[i].removeEventListener('click', ifWin);
		sqrList[i].removeEventListener('click', ifLoose);
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

	/* reset total score if user pushed new colors before he won */
	if(win === false) {
		score = 0;
		youScoreNum.textContent = score;
	}
	win = false;
};

newGame.addEventListener('click', restart)