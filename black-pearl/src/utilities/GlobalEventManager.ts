import { Events } from "phaser";

class GlobalEventManager extends Events.EventEmitter {}

export default new GlobalEventManager();
