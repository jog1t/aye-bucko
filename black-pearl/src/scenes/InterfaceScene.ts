import { Scene } from "phaser";
import * as constants from "../constants";
import { GlobalState } from "../utilities";

export default class InterfaceScene extends Scene {
	constructor() {
		super(constants.SCENES.interface);
	}

	create(): void {
		const left = this.add
			.image(
				150,
				this.cameras.main.height - 100,
				constants.ATLASES.controls.mobile,
				"left"
			)
			.setScale(1.5);

		const right = this.add
			.image(
				300,
				this.cameras.main.height - 100,
				constants.ATLASES.controls.mobile,
				"right"
			)
			.setScale(1.5);

		const up = this.add
			.image(
				this.cameras.main.width - 150,
				this.cameras.main.height - 100,
				constants.ATLASES.controls.mobile,
				"up"
			)
			.setScale(1.5);

		this.input.addPointer(1);

		left.setInteractive();
		left.on(Phaser.Input.Events.POINTER_DOWN, this.onLeftButtonPointerDown);
		left.on(Phaser.Input.Events.POINTER_UP, this.onLeftButtonPointerUp);

		right.setInteractive();
		right.on(Phaser.Input.Events.POINTER_DOWN, this.onRightButtonPointerDown);
		right.on(Phaser.Input.Events.POINTER_UP, this.onRightButtonPointerUp);

		up.setInteractive();
		up.on(Phaser.Input.Events.POINTER_DOWN, this.onUpButtonPointerDown);
		up.on(Phaser.Input.Events.POINTER_UP, this.onUpButtonPointerUp);
	}

	// left
	private onLeftButtonPointerDown() {
		GlobalState.touchControls.isHeldLeft = true;
	}

	private onLeftButtonPointerUp() {
		GlobalState.touchControls.isHeldLeft = false;
	}

	// right
	private onRightButtonPointerDown() {
		GlobalState.touchControls.isHeldRight = true;
	}

	private onRightButtonPointerUp() {
		GlobalState.touchControls.isHeldRight = false;
	}

	// up
	private onUpButtonPointerDown() {
		GlobalState.touchControls.isHelpUp = true;
	}

	private onUpButtonPointerUp() {
		GlobalState.touchControls.isHelpUp = false;
	}
}
