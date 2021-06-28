const selectionSort = (array) => {
	const len = array.length;
	let min;
	for (let i = 0; i < len - 1; i++) {
		min = i;
		for (let j = i + 1; j < len; j++) {
			if (array[j] < array[min]) {
				min = j;
			}
		}
		[array[min], array[i]] = [array[i], array[min]];
	}
};

const array = [9, 5, 8, 1, 7];

selectionSort(array);

console.log(array);