var arr = [-1, 0, 1, 2, -1, -4];
var arr2 = [0, 0, 0, 0];

var arr3 = [[0, 0, 0]];
var arr4 = [0, 0, 0];
var arr5 = [0, 0, 1];

function hashmapTest(arr) {
	let map = new Map();

	for (let i = 0; i < arr.length; i++) {
		for (let j = i + 1; j < arr.length; j++) {
			// let val = -1 * (arr[j] + arr[k]);
			// console.log(i, j);
		}

		// if map does not have key of arr[i]
		if (!map.has(arr[i])) {
			map.set(arr[i], []); // add key of arr[i] => [];
		}
		map.get(arr[i]).push(i); // add to the key of arr[i] value of idx
	}

	console.log(map);
}

// hashmapTest(arr);
var m = new Map();



for (let i of m.get([1])) {
	console.log(i);
}
