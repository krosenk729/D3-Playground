const getAllAlphabet = function(str) {
	const founds = {};
	const alpha = 'ABCDEFHIJKLMNOPQRSTUVWXYZ'
	.split('')
	.forEach(letter => founds[letter] = 0);



	return founds;
}

console.log(getAllAlphabet('katheirne'));

module.exports = {getAllAlphabet};