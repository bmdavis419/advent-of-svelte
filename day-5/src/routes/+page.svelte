<script lang="ts">
	import { Chart, Svg, Axis, Bars } from 'layerchart';

	const { data } = $props();

	$effect(() => {
		console.log(data.tasks);
	});

	const testData = [
		{
			date: '2023-11-26T05:00:00.000Z',
			value: 20,
			baseline: 61
		},
		{
			date: '2023-11-27T05:00:00.000Z',
			value: 46,
			baseline: 49
		},
		{
			date: '2023-11-28T05:00:00.000Z',
			value: 35,
			baseline: 34
		},
		{
			date: '2023-11-29T05:00:00.000Z',
			value: 97,
			baseline: 83
		},
		{
			date: '2023-11-30T05:00:00.000Z',
			value: 71,
			baseline: 68
		},
		{
			date: '2023-12-01T05:00:00.000Z',
			value: 98,
			baseline: 61
		},
		{
			date: '2023-12-02T05:00:00.000Z',
			value: 62,
			baseline: 27
		},
		{
			date: '2023-12-03T05:00:00.000Z',
			value: 81,
			baseline: 31
		},
		{
			date: '2023-12-04T05:00:00.000Z',
			value: 63,
			baseline: 43
		},
		{
			date: '2023-12-05T05:00:00.000Z',
			value: 77,
			baseline: 73
		}
	];
</script>

<div class="h-[300px] p-4 border rounded">
	<Chart
		data={testData}
		x="value"
		xDomain={[0, null]}
		xNice
		y="date"
		padding={{ left: 20, bottom: 20 }}
	>
		<Svg>
			<Axis placement="bottom" grid rule />
			<Axis placement="left" rule />
			<Bars radius={4} strokeWidth={1} class="fill-accent-500" />
		</Svg>
	</Chart>
</div>
