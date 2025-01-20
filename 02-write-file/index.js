const fs = require('node:fs');
const path = require('node:path');
const { stdin, stdout} = require('node:process');
const writableStream = fs.createWriteStream(path.join(__dirname, 'text.txt'));

stdout.write("Hi, what's your name? Enter here: ");

stdin.on('data', (data) => {
  const input = data.toString().trim();
  if (input.toLowerCase() === 'exit') {
    process.exit()
  }
  writableStream.write(input + '\n');
  stdout.write('Enter something else: ');
})

stdin.on('SIGINT', () => process.exit());