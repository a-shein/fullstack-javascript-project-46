#!/usr/bin/env node

import { program } from 'commander';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-h, --help', 'display help for command')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1>', 'path to first file')
  .argument('<filepath2>', 'path to second file')
  .action((filepath1, filepath2) => {
    console.log('filepath1:', filepath1);
    console.log('filepath2:', filepath2);
  })
  .parse();

const options = program.opts();
if ((Object.keys(options).length === 0)
    || (options.help)) {
  console.log('Usage: gendiff [options] <filepath1> <filepath2>');
  console.log('');
  console.log(program.description());
  console.log('');
  console.log('Options:');
  console.log('-V, --version        output the version number');
  console.log('-h, --help           display help for command');
  console.log('-f, --format <type>  output format');
} else if (options.version) {
  console.log(program.version);
}
