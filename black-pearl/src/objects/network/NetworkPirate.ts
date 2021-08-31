import { DataChange } from "@colyseus/schema";
import Pirate from "~objects/Pirate";

export default class NetworkPirate extends Pirate {
	applyDataChanges(changes: DataChange[]): void {
		changes.forEach((change) => {
			switch (change.field) {
				case "x":
					this.x = change.value;
					break;
				case "y":
					this.y = change.value;
					break;
				case "velocityX":
					this.setVelocityX(change.value);
					break;
				case "velocityY":
					this.setVelocityY(change.value);
					break;
				default:
					// TODO(jog1t): this should be logged to an external service
					// eslint-disable-next-line no-console
					console.warn("Unknown field", change.field);
					break;
			}
		});
	}
}
