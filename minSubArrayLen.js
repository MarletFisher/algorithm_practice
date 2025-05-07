// Given an array of positive integers nums and a positive integer target, return the minimal length of a whose sum is greater than or equal to target. If there is no such subarray, return 0 instead.

/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
	let res = 0;
	let resSum = 0;
	// O(n)
	nums.sort((a, b) => a - b);

	if (nums[0] > target) return 0;

	// set biggest possibility
	let right = nums.length - 1;
	while (nums[right] > target) {
		right--; // shift left
	}

	// naive case
	if (nums[right] == target) return 1;

	// last item is smaller than target, so start comparing subArraySum with target
	resSum += nums[right];
	// account for last item
	res++;

	for (let i = right - 1; i > -1; i--) {
		if (nums[i] + resSum > target) {
			// if subArraySum > target, then relinquish nums[right]
			resSum -= nums[right];
			// shift left
			right--;
			// subArr length stays the same
		} else {
			// subArr length increases by 1
			res++;
		}
		// and add nums[right]
		resSum += nums[i];

		// exit condition
		if (resSum == target) return res;
	}

	return 0;
};

var iterativeSolution = function (target, nums) {
	let res = 1;

	// O(n)
	nums.sort((a, b) => a - b);

	if (nums[0] > target) return 0;

	// set biggest possibility
	let last = nums.length - 1;
	while (nums[last] > target) {
		last--; // shift left
	}

	// naive check for substring 1
	if (nums[last] == target) return 1;

	// naive check for unfriendly nums
	if (last != 0 && nums[0] + nums[last] > target) return 0;

	// static set resSum at 0
	let resSum = 0;
	res++;
	while (res < nums.length) {
		// if biggest num is less than target, then substring must be min 2
		console.log("res at", res);

		let left = res - 2;
		let right = last;

		if (resSum == target) return res;

		while (left < right) {
			const sum = resSum + nums[left] + nums[right];
			console.log(sum, "=", resSum, "+", nums[left], "+", nums[right]);
			if (sum == target) {
				return res;
			} else if (sum > target) {
				right--;
			} else {
				left++;
			}
		}

		// recalc resSum at the end, by adding minimal substring
		resSum = 0;
		res++;
		// resSum starts at min possibility
		for (let i = 0; i < res - 2; i++) {
			resSum += nums[i];
		}
	}
};

var substringAlgorithm = function (target, nums) {
	// O(n)
	nums.sort((a, b) => a - b);

	if (nums[nums.length - 1] > target) return 1;

	// highest possibility must be target - first smallest number
	let high = nums.length - 1;
	while (high > 0 && nums[high] + nums[high - 1] > target) {
		high--;
	}

	// naive check for substring length 1
	if (nums[0] == target) return 1;
	// naive check for length 2
	if (nums[high] + nums[0] > target) return 0;

	let res = 2;
	let subMin = 0;

	while (res < nums.length) {
		let left = 0;
		let right = high - res + 2;

		for (let i = high; i > right; i--) {
			subMin += nums[i];
		}

		while (left < right) {
			const sum = subMin + nums[left] + nums[right];

			if (sum == target) {
				return res;
			} else if (sum > target) {
				left++;
			} else {
				right--;
			}
		}
	}
	res++;
};

var omgIDidntReadTheQuestion = function (target, nums) {
	let res = nums.length;
	let left = 0;
	let right = nums.length - 1;
	let sum = 0;

	for (let i = 0; i < nums.length; i++) {
		sum += nums[i];
	}

	console.log("total arr sum:", sum);

	while (sum >= target && res > 0) {
		if (nums[left] == nums[right]) {
			let tleft = left;
			let tright = right;
			while (nums[tleft] == nums[tright]) {
				tleft++;
				tright--;
			}
			sum -= nums[tleft] > nums[tright] ? nums[right] : nums[left];
			nums[tleft] > nums[tright] ? right-- : left++;
		} else if (nums[left] < nums[right]) {
			sum -= nums[right];
			right--;
		} else {
			sum -= nums[left];
			left++;
		}

		console.log("final sum is", sum);
		console.log("left idx:", left);
		console.log("right idx:", right);

		if (sum < target) {
			return res;
		}

		res--;
	}
	return 0;
};

var slidingWindow = function (target, nums) {
	if (nums[0] >= target) return 1;

	let left = 0;
	let right = 1;

	let minLength = nums.length;
	let sum = nums[left] + nums[right];

	// naive check
	if (nums.length == 1 && nums[0] < target) return 0;

	// while window exists && not all subarrays have been checked
	while (left < right && right < nums.length) {
		// console.log("l:", left);
		// console.log("r:", right);

		if (sum < target) {
			right++;
			if (right < nums.length) {
				sum += nums[right];
			}
		} else {
			if (sum >= target && right - left < minLength)
				minLength = right - left + 1;
			sum -= nums[left];
			left++;
		}
		// console.log("sum is", sum);
		// console.log("minLength", minLength);
	}
	if (nums[nums.length - 1] >= target) return 1;
	if (right == nums.length - 1 && left == right && sum >= target)
		return minLength;
	if (left == 0 && right == nums.length && sum < target) return 0;

	return minLength;
};

let arr1 = [1, 2, 3, 4, 5];
// let arr2 = [2, 3, 1, 2, 4, 3];
let arr3 = [1, 1, 1, 1, 1, 1, 1, 1];
let arr4 = [5];
let arr5 = [1, 1, 1, 1, 7];
// console.log(slidingWindow(11, arr1));
// console.log(slidingWindow(7, arr2));
// console.log(slidingWindow(11, arr3));
// console.log(slidingWindow(15, arr1));
// console.log(slidingWindow(7, arr4));
console.log(slidingWindow(7, arr5));
