export const calculateDamage = (attackerLogic: number, defenderCommunication: number): number => {
  const base = attackerLogic * 1.8 - defenderCommunication * 0.5;
  return Math.max(4, Math.round(base));
};
