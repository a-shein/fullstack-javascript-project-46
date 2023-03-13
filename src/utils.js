import { program } from 'commander';
import fs from 'fs';
import path from 'path';

function showHelpInfo(firstArgument, secondArgument, helpOption, formatOption) {
  console.log(`Usage: gendiff [options] ${firstArgument.name} ${secondArgument.name}`);
  console.log('');
  console.log(program.description());
  console.log('');
  console.log('Options:');
  console.log('-V, --version        output the version number');
  console.log(`${helpOption.flag}           ${helpOption.description}`);
  console.log(`${formatOption.flag}  ${formatOption.description}`);
}

function transferPathToFile(rout) {
  return JSON.parse(fs.readFileSync(path.resolve(rout)));
}

function uniqueAndFlattenAndSortKeys(objects) {
  const temp = objects.reduce((acc, object) => {
    acc.push(Object.keys(object));
    return acc;
  }, []).flatMap((a) => a);

  return temp.filter((item, pos) => temp.indexOf(item) === pos).sort();
}

function searchDiff(keys, firstObject, secondObject) {
  const result = [];

  /* eslint-disable-next-line */
  for (const key of keys) {
    if (Object.hasOwn(firstObject, key) && !Object.hasOwn(secondObject, key)) {
      result.push(`- ${key}: ${firstObject[key]}`);
    }

    if (!Object.hasOwn(firstObject, key) && Object.hasOwn(secondObject, key)) {
      result.push(`+ ${key}: ${secondObject[key]}`);
    }

    if (Object.hasOwn(firstObject, key) && Object.hasOwn(secondObject, key)) {
      if (firstObject[key] === secondObject[key]) {
        result.push(`  ${key}: ${firstObject[key]}`);
      } else {
        result.push(`- ${key}: ${firstObject[key]}`);
        result.push(`+ ${key}: ${secondObject[key]}`);
      }
    }
  }

  return result;
}

function stringBuilder(array) {
  let resultString = '';

  /* eslint-disable-next-line */
  for (const item of array) {
    resultString = `${resultString}  ${item}\n`;
  }
  resultString = `{\n${resultString}}`;

  return resultString;
}

export {
  showHelpInfo, stringBuilder, transferPathToFile, uniqueAndFlattenAndSortKeys, searchDiff,
};
