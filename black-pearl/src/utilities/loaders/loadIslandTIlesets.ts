import { Scene } from "phaser";
import * as constants from "~constants";

import islandBackgroundUrl from "~assets/tilesets/island-background.png";
import islandDetailsUrl from "~assets/tilesets/island-details.png";
import islandTerrainUrl from "~assets/tilesets/island-terrain.png";
import sampleTileMapUrl from "~assets/tilemaps/sample.json";

export default function loadIslandTilesets(scene: Scene): void {
	scene.load.image(constants.TILE_SETS.island.background, islandBackgroundUrl);
	scene.load.image(constants.TILE_SETS.island.details, islandDetailsUrl);
	scene.load.image(constants.TILE_SETS.island.terrain, islandTerrainUrl);
	scene.load.tilemapTiledJSON(constants.TILE_MAPS.sample, sampleTileMapUrl);
}
