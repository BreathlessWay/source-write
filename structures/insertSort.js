const insertSort = array => {
	const len = array.length;
	for (let i = 1; i < len; i++) {
		let j = i,
			temp = array[i];
		while (j > 0 && array[j - 1] > temp) {
			console.log(i, j, j - 1, temp);
			array[j] = array[j - 1];
			j--;
		}
		array[j] = temp;
	}
};

const array = [9, 5, 8, 1, 7];

insertSort(array);

console.log(array);