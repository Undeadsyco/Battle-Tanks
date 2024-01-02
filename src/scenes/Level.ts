
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import { OnAwakeScript } from "@phasereditor2d/scripts-core";
import { MoveInSceneActionScript } from "@phasereditor2d/scripts-simple-animations";
import Tank from "../prefabs/tanks/Tank";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// text
		const text = this.add.text(611, 357, "", {});
		text.setOrigin(0.5, 0.5);
		text.text = "Phaser 3 + Phaser Editor 2D\nWebpack + TypeScript";
		text.setStyle({ "align": "center", "fontFamily": "Arial", "fontSize": "3em" });

		// onAwakeScript
		const onAwakeScript = new OnAwakeScript(text);

		// moveInSceneActionScript
		const moveInSceneActionScript = new MoveInSceneActionScript(onAwakeScript);

		// tank
		const tank = new Tank(this, 383, 128);
		this.add.existing(tank);

		// tank_1
		const tank_1 = new Tank(this, 128, 128);
		this.add.existing(tank_1);

		// tank_2
		const tank_2 = new Tank(this, 1152, 128);
		this.add.existing(tank_2);

		// tank_3
		const tank_3 = new Tank(this, 896, 128);
		this.add.existing(tank_3);

		// tank_4
		const tank_4 = new Tank(this, 638, 128);
		this.add.existing(tank_4);

		// tank_5
		const tank_5 = new Tank(this, 382, 595);
		this.add.existing(tank_5);

		// tank_6
		const tank_6 = new Tank(this, 637, 595);
		this.add.existing(tank_6);

		// tank_7
		const tank_7 = new Tank(this, 895, 595);
		this.add.existing(tank_7);

		// tank_8
		const tank_8 = new Tank(this, 1151, 595);
		this.add.existing(tank_8);

		// tank_9
		const tank_9 = new Tank(this, 127, 595);
		this.add.existing(tank_9);

		// moveInSceneActionScript (prefab fields)
		moveInSceneActionScript.from = "BOTTOM";

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
