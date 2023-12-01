<script>
	import * as Table from '$lib/components/ui/table';

	const { data } = $props();

	// will add later
	// const naughty = $state(data.naughty);
	// const nice = $state(data.nice);
</script>

<div class="flex flex-row">
	<div class="w-1/2">
		<Table.Root class="w-[400px] mx-auto">
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-[100px]">Name</Table.Head>

					<Table.Head class="text-right">Tally</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each data.nice as good}
					<Table.Row>
						<Table.Cell class="font-medium">{good.name}</Table.Cell>
						<Table.Cell class="text-right">{good.tally}</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>

	<div class="w-1/2">
		<Table.Root class="w-[400px] mx-auto">
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-[100px]">Name</Table.Head>

					<Table.Head class="text-right">Tally</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each data.naughty as bad}
					<Table.Row>
						<Table.Cell class="font-medium">{bad.name}</Table.Cell>
						<Table.Cell class="text-right">{bad.tally}</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
</div>
