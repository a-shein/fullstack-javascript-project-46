import {
  searchDiff, stringBuilder, transferPathToFileContent, uniqueAndFlattenAndSortKeys,
} from './utils.js';

function genDiff(filepath1, filepath2) {
  const firstObject = transferPathToFileContent(filepath1);
  const secondObject = transferPathToFileContent(filepath2);

  if (firstObject === false || secondObject === false) {
    return `Possible you enter invalid filepath ${filepath1} or ${filepath2}.\n Also supported file format are json, yml, yaml`;
  }

  const uniqueAndSortKeys = uniqueAndFlattenAndSortKeys([firstObject, secondObject]);

  return stringBuilder(searchDiff(uniqueAndSortKeys, firstObject, secondObject));
}

export default genDiff;
