import _ from 'lodash';

const markers = {
  matched: ' ',
  expected: '-',
  received: '+',
};

const getSpaces = (depth, spaces = 4, offset = 2) => ' '.repeat(depth * spaces - offset);

const itemToText = (item, depth) => {
  if (!_.isObject(item)) {
    return String(item);
  }

  const items = Object
    .entries(item)
    .map(([key, value]) => `${getSpaces(depth)}${markers.matched} ${key}: ${itemToText(value, depth + 1)}`);

  return `{\n${items.join('\n')}\n${getSpaces(depth, 4, 4)}}`;
};

const buildLine = (depth, status, key, value) => `${getSpaces(depth)}${markers[status]} ${key}: ${itemToText(value, depth + 1)}`;

export default (tree) => {
  const iter = (curNode, depth) => {
    const items = curNode
      .map((node) => {
        const { status, key, value } = node;

        if (status === 'nested') {
          return buildLine(depth, 'matched', key, iter(value, depth + 1));
        }
        if (['received', 'expected', 'matched'].includes(status)) {
          return buildLine(depth, status, key, value);
        }
        if (status === 'exchanged') {
          const expected = buildLine(depth, 'expected', key, value.old);
          const received = buildLine(depth, 'received', key, value.new);
          return `${expected}\n${received}`;
        }
        throw new Error(`Cannot get status ${status}`);
      });

    return `{\n${items.join('\n')}\n${getSpaces(depth, 4, 4)}}`;
  };

  return iter(tree, 1);
};
