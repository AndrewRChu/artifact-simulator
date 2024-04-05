<script lang="ts">
	import { onMount } from 'svelte';
	import { Chart } from 'chart.js/auto';
	import { ArtifactSimulation, Circlet } from '$lib/Artifacts';

	let canvas: HTMLCanvasElement;
	let chart: Chart;
	let simulating = false;

	let numArtifacts = 10000;
	let epochs = 200;
	let numDesirableSets: number = 2;

	async function simulate() {
		if (chart) {
			chart.destroy();
		}
		const sim = new ArtifactSimulation(numArtifacts, epochs, numDesirableSets);
		const critValueOverTime = sim.run();

		chart = new Chart(canvas, {
			type: 'line',
			data: {
				labels: [...Array(numArtifacts).keys()],
				datasets: [
					{
						label: `Average crit value over ${epochs} simulations`,
						data: critValueOverTime,
						stepped: true,
						borderColor: '#97a3b7',
						borderWidth: 2
					}
				]
			},
			options: {
				animation: false,
				maintainAspectRatio: false,
				elements: {
					point: { radius: 0 }
				},
				plugins: {
					tooltip: {
						enabled: false
					},
					legend: {
						display: false
					}
				},
				scales: {
					x: {
						title: {
							display: true,
							text: '# artifacts'
						},
						ticks: {
							stepSize: 1000
							// color: 'red'
						}
					},
					y: {
						title: {
							display: true,
							text: 'Crit value'
						},
						ticks: {
							stepSize: 10
						}
					}
				},
				events: []
			}
		});
	}
</script>

<div class="flex h-full w-full flex-row gap-2 p-2">
	<div class="flex w-96 flex-col justify-between">
		<div class="flex flex-col">
			<div class="flex flex-col gap-2">
				<div class="flex flex-row gap-2">
					<span class="w-48"># artifacts</span>
					<input
						type="number"
						min={1}
						max={10000}
						bind:value={numArtifacts}
						class="w-full border border-slate-400"
					/>
				</div>
				<!-- <div class="flex flex-row gap-2">
					<span class="w-48">Desirable sets</span>
					<select bind:value={numDesirableSets} class="w-full border border-slate-400">
						<option value={1}>1</option>
						<option value={2}>2</option>
					</select>
				</div> -->
				<div class="flex flex-row gap-2">
					<span class="w-48">Simulations</span>
					<input
						type="number"
						min={1}
						max={1000}
						bind:value={epochs}
						class="w-full border border-slate-400"
					/>
				</div>
				<button
					on:click={simulate}
					disabled={simulating}
					class="bg-green-400 px-4 py-2"
					class:bg-red-500={simulating}>Run simulation</button
				>
				<div class="flex flex-col gap-2">
					<p>
						A point <i>(x,y)</i> represents <i>y</i>, the sum of the highest crit value of all 5
						types of pieces after collecting and fully leveling up <i>x</i> artifacts. It assumes farming
						an artifact domain with only 1 desirable set.
					</p>
					<p>
						While crit rate and damage are not always the best way to assess the value of an
						artifact, they are the second rarest main stat as well as the rarest substat. Thus, the
						amount of time deduced from this simulation for how long you want to spend farming for
						artifacts should be an overestimation.
					</p>
					<p>
						Eventually I will make it so you can set targets you want to reach for all stats instead
						of only caring about crit value.
					</p>
				</div>
			</div>
		</div>
		<!-- <div><a href="/help">Help</a></div> -->
	</div>
	<div class="h-full w-full border border-slate-400 p-2">
		<canvas bind:this={canvas} />
	</div>
</div>
