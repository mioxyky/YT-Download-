"use client";

import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      aria-label={isDark ? "Passer au thème clair" : "Passer au thème sombre"}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-panel text-ink transition hover:bg-line focus:outline-none focus:ring-4 focus:ring-blue-500/20"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      type="button"
      title={isDark ? "Thème clair" : "Thème sombre"}
    >
      {isDark ? (
        <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0 4a1 1 0 0 1-1-1v-1a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm0-18a1 1 0 0 1-1-1V2a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm10 8a1 1 0 0 1-1 1h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1ZM4 12a1 1 0 0 1-1 1H2a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1Zm14.95 7.36a1 1 0 0 1-1.41 0l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41ZM7.17 7.17a1 1 0 0 1-1.41 0l-.71-.71A1 1 0 0 1 6.46 5.05l.71.71a1 1 0 0 1 0 1.41Zm12.19-2.12a1 1 0 0 1 0 1.41l-.71.71a1 1 0 0 1-1.41-1.41l.71-.71a1 1 0 0 1 1.41 0ZM7.17 18.24l-.71.71a1 1 0 0 1-1.41-1.41l.71-.71a1 1 0 1 1 1.41 1.41Z" />
        </svg>
      ) : (
        <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24">
          <path fill="currentColor" d="M21 14.62A8.5 8.5 0 0 1 9.38 3a7.5 7.5 0 1 0 11.62 11.62Z" />
        </svg>
      )}
    </button>
  );
}
