import * as Phaser from "phaser";
import { Client, Room } from "colyseus.js";
import SampleRoom from "@jog1t/whydah/src/rooms/SampleRoom";

export default class SyncPlugin extends Phaser.Plugins.BasePlugin {
	private client: Client;

	public currentRoom: Room<SampleRoom["state"]> | undefined;

	constructor(pluginManager: Phaser.Plugins.PluginManager) {
		super(pluginManager);

		this.client = new Client(process.env.GAME_SERVER_URL);
	}

	public async join(roomName: string): Promise<Room> {
		const room = await this.client.joinOrCreate<SampleRoom["state"]>(roomName);
		this.currentRoom = room;
		return room;
	}

	public async reconnect(roomName: string): Promise<Room | undefined> {
		if (!this.currentRoom) {
			return undefined;
		}
		const room = await this.client.reconnect<SampleRoom["state"]>(
			roomName,
			this.currentRoom?.sessionId
		);
		this.currentRoom = room;
		return room;
	}
}
