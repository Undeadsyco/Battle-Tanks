
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import LevelManager from "../script-nodes/managers/scene-scripts/LevelManager";
/* START-USER-IMPORTS */
import { IWorld, System, createWorld } from "bitecs";
import { EventCenter } from "../utils";
import { AISystem, movementSystem, renderSystem } from "../systems";
import Tank from "../prefabs/tanks/Tank";
import { systemKeys } from "../../types/keys/system";
import { levelEventKeys } from "../../types/keys/event";
/* END-USER-IMPORTS */

export default class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.

		this.initEvents();

		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// levelManager
		const levelManager = new LevelManager(this);

		this.levelManager = levelManager;

		this.events.emit("scene-awake");
	}

	private levelManager!: LevelManager;

	/* START-USER-CODE */

	// Write your code here

	create() {
		this.editorCreate();

		this.initEvents();

		const { cameras: { main }, scale: { width, height, zoom }, physics: { world } } = this;

		main.setZoom(1 / zoom);
		main.setBounds(0, 0, width * zoom, height * zoom);
		world.setBounds(0, 0, width * zoom, height * zoom);
	}

	private initEvents() {
		EventCenter.emitter.on(Phaser.Scenes.Events.SHUTDOWN, this.shutdown, this);
		this.levelManager?.initEvents();
	}

	private shutdown() {
		this.levelManager.shutdown();
		EventCenter.emitter.off(Phaser.Scenes.Events.SHUTDOWN, this.shutdown, this);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
