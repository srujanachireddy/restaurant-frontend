import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "warm" | "dark" | "fresh";

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: "warm",
      setTheme: (theme) => set({ theme }),
    }),
    { name: "theme-storage" },
  ),
);
