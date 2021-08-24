import * as Phaser from "phaser";
import { Client, Room } from "colyseus.js";
import { PlayersSchema } from "@jog1t/ambrose-light";

export default class SyncPlugin extends Phaser.Plugins.BasePlugin {
	private client: Client;

	private currentRoom: Room | undefined;

	constructor(pluginManager: Phaser.Plugins.PluginManager) {
		super(pluginManager);

		this.client = new Client(process.env.GAME_SERVER_URL);
	}

	public async join(roomName: string): Promise<Room> {
		const room = await this.client.joinOrCreate(roomName);
		this.currentRoom = room;
		return room;
	}

	public async reconnect(roomName: string): Promise<Room | undefined> {
		if (!this.currentRoom) {
			return undefined;
		}
		const room = await this.client.reconnect(
			roomName,
			this.currentRoom?.sessionId
		);
		this.currentRoom = room;
		return room;
	}

	public getRoom(): Room {
		if (this.currentRoom) {
			return this.currentRoom;
		}
		throw new Error("There's no room that you're connected to");
	}

	public getPlayersRoom(): Room<PlayersSchema> {
		if (this.currentRoom?.state.players) {
			return this.currentRoom;
		}
		throw new Error("Invalid fetch for room with players");
	}
}
