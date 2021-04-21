import { Scene } from "phaser";
import * as constants from "~constants";
// assets
import captainAtlasTextureUrl from "~assets/characters/captain/captain.png";
import captainAtlasJsonUrl from "~assets/characters/captain/captain.json";
import palmsAtlasTextureUrl from "~assets/objects/palms/palms.png";
import palmsAtlasJsonUrl from "~assets/objects/palms/palms.json";
import mobileControlsTextureUrl from "~assets/interface-elements/mobile-controls/controls.png";
import mobileControlsJsonUrl from "~assets/interface-elements/mobile-controls/controls.json";

export default function loadAtlases(scene: Scene): void {
	scene.load.atlas(
		constants.ATLASES.characters.captain,
		captainAtlasTextureUrl,
		captainAtlasJsonUrl
	);

	scene.load.atlas(
		constants.ATLASES.objects.palms,
		palmsAtlasTextureUrl,
		palmsAtlasJsonUrl
	);

	// interface
	scene.load.atlas(
		constants.ATLASES.controls.mobile,
		mobileControlsTextureUrl,
		mobileControlsJsonUrl
	);
}
