<script lang="ts">
	import { onMount } from 'svelte';
	import { Chart } from 'chart.js/auto';
	import { ArtifactSimulation, Circlet } from '$lib/Artifacts';

	let canvas: HTMLCanvasElement;

	const sim = new ArtifactSimulation();
	const critValueOverTime = sim.run();

	console.log(critValueOverTime);

	onMount(async () => {
		const chart = new Chart(canvas, {
			type: 'line',
			data: {
				labels: [...Array(10000).keys()],
				datasets: [{ label: 'Crit value', data: critValueOverTime, stepped: true }]
			},
			options: {
				maintainAspectRatio: false,
				elements: {
					point: { radius: 0 }
				},
				plugins: {
					tooltip: {
						enabled: false
					}
				},
				scales: {
					x: {
						ticks: {
							stepSize: 1000
							// color: 'red'
						}
					},
					y: {
						ticks: {
							stepSize: 10
						}
					}
				}
			}
		});

		console.log(chart);
	});
</script>

<div class="h-full w-full">
	<canvas bind:this={canvas} />
</div>
