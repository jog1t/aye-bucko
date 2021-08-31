import * as Phaser from "phaser";
import { isDev } from "@jog1t/ambrose-light";
import Bootstrap from "./scenes/BootstrapScene";
import SampleScene from "./scenes/SampleScene";
import InterfaceScene from "./scenes/InterfaceScene";
import SyncPlugin from "./plugins/SyncPlugin";

declare module "phaser" {
	export interface Scene {
		sync: SyncPlugin;
	}
}

export default class Game extends Phaser.Game {
	constructor() {
		// eslint-disable-next-line no-console
		console.log("Aye Bucko!", `ver. ${process.env.GAME_VERSION}`);
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
			plugins: {
				global: [
					{
						key: "SyncPlugin",
						plugin: SyncPlugin,
						start: true,
						mapping: "sync",
					},
				],
			},
			render: { pixelArt: true, antialias: false },
			scene: [Bootstrap, SampleScene, InterfaceScene],
		});
	}
}
