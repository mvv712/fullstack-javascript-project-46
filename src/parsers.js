import _ from 'lodash';
import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yaml: yaml.load,
  yml: yaml.load,
};

const getParser = (fileType) => {
  if (!(_.has(parsers, fileType))) {
    throw new Error(`Cannot get parser for "${fileType}"`);
  }
  return parsers[fileType];
};

export { getParser };
