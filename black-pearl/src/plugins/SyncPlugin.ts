import * as Phaser from "phaser";
import { Client, Room } from "colyseus.js";

export default class SyncPlugin extends Phaser.Plugins.BasePlugin {
	private client: Client;

	private currentRoom: Room;

	constructor(pluginManager: Phaser.Plugins.PluginManager) {
		super(pluginManager);

		this.client = new Client(process.env.GAME_SERVER_URL);
	}

	public async join(roomName: string): Promise<Room> {
		const room = await this.client.joinOrCreate(roomName);
		this.currentRoom = room;
		return room;
	}

	public async reconnect(roomName: string): Promise<Room> {
		const room = await this.client.reconnect(
			roomName,
			this.currentRoom.sessionId
		);
		this.currentRoom = room;
		return room;
	}
}
