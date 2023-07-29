<script lang="ts">
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
	import { onMount } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';
	import { appClientId } from '../globals';

	let clientId: string = '';

	async function setClientId() {
		let id = uuidv4();
		clientId = id;
		console.log('client ID: ', clientId);
		appClientId.set(id);
	}

	async function initQuestionsCache() {
		try {
			const baseUrl = 'http://localhost:3000/';
			const response = await fetch(baseUrl + 'question/init/' + clientId, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (response.ok) {
			}
		} catch (err) {
			console.error('Error while initializing cache:', err);
		}
	}

	async function fetchQuestions() {
		try {
			const baseUrl = 'http://localhost:3000/';
			const response = await fetch(baseUrl + 'question/' + clientId, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (response.ok) {
				const data = await response.json();
			}
		} catch (err) {
			console.error(err);
		}
	}

	onMount(() => {
		setClientId();
		initQuestionsCache();
		fetchQuestions();
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>
		<span class="welcome">
			<picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcome_fallback} alt="Welcome" />
			</picture>
		</span>

		to your new<br />SvelteKit app
	</h1>

	<h2>
		try editing <strong>src/routes/+page.svelte</strong>
	</h2>

	<Counter />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
