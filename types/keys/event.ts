export const levelEventKeys = {
	ADD_ENTITY_TO_SCENE: "add-entity-to-scene",
}

export const entityEventKeys = {
	CREATE_TANK_ENTITY: "create-state-entity",
} as const;

export const stateEventKeys = {
	ADD_MANY_COMPONENTS: "add-many-components",
	ADD_ONE_COMPONENT: "add-one-component",
	REMOVE_MANY_COMPONENTS: "remove-many-components",
	REMOVE_ONE_COMPONENT: "remove-one-component",
	CREATE_TANK_STATE: "create-tank-state",
} as const;
