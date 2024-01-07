
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
import { addComponent, addEntity, Component, ComponentType, ISchema } from "bitecs";
import { entityComponents, stateComponents, updateComponents } from "../../../components";
import { EventCenter } from "../../../utils";
import { componentList, optionalTankConfig, tankComponentList } from "../../../../types";
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
			const { component, values } = componentList[i];
			addComponent(world, component, entity);
			Object.keys(componentList[i].values).forEach((key: string) => {
				(component[key] as Array<number>)[entity] = values[key];
			})
		}
		return entity;
	}

	private createTankState(config: optionalTankConfig): number {
		return this.addComponents<tankComponentList>(this.addEntity(), [
			{
				component: entityComponents.Tank,
				values: {
					color: config.color ?? Phaser.Math.Between(0, 3),
					hullType: config.hullType ?? Phaser.Math.Between(1, 16),
					trackType: config.trackType ?? Phaser.Math.Between(1, 8),
					turretType: config.turretType ?? Phaser.Math.Between(1, 16),
					barrelType: config.barrelType ?? Phaser.Math.Between(1, 16),
				}
			},
			{
				component: stateComponents.Position,
				values: { x: config.x ?? 100, y: config.y ?? 100 }
			},
			{
				component: stateComponents.Angle,
				values: { angle: config.angle ?? 0 }
			},
		]);
	}

	protected override start(): void {
		const entity = this.createTankState({ x: 200, y: 200, color: 2, hullType: 1, turretType: 1, barrelType: 1, trackType: 1, angle: 180 });
		addComponent(this.scene.getWorld(), updateComponents.Velocity, entity);
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
