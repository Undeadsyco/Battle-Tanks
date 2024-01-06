
// You can write more code here
const trackPos = new Map<tankOptions, number>([
	[1, 80], [2, 80], [3, 60], [4, 55], [5, 75], [6, 75], [7, 70], [8, 60], [9, 70], [10, 70], [11, 60], [12, 35], [13, 55], [14, 70], [15, 60], [16, 40]
]);
const turretPos = new Map<tankOptions, number>([
	[1, 48], [2, 24], [3, 32], [4, 40], [5, 24], [6, 20], [7, 24], [8, 24], [9, 24], [10, 32], [11, 28], [12, 40], [13, 30], [14, 24], [15, 24], [16, 20]
]);

/* START OF COMPILED CODE */

import ScriptNode from "../../../script-nodes-basic/ScriptNode";
import Phaser from "phaser";
/* START-USER-IMPORTS */
import Tank from "../../../prefabs/tanks/Tank";
import { colorOptions, tankColors, tankOptions, trackOptions, vector } from "../../../../types";
import { tankKeys } from "../../../../types/keys/tanks";
import Hull from "../../../prefabs/tanks/components/Hull";
import Turret from "../../../prefabs/tanks/components/Turret";
/* END-USER-IMPORTS */

export default class TankTextureManagerScript extends ScriptNode {

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

	protected override start(): void {
		this.setTexture();
	}

	setTexture() {
		const { hull, turret } = this.gameObject.children;

		this.setHull(hull as Hull, turret as Turret);
		this.setTurret((turret as Turret));

		(turret as Turret).setPosition(0, turretPos.get(this.gameObject.hullType));
	}

	private setHull(hull: Hull, turret: Turret) {
		const { base, tracks: { left, right } } = hull.children;
		let key!: string;
		let frame!: string;
		switch (this.gameObject.color) {
			case tankColors.BLUE: { key = tankKeys.hull.keys[tankColors.BLUE]; break; }
			case tankColors.BROWN: { key = tankKeys.hull.keys[tankColors.BROWN]; break; }
			case tankColors.CYAN: { key = tankKeys.hull.keys[tankColors.CYAN]; break; }
			case tankColors.GREEN: { key = tankKeys.hull.keys[tankColors.GREEN]; break; }
		}
		switch (this.gameObject.hullType) {
			case 16: { frame = tankKeys.hull.frames[16]; break; }
			case 15: { frame = tankKeys.hull.frames[15]; break; }
			case 14: { frame = tankKeys.hull.frames[14]; break; }
			case 13: { frame = tankKeys.hull.frames[13]; break; }
			case 12: { frame = tankKeys.hull.frames[12]; break; }
			case 11: { frame = tankKeys.hull.frames[11]; break; }
			case 10: { frame = tankKeys.hull.frames[10]; break; }
			case 9: { frame = tankKeys.hull.frames[9]; break; }
			case 8: { frame = tankKeys.hull.frames[8]; break; }
			case 7: { frame = tankKeys.hull.frames[7]; break; }
			case 5: { frame = tankKeys.hull.frames[6]; break; }
			case 6: { frame = tankKeys.hull.frames[5]; break; }
			case 4: { frame = tankKeys.hull.frames[4]; break; }
			case 3: { frame = tankKeys.hull.frames[3]; break; }
			case 2: { frame = tankKeys.hull.frames[2]; break; }
			case 1: { frame = tankKeys.hull.frames[1]; break; }
		}
		let trackKey!: string;
		let trackFrame!: string;
		switch (this.gameObject.trackType) {
			case 8: {
				trackKey = tankKeys.tracks[8].key;
				trackFrame = tankKeys.tracks[8].frames[1];
				break;
			}
			case 7: {
				trackKey = tankKeys.tracks[7].key;
				trackFrame = tankKeys.tracks[7].frames[1];
				break;
			}
			case 5: {
				trackKey = tankKeys.tracks[6].key;
				trackFrame = tankKeys.tracks[6].frames[1];
				break;
			}
			case 6: {
				trackKey = tankKeys.tracks[5].key;
				trackFrame = tankKeys.tracks[5].frames[1];
				break;
			}
			case 4: {
				trackKey = tankKeys.tracks[4].key;
				trackFrame = tankKeys.tracks[4].frames[1];
				break;
			}
			case 3: {
				trackKey = tankKeys.tracks[3].key;
				trackFrame = tankKeys.tracks[3].frames[1];
				break;
			}
			case 2: {
				trackKey = tankKeys.tracks[2].key;
				trackFrame = tankKeys.tracks[2].frames[1];
				break;
			}
			case 1: {
				trackKey = tankKeys.tracks[1].key;
				trackFrame = tankKeys.tracks[1].frames[1];
				break;
			}
		}

		base.setTexture(key, frame);

		const x = trackPos.get(this.gameObject.hullType)!;
		left.setTexture(trackKey, trackFrame).setPosition(x, 0);
		right.setTexture(trackKey, trackFrame).setPosition(-x, 0);
	}

