import * as Phaser from "phaser";
import { PlayerSchema } from "@jog1t/ambrose-light";
import { DataChange } from "@colyseus/schema";
import { DEPTHS } from "~constants";
import NetworkPlayer from "~objects/network/NetworkPlayer";
import NetworkPirate from "~objects/network/NetworkPirate";
import { Pirate } from "~objects";

enum EVENTS {
	ENTITY_ADD = "ENTITY_ADD",
	ENTITY_REMOVE = "ENTITY_REMOVE",
}

interface NetworkEntityMutation {
	entity: Pirate;
	sessionId: string;
	isCurrentPlayer: boolean;
}

// Strongly typed events to improve DX
declare interface NetworkPlayersGroup {
	emit(name: EVENTS.ENTITY_ADD, opts: NetworkEntityMutation): boolean;
	emit(name: EVENTS.ENTITY_REMOVE, opts: NetworkEntityMutation): boolean;

	on(name: EVENTS.ENTITY_ADD, fn: (opts: NetworkEntityMutation) => void): this;
	on(
		name: EVENTS.ENTITY_REMOVE,
		fn: (opts: NetworkEntityMutation) => void
	): this;
}

class NetworkPlayersGroup extends Phaser.GameObjects.Group {
	public sessions = new Map<string, NetworkPirate>();

	static EVENTS = EVENTS;

	private currentSessionId: string | undefined;

	init(): void {
		// Without this, NetworkPlayer can't move
		this.runChildUpdate = true;

		const room = this.scene.sync.getPlayersRoom();

		this.currentSessionId = room.sessionId;
		room.state.players.onAdd = this.onAddListener.bind(this);
		room.state.players.onRemove = this.onRemoveListener.bind(this);

		// Spawn current player
		const currentPlayer = new NetworkPlayer(this.scene, 300, 300);
		this.addEntity(currentPlayer, this.currentSessionId);

		// Subscribe to players that are already in a room
		room.state.players.forEach((state, sessionId) => {
			if (this.currentSessionId !== sessionId) {
				this.addPlayer(state, sessionId);
			}
		});
	}

	private isCurrentSessionId(sessionId: string) {
		return this.currentSessionId === sessionId;
	}

	private onAddListener(state: PlayerSchema, sessionId: string) {
		if (!this.isCurrentSessionId(sessionId)) {
			this.addPlayer(state, sessionId);
		}
	}

	private addPlayer(state: PlayerSchema, sessionId: string) {
		const entity = new NetworkPirate(this.scene, state.x, state.y);
		this.sessions.set(sessionId, entity);
		// There's no other way to subscribe to a changes on a state than reassigning `onChange` property.
		// eslint-disable-next-line no-param-reassign
		state.onChange = this.onChangeListener.bind(this, sessionId);
		this.addEntity(entity, sessionId);
	}

	private addEntity(entity: Pirate, sessionId: string) {
		entity.setDepth(DEPTHS.player);
		this.add(entity);
		this.emit(EVENTS.ENTITY_ADD, {
			entity,
			sessionId,
			isCurrentPlayer: this.isCurrentSessionId(sessionId),
		});
	}

	private onChangeListener(sessionId: string, changes: DataChange[]) {
		const entity = this.sessions.get(sessionId);
		if (!entity) {
			return;
		}
		entity.applyDataChanges(changes);
	}

	private onRemoveListener(state: PlayerSchema, sessionId: string) {
		const entity = this.sessions.get(sessionId);
		if (!entity) {
			return;
		}
		entity.kill(() => {
			this.emit(EVENTS.ENTITY_REMOVE, {
				entity,
				sessionId,
				isCurrentPlayer: this.isCurrentSessionId(sessionId),
			});
			this.sessions.delete(sessionId);
			entity.destroy();
		});
	}
}

export default NetworkPlayersGroup;
