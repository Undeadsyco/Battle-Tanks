
// You can write more code here

/* START OF COMPILED CODE */

import ScriptNode from "../../../script-nodes-basic/ScriptNode";
import Phaser from "phaser";
/* START-USER-IMPORTS */
// dependencies
import { IWorld, addComponent, addEntity, createWorld, removeComponent } from "bitecs";
// Scene & Managers
import Level from "../../../scenes/Level";
import LevelManager from "./LevelManager";
// ECS Components & Systems
import { entityComponents, stateComponents, AIComponents } from "../../../components";
import { AISystem, movementSystem, renderSystem } from "../../../systems";
// Types & Keys
import { systemKeys } from "../../../../types/keys/system";
/* END-USER-IMPORTS */

export default class StateManager extends ScriptNode {

	constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene) {
		super(parent);

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.

	private _world: IWorld = createWorld();
	get world() { return this._world; }

	private _systems: BattleTanks.Types.Scenes.systemMap = new Map([
		[systemKeys.render, renderSystem(this.scene)], [systemKeys.movement, movementSystem(this.scene)], [systemKeys.AI, AISystem(this.scene)],
	]);
	get systems() { return this._systems; }

	override get scene() { return super.scene as Level }
	override get parent() { return super.parent as LevelManager }

	addOneComponent({ entity, obj }: { entity: number, obj: BattleTanks.Types.Components.componentConfig }) {
		const { component, values } = obj;
		addComponent(this._world, component, entity);
		if (values) Object.keys(values).forEach((key: string) => (component[key] as Array<number>)[entity] = values[key]);
	}

	addMultipleComponents<list extends BattleTanks.Types.Components.componentList>({ entity, list }: { entity: number, list: list }) {
		list.forEach(obj => this.addOneComponent({ entity, obj }));
	}

	removeOneComponent({ entity, obj }: { entity: number, obj: BattleTanks.Types.Components.componentConfig }) {
		const { component } = obj;
		removeComponent(this._world, component, entity)
	}

	removeMultipleComponents({ entity, list }: { entity: number, list: BattleTanks.Types.Components.componentList }) {
		list.forEach((obj) => this.removeOneComponent({ entity, obj }))
	}

	createTankState(config: BattleTanks.Types.GameObjects.Tank.config) {
		const entity = addEntity(this._world)
		this.addMultipleComponents<BattleTanks.Types.Components.tankComponentList>({
			entity,
			list: [
				{
					component: entityComponents.Tank,
					values: {
						id: entity,
						spawner: config.spawner!,
						color: config.color,
						hullType: config.hullType,
						trackType: config.trackType,
						turretType: config.turretType,
						barrelType: config.barrelType,
					}
				},
				{
					component: stateComponents.Position,
					values: { x: config.x!, y: config.y! }
				},
				{
					component: stateComponents.Angle,
					values: { current: config.angle!, target: config.angle! }
				},
				{
					component: AIComponents.CPU,
					values: { timer: 0, interval: 1 }
				}
			]
		});
	}

	createSpawnerState(config: BattleTanks.Types.GameObjects.Spawner.config) {
		const entity = addEntity(this._world);
		this.addMultipleComponents<BattleTanks.Types.Components.spawnerComponentList>({
			entity,
			list: [
				{
					component: entityComponents.Spawner,
					values: {
						id: entity,
						active: 0,
						max: config.max ?? 2,
					}
				},
				{
					component: stateComponents.Position,
					values: { x: config.x, y: config.y }
				},
				{
					component: AIComponents.CPU,
					values: { timer: 0, interval: config.interval ?? Phaser.Math.Between(2, 5) }
				}
			]
		});
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
