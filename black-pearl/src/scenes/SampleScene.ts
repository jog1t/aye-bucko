import { Scene } from "phaser";
import * as constants from "../constants";
import { isDev } from "~shared";

export default class SampleScene extends Scene {
	private map: Phaser.Tilemaps.Tilemap;

	constructor() {
		super(constants.SCENES.sample);
	}

	create(): void {
		this.createTileMap();
	}

	private createTileMap(): void {
		this.cameras.main.setBackgroundColor("#33333e");
		this.cameras.main.zoomTo(2, 500, Phaser.Math.Easing.Cubic.InOut);
		this.cameras.main.pan(300, 300, 500, Phaser.Math.Easing.Cubic.InOut);
		this.map = this.make.tilemap({
			key: constants.TILE_MAPS.sample,
		});
		const terrainTileset = this.map.addTilesetImage(
			"island-terrain",
			constants.TILE_SETS.island.terrain
		);
		const detailsTileset = this.map.addTilesetImage(
			"island-details",
			constants.TILE_SETS.island.details
		);
		const backgroundTileset = this.map.addTilesetImage(
			"island-background",
			constants.TILE_SETS.island.background
		);

		this.map.createLayer("Background", backgroundTileset);
		this.map.createLayer("Grass", detailsTileset);
		const terrain = this.map.createLayer("Terrain", terrainTileset);
		this.map.createLayer("Palms", detailsTileset);

		terrain.setCollisionByProperty({ collides: true });
		if (isDev()) {
			const graphics = this.add.graphics().setAlpha(0.75);
			terrain.renderDebug(graphics, {
				tileColor: null,
				collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
				faceColor: new Phaser.Display.Color(40, 39, 37, 255),
			});
		}
	}
}
