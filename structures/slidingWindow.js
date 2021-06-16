const slidingWindow = (array, len) => {
	const maxArray = [],
		arrayLength = array.length;
	let i = 0;

	while (i + len <= arrayLength) {
		const rangeArray = array.slice(i, i + len);
		maxArray.push(Math.max(...rangeArray));
		i++;
	}

	console.log(maxArray);
};

slidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3);