import * as Phaser from "phaser";
import * as constants from "~constants";
import Vector2 = Phaser.Math.Vector2;

export default class Pirate extends Phaser.Physics.Arcade.Sprite {
	private ANIMATIONS = constants.ANIMATIONS.characters.captain;

	private isDying = false;

	constructor(scene: Phaser.Scene, x: number, y: number) {
		super(scene, x, y, constants.ATLASES.characters.captain);
		scene.physics.add.existing(this);
		scene.add.existing(this);
		this.play(constants.ANIMATIONS.characters.captain.idle);
		this.body.setSize(16, 8);
		this.body.setOffset(24, 24);

		this.body.setMass(120);
	}

	public kill(after?: () => void): void {
		this.once(
			Phaser.Animations.Events.ANIMATION_COMPLETE,
			(animation: Phaser.Animations.Animation) => {
				if (animation.key === this.ANIMATIONS.dead) {
					after?.();
				}
			}
		);
		this.isDying = true;
	}

	update(time: number, delta: number): void {
		super.update(time, delta);
		this.playAnimationsBasedOnMovement(this.body.velocity);
	}

	private playAnimationsBasedOnMovement(movement: Vector2): void {
		const isJumping =
			this.anims.isPlaying && this.anims.getName() === this.ANIMATIONS.jump;

		if (this.isDying) {
			this.anims.play(this.ANIMATIONS.dead, true);
			return;
		}

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
