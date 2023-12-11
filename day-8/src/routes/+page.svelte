<script lang="ts">
	import '../app.css';
	import SvelteLogo from '$lib/assets/sveltekit.png';
	const cards = $state<
		{
			key: number;
			matched: boolean;
		}[]
	>([]);
	let hasSet = false;

	let firstVisibleIdx = $state<number | null>(null);
	let secondVisibleIdx = $state<number | null>(null);

	const showCard = (idx: number) => {
		if (idx === firstVisibleIdx || idx === secondVisibleIdx) return true;

		if (cards[idx].matched === true) return true;

		return false;
	};

	const flip = (idx: number) => {
		if (firstVisibleIdx) {
			if (!secondVisibleIdx) {
				// flipping second card
				secondVisibleIdx = idx;
				const cardOne = cards[firstVisibleIdx].key;
				const cardTwo = cards[idx].key;

				if (cardOne === cardTwo) {
					cards[firstVisibleIdx].matched = true;
					cards[idx].matched = true;
				}
				setTimeout(() => {
					firstVisibleIdx = null;
					secondVisibleIdx = null;
				}, 1000);
			}
		} else {
			firstVisibleIdx = idx;
		}
	};

	$effect(() => {
		if (!hasSet) {
			// populate the array
			for (let i = 0; i < 24; i++) {
				cards.push({
					key: i + 1,
					matched: false
				});
				cards.push({
					key: i + 1,
					matched: false
				});
			}

			// shuffle the array
			for (let i = cards.length - 1; i > 0; i--) {
				let j = Math.floor(Math.random() * (i + 1));
				let temp = cards[i];
				cards[i] = cards[j];
				cards[j] = temp;
			}

			hasSet = true;
		}
	});
</script>

<div class="flex flex-row flex-wrap gap-4 p-12">
	{#each cards as card, i}
		{#if showCard(i)}
			<div class="w-[100px] h-[150px] overflow-hidden">
				<img
					src={`https://advent.sveltesociety.dev/data/2023/day-eight/${card.key}.png`}
					alt="card"
					width={100 * 2}
					height={150 * 2}
				/>
			</div>
		{:else}
			<button
				class="w-[100px] h-[145px] bg-slate-950 flex items-center justify-center rounded-lg shadow-xl"
				on:click={() => flip(i)}
			>
				<img src={SvelteLogo} alt="SvelteKit" width="50" height="60" />
			</button>
		{/if}
	{/each}
</div>
