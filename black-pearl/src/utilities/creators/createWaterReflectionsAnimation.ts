import { Scene } from "phaser";
import * as constants from "~constants";

function createBigWaterReflectionAnimation(scene: Scene): void {
	scene.anims.create({
		key: constants.ANIMATIONS.objects.waterReflections.big,
		frames: scene.anims.generateFrameNames(
			constants.ATLASES.objects.waterReflections,
			{
				prefix: "Water Reflect Big ",
				start: 1,
				end: 4,
				zeroPad: 2,
			}
		),
		frameRate: 10,
		repeat: -1,
	});
}

function createMediumWaterReflectionAnimation(scene: Scene): void {
	scene.anims.create({
		key: constants.ANIMATIONS.objects.waterReflections.big,
		frames: scene.anims.generateFrameNames(
			constants.ATLASES.objects.waterReflections,
			{
				prefix: "Water Reflect Medium ",
				start: 1,
				end: 4,
				zeroPad: 2,
			}
		),
		frameRate: 10,
		repeat: -1,
	});
}

function createSmallWaterReflectionAnimation(scene: Scene): void {
	scene.anims.create({
		key: constants.ANIMATIONS.objects.waterReflections.big,
		frames: scene.anims.generateFrameNames(
			constants.ATLASES.objects.waterReflections,
			{
				prefix: "Water Reflect Small ",
				start: 1,
				end: 4,
				zeroPad: 2,
			}
		),
		frameRate: 10,
		repeat: -1,
	});
}

export default function createWaterReflectionsAnimation(scene: Scene): void {
	createBigWaterReflectionAnimation(scene);
	createMediumWaterReflectionAnimation(scene);
	createSmallWaterReflectionAnimation(scene);
}
