import { Scene, GameObjects } from "phaser";
import * as constants from "~constants";

export default class BackgroundPalm extends GameObjects.Sprite {
	constructor(scene: Scene, x: number, y: number) {
		super(scene, x, y, constants.ATLASES.objects.palms);

		this.play(constants.ANIMATIONS.objects.backgroundPalm);
	}
}
