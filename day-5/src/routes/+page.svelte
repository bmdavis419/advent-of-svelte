<script lang="ts">
	let { data } = $props();

	$effect(() => {
		console.log(data.streamed.testing);
	});
</script>

{#await data.streamed.testing}
	Loading...
{:then value}
	<h1>{value}</h1>
{/await}

<h2>THIS IS SOME CONTENT THAT SHOULD SHOW UP INSTANTLY</h2>
