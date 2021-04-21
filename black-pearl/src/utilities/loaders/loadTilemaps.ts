import { Scene } from "phaser";
import * as constants from "~constants";
// assets
import sampleTileMapUrl from "~assets/tilemaps/sample.json";

export default function loadTilemaps(scene: Scene): void {
	scene.load.tilemapTiledJSON(constants.TILE_MAPS.sample, sampleTileMapUrl);
}
