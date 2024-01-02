
// You can write more code here

export type hullChildren = {
	base: Phaser.GameObjects.Image;
	tracks: {
		left: Phaser.GameObjects.Sprite;
		right: Phaser.GameObjects.Sprite;
	}
}

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Hull extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 0);

		// leftTrack
		const leftTrack = scene.add.sprite(-80, 0, "Track1", "Track1_01.png");
		this.add(leftTrack);

		// rightTrack
		const rightTrack = scene.add.sprite(80, 0, "Track1", "Track1_01.png");
		this.add(rightTrack);

		// base
		const base = scene.add.image(0, 0, "Tank_Hulls_Blue", "Hull_01.png");
		this.add(base);

		this.leftTrack = leftTrack;
		this.rightTrack = rightTrack;
		this.base = base;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	private leftTrack: Phaser.GameObjects.Sprite;
	private rightTrack: Phaser.GameObjects.Sprite;
	private base: Phaser.GameObjects.Image;

	/* START-USER-CODE */

	// Write your code here.

	get children(): hullChildren {
		return ({
			base: this.base,
			tracks: {
				left: this.leftTrack,
				right: this.rightTrack,
			}
		});
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
