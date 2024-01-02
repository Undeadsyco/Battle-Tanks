
// You can write more code here
import type { hullChildren } from './components/Hull';
import type { turretChildren } from './components/Turret';

export type tankChildren = {
	hull: Hull|hullChildren;
	turret: Turret|turretChildren;
}

/* START OF COMPILED CODE */

import Phaser from "phaser";
import Hull from "./components/Hull";
import Turret from "./components/Turret";
import TankTextureManagerScript from "../../script-nodes/managers/TankTextureManagerScript";
/* START-USER-IMPORTS */
import { colorOptions, tankOptions, trackRange } from '../../../types';
/* END-USER-IMPORTS */

export default class Tank extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 0);

		// hull
		const hull = new Hull(scene, 0, 0);
		this.add(hull);

		// turret
		const turret = new Turret(scene, -2, 49);
		this.add(turret);

		// textureManager
		const textureManager = new TankTextureManagerScript(this);

		this.hull = hull;
		this.turret = turret;
		this.textureManager = textureManager;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */

		// custom definition props
		this.color = 0;
		this.trackType = 1;
		this.hullType = 1;
		this.turretType = 1;
		this.barrelType = 1;
	}

	private hull: Hull;
	private turret: Turret;
	private textureManager: TankTextureManagerScript;

	/* START-USER-CODE */

	// Write your code here.

	private _color!: colorOptions;
	get color(): colorOptions { return this._color; }
	set color(val: colorOptions) { this._color = val; }

	private _hullType!: tankOptions;
	get hullType(): tankOptions { return this._hullType; }
	set hullType(val: tankOptions) { this._hullType = val; }

	private _turretType!: tankOptions;
	get turretType(): tankOptions { return this._turretType; }
	set turretType(val: tankOptions) { this._turretType = val; }

	private _barrelType!: tankOptions;
	get barrelType(): tankOptions { return this._barrelType; }
	set barrelType(val: tankOptions) { this._barrelType = val; }

	private _trackType!: trackRange;
	get trackType(): trackRange { return this._trackType; }
	set trackType(val: trackRange) { this._trackType = val; }

	get children(): tankChildren {
		return ({
			hull: this.hull,
			turret: this.turret,
		});
	}

	expandChildren(): tankChildren {
		return ({
			hull: this.hull.children,
			turret: this.turret.children
		});
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
