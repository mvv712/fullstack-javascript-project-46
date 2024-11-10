import getStylishTree from './stylish.js';
import getPlainTree from './plain.js';
import getJsonTree from './json.js';

export default (tree, format) => {
  if (format === 'stylish') {
    return getStylishTree(tree);
  } else if (format === 'plain') {
    return getPlainTree(tree);
  } else if (format === 'json') {
    return getJsonTree(tree);
  } else {
    throw new Error(`Cannot get formatter ${format}`);
  }
};
