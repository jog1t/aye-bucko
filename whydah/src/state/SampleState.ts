import { MapSchema, Schema, type } from "@colyseus/schema";
import Player from "./Player";

export default class SampleState extends Schema {
	@type({ map: Player })
	players = new MapSchema<Player>();

	createPlayer(sessionId: string): void {
		this.players.set(sessionId, new Player());
	}

	removePlayer(sessionId: string): void {
		this.players.delete(sessionId);
	}

	movePlayer(
		sessionId: string,
		pos: { x?: number; y?: number; velocityX?: number; velocityY?: number }
	): void {
		const player = this.players.get(sessionId);
		if (!player) {
			return;
		}
		player.x = pos.x ?? player.x;
		player.y = pos.y ?? player.y;
		player.velocityY = pos.velocityY ?? player.velocityY;
		player.velocityX = pos.velocityX ?? player.velocityX;
	}
}
