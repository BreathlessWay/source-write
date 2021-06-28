const quickSort = array => {
	if (array.length < 2) return array;

	let pivot = array[0],
		left = [],
		right = [];

	for (let i = 1; i < array.length; i++) {
		if (array[i] < pivot) {
			left.push(array[i]);
		} else {
			right.push(array[i]);
		}
	}
	return quickSort(left).concat(pivot, quickSort(right));
};

const array = [9, 5, 8, 1, 7];

quickSort(array);

console.log(array);