import type { Task } from '$lib/types';

export const csr = true;
export const ssr = false;

export const load = async ({ fetch }) => {
	const res = await fetch('https://advent.sveltesociety.dev/data/2023/day-five.json');

	const tasks = (await res.json()) as Task[];

	return { tasks };
};
