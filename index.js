const fs = require('fs');

const tokenize = require('./tokenize');
const parse = require('./parse');

const input = fs.readFileSync(`${__dirname}/input.c`, 'utf8');

const tokens = tokenize(input);
console.log(tokens);

const ast = parse(tokens);
console.log(ast);
