module.exports = tokens => {
	const parseStatement = tokens => {
		if(
			tokens[0].type === 'type' &&
			tokens[1].type === 'function' &&
			tokens[2].type === 'open-parentheses' &&
			tokens[3].type === 'close-parentheses'
		) {
			return {
				type: 'function',
				name: tokens[1].value,
				body: parseStatement(tokens.slice(4))
			};
		}

		const body = [];

		for(let i = 0; i < tokens.length; i++) {
			if(tokens[i].type === 'open-brace') {
				const indexOfClose = tokens.length - tokens.slice(0)
					.reverse()
					.findIndex(token => token.type === 'close-brace');

				body.push(parseStatement(tokens.slice(i + 1, indexOfClose - 1)));

				i = indexOfClose;
				continue;
			}

			if(tokens[i].type === 'return') {
				body.push({
					type: 'return',
					value: tokens[i + 1].value
				});

				i++;
				continue;
			}
		}

		return body;
	};

	return parseStatement(tokens);
};
