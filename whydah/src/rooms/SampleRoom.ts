import { Client, Room } from "colyseus";
import { NETWORK_MESSAGE, PlayerState } from "@jog1t/ambrose-light";
import SampleState from "../state/SampleState";

interface SampleRoomOptions {
	userName?: string;
}

export default class SampleRoom extends Room<SampleState> {
	onCreate(options: unknown): void {
		super.onCreate?.(options);
		this.setState(new SampleState());

		this.onMessage(
			NETWORK_MESSAGE.player.update,
			(client, data: PlayerState) => {
				this.state.movePlayer(client.sessionId, data);
			}
		);
	}

	onAuth(client: Client, options: SampleRoomOptions): boolean {
		if (!options.userName || options.userName.length < 1) {
			throw new Error("Invalid user name");
		}
		return true;
	}

	onJoin(client: Client, options?: SampleRoomOptions, auth?: unknown): void {
		super.onJoin?.(client, options, auth);
		this.state.createPlayer(client.sessionId, options);
	}

	onLeave(client: Client, consented?: boolean): void {
		super.onLeave?.(client, consented);
		this.state.removePlayer(client.sessionId);
	}
}
