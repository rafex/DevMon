import { levelFromXp, xpForWin } from "../../domain/rules/xp";

export const applyVictoryRewards = (currentXp: number, enemyLevel: number) => {
  const gainedXp = xpForWin(enemyLevel);
  const totalXp = currentXp + gainedXp;
  return {
    gainedXp,
    totalXp,
    newLevel: levelFromXp(totalXp)
  };
};
