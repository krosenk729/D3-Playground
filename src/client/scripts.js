const getAllAlphabet = function(str) {
	const founds = {};
	const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
		.split('')
		.forEach(letter => founds[letter] = 0);
	str.split('')
		.filter(character => character.match(/[A-Z]/i))
		.forEach(letter => founds[letter.toUpperCase()]++);
	return founds;
}

const objectToTwo = function(obj){
	return [Object.keys(obj), Object.values(obj)];
}

const randFromDimArry = function(arr){
	const rand = Math.random(),
		randIndex = Math.floor(rand * arr.length),
		randPairIndex = Math.floor(rand);
	return arr[randIndex][randPairIndex]
}

// Uncomment when testing -- otherwise, browsers do not support this
// module.exports = { getAllAlphabet, objectToTwo, randFromDimArry };