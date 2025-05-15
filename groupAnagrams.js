var groupAnagrams = function (strs) {
	// declare res 2darr
	// for each word in strs
	// split() and sort()
	// compare for each element in res[0].split().sort()
	// if not exists
	// push to new arr in res

	let res = [];
	// n
	for (word of strs) {
		let flag = false;
		let sortedWord = word.split("").sort().join("");
		// n^2
		for (let i = 0; i < res.length; i++) {
			let sortedRes = res[i][0].split("").sort().join("");
			if (word.length != res[i][0].length) {
				continue;
			} else if (sortedWord.localeCompare(sortedRes) == 0) {
				flag = true;
				res[i].push(word);
			}
		}
		if (flag == false) {
			res.push([word]);
		}
		console.log("after itr, res is", res);
	}

	return res;
};

let test1 = ["eat", "tea", "tan", "ate", "nat", "bat"];
console.log(groupAnagrams(test1));
// naive attempt works but too slow, O(n^2)

// O(n*k)
// using hash using frequency of letters in alphabet, and then using map

const MAX_CHAR = 26;

// Function to generate hash of word s
function getHash(str) {
	let freq = Array(MAX_CHAR).fill(0);

	// Count frequency of each character
	for (let i = 0; i < str.length; i++) {
		let ch = str[i];
		freq[ch.charCodeAt(0) - "a".charCodeAt(0)] += 1;
		// increment alphabet arr at idx distance from charCode of 'a'
		// e.g. char codes d - a = 3
		// increment idx 3
	}

	// Create hash string using join to avoid string concatenation in the loop
	let hashArray = [];
	for (let i = 0; i < MAX_CHAR; i++) {
		hashArray.push(freq[i].toString());
		hashArray.push("$");
	}

	return hashArray.join("");
}

function anagrams(arr) {
	let res = [];
	let mp = new Map();

	for (let i = 0; i < arr.length; i++) {
		let key = getHash(arr[i]);

		// If key is not present in the hash map, add
		// an empty group (array) in the result and
		// store the index of the group in hash map
		if (!mp.has(key)) {
			mp.set(key, res.length);
			res.push([]);
		}

		// Insert the string in its correct group
		res[mp.get(key)].push(arr[i]);
	}
	return res;
}

// Driver Code
let arr = ["act", "god", "cat", "dog", "tac"];
let res = anagrams(arr);

for (let i = 0; i < res.length; i++) {
	let temp = "";
	for (let j = 0; j < res[i].length; j++) {
		temp += res[i][j] + " ";
	}
	console.log(temp);
}

var groupAnagrams3 = function (strs) {
	let groups = {};
	// for every word in strs arr
	for (let i = 0; i < strs.length; i++) {
		// get the arr of the idx word
		let words = strs[i];
		let chars = words.split("");
		// then for every letter of idx word
		for (let j = 0; j < chars.length - 1; j++) {
			// for every remaining letter of idx word
			for (let k = j + 1; k < chars.length; k++) {
				// if jletter comes after kletter,
				if (chars[j] > chars[k]) {
					// reorder
					let temp = chars[j];
					chars[j] = chars[k];
					chars[k] = temp;
				}
			}
		}

		// create key with sortedword
		let key = chars.join("");

		// use object key lookup to push word into groups obj
		if (groups[key] === undefined) {
			groups[key] = [words];
		} else {
			groups[key].push(words);
		}
	}

	let result = [];

	// push every key in obj
	for (let key in groups) {
		result.push(groups[key]);
	}
	return result;

	// sort every word to obtain a key, and use obj key lookup to set words
};
