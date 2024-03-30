#!/usr/bin/env node
import fs from 'fs/promises';
import { command } from '../lib/command.mjs';
import { getConfigFile } from '../lib/config-utils.mjs';

try {
  const configFile = await getConfigFile();
  const source = await fs.readFile(configFile);
  let newValue = source.toString().replace(command, '');
  await fs.writeFile(configFile, newValue);
  console.log(`"${command}"`, 'uninstalled from', configFile);
} catch (e) {
  console.error(e);
}
