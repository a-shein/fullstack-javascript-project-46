import {
  searchDiff, stringBuilder, transferPathToFile, uniqueAndFlattenAndSortKeys,
} from './utils.js';

function genDiff(filepath1, filepath2) {
  const firstObject = transferPathToFile(filepath1);
  const secondObject = transferPathToFile(filepath2);
  const uniqueAndSortKeys = uniqueAndFlattenAndSortKeys([firstObject, secondObject]);

  return stringBuilder(searchDiff(uniqueAndSortKeys, firstObject, secondObject));
}

export default genDiff;
