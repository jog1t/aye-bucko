import { NETWORK_MESSAGE, PlayerState } from "@jog1t/ambrose-light";
import Player from "~objects/Player";

export default class NetworkPlayer extends Player {
	static STATE_SYNC_RATE = 100;

	private lastSync = 0;

	private lastValues: Partial<PlayerState> = {};

	update(time: number, delta: number): void {
		super.update(time, delta);

		if (!this.lastSync) {
			this.lastSync = time;
		}

		if (time - this.lastSync < NetworkPlayer.STATE_SYNC_RATE) {
			this.lastSync = time;
			const diff = this.createDiff();
			if (Object.keys(diff).length > 0) {
				this.scene.sync.getRoom().send(NETWORK_MESSAGE.player.update, diff);
			}

			this.lastValues = {
				x: this.x,
				y: this.y,
				velocityX: this.body.velocity.x,
				velocityY: this.body.velocity.y,
			};
		}
	}

	createDiff(): Partial<PlayerState> {
		return {
			...(this.lastValues.x?.toFixed(2) !== this.x.toFixed(2)
				? { x: this.x }
				: {}),
			...(this.lastValues.y?.toFixed(2) !== this.y.toFixed(2)
				? { y: this.y }
				: {}),
			...(this.lastValues.velocityX?.toFixed(2) !==
			this.body.velocity.x.toFixed(2)
				? { velocityX: this.body.velocity.x }
				: {}),
			...(this.lastValues.velocityY?.toFixed(2) !==
			this.body.velocity.y?.toFixed(2)
				? { velocityY: this.body.velocity.y }
				: {}),
		};
	}
}
