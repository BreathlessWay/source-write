const minNumber = (array) => {
	const sortArray = array.sort((a, b) => {
		const pre = "" + a + b,
			next = "" + b + a;
		console.log(pre, next, pre - next);
		return pre - next;
	});
	console.log(sortArray.join(""));
};
minNumber([30, 67, 1111]);