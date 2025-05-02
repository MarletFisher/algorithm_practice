// Implement a function that returns an updated array with r right rotations on array a.

var rightRotations = function (a, r) {
	let temp = a.length >= r ? a.splice(a.length - r, r) : a;
	// console.log("temp is", temp);
	// console.log("a is", a);
	a = temp.concat(a);
	return a;
};

let testArr1 = [5, 2, 3, 4, 1];
// console.log(rightRotations(testArr1, 2));

// Rotating 1 by 1 would cost O(n*d)
// This method takes advantage of js built in operations

// juggling algorithm

// reversal algorithm, O(n)
var reversalAlgorithm = function (a, r) {
	let r_arr = reverse(a);
	let segment = r_arr.splice(0, r);
	let r_seg = reverse(segment);
	reverse(r_arr);

	return r_seg.concat(r_arr);
};

var reverse = function (arr) {
	let start = 0;
	let end = arr.length - 1;

	while (start < end) {
		const temp = arr[start];
		arr[start] = arr[end];
		arr[end] = temp;

		start++;
		end--;
	}

	return arr;
};

console.log("reversalAlgorithm testArr1,", reversalAlgorithm(testArr1, 2));
