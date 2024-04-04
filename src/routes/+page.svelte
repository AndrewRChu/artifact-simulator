<script lang="ts">
	import { weightedRandom } from '$lib/utils';
	import { Flower, Feather } from '$lib/Artifacts';
	for (let i = 0; i < 10000; i++) {
		const feather = new Feather();
		feather.levelUp(20);
		if (feather.critValue() > 50) {
			console.log(feather.critValue());
			console.log(feather);
		}
	}
</script>
