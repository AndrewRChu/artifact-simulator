export function weightedRandom<T>(arr: [T, number][]): [T, number] {
	const totalWeight = arr.reduce((acc, x) => x[1] + acc, 0);
	const cumulativeWeights = [arr[0][1]];

	for (let i = 1; i < arr.length; i++) {
		cumulativeWeights.push(arr[i][1] + cumulativeWeights[i - 1]);
	}

	const random = Math.floor(Math.random() * totalWeight) + 1;
	let chosen = 0;
	for (let i = 0; i < cumulativeWeights.length; i++) {
		if (random <= cumulativeWeights[i]) {
			chosen = i;
			break;
		}
	}
	return [arr[chosen][0], chosen];
}
