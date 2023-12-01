<script>
	const { data } = $props();

	// will add later
	// const naughty = $state(data.naughty);
	// const nice = $state(data.nice);
</script>

<div class="flex flex-row justify-between">
	<div class="flex flex-col items-center w-1/2">
		<h2>NAUGHTY</h2>
		{#each data.naughty as bad}
			<div>{bad.name}: {bad.tally}</div>
		{/each}
	</div>

	<div class="flex flex-col items-center w-1/2">
		<h2>NICE</h2>
		{#each data.nice as good}
			<div>{good.name}: {good.tally}</div>
		{/each}
	</div>
</div>
