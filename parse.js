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

		console.log(tokens);

		for(let i = 0; i < tokens; i++) {
			/*
			if(tokens[i].type === 'open-brace') {
				const indexOfClose = i - tokens.slice(0)
					.reverse()
					.findIndex(token => token.type === 'close-brace');

				body.push(parseStatement(tokens.slice(i + 1, indexOfClose - 1)));
			}
			*/

			if(tokens[i].type === 'return') {
				body.push({
					type: 'return',
					value: tokens[i + 1].value
				});

				i++;
			}
		}

		return body;
	};

	return parseStatement(tokens);
};
