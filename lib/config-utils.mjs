import path from 'path';
import os from 'node:os';
import fs from 'fs/promises';

const accessFile = async (f) => {
  const filePath = path.resolve(os.homedir(), f);
  await fs.access(filePath);
  return filePath;
};
export const getConfigFile = () => {
  return Promise.any([
    accessFile('.bashrc'),
    accessFile('.zshrc')
  ]);
};