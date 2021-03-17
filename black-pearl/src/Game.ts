import * as Phaser from "phaser";
import { isDev } from "~shared";

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
				},
			},
			render: { pixelArt: true, antialias: false },
			scene: [],
		});
	}
}
