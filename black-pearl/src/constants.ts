export const SCENES = {
	bootstrap: "SCENES/bootstrap",
	sample: "SCENES/sample",
	interface: "SCENES/interface",
};

export const TILE_SETS = {
	island: {
		background: "TILE_SETS/island/background",
		details: "TILE_SETS/island/details",
		terrain: "TILE_SETS/island/terrain",
	},
};

export const TILE_MAPS = {
	sample: "TILE_MAPS/sample",
};

export const ATLASES = {
	characters: {
		captain: "ATLASES/characters/captain",
	},
	controls: {
		mobile: "ATLASES/controls/mobile",
	},
	objects: {
		palms: "ATLASES/objects/palms",
	},
};

export const ANIMATIONS = {
	characters: {
		captain: {
			idle: "ANIMATIONS/characters/captain/idle",
			run: "ANIMATIONS/characters/captain/run",
			fall: "ANIMATIONS/characters/captain/fall",
			jump: "ANIMATIONS/characters/captain/jump",
		},
	},
	objects: {
		foregroundPalm: "ANIMATIONS/objects/foregroundPalm",
		backgroundPalm: "ANIMATIONS/objects/backgroundPalm",
	},
};

export const DEPTHS = {
	background: 1,
	player: 2,
	terrain: 3,
	decorations: 4,
	debug: 999,
};