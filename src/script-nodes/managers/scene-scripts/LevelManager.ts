
// You can write more code here

/* START OF COMPILED CODE */

import ScriptNode from "../../../script-nodes-basic/ScriptNode";
import Phaser from "phaser";
import StateManager from "./StateManager";
import EntityManager from "./EntityManager";
/* START-USER-IMPORTS */
import Level from "../../../scenes/Level";
import { EventCenter } from "../../../utils";
import { entityEventKeys, stateEventKeys } from "../../../../types/keys/event";
/* END-USER-IMPORTS */

export default class LevelManager extends ScriptNode {

	constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene) {
		super(parent);

		// stateManager
		const stateManager = new StateManager(this);

		// entityManager
		const entityManager = new EntityManager(this);

		this.stateManager = stateManager;
		this.entityManager = entityManager;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	private stateManager: StateManager;
	private entityManager: EntityManager;

	/* START-USER-CODE */

	// Write your code here.

	override get scene() { return super.scene as Level }
	override get parent() { return super.parent as Level }

	initEvents() {
		//
		EventCenter.emitter.on(`${this.scene.scene.key}-${stateEventKeys.CREATE_TANK_STATE}`, this.stateManager.createTankState, this.stateManager);
		EventCenter.emitter.on(`${this.scene.scene.key}-${stateEventKeys.ADD_MANY_COMPONENTS}`, this.stateManager.addMultipleComponents, this.stateManager);
		EventCenter.emitter.on(`${this.scene.scene.key}-${stateEventKeys.ADD_ONE_COMPONENT}`, this.stateManager.addOneComponent, this.stateManager);
		EventCenter.emitter.on(`${this.scene.scene.key}-${stateEventKeys.REMOVE_MANY_COMPONENTS}`, this.stateManager.removeMultipleComponents, this.stateManager);
		EventCenter.emitter.on(`${this.scene.scene.key}-${stateEventKeys.REMOVE_ONE_COMPONENT}`, this.stateManager.removeOneComponent, this.stateManager);
		//
		EventCenter.emitter.on(`${this.scene.scene.key}-${entityEventKeys.CREATE_TANK_ENTITY}`, this.entityManager.createTankEntity, this.entityManager);
	}

	shutdown() {
		//
		EventCenter.emitter.off(`${this.scene.scene.key}-${stateEventKeys.CREATE_TANK_STATE}`, this.stateManager.createTankState, this.stateManager);
		EventCenter.emitter.off(`${this.scene.scene.key}-${stateEventKeys.ADD_MANY_COMPONENTS}`, this.stateManager.addMultipleComponents, this.stateManager);
		EventCenter.emitter.off(`${this.scene.scene.key}-${stateEventKeys.ADD_ONE_COMPONENT}`, this.stateManager.addOneComponent, this.stateManager);
		EventCenter.emitter.off(`${this.scene.scene.key}-${stateEventKeys.REMOVE_MANY_COMPONENTS}`, this.stateManager.removeMultipleComponents, this.stateManager);
		EventCenter.emitter.off(`${this.scene.scene.key}-${stateEventKeys.REMOVE_ONE_COMPONENT}`, this.stateManager.removeOneComponent, this.stateManager);
		//
		EventCenter.emitter.off(`${this.scene.scene.key}-${entityEventKeys.CREATE_TANK_ENTITY}`, this.entityManager.createTankEntity, this.entityManager);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
