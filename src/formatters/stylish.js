import _ from 'lodash';

const markers = {
  matched: ' ',
  expected: '-',
  received: '+',
};

const getSpaces = (depth, spaces = 4, offset = 2) => ' '.repeat(depth * spaces - offset);

const itemToText = (item, depth) => {
  if (!_.isPlainObject(item)) {
    return item;
  }

  const items = Object
    .entries(item)
    .map(([key, value]) => `${getSpaces(depth)}${markers.matched} ${key}: ${itemToText(value, depth + 1)}`);

  return `{\n${items.join('\n')}\n${getSpaces(depth, 4, 4)}}`;
};

export default (tree) => {
  const iter = (curNode, depth) => {
    const items = curNode
      .map((node) => {
        const { stat, key, value } = node;

        if (stat === 'nested') {
          return `${getSpaces(depth)}${markers.matched} ${key}: ${iter(value, depth + 1)}`;
        } if (['received', 'expected', 'matched'].includes(stat)) {
          return `${getSpaces(depth)}${markers[stat]} ${key}: ${itemToText(value, depth + 1)}`;
        } if (stat === 'exchanged') {
          const expected = `${getSpaces(depth)}${markers.expected} ${key}: ${itemToText(value.old, depth + 1)};`;
          const received = `${getSpaces(depth)}${markers.received} ${key}: ${itemToText(value.new, depth + 1)}`;
          return `${expected}\n${received}`;
        }
        throw new Error(`Cannot get stat ${stat}`);
      });

    return `{\n${items.join('\n')}\n${getSpaces(depth, 4, 4)}}`;
  };

  return iter(tree, 1);
};
