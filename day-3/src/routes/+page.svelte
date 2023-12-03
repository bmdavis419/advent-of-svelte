<script lang="ts">
	import LightSwitch from '$lib/components/LightSwitch.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Table from '$lib/components/ui/table';
	import { ArrowDown, ArrowUp } from 'lucide-svelte';
	import { Progress } from '$lib/components/ui/progress';

	const { data } = $props();

	type StopEntry = {
		name: string;
		weight: number;
	};

	let unloaded = $state<StopEntry[]>([]);
	let loaded = $state<StopEntry[]>([]);

	let unloadedSortDirection = $state<'asc' | 'desc'>('desc');
	let loadedSortDirection = $state<'asc' | 'desc'>('desc');

	let unloadedSorted = $derived(() => {
		if (unloadedSortDirection === 'asc') {
			return unloaded.sort((a, b) => a.weight - b.weight);
		}

		return unloaded.sort((a, b) => b.weight - a.weight);
	});

	let loadedSorted = $derived(() => {
		if (loadedSortDirection === 'asc') {
			return loaded.sort((a, b) => a.weight - b.weight);
		}

		return loaded.sort((a, b) => b.weight - a.weight);
	});

	let totalWeightLoaded = $derived(() => {
		if (loaded.length > 0) {
			return loaded.reduce((prev, cur) => {
				return {
					weight: prev.weight + cur.weight,
					name: 'total'
				};
			});
		}

		return {
			weight: 0,
			name: 'total'
		};
	});

	// set the unloaded state on mount
	$effect(() => {
		unloaded = data.stops;
	});
</script>

<main class="w-full min-h-screen">
	<nav class="w-full p-8 flex flex-row justify-between items-center">
		<h2 class="text-3xl font-bold">Load Balancer</h2>
		<div class="flex flex-row items-center gap-x-4">
			<Button
				variant="link"
				href="https://github.com/bmdavis419/advent-of-svelte/tree/main/day-3"
				target="_blank">repo</Button
			>
			<Button variant="link" href="https://advent.sveltesociety.dev" target="_blank">problem</Button
			>
			<LightSwitch />
		</div>
	</nav>

	<div class="w-full flex flex-col items-center justify-center gap-y-4">
		<h4 class="text-lg font-light">
			Total Amount Loaded: <span class="font-bold">{totalWeightLoaded().weight.toFixed(2)} kg</span>
		</h4>
		<Progress
			value={totalWeightLoaded().weight}
			max={100}
			class={`w-[60%] border ${
				totalWeightLoaded().weight > 100 ? 'border-red-600' : 'border-green-600'
			}`}
		/>
		<h5 class="text-md font-light text-red-600 italic tracking-wide">
			{#if totalWeightLoaded().weight > 100}
				Too many stops loaded, please remove one...
			{/if}
		</h5>
	</div>

	<div class="flex flex-row justify-between w-full p-12 gap-x-5">
		<Table.Root class=" border border-neutral-600 rounded-lg">
			<Table.Caption>All unloaded stops</Table.Caption>
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-[200px]">Name</Table.Head>
					<Table.Head
						class="flex flex-row items-center gap-x-1 hover:underline cursor-pointer"
						onclick={() => {
							if (unloadedSortDirection === 'asc') {
								unloadedSortDirection = 'desc';
							} else {
								unloadedSortDirection = 'asc';
							}
						}}
						>Weight
						<ArrowDown class={`w-4 h-4 ${unloadedSortDirection !== 'desc' && 'hidden'}`} />
						<ArrowUp class={`w-4 h-4 ${unloadedSortDirection !== 'asc' && 'hidden'}`} />
					</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each unloadedSorted() as stop, i}
					<Table.Row>
						<Table.Cell class="font-medium">{stop.name}</Table.Cell>
						<Table.Cell>{stop.weight} kg</Table.Cell>
						<Table.Cell class="text-right"
							><Button
								class="bg-green-700 text-white"
								disabled={totalWeightLoaded().weight > 100}
								on:click={() => {
									unloaded.splice(i, 1);
									unloaded = unloaded;
									loaded.push(stop);
									loaded = loaded;
								}}>Load</Button
							></Table.Cell
						>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>

		<Table.Root class=" border border-neutral-600 rounded-lg">
			<Table.Caption>All loaded stops</Table.Caption>
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-[200px]">Name</Table.Head>
					<Table.Head
						class="flex flex-row items-center gap-x-1 hover:underline cursor-pointer"
						onclick={() => {
							if (loadedSortDirection === 'asc') {
								loadedSortDirection = 'desc';
							} else {
								loadedSortDirection = 'asc';
							}
						}}
						>Weight
						<ArrowDown class={`w-4 h-4 ${loadedSortDirection !== 'desc' && 'hidden'}`} />
						<ArrowUp class={`w-4 h-4 ${loadedSortDirection !== 'asc' && 'hidden'}`} />
					</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each loadedSorted() as stop, i}
					<Table.Row>
						<Table.Cell class="font-medium">{stop.name}</Table.Cell>
						<Table.Cell>{stop.weight} kg</Table.Cell>
						<Table.Cell class="text-right"
							><Button
								class="bg-red-700 text-white"
								on:click={() => {
									loaded.splice(i, 1);
									loaded = loaded;
									unloaded.push(stop);
									unloaded = unloaded;
								}}>Unload</Button
							></Table.Cell
						>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
</main>
