export const setStorageUserId = (userId: string) => {
  localStorage.setItem("userId", userId);
};

export const getStorageUserId = (): string | null => {
  return localStorage.getItem("userId");
};

/**
 * Format time remaining as MM:SS - AI GENERATED
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
