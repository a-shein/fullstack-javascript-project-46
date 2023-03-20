import _ from 'lodash';

const stringify = (data, depth, replacer) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }

  const indentKey = replacer.repeat(depth + 1);
  const bracketIndent = replacer.repeat(depth);
  const lines = Object.entries(data)
    .map(([key, value]) => `${indentKey}${key}: ${stringify(value, depth + 1, replacer)}`);

  return ['{',
    ...lines,
    `${bracketIndent}}`].join('\n');
};

const specialSymbols = {
  plus: '+',
  minus: '-',
  unchanged: ' ',
};

const makeStylish = (diffs, replacer = '    ') => {
  const iter = (tree, depth) => tree.map((node) => {
    const indent = replacer.repeat(depth);
    const indentSign = indent.slice(2);

    const buildLine = (value, mark) => `${indentSign}${mark} ${node.name}: ${stringify(value, depth, replacer)}`;

    switch (node.type) {
      case 'plus':
        return buildLine(node.value, specialSymbols.plus);
      case 'minus':
        return buildLine(node.value, specialSymbols.minus);
      case 'unchanged':
        return buildLine(node.value, specialSymbols.unchanged);
      case 'changed':
        return [`${buildLine(node.firstValue, specialSymbols.minus)}`,
          `${buildLine(node.secondValue, specialSymbols.plus)}`].join('\n');
      case 'subtree':
        return `${indent}${node.name}: ${['{', ...iter(node.children, depth + 1), `${indent}}`].join('\n')}`;
      default:
        return `Type: ${node.type} is undefined`;
    }
  });

  const result = iter(diffs, 1);

  return ['{',
    ...result,
    '}'].join('\n');
};

export default makeStylish;
