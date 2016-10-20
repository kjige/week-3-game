// Variables
var guessesRemaining = 10;
var wins = 0;
var words = ['cheeseburger', 'tsunami', 'volleyball', 'sunburn', 'bikini', 'frisbee', 'swimming', 'umbrella', 'ocean', 'sharks', 'surfing', 'paddleboard', 'scuba', 'jellyfish', 'sunset'];
var currentWord = '';
var workingWord = [];
var lettersGuessed = [' '];
var letter;
var wrongLetterCounter = 0;
var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
var lettersGuessedId = document.getElementById('lettersGuessed');
var currentWordId = document.getElementById('currentWord');
var remainingId = document.getElementById('remaining');

// Selects new word and splits each character into an array
var selectWord = words[Math.floor(Math.random()*words.length)];
currentWord = selectWord.split("");
console.log(currentWord);

//Creates blanks for current word
for (var i = 0; i < currentWord.length; i++) {
	var newBlank = document.createElement('li');
	newBlank.setAttribute('class', 'display-inline padding');
	newBlank.setAttribute('id', 'blank');
	newBlank.innerHTML = '_';
	currentWordId.appendChild(newBlank);
	workingWord.push('_');
}

// Store pressed 
document.onkeyup = function(event) {
	letter = String.fromCharCode(event.keyCode).toLowerCase(); 
	checkAlphabet();
}

// Check alphabet array
function checkAlphabet() {
	for (var i = 0; i < alphabet.length; i++) {
		if (letter === alphabet[i]) {
			checkLettersGuessed();
		}
	}
}

// check whether letter has been used
function checkLettersGuessed() {
	for (var i = 0; i < lettersGuessed.length; i++) {
		if (letter === lettersGuessed[i]) {
			return;
		}
	}
	usedLetter();
	checkCurrentWord();
}

// check if letter is in current word
// also check if letter is in working word
function checkCurrentWord() {
	for (var i = 0; i < currentWord.length; i++) {
		if (letter === workingWord[i]) {
			return;
		} else if (letter === currentWord[i]) {
			workingWord[i] = letter;
			replaceLetter();
		} 
	}
	remainingCounter();
}

// substracts wrong guesses from number of guesses left
function remainingCounter() {	
	for (var i = 0; i < workingWord.length; i++) {
		if (letter === workingWord[i]) {
			return;
		} else {
		wrongLetterCounter += 1;
		if (wrongLetterCounter > 0) {
			guessesRemaining -= 1;
			remaining();
		} else {
			wrongLetterCounter = 0;
		}
	}
}

// re-writes display of current word with letters and blanks
function replaceLetter() {
	for (var i = 0; i < workingWord.length; i++) {
		var removeBlanks = document.getElementById('blank');
		currentWordId.removeChild(removeBlanks);
		var newBlankOrLetter = document.createElement('li');
		newBlankOrLetter.setAttribute('class', 'display-inline padding');
		newBlankOrLetter.setAttribute('id', 'blank');
		newBlankOrLetter.innerHTML = workingWord[i];
		currentWordId.appendChild(newBlankOrLetter);
	}
}

function usedLetter() {
	for (var i = 0; i < currentWord.length; i++) {
		if (letter === currentWord[i]) {
			return;
		}
	}
	lettersGuessed.push(letter);
	var newLetter = document.createElement('li');
	newLetter.innerHTML = letter;
	newLetter.setAttribute('class', 'display-inline padding');
	lettersGuessedId.appendChild(newLetter);
	remaining();
}

function remaining() {
	var removeOldScore = document.getElementById('lives');
	remainingId.removeChild(removeOldScore);
	var newScore = document.createElement('li');
	newScore.setAttribute('id', 'lives');
	newScore.setAttribute('class', 'display-inline padding')
	newScore.innerHTML = guessesRemaining;
	remainingId.appendChild(newScore);
	if (guessesRemaining < 1) {
		endGame();
	}
}


function win() {

}

function lose() {

}

function endGame() {

}

