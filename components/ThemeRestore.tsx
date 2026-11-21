"use client";
import { useEffect } from "react";
import { applyTheme, THEME_KEY, type ThemeState } from "@/lib/theme";

/**
 * Re-applies the saved (or system) theme on pages that re-render the whole document, such as the
 * error screens. Renders nothing; much lighter than mounting the full theme buttons there.
 */
export function ThemeRestore() {
  useEffect(() => {
    if (document.documentElement.dataset.theme) return;
    let s: ThemeState | null = null;
    try {
      s = JSON.parse(localStorage.getItem(THEME_KEY) || "null");
    } catch {}
    applyTheme(s ?? { mode: matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" });
  }, []);
  return null;
}
