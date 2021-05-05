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
}
