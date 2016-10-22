// Variables
var guessesRemaining = 10;
var wins = 0;
var words = ['cheeseburger', 'tsunami', 'volleyball', 'sunburn', 'bikini', 'frisbee', 'swimming', 'umbrella', 'ocean', 'sharks', 'surfing', 'paddleboard', 'scuba', 'jellyfish', 'sunset'];
var currentWord = [];
var workingWord = [];
var lettersGuessed = [];
var letter;
var wrongLetterCounter = 0;
var lettersGuessedId = document.getElementById('lettersGuessed');
var currentWordId = document.getElementById('currentWord');
var remainingId = document.getElementById('remaining');
var gameStatusId = document.getElementById('gameStatus');
var winsId = document.getElementById('wins');
var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

// Selects new word and splits each character into an array
var selectWord = words[Math.floor(Math.random()*words.length)];
currentWord = selectWord.split("");
console.log(currentWord);

//Creates blanks for current word
function play() {
	for (var i = 0; i < currentWord.length; i++) {
		var newBlank = document.createElement('li');
		newBlank.setAttribute('class', 'display-inline padding');
		newBlank.setAttribute('id', 'blank');
		newBlank.innerHTML = '_';
		currentWordId.appendChild(newBlank);
		workingWord.push('_');
	}
}
// Start game
play();

// Store letter on key up and run functions
document.onkeyup = function(event) {
    letter = String.fromCharCode(event.keyCode).toLowerCase();
        checkAlphabet();
    if (checkAlphabet() === true) {
        checkLettersGuessed();
        if (checkLettersGuessed() === true) {
	        checkWorkingWord();    
    		if (checkWorkingWord() === true) {
	    	    checkCurrentWord();
	    	    if (checkCurrentWord() === true) {
			        replaceLetter();
					winStatus();
					if (winStatus() === true) {
						winCounter();
						resetGame();
						updateRemaining();
						play();
					} 
				} else {
					subtractRemaining();
					updateRemaining();
					updateUsedLetters();
					lose();
					if (lose() === true) {
						resetGame();
						updateRemaining();
						play();
					}
				}
			}
		}
    } 
}

// Check alphabet array
function checkAlphabet() {
	for (var i = 0; i < alphabet.length; i++) {
		if (letter === alphabet[i]) {
			return true;
		}
	}
	return false;
}

// check whether letter has been used
function checkLettersGuessed() {
	for (var i = 0; i < lettersGuessed.length; i++) {
		if (letter === lettersGuessed[i]) {
			return false;
		}
	}
	return true;
}

// check if letter is in the working word
function checkWorkingWord() {
	for (var i = 0; i < workingWord.length; i++) {
		if (letter === workingWord[i]) {
			return false;
		}
	}
	return true;
}

// check if letter is in the answer
function checkCurrentWord() {
	for (var i = 0; i < currentWord.length; i++) {
		if (letter === currentWord[i]) {
			workingWord[i] = letter;
		}
	}
	return true;
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

// subtracts 1 from remaining number of guesses
function subtractRemaining() {	
		guessesRemaining -= 1;
}

// updates remaining guesses left in DOM
function updateRemaining() {
	var removeOldScore = document.getElementById('lives');
	remainingId.removeChild(removeOldScore);
	var newScore = document.createElement('li');
	newScore.setAttribute('id', 'lives');
	newScore.setAttribute('class', 'display-inline padding')
	newScore.innerHTML = guessesRemaining;
	remainingId.appendChild(newScore);
	}

// updates div containing previously used letters with new letter
function updateUsedLetters() {
	var newLetter = document.createElement('li');
	newLetter.innerHTML = letter;
	newLetter.setAttribute('class', 'display-inline padding');
	lettersGuessedId.appendChild(newLetter);
}

// updates game status to win
function winStatus() {
	if (workingWord === currentWord) {
		var removeGameStatus = document.getElementById('play');
		gameStatusId.removeChild(removeGameStatus);
		var newgameStatus = document.createElement('li');
		newgameStatus.setAttribute('class', 'display-inline');
		newgameStatus.innerHTML = 'You Win!';
		gameStatusId.appendChild(newgameStatus);
		wins += 1;
		return true;
	}
	return false;
}

// updates win counter
function winCounter() {
	var removeWinCounter = document.getElementById('winCounter');
	winsId.removeChild(removeWinCounter);
	var newWinCounter = document.createElement('li');
	newWinCounter.setAttribute('class', 'display-inline');
	newWinCounter.innerHTML = wins;
	winsId.appendChild(newWinCounter);
}

// updates game status to game over
function lose() {
	if (guessesRemaining < 1) {
		var removeGameStatus = document.getElementById('play');
		gameStatusId.removeChild(removeGameStatus);
		var newgameStatus = document.createElement('li');
		newgameStatus.innerHTML = 'Game Over';
		gameStatusId.appendChild(newgameStatus);
		return true;
	}
	return false;
}

function resetGame() {
	document.onkeyup = function(){
		guessesRemaining = 10;
		currentWord = [];
		workingWord = [];
		lettersGuessed = [];
	}
}


