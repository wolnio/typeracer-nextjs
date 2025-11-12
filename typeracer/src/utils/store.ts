import { GameStore } from "@/interfaces";
import { create } from "zustand";

export const useGameStore = create<GameStore>((set) => ({
  currentPlayer: null,
  currentInput: "",
  setCurrentPlayer: (player) => set({ currentPlayer: player }),
  setCurrentInput: (input) => set({ currentInput: input }),
}));
