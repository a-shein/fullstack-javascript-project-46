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
  const keys = _.union(Object.keys(firstObject), Object.keys(secondObject));
  const sortKeys = [...keys].sort();

  return sortKeys.map((key) => {
    const valueByKey1 = firstObject[key];
    const valueByKey2 = secondObject[key];

    if (!_.has(firstObject, key)) {
      return { name: key, value: valueByKey2, type: 'plus' };
    }
    if (!_.has(secondObject, key)) {
      return { name: key, value: valueByKey1, type: 'minus' };
    }
    if (_.isObject(valueByKey1) && _.isObject(valueByKey2)) {
      return { name: key, children: searchDiff(valueByKey1, valueByKey2), type: 'subtree' };
    }
    if (!_.isEqual(valueByKey1, valueByKey2)) {
      return {
        name: key, firstValue: valueByKey1, secondValue: valueByKey2, type: 'changed',
      };
    }

    return { name: key, value: valueByKey1, type: 'unchanged' };
  }, []);
}

export { transferPathToFileContent, searchDiff };
