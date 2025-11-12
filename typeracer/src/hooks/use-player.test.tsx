import { renderHook } from "@testing-library/react";
import { usePlayer } from "./use-player";
import { useGameStore } from "@/utils/store";
import supabase from "@/utils/supabase";
import { setStorageUserId } from "@/utils/utils";

// Mock dependencies
jest.mock("@/utils/supabase", () => ({
  __esModule: true,
  default: {
    from: jest.fn(),
  },
}));

jest.mock("@/utils/utils", () => ({
  getStorageUserId: jest.fn(),
  setStorageUserId: jest.fn(),
}));

jest.mock("@/utils/store", () => ({
  useGameStore: jest.fn(),
}));

describe("usePlayer", () => {
  const mockSetCurrentPlayer = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useGameStore as unknown as jest.Mock).mockReturnValue({
      setCurrentPlayer: mockSetCurrentPlayer,
    });
  });

  it("should create a new player successfully", async () => {
    const mockPlayer = {
      id: "123",
      username: "testuser",
      best_wpm: 0,
      best_accuracy: 0,
      created_at: "2025-11-12T00:00:00Z",
      last_seen: "2025-11-12T00:00:00Z",
    };

    const mockSelect = jest.fn().mockReturnValue({
      single: jest.fn().mockResolvedValue({ data: mockPlayer, error: null }),
    });

    const mockInsert = jest.fn().mockReturnValue({
      select: mockSelect,
    });

    (supabase.from as jest.Mock).mockReturnValue({
      insert: mockInsert,
    });

    const { result } = renderHook(() => usePlayer());

    const success = await result.current.createPlayer("testuser");

    expect(success).toBe(true);
    expect(mockSetCurrentPlayer).toHaveBeenCalledWith(mockPlayer);
    expect(setStorageUserId).toHaveBeenCalledWith("123");
  });
});
