module.exports = ast => {
	const parseStatement = input => {
		if(input instanceof Array) {
			return input.map(parseStatement).join('\n');
		}

		if(input.type === 'function') {
			return `.globl _${input.name}
_${input.name}:
${parseStatement(input.body)}`;
		}

		if(input.type === 'return') {
			return `movl $${input.value}, %eax\nret`;
		}

		throw new Error(`Unknown statement '${input}'`)
	};

	return parseStatement(ast);
};
