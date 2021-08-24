import { Client, Room } from "colyseus";
import SampleState from "../state/SampleState";

export default class SampleRoom extends Room<SampleState> {
	onCreate(options: unknown): void {
		super.onCreate?.(options);
		this.setState(new SampleState());

		this.onMessage("playerUpdate", (client, data) => {
			this.state.movePlayer(client.sessionId, data);
		});
	}

	onJoin(client: Client, options?: unknown, auth?: unknown): void {
		super.onJoin?.(client, options, auth);
		console.log(client.sessionId, " joined");
		this.state.createPlayer(client.sessionId);
	}

	onLeave(client: Client, consented?: boolean): void {
		super.onLeave?.(client, consented);
		console.log(client.sessionId, " left");
		this.state.removePlayer(client.sessionId);
	}
}
