var binarySearch = function (arr, n) {
	let min_idx = 0;
	let max_idx = arr.length - 1;
	let mid = Math.floor(max_idx / 2);

	let operations = 0;

	while (arr[mid] != n && min_idx < max_idx) {
		if (n > arr[mid]) {
			min_idx = mid + 1;
			mid = Math.floor((max_idx + min_idx) / 2);
		} else {
			max_idx = mid - 1;
			mid = Math.floor((max_idx + min_idx) / 2);
		}
		operations++;
	}

	return arr[mid] == n
		? "after " + operations + " operations, found " + arr[mid]
		: "did not find";
};

// Testing

let testArr = [1, 4, 5, 7, 8, 12, 15, 19];
console.log(binarySearch(testArr, 7));
console.log(binarySearch(testArr, 5));
console.log(binarySearch(testArr, 13));

let testArr2 = [1, 3];
console.log(binarySearch(testArr2, 1));
console.log(binarySearch(testArr2, 3));
console.log(binarySearch(testArr2, 2));

let testArr3 = [5];
console.log(binarySearch(testArr3, 5));
console.log(binarySearch(testArr3, 2));
