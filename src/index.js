import fs from "fs";
import path from "path";
import _ from "lodash";

const parseFiles = (filepath1, filepath2) => {
	const file1 = JSON.parse(fs.readFileSync(path.resolve(filepath1)));
	const file2 = JSON.parse(fs.readFileSync(path.resolve(filepath2)));
	console.log(file1);
	console.log(file2);
}

const diffFiles = (filepath1, filepath2) => {
	const file1 = JSON.parse(fs.readFileSync(path.resolve(filepath1)));
	const file2 = JSON.parse(fs.readFileSync(path.resolve(filepath2)));

	const keys1 = Object.keys(file1);
	const keys2 = Object.keys(file2);
	const keys = _.union(keys1, keys2);

	keys.sort((prev, next) => prev > next ? 1 : -1);

	let result = '{';
	for (const key of keys) {
		if (!Object.hasOwn(file1, key)) {
			result += `\n  + ${key}: ${file2[key]}`;
		} else if (!Object.hasOwn(file2, key)) {
			result += `\n  - ${key}: ${file1[key]}`;;
		} else if (file1[key] !== file2[key]) {
			result += `\n  - ${key}: ${file1[key]}`;
			result += `\n  + ${key}: ${file2[key]}`;
		} else {
			result += `\n    ${key}: ${file1[key]}`;
		}
	}
	result += '\n}';

	console.log(result);
}

export { parseFiles, diffFiles };