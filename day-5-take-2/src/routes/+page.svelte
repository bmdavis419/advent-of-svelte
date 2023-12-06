<script>
	import { testData } from '$lib/test-data';
	import { Chart, Svg, Axis, Bars } from 'layerchart';
	import { scaleBand } from 'd3-scale';
	import { formatDate, PeriodType } from 'svelte-ux';

	const data = testData;
</script>

<div class="h-[300px] p-4 border rounded">
	<Chart
		{data}
		x="date"
		xScale={scaleBand().padding(0.4)}
		y="value"
		yDomain={[0, null]}
		yNice
		padding={{ left: 16, bottom: 24 }}
	>
		<Svg>
			<Axis placement="left" grid rule />
			<Axis placement="bottom" format={(d) => formatDate(d, PeriodType.Day, 'short')} rule />
			<Bars radius={4} strokeWidth={1} class="fill-accent-500" />
		</Svg>
	</Chart>
</div>
