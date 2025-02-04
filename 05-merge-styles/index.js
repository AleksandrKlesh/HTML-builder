const fs = require('node:fs/promises');
const path = require('node:path');
const folder = path.join(__dirname, 'styles');
// const destinationFolder = path.join(__dirname, 'project-dist');
const destination = path.join(__dirname, 'project-dist', 'bundle.css');

// async function updateBundle() {
//   try {
//     const files = await fs.readdir(destinationFolder, {withFileTypes: false});
//     if (files.includes('bundle.css')) {
//       await fs.rm(destination, {recursive: true});
//     }
//   } catch(err) {
//     console.error(err);
//   }
// }

async function mergeStyles() {
  try {
    const files = await fs.readdir(folder, {withFileTypes: true});
    let chunks = [];
    for (const file of files) {
      if (path.extname(file.name) === '.css') {
        const filePath = path.join(folder, file.name);
        const chunk = await fs.readFile(filePath, 'utf-8');
        chunks.push(chunk);
      }
    }
    await fs.writeFile(destination, chunks);
  } catch(err) {
    console.error(err);
  }
}

mergeStyles();