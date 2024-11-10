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
        const { stat, key, value } = node;

        if (stat === 'nested') {
          return iter(value, `${fullName}${key}.`);
        } if (stat === 'received') {
          return `Property '${fullName}${key}' was added with value: ${getValueText(value)}`;
        } if (stat === 'expected') {
          return `Property '${fullName}${key}' was removed`;
        } if (stat === 'exchanged') {
          return `Property '${fullName}${key}' was updated. From ${getValueText(value.old)} to ${getValueText(value.new)}`;
        } if (stat === 'matched') {
          return [];
        }
        throw new Error(`Cannot get stat ${stat}`);
      });

    return items.join('\n');
  };

  return iter(tree);
};
