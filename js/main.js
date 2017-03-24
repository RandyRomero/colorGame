console.log('Connected!')

var userMessage = document.querySelector('#userMessage p')
var header = document.querySelector('header'); /* main header */
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
	// console.log(sqrList.length
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

/* get three random number from 0 to 255
   return string for example: rgb(234, 54, 56) */
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
function paintSquares(sqrList) {
	for(var i = 0; i < sqrList.length; i++) {
		randomColor = getRandomColor();
		stringColor = 'rgb(' + randomColor[0] + ', ' + randomColor[1] + ', ' + randomColor[2] + ')'
		sqrList[i].style.backgroundColor = stringColor;
	}
}

/* returns default look to program */
restart.addEventListener('click', function() {
	userMessage.style.display = 'none'; /* make it vanish */ 
	header.style.backgroundColor = 'orange';
	paintSquares(sqrList);
	rightColor = getRandomColor();
	
	for(var i = 1; i <= 3; i++) {
		rgbNumHeader[i].textContent = rightColor[i - 1];
	};

});

// paintSquares(sqrList);

// for(var i = 0; i < sqrList.length; i++) {
// 	sqrList[i].style.backgroundColor = 'orange';
// }