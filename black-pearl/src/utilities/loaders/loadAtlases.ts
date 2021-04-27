import { Scene } from "phaser";
import * as constants from "~constants";
// assets
import captainAtlasTextureUrl from "~assets/characters/captain/captain.png";
import captainAtlasJsonUrl from "~assets/characters/captain/captain.json";
import palmsAtlasTextureUrl from "~assets/objects/palms/palms.png";
import palmsAtlasJsonUrl from "~assets/objects/palms/palms.json";
import waterReflectionsAtlasTextureUrl from "~assets/objects/water-reflections/water-reflections.png";
import waterReflectionsAtlasJsonUrl from "~assets/objects/water-reflections/water-reflections.json";
import cloudsAtlasTextureUrl from "~assets/objects/clouds/clouds.png";
import cloudsAtlasJsonUrl from "~assets/objects/clouds/clouds.json";
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

	scene.load.atlas(
		constants.ATLASES.objects.waterReflections,
		waterReflectionsAtlasTextureUrl,
		waterReflectionsAtlasJsonUrl
	);

	scene.load.atlas(
		constants.ATLASES.objects.clouds,
		cloudsAtlasTextureUrl,
		cloudsAtlasJsonUrl
	);

	// interface
	scene.load.atlas(
		constants.ATLASES.controls.mobile,
		mobileControlsTextureUrl,
		mobileControlsJsonUrl
	);
}
