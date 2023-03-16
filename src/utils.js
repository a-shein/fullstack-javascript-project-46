import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parsers from './parsers.js';

function transferPathToFileContent(filepath) {
  const normalizePath = filepath.includes('fixtures') ? filepath : path.resolve(process.cwd(), '__fixtures__', filepath);
  if (!fs.existsSync(normalizePath)) {
    return false;
  }

  const fileByteContent = fs.readFileSync(normalizePath);
  const fileExtension = path.extname(normalizePath);

  return parsers(fileByteContent, fileExtension);
}

function uniqueAndFlattenAndSortKeys(objects) {
  const [object1, object2] = objects;

  return _.union(Object.keys(object1), Object.keys(object2)).sort();
}

function searchDiff(keys, firstObject, secondObject) {
  return keys.reduce((acc, key) => {
    if (Object.hasOwn(firstObject, key) && !Object.hasOwn(secondObject, key)) {
      acc.push(`- ${key}: ${firstObject[key]}`);
    } else if (!Object.hasOwn(firstObject, key) && Object.hasOwn(secondObject, key)) {
      acc.push(`+ ${key}: ${secondObject[key]}`);
    } else if (Object.hasOwn(firstObject, key) && Object.hasOwn(secondObject, key)) {
      if (firstObject[key] === secondObject[key]) {
        acc.push(`  ${key}: ${firstObject[key]}`);
      } else {
        acc.push(`- ${key}: ${firstObject[key]}`);
        acc.push(`+ ${key}: ${secondObject[key]}`);
      }
    }
    return acc;
  }, []);
}

function stringBuilder(collection) {
  return `{\n${collection.reduce((acc, item) => `${acc}  ${item}\n`, '')}}`;
}

export {
  stringBuilder, transferPathToFileContent, uniqueAndFlattenAndSortKeys, searchDiff,
};
