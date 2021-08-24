import * as Phaser from "phaser";
import { isDev } from "@jog1t/ambrose-light";
import * as constants from "~constants";
import { ForegroundPalm, BackgroundPalm } from "~objects/decorations";
import { NetworkPlayersGroup } from "~objects/network";

export default class SampleScene extends Phaser.Scene {
	private networkController;

	constructor() {
		super(constants.SCENES.sample);
		this.networkController = new NetworkPlayersGroup(this);
	}

	create(): void {
		this.cameras.main.setBackgroundColor("#33333e");
		this.cameras.main.roundPixels = true;

		const { terrain } = this.createTileMap();
		this.add.existing(this.networkController);
		this.networkController.on(
			NetworkPlayersGroup.EVENTS.ENTITY_ADD,
			({ entity, isCurrentPlayer }) => {
				if (isCurrentPlayer) {
					this.cameras.main.startFollow(entity);
					this.cameras.main.zoomTo(2, 500, Phaser.Math.Easing.Cubic.InOut);
				}
			}
		);

		this.physics.add.collider(terrain, this.networkController);
		this.networkController.init();

		this.scene.run(constants.SCENES.interface);
	}

	private createTileMap(): { terrain: Phaser.Tilemaps.TilemapLayer } {
		const map = this.make.tilemap({
			key: constants.TILE_MAPS.sample,
		});
		const terrainTileset = map.addTilesetImage(
			"island-terrain",
			constants.TILE_SETS.island.terrain
		);
		const detailsTileset = map.addTilesetImage(
			"island-details",
			constants.TILE_SETS.island.details
		);
		const backgroundTileset = map.addTilesetImage(
			"island-background",
			constants.TILE_SETS.island.background
		);

		map.createLayer("Background", backgroundTileset);
		map.createLayer("Grass", detailsTileset);
		const terrain = map.createLayer("Terrain", terrainTileset);
		terrain.setDepth(constants.DEPTHS.terrain);
		const palms = map.createLayer("Palms", detailsTileset);
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

		map.getObjectLayer("Animated").objects.forEach((object) => {
			if (object.type === "palm" && object.x && object.y) {
				const sprite = new ForegroundPalm(this, object.x, object.y);
				sprite.setDepth(constants.DEPTHS.decorations);
				sprite.x += sprite.width / 2 - 5;
				sprite.y -= sprite.height / 2;
			} else if (object.type === "backgroundPalm" && object.x && object.y) {
				const sprite = new BackgroundPalm(this, object.x, object.y);
				sprite.setDepth(constants.DEPTHS.background);
				sprite.x += sprite.width / 2;
			}
		});

		return { terrain };
	}

	update(time: number, delta: number): void {
		super.update(time, delta);
		this.networkController.sessions.forEach((player) => {
			player.update(time, delta);
		});
	}
}
