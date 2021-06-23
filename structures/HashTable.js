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

	addWithDjb (value) {
		const hash = this.djb2HashCode(value);
		this.datasource[hash] = value;
	}

	toString () {
		this.datasource.forEach((item, index) => {
			if (item !== void 0) {
				console.log(`${ index } - ${ item }`);
			}
		});
	}

	clear () {
		this.datasource = [];
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
console.log('')
someNames.forEach(item => {
	hashTable.addWithDjb(item);
});
hashTable.toString();
