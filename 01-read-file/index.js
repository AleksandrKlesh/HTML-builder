const fs = require("fs");
const path = require("node:path")
const { stdout } = process;

const readableStream = fs.createReadStream(`${__dirname}/text.txt`, "utf-8");
readableStream.on("data", (chunk) => stdout.write(chunk));