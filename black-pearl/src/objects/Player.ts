import * as constants from "../constants";
import { GlobalState } from "../utilities";
import Vector2 = Phaser.Math.Vector2;

export default class Player extends Phaser.Physics.Arcade.Sprite {
	private ANIMATIONS = constants.ANIMATIONS.characters.captain;

	private MOVEMENT_SPEED = 130;

	private inputKeys: Record<"W" | "S" | "A" | "D", Phaser.Input.Keyboard.Key>;

	constructor(scene: Phaser.Scene, x: number, y: number) {
		super(scene, x, y, constants.ATLASES.characters.captain);
		scene.physics.add.existing(this);
		this.play(constants.ANIMATIONS.characters.captain.idle);
		this.body.setSize(16, 8);
		this.body.setOffset(24, 24);

		this.inputKeys = this.scene.input.keyboard.addKeys(
			"W,S,A,D"
		) as Player["inputKeys"];

		this.body.setMass(120);
	}

	update(time: number, delta: number): void {
		super.update(time, delta);

		const movement = new Vector2(0, 0);

		// run right
		if (this.inputKeys.D.isDown || GlobalState.touchControls.isHeldRight) {
			movement.x = this.MOVEMENT_SPEED;
		}
		// run left
		if (this.inputKeys.A.isDown || GlobalState.touchControls.isHeldLeft) {
			movement.x = -this.MOVEMENT_SPEED;
		}
		// jump
		if (
			(this.inputKeys.W.isDown || GlobalState.touchControls.isHelpUp) &&
			this.body.blocked.down
		) {
			movement.y = -200;
		}

		this.playAnimationsBasedOnMovement(movement);

		// set horizontal movement either to 0 or to desired velocity
		// keep current vertical velocity if not specified
		this.setVelocity(movement.x, movement.y || this.body.velocity.y);
	}

	private playAnimationsBasedOnMovement(movement: Vector2): void {
		const isJumping =
			this.anims.isPlaying && this.anims.getName() === this.ANIMATIONS.jump;

		// flip character sprite according to its movement
		if (movement.x > 0) {
			this.setFlipX(false);
		}

		if (movement.x < 0) {
			this.setFlipX(true);
		}

		// cancel all animations if jumping animations is still playing
		if (isJumping) {
			return;
		}

		// play run animation if character is moving horizontally
		if (movement.x > 0) {
			this.anims.play(this.ANIMATIONS.run, true);
		}
		if (movement.x < 0) {
			this.setFlipX(true);
			this.anims.play(this.ANIMATIONS.run, true);
		}

		// play jump animation if character has vertical velocity
		if (movement.y < 0) {
			this.anims.play(this.ANIMATIONS.jump, true);
			return;
		}

		// play fall animation if character is not touching ground and block other animations
		if (!this.body.blocked.down) {
			this.anims.play(this.ANIMATIONS.fall, true);
			return;
		}

		// play idle animation if any of the previous steps are not satisfied
		if (movement.x === 0 && movement.y === 0) {
			this.anims.play(this.ANIMATIONS.idle, true);
		}
	}
}
