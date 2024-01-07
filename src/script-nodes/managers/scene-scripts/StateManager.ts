
// You can write more code here
export const stateEventKeys = {
	ADD_COMPONENT: "add-component",
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
import { colorOptions, componentList, optionalTankConfig, tankComponentList, tankOptions, trackOptions } from "../../../../types";
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

	private addComponents<list extends componentList>({ entity, list }: { entity: number, list: list }) {
		const world = this.scene.getWorld();
		for (let i = 0; i < list.length; i++) {
			const { component, values } = list[i];
			addComponent(world, component, entity);
			if (values) Object.keys(values).forEach((key: string) => {
				(component[key] as Array<number>)[entity] = values[key];
			});
		}
		return entity;
	}

	private createTankState(config: optionalTankConfig): number {
		return this.addComponents<tankComponentList>({
			entity: this.addEntity(),
			list: [
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
					values: { current: config.angle ?? 0, target: config.angle ?? 0 }
				},
			]
		});
	}

	protected override start(): void {
		const { physics: { world: { bounds: { width, height } } } } = this.scene;
		for (let i = 0; i < 1; i++) {
			addComponent(this.scene.getWorld(), updateComponents.Velocity, this.createTankState({
				x: Phaser.Math.Between(width * 0.1, width * 0.9),
				y: Phaser.Math.Between(height * 0.1, height * 0.9),
				color: Phaser.Math.Between(0, 3) as colorOptions,
				hullType: Phaser.Math.Between(1, 16) as tankOptions,
				turretType: Phaser.Math.Between(1, 16) as tankOptions,
				barrelType: Phaser.Math.Between(1, 16) as tankOptions,
				trackType: Phaser.Math.Between(1, 8) as trackOptions,
				angle: Phaser.Math.Between(-45, 45) * 2,
			}));
		}
	}

	initEvents() {
		EventCenter.emitter.on(`${this.scene.scene.key}-${stateEventKeys.CREATE_TANK_STATE}`, this.createTankState, this);
		EventCenter.emitter.on(`${this.scene.scene.key}-${stateEventKeys.ADD_COMPONENT}`, this.addComponents, this);
	}

	shutdown() {
		EventCenter.emitter.off(`${this.scene.scene.key}-${stateEventKeys.CREATE_TANK_STATE}`, this.createTankState, this);
		EventCenter.emitter.off(`${this.scene.scene.key}-${stateEventKeys.ADD_COMPONENT}`, this.addComponents, this);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
