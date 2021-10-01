export default class CameraController extends Phaser.GameObjects.Group {
	private entity: Phaser.Physics.Arcade.Sprite | undefined;

	private cameraDolly: Phaser.Geom.Point | undefined;

	startFollow(entity: Phaser.Physics.Arcade.Sprite) {
		this.entity = entity;
		this.cameraDolly = new Phaser.Geom.Point(this.entity.x, this.entity.y);
		this.scene.cameras.main.zoomTo(2, 500, Phaser.Math.Easing.Cubic.InOut);
		this.scene.cameras.main.startFollow(this.cameraDolly);
		this.scene.cameras.main.setLerp(0.1, 0.1);
	}

	init() {
		this.scene.add.existing(this);
	}

	update() {
		if (this.entity && this.cameraDolly) {
			// Move the camera dolly in round pixels
			this.cameraDolly.x = Math.floor(this.entity.x);
			this.cameraDolly.y = Math.floor(this.entity.y);
		}
	}
}
