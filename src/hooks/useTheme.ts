import { useEffect } from "react";
import { useThemeStore } from "@/store/themeStore";
import { THEME_VARIABLES } from "@/lib/themes";

export const useTheme = () => {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    const vars = THEME_VARIABLES[theme];
    const root = document.documentElement;
    Object.entries(vars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    root.setAttribute("data-theme", theme);
  }, [theme]);

  return { theme, setTheme };
};
