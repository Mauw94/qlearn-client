<script lang="ts">
	import { confetti } from '@neoconfetti/svelte';
	import { reduced_motion } from './sverdle/reduced-motion';
	import { onMount } from 'svelte';
	import { appClientId } from '../globals';
	import {
		answerQuestion,
		fetchNextQuestion,
		initQuestionsCache
	} from '../services/question.service';
	import type { Question } from '../domain/models/question.model';
	import { DataFetchIsUndefinedOrEmpty } from '../infra/messages';
	import { Difficulty } from '../domain/enum/difficulty.enum';

	let difficulty: Difficulty = Difficulty.EASY;
	let clientId: string = '';
	let question: Question | undefined;
	let answerValue: string = '';
	let answeredCorrectly: boolean = false;

	async function getClientId() {
		appClientId.subscribe((res) => {
			clientId = res;
		});
	}

	async function submitAnswer() {
		answeredCorrectly = false;
		const result = await answerQuestion(clientId, answerValue, question?.id as string);
		if (result) {
			answeredCorrectly = true;
			answerValue = '';
			question = await fetchNextQuestion(clientId);
		}
	}

	async function setDifficulty(diff: Difficulty) {
		difficulty = diff;
		await setup();
	}

	async function setup() {
		await initQuestionsCache(difficulty, clientId);
		question = await fetchNextQuestion(clientId);
		if (question === undefined) {
			throw new Error(DataFetchIsUndefinedOrEmpty('question'));
		}
	}
	onMount(async () => {
		await getClientId();
		await setup();
		const buttons = document.querySelectorAll('.square-button');
		buttons.forEach((button) => {
			button.addEventListener('click', () => {
				// Remove active class from all buttons
				buttons.forEach((btn) => btn.classList.remove('active'));
				// Add active class to the clicked button
				button.classList.add('active');
			});
		});
	});
</script>

<div class="">
	<div class="button-container">
		<button class="square-button active" on:click={() => setDifficulty(Difficulty.EASY)}
			>Easy</button
		>
		<button class="square-button" on:click={() => setDifficulty(Difficulty.MEDIUM)}>Medium</button>
		<button class="square-button" on:click={() => setDifficulty(Difficulty.HARD)}>Hard</button>
		<button class="square-button" on:click={() => setDifficulty(Difficulty.VERY_HARD)}
			>Very hard</button
		>
		<button class="square-button" on:click={() => setDifficulty(Difficulty.EINSTEIN)}
			>Einstein</button
		>
	</div>

	<!-- svelte-ignore a11y-label-has-associated-control -->
	<pre class="input-label">What is: {question?.question}?</pre>
	<div class="input-field-container">
		<input type="text" class="input-field" bind:value={answerValue} placeholder="Answer..." />
		<button class="submit-button" on:click={submitAnswer}><span class="icon">&#10003;</span></button
		>
	</div>

	{#if answeredCorrectly}
		<div
			style="position: absolute; left: 50%; top: 30%"
			use:confetti={{
				particleCount: $reduced_motion ? 0 : undefined,
				force: 0.7,
				stageWidth: window.innerWidth,
				stageHeight: window.innerHeight,
				colors: ['#ff3e00', '#40b3ff', '#676778']
			}}
		/>
	{/if}
</div>

<style>
	.button-container {
		display: flex;
		margin-bottom: 150px;
	}

	.square-button {
		width: 75px;
		height: 75px;
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

	.active {
		color: var(--color-theme-1);
	}

	.input-label {
		margin-bottom: 20px;
		font-weight: bold;
	}

	.input-field-container {
		display: flex;
		align-items: center;
		margin-bottom: 20px;
	}

	.input-field {
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 5px;
		flex: 1;
		margin-right: 10px;
	}

	.submit-button {
		padding: 10px 20px;
		background-color: #ff3e00;
		color: white;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		transition: background-color 0.3s;
	}

	.submit-button:hover {
		background-color: #0056b3;
	}
</style>
