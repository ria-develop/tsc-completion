#!/usr/bin/env node
if (process.argv.find((arg) => arg.trim().toLowerCase() === '--uninstall')) {
  import('./uninstall.mjs');
} else {
  import('./install.mjs');
}