
// You can write more code here

/* START OF COMPILED CODE */

import ScriptNode from "../../../script-nodes-basic/ScriptNode";
import Phaser from "phaser";
/* START-USER-IMPORTS */
import LevelManager from "./LevelManager";
import Level from "../../../scenes/Level";
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

	private _spawners = new Map();
	get spawners() { return this._spawners; }

	private _tanks = new Map();
	get tanks() { return this._tanks }

	override get scene() { return super.scene as Level }
	override get parent() { return super.parent as LevelManager }

	createSpawner() {

	}

	addSpawner(config: BattleTanks.Types.GameObjects.Spawner.config) {
		this._spawners.set(config.id, this.scene.add.spawner(config))
	}

	addTank(tank: BattleTanks.GameObjects.Tank.ITank) {
		this._tanks.set(tank.id, tank);
	}

	protected update(): void {
		this._tanks.forEach(tank => tank.update());
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
