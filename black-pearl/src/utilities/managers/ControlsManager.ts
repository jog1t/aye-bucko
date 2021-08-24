import * as Phaser from "phaser";
import { Controls } from "~types";

export default class ControlsManager implements Controls {
	private keysNames = [
		"W",
		"S",
		"A",
		"D",
		"up",
		"left",
		"right",
		"space",
	] as const;

	private keyboardKeys: Record<
		ControlsManager["keysNames"][number],
		Phaser.Input.Keyboard.Key
	>;

	constructor(inputPlugin: Phaser.Input.InputPlugin) {
		this.keyboardKeys = inputPlugin.keyboard.addKeys(
			this.keysNames.join(",")
		) as ControlsManager["keyboardKeys"];
	}

	isRightDown(): boolean {
		return this.keyboardKeys.right.isDown || this.keyboardKeys.D.isDown;
	}

	isLeftDown(): boolean {
		return this.keyboardKeys.left.isDown || this.keyboardKeys.A.isDown;
	}

	isJumpDown(): boolean {
		return (
			this.keyboardKeys.W.isDown ||
			this.keyboardKeys.up.isDown ||
			this.keyboardKeys.space.isDown
		);
	}
}
