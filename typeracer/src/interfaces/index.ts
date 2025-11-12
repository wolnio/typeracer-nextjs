export interface Player {
  id: string;
  username: string;
  best_wpm: number;
  best_accuracy: number;
  created_at: string;
  last_seen: string;
}

export interface GameRound {
  id: string;
  sentence: string;
  round_number: number;
  started_at: string;
  ends_at: string;
  is_active: boolean;
}

export interface GameStore {
  currentPlayer: Player | null;
  currentInput: string;
  currentRound: GameRound | null;
  timeRemaining: number;

  setCurrentRound: (round: GameRound | null) => void;
  setTimeRemaining: (time: number) => void;
  setCurrentPlayer: (player: Player | null) => void;
  setCurrentInput: (input: string) => void;
}
