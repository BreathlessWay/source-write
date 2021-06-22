class NodeItem {
	constructor (value) {
		this.value = value;
		this.pre = null;
		this.next = null;
	}
}

class DoublyLinkedList {
	constructor () {
		this.head = null;
		this.length = 0;
	}

	get isEmpty () {
		return this.length === 0;
	}

	add (item) {
		const nodeItem = new NodeItem(item);
		if (!this.head) {
			this.head = nodeItem;
		} else {
			let current = this.head;

			while (current.next) {
				current = current.next;
			}

			nodeItem.pre = current;
			current.next = nodeItem;
		}
		this.length++;
	}

	insert (position, item) {
		if (position >= 0 && position <= this.length) {
			const nodeItem = new NodeItem(item);

			let current = this.head,
				index = 0;
			if (position === 0) {
				this.head = nodeItem;
				nodeItem.next = current;
			} else {
				while (index < position) {
					index++;
					current = current.next;
				}
				let pre = current.pre;
				pre.next = nodeItem;
				nodeItem.pre = pre;
				nodeItem.next = current;
			}
			this.length++;
			return true;
		}
		return false;
	}

	removeAt (position) {
		if (position >= 0 && position < this.length) {
			let current = this.head,
				index = 0;
			if (position === 0) {
				this.head = current.next;
			} else {
				while (index < position) {
					current = current.next;
					index++;
				}
				let pre = current.pre;
				current.next.pre = pre;
				pre.next = current.next;
			}
			this.length--;
		}
	}

	remove (item) {
		const position = this.indexOf(item);
		return this.removeAt(position);
	}

	indexOf (item) {
		let current = this.head,
			index = 0;

		while (current) {
			if (current.value === item) {
				return index;
			}

			current = current.next;
			index++;
		}

		return -1;
	}

	toString () {
		let current = this.head,
			string = "";

		while (current) {
			string += current.value;
			current = current.next;
		}

		console.log(string);
		return string;
	}
}

const doublyLinkedList = new DoublyLinkedList();

doublyLinkedList.add(1);
doublyLinkedList.add(4);
doublyLinkedList.add(2);
doublyLinkedList.add(7);

doublyLinkedList.insert(3, 99);

doublyLinkedList.removeAt(0);

doublyLinkedList.toString();
console.log(doublyLinkedList.indexOf(4));
