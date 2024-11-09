import _ from 'lodash';
import { getData } from './utils.js';

const createComparisonTree = (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const keys = _.union(keys1, keys2);
  let result = '';

  keys.sort((prev, next) => (prev > next ? 1 : -1));

  result = '{';
  for (const key of keys) {
    if (!Object.hasOwn(file1, key)) {
      result += `\n  + ${key}: ${file2[key]}`;
    } else if (!Object.hasOwn(file2, key)) {
      result += `\n  - ${key}: ${file1[key]}`;
    } else if (file1[key] !== file2[key]) {
      result += `\n  - ${key}: ${file1[key]}`;
      result += `\n  + ${key}: ${file2[key]}`;
    } else {
      result += `\n    ${key}: ${file1[key]}`;
    }
  }
  result += '\n}';

  return result;
};

const compareFiles = (filepath1, filepath2) => {
  const file1 = getData(filepath1);
  const file2 = getData(filepath2);

  return createComparisonTree(file1, file2);
};

export { compareFiles };
