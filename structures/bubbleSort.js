const bubbleSort = (array) => {
	const len = array.length;
	for (let i = 0; i < len; i++) {
		for (let j = 0; j < len - 1 - i; j++) {
			if (array[j] > array[j + 1]) {
				[array[j], array[j + 1]] = [array[j + 1], array[j]];
			}
		}
	}
};

const array = [9, 5, 8, 1, 7];

bubbleSort(array);

console.log(array);