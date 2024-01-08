
// You can write more code here

const systemKeys = {
	render: "render",
	movement: "movement",
	AI: "AI"
} as const;
type systemKeys = keyof typeof systemKeys;
type levelState = {
	world: IWorld;
	systems: Map<systemKeys, System>;
	entities: Map<number, Tank>;
}

export const levelEventKeys = {
	ADD_ENTITY_TO_SCENE: "add-entity-to-scene",
}

/* START OF COMPILED CODE */

import Phaser from "phaser";
import LevelManager from "../script-nodes/managers/scene-scripts/LevelManager";
/* START-USER-IMPORTS */
import { IWorld, System, createWorld } from "bitecs";
import { EventCenter } from "../utils";
import { AISystem, movementSystem, renderSystem } from "../systems";
import Tank from "../prefabs/tanks/Tank";
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
			[systemKeys.render, renderSystem(this)], [systemKeys.movement, movementSystem(this)], [systemKeys.AI, AISystem(this)],
		]),
		entities: new Map(),
	}

	getWorld(): IWorld { return this.state.world }
	getSystems(): Map<systemKeys, System> { return this.state.systems }
	getEntities(): Map<number, Tank> { return this.state.entities }
	getEntity(key: number): Tank | undefined { return this.state.entities.get(key); }

	create() {
		this.editorCreate();

		this.initEvents();

		const { cameras: { main }, scale: { width, height, zoom }, physics: { world } } = this;

		main.setZoom(1 / zoom);
		main.setBounds(0, 0, width * zoom, height * zoom);
		world.setBounds(0, 0, width * zoom, height * zoom);
	}

	update(time: number, delta: number): void {
		const { systems } = this.state;
		systems.get(systemKeys.AI)?.(this.state.world);
		systems.get(systemKeys.movement)?.(this.state.world);
		systems.get(systemKeys.render)?.(this.state.world);
	}

	private addEntity({ key, entity }: { key: number, entity: Tank }) {
		this.state.entities.set(key, entity);
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
