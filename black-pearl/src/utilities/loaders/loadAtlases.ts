import { Scene } from "phaser";

import captainAtlasTextureUrl from "@jog1t/fair-wind/characters/captain/captain.png";
import captainAtlasJsonUrl from "@jog1t/fair-wind/characters/captain/captain.json";
import palmsAtlasTextureUrl from "@jog1t/fair-wind/objects/palms/palms.png";
import palmsAtlasJsonUrl from "@jog1t/fair-wind/objects/palms/palms.json";
import waterReflectionsAtlasTextureUrl from "@jog1t/fair-wind/objects/water-reflections/water-reflections.png";
import waterReflectionsAtlasJsonUrl from "@jog1t/fair-wind/objects/water-reflections/water-reflections.json";
import cloudsAtlasTextureUrl from "@jog1t/fair-wind/objects/clouds/clouds.png";
import cloudsAtlasJsonUrl from "@jog1t/fair-wind/objects/clouds/clouds.json";
import mobileControlsTextureUrl from "@jog1t/fair-wind/interface-elements/mobile-controls/controls.png";
import mobileControlsJsonUrl from "@jog1t/fair-wind/interface-elements/mobile-controls/controls.json";

import * as constants from "~constants";

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
