var numIslands = function (grid) {
	let res = 0;
	// use a visited matrix and a dfs algorithm when traversing an unvisited land
	const row = grid.length;
	const col = grid[0].length;

	const visited = Array.from({ length: row }, () => Array(col).fill(false));
	for (let r = 0; r < row; r++) {
		for (let c = 0; c < col; c++) {
			if (grid[r][c] === "1" && !visited[r][c]) {
				dfs(grid, r, c, visited);
				res++;
			}
		}
	}
	console.log(visited);
	return res;
};

var dfs = function (grid, row, col, visited) {
	// sets the item's visited status
	const rowDir = [0, 0, -1, 1];
	const colDir = [-1, 1, 0, 0];

	for (let i = 0; i < 4; i++) {
		const adjR = row + rowDir[i];
		const adjC = col + colDir[i];

		if (isSafe(grid, adjR, adjC, visited)) {
			dfs(grid, adjR, adjC, visited);
		}
	}
};

var isSafe = function (grid, r, c, visited) {
	const row = grid.length;
	const col = grid.length[0];

	return (
		r >= 0 &&
		r < row &&
		c >= 0 &&
		c < col &&
		grid[r][c] === "1" &&
		!visited[r][c]
	);
};

var testGrid1 = [
	["1", "1", "1", "1", "0"],
	["1", "1", "0", "1", "0"],
	["1", "1", "0", "0", "0"],
	["0", "0", "0", "0", "0"],
];

///////

// this version uses less memory, and only 1 recursive helper function
// instead of making a visited grid, we flip the original grid to '0'
// as values are boolean, flipping to '0' marks connected land as visited
// and passes the recursive exit condition
var numIslands2 = function (grid) {
	let count = 0;

	// iterate through every item with nested loop
	for (let r = 0; r < grid.length; i++) {
		for (let c = 0; c < grid[0].length; i++) {
			if (grid[r][c] === "1") {
				count++;
				dfs(grid, r, c);
			}
		}
	}

	return count;
};

var dfs = function (grid, r, c) {
	// exit if out of bounds
	if (
		r < 0 ||
		c < 0 ||
		r >= grid.length ||
		c >= grid[0].length ||
		grid[r][c] === "0"
	) {
		return;
	}
	// otherwise flip to '0'
	grid[r][c] = "0";
	// and then recursively explore 4 directions
	dfs(grid, r, c + 1);
	dfs(grid, r + 1, c);
	dfs(grid, r, c - 1);
	dfs(grid, r - 1, c);
};
