var sumNumbers = function (root) {
	// decl array
	const arr = [];
	const link = [];
	let res = 0;
	// pass array and node to function
	getNum(root, arr, link);

	for (num of arr) {
		res += num;
	}
	return res;
};

var getNum = function (node, numArr, num) {
	let newNum = [...num, node.val];

	if (!node.left && !node.right) {
		numArr.push(parseInt(newNum.join("")));
	}

	if (node.left) getNum(node.left, numArr, newNum);
	if (node.right) getNum(node.right, numArr, newNum);
};
