import fs from 'fs';
import path from 'path';
import { getParser } from '../src/parsers.js';

const composeFilepath = (filepath) => path.resolve(process.cwd(), filepath);

const readFile = (filepath, encoding = 'utf8') => {
  const absFilepath = composeFilepath(filepath);
  return fs.readFileSync(absFilepath, encoding);
};

const getFileType = (filepath) => path.extname(filepath).split('.')[1];

const getData = (filepath) => {
  const fileType = getFileType(filepath);
  const file = readFile(filepath);

  const parser = getParser(fileType);
  return parser(file);
}

export { composeFilepath, readFile, getFileType, getData };