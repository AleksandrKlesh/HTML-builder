'use strict'

const fs = require("fs");
const path = require("path");
const { stdout } = process;

fs.readdir(`${__dirname}/secret-folder`, {withFileTypes: true}, (err, files) => {
  stdout.write("Name: Extention: Size:\n");
  files.map((file) => {

    fs.stat(`${__dirname}/secret-folder/${file.name}`, (err, stats) => {
      let extention = path.extname(file.name).slice(1);
      if (!stats.isFile()) {
        extention = 'folder';
      }
      stdout.write(`${file.name.split(".")[0]} - ${extention} - ${stats.size}\n`);
  });
  })
});