'use strict';
/**
 * Word service. Provides random word as array.
 */
angular.module('app').factory('word', word);

//word.$inject = ['$resource'];

function word() {
	var words = [
			'LUCK',
			'ETERNITY',
			'ANGULAR',
			'MOTHER',
			'EARTH',
			'WEEKEND',
			'LIBERTY',
			'FORTUNE'
	];

	return words[Math.floor(Math.random() * words.length)].split('');
}
