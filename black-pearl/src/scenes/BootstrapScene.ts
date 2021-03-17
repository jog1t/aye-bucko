import { Scene } from "phaser";

import islandBackgroundUrl from "~assets/tilesets/island-background.png";
import islandDetailsUrl from "~assets/tilesets/island-details.png";
import islandTerrainUrl from "~assets/tilesets/island-terrain.png";
import sampleTileMapUrl from "~assets/tilemaps/sample.json";

import * as constants from "../constants";

export default class Bootstrap extends Scene {
	constructor() {
		super(constants.SCENES.bootstrap);
	}

	preload(): void {
		this.load.image(constants.TILE_SETS.island.background, islandBackgroundUrl);
		this.load.image(constants.TILE_SETS.island.details, islandDetailsUrl);
		this.load.image(constants.TILE_SETS.island.terrain, islandTerrainUrl);
		this.load.tilemapTiledJSON(constants.TILE_MAPS.sample, sampleTileMapUrl);

		this.load.on(Phaser.Loader.Events.PROGRESS, this.onLoadProgress, this);
		this.load.on(Phaser.Loader.Events.COMPLETE, this.onLoadComplete, this);
	}

	destroy(): void {
		this.load.off(Phaser.Loader.Events.PROGRESS, this.onLoadProgress, this);
		this.load.off(Phaser.Loader.Events.COMPLETE, this.onLoadComplete, this);
	}

	// TODO(jog1t)
	/* eslint-disable */
	private onLoadProgress(progress?: number) {
		console.log("Progress ", progress);
	}
	/* eslint-enable */

	private onLoadComplete() {
		this.scene.run(constants.SCENES.sample);
	}
}
