import { THEME_KEY } from "../constants";

export type Theme = "system" | "light" | "dark";

const prefersDark = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-color-scheme: dark)").matches;

export function getInitialTheme(): Theme {
  const saved = localStorage.getItem(THEME_KEY) as Theme | null;
  return saved ?? "system";
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const effective = theme === "system" ? (prefersDark() ? "dark" : "light") : theme;
  root.classList.remove("light", "dark");
  root.classList.add(effective);
  localStorage.setItem(THEME_KEY, theme);
}

export function initTheme() {
  applyTheme(getInitialTheme());
}
