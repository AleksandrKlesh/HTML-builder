'use strict'
const fs = require("fs");
const writableStream = fs.createWriteStream(`${__dirname}/text.txt`);
const { stdin, stdout } = process;

// Listen for ctrl + C event
process.on('SIGINT', () => process.exit());
process.on("exit", () => stdout.write(`\nSee you later!\n`));

stdout.write("What's your name?\n")
stdin.on("data", (data) => {
  if (data.toString().trim() === 'exit') {
    process.on("exit", () => stdout.write(`Goodbye, ${data}`));
    process.exit();
  }
  stdout.write(`Nice to meet you, ${data}`);
  writableStream.write(data);
});


