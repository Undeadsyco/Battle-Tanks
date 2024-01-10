
// You can write more code here

/* START OF COMPILED CODE */

import ScriptNode from "../../../script-nodes-basic/ScriptNode";
import Phaser from "phaser";
/* START-USER-IMPORTS */
import Tank from "../../../prefabs/tanks/Tank";
import { EventCenter } from "../../../utils";
import { tankEventKeys } from "../../../../types/keys/event";
/* END-USER-IMPORTS */

export default class TankEventManagerScript extends ScriptNode {

	constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene) {
		super(parent);

		/* START-USER-CTR-CODE */
		// Write your code here.

		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.

	override get parent(): Tank {
		return super.parent as Tank;
	}

	override get gameObject(): Tank {
		return super.gameObject as Tank;
	}

	protected start() {
		EventCenter.emitter.on(`${tankEventKeys.UPDATE_TANK_POSITION}-${this.gameObject.id}`, this.gameObject.setPosition, this.gameObject);
		EventCenter.emitter.on(`${tankEventKeys.UPDATE_TANK_ANGLE}-${this.gameObject.id}`, this.gameObject.setAngle, this.gameObject);
	}

	protected destroy(): void {
		EventCenter.emitter.off(`${tankEventKeys.UPDATE_TANK_POSITION}-${this.gameObject.id}`, this.gameObject.setPosition, this.gameObject);
		EventCenter.emitter.off(`${tankEventKeys.UPDATE_TANK_ANGLE}-${this.gameObject.id}`, this.gameObject.setAngle, this.gameObject);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
