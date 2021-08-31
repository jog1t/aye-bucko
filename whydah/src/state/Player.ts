import { Schema, type } from "@colyseus/schema";
import { PlayerSchema } from "@jog1t/ambrose-light";

export default class Player extends Schema implements PlayerSchema {
	@type("string")
	name = "";

	@type("number")
	x = 300;

	@type("number")
	y = 300;

	@type("number")
	velocityX = 0;

	@type("number")
	velocityY = 0;
}
