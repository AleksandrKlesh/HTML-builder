const fs = require('node:fs/promises');
const path = require('node:path');
const { stdout } = require('node:process');
const folderPath = path.join(__dirname, 'secret-folder');

async function printInfo() {
  try {
    const files = await fs.readdir(folderPath, {withFileTypes: true});
    stdout.write(`${'Name:'.padEnd(7)} - ${'Extention:'.padEnd(10)} - 'Size:'\n`);
    for (const file of files) {
      if (file.isFile()) {
        const filePath = path.join(folderPath, file.name);
        const stats = await fs.stat(filePath);
        const name = file.name.slice(0, file.name.lastIndexOf('.'));
        const extention = path.extname(file.name).slice(1);
        const size = (stats.size / 1024).toFixed(3);
        // const file
        stdout.write(`${name.padEnd(7)} - ${extention.padEnd(10)} - ${size} KB \n`);
      }
    }
  } catch(err) {
    console.error(err);
  }
}

printInfo();