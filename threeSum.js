/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
	const last = nums.length - 1;
	let res;
	// loop through each number until n-2, using it, middle ptr, and last digit
	for (let i = 0; i < nums.length - 2; i++) {
		for (let j = i + 1; j < nums.length - 1; j++) {
			if (nums[i] + nums[j] + nums[last] == 0) {
				res.push([nums[i], nums[j]]);
			}
		}
	}
};

var test = [-1, 0, 1, 2, -1, -4];

var foo = function (nums) {
	const max = nums.length - 1;
	let last = 2;
	let mid = 1;
	let first = 0;
	let res = [];

	function compare(arr1, arr2) {
		for (let i = 0; i < 3; i++) {
			if (arr1[i] != arr2[i]) return false;
		}
		return true;
	}

	nums.sort((a, b) => a - b);
	console.log("sorted nums:", nums);

	if (nums.length < 3) return [];
	// (
	//   nums[first] + nums[mid] + nums[last] == 0 && res[0]
	//     ? compare(res[res.length - 1], arr) == false
	//     : 1
	// )
	while (first <= max - 2) {
		while (last <= max) {
			while (mid < last) {
				let arr = [nums[first], nums[mid], nums[last]];
				console.log(arr, first, mid, last);
				if (
					nums[first] + nums[mid] + nums[last] == 0 &&
					(res[0] ? compare(res[res.length - 1], arr) == false : true)
				) {
					res.push(arr);
					console.log("push");
				}
				mid++;
			}
			mid = first + 1;
			last++;
		}
		first++;
		mid = first + 1;
		last = first + 2;
	}

	return res;
};

// console.log(foo(test));

function hashMapAlgorithm(arr) {
	// Map to store indices for each value
	let map = new Map();

	// Resultant array
	let ans = [];

	// Check for all pairs i, j
	for (let j = 0; j < arr.length; j++) {
		for (let k = j + 1; k < arr.length; k++) {
			// Value of third index should be
			let val = -1 * (arr[j] + arr[k]);

			// If such indices exist
			if (map.has(val)) {
				// Append the i, j, k
				for (let i of map.get(val)) {
					ans.push([i, j, k]);
				}
			}
		}

		// After j'th index is traversed
		// We can use it as i.
		if (!map.has(arr[j])) {
			map.set(arr[j], []);
		}
		map.get(arr[j]).push(j);
	}

	return ans;
}

// console.log("hashMapAlgorithm");
// console.log(hashMapAlgorithm([-2, 1, 1, 1, 1, 1, 1, 1]));

var myAlgorithm = function (nums) {
	let res = [];
	function compareTriplet(tri1, tri2) {
		for (let i = 0; i < 3; i++) {
			if (tri1[i] != tri2[i]) return false;
		}
		return true;
	}

	if (nums.length < 3) {
		return [];
	}

	// O(n log n)
	nums.sort((a, b) => a - b);

	if (nums[0] == 0 && nums[nums.length - 1] == 0) return [[0, 0, 0]];

	// O(n * 3)
	for (let h = 0; h < nums.length - 2; h++) {
		if (h > 0 && nums[h] == nums[h - 1]) continue;

		for (let i = h + 1; i < nums.length - 1; i++) {
			if (nums[i] == nums[i - 1] && i > h + 1) continue;
			for (let j = i + 1; j < nums.length; j++) {
				if (nums[j] == nums[j - 1] && j > i + 1) continue;
				let req = -1 * (nums[i] + nums[j]);
				// console.log("comparing", nums[i], nums[j]);
				if (req == nums[h]) {
					let arr = [req, nums[i], nums[j]];
					if (res[0] ? !compareTriplet(arr, res[res.length - 1]) : true) {
						res.push(arr);
						// console.log("pushed", h, nums[i], nums[j]);
					}
				}
			}
		}
	}

	return res;
};

var basictest = [-1, 0, 1, 2, -1, -4];
var fourZero = [0, 0, 0, 0];
var manyDuplicates = [-1, -1, -1, -1, 0, 0, 0, 0, 1, 1, 1, 1];

console.log(myAlgorithm(manyDuplicates));

// O(n*2) - using grouping approach
var fasterAlgorithm = function (nums) {
	const res = [];

	nums.sort((a, b) => a - b);

	// for first digit
	for (let i = 0; i < nums.length - 2; i++) {
		if (i > 0 && nums[i] == nums[i - 1]) continue;

		let left = i + 1;
		let right = nums.length - 1;

		while (left < right) {
			const sum = nums[i] + nums[left] + nums[right];
			if (sum == 0) {
				res.push([nums[i], nums[left], nums[right]]);
				// proceed to skip dupe, as same digits precede others
				while (left < right && nums[left] == nums[left + 1]) left++;
				while (left < right && nums[right] == nums[right + 1]) right--;
				left++; // shift left ptr right
				right--; // shift right ptr left
			} else if (sum < 0) {
				// if sum missed under
				// shift right
				left++;
			} else {
				// sum must be over
				// shift left
				right--;
			}
		}
	}
	return res;
};
