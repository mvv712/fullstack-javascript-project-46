#!/usr/bin/env node

import { program } from 'commander';
import compareFiles from '../src/index.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const options = program.opts();
    const result = compareFiles(filepath1, filepath2, options.format);
    console.log(result);
  })
  .parse();
