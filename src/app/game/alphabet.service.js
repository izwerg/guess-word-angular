'use strict';
/**
* Alphabet service. Provides alphabet array.
*/
angular.module('app').factory('alphabet', alphabet);

//alphabet.$inject = ['$resource'];

function alphabet() {
	var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

	return alphabet.split('');
}
