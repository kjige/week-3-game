window.onload = function() {
// Variables
var guessesRemaining = 10;
var wins = 0;
var words = ['cheeseburger', 'tsunami', 'volleyball', 'sunburn', 'bikini', 'frisbee', 'swimming', 'umbrella', 'ocean', 'sharks', 'surfing', 'paddleboard', 'scuba', 'jellyfish', 'sunset'];
var currentWord = '';
var workingWord = [];
var lettersGuessed = [' '];
var letter;
var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
var lettersGuessedId = document.getElementById('lettersGuessed');
var currentWordId = document.getElementById('currentWord');

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

function checkLettersGuessed() {
	for (var i = 0; i < lettersGuessed.length; i++) {
		if (letter === lettersGuessed[i]) {
			return;
		}
	}
	checkCurrentWord();
}

function checkCurrentWord() {
	for (var i = 0; i < currentWord.length; i++) {
		if (letter === currentWord[i]) {
			workingWord[i] = letter;
			adjustScores();
			replaceLetter();
		}
	}
}

function adjustScores() {

}

function replaceLetter() {
	// currentWordId.innerHTML = 'Current Word';
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

function useLetter() {
	lettersGuessed.push(letter);
	console.log(lettersGuessed);
	var newLetter = document.createElement('li');
	newLetter.innerHTML = letter;
	newLetter.setAttribute('class', 'display-inline padding');
	lettersGuessedId.appendChild(newLetter);
}

}