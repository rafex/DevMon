import { calculateDamage } from "../../domain/rules/damage";

export const getActionDamage = (logic: number, communication: number, powerModifier = 1): number =>
  Math.round(calculateDamage(logic, communication) * powerModifier);
