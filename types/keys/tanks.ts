import { tankColors } from "..";

export const tankKeys = {
  barrel: {
    key: "Guns_Barrels",
    frames: {
      1: "Gun_Barrel_01.png",
      2: "Gun_Barrel_02.png",
      3: "Gun_Barrel_03.png",
      4: "Gun_Barrel_04.png",
      5: "Gun_Barrel_05.png",
      6: "Gun_Barrel_06.png",
      7: "Gun_Barrel_07.png",
      8: "Gun_Barrel_08.png",
      9: "Gun_Barrel_09.png",
      10: "Gun_Barrel_10.png",
      11: "Gun_Barrel_11.png",
      12: "Gun_Barrel_12.png",
      13: "Gun_Barrel_13.png",
      14: "Gun_Barrel_14.png",
      15: "Gun_Barrel_15.png",
      16: {
        [tankColors.BLUE]: "Gun_Barrel_16_Blue.png",
        [tankColors.BROWN]: "Gun_Barrel_16_Brown.png",
        [tankColors.CYAN]: "Gun_Barrel_16_Cyan.png",
        [tankColors.GREEN]: "Gun_Barrel_16_Green.png",
      },
    },
  },
  hull: {
    keys: {
      [tankColors.BLUE]: "Tank_Hulls_Blue",
      [tankColors.BROWN]: "Tank_Hulls_Brown",
      [tankColors.CYAN]: "Tank_Hulls_Cyan",
      [tankColors.GREEN]: "Tank_Hulls_Green",
    },
    frames: {
      1: "Hull_01.png",
      2: "Hull_02.png",
      3: "Hull_03.png",
      4: "Hull_04.png",
      5: "Hull_05.png",
      6: "Hull_06.png",
      7: "Hull_07.png",
      8: "Hull_08.png",
      9: "Hull_09.png",
      10: "Hull_10.png",
      11: "Hull_11.png",
      12: "Hull_12.png",
      13: "Hull_13.png",
      14: "Hull_14.png",
      15: "Hull_15.png",
      16: "Hull_16.png",
    }
  },
  tracks: {
    1: {
      key: "Track1",
      frames: {
        1: "Track1_01.png",
        2: "Track1_02.png",
      },
    },
    2: {
      key: "Track2",
      frames: {
        1: "Track2_01.png",
        2: "Track2_02.png",
      },
    },
    3: {
      key: "Track3",
      frames: {
        1: "Track3_01.png",
        2: "Track3_02.png",
      },
    },
    4: {
      key: "Track4",
      frames: {
        1: "Track4_01.png",
        2: "Track4_02.png",
      },
    },
    5: {
      key: "Track5",
      frames: {
        1: "Track5_01.png",
        2: "Track5_02.png",
      },
    },
    6: {
      key: "Track6",
      frames: {
        1: "Track6_01.png",
        2: "Track6_02.png",
      },
    },
    7: {
      key: "Track7",
      frames: {
        1: "Track7_01.png",
        2: "Track7_02.png",
      },
    },
    8: {
      key: "Track8",
      frames: {
        1: "Track8_01.png",
        2: "Track8_02.png",
      },
    },
  },
  turret: {
    keys: {
      [tankColors.BLUE]: "Weapon_Turrets_Blue",
      [tankColors.BROWN]: "Weapon_Turrets_Brown",
      [tankColors.CYAN]: "Weapon_Turrets_Cyan",
      [tankColors.GREEN]: "Weapon_Turrets_Green",
    },
    frames: {
      1: "Gun_Turret_01.png",
      2: "Gun_Turret_02.png",
      3: "Gun_Turret_03.png",
      4: "Gun_Turret_04.png",
      5: "Gun_Turret_05.png",
      6: "Gun_Turret_06.png",
      7: "Gun_Turret_07.png",
      8: "Gun_Turret_08.png",
      9: "Gun_Turret_09.png",
      10: "Gun_Turret_10.png",
      11: "Gun_Turret_11.png",
      12: "Gun_Turret_12.png",
      13: "Gun_Turret_13.png",
      14: "Gun_Turret_14.png",
      15: "Gun_Turret_15.png",
      16: "Gun_Turret_16.png",
    },
  },
};
