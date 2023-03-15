import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const getFixturePath = (filepath) => path.join(dirname, '..', '__fixtures__', filepath);

let filepath1;
let filepath2;

beforeEach(() => {
  filepath1 = 'file1.json';
  filepath2 = 'file2.json';
});

test('Compare filepath1 with filepath2', () => {
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

test('wrong filename', () => {
  const fixturePath1 = getFixturePath(`${filepath1}1`);
  const fixturePath2 = getFixturePath(filepath2);

  expect(genDiff(fixturePath1, fixturePath2)).toEqual(
    `Possible you enter invalid filepath ${fixturePath1} or ${fixturePath2}`,
  );
});
