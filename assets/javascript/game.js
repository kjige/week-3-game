// Variables
var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
var words = ['cheeseburger', 'tsunami', 'volleyball', 'sunburn', 'bikini', 'frisbee', 'swimming', 'umbrella', 'ocean', 'sharks', 'surfing', 'paddleboard', 'scuba', 'jellyfish', 'sunset'];
var currentWord = [];
var workingWord = [];
var lettersGuessed = [];
var guessesRemaining = 10;
var wins = 0;
var letter;
var snd = new Audio("assets/images/boing2.wav");
var winsId = document.getElementById('wins');
var currentWordId = document.getElementById('currentWord');
var remainingId = document.getElementById('remaining');
var lettersGuessedId = document.getElementById('lettersGuessed');
var gameStatusId = document.getElementById('gameStatus');

// Store letter on key up and run functions
document.onkeyup = function(event) {
    letter = String.fromCharCode(event.keyCode).toLowerCase();
    if (hangman.checkAlphabet() === true) {
        if (hangman.checkLettersGuessed() === true) { 
    		if (hangman.checkWorkingWord() === true) {
	    	    if (hangman.checkCurrentWord() === true) {
			        hangman.replaceLetter();
					if (hangman.winStatus() === true) {
						hangman.winCounter();
						hangman.resetGame();
						hangman.updateRemaining();
						hangman.play();
					} 
				} else {
					hangman.subtractRemaining();
					hangman.updateRemaining();
					hangman.updateUsedLetters();
					if (hangman.lose() === true) {
						hangman.resetGame();
						hangman.updateRemaining();
						hangman.play();
					}
				}
			}
		}
    } 
}

// Hangman game as an object
var hangman = {
	// Starts a new game
	play: function () {
		var blanksId = document.getElementById('blank');
		blanksId.parentNode.removeChild(blanksId);
		var guessedId = document.getElementById('guessed');
		guessedId.parentNode.removeChild(guessedId);
		// Selects new word and splits each character into an array
		var selectWord = words[Math.floor(Math.random()*words.length)];
		currentWord = selectWord.split("");
		console.log(currentWord);
		// Creates blanks for current word
		for (var i = 0; i < currentWord.length; i++) {
			var newBlank = document.createElement('li');
			newBlank.setAttribute('class', 'display-inline padding');
			newBlank.setAttribute('id', 'blank');
			newBlank.innerHTML = '_';
			currentWordId.appendChild(newBlank);
			workingWord.push('_');
		}
	},

	// Checks alphabet array
	checkAlphabet: function() {
		for (var i = 0; i < alphabet.length; i++) {
			if (letter === alphabet[i]) {
				return true;
			}
		}
		return false;
	},

	// Checks whether letter has been used
	checkLettersGuessed: function() {
		for (var i = 0; i < lettersGuessed.length; i++) {
			if (letter === lettersGuessed[i]) {
				return false;
			}
		}
		return true;
	},

	// Check if letter is in the working word
	checkWorkingWord: function() {
		for (var i = 0; i < workingWord.length; i++) {
			if (letter === workingWord[i]) {
				return false;
			}
		}
		return true;
	},

	// Checks if letter is in the answer
	checkCurrentWord: function() {
		var wasFound = false;
		for (var i = 0; i < currentWord.length; i++) {
			if (letter === currentWord[i]) {
				workingWord[i] = letter;
				wasFound = true;
			}
		}
		return wasFound;
	},

	// Re-writes display of current word with letters and blanks
	replaceLetter: function() {
		for (var i = 0; i < workingWord.length; i++) {
			var blanksId = document.getElementById('blank');
			blanksId.parentNode.removeChild(blanksId);
			var currentWordId = document.getElementById('currentWord');
			var newBlankOrLetter = document.createElement('li');
			newBlankOrLetter.setAttribute('class', 'display-inline padding');
			newBlankOrLetter.setAttribute('id', 'blank');
			newBlankOrLetter.innerHTML = workingWord[i];
			currentWordId.appendChild(newBlankOrLetter);
			snd.play();
		}
	},

	// Subtracts 1 from remaining number of guesses
	subtractRemaining: function() {	
		guessesRemaining -= 1;
		lettersGuessed.push(letter);
	},

	// updates remaining guesses left in DOM
	updateRemaining: function() {
		var livesId = document.getElementById('lives');
		livesId.parentNode.removeChild(livesId);
		var newScore = document.createElement('li');
		newScore.setAttribute('id', 'lives');
		newScore.setAttribute('class', 'display-inline padding')
		newScore.innerHTML = guessesRemaining;
		remainingId.appendChild(newScore);
	},

	// updates div containing previously used letters with new letter
	updateUsedLetters: function() {
		var newLetter = document.createElement('li');
		newLetter.innerHTML = letter;
		newLetter.setAttribute('class', 'display-inline padding');
		newLetter.setAttribute('id', 'guessed');
		lettersGuessedId.appendChild(newLetter);
	},

	// Updates game status to win
	winStatus: function() {
		var isComplete = true;
		for (var i = 0; i < currentWord.length; i++) {
			if (workingWord[i] !== currentWord[i]) {
				isComplete = false;
			}
		}
		if (isComplete === true) {
			var playId = document.getElementById('play');
			playId.parentNode.removeChild(playId);
			var newgameStatus = document.createElement('li');
			newgameStatus.setAttribute('class', 'display-inline');
			newgameStatus.setAttribute('id', 'play');
			newgameStatus.innerHTML = 'You Won!';
			gameStatusId.appendChild(newgameStatus);
			wins += 1;
			return true;
		}
		return false;
	},

	// Updates win counter
	winCounter: function() {
		var winCounterId = document.getElementById('winCounter');
		winCounterId.parentNode.removeChild(winCounterId);
		var newWinCounter = document.createElement('li');
		newWinCounter.setAttribute('class', 'display-inline');
		newWinCounter.setAttribute('id', 'winCounter');
		newWinCounter.innerHTML = wins;
		winsId.appendChild(newWinCounter);
	},

	// Updates game status to game over
	lose: function() {
		if (guessesRemaining < 1) {
			var playId = document.getElementById('play');
			playId.parentNode.removeChild(playId);
			var newgameStatus = document.createElement('li');
			newgameStatus.setAttribute('id', 'play');
			newgameStatus.setAttribute('class', 'display-inline');
			newgameStatus.innerHTML = 'You Lost!';
			gameStatusId.appendChild(newgameStatus);
			return true;
		}
		return false;
	},

	// Resets game variables, and updates DOM
	resetGame: function() {
			for (var i = 0; i < currentWord.length; i++) {	
				var blanksId = document.getElementById('blank');
				blanksId.parentNode.removeChild(blanksId);
			}
			var newBlank = document.createElement('li');
			newBlank.setAttribute('id', 'blank');
			newBlank.setAttribute('class', 'display-inline padding');
			currentWordId.appendChild(newBlank);
			for (var i = 0; i < lettersGuessed.length; i++) {
				var guessedId = document.getElementById('guessed');
				guessedId.parentNode.removeChild(guessedId);
			}
			var newGuessed = document.createElement('li');
			newGuessed.setAttribute('id', 'guessed');
			newGuessed.setAttribute('class', 'display-inline padding');
			lettersGuessedId.appendChild(newGuessed);
			guessesRemaining = 10;
			currentWord = [];
			workingWord = [];
			lettersGuessed = [];
	},
}

// Start game
hangman.play();