<script>
</script>

<div class="info-box">
	<div class="info-message">Do you want to play another round?</div>
	<div class="button-container">
		<button class="play-button">Play Again</button>
		<button class="cancel-button">Cancel</button>
	</div>
</div>

<style>
	.info-box {
		background-color: #f1f1f1;
		border-radius: 8px;
		padding: 20px;
		text-align: center;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
		max-width: 300px;
		margin: 0 auto;
	}

	.info-message {
		font-size: 18px;
		margin-bottom: 16px;
	}

	.button-container {
		display: flex;
		justify-content: center;
		gap: 10px;
	}

	.play-button,
	.cancel-button {
		padding: 10px 20px;
		font-size: 14px;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	.play-button {
		background-color: #3498db;
		color: white;
	}

	.cancel-button {
		background-color: #e74c3c;
		color: white;
	}
</style>
