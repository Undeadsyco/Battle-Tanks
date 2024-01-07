
// You can write more code here

const systemKeys = {
	render: "render",
	movement: "movement",
} as const;
type systemKeys = keyof typeof systemKeys;
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
import LevelManager from "../script-nodes/managers/scene-scripts/LevelManager";
/* START-USER-IMPORTS */
import { IWorld, System, createWorld } from "bitecs";
import { EventCenter } from "../utils";
import { renderSystem } from "../systems";
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

	private state: levelState = {
		world: createWorld(),
		systems: new Map([
			["render", renderSystem(this)]
		]),
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

	update(time: number, delta: number): void {
		const { systems } = this.state;
		systems.get(systemKeys.render)?.(this.state.world);
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
