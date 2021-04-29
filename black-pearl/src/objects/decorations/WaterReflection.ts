import { Scene, GameObjects } from "phaser";
import * as constants from "~constants";

type WaterReflectionType = "big" | "medium" | "small";

const WATER_REFLECTION_ANIMATION_TYPE: Record<WaterReflectionType, string> = {
	big: constants.ANIMATIONS.objects.waterReflections.big,
	medium: constants.ANIMATIONS.objects.waterReflections.medium,
	small: constants.ANIMATIONS.objects.waterReflections.small,
};

export default class WaterReflection extends GameObjects.Sprite {
	constructor(scene: Scene, type: WaterReflectionType, x: number, y: number) {
		super(scene, x, y, constants.ATLASES.objects.waterReflections);

		this.play(WATER_REFLECTION_ANIMATION_TYPE[type]);
	}
}
