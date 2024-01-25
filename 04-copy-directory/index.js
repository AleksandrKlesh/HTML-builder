'use strict'

const fs = require("fs");
const path = require("path");
const { stdin, stdout } = require("process");
const directory = path.join(__dirname, 'files');

fs.mkdir(path.join(__dirname, 'files-copy'), (err) => {
  if (err) {
    console.log("Directory 'files-copy' already exists");
  } else {
    console.log("Directory has been successfully created!");
  }
});

fs.readdir(directory, {withFileTypes: true}, (err, files) => {
  files.map((file) => {
    fs.copyFile(
      path.join(directory, file.name),
      path.join(__dirname, "files-copy", file.name),
      (err) => {
        if (err) {
          console.log(err);
        } else {
          fs.readFile(path.join(directory, file.name), "utf-8", (err, data) =>
            console.log(`${file.name} has been copied successfully`));
        }
      }
    )
})
});