'use strict'

const fs = require("fs");
const path = require("path");
const { stdin, stdout } = { process };
const directory = path.join(__dirname, 'files');
// const output = fs.createWriteStream(path.join(directory, "files-copy"));

fs.mkdir(path.join(__dirname, 'files-copy'), (err) => {
  if (err) {
    return stdout.write(err);
  }
  console.log("Directory has been successfully created!");
})