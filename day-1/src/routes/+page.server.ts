type ExtDataPayload = {
	name: string;
	tally: number;
}[];

export const load = async ({ fetch }) => {
	const res = await fetch('https://advent.sveltesociety.dev/data/2023/day-one.json');

	const data = (await res.json()) as ExtDataPayload;

	// split into a naughty and nice array, sorted
	const naughty: ExtDataPayload = [];
	const nice: ExtDataPayload = [];

	// this is O(n^2) I think...
	data.forEach((item) => {
		if (item.tally <= 0) {
			insertInOrder(naughty, item); // O(n)
		} else {
			insertInOrder(nice, item); // O(n)
		}
	});

	// another way you could do this is just run the .sort() method (I have to guess its O(log(n)))
	// the problem is we have to split it into an even and odd...
	// another idea:

	// O(log(n))
	const sorted = data.sort((a, b) => a.tally - b.tally);

	let idx = 0;
	// O(n)
	while (idx < sorted.length) {
		if (sorted[idx].tally > 0) {
			break;
		}

		idx++;
	}

	const naughty2 = sorted.slice(0, idx);
	const nice2 = sorted.slice(idx, sorted.length);

	return {
		naughty,
		nice,
		naughty2,
		// idk if there is a way to get rid of this reverse call (I think its log(n))
		nice2: nice2.reverse()
	};
};

// pretty sure that this is unhinged but its the insert sort I came up with at 2 AM
// I think this is O(n)
const insertInOrder = (a: ExtDataPayload, item: { name: string; tally: number }) => {
	let idx = 0;
	while (idx < a.length) {
		if (item.tally > 0) {
			if (a[idx].tally <= item.tally) {
				a.splice(idx, 0, item);
				return;
			}
		} else {
			if (a[idx].tally > item.tally) {
				a.splice(idx, 0, item);
				return;
			}
		}
		idx++;
	}

	a.push(item);
};
