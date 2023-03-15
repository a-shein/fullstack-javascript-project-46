import {
  searchDiff, stringBuilder, transferPathToFile, uniqueAndFlattenAndSortKeys,
} from './utils.js';

function genDiff(filepath1, filepath2) {
  const firstObject = transferPathToFile(filepath1);
  const secondObject = transferPathToFile(filepath2);

  if (firstObject === false || secondObject === false) {
    return `Possible you enter invalid filepath ${filepath1} or ${filepath2}`;
  }

  const uniqueAndSortKeys = uniqueAndFlattenAndSortKeys([firstObject, secondObject]);

  return stringBuilder(searchDiff(uniqueAndSortKeys, firstObject, secondObject));
}

export default genDiff;
