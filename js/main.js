console.log('Connected!')

var restart = document.querySelector('#btn-1') /* new colors */
var mode = document.querySelector('#btn-2'); /* easy or hard more */
easyMode = true;

/* define variables for squares */
var sqrList =[];
for(var i = 1; i <= 6; i++) {
	sqrList[i] = document.querySelector('#sqr-' + i)
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

restar.addEventListener('click', function() {
	for(var i = 1; i <= 6; i++) {
		sqrList[i].style.backgroundColor = 'orange';
	}
})  