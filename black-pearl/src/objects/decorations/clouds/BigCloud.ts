import * as Phaser from "phaser";
import * as constants from "~constants";
import Cloud, { BoundingBox, ScrollConfig } from "./Cloud";

export default class BigCloud extends Cloud {
	private readonly frame: Phaser.Textures.Frame;

	constructor(
		scene: Phaser.Scene,
		x: number,
		y: number,
		boundingBox: BoundingBox,
		scrollConfig: ScrollConfig
	) {
		const frame = scene.textures
			.get(constants.ATLASES.objects.clouds)
			.get("Big Clouds");
		const clonesCount = Math.ceil(scrollConfig.width / frame.width);
		const limit = scrollConfig.startX + frame.width * clonesCount;

		super(scene, x, y, scrollConfig, boundingBox, 3, limit);

		this.frame = frame;
		this.add(this.createClouds(clonesCount));
	}

	private createClouds(cloudsCount: number): Phaser.GameObjects.Sprite[] {
		const clouds = [];
		// creates clouds to fill the desired width
		for (let i = 0; i < cloudsCount; i += 1) {
			clouds.push(this.createCloud(i * this.frame.width, 0));
		}
		// creates the same as above but in the opposite direction
		for (let i = 1; i <= cloudsCount; i += 1) {
			clouds.push(this.createCloud(i * -this.frame.width, 0));
		}

		return clouds;
	}

	private createCloud(x: number, y: number): Phaser.GameObjects.Sprite {
		const cloud = new Phaser.GameObjects.Sprite(
			this.scene,
			x,
			y,
			this.frame.texture,
			this.frame.name
		);
		cloud.setOrigin(0, 0.5);
		return cloud;
	}
}
