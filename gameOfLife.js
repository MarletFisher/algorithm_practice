// Any live cell with fewer than two live neighbors dies as if caused by under-population.
// Any live cell with two or three live neighbors lives on to the next generation.
// Any live cell with more than three live neighbors dies, as if by over-population.
// Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

var gameOfLife = function (board) {
	const row = board.length;
	const col = board[0].length;
	const save = Array.from({ length: row });

	// O(m*n)
	for (let r = 0; r < save.length; r++) {
		save[r] = [...board[r]];
	}

	// O(m*n)
	// loop through each coordinate
	// for each row
	for (let r = 0; r < row; r++) {
		// of each column
		for (let c = 0; c < col; c++) {
			// check if cell is dead or alive
			// if cell is alive
			const neighbours = countNeighbours(save, r, c);
			if (save[r][c]) {
				// if cell has <2 neighbours or >3 neighbours
				// assign dead
				if (neighbours < 2 || neighbours > 3) {
					board[r][c] = 0;
				}
				// if cell has 2 or 3 neighbours
				// assign prev
				else if (neighbours === 2 || neighbours === 3) {
					board[r][c] = save[r][c];
				}
				// else cell is dead
			} else if (neighbours === 3) {
				// if cell has 3 neighbours
				// assign live
				board[r][c] = 1;
			}
		}
	}

	board = nextBoard; // assign ref to new state
	console.log(nextBoard);
};

var countNeighbours = function (board, r, c) {
	let count = 0;
	console.log("reading board[" + r + "][" + c + "]");
	// results are either undefined/out of bounds, negative, or positive
	// up-right
	if (r + 1 < board.length && c - 1 >= 0 && board[r + 1][c - 1]) count++;
	//right
	if (r + 1 < board.length && board[r + 1][c]) count++;
	// down-right
	if (r + 1 < board.length && c + 1 < board[0].length && board[r + 1][c + 1])
		count++;
	//down
	if (c + 1 < board[0].length && board[r][c + 1]) count++;
	//left down
	if (r - 1 >= 0 && c + 1 < board[0].length && board[r - 1][c + 1]) count++;
	//left
	if (r - 1 >= 0 && board[r - 1][c]) count++;
	// up left
	if (r - 1 >= 0 && c - 1 >= 0 && board[r - 1][c - 1]) count++;
	//up
	if (c - 1 >= 0 && c - 1 < board[0].length && board[r][c - 1]) count++;
	console.log("has", count, "neighbours");
	return count;
};
