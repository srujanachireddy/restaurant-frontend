import type { Theme } from "@/store/themeStore";

export const THEME_VARIABLES: Record<Theme, Record<string, string>> = {
  warm: {
    "--color-bg": "#faf8f5",
    "--color-bg-card": "#ffffff",
    "--color-primary": "#c17f3d",
    "--color-primary-dark": "#8b5e2a",
    "--color-text": "#2c2c2c",
    "--color-text-muted": "#6b6b6b",
    "--color-border": "#ede8e0",
    "--color-surface": "#f5f0ea",
  },
  dark: {
    "--color-bg": "#0f0f0f",
    "--color-bg-card": "#1a1a1a",
    "--color-primary": "#c17f3d",
    "--color-primary-dark": "#a06830",
    "--color-text": "#f5f5f5",
    "--color-text-muted": "#a0a0a0",
    "--color-border": "#2a2a2a",
    "--color-surface": "#222222",
  },
  fresh: {
    "--color-bg": "#f0fdf4",
    "--color-bg-card": "#ffffff",
    "--color-primary": "#16a34a",
    "--color-primary-dark": "#15803d",
    "--color-text": "#1a2e1a",
    "--color-text-muted": "#4b7a4b",
    "--color-border": "#bbf7d0",
    "--color-surface": "#dcfce7",
  },
};
