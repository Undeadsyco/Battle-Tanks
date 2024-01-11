
// You can write more code here

/* START OF COMPILED CODE */

import ScriptNode from "../../../script-nodes-basic/ScriptNode";
import Phaser from "phaser";
/* START-USER-IMPORTS */
// Parent GameObject
import Spawner from "../../../prefabs/spawners/Spawner";
import { EventCenter } from "../../../utils";
/* END-USER-IMPORTS */

export default class SpawnerEventManagerScript extends ScriptNode {

	constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene) {
		super(parent);

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.

	override get parent() { return super.parent as Spawner; }
	override get gameObject() { return super.gameObject as Spawner; }

	protected override start(): void {
		EventCenter.emitter.on(`spawner-${this.gameObject.id}-create-state`, this.gameObject.createState, this.gameObject);
		EventCenter.emitter.on(`spawner-${this.gameObject.id}-create-object`, this.gameObject.createEntity, this.gameObject);
	}

	protected override destroy() {
		EventCenter.emitter.off(`${this.gameObject.id}-create-state`, this.gameObject.createState, this.gameObject);
		EventCenter.emitter.off(`${this.gameObject.id}-create-object`, this.gameObject.createEntity, this.gameObject);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
