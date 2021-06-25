class NodeItem {
	constructor (value) {
		this.value = value;
		this.left = null;
		this.right = null;
	}
}

class BinarySearchTree {
	constructor () {
		this.root = null;
	}

	get min () {
		let current = this.root;
		while (current && current.left) {
			current = current.left;
		}
		return current.value;
	}

	get max () {
		let current = this.root;
		while (current && current.right) {
			current = current.right;
		}
		return current.value;
	}

	insert (value) {
		const nodeItem = new NodeItem(value);
		if (!this.root) {
			this.root = nodeItem;
		} else {
			let current = this.root,
				previous = null;
			while (current) {
				previous = current;
				if (current.value < nodeItem.value) {
					current = current.right;
				} else {
					current = current.left;
				}
			}
			if (previous.value < nodeItem.value) {
				previous.right = nodeItem;
			} else {
				previous.left = nodeItem;
			}
		}
	}

	searchNode (value) {
		let current = this.root;
		while (current) {
			if (current.value === value) {
				return true;
			}

			if (current.value < value) {
				current = current.right;
			} else {
				current = current.left;
			}
		}

		return false;
	}

	// 中序遍历 从小到大
	inOrderTraverse (cb) {
		const inOrderTraverseNode = (node, cb) => {
			if (node) {
				inOrderTraverseNode(node.left, cb);
				cb(node);
				inOrderTraverseNode(node.right, cb);
			}
		};
		inOrderTraverseNode(this.root, cb);
	}

	// 先序遍历 树形结构
	preOrderTraverse (cb) {
		const preOrderTraverseNode = (node, cb) => {
			if (node) {
				cb(node);
				preOrderTraverseNode(node.left, cb);
				preOrderTraverseNode(node.right, cb);
			}
		};
		preOrderTraverseNode(this.root, cb);
	}

	// 后续遍历 字节点优先
	postOrderTraverse (cb) {
		const postOrderTraverseNode = (node, cb) => {
			if (node) {
				postOrderTraverseNode(node.left, cb);
				postOrderTraverseNode(node.right, cb);
				cb(node);
			}
		};
		postOrderTraverseNode(this.root, cb);
	}

	findMinNode (node) {
		let current = node;
		while (current && current.left) {
			current = current.left;
		}
		return current;
	}

	removeNodeLoop (node, value) {
		if (!node) {
			return null;
		}

		if (node.value < value) {
			node.right = this.removeNodeLoop(node.right, value);
			return node;
		}
		if (node.value > value) {
			node.left = this.removeNodeLoop(node.left, value);
			return node;
		}
		if (node.value === value) {
			if (!node.left && !node.right) {
				node = null;
				return node;
			}

			if (node.left && !node.right) {
				node = node.left;
				return node;
			}

			if (!node.left && node.right) {
				node = node.right;
				return node;
			}

			if (node.left && node.right) {
				const minNode = this.findMinNode(node.right);
				node.value = minNode.value;
				node.right = this.removeNodeLoop(node.right, minNode.value);
				return node;
			}
		}
	}

	removeNode (value) {
		this.root = this.removeNodeLoop(this.root, value);
		console.log(JSON.stringify(this.root));
	}
}

const binarySearchTree = new BinarySearchTree();
// root
binarySearchTree.insert(11);

binarySearchTree.insert(7);
binarySearchTree.insert(15);
binarySearchTree.insert(5);
binarySearchTree.insert(3);
binarySearchTree.insert(9);
binarySearchTree.insert(8);

console.log(JSON.stringify(binarySearchTree.root));

console.log(binarySearchTree.min);
console.log(binarySearchTree.max);
console.log(binarySearchTree.searchNode(7));
console.log(binarySearchTree.searchNode(555));

binarySearchTree.inOrderTraverse((node) => {
	console.log(node.value);
});

binarySearchTree.preOrderTraverse((node) => {
	console.log(node.value);
});

binarySearchTree.postOrderTraverse((node) => {
	console.log(node.value);
});

binarySearchTree.removeNode(7);