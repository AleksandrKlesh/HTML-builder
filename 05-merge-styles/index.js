const fs = require('node:fs/promises');
const path = require('node:path');
const folder = path.join(__dirname, 'styles');
const destination = path.join(__dirname, 'project-dist', 'bundle.css');

async function mergeStyles() {
  try {
    const files = await fs.readdir(folder, {withFileTypes: true});
    let chunks = [];
    for (const file of files) {
      if (path.extname(file.name) === '.css') {
        const filePath = path.join(folder, file.name);
        const chunk = await fs.readFile(filePath);
        chunks.push(chunk);
      }
    }
    await fs.writeFile(destination, ...chunks);
  } catch(err) {
    console.error(err);
  }
}

mergeStyles();