declare namespace BattleTanks {
  namespace Components {
  }

  namespace GameObjects {
    namespace Spawner {
      interface ISpawner extends Phaser.GameObjects.Rectangle {
        init(): ISpawner;
        shutdown(): void;
        spawnObject(): void;
      }
    }

    namespace Tank {
      namespace Components {
        interface ITurret extends Phaser.GameObjects.Container {
          get children(): Types.GameObjects.Tank.turretChildren
        }

        interface IHull extends Phaser.GameObjects.Container {
          get children(): Types.GameObjects.Tank.hullChildren
        }
      }

      interface ITank extends Phaser.GameObjects.Container {
        get id(): number;
        set id(val: number);
        get spawner(): number;
        get color(): BattleTanks.Types.GameObjects.Tank.colorOptions;
        set color(val: BattleTanks.Types.GameObjects.Tank.colorOptions);
        get hullType(): BattleTanks.Types.GameObjects.Tank.tankOptions;
        set hullType(val: BattleTanks.Types.GameObjects.Tank.tankOptions);
        get turretType(): BattleTanks.Types.GameObjects.Tank.tankOptions;
        set turretType(val: BattleTanks.Types.GameObjects.Tank.tankOptions);
        get barrelType(): BattleTanks.Types.GameObjects.Tank.tankOptions;
        set barrelType(val: BattleTanks.Types.GameObjects.Tank.tankOptions);
        get trackType(): BattleTanks.Types.GameObjects.Tank.trackOptions;
        set trackType(val: BattleTanks.Types.GameObjects.Tank.trackOptions);
        get children(): Types.GameObjects.Tank.tankChildren
        init(config: BattleTanks.Types.GameObjects.Tank.config): this;
        expandChildren(): Types.GameObjects.Tank.tankChildren;
      }
    }
  }

  namespace Scenes { }

  namespace Scripts { }

  namespace Systems { }

  namespace Types {
    namespace Components {
      type ecsType = import("bitecs").Type;

      // Entity Component Schemas
      type tankSchema = {
        id: ecsType,
        spawner: ecsType,
        color: ecsType,
        hullType: ecsType,
        trackType: ecsType,
        turretType: ecsType,
        barrelType: ecsType,
      }

      type spawnerSchema = {
        id: ecsType,
        active: ecsType,
        max: ecsType,
      }

      // State Component Schemas
      type positionSchema = {
        x: ecsType,
        y: ecsType,
      }

      type angleSchema = {
        current: ecsType,
        target: ecsType,
      }

      // Update Component Schemas
      type velocitySchema = {
        x: ecsType,
        y: ecsType,
        distance: ecsType,
      }

      type rotationSchema = { speed: ecsType }

      // AI Component Schemas
      type cpuSchema = {
        timer: ecsType,
        interval: ecsType,
      }

      type componentConfig<schema extends import("bitecs").ISchema = import("bitecs").ISchema> = {
        component: import("bitecs").ComponentType<schema>;
        values?: { [key in keyof schema]: number }
      }

      type componentList = componentConfig[];

      type tankComponentList = [componentConfig<tankSchema>, componentConfig<positionSchema>, componentConfig<angleSchema>, componentConfig<cpuSchema>];
      type spawnerComponentList = [componentConfig<spawnerSchema>, componentConfig<positionSchema>, componentConfig<cpuSchema>]
    }

    namespace GameObjects {
      namespace Spawner {
        type config = {
          id: number,
          x: number,
          y: number,
          max?: number,
        }
      }
      
      namespace Tank {
        type tankOptions = Utils.Range<0, 17>
        type trackOptions = Utils.Range<0, 9>
        type colorOptions = Utils.Range<0, 4>

        type tankColor = keyof typeof import("./index").tankColors;

        type config = {
          id: number,
          spawner: number,
          x?: number,
          y?: number,
          angle?: number,
          color: colorOptions,
          hullType: tankOptions,
          trackType: trackOptions,
          barrelType: tankOptions,
          turretType: tankOptions,
        }

        type optionalConfig = Utils.optional<config>

        type hullChildren = {
          base: Phaser.GameObjects.Image;
          tracks: {
            left: Phaser.GameObjects.Sprite;
            right: Phaser.GameObjects.Sprite;
          }
        }

        type turretChildren = {
          base: Phaser.GameObjects.Image;
          barrel: Phaser.GameObjects.Image;
        }

        type tankChildren = {
          hull: BattleTanks.GameObjects.Tank.Components.IHull | hullChildren;
          turret: BattleTanks.GameObjects.Tank.Components.ITurret | turretChildren;
        }
      }
    }

    namespace Math {
      type vector = { x: number, y: number }
    }

    namespace Scenes {
      type systemKeys = keyof typeof import("./keys/system").systemKeys;
      type systemMap = Map<systemKeys, import("bitecs").System>;
      type entityMap = Map<number, BattleTanks.GameObjects.Tank.ITank>;
      type levelState = {
        world: import("bitecs").IWorld;
        systems: systemMap;
        entities: entityMap;
      }
    }

    namespace Scripts { }

    namespace Systems { }

    namespace Utils {
      type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
        ? Acc[number]
        : Enumerate<N, [...Acc, Acc['length']]>

      type Range<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>

      type optional<T> = { [K in keyof T]?: T[K] }
    }
  }

  namespace Utils { }
}