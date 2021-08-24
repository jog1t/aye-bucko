import * as Phaser from "phaser";
import { PlayerState } from "@jog1t/whydah/state";
import { DataChange } from "@colyseus/schema/lib/Schema";
import Pirate from "~objects/Pirate";
import NetworkPlayer from "~objects/network/NetworkPlayer";
import { DEPTHS } from "~constants";

export default class NetworkPlayersController extends Phaser.GameObjects.Group {
	private sessions = new Map<string, Pirate>();

	private mainPlayer: NetworkPlayer;

	private currentSessionId;

	constructor(scene: Phaser.Scene) {
		super(scene);

		if (!this.scene.sync.currentRoom) {
			return;
		}

		this.currentSessionId = this.scene.sync.currentRoom.sessionId;
		this.scene.sync.currentRoom.state.players.onAdd = this.onAddListener;
		this.scene.sync.currentRoom.state.players.onRemove = this.onRemoveListener;
	}

	private onAddListener(player: PlayerState, sessionId: string) {
		if (this.currentSessionId === sessionId) {
		} else {
			const pirate = new Pirate(this.scene, player.x, player.y);
			pirate.setDepth(DEPTHS.player);
			this.sessions.set(sessionId, pirate);

			player.listen("x", () => {});

			player.onChange = this.onChangeListener.bind(this, sessionId);
		}
	}

	private onChangeListener(sessionId: string, changes: DataChange[]) {
		const object = this.sessions.get(sessionId);
		if (!object) {
			return;
		}
		changes.forEach((change) => {
			switch (change.field) {
				case "x":
					object.x = change.value;
					break;
				case "y":
					object.y = change.value;
					break;
				case "velocityX":
					object.setVelocityX(change.value);
					break;
				case "velocityY":
					object.setVelocityY(change.value);
					break;
				default:
					console.warn("Unknown field", change.field);
					break;
			}
		});
	}

	private onRemoveListener(player: PlayerState, sessionId: string) {
		this.sessions.get(sessionId)?.destroy();
		this.sessions.delete(sessionId);
	}
}
