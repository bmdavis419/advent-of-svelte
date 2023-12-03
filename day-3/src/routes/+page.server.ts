export const load = async ({ fetch }) => {
	const res = await fetch('https://advent.sveltesociety.dev/data/2023/day-three.json');

	const data = (await res.json()) as {
		name: string;
		weight: number;
	}[];

	return { stops: data.sort((a, b) => b.weight - a.weight) };
};
