import { weightedRandom } from './utils';

// https://docs.google.com/spreadsheets/d/1sYQrV5Yp_QTVEKMLWquMu0mDgHhOO_Rh2LfcWdS_Eno/edit#gid=1604940600

enum STAT {
	HP,
	ATK,
	DEF,
	HP_,
	ATK_,
	DEF_,
	Pyro_,
	Electro_,
	Cryo_,
	Hydro_,
	Dendro_,
	Anemo_,
	Geo_,
	Physical_,
	Healing_,
	EM,
	ER,
	CR_,
	CD_
}

const MainStatRolls = {
	[STAT.HP]: [
		717, 920, 1123, 1326, 1530, 1733, 1936, 2139, 2342, 2545, 2749, 2952, 3155, 3358, 3561, 3764,
		3967, 4171, 4374, 4577, 4780
	],
	[STAT.ATK]: [
		47, 60, 73, 86, 100, 113, 126, 139, 152, 166, 179, 192, 205, 219, 232, 245, 258, 272, 285, 298,
		311
	],
	[STAT.HP_]: [
		7.0, 9.0, 11.0, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7,
		38.7, 40.7, 42.7, 44.6, 46.6
	],
	[STAT.ATK_]: [
		7.0, 9.0, 11.0, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7,
		38.7, 40.7, 42.7, 44.6, 46.6
	],
	[STAT.DEF_]: [
		8.7, 11.2, 13.7, 16.2, 18.6, 21.1, 23.6, 26.1, 28.6, 31.0, 33.5, 36.0, 38.5, 40.9, 43.4, 45.9,
		48.4, 50.8, 53.3, 55.8, 58.3
	],
	[STAT.Pyro_]: [
		7.0, 9.0, 11.0, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7,
		38.7, 40.7, 42.7, 44.6, 46.6
	],
	[STAT.Electro_]: [
		7.0, 9.0, 11.0, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7,
		38.7, 40.7, 42.7, 44.6, 46.6
	],
	[STAT.Cryo_]: [
		7.0, 9.0, 11.0, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7,
		38.7, 40.7, 42.7, 44.6, 46.6
	],
	[STAT.Hydro_]: [
		7.0, 9.0, 11.0, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7,
		38.7, 40.7, 42.7, 44.6, 46.6
	],
	[STAT.Dendro_]: [
		7.0, 9.0, 11.0, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7,
		38.7, 40.7, 42.7, 44.6, 46.6
	],
	[STAT.Anemo_]: [
		7.0, 9.0, 11.0, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7,
		38.7, 40.7, 42.7, 44.6, 46.6
	],
	[STAT.Geo_]: [
		7.0, 9.0, 11.0, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7,
		38.7, 40.7, 42.7, 44.6, 46.6
	],
	[STAT.Physical_]: [
		8.7, 11.2, 13.7, 16.2, 18.6, 21.1, 23.6, 26.1, 28.6, 31.0, 33.5, 36.0, 38.5, 40.9, 43.4, 45.9,
		48.4, 50.8, 53.3, 55.8, 58.3
	],
	[STAT.Healing_]: [
		5.4, 6.9, 8.4, 10.0, 11.5, 13.0, 14.5, 16.1, 17.6, 19.1, 20.6, 22.1, 23.7, 25.2, 26.7, 28.2,
		29.8, 31.3, 32.8, 34.3, 35.9
	],
	[STAT.EM]: [
		28, 35.9, 43.8, 51.8, 59.7, 67.6, 75.5, 83.5, 91.4, 99.3, 107.2, 115.2, 123.1, 131.0, 138.9,
		146.9, 154.8, 162.7, 170.6, 178.6, 186.5
	],
	[STAT.ER]: [
		7.8, 10.0, 12.2, 14.4, 16.6, 18.8, 21.0, 23.2, 25.4, 27.6, 29.8, 32.0, 34.2, 36.4, 38.6, 40.8,
		43.0, 45.2, 47.4, 49.6, 51.8
	],
	[STAT.CR_]: [
		4.7, 6.0, 7.3, 8.6, 9.9, 11.3, 12.6, 13.9, 15.2, 16.6, 17.9, 19.2, 20.5, 21.8, 23.2, 24.5, 25.8,
		27.1, 28.4, 29.8, 31.1
	],
	[STAT.CD_]: [
		9.3, 12.0, 14.6, 17.3, 19.9, 22.5, 25.2, 27.8, 30.5, 33.1, 35.7, 38.4, 41.0, 43.7, 46.3, 49.0,
		51.6, 54.2, 56.9, 59.5, 62.2
	]
};

const SubstatRolls = {
	[STAT.HP]: [209.13, 239, 268.88, 298.75],
	[STAT.ATK]: [13.62, 15.56, 17.51, 19.45],
	[STAT.DEF]: [16.2, 18.52, 20.83, 23.15],
	[STAT.HP_]: [4.08, 4.66, 5.25, 5.83],
	[STAT.ATK_]: [4.08, 4.66, 5.25, 5.83],
	[STAT.DEF_]: [5.1, 5.83, 6.56, 7.29],
	[STAT.EM]: [16.32, 18.65, 20.98, 23.31],
	[STAT.ER]: [4.53, 5.18, 5.83, 6.48],
	[STAT.CR_]: [2.72, 3.11, 3.5, 3.89],
	[STAT.CD_]: [5.44, 6.22, 6.99, 7.77]
};

interface Substat {
	stat: STAT;
	tiers: (0 | 1 | 2 | 3)[];
}

