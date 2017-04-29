var userMessage = document.querySelector('.userMessage p:first-of-type')
var header = document.querySelector('header'); /* header */
var newGame = document.querySelector('#btn-1'); /* new colors */
var mode = document.querySelector('#btn-2'); /* easy or hard more */
var secondSqrRow = document.querySelector('main .container:nth-of-type(2)');
var hardMode = true;
var youScoreString = document.querySelector('.userMessage p:nth-of-type(2)')
var youScoreNum = document.querySelector('.userMessage p span')
var score = 0;
var win = false; /* it is needed to check whether user guessed or not previous colors. if not - set score to zero */
var navButtons = document.querySelectorAll('nav button') /* to play sound on click */
var howTo = document.querySelector('.userMessage:nth-of-type(2) p')


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

function resetScore() { /* reset score when user changes mode */
	score = 0;
	youScoreNum.textContent = score;
	restart();
}

/* change 'easy' mode to 'hard' and back */
mode.addEventListener('click', function() {
	if(hardMode === true) {
		mode.textContent = 'easy';
		secondSqrRow.style.display = 'none';
		hardMode = false;
		resetScore();
	} else {
		mode.textContent = 'hard';
		secondSqrRow.style.removeProperty('display');
		hardMode = true;
		resetScore();
	}
});

/* show alert that explains to user how to play */
howTo.addEventListener('click', function() {
	alert('The RGB color model is an additive color model in which RED, GREEN and BLUE light are added together in various ways to reproduce a broad array of colors. There is random color in header of this page which you need to guess and choose among all squares. Only one of them represents color which is in the header.')
});

function setPointer() {
	this.style.cursor = 'pointer';
}

/* to play specific sound when user chooses right square */
function playWinSound() {
	document.querySelector('#winSound').play();
}

/* to play specific sound when user chooses wrong square */
function playLostSound() {
	document.querySelector('#lostSound').play();
	/* remove it right after first play */
	this.removeEventListener('click', playLostSound);
}

/* play sound for nav buttons */
for (i = 0; i < navButtons.length; i++) {
	navButtons[i].addEventListener('click', function() {
		document.querySelector('#sandSound').play();
	});
}

/* get three random numbers from 0 to 255 */
function getRandomColor() {
	var randomColor = [];
	for(var i = 0; i <= 2; i++) {
		randomColor.push(Math.floor(Math.random() * 256));
	};
	return randomColor
}

/* paint all squares in different colors */
function paintSquares(randomSquareNum) {
	for(var i = 0; i < sqrList.length; i++) {
		var randomColor = getRandomColor();
		var stringColor = 'rgb(' + randomColor[0] + ', ' + randomColor[1] + ', ' + randomColor[2] + ')'
		sqrList[i].style.backgroundColor = stringColor;
	}
	sqrList[randomSquareNum].style.backgroundColor = rightColorString;
}

function stopGame() {
	/* reset all addEventListeners from squares */
	for(var i = 0; i < sqrList.length; i++) {
		sqrList[i].removeEventListener('click', ifWin);
		sqrList[i].removeEventListener('click', ifLoose);
		sqrList[i].removeEventListener('click', playLostSound);
		sqrList[i].removeEventListener('click', playWinSound);
		sqrList[i].removeEventListener('mouseenter', setPointer);
		sqrList[i].style.removeProperty('cursor');
	}
}

function ifLoose(){
	userMessage.style.removeProperty('color');
	userMessage.textContent = 'Try Again';
	/* 'this' is refers to sqrList[i] */
	this.removeEventListener('mouseenter', setPointer);
	this.style.removeProperty('cursor');
	this.style.backgroundColor = 'transparent';
	this.removeEventListener('click', ifLoose);
	score -= 2;
	youScoreNum.textContent = score;
	win = false;
}

/* paint all squares, header and user message to right color */
function ifWin() {
	userMessage.style.color = rightColorString;
	youScoreString.style.color = rightColorString;
	howTo.style.color = rightColorString;
	userMessage.textContent = 'Correct!';
	mode.style.color = rightColorString;
	newGame.style.color = rightColorString;
	newGame.textContent = 'Play Again?';
	win = true;
	header.style.backgroundColor = rightColorString;
	
	for(var i = 0; i < sqrList.length; i++) {
		sqrList[i].style.backgroundColor = rightColorString;
	};

	stopGame();

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
	howTo.style.removeProperty('color');
	newGame.textContent = 'New Colors';

	var rightColor = getRandomColor();
	rightColorString = 'rgb(' + rightColor[0] + ', ' + rightColor[1] + ', ' + rightColor[2] + ')';

	/* put rbg notation of rgb color in header */
	for(var i = 1; i <= 3; i++) { 
		rgbNumHeader[i].textContent = rightColor[i - 1];
	};

	if(hardMode === true){
		var randomSquareNum = Math.floor(Math.random() * 6);
	} else {
		/* if it is easy mode right square should be among first three of them */
		var randomSquareNum = Math.floor(Math.random() * 3);
	}

	paintSquares(randomSquareNum);
	stopGame();

	/* set cursor to pointer when it is above squares */
	for(var i = 0; i < sqrList.length; i++){
		sqrList[i].addEventListener('mouseenter', setPointer)
	}

	/* set eventListener to show userMessage 'try again' and play lostSound when user makes mistake' */
	for(var i = 0; i < sqrList.length; i++) {
		if(i === randomSquareNum) {
			/* skip right square */
			continue
		}
		sqrList[i].addEventListener('click', ifLoose);
		sqrList[i].addEventListener('click', playLostSound);
	}

	/* set eventListener only for one square with right color */
	sqrList[randomSquareNum].addEventListener('click', playWinSound);
	sqrList[randomSquareNum].addEventListener('click', ifWin);
	

	/* reset total score if user pushed new colors before he won */
	if(win === false) {
		score = 0;
		youScoreNum.textContent = score;
	}
	win = false;
};

newGame.addEventListener('click', restart)