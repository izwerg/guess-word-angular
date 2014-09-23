'use strict';

/**
* Game controller
*/
angular.module('app').controller('GameCtrl', GameCtrl);

GameCtrl.$inject = ['alphabet', 'word'];

function GameCtrl(alphabet, word) {
	var vm = this;

	vm.startNewGame();
}

/**
 * Starts new game. Initializes all alphabet, word, etc.
 */
GameCtrl.prototype.startNewGame = function() {
	var vm = this;

	vm.alphabet = alphabet().map(function(char) {
		return {
			char: char,
			used: false
		};
	});

	vm.word = word().map(function(char) {
		return {
			char: '*',
			realChar: char
		};
	});

	vm.mistakesCount = 0;
	vm.mistakesMax = vm.word.length;
	vm.unknownLettersCount = this.word.length;

	console.log('Word is', vm.word.map(function(letter) { return letter.realChar }).join(''));
};

/**
 * Checks if the word contains clicked letter
 * @param alphaLetter - clicked letter
 */
GameCtrl.prototype.checkLetter = function(alphaLetter) {
	var vm = this;
	var hasMatch = false;

	alphaLetter.used = true;

	vm.word.forEach(function(wordLetter) {
		if(wordLetter.realChar === alphaLetter.char) {
			wordLetter.char = wordLetter.realChar;
			hasMatch = true;
			vm.unknownLettersCount--;
		}
	});

	if(!hasMatch) {
		vm.mistakesCount++;
	}

	// Too many mistakes - you lose or no unknown letters - you win
	if(vm.mistakesCount >= vm.mistakesMax || vm.unknownLettersCount === 0) {
		vm.giveUp();
	}
};

/**
 * Opens the word and closes the alphabet
 */
GameCtrl.prototype.giveUp = function() {
	var vm = this;

	// Close all alphabet letters
	vm.alphabet.forEach(function(alphaLetter) {
		alphaLetter.used = true;
	});
	// Open all word letters
	vm.word.forEach(function(wordLetter) {
		wordLetter.char = wordLetter.realChar;
	});

	vm.unknownLettersCount = 0;
};

/**
 * Condition of WIN
 * @returns {boolean}
 */
GameCtrl.prototype.conditionWin = function() {
	var vm = this;

	return vm.unknownLettersCount === 0 && vm.mistakesCount < vm.mistakesMax;
};

/**
 * Condition of LOSE
 * @returns {boolean}
 */
GameCtrl.prototype.conditionLose = function() {
	var vm = this;

	return vm.mistakesCount >= vm.mistakesMax;
};