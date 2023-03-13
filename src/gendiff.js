import { program } from 'commander';
import fs from 'fs';
import path from 'path';
import {
  searchDiff, showHelpInfo, stringBuilder, transferPathToFile, uniqueAndFlattenAndSortKeys,
} from './utils.js';

const version = '1.0.0';
const description = 'Compares two configuration files and shows a difference.';
const helpOption = { flag: '-h, --help', description: 'display help for command' };
const formatOption = { flag: '-f, --format <type>', description: 'output format' };
const firstArgument = { name: '<filepath1>', description: 'path to first file', defaultValue: '123' };
const secondArgument = { name: '<filepath2>', description: 'path to first file', defaultValue: '123' };

function genDiff() {
  program
    .version(version)
    .description(description)
    .option(helpOption.flag, helpOption.description)
    .option(formatOption.flag, formatOption.description)
    .argument(`[${firstArgument.name}]`, firstArgument.description, firstArgument.defaultValue)
    .argument(`[${secondArgument.name}]`, secondArgument.description, secondArgument.defaultValue)
    .action((filepath1, filepath2) => {
      if (program.opts().help) {
        showHelpInfo(firstArgument, secondArgument, helpOption, formatOption);
        return;
      }

      if (program.opts.version) {
        console.log(program.version);
        return;
      }

      if (!fs.existsSync(path.resolve(filepath1))) {
        console.log(`${filepath1} not exists`);
        return;
      }

      if (!fs.existsSync(path.resolve(filepath2))) {
        console.log(`${filepath2} not exists`);
        return;
      }
      const firstObject = transferPathToFile(filepath1);
      const secondObject = transferPathToFile(filepath2);
      const uniqueAndSortKeys = uniqueAndFlattenAndSortKeys([firstObject, secondObject]);
      const diffs = stringBuilder(searchDiff(uniqueAndSortKeys, firstObject, secondObject));

      console.log(diffs);
    })
    .parse();
}

export default genDiff;
