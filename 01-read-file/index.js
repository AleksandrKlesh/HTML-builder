const fs = require("fs");
const path = require("node:path");
const { stdin } = process;

const readableStream = fs.createReadStream(`${__dirname}/text.txt`, "utf-8");
readableStream.on("data", (chunk) => stdin.write(chunk));