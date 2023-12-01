type ExtDataPayload = {
	name: string;
	tally: number;
}[];

// O(n^3)
const algOne = (data: ExtDataPayload) => {
	// split into a naughty and nice array, sorted
	const naughty: ExtDataPayload = [];
	const nice: ExtDataPayload = [];

	// this is O(n^3)
	data.forEach((item) => {
		if (item.tally <= 0) {
			insertInOrder(naughty, item); // O(n^2)
		} else {
			insertInOrder(nice, item); // O(n^2)
		}
	});

	return { naughty, nice };
};

// O(nlog(n) + O(n) + O(n) + O(n) = O(nlog(n)))
const algTwo = (data: ExtDataPayload) => {
	// O(nlog(n))
	const sorted = data.sort((a, b) => a.tally - b.tally);

	let idx = 0;
	// O(n)
	while (idx < sorted.length) {
		if (sorted[idx].tally > 0) {
			break;
		}

		idx++;
	}

	// O(n) (there is some probabilistic analysis that could be done here, but nah)
	const naughty = sorted.slice(0, idx);

	// O(n)
	const nice = sorted.slice(idx, sorted.length);

	// O(n)
	return { naughty, nice: nice.reverse() };
};

export const load = async ({ fetch }) => {
	const res = await fetch('https://advent.sveltesociety.dev/data/2023/day-one.json');

	const data = (await res.json()) as ExtDataPayload;

	const alg1Res = algOne(data);
	const alg2Res = algTwo(data);

	return {
		naughty: alg1Res.naughty,
		nice: alg1Res.nice,
		naughty2: alg2Res.naughty,
		nice2: alg2Res.nice
	};
};

// pretty sure that this is unhinged but its the insert sort I came up with at 2 AM
// I think this is O(n^2)
const insertInOrder = (a: ExtDataPayload, item: { name: string; tally: number }) => {
	let idx = 0;
	while (idx < a.length) {
		if (item.tally > 0) {
			if (a[idx].tally <= item.tally) {
				a.splice(idx, 0, item); // O(n)
				return;
			}
		} else {
			if (a[idx].tally > item.tally) {
				a.splice(idx, 0, item); // O(n)
				return;
			}
		}
		idx++;
	}

	a.push(item);
};
