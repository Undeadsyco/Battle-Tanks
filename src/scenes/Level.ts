
// You can write more code here

type systemKeys = ("render" | "movement")
type levelState = {
	world: IWorld;
	systems: Map<systemKeys, System>;
	entities: Phaser.GameObjects.GameObject[];
}

const levelEventKeys = {
	ADD_ENTITY_TO_SCENE: "add-entity-to-scene",
}

/* START OF COMPILED CODE */

import Phaser from "phaser";
import Tank from "../prefabs/tanks/Tank";
import LevelManager from "../script-nodes/managers/scene-scripts/LevelManager";
/* START-USER-IMPORTS */
import { IWorld, System, createWorld } from "bitecs";
import { EventCenter } from "../utils";
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

		// tank
		const tank = new Tank(this, 1019, 140);
		this.add.existing(tank);

		// levelManager
		const levelManager = new LevelManager(this);

		this.levelManager = levelManager;

		this.events.emit("scene-awake");
	}

	private levelManager!: LevelManager;

	/* START-USER-CODE */

	// Write your code here

	private state: levelState = {
		world: createWorld(),
		systems: new Map(),
		entities: [],
	}

	getWorld() { return this.state.world }
	getSystems() { return this.state.systems }
	getEntities() { return this.state.entities }

	create() {
		this.editorCreate();
		
		this.initEvents();
		
		this.cameras.main.setZoom(1 / this.scale.zoom);
	}

	private addEntity(entity: Phaser.GameObjects.GameObject) {
		this.state.entities.push(entity);
	}

	private initEvents() {
		EventCenter.emitter.on(`${this.scene?.key}-${levelEventKeys.ADD_ENTITY_TO_SCENE}`, this.addEntity, this);
		EventCenter.emitter.on(Phaser.Scenes.Events.SHUTDOWN, this.shutdown, this);
		this.levelManager?.initEvents();
	}

	private shutdown() {
		this.levelManager.shutdown();
		EventCenter.emitter.on(`${this.scene.key}-${levelEventKeys.ADD_ENTITY_TO_SCENE}`, this.addEntity, this);
		EventCenter.emitter.off(Phaser.Scenes.Events.SHUTDOWN, this.shutdown, this);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
