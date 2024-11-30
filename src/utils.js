import fs from 'fs';
import path from 'path';

const composeFilepath = (filepath) => path.resolve(process.cwd(), filepath);

const readFile = (filepath, encoding = 'utf8') => {
  const absFilepath = composeFilepath(filepath);
  return fs.readFileSync(absFilepath, encoding);
};

const getFileType = (filepath) => path.extname(filepath).split('.')[1];

export {
  composeFilepath, readFile, getFileType,
};
