import { Schema, type } from "@colyseus/schema";

export default class Player extends Schema {
	@type("number")
	x = 300;

	@type("number")
	y = 300;

	@type("number")
	velocityX = 0;

	@type("number")
	velocityY = 0;
}
