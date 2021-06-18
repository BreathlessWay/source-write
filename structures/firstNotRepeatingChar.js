// 时间复杂度O(n)、空间复杂度O(n)
const firstNotRepeatingChar = (str) => {
	const array = str.split("");
	const charMap = {};
	array.forEach(_ => {
		if (charMap[_] === void 0) {
			charMap[_] = 0;
		}
		charMap[_] += 1;
	});

	for (let i = 0, len = array.length; i < len; i++) {
		if (charMap[array[i]] === 1) {
			return i;
		}
	}
};

console.log(firstNotRepeatingChar("abcatfer"));

// 时间复杂度为O(n2)，空间复杂度为0
const _firstNotRepeatingChar = (str) => {
	for (let i = 0, len = str.length; i < len; i++) {
		const _index = str.indexOf(str[i]),
			_lastIndex = str.lastIndexOf(str[i]);
		if (_index === _lastIndex) {
			return i;
		}
	}
};

console.log(_firstNotRepeatingChar("abcatfer"));
