const fs = require('node:fs');
const path = require('node:path');
const { stdin, stdout} = require('node:process');
const writableStream = fs.createWriteStream(path.join(__dirname, 'text.txt'));

stdout.write("Hi, what's your name? Enter here: ");

stdin.on('data', (data) => {
  const input = data.toString().trim();
  if (input.toLowerCase() === 'exit') {
    console.log('Goodbye!');
    process.exit()
  }
  writableStream.write(input + '\n');
  stdout.write('Enter something else: ');
})

process.on('SIGINT', () => {
  console.log('\nGoodbye!');
  process.exit();
});