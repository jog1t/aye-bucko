import { Scene } from "phaser";
import * as constants from "~constants";

export default function createCaptainAnimations(scene: Scene): void {
	scene.anims.create({
		key: constants.ANIMATIONS.characters.captain.idle,
		frames: scene.anims.generateFrameNames(
			constants.ATLASES.characters.captain,
			{ prefix: "Idle ", start: 1, end: 5, zeroPad: 2 }
		),
		frameRate: 10,
		repeat: -1,
	});
	scene.anims.create({
		key: constants.ANIMATIONS.characters.captain.run,
		frames: scene.anims.generateFrameNames(
			constants.ATLASES.characters.captain,
			{ prefix: "Run ", start: 1, end: 5, zeroPad: 2 }
		),
		frameRate: 10,
		repeat: -1,
	});
	scene.anims.create({
		key: constants.ANIMATIONS.characters.captain.fall,
		frames: scene.anims.generateFrameNames(
			constants.ATLASES.characters.captain,
			{ prefix: "Fall ", start: 1, end: 1, zeroPad: 2 }
		),
		frameRate: 10,
		repeat: -1,
	});
	scene.anims.create({
		key: constants.ANIMATIONS.characters.captain.jump,
		frames: scene.anims.generateFrameNames(
			constants.ATLASES.characters.captain,
			{ prefix: "Jump ", start: 1, end: 3, zeroPad: 2 }
		),
		frameRate: 10,
	});
}
