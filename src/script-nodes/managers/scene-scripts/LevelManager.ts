
// You can write more code here

/* START OF COMPILED CODE */

import ScriptNode from "../../../script-nodes-basic/ScriptNode";
import Phaser from "phaser";
import StateManager from "./StateManager";
import EntityManager from "./EntityManager";
/* START-USER-IMPORTS */
import Level from "../../../scenes/Level";
import { EventCenter } from "../../../utils";
import { levelEventKeys } from "../../../../types/keys/event";
import { systemKeys } from "../../../../types/keys/system";
/* END-USER-IMPORTS */

export default class LevelManager extends ScriptNode {

	constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene) {
		super(parent);

		// stateManager
		const stateManager = new StateManager(this);

		// entityManager
		const entityManager = new EntityManager(this);

		this.stateManager = stateManager;
		this.entityManager = entityManager;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	private stateManager: StateManager;
	private entityManager: EntityManager;

	/* START-USER-CODE */

	// Write your code here.

	override get scene() { return super.scene as Level }
	override get parent() { return super.parent as Level }

	protected override start(): void {
		const { width, height } = this.scene.physics.world.bounds;
		this.stateManager.createSpawnerState({ id: 0, x: width * 0.2, y: height * 0.2, max: Phaser.Math.Between(2, 5), interval: Phaser.Math.Between(2, 5) })
		this.stateManager.createSpawnerState({ id: 1, x: width * 0.8, y: height * 0.8, max: Phaser.Math.Between(2, 5), interval: Phaser.Math.Between(2, 5) })
	}

	protected override update() {
		this.stateManager.systems.get(systemKeys.AI)?.(this.stateManager.world);
		this.stateManager.systems.get(systemKeys.movement)?.(this.stateManager.world);
		this.stateManager.systems.get(systemKeys.render)?.(this.stateManager.world);

		this.entityManager.spawners.forEach((spawner) => spawner.update())
	}

	initEvents() {
		//
		EventCenter.emitter.on(`${this.scene.scene.key}-${levelEventKeys.CREATE_TANK_STATE}`, this.stateManager.createTankState, this.stateManager);
		EventCenter.emitter.on(`${this.scene.scene.key}-${levelEventKeys.ADD_MANY_COMPONENTS}`, this.stateManager.addMultipleComponents, this.stateManager);
		EventCenter.emitter.on(`${this.scene.scene.key}-${levelEventKeys.ADD_ONE_COMPONENT}`, this.stateManager.addOneComponent, this.stateManager);
		EventCenter.emitter.on(`${this.scene.scene.key}-${levelEventKeys.REMOVE_MANY_COMPONENTS}`, this.stateManager.removeMultipleComponents, this.stateManager);
		EventCenter.emitter.on(`${this.scene.scene.key}-${levelEventKeys.REMOVE_ONE_COMPONENT}`, this.stateManager.removeOneComponent, this.stateManager);
		//
		EventCenter.emitter.on(`${this.scene.scene.key}-${levelEventKeys.ADD_TANK_ENTITY}`, this.entityManager.addTank, this.entityManager);
		EventCenter.emitter.on(`${this.scene.scene.key}-${levelEventKeys.ADD_SPAWNER_ENTITY}`, this.entityManager.addSpawner, this.entityManager);
	}

	shutdown() {
		//
		EventCenter.emitter.off(`${this.scene.scene.key}-${levelEventKeys.CREATE_TANK_STATE}`, this.stateManager.createTankState, this.stateManager);
		EventCenter.emitter.off(`${this.scene.scene.key}-${levelEventKeys.ADD_MANY_COMPONENTS}`, this.stateManager.addMultipleComponents, this.stateManager);
		EventCenter.emitter.off(`${this.scene.scene.key}-${levelEventKeys.ADD_ONE_COMPONENT}`, this.stateManager.addOneComponent, this.stateManager);
		EventCenter.emitter.off(`${this.scene.scene.key}-${levelEventKeys.REMOVE_MANY_COMPONENTS}`, this.stateManager.removeMultipleComponents, this.stateManager);
		EventCenter.emitter.off(`${this.scene.scene.key}-${levelEventKeys.REMOVE_ONE_COMPONENT}`, this.stateManager.removeOneComponent, this.stateManager);
		//
		EventCenter.emitter.off(`${this.scene.scene.key}-${levelEventKeys.ADD_TANK_ENTITY}`, this.entityManager.addTank, this.entityManager);
		EventCenter.emitter.off(`${this.scene.scene.key}-${levelEventKeys.ADD_SPAWNER_ENTITY}`, this.entityManager.addSpawner, this.entityManager);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
