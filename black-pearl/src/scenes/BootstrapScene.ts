import { Scene } from "phaser";
import * as constants from "~constants";
import { creators, loaders } from "~utilities";
import { ROOMS } from "~shared/constants";
import { UserDataController } from "~controllers";

export default class Bootstrap extends Scene {
	private userData = new UserDataController();

	constructor() {
		super(constants.SCENES.bootstrap);
	}

	preload(): void {
		Object.values(loaders).forEach((loader) => loader(this));

		this.load.on(Phaser.Loader.Events.PROGRESS, this.onLoadProgress, this);
		this.load.on(Phaser.Loader.Events.COMPLETE, this.onLoadComplete, this);
	}

	destroy(): void {
		this.load.off(Phaser.Loader.Events.PROGRESS, this.onLoadProgress, this);
		this.load.off(Phaser.Loader.Events.COMPLETE, this.onLoadComplete, this);
	}

	create(): void {
		Object.values(creators).forEach((creator) => creator(this));
	}

	// TODO(jog1t)
	/* eslint-disable */
	private onLoadProgress(progress?: number) {
		console.log("Progress ", progress);
	}
	/* eslint-enable */

	private onLoadComplete() {
		const userName = this.userData.getOrSetUserName();
		this.sync
			.join(ROOMS.sampleRoom, userName)
			.then(() => {
				this.scene.start(constants.SCENES.sample);
			})
			.catch(() => {
				// TODO(jog1t)
				// eslint-disable-next-line no-alert
				alert(
					"There has been an error connecting to the sample room. Please try again later."
				);
			});
	}
}
