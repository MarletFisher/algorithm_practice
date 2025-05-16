var longestConsecutive = function (nums) {
	// O(2n) ~O(n)
	if (nums.length === 0) return 0;

	nums.sort((a, b) => a - b);
	let high = 1;
	let cons = 1;
	let i = 1;

	while (i < nums.length) {
		if (nums[i] === nums[i - 1] + 1) {
			cons++;
			if (cons > high) high = cons;
		} else if (nums[i] !== nums[i - 1]) {
			cons = 1;
		}
		i++;
	}

	return high;
};
