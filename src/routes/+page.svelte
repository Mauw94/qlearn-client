<script lang="ts">
	import { onMount } from 'svelte';
	import { appClientId } from '../globals';
	import Play from './Play.svelte';
	import { v4 as uuidv4 } from 'uuid';
	import { Subject } from '../domain/enum/subject.enum';

	let subjectChosen: boolean = false;
	let chosenSubject: Subject;

	async function setClientId() {
		let id = uuidv4();
		console.log('client ID: ', id);
		appClientId.set(id);
	}

	function setSubject(subject: Subject) {
		chosenSubject = subject;
		subjectChosen = true;
	}

	function unsetSubject() {
		subjectChosen = false;
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
	<a class="submit-button" style="margin-bottom: 40px;" href="/" on:click={() => unsetSubject()}
		>Back to subjects</a
	>
	{#if !subjectChosen}
		<div id="game" class="shake">
			<div id="difficulties" class="button-container">
				<button class="square-button active" on:click={() => setSubject(Subject.MathArithmetic)}
					>Math: arithmetic questions</button
				>
				<button class="square-button active" on:click={() => setSubject(Subject.History)}
					>History</button
				>
			</div>
		</div>
	{:else}
		<Play subject={chosenSubject} />
	{/if}
</section>

<style>
	.submit-button {
		padding: 10px 20px;
		background-color: #ff3e00;
		color: white;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		transition: background-color 0.3s;
	}

	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.8;
	}

	.button-container {
		display: flex;
		margin-bottom: 150px;
	}

	.square-button {
		width: 100px;
		height: 100px;
		margin-right: 10px;
		background-color: rgba(255, 255, 255, 0.7);
		border: none;
		color: white;
		font-size: 16px;
		cursor: pointer;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	.square-button:hover {
		color: var(--color-theme-1);
	}
</style>
