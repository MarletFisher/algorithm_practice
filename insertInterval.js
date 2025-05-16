var insert = function (intervals, newInterval) {
	let low_ptr = 0;
	let high_ptr;

	let low_val = newInterval[0];
	let high_val = newInterval[1];

	// naive check for empty intervals
	if (intervals.length === 0) return [newInterval];
	// naive check for [0,0]
	if (newInterval[1] < intervals[0][0]) return [newInterval, ...intervals];
	// naive check for large newInterval
	if (newInterval[0] > intervals[intervals.length - 1][1])
		return [...intervals, newInterval];
	// naive check for interval size 1
	if (intervals.length === 1 && newInterval[0] > intervals[low_ptr][1]) {
		intervals.push(newInterval);
		return intervals;
	}

	// check first interval
	if (newInterval[0] >= 0 && newInterval[0] <= intervals[low_ptr][1]) {
		low_val = newInterval[0] === 0 ? 0 : intervals[low_ptr][0];
	} else {
		low_ptr++;
		// if newInterval wasn't in the first interval, then
		while (low_ptr < intervals.length) {
			// check if newInterval[0] is between last interval's high, and itr intervals high
			if (
				newInterval[0] > intervals[low_ptr - 1][0] &&
				newInterval[0] <= intervals[low_ptr][1]
			) {
				// assign low_val depending on which val is lower
				low_val =
					newInterval[0] < intervals[low_ptr][0]
						? newInterval[0]
						: intervals[low_ptr][0];
				//

				break;
			} else {
				// itr++
				low_ptr++;
			}
		}
	}

	intervals[low_ptr][0] = low_val;

	// now traversing for high
	high_ptr = low_ptr;

	// if there is no next interval or if it is under next low
	if (
		intervals[high_ptr + 1] === undefined ||
		newInterval[1] < intervals[high_ptr + 1][0]
	) {
		// assign high val to highest
		intervals[high_ptr][1] =
			newInterval[1] > intervals[high_ptr][1]
				? newInterval[1]
				: intervals[high_ptr][1];
	} else if (newInterval[1] == intervals[high_ptr][0]) {
		intervals[high_ptr - 1][1] = high_val;
		intervals.splice(high_ptr, 1);
	} else {
		// same logic
		high_ptr++;
		console.log("high_ptr while loop");
		while (high_ptr < intervals.length) {
			if (newInterval[1] < intervals[high_ptr][0]) {
				intervals[high_ptr - 1][1] = high_val;
				break;
			} else if (newInterval[1] <= intervals[high_ptr][1]) {
				console.log("assigning");
				intervals[high_ptr - 1][1] = intervals[high_ptr][1];
				break;
			} else {
				intervals.splice(high_ptr, 1);
			}
		}
		console.log("high_ptr", high_ptr);
		if (
			intervals[high_ptr - 1] != undefined &&
			intervals[high_ptr - 1][1] >= intervals[high_ptr][0]
		)
			intervals.splice(high_ptr, 1);
	}

	if (newInterval[1] > intervals[intervals.length - 1][1]) {
		intervals[intervals.length - 1][1] = newInterval[1];
	}

	return intervals;
};

var insert2 = function (intervals, newInterval) {
	let ptr = 0;
	let min = 0;
	let res = [];
	const low = newInterval[0];
	const high = newInterval[1];

	// naive check for empty intervals
	if (intervals.length === 0) return [newInterval];

	// find low window
	while (ptr < intervals.length) {
		if (low < intervals[ptr][0]) {
			res.push([low, high]);
			break;
		} else if (low >= intervals[ptr][0] && low <= intervals[ptr][1]) {
			res.push([intervals[ptr][0], high]);
			break;
		} else {
			res.push(intervals[ptr]);
			ptr++;
		}
	}

	// naive check for low not found
	if (ptr === intervals.length) return [...res, newInterval];

	// ptr++;

	// find high window
	while (ptr < intervals.length) {
		if (high >= intervals[ptr][0]) {
			if (high <= intervals[ptr][1]) {
				res[res.length - 1][1] = intervals[ptr][1];
			}
		} else {
			res.push(intervals[ptr]);
		}
		console.log("test");
		ptr++;
	}

	return res;
};

let testInterval1 = [
	[1, 2],
	[3, 5],
	[6, 7],
	[8, 10],
	[12, 16],
];
console.log(insert2(testInterval1, [4, 8]));

let testInterval2 = [
	[1, 3],
	[6, 9],
];
// console.log(insert(testInterval2, [2, 5]));

let testInterval3 = [
	[0, 0],
	[1, 3],
	[5, 11],
];
// console.log(insert(testInterval3, [0, 3]));

let testInterval4 = [
	[0, 0],
	[2, 4],
	[9, 9],
];
console.log(insert2(testInterval4, [0, 7]));

let testInterval5 = [
	[2, 3],
	[5, 7],
];
// console.log(insert(testInterval5, [0, 6]));

let testInterval6 = [
	[1, 5],
	[6, 8],
];
// console.log(insert(testInterval6, [0, 9]));

let testInterval7 = [
	[3, 5],
	[12, 15],
];
console.log(insert2(testInterval7, [6, 6]));
