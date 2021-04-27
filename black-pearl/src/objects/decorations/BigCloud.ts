import * as Phaser from "phaser";
import * as constants from "~constants";

type ScrollConfig = {
	startX: number;
	width: number;
};

type BoundingBox = {
	x?: number;
	y?: number;
	polygon?: Phaser.Types.Math.Vector2Like[];
};

export default class BigCloud extends Phaser.GameObjects.Container {
	private readonly cloudFrame: Phaser.Textures.Frame;

	private readonly scrollConfig: ScrollConfig;

	private readonly cloudClonesCount: number;

	public static readonly SCROLL_SPEED = 4;

	constructor(
		scene: Phaser.Scene,
		y: number,
		boundingBox: BoundingBox,
		scrollConfig: ScrollConfig
	) {
		super(scene, scrollConfig.startX, y);

		this.cloudFrame = scene.textures
			.get(constants.ATLASES.objects.clouds)
			.get("Big Clouds");
		this.scrollConfig = scrollConfig;
		this.cloudClonesCount = Math.ceil(
			scrollConfig.width / this.cloudFrame.width
		);

		if (boundingBox) {
			this.setMask(this.createBoundingMask(boundingBox));
		}

		this.add(this.createClouds(this.cloudClonesCount));
	}

	private createBoundingMask(
		boundingBox: BoundingBox
	): Phaser.Display.Masks.GeometryMask {
		const graphics = this.scene.make.graphics({});
		graphics.fillPoints(boundingBox.polygon);
		graphics.x = boundingBox.x;
		graphics.y = boundingBox.y;
		return graphics.createGeometryMask();
	}

	private createClouds(cloudsCount: number): Phaser.GameObjects.Sprite[] {
		const clouds = [];
		// creates clouds to fill the desired width
		for (let i = 0; i < cloudsCount; i += 1) {
			clouds.push(this.createCloud(i * this.cloudFrame.width, 0));
		}
		// creates the same as above but in the opposite direction
		for (let i = 1; i <= cloudsCount; i += 1) {
			clouds.push(this.createCloud(i * -this.cloudFrame.width, 0));
		}

		return clouds;
	}

	private createCloud(x: number, y: number): Phaser.GameObjects.Sprite {
		const cloud = new Phaser.GameObjects.Sprite(
			this.scene,
			x,
			y,
			this.cloudFrame.texture,
			this.cloudFrame.name
		);
		cloud.setOrigin(0, 0.5);
		return cloud;
	}

	public update(time: number, delta: number): void {
		super.update(time, delta);
		const movement = BigCloud.SCROLL_SPEED / delta;
		this.x += movement;
		if (
			this.x >
			this.cloudFrame.width * this.cloudClonesCount + BigCloud.SCROLL_SPEED
		) {
			this.x = this.scrollConfig.startX;
		}
	}
}
