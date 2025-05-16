var levelOrder = function (root) {
	if (root === null) return [];

	let queue = [];
	let res = [];
	let level = 0;

	queue.push(root);

	while (queue.length > 0) {
		let len = queue.length;
		// create array for level
		res.push([]);

		for (let i = 0; i < len; i++) {
			let node = queue.shift();
			res[level].push(node.value);

			if (node.left !== null) queue.push(node.left);

			if (node.right !== null) queue.push(node.right);
		}

		currLevel++;
	}
	return res;
};

var main = function (root) {
	let res = [];

	traverse(root, 0, res);

	return res;
};

var traverse = function (node, lvl, arr) {
	if (arr[lvl] === undefined) {
		arr[lvl] = [];
	}

	arr[lvl].push(node.value);

	if (node.left) {
		traverse(node.left, lvl + 1, arr);
	} else {
		arr[lvl].push(null);
	}
	if (node.right) {
		traverse(node.right, lvl + 1, arr);
	} else {
		arr[lvl].push(null);
	}

	return arr;
};

class Node {
	constructor(value) {
		this.value = value;
		this.left = null;
		this.right = null;
	}
}
