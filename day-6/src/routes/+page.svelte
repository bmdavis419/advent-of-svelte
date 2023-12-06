<script lang="ts">
	let beats = $state<number[]>([]);

	let initMs = $state(new Date().getTime());

	let beatsDifferenceAverageTotal = $state(0);

	let autoInterval = $state<number | null>(null);

	const clearBeats = () => {
		initMs = new Date().getTime();
		beatsDifferenceAverageTotal = 0;
		beats = [];
		if (autoInterval) {
			clearInterval(autoInterval);
			autoInterval = null;
		}
	};

	const addBeat = () => {
		const now = new Date();
		const beat = now.getTime() - initMs;

		if (beats.length > 0) {
			const lastBeat = beats[beats.length - 1];
			beatsDifferenceAverageTotal += beat - lastBeat;
		}

		beats.push(beat);
	};

	const startAutoBeat = () => {
		const interval = setInterval(() => {
			addBeat();
		}, 500);

		autoInterval = interval;
	};

	const stopAutoBeat = () => {
		if (autoInterval) clearInterval(autoInterval);
		autoInterval = null;
	};

	const avgTimeBetweenBeats = $derived(() => {
		if (beats.length < 2) return 0;

		return beatsDifferenceAverageTotal / (beats.length - 1);
	});

	const beatsPerMinute = $derived(() => {
		const avg = avgTimeBetweenBeats();

		if (avg === 0) return 0;

		return 60000 / avgTimeBetweenBeats();
	});
</script>

<h2>BPM Counter</h2>

<h3>Average time between beats: {avgTimeBetweenBeats().toFixed(2)}</h3>

<h3>Average BPM: {beatsPerMinute().toFixed(2)}</h3>

<div class="mb-4">
	<button class="bg-blue-600 text-white font-bold px-4 py-2 rounded-md" on:click={addBeat}
		>Add Beat</button
	>
	<button class="bg-red-600 text-white font-bold px-4 py-2 rounded-md" on:click={clearBeats}
		>Clear Beats</button
	>
</div>

<div class="mb-4">
	<button class="bg-green-600 text-white font-bold px-4 py-2 rounded-md" on:click={startAutoBeat}
		>Start Auto Beat (120 BPM)</button
	>
	<button class="bg-red-600 text-white font-bold px-4 py-2 rounded-md" on:click={stopAutoBeat}
		>Stop Auto Beat</button
	>
</div>

<h4>Current Beats:</h4>

{#each beats as beat}
	<div>{beat}</div>
{/each}
