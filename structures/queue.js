class Queue {
	constructor () {
		this.datasource = [];
	}

	get size () {
		return this.datasource.length;
	}

	get isEmpty () {
		return this.size === 0;
	}

	enqueue (data) {
		this.datasource.push(data);
	}

	dequeue () {
		return this.datasource.shift();
	}

	front () {
		return this.datasource[0];
	}
}

const hotPotato = (names, num) => {
	const queue = new Queue();

	names.forEach(item => {
		queue.enqueue(item);
	});

	while (queue.size > 1) {
		for (let i = 0; i < num; i++) {
			queue.enqueue(queue.dequeue());
		}

		console.log(`${ queue.dequeue() } 被淘汰`);
	}

	return queue.front();
};

const names = ["张三", "李四", "王五", "赵六", "孙七", "郑八", "钱九", "周十"];
const winner = hotPotato(names, 5);

console.log(winner + "赢了!!!");