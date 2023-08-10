<script lang="ts">
	import { onMount } from 'svelte';
	import { appClientId } from '../globals';
	import Play from './Play.svelte';
	import { v4 as uuidv4 } from 'uuid';

	async function setClientId() {
		let id = uuidv4();
		console.log('client ID: ', id);
		appClientId.set(id);
	}

	onMount(() => {
		setClientId();
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte app" />
</svelte:head>

<section>
	<Play />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1.6;
	}
</style>
