<script lang="ts">
	import { onMount } from 'svelte';
	import { appClientId } from '../globals';
	import { fetchNextQuestion, initQuestionsCache } from '../services/question.service';
	import type { Question } from '../domain/models/question.model';
	import { DataFetchIsUndefinedOrEmpty } from '../infra/messages';

	console.log('init play component');

	let clientId: string = '';
	let question: Question | undefined;
	let answerValue: string = '';

	async function getClientId() {
		appClientId.subscribe((res) => {
			clientId = res;
		});
	}

	async function submitAnswer() {
		console.log(answerValue);
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
		<button class="submit-button" on:click={submitAnswer}><span class="icon">&#10003;</span></button>
	</div>
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
		background-color: #FF3E00;
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