	private setTurret(turret: Turret) {
		const { base, barrel } = turret.children
		let turretKey!: string;
		let turretFrame!: string;
		let barrelFrame!: string;
		switch (this.gameObject.color) {
			case tankColors.BLUE: { turretKey = tankKeys.turret.keys[tankColors.BLUE]; break; }
			case tankColors.BROWN: { turretKey = tankKeys.turret.keys[tankColors.BROWN]; break; }
			case tankColors.CYAN: { turretKey = tankKeys.turret.keys[tankColors.CYAN]; break; }
			case tankColors.GREEN: { turretKey = tankKeys.turret.keys[tankColors.GREEN]; break; }
		}
		switch (this.gameObject.turretType) {
			case 16: { turretFrame = tankKeys.turret.frames[16]; break; }
			case 15: { turretFrame = tankKeys.turret.frames[15]; break; }
			case 14: { turretFrame = tankKeys.turret.frames[14]; break; }
			case 13: { turretFrame = tankKeys.turret.frames[13]; break; }
			case 12: { turretFrame = tankKeys.turret.frames[12]; break; }
			case 11: { turretFrame = tankKeys.turret.frames[11]; break; }
			case 10: { turretFrame = tankKeys.turret.frames[10]; break; }
			case 9: { turretFrame = tankKeys.turret.frames[9]; break; }
			case 8: { turretFrame = tankKeys.turret.frames[8]; break; }
			case 7: { turretFrame = tankKeys.turret.frames[7]; break; }
			case 5: { turretFrame = tankKeys.turret.frames[6]; break; }
			case 6: { turretFrame = tankKeys.turret.frames[5]; break; }
			case 4: { turretFrame = tankKeys.turret.frames[4]; break; }
			case 3: { turretFrame = tankKeys.turret.frames[3]; break; }
			case 2: { turretFrame = tankKeys.turret.frames[2]; break; }
			case 1: { turretFrame = tankKeys.turret.frames[1]; break; }
		}
		switch (this.gameObject.barrelType) {
			case 16: {
				switch (this.gameObject.color) {
					case tankColors.BLUE: { barrelFrame = tankKeys.barrel.frames[16][tankColors.BLUE]; break; }
					case tankColors.BROWN: { barrelFrame = tankKeys.barrel.frames[16][tankColors.BROWN]; break; }
					case tankColors.CYAN: { barrelFrame = tankKeys.barrel.frames[16][tankColors.CYAN]; break; }
					case tankColors.GREEN: { barrelFrame = tankKeys.barrel.frames[16][tankColors.GREEN]; break; }
				}
			}
			case 15: { barrelFrame = tankKeys.barrel.frames[15]; break; }
			case 14: { barrelFrame = tankKeys.barrel.frames[14]; break; }
			case 13: { barrelFrame = tankKeys.barrel.frames[13]; break; }
			case 12: { barrelFrame = tankKeys.barrel.frames[12]; break; }
			case 11: { barrelFrame = tankKeys.barrel.frames[11]; break; }
			case 10: { barrelFrame = tankKeys.barrel.frames[10]; break; }
			case 9: { barrelFrame = tankKeys.barrel.frames[9]; break; }
			case 8: { barrelFrame = tankKeys.barrel.frames[8]; break; }
			case 7: { barrelFrame = tankKeys.barrel.frames[7]; break; }
			case 5: { barrelFrame = tankKeys.barrel.frames[6]; break; }
			case 6: { barrelFrame = tankKeys.barrel.frames[5]; break; }
			case 4: { barrelFrame = tankKeys.barrel.frames[4]; break; }
			case 3: { barrelFrame = tankKeys.barrel.frames[3]; break; }
			case 2: { barrelFrame = tankKeys.barrel.frames[2]; break; }
			case 1: { barrelFrame = tankKeys.barrel.frames[1]; break; }
		}

		base.setTexture(turretKey, turretFrame);
		barrel.setTexture(tankKeys.barrel.key, barrelFrame);
		barrel.setPosition(base.x, base.y - (base.height / 2 - 5));
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
