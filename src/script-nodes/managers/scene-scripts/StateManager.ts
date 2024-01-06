
// You can write more code here
export const stateEventKeys = {
	CREATE_TANK_STATE: "create-tank-state",
}

/* START OF COMPILED CODE */

import ScriptNode from "../../../script-nodes-basic/ScriptNode";
import Phaser from "phaser";
/* START-USER-IMPORTS */
import LevelManager from "./LevelManager";
import Level from "../../../scenes/Level";
import { addComponent, addEntity, Component } from "bitecs";
import { entityComponents, stateComponents } from "../../../components";
import { EventCenter } from "../../../utils";
import { entityEventKeys } from "./EntityManager";
import { colorOptions, componentConfig, componentList, tankComponentList, tankConfig, tankOptions, trackOptions } from "../../../../types";
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

	override get scene() { return super.scene as Level }
	override get parent() { return super.parent as LevelManager }

	private addEntity(): number {
		const world = this.scene.getWorld();
		return addEntity(world);
	}

	private addComponents<list extends componentList>(entity: number, componentList: list) {
		const world = this.scene.getWorld();
		for (let i = 0; i < componentList.length; i++) {
			const component = componentList[i].component, values = componentList[i].values
			addComponent(world, component, entity);
			Object.keys(componentList[i].values).forEach((key: string) => {
				(component[key] as Array<number>)[entity] = values[key];
			})
		}
		return entity;
	}

	private createTankState() {
		const entity = this.addComponents<tankComponentList>(this.addEntity(), [
			{
				component: entityComponents.Tank,
				values: {
					color: Phaser.Math.Between(0, 3), 
					hullType: Phaser.Math.Between(1, 16),
					trackType: Phaser.Math.Between(1, 8),
					turretType: Phaser.Math.Between(1, 16),
					barrelType: Phaser.Math.Between(1, 16),
				}
			},
			{
				component: stateComponents.Position,
				values: { x: 100, y: 100 }
			},
			{
				component: stateComponents.Angle,
				values: { angle: 0 }
			}
		]);
		EventCenter.emitter.emit(`${this.scene.scene.key}-${entityEventKeys.CREATE_TANK_ENTITY}`, ({
			id: entity,
			x: stateComponents.Position.x[entity],
			y: stateComponents.Position.y[entity],
			color: entityComponents.Tank.color[entity] as colorOptions,
			hullType: entityComponents.Tank.color[entity] as tankOptions,
			turretType: entityComponents.Tank.turretType[entity] as tankOptions,
			barrelType: entityComponents.Tank.barrelType[entity] as tankOptions,
			trackType: entityComponents.Tank.trackType[entity] as trackOptions,
		}));
	}

	initEvents() {
		EventCenter.emitter.on(`${this.scene.scene.key}-${stateEventKeys.CREATE_TANK_STATE}`, this.createTankState, this);
	}

	shutdown() {
		EventCenter.emitter.off(`${this.scene.scene.key}-${stateEventKeys.CREATE_TANK_STATE}`, this.createTankState, this);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
