console.log('Connected!')

var userMessage = document.querySelector('main p')
var header = document.querySelector('header'); /* main header */
var restart = document.querySelector('#btn-1'); /* new colors */
var mode = document.querySelector('#btn-2'); /* easy or hard more */
easyMode = true;

/* define variables for rgb numbers in header */
var rgbNum = [];
for(var i = 1; i <= 3; i++) {
	rgbNum[i] = document.querySelector('header h1 span:nth-of-type(' + 
		i + ')');
}

/* define variables for squares */
var sqrList =[];
for(var i = 1; i <= 6; i++) {
	sqrList[i] = document.querySelector('#sqr-' + i);
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

/* returns default look to program */
restart.addEventListener('click', function() {
	userMessage.style.display = 'none'; /* make it vanish */ 
	header.style.backgroundColor = 'orange';
	for(var i = 1; i <= 6; i++) {
		sqrList[i].style.backgroundColor = 'orange';
	}
});  