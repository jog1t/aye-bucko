import * as constants from "~constants";
import InterfaceScene from "~scenes/InterfaceScene";
import { managers } from "~utilities";
import { Controls } from "~types";
import Pirate from "~objects/Pirate";
import Vector2 = Phaser.Math.Vector2;

export default class Player extends Pirate {
	private MOVEMENT_SPEED = 130;

	private interfaceControlsMovementVector = new Vector2();

	private controls: Controls;

	constructor(scene: Phaser.Scene, x: number, y: number) {
		super(scene, x, y);

		this.controls = new managers.ControlsManager(this.scene.input);

		scene.scene
			.get(constants.SCENES.interface)
			.events.on(InterfaceScene.EVENTS.CONTROL_DOWN, (controlName: string) => {
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
			.events.on(InterfaceScene.EVENTS.CONTROL_UP, (controlName: string) => {
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
		if (
			this.controls.isRightDown() ||
			this.interfaceControlsMovementVector.x > 0
		) {
			movement.x = this.MOVEMENT_SPEED;
		}
		// run left
		if (
			this.controls.isLeftDown() ||
			this.interfaceControlsMovementVector.x < 0
		) {
			movement.x = -this.MOVEMENT_SPEED;
		}
		// jump
		if (
			(this.controls.isJumpDown() ||
				this.interfaceControlsMovementVector.y > 0) &&
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
