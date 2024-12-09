import _ from 'lodash';
import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yaml: yaml.load,
  yml: yaml.load,
};

export default (tree, fileType) => {
  if (!(_.has(parsers, fileType))) {
    throw new Error(`Cannot get parser for "${fileType}"`);
  }

  const getParser = parsers[fileType];
  return getParser(tree);
};
