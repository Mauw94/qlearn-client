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

	console.log('init play component');

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
		console.log(answerValue);
		answeredCorrectly = false;
		const result = await answerQuestion(clientId, answerValue, question?.id as string);
		if (result) {
			answeredCorrectly = true;
			answerValue = '';
			question = await fetchNextQuestion(clientId);
			// todo show show green stuff showing answer is correct etc
			// todo next question
		}
	}

	onMount(async () => {
		await getClientId();
		await initQuestionsCache(clientId);
		question = await fetchNextQuestion(clientId);
		if (question === undefined) {
			throw new Error(DataFetchIsUndefinedOrEmpty('question'));
		}
		console.log(question);
	});
</script>

<div class="">
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
