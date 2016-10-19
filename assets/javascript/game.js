window.onload = function() {
// Variables
var lettersGuessed = [];
var guessesRemaining = 10;
var wins = 0;
var words = ['cheeseburger', 'tsunami', 'volleyball', 'sunburn', 'bikini', 'frisbee', 'swimming', 'umbrella', 'ocean', 'sharks', 'surfing', 'paddleboard', 'scuba', 'jellyfish', 'sunset'];
var currentWord = '';

// console.log(currentWord[0][0]);
// console.log(currentWord[0][1]);
// console.log(currentWord[0][2]);
// console.log(currentWord[0][3]);

// function startGame() {
// var selectWord = words[Math.floor(Math.random()*words.length)];
// for (var i = 0; i < currentWord.length; i++) {
// 	if (selectWord === )
// }

// Selects new word and splits each character into an array
var selectWord = words[Math.floor(Math.random()*words.length)];
currentWord = selectWord.split("");
var currentWordId = document.getElementById('currentWord');
console.log(currentWord);

//Creates blanks for current word
for (var i = 0; i < currentWord.length; i++) {
	var newBlank = document.createElement('li');
	newBlank.setAttribute('class', 'display-inline');
	newBlank.innerHTML = '_ ';
	currentWordId.appendChild(newBlank);

}


// for (var i = 0; i < drinkList.length; i++) {
//         var newDrink = document.createElement('p');
//         newDrink.innerHTML = drinkList[i];
//         drinkOptions.appendChild(newDrink);
//      }


// Entering letters
var lettersGuessedId = document.getElementById('lettersGuessed');
var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
document.onkeyup = function(event) {
	var letter = String.fromCharCode(event.keyCode).toLowerCase(); //change to lower case
	for (var i = 0; i < alphabet.length; i++) {
		if (letter === alphabet[i]) {
			lettersGuessed.push(letter);
			lettersGuessedId.innerHTML = lettersGuessed;
		}
	}
}


// 	for (var i = 0; i < currentWord.length; i++) {
// 		if (letter === currentWord[i]) {
// 			blanks[i] = letter;
// 			currentWordId.innerHTML = blanks;
// 		} else {
// 		lettersGuessed.push(letter);
// 		lettersGuessedId.innerHTML = lettersGuessed;
// 		guessesRemaining -= 1
// 		var lettersGuessedId = document.getElementById('remaining');
// 		lettersGuessedId.innerHTML = guessesRemaining;
// 		}
// 	}
// }

}