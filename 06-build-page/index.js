const fs = require('node:fs/promises');
const path = require('node:path');
const destination = path.join(__dirname, 'project-dist');

fs.mkdir(destination, {recursive: true});


async function copyAssets() {
  try {
    const assetsSource = path.join(__dirname, 'assets');
    const assetsDestination = path.join(destination, 'assets');

    const recursiveCopy = async (source, destination) => {
      const stats = await fs.stat(source);
      if (stats.isDirectory()) {
        await fs.mkdir(destination, {recursive: true});
        const files = await fs.readdir(source);
        for (const file of files) {
          const currentSource = path.join(source, file);
          const currentDestination = path.join(destination, file);
          await recursiveCopy(currentSource, currentDestination);
        }
      } else {
        await fs.copyFile(currentSource, currentDestination);
      }
    }
    await recursiveCopy(assetsSource, assetsDestination);
  } catch(err) {
    console.error(err);
  }
}

async function mergeLayout() {
  try {
    const template = await fs.readFile(path.join(__dirname, 'template.html'));
    const components = {};
    const files = await fs.readdir(path.join(__dirname, 'components'));
    for (const file of files) {
      const fileName = file.name.slice(0, file.name.lastIndexOf('.'));
      components[fileName] = await fs.readFile(file.name, 'utf-8');
      template.replace(`{{${fileName}}}`, components[fileName]);
    }
    await fs.writeFile(path.join(destination, 'index.html'));
  } catch(err) {
    console.error(err);
  }
}


async function mergeStyles() {
  try {
    const folder = path.join(__dirname, 'styles');
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


(async () => {
  await copyAssets();
  await mergeLayout();
  await mergeStyles();
}) ()