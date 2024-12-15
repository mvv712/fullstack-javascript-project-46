import path from 'path';
import { composeFilepath, readFile } from '../src/utils.js';
import getParser from '../src/parsers.js';
import getFormatter from '../src/formatters/index.js';
import compareFiles from '../src/index.js';

const __dirname = composeFilepath('__tests__');
const getCurrentPath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const types = [
  ['json', 'json'],
  ['yaml', 'yaml'],
];

const formats = ['stylish', 'plain', 'json'];

const isJSON = (data) => {
  try {
    JSON.parse(JSON.stringify(data));
  } catch {
    return false;
  }

  return true;
};

describe('get formatter', () => {
  test.each(formats)('%s', (format) => {
    const expectedValue = {
      stylish: '{\n\n}',
      plain: '',
      json: '[]',
    };
    expect(getFormatter([], format)).toEqual(expectedValue[format]);
  });
  test('wrong format', () => {
    expect(() => getFormatter([], 'wrong')).toThrow();
  });
});

describe('get parser', () => {
  test
    .each([
      'json',
      'yaml',
      'yml',
    ])('for %s', (type) => {
      const content = getCurrentPath(`file1.${type}`);
      expect(isJSON(content)).toBeTruthy();
      expect(content).toEqual(JSON.parse(JSON.stringify(content)));
    });

  test('wrong type', () => {
    expect(() => getParser([], 'wrong')).toThrow();
  });
});

describe.each(types)('gendiff filepath1.%s filepath2.%s', (type1, type2) => {
  const file1 = getCurrentPath(`file1.${type1}`);
  const file2 = getCurrentPath(`file2.${type2}`);

  test.each(formats)('--format %s', (format) => {
    const result = compareFiles(file1, file2, format);
    const expected = readFile(getCurrentPath(`${format}.txt`));

    expect(result).toEqual(expected);
  });
});
