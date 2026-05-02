export const Random = {
  pick<T>(list: T[]): T {
    return list[Math.floor(Math.random() * list.length)];
  }
};
