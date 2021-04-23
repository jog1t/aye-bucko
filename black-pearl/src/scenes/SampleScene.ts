import { Scene } from "phaser";
import * as constants from "~constants";
import { isDev } from "~shared";
import Player from "~objects/Player";
import ForegroundPalm from "~objects/decorations/ForegroundPalm";
import BackgroundPalm from "~objects/decorations/BackgroundPalm";

export default class SampleScene extends Scene {
	private map: Phaser.Tilemaps.Tilemap;

	private player: Player;

	constructor() {
		super(constants.SCENES.sample);
	}

	create(): void {
		this.player = new Player(this, 300, 300);
		this.player.setDepth(constants.DEPTHS.player);

		const { terrain } = this.createTileMap();
		this.physics.add.collider(terrain, this.player);
		this.cameras.main.zoomTo(2, 500, Phaser.Math.Easing.Cubic.InOut);
		this.cameras.main.startFollow(this.player);
		this.cameras.main.roundPixels = true;

		this.scene.run(constants.SCENES.interface);
	}

	private createTileMap(): { terrain: Phaser.Tilemaps.TilemapLayer } {
		this.cameras.main.setBackgroundColor("#33333e");
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
		terrain.setDepth(constants.DEPTHS.terrain);
		const palms = this.map.createLayer("Palms", detailsTileset);
		palms.setDepth(constants.DEPTHS.decorations);

		terrain.setCollisionByProperty({ collides: true });
		if (isDev()) {
			const graphics = this.add
				.graphics()
				.setAlpha(0.75)
				.setDepth(constants.DEPTHS.debug);
			terrain.renderDebug(graphics, {
				tileColor: null,
				collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
				faceColor: new Phaser.Display.Color(40, 39, 37, 255),
			});
		}

		this.map.getObjectLayer("Animated").objects.forEach((object) => {
			if (object.type === "palm") {
				const sprite = new ForegroundPalm(this, object.x, object.y);
				sprite.setDepth(constants.DEPTHS.decorations);
				sprite.x += sprite.width / 2 - 5;
				sprite.y -= sprite.height / 2;
				this.physics.add.collider(sprite, this.player);
			} else if (object.type === "backgroundPalm") {
				const sprite = new BackgroundPalm(this, object.x, object.y);
				sprite.setDepth(constants.DEPTHS.background);
				sprite.x += sprite.width / 2;
			}
		});

		return { terrain };
	}

	update(time: number, delta: number): void {
		super.update(time, delta);
		this.player.update(time, delta);
	}
}
