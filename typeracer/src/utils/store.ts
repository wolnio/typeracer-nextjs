import { GameStore } from "@/interfaces";
import { create } from "zustand";

export const useGameStore = create<GameStore>((set) => ({
  currentPlayer: null,
  currentInput: "",
  currentRound: null,
  timeRemaining: 60,
  setCurrentPlayer: (player) => set({ currentPlayer: player }),
  setCurrentInput: (input) => set({ currentInput: input }),
  setCurrentRound: (round) => set({ currentRound: round }),
  setTimeRemaining: (time) => set({ timeRemaining: time }),
}));
