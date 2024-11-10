import getStylishTree from './stylish.js';
import getPlainTree from './plain.js';

export default (tree, format) => {
  if (format === 'stylish') {
    return getStylishTree(tree);
  } if (format === 'plain') {
    return getPlainTree(tree);
  }
  throw new Error(`Cannot get formatter ${format}`);
};
