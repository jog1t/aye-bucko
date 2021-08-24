import { Scene } from "phaser";

import islandBackgroundUrl from "@jog1t/fair-wind/tilesets/island-background.png";
import islandDetailsUrl from "@jog1t/fair-wind/tilesets/island-details.png";
import islandTerrainUrl from "@jog1t/fair-wind/tilesets/island-terrain.png";

import * as constants from "~constants";

export default function loadImages(scene: Scene): void {
	scene.load.image(constants.TILE_SETS.island.background, islandBackgroundUrl);
	scene.load.image(constants.TILE_SETS.island.details, islandDetailsUrl);
	scene.load.image(constants.TILE_SETS.island.terrain, islandTerrainUrl);
}
