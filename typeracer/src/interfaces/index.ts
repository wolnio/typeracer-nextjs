export interface Player {
  id: string;
  username: string;
  best_wpm: number;
  best_accuracy: number;
  created_at: string;
  last_seen: string;
}

export interface GameStore {
  currentPlayer: Player | null;
  currentInput: string;

  setCurrentPlayer: (player: Player | null) => void;
  setCurrentInput: (input: string) => void;
}
