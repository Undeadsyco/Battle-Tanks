
// You can write more code here

/* START OF COMPILED CODE */

import ScriptNode from "../../../script-nodes-basic/ScriptNode";
import Phaser from "phaser";
/* START-USER-IMPORTS */
import LevelManager from "./LevelManager";
import Level from "../../../scenes/Level";
import { EventCenter } from "../../../utils";
import { entityEventKeys, levelEventKeys } from "../../../../types/keys/event";
/* END-USER-IMPORTS */

export default class EntityManager extends ScriptNode {

	constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene) {
		super(parent);

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.

	private	entities = new Map();

	override get scene() { return super.scene as Level }
	override get parent() { return super.parent as LevelManager }

	createTankEntity(config: BattleTanks.Types.GameObjects.Tank.tankConfig) {
		this.entities.set(config.id, this.scene.add.tank(config));
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
