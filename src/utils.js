import fs from 'fs';
import path from 'path';

function transferPathToFile(filepath) {
  if (!fs.existsSync(path.resolve(process.cwd(), filepath))) {
    return false;
  }

  return JSON.parse(fs.readFileSync(path.resolve(process.cwd(), filepath)));
}

function uniqueAndFlattenAndSortKeys(objects) {
  const temp = objects.reduce((acc, object) => {
    acc.push(Object.keys(object));
    return acc;
  }, []).flatMap((a) => a);

  return temp.filter((item, pos) => temp.indexOf(item) === pos).sort();
}

function searchDiff(keys, firstObject, secondObject) {
  return keys.reduce((acc, key) => {
    if (Object.hasOwn(firstObject, key) && !Object.hasOwn(secondObject, key)) {
      acc.push(`- ${key}: ${firstObject[key]}`);
    }

    if (!Object.hasOwn(firstObject, key) && Object.hasOwn(secondObject, key)) {
      acc.push(`+ ${key}: ${secondObject[key]}`);
    }

    if (Object.hasOwn(firstObject, key) && Object.hasOwn(secondObject, key)) {
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
  stringBuilder, transferPathToFile, uniqueAndFlattenAndSortKeys, searchDiff,
};
