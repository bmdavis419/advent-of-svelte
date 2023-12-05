export const load = async () => {
	return {
		streamed: {
			testing: sleep('Hello There', 4000)
		},
		demo: 'string'
	};
};

function sleep(value: string, ms: number) {
	return new Promise((fulfil) => {
		setTimeout(() => {
			fulfil(value);
		}, ms);
	});
}