abstract class ArtifactPiece {
	level: number = 0;
	mainStat: STAT = STAT.HP;
	substats: Substat[] = [];
	substatPool: [STAT, number][] = [
		[STAT.HP, 6],
		[STAT.ATK, 6],
		[STAT.DEF, 6],
		[STAT.HP_, 4],
		[STAT.ATK_, 4],
		[STAT.DEF_, 4],
		[STAT.ER, 4],
		[STAT.EM, 4],
		[STAT.CR_, 3],
		[STAT.CD_, 3]
	];

	constructor() {
		const initialSubstats = weightedRandom([
			[3, 4],
			[4, 1]
		]);
		for (let i = 0; i < initialSubstats[0]; i++) {
			this.addNewSubstat();
		}
	}

	levelUp(levels: number = 20) {
		for (let i = 0; i < levels; i++) {
			if (this.level > 20) break;
			this.level += 1;
			if (this.level % 4 == 0) {
				this.rollSubstat();
			}
		}
	}

	addNewSubstat() {
		const stat = weightedRandom(this.substatPool);
		const substat: Substat = {
			stat: stat[0],
			tiers: [Math.floor(Math.random() * 4) as 0 | 1 | 2 | 3]
		};
		this.substats.push(substat);
		this.substatPool.splice(stat[1], 1);
	}

	rollSubstat() {
		if (this.substats.length < 4) {
			this.addNewSubstat();
		} else {
			const line = Math.floor(Math.random() * 4);
			this.substats[line].tiers.push(Math.floor(Math.random() * 4) as 0 | 1 | 2 | 3);
		}
	}

	critValue() {
		let critValue = 0;

		switch (this.mainStat) {
			case STAT.CR_:
				critValue += MainStatRolls[STAT.CR_][this.level] * 2;
				break;
			case STAT.CD_:
				critValue += MainStatRolls[STAT.CD_][this.level];
				break;
		}

		for (let i = 0; i < this.substats.length; i++) {
			switch (this.substats[i].stat) {
				case STAT.CR_:
					critValue +=
						this.substats[i].tiers.reduce((acc: number, x) => acc + SubstatRolls[STAT.CR_][x], 0) *
						2;
					break;
				case STAT.CD_:
					critValue += this.substats[i].tiers.reduce(
						(acc: number, x) => acc + SubstatRolls[STAT.CD_][x],
						0
					);
					break;
			}
		}

		return critValue;
	}
}

export class Flower extends ArtifactPiece {
	constructor() {
		super();
		this.mainStat = STAT.HP;
	}
}

export class Feather extends ArtifactPiece {
	constructor() {
		super();
		this.mainStat = STAT.ATK;
	}
}

export class Sands extends ArtifactPiece {
	constructor() {
		super();
		this.mainStat = weightedRandom([
			[STAT.HP_, 8],
			[STAT.ATK_, 8],
			[STAT.DEF_, 8],
			[STAT.EM, 3],
			[STAT.ER, 3]
		])[0];
	}
}

export class Goblet extends ArtifactPiece {
	constructor() {
		super();
		this.mainStat = weightedRandom([
			[STAT.HP_, 77],
			[STAT.ATK_, 77],
			[STAT.DEF_, 76],
			[STAT.Pyro_, 20],
			[STAT.Electro_, 20],
			[STAT.Cryo_, 20],
			[STAT.Hydro_, 20],
			[STAT.Dendro_, 20],
			[STAT.Anemo_, 20],
			[STAT.Geo_, 20],
			[STAT.Physical_, 20],
			[STAT.EM, 10]
		])[0];
	}
}

export class Circlet extends ArtifactPiece {
	constructor() {
		super();
		this.mainStat = weightedRandom([
			[STAT.HP_, 11],
			[STAT.ATK_, 11],
			[STAT.DEF_, 11],
			[STAT.CR_, 5],
			[STAT.CD_, 5],
			[STAT.Healing_, 5],
			[STAT.EM, 2]
		])[0];
	}
}

export class ArtifactSimulation {
	artifacts: number;
	epochs: number;
	desirableSets: number;

	constructor(artifacts: number = 10000, epochs: number = 100, desirableSets: number = 1) {
		this.artifacts = artifacts;
		this.epochs = epochs;
		this.desirableSets = desirableSets;
	}

	generateArtifacts(n: number) {
		const critValueOverTime = [];
		const bestPieces = [0, 0, 0, 0, 0];

		let artifacts: ArtifactPiece[] = [];
		for (let i = 0; i < n; i++) {
			if (Math.random() < this.desirableSets / 2) {
				const piece = weightedRandom([
					[Flower, 1],
					[Feather, 1],
					[Sands, 1],
					[Goblet, 1],
					[Circlet, 1]
				]);
				const artifact = new piece[0]();
				artifact.levelUp(20);
				bestPieces[piece[1]] = Math.max(artifact.critValue(), bestPieces[piece[1]]);
			}

			critValueOverTime.push(bestPieces.reduce((acc, x) => x + acc, 0));
		}

		return critValueOverTime;
	}

	run() {
		const critValuesOverTime = [];
		for (let epoch = 0; epoch < this.epochs; epoch++) {
			critValuesOverTime.push(this.generateArtifacts(this.artifacts));
		}

		const averageCritValueOverTime = [];
		for (let n = 0; n < this.artifacts; n++) {
			let sum = 0;
			for (let epoch = 0; epoch < this.epochs; epoch++) {
				sum += critValuesOverTime[epoch][n];
			}
			averageCritValueOverTime.push(sum / this.epochs);
		}

		return averageCritValueOverTime;
	}
}
