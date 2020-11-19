<script>
	export let cards
	export let hidden
	export let name
	export let point
</script>

<span>
	{name}:
	{#if hidden}
		** [{cards[0] && cards[0].mark + cards[0].num}, **]
	{:else}
		{point} [{cards.map(v => v.mark + v.num).join()}]
	{/if}
</span>
