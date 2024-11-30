import _ from 'lodash';

const getValueText = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return _.isString(value) ? `'${value}'` : value;
};

export default (tree) => {
  const iter = (curNode, fullName = '') => {
    const items = curNode
      .flatMap((node) => {
        const { status, key, value } = node;

        if (status === 'nested') {
          return iter(value, `${fullName}${key}.`);
        } if (status === 'received') {
          return `Property '${fullName}${key}' was added with value: ${getValueText(value)}`;
        } if (stat === 'expected') {
          return `Property '${fullName}${key}' was removed`;
        } if (status === 'exchanged') {
          return `Property '${fullName}${key}' was updated. From ${getValueText(value.old)} to ${getValueText(value.new)}`;
        } if (status === 'matched') {
          return [];
        }
        throw new Error(`Cannot get status ${status}`);
      });

    return items.join('\n');
  };

  return iter(tree);
};
