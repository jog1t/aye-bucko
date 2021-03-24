import * as Phaser from "phaser";
import { isDev } from "~shared";
import Bootstrap from "./scenes/BootstrapScene";
import SampleScene from "./scenes/SampleScene";

export default class Game extends Phaser.Game {
	constructor() {
		super({
			width: window.innerWidth,
			height: window.innerHeight,
			type: Phaser.AUTO,
			input: {
				keyboard: true,
			},
			physics: {
				default: "arcade",
				arcade: {
					debug: isDev(),
					gravity: { y: 450 },
				},
			},
			render: { pixelArt: true, antialias: false },
			scene: [Bootstrap, SampleScene],
		});
	}
}
