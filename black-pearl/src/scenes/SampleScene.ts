import * as Phaser from "phaser";
import { isDev } from "@jog1t/ambrose-light";
import * as constants from "~constants";
import {
	CloudType,
	SmallCloud,
	BigCloud,
	ForegroundPalm,
	BackgroundPalm,
	WaterReflection,
} from "~objects/decorations";
import { NetworkPlayersGroup } from "~objects/network";
import { guards } from "~utilities";
import { CameraController } from "~controllers";

function objectTypeIsCloudType(tileType: string): tileType is CloudType {
	return Object.values(CloudType).includes(tileType as CloudType);
}

export default class SampleScene extends Phaser.Scene {
	private objectsNeedsUpdate: Set<Phaser.GameObjects.GameObject> = new Set();

	private networkController;

	private cameraController;

	constructor() {
		super(constants.SCENES.sample);
		this.networkController = new NetworkPlayersGroup(this);
		this.cameraController = new CameraController(this);
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
					this.cameraController.startFollow(entity);
				}
			}
		);

		this.physics.add.collider(terrain, this.networkController);
		this.networkController.init();
		this.cameraController.init();

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

		const background = map.createLayer("Background", backgroundTileset);
		background.setScrollFactor(1, 1.05);
		background.setDepth(constants.DEPTHS.background);
		const grass = map.createLayer("Grass", detailsTileset);
		grass.setDepth(constants.DEPTHS.decorations);
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

		const utilitiesLayer = map.getObjectLayer("Utilities");
		const boundingPolygon = utilitiesLayer.objects.find(
			(tile) => tile.type === "boundingPolygon"
		);

		const boundingBox = utilitiesLayer.objects.find(
			(tile) => tile.type === "boundingBox"
		);

		const scrollConfig = {
			startX: boundingBox?.x ?? 0,
			width: boundingBox?.width ?? 1000,
		};
		map.getObjectLayer("Animated").objects.forEach((object) => {
			if (!guards.objectHasCoords(object)) {
				return;
			}

			if (object.type === "palm") {
				const sprite = new ForegroundPalm(this, object.x, object.y);
				sprite.setDepth(constants.DEPTHS.decorations);
				sprite.x += sprite.width / 2 - 5;
				sprite.y -= sprite.height / 2;
				this.add.existing(sprite);
			} else if (object.type === "backgroundPalm") {
				const sprite = new BackgroundPalm(this, object.x, object.y);
				sprite.setDepth(constants.DEPTHS.backgroundDecorations);
				sprite.x += sprite.width / 2;
				this.add.existing(sprite);
			} else if (object.type === "waterReflectionBig") {
				const sprite = new WaterReflection(this, "big", object.x, object.y);
				this.add.existing(sprite);
				sprite.setScrollFactor(1, 1.05);
			} else if (
				object.type === "bigCloud" &&
				boundingPolygon &&
				guards.objectHasCoords(boundingPolygon) &&
				guards.objectHasPolygon(boundingPolygon)
			) {
				const sprite = new BigCloud(
					this,
					object.x,
					object.y,
					boundingPolygon,
					scrollConfig
				);
				sprite.setScrollFactor(1, 1.05);
				sprite.setDepth(constants.DEPTHS.clouds);
				this.add.existing(sprite);
				this.objectsNeedsUpdate.add(sprite);
			} else if (
				objectTypeIsCloudType(object.type) &&
				boundingPolygon &&
				guards.objectHasCoords(boundingPolygon) &&
				guards.objectHasPolygon(boundingPolygon)
			) {
				const sprite = new SmallCloud(
					this,
					object.x,
					object.y,
					object.type,
					boundingPolygon,
					scrollConfig
				);

				sprite.setScrollFactor(1, 1.025);
				sprite.setDepth(constants.DEPTHS.clouds);
				this.add.existing(sprite);
				this.objectsNeedsUpdate.add(sprite);
			}
		});

		return { terrain };
	}

	update(time: number, delta: number): void {
		super.update(time, delta);
		this.cameraController.update();
		this.networkController.sessions.forEach((player) => {
			player.update(time, delta);
		});
		this.objectsNeedsUpdate.forEach((gameObject) => {
			gameObject.update(time, delta);
		});
	}
}
