import * as constants from "../constants";

export default class Player extends Phaser.Physics.Arcade.Sprite {
	constructor(scene: Phaser.Scene, x: number, y: number) {
		super(scene, x, y, constants.ATLASES.characters.captain);
		scene.physics.add.existing(this);
		this.play(constants.ANIMATIONS.characters.captain.idle);
		this.body.setSize(16, 8);
		this.body.setOffset(24, 24);
	}
}
