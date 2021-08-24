import { Scene, Textures, GameObjects } from "phaser";
import { isDev } from "@jog1t/ambrose-light";
import * as constants from "~constants";

enum ControlEvents {
	CONTROL_DOWN = "control-down",
	CONTROL_UP = "control-up",
}

export default class InterfaceScene extends Scene {
	private up: GameObjects.Image | undefined;

	private downPointersControlsMap: Map<number, string> = new Map();

	static EVENTS = ControlEvents;

	constructor() {
		super(constants.SCENES.interface);
	}

	create(): void {
		if (this.game.device.input.touch || isDev()) {
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

		this.input.on(
			Phaser.Input.Events.POINTER_UP,
			(pointer: Phaser.Input.Pointer) => {
				this.onControlPointerUp(pointer.id);
			}
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

		element.on(
			Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,
			(pointer: Phaser.Input.Pointer) => {
				this.onControlPointerDown(pointer.id, controlName);
			}
		);

		// When a pointer is down and is moved to other control
		// we need to switch currently held control
		element.on(
			Phaser.Input.Events.GAMEOBJECT_POINTER_OVER,
			(pointer: Phaser.Input.Pointer) => {
				if (pointer.isDown) {
					if (this.isPointerAlreadyHeld(pointer.id)) {
						this.onControlPointerUp(pointer.id);
					}

					this.onControlPointerDown(pointer.id, controlName);
				}
			}
		);

		element.on(
			Phaser.Input.Events.GAMEOBJECT_POINTER_UP,
			(pointer: Phaser.Input.Pointer) => {
				this.onControlPointerUp(pointer.id, controlName);
			}
		);
	}

	private onControlPointerUp(
		pointerId: number,
		controlName: string | undefined = this.downPointersControlsMap.get(
			pointerId
		)
	): void {
		this.downPointersControlsMap.delete(pointerId);
		this.events.emit(ControlEvents.CONTROL_UP, controlName);
	}

	private onControlPointerDown(pointerId: number, controlName: string): void {
		this.events.emit(ControlEvents.CONTROL_DOWN, controlName);
		this.downPointersControlsMap.set(pointerId, controlName);
	}

	private isPointerAlreadyHeld(pointerId: number): boolean {
		return this.downPointersControlsMap.get(pointerId) !== undefined;
	}
}
