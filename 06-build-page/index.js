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
        await fs.copyFile(source, destination);
      }
    }
    await recursiveCopy(assetsSource, assetsDestination);
  } catch(err) {
    console.error(err);
  }
}

async function mergeLayout() {
  try {
    let template = await fs.readFile(path.join(__dirname, 'template.html'), 'utf-8');
    const componentsFolder = path.join(__dirname, 'components');
    const files = await fs.readdir(componentsFolder);
    for (const file of files) {
      console.log(__dirname);
      const fileName = file.slice(0, file.lastIndexOf('.'));
      const component = await fs.readFile(path.join(componentsFolder, file), 'utf-8');
      template = template.replace(`{{${fileName}}}`, component);
    }
    await fs.writeFile(path.join(destination, 'index.html'), template);
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