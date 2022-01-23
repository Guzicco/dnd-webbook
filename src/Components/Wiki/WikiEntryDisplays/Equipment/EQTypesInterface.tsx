import { ILink } from "../../../../App";

type Cost = {
  quantity: number;
  unit: string;
};
type Damage = {
  damage_dice: string;
  damage_type: ILink;
};
type Range = {
  normal: number;
  long: number;
};
type ArmorClass = {
  base: number;
  dex_bonus: boolean;
  max_bonus: number;
};

export const weaponRange = ["Melee", "Ranged"] as const;
export const weaponCategory = ["Martial"] as const;
export const eqCategory = [
  "Adventuring Gear",
  "Weapon",
  "Armor",
  "Mounts and Vehicles",
  "Tools",
] as const;

export type WeaponRange = typeof weaponRange[number];
export type WeaponCategory = typeof weaponCategory[number];
export type EQCategory = typeof eqCategory[number];

export interface EQInterface extends ILink {
  equipment_category: ILink;
  cost: Cost;
  weight: number;
  desc?: string[] | string;
  quantity?: number;
}

export interface IGear extends EQInterface {
  gear_category: ILink;
}
export interface IArmor extends EQInterface {
  armor_category: string;
  armor_class: ArmorClass;
  stealth_disadvantage: boolean;
  str_minimum: number;
}
export interface IWeapon extends EQInterface {
  category_range: string;
  properties: ILink[];
  range: Range;
  damage?: Damage;
  two_handed_damage?: Damage;
  throw_range?: Range;
  weapon_category: WeaponCategory;
  weapon_range: WeaponRange;
}
