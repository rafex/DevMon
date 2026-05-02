export const xpForWin = (enemyLevel: number): number => 20 + enemyLevel * 10;

export const levelFromXp = (xp: number): number => Math.floor(xp / 100) + 1;
