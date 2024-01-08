
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Turret extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 0);

		// base
		const base = scene.add.image(0, 0, "Weapon_Turrets_Blue", "Gun_Turret_01.png");
		this.add(base);

		// barrel
		const barrel = scene.add.image(0, -51, "Guns_Barrels", "Gun_Barrel_01.png");
		barrel.setOrigin(0.5, 1);
		this.add(barrel);

		this.base = base;
		this.barrel = barrel;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	private base: Phaser.GameObjects.Image;
	private barrel: Phaser.GameObjects.Image;

	/* START-USER-CODE */

	// Write your code here.

	get children(): BattleTanks.Types.GameObjects.Tank.turretChildren {
		return ({
			base: this.base,
			barrel: this.barrel,
		});
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
