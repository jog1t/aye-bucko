import * as Phaser from "phaser";
import * as constants from "~constants";
import { isDev } from "~shared";
import Player from "~objects/Player";
import ForegroundPalm from "~objects/decorations/ForegroundPalm";
import BackgroundPalm from "~objects/decorations/BackgroundPalm";
import WaterReflection from "~objects/decorations/WaterReflection";
import BigCloud from "~objects/decorations/BigCloud";

export default class SampleScene extends Phaser.Scene {
	private map: Phaser.Tilemaps.Tilemap;

	private objectsNeedsUpdate: Set<Phaser.GameObjects.GameObject> = new Set();

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

		const background = this.map.createLayer("Background", backgroundTileset);
		background.setScrollFactor(1.1);
		background.setDepth(constants.DEPTHS.background);
		const grass = this.map.createLayer("Grass", detailsTileset);
		grass.setDepth(constants.DEPTHS.decorations);
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

		const utilitiesLayer = this.map.getObjectLayer("Utilities");
		const boundingPolygon = utilitiesLayer.objects.find(
			(tile) => tile.type === "boundingPolygon"
		);

		const boundingBox = utilitiesLayer.objects.find(
			(tile) => tile.type === "boundingBox"
		);

		this.map.getObjectLayer("Animated").objects.forEach((object) => {
			if (object.type === "palm") {
				const sprite = new ForegroundPalm(this, object.x, object.y);
				sprite.setDepth(constants.DEPTHS.decorations);
				sprite.x += sprite.width / 2 - 5;
				sprite.y -= sprite.height / 2;
				this.add.existing(sprite);
				this.physics.add.collider(sprite, this.player);
			} else if (object.type === "backgroundPalm") {
				const sprite = new BackgroundPalm(this, object.x, object.y);
				sprite.setDepth(constants.DEPTHS.backgroundDecorations);
				sprite.x += sprite.width / 2;
				this.add.existing(sprite);
			} else if (object.type === "waterReflectionBig") {
				const sprite = new WaterReflection(this, "big", object.x, object.y);
				this.add.existing(sprite);
				sprite.setScrollFactor(1.1);
			} else if (object.type === "bigCloud") {
				const sprite = new BigCloud(this, object.y, boundingPolygon, {
					startX: boundingBox.x,
					width: boundingBox.width + 300,
				});
				sprite.setScrollFactor(1.1);
				sprite.setDepth(constants.DEPTHS.clouds);
				this.add.existing(sprite);
				this.objectsNeedsUpdate.add(sprite);
			}
		});

		return { terrain };
	}

	update(time: number, delta: number): void {
		super.update(time, delta);
		this.player.update(time, delta);
		this.objectsNeedsUpdate.forEach((gameObject) => {
			gameObject.update(time, delta);
		});
	}
}
