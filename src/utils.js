import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parsers from './parsers.js';

function transferPathToFileContent(filepath) {
  const normalizePath = filepath.includes('fixtures') ? filepath : path.resolve(process.cwd(), '__fixtures__', filepath);
  if (!fs.existsSync(normalizePath)) {
    return `File does not exist at the specified path ${filepath}`;
  }

  const fileContent = fs.readFileSync(normalizePath, 'utf-8');
  const fileExtension = path.extname(normalizePath);

  return parsers(fileContent, fileExtension);
}

function searchDiff(firstObject, secondObject) {
  const keys = _.union(Object.keys(firstObject), Object.keys(secondObject)).sort();

  return keys.reduce((acc, key) => {
    const valueByKey1 = firstObject[key];
    const valueByKey2 = secondObject[key];

    if (!_.has(firstObject, key)) {
      acc.push({ name: key, value: valueByKey2, type: 'plus' });
      return acc;
    }
    if (!_.has(secondObject, key)) {
      acc.push({ name: key, value: valueByKey1, type: 'minus' });
      return acc;
    }
    if (_.isObject(valueByKey1) && _.isObject(valueByKey2)) {
      acc.push({ name: key, children: searchDiff(valueByKey1, valueByKey2), type: 'subtree' });
      return acc;
    }
    if (!_.isEqual(valueByKey1, valueByKey2)) {
      acc.push({
        name: key, firstValue: valueByKey1, secondValue: valueByKey2, type: 'changed',
      });
      return acc;
    }

    acc.push({ name: key, value: valueByKey1, type: 'unchanged' });
    return acc;
  }, []);
}

export { transferPathToFileContent, searchDiff };
