const MaxNoRepeat = (str) => {
	let len = str.length,
		start = 0,
		maxLen = 0,
		map = new Map;

	for (let i = 0; i < len; i++) {
		const item = str[i];

		if (map.has(item)) {
			start = Math.max(map.get(item) + 1, start);
		}

		map.set(item, i);

		maxLen = Math.max(i - start + 1, maxLen);
	}

	console.log(maxLen);
	return maxLen;
};

MaxNoRepeat("abcabcbb");
MaxNoRepeat("bbbbb");
MaxNoRepeat("pwwkew");
MaxNoRepeat("");
