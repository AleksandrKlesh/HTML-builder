'use strict'

const fs = require("fs");
const path = require("path");
const writableStream = fs.createWriteStream(path.join(__dirname, "project-dist", "bundler.css"));

const directory = path.join(__dirname, 'styles');

fs.readdir(directory, {withFileTypes: true}, (err, files) => {
  files.map((file) => {
    if (path.extname(file.name) !== '.css') {
    } else {
      const readableStream = fs.createReadStream(path.join(directory, file.name), "utf-8");
      readableStream.on("data", (chunk) => {
        writableStream.write(chunk);
        console.log(`${file.name} was successfully compiled into bundle.css`);
      });
    }
  });
});