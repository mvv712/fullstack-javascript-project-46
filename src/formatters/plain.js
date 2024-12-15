import _ from 'lodash';

const getValueText = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return _.isString(value) ? `'${value}'` : String(value);
};

export default (tree) => {
  const iter = (curNode, fullName = '') => {
    const items = curNode
      .flatMap((node) => {
        const {
          status, key, value, children,
        } = node;

        switch (status) {
          case 'nested': {
            return iter(children, `${fullName}${key}.`);
          }
          case 'received': {
            return `Property '${fullName}${key}' was added with value: ${getValueText(value)}`;
          }
          case 'expected': {
            return `Property '${fullName}${key}' was removed`;
          }
          case 'exchanged': {
            return `Property '${fullName}${key}' was updated. From ${getValueText(value.oldValue)} to ${getValueText(value.newValue)}`;
          }
          default: {
            return [];
          }
        }
      });

    return items.join('\n');
  };

  return iter(tree);
};
