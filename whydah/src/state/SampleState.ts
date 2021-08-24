import { MapSchema, Schema, type } from "@colyseus/schema";
import { getRandomInt, PlayerState } from "@jog1t/ambrose-light";
import Player from "./Player";

export default class SampleState extends Schema {
	@type({ map: Player })
	players = new MapSchema<Player>();

	createPlayer(sessionId: string, opts?: { userName?: string }): void {
		const player = new Player();
		player.name = opts?.userName ?? `Player ${getRandomInt(0, 10000)}`;
		this.players.set(sessionId, player);
	}

	removePlayer(sessionId: string): void {
		this.players.delete(sessionId);
	}

	movePlayer(sessionId: string, pos: PlayerState): void {
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
