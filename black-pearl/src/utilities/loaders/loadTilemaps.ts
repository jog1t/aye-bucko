import { Scene } from "phaser";
import sampleTileMapUrl from "@jog1t/fair-wind/tilemaps/sample.json";
import * as constants from "~constants";

export default function loadTilemaps(scene: Scene): void {
	scene.load.tilemapTiledJSON(constants.TILE_MAPS.sample, sampleTileMapUrl);
}
