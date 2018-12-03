const fs = require('fs');

const tokenize = require('./tokenize');
const parse = require('./parse');
const generate = require('./generate');

const input = fs.readFileSync(`${__dirname}/input.c`, 'utf8');

const tokens = tokenize(input);

if(process.env.DEBUG)
	console.log('tokens', tokens);

const ast = parse(tokens);

if(process.env.DEBUG)
	console.log('ast', ast);

const assembly = generate(ast);
console.log(assembly);
