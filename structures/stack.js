class Stack {
	constructor () {
		this.datasource = [];
	}

	get size () {
		return this.datasource.length;
	}

	get isEmpty () {
		return this.size === 0;
	}

	push (item) {
		this.datasource.push(item);
	}

	pop () {
		return this.datasource.pop();
	}

	peek () {
		return this.isEmpty ? void 0 : this.datasource[this.size - 1];
	}

	clear () {
		this.datasource = [];
	}
}

// 进制转换
const converter = (number, base) => {
	const stack = new Stack();
	let rem,
		baseString = "",
		digits = "0123456789ABCDEF";

	while (number > 0) {
		rem = Math.floor(number % base);
		stack.push(rem);
		number = Math.floor(number / base);
	}

	while (!stack.isEmpty) {
		baseString += digits[stack.pop()];
	}

	return baseString;
};

console.log(converter(123, 16));

// 回文
const palindromic = (string) => {
	const stack = new Stack();

	for (let i = 0, len = string.length; i < len; i++) {
		stack.push(string[i]);
	}

	let _string = "";
	while (!stack.isEmpty) {
		_string += stack.pop();
	}

	return string === _string;
};

console.log(palindromic("aba"));