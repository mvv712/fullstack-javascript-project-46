import fs from 'fs';
import { compareFiles } from '../src/index.js';

test('compareFiles', () => {
	const file1 = fs.readFileSync(`${__dirname}/../__fixtures__/file1.json`, 'utf-8');
	const file2 = fs.readFileSync(`${__dirname}/../__fixtures__/file2.json`, 'utf-8');

	const result = compareFiles(file1, file2);
	const expected = '{\n- follow: false\n  host: hexlet.io\n- proxy: 123.234.53.22\n- timeout: 50\n+ timeout: 20\n+ verbose: true\n}';

	expect(result).toEqual(expected);
});