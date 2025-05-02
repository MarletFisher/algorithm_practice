// Given an integer array nums sorted in non-decreasing order, remove some duplicates in-place such that each unique element appears at most twice. The relative order of the elements should be kept the same.

// Since it is impossible to change the length of the array in some languages, you must instead have the result be placed in the first part of the array nums. More formally, if there are k elements after removing the duplicates, then the first k elements of nums should hold the final result. It does not matter what you leave beyond the first k elements.

// Return k after placing the final result in the first k slots of nums.

// Do not allocate extra space for another array. You must do this by modifying the input array in-place with O(1) extra memory.

var removeDuplicates = function (nums) {
	let ptr = 2; // pointer for current idx
	let n = 0; // number of duplicates found, meaning k = nums.length - n
	let d = 2; // dupe distance

	if (nums.length < 3) {
		return nums.length;
	} // if the array cannot have 3 duplicates, return

	while (ptr < nums.length - n) {
		nums[ptr] = nums[ptr + n];
		if (nums[ptr] == nums[ptr - d]) {
			// console.log("hit");
			let temp = 1 + n; // look ahead
			n++;
			while (nums[ptr] == nums[ptr + temp]) {
				temp++;
				n++;
			}
			nums[ptr] = ptr + temp > nums.length - 1 ? -1 : nums[ptr + temp];
		}
		ptr++;
	}

	return nums.length - n;
};

// textbook answer

var betterMethod = function (nums) {
	if (nums.length <= 2) return nums.length;

	let k = 2;

	// uses an iterative pointer to find the next nonduplicate number and will only move k when it does NOT find a dupe
	for (let i = 2; i < nums.length; i++) {
		if (nums[i] != nums[k - 2]) {
			nums[k] = nums[i];
			k++;
		}
	}
	return k;
};

console.log("------");
let arr1 = [1, 1, 1, 2, 2, 3];
let arr2 = [0, 0, 1, 1, 1, 1, 2, 3, 3];

console.log(betterMethod(arr1));
console.log(arr1);

console.log(betterMethod(arr2));
console.log(arr2);
