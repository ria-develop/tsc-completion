import { fileURLToPath } from 'url';

const resolve = (moduleName) => fileURLToPath(new URL(moduleName, import.meta.url));

export const command = `complete -C ${resolve('tsc-completion.mjs')} tsc`;
