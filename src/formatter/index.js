import makePlain from './plain.js';
import makeStylish from './stylish.js';
import makeJson from './json.js';

function outputFormatter(data, format, replacer = '    ') {
  switch (format) {
    case 'stylish':
      return makeStylish(data, replacer);
    case 'plain':
      return makePlain(data);
    case 'json':
      return makeJson(data, null, replacer);
    default:
      return `Invalid output format: '${format}'`;
  }
}

export default outputFormatter;
