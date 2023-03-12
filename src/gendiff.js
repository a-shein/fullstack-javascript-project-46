import { program } from 'commander';

const version = '1.0.0';
const description = 'Compares two configuration files and shows a difference.';

const helpOption = { flag: '-h, --help', description: 'display help for command' };
const formatOption = { flag: '-f, --format <type>', description: 'output format' };
const firstArgument = { name: '<filepath1>', description: 'path to first file' };
const secondArgument = { name: '<filepath1>', description: 'path to first file' };

function startGenDiff() {
  program
    .version(version)
    .description(description)
    .option(helpOption.flag, helpOption.description)
    .option(formatOption.flag, formatOption.description)
    .argument(firstArgument.name, firstArgument.description)
    .argument(secondArgument.name, secondArgument.description)
    .action((filepath1, filepath2) => {
      console.log('filepath1:', filepath1);
      console.log('filepath2:', filepath2);
    })
    .parse();

  const options = program.opts();
  if ((Object.keys(options).length === 0)
        || (options.help)) {
    console.log(`Usage: gendiff [options] ${firstArgument.name} ${secondArgument.name}`);
    console.log('');
    console.log(program.description());
    console.log('');
    console.log('Options:');
    console.log(`-V, --version        output the version number`);
    console.log(`${helpOption.flag}           ${helpOption.description}`);
    console.log(`${formatOption.flag}  ${formatOption.description}`);
  } else if (options.version) {
    console.log(program.version);
  }
}

export default startGenDiff;
