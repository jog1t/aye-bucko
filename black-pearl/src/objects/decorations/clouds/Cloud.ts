import * as Phaser from "phaser";

export type ScrollConfig = {
	startX: number;
	width: number;
};

export type BoundingBox = {
	x: number;
	y: number;
	polygon: Phaser.Types.Math.Vector2Like[];
};

export default abstract class Cloud extends Phaser.GameObjects.Container {
	protected constructor(
		scene: Phaser.Scene,
		x: number,
		y: number,
		private scrollConfig: ScrollConfig,
		private boundingBox: BoundingBox,
		private movementSpeed: number,
		private scrollLimit: number
	) {
		super(scene, x, y);

		this.setMask(this.createMask(boundingBox));
	}

	private createMask(
		boundingBox: BoundingBox
	): Phaser.Display.Masks.GeometryMask {
		const graphics = this.scene.make.graphics({});
		graphics.fillPoints(boundingBox.polygon);
		graphics.x = boundingBox.x;
		graphics.y = boundingBox.y;
		return graphics.createGeometryMask();
	}

	public update(time: number, delta: number): void {
		super.update(time, delta);

		const movement = this.movementSpeed / delta;
		this.x += movement;
		if (this.x > this.scrollLimit) {
			this.x = this.scrollConfig.startX;
		}
	}
}
