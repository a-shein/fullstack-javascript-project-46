#!/usr/bin/env node

import { program } from 'commander';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-h, --help', 'display help for command')
  .parse();

const options = program.opts();
if ((Object.keys(options).length === 0)
    || (options.help)) {
  console.log('Usage: gendiff [options]');
  console.log('');
  console.log(program.description());
  console.log('');
  console.log('Options:');
  console.log('-V, --version      output the version number');
  console.log('-h, --help         display help for command');
} else if (options.version) {
  console.log(program.version);
}

// console.log(program.options);
