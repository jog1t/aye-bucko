import * as Phaser from "phaser";
import { isDev } from "~shared";
import Bootstrap from "./scenes/BootstrapScene";
import SampleScene from "./scenes/SampleScene";
import InterfaceScene from "./scenes/InterfaceScene";

export default class Game extends Phaser.Game {
	constructor() {
		super({
			type: Phaser.AUTO,
			scale: {
				parent: "body",
				mode: Phaser.Scale.ScaleModes.FIT,
				width: "100%",
				height: "100%",
			},
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
			scene: [Bootstrap, SampleScene, InterfaceScene],
		});
	}
}
