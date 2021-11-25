const quickSort = array => {
	if (array.length < 2) return array;

	let mid = array[0],
		left = [],
		right = [];

	for (let i = 1; i < array.length; i++) {
		let item = array[i];
		if (item < mid) {
			left.push(item);
		} else {
			right.push(item);
		}
	}

	return quickSort(left).concat(mid, quickSort(right));
};

const array = [9, 5, 8, 1, 7];

console.log(quickSort(array));
