import * as constants from "~constants";

export default class ForegroundPalm extends Phaser.Physics.Arcade.Sprite {
	constructor(scene: Phaser.Scene, x: number, y: number) {
		super(scene, x, y, constants.ATLASES.objects.palms);
		scene.physics.add.existing(this);
		scene.add.existing(this);
		this.play(constants.ANIMATIONS.objects.foregroundPalm);

		this.setImmovable(true);
		this.setMaxVelocity(0, 0);
		this.setBodySize(35, 10);
		this.body.setOffset(2, 0);
		this.setGravity(0, 0);
	}
}
