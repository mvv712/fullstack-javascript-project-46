import fs from "fs";
import path from "path";

export default (filepath1, filepath2) => {
	const file1 = JSON.parse(fs.readFileSync(path.resolve(filepath1)));
	const file2 = JSON.parse(fs.readFileSync(path.resolve(filepath2)));
	console.log(file1);
	console.log(file2);
}