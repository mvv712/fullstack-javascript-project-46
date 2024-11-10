import _ from 'lodash';
import { getData } from './utils.js';
import getFormatTree from './formatters/index.js';

const createComparisonTree = (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const keys = _.union(keys1, keys2);

  keys.sort((prev, next) => (prev > next ? 1 : -1));

  return keys.map((key) => {
    if (!_.has(file1, key)) {
      return { stat: 'received', key, value: file2[key] };
    }
    if (!_.has(file2, key)) {
      return { stat: 'expected', key, value: file1[key] };
    }
    if (file1[key] === file2[key]) {
      return { stat: 'matched', key, value: file1[key] };
    }

    if (_.isPlainObject(file1[key]) && _.isPlainObject(file2[key])) {
      const value = createComparisonTree(file1[key], file2[key]);
      return { stat: 'nested', key, value };
    }

    return { stat: 'exchanged', key, value: { old: file1[key], new: file2[key] } };
  });
};

export default (filepath1, filepath2, format = 'stylish') => {
  const file1 = getData(filepath1);
  const file2 = getData(filepath2);

  const tree = createComparisonTree(file1, file2);
  return getFormatTree(tree, format);
};
