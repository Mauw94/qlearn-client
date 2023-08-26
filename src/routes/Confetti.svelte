<script>

	import { confetti } from "@neoconfetti/svelte";

</script>
<div
	style="position: absolute; left: 20%; top: 10%"
	use:confetti={{
		particleCount: 50,
		force: 1,
		stageWidth: window.innerWidth - 200,
		stageHeight: window.innerHeight / 2 + 200,
		colors: ['#ff3e00', '#40b3ff', '#676778']
	}}
/>
