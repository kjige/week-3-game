window.onload = function() {
// Variables
var guessesRemaining = 10;
var wins = 0;
var words = ['cheeseburger', 'tsunami', 'volleyball', 'sunburn', 'bikini', 'frisbee', 'swimming', 'umbrella', 'ocean', 'sharks', 'surfing', 'paddleboard', 'scuba', 'jellyfish', 'sunset'];
var currentWord = '';
var lettersGuessed = [' '];
var lettersGuessedId = document.getElementById('lettersGuessed');
var currentWordId = document.getElementById('currentWord');

// Selects new word and splits each character into an array
var selectWord = words[Math.floor(Math.random()*words.length)];
currentWord = selectWord.split("");
console.log(currentWord);

//Creates blanks for current word
for (var i = 0; i < currentWord.length; i++) {
	var newBlank = document.createElement('li');
	newBlank.setAttribute('class', 'display-inline');
	newBlank.innerHTML = '_ ';
	currentWordId.appendChild(newBlank);
}

// When player presses key, check in alphabet array for match
var letter;
var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
document.onkeyup = function(event) {
	letter = String.fromCharCode(event.keyCode).toLowerCase(); 
	checkAlphabet();
}

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