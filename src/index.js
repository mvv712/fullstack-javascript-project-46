import _ from 'lodash';
import getParserTree from './parsers.js';
import { getFileType, readFile } from './utils.js';
import getFormatTree from './formatters/index.js';

const getData = (filepath) => {
  const file = readFile(filepath);
  const fileType = getFileType(filepath);

  return getParserTree(file, fileType);
};

const createComparisonTree = (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const keys = _.union(keys1, keys2);

  const sortKeys = _.sortBy(keys);

  return sortKeys.map((key) => {
    if (!_.has(file1, key)) {
      return { status: 'received', key, value: file2[key] };
    }
    if (!_.has(file2, key)) {
      return { status: 'expected', key, value: file1[key] };
    }
    if (_.isEqual(file1[key], file2[key])) {
      return { status: 'matched', key, value: file1[key] };
    }

    if (_.isPlainObject(file1[key]) && _.isPlainObject(file2[key])) {
      const children = createComparisonTree(file1[key], file2[key]);
      return { status: 'nested', key, children };
    }

    return { status: 'exchanged', key, value: { first: file1[key], second: file2[key] } };
  });
};

export default (filepath1, filepath2, format = 'stylish') => {
  const file1 = getData(filepath1);
  const file2 = getData(filepath2);

  const tree = createComparisonTree(file1, file2);

  return getFormatTree(tree, format);
};
