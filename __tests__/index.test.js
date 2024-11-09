import path from 'path';
import { composeFilepath, readFile } from '../src/utils.js';
import { getParser } from '../src/parsers.js';
import { compareFiles } from '../src/index.js';

const __dirname = composeFilepath('__tests__');
const getCurrentPath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const types = [
  ['json', 'json'],
  ['yaml', 'yaml'],
];

test.each(types)('gendiff filepath1.%s filepath2.%s', (type1, type2) => {
  const file1 = getCurrentPath(`file1.${type1}`);
  const file2 = getCurrentPath(`file2.${type2}`);

  const result = compareFiles(file1, file2);
  const expected = readFile(getCurrentPath('result.txt'));

  expect(result).toEqual(expected);
});
