import * as Phaser from "phaser";
import * as constants from "~constants";
import Cloud, { BoundingBox, ScrollConfig } from "./Cloud";

export enum CloudType {
	SmallCloud1 = "cloud1",
	SmallCloud2 = "cloud2",
	SmallCloud3 = "cloud3",
}

const CLOUD_SPEED_MAP: Record<CloudType, number> = {
	[CloudType.SmallCloud1]: 2,
	[CloudType.SmallCloud2]: 2,
	[CloudType.SmallCloud3]: 1,
};

const CLOUD_FRAMES_MAP: Record<CloudType, string> = {
	[CloudType.SmallCloud1]: "Small Cloud 1",
	[CloudType.SmallCloud2]: "Small Cloud 2",
	[CloudType.SmallCloud3]: "Small Cloud 3",
};

export default class SmallCloud extends Cloud {
	constructor(
		scene: Phaser.Scene,
		x: number,
		y: number,
		cloudType: CloudType,
		boundingBox: BoundingBox,
		scrollConfig: ScrollConfig
	) {
		const frame = scene.textures
			.get(constants.ATLASES.objects.clouds)
			.get(CLOUD_FRAMES_MAP[cloudType]);

		super(
			scene,
			x,
			y,
			scrollConfig,
			boundingBox,
			CLOUD_SPEED_MAP[cloudType],
			scrollConfig.startX + scrollConfig.width + frame.width
		);

		this.add(this.createCloud(frame));
	}

	private createCloud(frame: Phaser.Textures.Frame): Phaser.GameObjects.Sprite {
		return new Phaser.GameObjects.Sprite(
			this.scene,
			0,
			0,
			frame.texture.key,
			frame.name
		);
	}
}
