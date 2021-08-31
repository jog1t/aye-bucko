import * as Phaser from "phaser";
import { SetRequired } from "type-fest";

export function objectHasCoords(
	object: Phaser.Types.Tilemaps.TiledObject
): object is Phaser.Types.Tilemaps.TiledObject & { x: number; y: number } {
	return object.x !== undefined && object.y !== undefined;
}

export function objectHasPolygon(
	object: Phaser.Types.Tilemaps.TiledObject
): object is SetRequired<Phaser.Types.Tilemaps.TiledObject, "polygon"> {
	return object.polygon !== undefined;
}
