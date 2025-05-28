// Given two integers n and k, return all possible combinations of k numbers chosen from the range [1, n].
var combine = function (n, k) {
	if (k === 0) return [[]];

	const result = [];
	const stack = [[]];

	while (stack.length > 0) {
		const current = stack.pop();
		const start = current.length ? current[current.length - 1] + 1 : 1;

		for (let i = start; i <= n; i++) {
			const next = [...current, i];
			if (next.length === k) {
				result.push(next);
			} else {
				stack.push(next);
			}
		}
	}

	return result;
};

var combinations = function (n, k) {
	let res = [];
	let combo = [];

	var backtrack = function (start) {
		if (combo.length === k) {
			res.push([...combo]);
			return;
		}

		for (let num = start; num <= n; num++) {
			combo.push(num);
			backtrack(num + 1);
			combo.pop();
		}
	};

	backtrack(1);
	return res;
};

let testArr = [1, 2, 3, 4, 5];
let n = 5;

console.log(testArr, n);
