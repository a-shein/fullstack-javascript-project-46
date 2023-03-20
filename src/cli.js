import { program } from 'commander';
import genDiff from './index.js';

function startGenerateDiff() {
  program
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format <type>', 'output format', 'stylish')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => {
      console.log(genDiff(filepath1, filepath2, program.opts().format));
    })
    .parse();
}
export default startGenerateDiff;
