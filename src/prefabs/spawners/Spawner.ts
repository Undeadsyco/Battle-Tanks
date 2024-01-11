
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import SpawnerEventManagerScript from "../../script-nodes/managers/gameobject-scripts/SpawnerEventManagerScript";
/* START-USER-IMPORTS */
import Tank from "../tanks/Tank";
import { EventCenter } from "../../utils";
import { levelEventKeys } from "../../../types/keys/event";
/* END-USER-IMPORTS */

export default class Spawner extends Phaser.GameObjects.Rectangle {

	constructor(scene: Phaser.Scene, x?: number, y?: number, width?: number, height?: number) {
		super(scene, x ?? 0, y ?? 0, width ?? 256, height ?? 256);

		this.isStroked = true;
		this.lineWidth = 5;

		// spawnerEventManagerScript
		new SpawnerEventManagerScript(this);

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.

	private _id!: number;
	get id() { return this._id; }

	private _max: number = 5;
	private _active: number = 0;
	private objects!: Phaser.GameObjects.Group;

	init(id: number, max?: number, interval?: number): this {
		this._id = id;
		this.objects = this.scene.add.group()
		if (max) this._max = max;
		return this;
	}

	createState(): void {
		if (this._active < this._max) {
			EventCenter.emitter.emit(`${this.scene.scene.key}-${levelEventKeys.CREATE_TANK_STATE}`, {
				x: Phaser.Math.Between(this.x - this.width * 2, this.x + this.width * 2),
				y: Phaser.Math.Between(this.y - this.height * 2, this.y + this.height * 2),
				spawner: this._id,
				color: Phaser.Math.Between(0, 3) as BattleTanks.Types.GameObjects.Tank.colorOptions,
				hullType: Phaser.Math.Between(1, 16) as BattleTanks.Types.GameObjects.Tank.tankOptions,
				turretType: Phaser.Math.Between(1, 16) as BattleTanks.Types.GameObjects.Tank.tankOptions,
				barrelType: Phaser.Math.Between(1, 16) as BattleTanks.Types.GameObjects.Tank.tankOptions,
				trackType: Phaser.Math.Between(1, 8) as BattleTanks.Types.GameObjects.Tank.trackOptions,
				angle: Phaser.Math.Between(-180, 180),
			});
			this._active += 1;
		}
	}

	createEntity(config: BattleTanks.Types.GameObjects.Tank.config) {
		const tank = this.scene.add.tank(config);
		this.objects.add(tank);
    EventCenter.emitter.emit(`${this.scene.scene.key}-${levelEventKeys.ADD_TANK_ENTITY}`, tank);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
