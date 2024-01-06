
// You can write more code here

/* START OF COMPILED CODE */

import ScriptNode from "../script-nodes-basic/ScriptNode";
import Phaser from "phaser";
/* START-USER-IMPORTS */
import { tankConfig, } from "../../types";
import Tank from "../prefabs/tanks/Tank";
/* END-USER-IMPORTS */

export default class GameObjectFactoryScript extends ScriptNode {

	constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene) {
		super(parent);

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.

	protected override awake(): void {
		Phaser.GameObjects.GameObjectFactory.register("tank", function (this: Phaser.GameObjects.GameObjectFactory, config: tankConfig) {
			const { id, x, y, color, hullType, trackType, turretType, barrelType } = config;
			const tank = new Tank(this.scene, x, y).init({ id, color, hullType, trackType, turretType, barrelType });
			this.updateList.add(tank);
			this.displayList.add(tank);
			return tank;
		});
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
