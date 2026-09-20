/**
 * SKY BUILDS design tokens — approved v5 "Blueprint x Creative Energy".
 *
 * These mirror the CSS custom properties defined in `src/app/globals.css`.
 * Use the CSS variables directly in styling; use this file only where a
 * token value is needed in JS/TS logic (e.g. Framer Motion configs).
 *
 * Do not edit values here without updating globals.css and
 * docs/DESIGN-SYSTEM.md to match.
 */

export const motionDuration = {
  subtle: 0.6,
  medium: 0.85,
  strong: 1.2,
} as const;

export const motionEase = [0.22, 0.61, 0.36, 1] as const;

export const colorTokens = {
  dark: {
    bg: "#120e1f",
    bg2: "#17122a",
    surface: "#1e1836",
    surfaceElevated: "#271f45",
    text: "#f5f1ec",
    textMuted: "#948bae",
    primary: "#5b78ff",
    secondary: "#ff5da2",
    accent: "#ffc15c",
    success: "#4ade9a",
  },
  light: {
    bg: "#f7f1ea",
    bg2: "#f0e8de",
    surface: "#fbf7f1",
    surfaceElevated: "#efe6d8",
    text: "#211a2e",
    textMuted: "#7a6e78",
    primary: "#3452e0",
    secondary: "#e23f87",
    accent: "#f2a93b",
    success: "#2e9f6e",
  },
} as const;

export type ThemeName = keyof typeof colorTokens;
