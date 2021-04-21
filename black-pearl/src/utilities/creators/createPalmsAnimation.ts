import { Scene } from "phaser";
import * as constants from "~constants";

function createForegroundPalmAnimations(scene: Scene): void {
	scene.anims.create({
		key: constants.ANIMATIONS.objects.foregroundPalm,
		frames: scene.anims.generateFrameNames(constants.ATLASES.objects.palms, {
			prefix: "Front Palm Tree Top ",
			start: 1,
			end: 4,
			zeroPad: 2,
		}),
		frameRate: 10,
		repeat: -1,
	});
}

function createBackgroundPalmAnimations(scene: Scene): void {
	scene.anims.create({
		key: constants.ANIMATIONS.objects.backgroundPalm,
		frames: scene.anims.generateFrameNames(constants.ATLASES.objects.palms, {
			prefix: "Back Palm Tree Regular ",
			start: 1,
			end: 4,
			zeroPad: 2,
		}),
		frameRate: 10,
		repeat: -1,
	});
}

export default function createPalmsAnimations(scene: Scene): void {
	createForegroundPalmAnimations(scene);
	createBackgroundPalmAnimations(scene);
}
