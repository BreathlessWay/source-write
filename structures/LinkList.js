class NodeItem {
	constructor (value) {
		this.value = value;
		this.next = null;
	}
}

class LinkList {
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

			current.next = nodeItem;
		}

		this.length++;
	}

	insert (position, item) {
		if (position >= 0 && position <= this.length) {
			const nodeItem = new NodeItem(item);

			let current = this.head,
				index = 0,
				mid = null;

			if (position === 0) {
				nodeItem.next = this.head;
				this.head = nodeItem;
			} else {
				while (current) {
					if (position === index + 1) {
						mid = current.next;
						current.next = nodeItem;
						nodeItem.next = mid;
						break;
					} else {
						current = current.next;
						index++;
					}
				}
			}

			this.length++;
			return true;
		}

		return false;
	}

	removeAt (position) {
		if (position >= 0 && position < this.length) {
			let current = this.head,
				index = 0,
				previous = null;

			if (position === 0) {
				this.head = current.next;
			} else {
				while (index < position) {
					previous = current;
					current = current.next;
					index++;
				}

				previous.next = current.next;
			}
			this.length--;
			return current.value;
		}
		return null;
	}

	remove (item) {
		const index = this.indexOf(item);
		return this.removeAt(index);
	}

	indexOf (item) {
		let current = this.head, index = 0;
		while (current) {
			if (current.value === item) {
				return index;
			} else {
				current = current.next;
				index++;
			}
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

	reverse () {
		if (!this.isEmpty) {
			let current = this.head,
				nextNode = null;

			while (current) {
				let next = current.next
				current.next = nextNode
				nextNode = current
				current = next
			}
			this.head = nextNode;
		}
	}
}

const linklist = new LinkList();

linklist.add(1);
linklist.add(2);
linklist.add(3);

linklist.toString();
console.log(linklist.indexOf(1));
console.log(linklist.indexOf(3));
console.log(linklist.indexOf(5));

linklist.insert(0, 4);
linklist.toString();
linklist.insert(2, 8);
linklist.toString();
linklist.insert(5, 9);
linklist.toString();

// linklist.removeAt(5);
// linklist.toString();
// linklist.removeAt(2);
// linklist.toString();
// linklist.removeAt(0);
// linklist.toString();
//
// linklist.remove(1);
// linklist.toString();

linklist.reverse();
linklist.toString();