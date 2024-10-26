#!/usr/bin/env node

import { program } from 'commander';
import { diffFiles } from '../src/index.js';

program
 .name('gendiff')
 .description('Compares two configuration files and shows a difference.')
 .version('1.0.0');

program
 .option('-f, --format [type]', 'output format')
 .argument('<filepath1>')
 .argument('<filepath2>')
 .action(diffFiles);

program.parse();