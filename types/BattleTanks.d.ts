declare namespace BattleTanks {
  namespace Components { }

  namespace GameObjects {
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
        init(config: BattleTanks.Types.GameObjects.Tank.tankConfig): this;
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

      type tankSchema = {
        color: ecsType,
        hullType: ecsType,
        trackType: ecsType,
        turretType: ecsType,
        barrelType: ecsType,
      }

      type vectorSchema = {
        x: ecsType,
        y: ecsType,
      }

      type velocitySchema = {
        x: ecsType,
        y: ecsType,
        distance: ecsType,
      }

      type angleSchema = {
        current: ecsType,
        target: ecsType,
      }

      type rotationSchema = { speed: ecsType }

      type cpuSchema = {
        timer: ecsType,
        interval: ecsType,
      }

      type componentConfig<schema extends import("bitecs").ISchema = import("bitecs").ISchema> = {
        component: import("bitecs").ComponentType<schema>;
        values?: { [key in keyof schema]: number }
      }

      type componentList = componentConfig[];

      type tankComponentList = [componentConfig<tankSchema>, componentConfig<vectorSchema>, componentConfig<angleSchema>, componentConfig<cpuSchema>];
    }

    namespace GameObjects {
      namespace Tank {
        type tankOptions = Utils.Range<0, 17>
        type trackOptions = Utils.Range<0, 9>
        type colorOptions = Utils.Range<0, 4>

        type tankColor = keyof typeof import("./index").tankColors;

        type tankConfig = {
          id: number,
          x?: number,
          y?: number,
          angle?: number,
          color: colorOptions,
          hullType: tankOptions,
          trackType: trackOptions,
          barrelType: tankOptions,
          turretType: tankOptions,
        }

        type optionalTankConfig = Utils.optional<tankConfig>

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
      type levelState = {
        world: import("bitecs").IWorld;
        systems: Map<systemKeys, import("bitecs").System>;
        entities: Map<number, BattleTanks.GameObjects.Tank.ITank>;
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