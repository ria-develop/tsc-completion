#!/usr/bin/env node
import ts from 'typescript';

const options = ts.optionDeclarations;
const compLine = process.env['COMP_LINE'] || 'tsc --all';
const compPoint = parseInt(process.env['COMP_POINT']) || compLine.length;

/**
 * @param {string} input
 * @param {number} position
 */
function getSubstringAtPosition(input, position) {
  let wordRegex = /([\w-]+)/g;
  let match;
  while ((match = wordRegex.exec(input)) !== null) {
    if (position >= match.index && position < wordRegex.lastIndex) {
      return match[0];
    }
  }
  return '';
}

const arg = getSubstringAtPosition(compLine, compPoint - 1);
const name = arg.replace(/-/g, '').toLowerCase();
let completions = [];

if (arg.startsWith('--')) {
  completions = options.filter((option) => {
    return option.name.toLowerCase().startsWith(name);
  }).map((option) => `--${option.name}`);
} else if (arg.startsWith('-')) {
  completions = options.filter((option) => {
    const optionName = option.shortName && option.shortName || option.name
    return optionName.toLowerCase().startsWith(name);
  }).map((option) => option.shortName ? `-${option.shortName}` : `--${option.name}`);
  completions.sort()
}
console.log(completions.join(ts.sys.newLine));