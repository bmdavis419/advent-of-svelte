export const load = async () => {
	const testing = testPromise();

	return {
		streamed: {
			testing
		},
		demo: 'string'
	};
};

const testPromise = async () => {
	return new Promise<string>((resolve) => {
		setTimeout(() => {
			// Other things to do before completion of the promise
			console.log('Did something');
			// The fulfillment value of the promise
			resolve('hey');
		}, 5000);
	});
};
