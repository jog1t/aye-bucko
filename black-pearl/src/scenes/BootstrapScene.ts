import { Scene } from "phaser";

import islandBackgroundUrl from "~assets/tilesets/island-background.png";
import islandDetailsUrl from "~assets/tilesets/island-details.png";
import islandTerrainUrl from "~assets/tilesets/island-terrain.png";
import sampleTileMapUrl from "~assets/tilemaps/sample.json";
import captainAtlasJsonUrl from "~assets/characters/captain/captain.json";
import captainAtlasTextureUrl from "~assets/characters/captain/captain.png";

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

		this.load.atlas(
			constants.ATLASES.characters.captain,
			captainAtlasTextureUrl,
			captainAtlasJsonUrl
		);

		this.load.on(Phaser.Loader.Events.PROGRESS, this.onLoadProgress, this);
		this.load.on(Phaser.Loader.Events.COMPLETE, this.onLoadComplete, this);
	}

	destroy(): void {
		this.load.off(Phaser.Loader.Events.PROGRESS, this.onLoadProgress, this);
		this.load.off(Phaser.Loader.Events.COMPLETE, this.onLoadComplete, this);
	}

	create(): void {
		this.anims.create({
			key: constants.ANIMATIONS.characters.captain.idle,
			frames: this.anims.generateFrameNames(
				constants.ATLASES.characters.captain,
				{ prefix: "Idle ", start: 1, end: 5, zeroPad: 2 }
			),
			frameRate: 10,
			repeat: -1,
		});
		this.anims.create({
			key: constants.ANIMATIONS.characters.captain.run,
			frames: this.anims.generateFrameNames(
				constants.ATLASES.characters.captain,
				{ prefix: "Run ", start: 1, end: 5, zeroPad: 2 }
			),
			frameRate: 10,
			repeat: -1,
		});
		this.anims.create({
			key: constants.ANIMATIONS.characters.captain.fall,
			frames: this.anims.generateFrameNames(
				constants.ATLASES.characters.captain,
				{ prefix: "Fall ", start: 1, end: 1, zeroPad: 2 }
			),
			frameRate: 10,
			repeat: -1,
		});
		this.anims.create({
			key: constants.ANIMATIONS.characters.captain.jump,
			frames: this.anims.generateFrameNames(
				constants.ATLASES.characters.captain,
				{ prefix: "Jump ", start: 1, end: 3, zeroPad: 2 }
			),
			frameRate: 10,
		});
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
