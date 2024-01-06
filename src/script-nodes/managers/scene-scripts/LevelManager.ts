
// You can write more code here

/* START OF COMPILED CODE */

import ScriptNode from "../../../script-nodes-basic/ScriptNode";
import Phaser from "phaser";
import StateManager from "./StateManager";
import EntityManager from "./EntityManager";
/* START-USER-IMPORTS */
import Level from "../../../scenes/Level";
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
		this.entityManager.initEvents();
		this.stateManager.initEvents();
	}

	shutdown() {
		this.entityManager.shutdown();
		this.stateManager.shutdown();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
