import makePlain from './plain.js';
import makeStylish from './stylish.js';

function outputFormatter(data, format, replacer = '    ') {
  switch (format) {
    case 'stylish':
      return makeStylish(data, replacer);
    case 'plain':
      return makePlain(data);
    default:
      return `Invalid output format: '${format}'`;
  }
}

export default outputFormatter;
