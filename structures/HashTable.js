const LinkList = require("./LinkList");

class NodeItem {
	constructor (key, value) {
		this.key = key;
		this.value = value;
	}
}

class HashTable {
	constructor () {
		this.datasource = [];
	}

	loseloseHashCode (key) {
		let hash = 0;
		for (let i = 0; i < key.length; i++) {
			hash += key.charCodeAt(i);
		}
		return hash % 137;
	}

	djb2HashCode (key) {
		let hash = 5381;
		for (let i = 0; i < key.length; i++) {
			hash += hash * 33 + key.charCodeAt(i);
		}
		return hash % 137;
	}

	addWithLose (value) {
		const hash = this.loseloseHashCode(value);
		this.datasource[hash] = value;
	}

	removeWithLose () {
		const hash = this.loseloseHashCode(value);
		this.datasource[hash] = void 0;
		return true;
	}

	getWithLose (value) {
		const hash = this.loseloseHashCode(value);
		return this.datasource[hash];
	}

	addWithDjb (value) {
		const hash = this.djb2HashCode(value);
		this.datasource[hash] = value;
	}

	removeWithDjb () {
		const hash = this.djb2HashCode(value);
		this.datasource[hash] = void 0;
		return true;
	}

	getWithDjb (value) {
		const hash = this.loseloseHashCode(value);
		return this.datasource[hash];
	}

	// 分离链接：每个节点都是存的链表
	addWithLink (key, value) {
		const hash = this.loseloseHashCode(key);
		if (this.datasource[hash] === void 0) {
			this.datasource[hash] = new LinkList();
		}
		const item = new NodeItem(key, value);
		this.datasource[hash].add(item);
	}

	getWithLink (key) {
		const hash = this.loseloseHashCode(key);
		if (this.datasource[hash] !== void 0) {
			let current = this.datasource[hash].head;
			while (current) {
				if (current.value.key === key) {
					return current.value;
				}
				current = current.next;
			}
		}
		return void 0;
	}

	removeWithLink (key) {
		const hash = this.loseloseHashCode(key);
		if (this.datasource[hash] !== void 0) {
			let current = this.datasource[hash].head;
			while (current) {
				if (current.value.key === key) {
					this.datasource[hash].remove(current.value);
					if (this.datasource[hash].isEmpty) {
						this.datasource[hash] = void 0;
					}
				}
				current = current.next;
			}
			return true;
		}
		return false;
	}

	// 线性探查
	addWithLine (value) {
		const hash = this.loseloseHashCode(value);
		if (this.datasource[hash] === void 0) {
			this.datasource[hash] = value;
		} else {
			let index = hash + 1;
			while (this.datasource[index] !== void 0) {
				index++;
			}
			this.datasource[index] = value;
		}
	}

	getWithLine (value) {
		let hash = this.loseloseHashCode(value);
		while (this.datasource[hash] !== value) {
			hash++;
		}
		return `${ hash } - ${ value }`;
	}

	removeWithLine (value) {
		let hash = this.loseloseHashCode(value);
		while (this.datasource[hash] !== value) {
			hash++;
		}
		this.datasource[hash] = void 0;
	}

	toString () {
		this.datasource.forEach((item, index) => {
			if (item !== void 0) {
				console.log(`${ index } - ${ item }`);
			}
		});
		console.log("");
	}

	clear () {
		this.datasource = [];
		console.log("");
		return true;
	}
}

const hashTable = new HashTable();
const someNames = ["David", "Jennifer", "Donnie", "Raymond",
	"Cynthia", "Mike", "Clayton", "Danny", "Jonathan"];
someNames.forEach(item => {
	hashTable.addWithLose(item);
});
hashTable.toString();
hashTable.clear();

someNames.forEach(item => {
	hashTable.addWithDjb(item);
});
hashTable.toString();
hashTable.clear();

someNames.forEach(item => {
	hashTable.addWithLink(item, item);
});
console.log(hashTable.getWithLink("Raymond"));
console.log(hashTable.removeWithLink("Clayton"));
hashTable.clear();

someNames.forEach(item => {
	hashTable.addWithLine(item);
});
hashTable.toString();
console.log(hashTable.getWithLine("Clayton"));
console.log("");
hashTable.removeWithLine("David");
hashTable.toString();
