import { Scene, Textures, GameObjects } from "phaser";
import * as constants from "~constants";

export default class InterfaceScene extends Scene {
	private up: GameObjects.Image;

	constructor() {
		super(constants.SCENES.interface);
	}

	create(): void {
		if (!this.game.device.input.touch) {
			this.input.addPointer(1);
			// TODO(jog1t): remove listeners on destroy
			this.initOnScreenControls();
		}
	}

	private initOnScreenControls() {
		this.initOnScreenTouchElement(
			this.textures.getFrame(constants.ATLASES.controls.mobile, "left"),
			{ x: 150, y: this.cameras.main.height }
		);

		this.initOnScreenTouchElement(
			this.textures.getFrame(constants.ATLASES.controls.mobile, "right"),
			{ x: 300, y: this.cameras.main.height }
		);

		this.initOnScreenTouchElement(
			this.textures.getFrame(constants.ATLASES.controls.mobile, "up"),
			{ x: this.cameras.main.width, y: this.cameras.main.height }
		);
	}

	private initOnScreenTouchElement(
		frame: Textures.Frame,
		position: { x: number; y: number }
	) {
		const element = this.add
			.image(position.x, position.y, frame.texture, frame.name)
			.setScale(1.5);

		element.x -= element.width;
		element.y -= element.height;
		element.setInteractive();
		element.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
			this.events.emit("controlDown", element);
		});
		element.on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
			this.events.emit("controlUp", element);
		});
		element.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
			this.events.emit("controlUp", element);
		});
	}
}
