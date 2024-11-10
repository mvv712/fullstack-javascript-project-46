import getStylishTree from './stylish.js';
import getPlainTree from './plain.js';
import getJsonTree from './json.js';

export default (tree, format) => {
  if (format === 'stylish') {
    return getStylishTree(tree);
  } if (format === 'plain') {
    return getPlainTree(tree);
  } if (format === 'json') {
    return getJsonTree(tree);
  }
  throw new Error(`Cannot get formatter ${format}`);
};
