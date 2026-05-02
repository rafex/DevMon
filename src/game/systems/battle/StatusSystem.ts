export const increaseStress = (currentStress: number, amount: number): number =>
  Math.min(100, currentStress + amount);
