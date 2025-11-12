export const setStorageUserId = (userId: string) => {
  localStorage.setItem("userId", userId);
};

export const getStorageUserId = (): string | null => {
  return localStorage.getItem("userId");
};
