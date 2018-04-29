const getAllAlphabet = function(str) {
	const founds = {};
	const alpha = 'ABCDEFHIJKLMNOPQRSTUVWXYZ'
		.split('')
		.forEach(letter => founds[letter] = 0);
	str.split('')
		.filter(character => character.match(/[A-Z]/i))
		.forEach(letter => founds[letter.toUpperCase()]++);
	return founds;
}

module.exports = { getAllAlphabet };