import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const getFixturePath = (filepath) => path.join(dirname, '..', '__fixtures__', filepath);

const filesForSuccessTests = [
  ['file1.json', 'file2.json'],
  ['file1.yml', 'file2.yml'],
  ['file1.yaml', 'file2.yaml'],
];

const filesForWrongTests = [
  ['file11.json', 'file2.json'],
  ['file1.yml', 'file2.ymlito'],
  ['file1.txt', 'file2.exe'],
];

test.each(filesForSuccessTests)('Compare %s with %s', (filepath1, filepath2) => {
  const fixturePath1 = getFixturePath(filepath1);
  const fixturePath2 = getFixturePath(filepath2);
  const expected = '{\n'
          + '  - follow: false\n'
          + '    host: hexlet.io\n'
          + '  - proxy: 123.234.53.22\n'
          + '  - timeout: 50\n'
          + '  + timeout: 20\n'
          + '  + verbose: true\n'
          + '}';

  expect(genDiff(fixturePath1, fixturePath2)).toEqual(expected);
});

test.each(filesForWrongTests)('Wrong file extension or file path %s and %s', (filepath1, filepath2) => {
  const fixturePath1 = getFixturePath(`${filepath1}`);
  const fixturePath2 = getFixturePath(filepath2);

  expect(genDiff(fixturePath1, fixturePath2)).toEqual(
    `Possible you enter invalid filepath ${fixturePath1} or ${fixturePath2}.\n Also supported file format are json, yml, yaml`,
  );
});
