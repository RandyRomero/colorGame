console.log('Connected!')

easyMode = true;
var mode = document.querySelector('#btn-2'); /* easy or hard more */

mode.addEventListener('click', function() {
	/* change 'easy' button to 'hard' and back */
	if(easyMode === true) {
		mode.textContent = 'hard';
		easyMode = false;
	} else {
		mode.textContent = 'easy';
		easyMode = true;
	}
});