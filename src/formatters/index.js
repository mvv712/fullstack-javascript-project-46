import _ from 'lodash';
import getStylishTree from './stylish.js';
import getPlainTree from './plain.js';
import getJsonTree from './json.js';

const formatters = {
  stylish: getStylishTree,
  plain: getPlainTree,
  json: getJsonTree,
};

export default (format, tree) => {
  if (!(_.has(formatters, format))) {
    throw new Error(`Cannot get formatter ${format}`);
  }

  const getFormatter = formatters[format];
  return getFormatter(tree);
};
