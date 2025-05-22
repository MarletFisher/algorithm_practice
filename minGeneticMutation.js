var minMutation = function (startGene, endGene, bank) {
	// search bank for genes with 1 mutation
	let res = possibleMutation(startGene, endGene, [], bank);
	// if found, add gene to chain
	// repeat until endgene found
	return res;
};

var possibleMutation = function (currGene, endGene, chain, bank) {
	let mut = 0;
	let res = -1;
	let chainVariation = [...chain];

	if (currGene.localeCompare(endGene) === 0) {
		return chain.length;
	}
	// for every gene
	for (let g = 0; g < bank.length; g++) {
		// for every letter
		for (let i = 0; i < 8; i++) {
			// count differences
			if (currGene[i] !== bank[g][i]) {
				mut++;
			}
		}
		// if only 1 difference, it is a mutation
		if (mut === 1) {
			chainVariation.push(currGene);
			res = possibleMutation(bank[g], endGene, chainVariation, bank);
		}
		// otherwise gene is too different, not a mutation
	}
	return res;
};

var minMutation2 = function (startGene, endGene, bank) {
	let res = -1;
	let chain = [];
	let path = [];
	const pathMap = new Map();
	let depth = 0;
	let currentGene = startGene;
	// check pool for possible mutation
	for (let g = 0; g < bank.length; g++) {
		if (g === path[path.length - 1]) continue;
		let count = 0;
		// count differences
		for (let i = 0; i < 8; i++) {
			if (currentGene[i] !== bank[g][i]) count++;
		}
		// if 1 difference, and has not been traversed, it is mutation
		if (count === 1 && !pathMap.has(g)) {
			// push currentGene to chain
			chain.push(currentGene);
			// push mutation idx to path
			path.push(g);
			// push to map
			pathMap.set(g, bank[g]);
			// increase depth
			depth++;
			// reassign currentGene
			currentGene = bank[g];
			// reset g to 0
			g = 0;
		}
		console.log("path:", path);
		console.log("comparing idx", path[path.length - 1], g);
		console.log(
			"localeCompare result",
			currentGene.localeCompare(endGene) === 0
		);
		// if gene matches endGene, return chain length
		if (currentGene.localeCompare(endGene) === 0) {
			if (res === -1 || chain.length < res) res = chain.length;
		}

		// if endGene not found, slice chain, and rollback depth by 1, return g to what it was
		if (g === bank.length - 1 && depth > 0) {
			currentGene = chain.pop();
			g = path.pop();
			depth--;
		}
	}
	return res;
};

var minMutation3 = function (startGene, endGene, bank) {
	const idxPath = [];
	const lineage = [];
	const pathSet = new Set();

	let res = -1;
	let currGene = startGene;

	// for every gene
	for (let g = 0; g < bank.length; g++) {
		// compare genes to currGene
		const currPath = idxPath.join("") + g;
		console.log("currPath", currPath);
		let count = 0;
		for (let i = 0; i < 8; i++) {
			if (currGene[i] != bank[g][i]) count++;
		}
		// if 1 char diff, step into gene, log path and gene, and add current path to set
		if (count === 1 && !pathSet.has(currPath)) {
			pathSet.add(currPath);
			idxPath.push(g);
			lineage.push(bank[g]);
			currGene = bank[g];
		}
		console.log("comparing", currGene, endGene);
		// if currGene is endGene, log res or lowscore
		if (currGene.localeCompare(endGene) === 0) {
			if (res === -1 || idxPath.length < res) {
				console.log("assigning");
				res = idxPath.length;
			}
		}
		console.log(idxPath);
		console.log(lineage);
		// if done loop and path is not empty, pop lineage and path and try again
		if (g === bank.length - 1 && idxPath.length) {
			idxPath.pop();
			g = 0;
			lineage.pop();
			currGene = lineage.length ? lineage[lineage.length - 1] : startGene;
			console.log("g is now", g);
			console.log("currGene", currGene);
		}
	}
	return res;
};

// ( O(n * m * 4) ) — n = length of bank, m = gene length (fixed at 8), 4 possible mutations per position.
var minMutation4 = function (startGene, endGene, bank) {
	// create set from bank
	const geneSet = new Set(bank);
	// naive case
	if (!geneSet.has(endGene) && startGene !== endGene) return -1;

	// decl visited set
	const visited = new Set([startGene]);
	// decl queue
	const queue = [[startGene, 0]];

	// while queue is not empty
	while (queue.length > 0) {
		// decl current gene and steps
		const [gene, steps] = queue.shift();
		// if gene is endgene, return the number of steps
		if (gene === endGene) return steps;
		// otherwise, iterate through gene string
		for (let i = 0; i < gene.length; i++) {
			// for every letter of ACGT
			for (const c of "ACGT") {
				// if gene[i] is not that char
				if (gene[i] !== c) {
					// decl mutation variant
					const mutated = gene.slice(0, i) + c + gene.slice(i + 1);
					// if bank set has and it is not visited, then step in by pushing to queue with step
					if (geneSet.has(mutated) && !visited.has(mutated)) {
						visited.add(mutated);
						queue.push([mutated, steps + 1]);
					}
				}
			}
		}
	}
	// if not found, return -1
	return -1;
};

// H3C 1E8
