
// You can write more code here

/* START OF COMPILED CODE */

import ScriptNode from "../../../script-nodes-basic/ScriptNode";
import Phaser from "phaser";
/* START-USER-IMPORTS */
import LevelManager from "./LevelManager";
import Level from "../../../scenes/Level";
import { addComponent, addEntity, removeComponent } from "bitecs";
import { entityComponents, stateComponents, AIComponents } from "../../../components";
import { EventCenter } from "../../../utils";
import { stateEventKeys } from "../../../../types/keys/event";
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

	private addOneComponent({ entity, obj }: { entity: number, obj: BattleTanks.Types.Components.componentConfig }) {
		const { component, values } = obj;

		addComponent(this.scene.getWorld(), component, entity);
		if (values) Object.keys(values).forEach((key: string) => {
			(component[key] as Array<number>)[entity] = values[key];
		});
	}

	private addMultipleComponents<list extends BattleTanks.Types.Components.componentList>({ entity, list }: { entity: number, list: list }) {
		for (let i = 0; i < list.length; i++) {
			this.addOneComponent({ entity, obj: list[i] });
		}
		return entity;
	}

	private removeOneComponent({ entity, obj }: { entity: number, obj: BattleTanks.Types.Components.componentConfig }) {
		const { component } = obj;
		removeComponent(this.scene.getWorld(), component, entity)
	}

	private removeMultipleComponents({ entity, list }: { entity: number, list: BattleTanks.Types.Components.componentList }) {
		list.forEach((obj) => {
			this.removeOneComponent({entity, obj })
		})
	}

	private createTankState(config: BattleTanks.Types.GameObjects.Tank.optionalTankConfig): number {
		return this.addMultipleComponents<BattleTanks.Types.Components.tankComponentList>({
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
				{
					component: AIComponents.CPU,
					values: { timer: 0, interval: 1000 }
				}
			]
		});
	}

	protected override start(): void {
		const { physics: { world: { bounds: { width, height } } } } = this.scene;
		for (let i = 0; i < 1; i++) {
			this.createTankState({
				x: Phaser.Math.Between(width * 0.1, width * 0.9),
				y: Phaser.Math.Between(height * 0.1, height * 0.9),
				color: Phaser.Math.Between(0, 3) as BattleTanks.Types.GameObjects.Tank.colorOptions,
				hullType: Phaser.Math.Between(1, 16) as BattleTanks.Types.GameObjects.Tank.tankOptions,
				turretType: Phaser.Math.Between(1, 16) as BattleTanks.Types.GameObjects.Tank.tankOptions,
				barrelType: Phaser.Math.Between(1, 16) as BattleTanks.Types.GameObjects.Tank.tankOptions,
				trackType: Phaser.Math.Between(1, 8) as BattleTanks.Types.GameObjects.Tank.trackOptions,
				angle: Phaser.Math.Between(-180, 180),
			})
		}
	}

	initEvents() {
		EventCenter.emitter.on(`${this.scene.scene.key}-${stateEventKeys.CREATE_TANK_STATE}`, this.createTankState, this);
		EventCenter.emitter.on(`${this.scene.scene.key}-${stateEventKeys.ADD_MANY_COMPONENTS}`, this.addMultipleComponents, this);
		EventCenter.emitter.on(`${this.scene.scene.key}-${stateEventKeys.ADD_ONE_COMPONENT}`, this.addOneComponent, this);
		EventCenter.emitter.on(`${this.scene.scene.key}-${stateEventKeys.REMOVE_MANY_COMPONENTS}`, this.removeMultipleComponents, this);
		EventCenter.emitter.on(`${this.scene.scene.key}-${stateEventKeys.REMOVE_ONE_COMPONENT}`, this.removeOneComponent, this);
	}

	shutdown() {
		EventCenter.emitter.off(`${this.scene.scene.key}-${stateEventKeys.CREATE_TANK_STATE}`, this.createTankState, this);
		EventCenter.emitter.off(`${this.scene.scene.key}-${stateEventKeys.ADD_MANY_COMPONENTS}`, this.addMultipleComponents, this);
		EventCenter.emitter.off(`${this.scene.scene.key}-${stateEventKeys.ADD_ONE_COMPONENT}`, this.addOneComponent, this);
		EventCenter.emitter.off(`${this.scene.scene.key}-${stateEventKeys.REMOVE_MANY_COMPONENTS}`, this.removeMultipleComponents, this);
		EventCenter.emitter.off(`${this.scene.scene.key}-${stateEventKeys.REMOVE_ONE_COMPONENT}`, this.removeOneComponent, this);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
