'use strict'

const fs = require("fs");
const path = require("path");
const { stdout } = process;

fs.readdir(`${__dirname}/secret-folder`, {withFileTypes: true}, (err, files) => {
  stdout.write("Name: Extention: Size:\n");
  files.map((file) => {

    fs.stat(`${__dirname}/secret-folder/${file.name}`, (err, stats) => {
      if (!stats.isFile()) {
        return true;
      }
      stdout.write(`${file.name.split(".")[0]} - ${path.extname(file.name).slice(1)} - ${stats.size}\n`);
  });
  })
});