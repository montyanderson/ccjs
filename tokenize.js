module.exports = input => {
	const tokens = [];

	for(let i = 0; i < input.length; i) {
		const char = input[i];

		// whitespace

		const whitespace = [
			'\t',
			' ',
			'\n'
		];

		if(whitespace.indexOf(char) !== -1) {
			i++;
			continue;
		}

		// types

		const types = [
			'int'
		];

		for(const type of types) {
			// if following is type + whitespace
			if(input.slice(i, i + type.length) === type && whitespace.indexOf(input[i + type.length]) !== -1) {
				tokens.push({
					type: 'type',
					value: 'int'
				});

				i += type.length + 1;

				continue;
			}
		}

		// functions

		if(input.slice(i, i + 4) === 'main') {
			tokens.push({
				type: 'function',
				value: 'main'
			});

			i += 'main'.length;

			continue;
		}

		// open parentheses

		if(char === '(') {
			tokens.push({
				type: 'open-parentheses'
			});

			i++;

			continue;
		}

		// close parentheses

		if(char === ')') {
			tokens.push({
				type: 'close-parentheses'
			});

			i++;

			continue;
		}

		// open brace

		if(char === '{') {
			tokens.push({
				type: 'open-brace'
			});

			i++;

			continue;
		}

		// close brace

		if(char === '}') {
			tokens.push({
				type: 'close-brace'
			});

			i++;

			continue;
		}

		// return

		if(input.slice(i, i + 'return'.length) === 'return' && whitespace.includes(input[i + 'return'.length])) {
			tokens.push({
				type: 'return'
			});

			i += 'return'.length + 1;

			continue;
		}

		// constants

		const numbers = [
			'0',
			'1',
			'2',
			'3',
			'4',
			'5',
			'6',
			'7',
			'8',
			'9'
		];

		if(numbers.includes(input[i])) {
			tokens.push({
				type: 'numeric-constant',
				value: Number(input[i])
			});

			i += 2;

			continue;
		}

		// semicolon

		if(char === ';') {
			tokens.push({
				type: 'semicolon'
			});

			i++;

			continue;
		}

		throw new Error(`Unrecognised token '${char}'`);
	}

	return tokens;
}
