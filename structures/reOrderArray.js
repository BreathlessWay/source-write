const reOrderArray = (array) => {
	let start = 0, end = array.length - 1;
	while (start < end) {
		while (array[start] % 2 === 1) {
			start++;
		}
		while (array[end] % 2 === 0) {
			end--;
		}

		if (start < end) {
			[array[start], array[end]] = [array[end], array[start]];
		}
	}

	console.log(array);
};

reOrderArray([2, 3, 6, 7, 1]);