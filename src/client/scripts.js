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

const hexToRGB = function(hex){
	hex = hex.match(/\w+/gi)[0];
	if (hex.length === 3) {
        let _t = hex.split(''), 
        	hr = _t[0], 
        	hg = _t[1], 
        	hb = _t[2];
        return hexToRGB("" + hr + hr + hg + hg + hb + hb);
    }
    let _c = [0, 2, 4]
        .map(i => hex.substr(i, i+2))
        .map(i => parseInt(i, 16)),
        red = _c[0],
        green = _c[1],
        blue = _c[2];

	return [red, green, blue];
}

// Uncomment when testing -- otherwise, browsers do not support this
// module.exports = { getAllAlphabet, objectToTwo, randFromDimArry };