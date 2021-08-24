import * as constants from "~constants";
import InterfaceScene from "~scenes/InterfaceScene";
import Pirate from "~objects/Pirate";
import Vector2 = Phaser.Math.Vector2;

export default class Player extends Pirate {
	private MOVEMENT_SPEED = 130;

	private interfaceControlsMovementVector = new Vector2();

	private inputKeys: Record<"W" | "S" | "A" | "D", Phaser.Input.Keyboard.Key>;

	constructor(scene: Phaser.Scene, x: number, y: number) {
		super(scene, x, y);

		this.inputKeys = this.scene.input.keyboard.addKeys(
			"W,S,A,D"
		) as Player["inputKeys"];

		scene.scene
			.get(constants.SCENES.interface)
			.events.on(InterfaceScene.EVENTS.CONTROL_DOWN, (controlName) => {
				if (controlName === "up") {
					this.interfaceControlsMovementVector.y = 1;
				}
				if (controlName === "right") {
					this.interfaceControlsMovementVector.x = 1;
				}
				if (controlName === "left") {
					this.interfaceControlsMovementVector.x = -1;
				}
			});
		scene.scene
			.get(constants.SCENES.interface)
			.events.on(InterfaceScene.EVENTS.CONTROL_UP, (controlName) => {
				if (controlName === "up") {
					this.interfaceControlsMovementVector.y = 0;
				}
				if (controlName === "right") {
					this.interfaceControlsMovementVector.x = 0;
				}
				if (controlName === "left") {
					this.interfaceControlsMovementVector.x = 0;
				}
			});
	}

	update(time: number, delta: number): void {
		const movement = new Vector2(0, 0);

		// run right
		if (this.inputKeys.D.isDown || this.interfaceControlsMovementVector.x > 0) {
			movement.x = this.MOVEMENT_SPEED;
		}
		// run left
		if (this.inputKeys.A.isDown || this.interfaceControlsMovementVector.x < 0) {
			movement.x = -this.MOVEMENT_SPEED;
		}
		// jump
		if (
			(this.inputKeys.W.isDown || this.interfaceControlsMovementVector.y > 0) &&
			this.body.blocked.down
		) {
			movement.y = -200;
		}
		// set horizontal movement either to 0 or to desired velocity
		// keep current vertical velocity if not specified
		this.setVelocity(movement.x, movement.y || this.body.velocity.y);
		super.update(time, delta);
	}
}
