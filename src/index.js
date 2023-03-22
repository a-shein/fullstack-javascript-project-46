import { searchDiff, transferPathToFileContent } from './utils.js';
import outputFormatter from './formatter/index.js';

function genDiff(filepath1, filepath2, format = 'stylish') {
  const firstObject = transferPathToFileContent(filepath1);

  if (typeof firstObject === 'string') {
    return firstObject;
  }

  const secondObject = transferPathToFileContent(filepath2);

  if (typeof secondObject === 'string') {
    return secondObject;
  }

  const diffs = searchDiff(firstObject, secondObject);
  return outputFormatter(diffs, format);
}

export default genDiff;
