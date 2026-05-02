import type { Player } from "../domain/entities/Player";

const SAVE_KEY = "devmon-save";

export class SaveService {
  savePlayer(player: Player): void {
    localStorage.setItem(SAVE_KEY, JSON.stringify(player));
  }

  loadPlayer(): Player | null {
    const raw = localStorage.getItem(SAVE_KEY);
    return raw ? (JSON.parse(raw) as Player) : null;
  }
}
