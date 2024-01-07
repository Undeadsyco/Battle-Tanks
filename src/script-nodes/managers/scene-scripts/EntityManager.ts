
// You can write more code here
export const entityEventKeys = {
	CREATE_TANK_ENTITY: "create-state-entity",
} as const;

/* START OF COMPILED CODE */

import ScriptNode from "../../../script-nodes-basic/ScriptNode";
import Phaser from "phaser";
/* START-USER-IMPORTS */
import LevelManager from "./LevelManager";
import Level, { levelEventKeys } from "../../../scenes/Level";
import { tankConfig } from "../../../../types";
import { EventCenter } from "../../../utils";
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

	override get scene() { return super.scene as Level }
	override get parent() { return super.parent as LevelManager }

	private createTankEntity(config: tankConfig) {
		EventCenter.emitter.emit(`${this.scene.scene.key}-${levelEventKeys.ADD_ENTITY_TO_SCENE}`, { key: config.id, entity: this.scene.add.tank(config) });
	}

	initEvents() {
		EventCenter.emitter.on(`${this.scene.scene.key}-${entityEventKeys.CREATE_TANK_ENTITY}`, this.createTankEntity, this);
	}

	shutdown() {
		EventCenter.emitter.off(`${this.scene.scene.key}-${entityEventKeys.CREATE_TANK_ENTITY}`, this.createTankEntity, this);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
