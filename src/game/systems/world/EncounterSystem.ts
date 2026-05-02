export const shouldTriggerEncounter = (roll: number, threshold = 0.015): boolean => roll < threshold;
