const fs = require('node:fs/promises');
const path = require('node:path');
const folder = path.join(__dirname, 'files');
const destination = path.join(__dirname, 'files-copy')
// const readableStream = fs.createReadStream(folder);
// const writableStream = fs.createWriteStream(destination);

async function copyDir() {
  try {
    fs.mkdir(destination, {recursive: true});    
    const files = await fs.readdir(folder, {withFileTypes: true});
    for (const file of files) {
      if(file.isFile()) {
        const filePath = path.join(folder, file.name);
        const destinationPath = path.join(destination, file.name);
        await fs.copyFile(filePath, destinationPath);
      }
    }
  } catch(err) {
    console.error(err)
  }
}

copyDir();