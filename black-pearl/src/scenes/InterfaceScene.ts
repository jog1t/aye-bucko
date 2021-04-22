import { Scene, Textures, GameObjects } from "phaser";
import * as constants from "~constants";

enum ControlEvents {
	CONTROL_DOWN = "control-down",
	CONTROL_UP = "control-up",
}

export default class InterfaceScene extends Scene {
	private up: GameObjects.Image;

	static EVENTS = ControlEvents;

	constructor() {
		super(constants.SCENES.interface);
	}

	create(): void {
		if (this.game.device.input.touch) {
			this.input.addPointer(1);
			// TODO(jog1t): remove listeners on destroy
			this.initOnScreenControls();
		}
	}

	private initOnScreenControls() {
		this.initOnScreenTouchElement(
			this.textures.getFrame(constants.ATLASES.controls.mobile, "left"),
			{ x: 150, y: this.cameras.main.height },
			"left"
		);

		this.initOnScreenTouchElement(
			this.textures.getFrame(constants.ATLASES.controls.mobile, "right"),
			{ x: 300, y: this.cameras.main.height },
			"right"
		);

		this.initOnScreenTouchElement(
			this.textures.getFrame(constants.ATLASES.controls.mobile, "up"),
			{ x: this.cameras.main.width, y: this.cameras.main.height },
			"up"
		);
	}

	private initOnScreenTouchElement(
		frame: Textures.Frame,
		position: { x: number; y: number },
		controlName: string
	) {
		const element = this.add
			.image(position.x, position.y, frame.texture, frame.name)
			.setScale(1.5);

		element.x -= element.width;
		element.y -= element.height;
		element.setInteractive();
		element.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
			this.events.emit(ControlEvents.CONTROL_DOWN, controlName);
		});
		element.on(
			Phaser.Input.Events.GAMEOBJECT_POINTER_OVER,
			(event: Phaser.Input.Pointer) => {
				if (event.isDown) {
					this.events.emit(ControlEvents.CONTROL_DOWN, controlName);
				}
			}
		);
		element.on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
			this.events.emit(ControlEvents.CONTROL_UP, controlName);
		});
		element.on(
			Phaser.Input.Events.GAMEOBJECT_POINTER_OUT,
			(event: Phaser.Input.Pointer) => {
				if (event.isDown) {
					this.events.emit(ControlEvents.CONTROL_UP, controlName);
				}
			}
		);
	}
}
