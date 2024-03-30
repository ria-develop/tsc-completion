#!/usr/bin/env node
import fs from 'fs/promises';
import { command } from '../lib/command.mjs';
import { getConfigFile } from '../lib/config-utils.mjs';

try {
  const configFile = await getConfigFile();
  const source = await fs.readFile(configFile);
  if (!source.includes(command)) {
    await fs.appendFile(configFile, `\n${command}\n`);
    console.log(`tsc completion installed in ${configFile}:\n + "${command}"\nreopen terminal or run "source ${configFile}"`);
  } else {
    console.log('tsc completion already installed');
  }
} catch (e) {
  console.error(e);
}
