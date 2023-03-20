import { searchDiff, transferPathToFileContent } from './utils.js';
import makeStylish from './formatter/stylish.js';

function genDiff(filepath1, filepath2) {
  const firstObject = transferPathToFileContent(filepath1);
  const secondObject = transferPathToFileContent(filepath2);

  if (firstObject === false || secondObject === false) {
    return `Possible you enter invalid filepath ${filepath1} or ${filepath2}.\nAlso supported file format are json, yml, yaml`;
  }

  const diffs = searchDiff(firstObject, secondObject);
  return makeStylish(diffs);
}

export default genDiff;
