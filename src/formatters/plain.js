import _ from 'lodash';

const getValueText = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return String(value);
};

export default (tree) => {
  const iter = (curNode, fullName = '') => {
    const items = curNode
      .flatMap((node) => {
        const { status, key, value } = node;

        switch (status) {
          case 'nested': {
            return iter(value, `${fullName}${key}.`);
          }
          case 'received': {
            return `Property '${fullName}${key}' was added with value: ${getValueText(value)}`;
          }
          case 'expected': {
            return `Property '${fullName}${key}' was removed`;
          }
          case 'exchanged': {
            return `Property '${fullName}${key}' was updated. From ${getValueText(value.old)} to ${getValueText(value.new)}`;
          }
          case 'matched': {
            return [];
          }
          default: {
            throw new Error(`Cannot get status ${status}`);
          }
        }
      });

    return items.join('\n');
  };

  return iter(tree);
};
