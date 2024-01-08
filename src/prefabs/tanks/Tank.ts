
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import Hull from "./components/Hull";
import Turret from "./components/Turret";
import TankTextureManagerScript from "../../script-nodes/managers/gameobject-scripts/TankTextureManagerScript";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Tank extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 0);

		// hull
		const hull = new Hull(scene, 0, 0);
		this.add(hull);

		// turret
		const turret = new Turret(scene, 0, 48);
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

	private _id!: number;
	get id(): number { return this._id; }
	set id(val: number) { this._id = val; }

	private _color!: BattleTanks.Types.GameObjects.Tank.colorOptions;
	get color(): BattleTanks.Types.GameObjects.Tank.colorOptions { return this._color; }
	set color(val: BattleTanks.Types.GameObjects.Tank.colorOptions) {
		this._color = val;
		this.textureManager.setTexture();
	}

	private _hullType!: BattleTanks.Types.GameObjects.Tank.tankOptions;
	get hullType(): BattleTanks.Types.GameObjects.Tank.tankOptions { return this._hullType; }
	set hullType(val: BattleTanks.Types.GameObjects.Tank.tankOptions) {
		this._hullType = val;
		this.textureManager.setTexture();
	}

	private _turretType!: BattleTanks.Types.GameObjects.Tank.tankOptions;
	get turretType(): BattleTanks.Types.GameObjects.Tank.tankOptions { return this._turretType; }
	set turretType(val: BattleTanks.Types.GameObjects.Tank.tankOptions) {
		this._turretType = val;
		this.textureManager.setTexture();
	}

	private _barrelType!: BattleTanks.Types.GameObjects.Tank.tankOptions;
	get barrelType(): BattleTanks.Types.GameObjects.Tank.tankOptions { return this._barrelType; }
	set barrelType(val: BattleTanks.Types.GameObjects.Tank.tankOptions) {
		this._barrelType = val;
		this.textureManager.setTexture();
	}

	private _trackType!: BattleTanks.Types.GameObjects.Tank.trackOptions;
	get trackType(): BattleTanks.Types.GameObjects.Tank.trackOptions { return this._trackType; }
	set trackType(val: BattleTanks.Types.GameObjects.Tank.trackOptions) {
		this._trackType = val;
		this.textureManager.setTexture();
	}

	get children(): BattleTanks.Types.GameObjects.Tank.tankChildren {
		return ({
			hull: this.hull,
			turret: this.turret,
		});
	}

	init(config: BattleTanks.Types.GameObjects.Tank.tankConfig): this {
		const { id, angle, color, hullType, trackType, turretType, barrelType } = config;
		this._id = id;
		this._color = color;
		this._hullType = hullType;
		this._trackType = trackType;
		this._turretType = turretType;
		this._barrelType = barrelType;
		return this;
	}

	expandChildren(): BattleTanks.Types.GameObjects.Tank.tankChildren {
		return ({
			hull: this.hull.children,
			turret: this.turret.children
		});
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
