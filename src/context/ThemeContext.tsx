"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type ThemeId = "executive" | "midnight" | "corporate" | "oxford";

export type FontId = "inter" | "mono" | "serif" | "geometric" | "system";
export type FontSizeId = "compact" | "normal" | "large";

export interface ThemeMeta {
  id: ThemeId;
  name: string;
  category: "Light" | "Dark" | "Corporate" | "Academic";
  badge: string;
  description: string;
  colors: {
    bg: string;
    card: string;
    elevated: string;
    accent: string;
    secondaryAccent: string;
    text: string;
    mutedText: string;
    border: string;
  };
}

export interface FontMeta {
  id: FontId;
  name: string;
  category: string;
  description: string;
  cssFamily: string;
  sample: string;
}

export const THEMES_LIST: ThemeMeta[] = [
  {
    id: "executive",
    name: "Executive Light",
    category: "Light",
    badge: "Default Academic",
    description: "Academic portfolio, university evaluation, and professional readability.",
    colors: {
      bg: "#F8FAFC",
      card: "#FFFFFF",
      elevated: "#F1F5F9",
      accent: "#2563EB",
      secondaryAccent: "#DBEAFE",
      text: "#172033",
      mutedText: "#526078",
      border: "#DCE3ED",
    },
  },
  {
    id: "midnight",
    name: "Midnight Pro",
    category: "Dark",
    badge: "Tech / AI",
    description: "Modern technology, AI, and software-development portfolio with distinct dark surfaces.",
    colors: {
      bg: "#0B1120",
      card: "#111827",
      elevated: "#182235",
      accent: "#60A5FA",
      secondaryAccent: "#22D3EE",
      text: "#F1F5F9",
      mutedText: "#B6C2D2",
      border: "#29364A",
    },
  },
  {
    id: "corporate",
    name: "Corporate Blue",
    category: "Corporate",
    badge: "Enterprise",
    description: "Professional enterprise portfolio with deep blue navbar, crisp cards, and cyan accents.",
    colors: {
      bg: "#F1F5F9",
      card: "#FFFFFF",
      elevated: "#E2E8F0",
      accent: "#0F4C81",
      secondaryAccent: "#06A6D6",
      text: "#172B4D",
      mutedText: "#526579",
      border: "#D5E0EB",
    },
  },
  {
    id: "oxford",
    name: "Oxford Academic",
    category: "Academic",
    badge: "Warm Scholar",
    description: "Warm academic appearance with elegant serif headings and muted burgundy accents.",
    colors: {
      bg: "#F7F3EA",
      card: "#FFFDF8",
      elevated: "#EFE8DA",
      accent: "#8C2633",
      secondaryAccent: "#E9D5D7",
      text: "#292722",
      mutedText: "#625E55",
      border: "#DAD1C3",
    },
  },
];

export const FONTS_LIST: FontMeta[] = [
  {
    id: "inter",
    name: "Inter",
    category: "Modern Sans",
    description: "Industry-standard clean sans-serif with high screen readability.",
    cssFamily: "'Inter', -apple-system, sans-serif",
    sample: "Subarna Lodh • Artificial Intelligence & COA Platform",
  },
  {
    id: "mono",
    name: "Fira / JetBrains Mono",
    category: "Developer Code",
    description: "Monospace terminal font, perfect for engineering and algorithms.",
    cssFamily: "'Fira Code', 'JetBrains Mono', monospace",
    sample: "const student = { name: 'Subarna Lodh', branch: 'CSE (AI)' };",
  },
  {
    id: "serif",
    name: "Merriweather",
    category: "Academic Serif",
    description: "Editorial research paper style with scholarly, formal character.",
    cssFamily: "'Merriweather', Georgia, serif",
    sample: "Computer Organization & Architecture • B.E. CSE (AI)",
  },
  {
    id: "geometric",
    name: "Plus Jakarta Sans",
    category: "Geometric Sans",
    description: "Contemporary, premium geometric typeface with wide proportions.",
    cssFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    sample: "Designing modern software and intelligent AI architectures.",
  },
  {
    id: "system",
    name: "System UI",
    category: "Native Platform",
    description: "Ultra-fast native OS typography (Segoe UI / San Francisco / Roboto).",
    cssFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    sample: "Fastest native rendering engine with zero network overhead.",
  },
];

interface ThemeContextType {
  theme: ThemeId;
  setTheme: (t: ThemeId) => void;
  font: FontId;
  setFont: (f: FontId) => void;
  fontSize: FontSizeId;
  setFontSize: (s: FontSizeId) => void;
  isNavbarDropdownOpen: boolean;
  setIsNavbarDropdownOpen: (open: boolean) => void;
  toggleNavbarDropdown: () => void;
  resetDefaults: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

function normalizeTheme(val: string | null): ThemeId {
  if (!val) return "executive";
  if (val === "executive" || val === "midnight" || val === "corporate" || val === "oxford") {
    return val as ThemeId;
  }
  // Backwards compatibility migration
  if (val === "light") return "executive";
  if (val === "dark" || val === "cyber" || val === "forest" || val === "titanium" || val === "sunset") {
    return "midnight";
  }
  if (val === "navy" || val === "ocean") return "corporate";
  if (val === "sepia") return "oxford";
  return "executive";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>("executive");
  const [font, setFontState] = useState<FontId>("inter");
  const [fontSize, setFontSizeState] = useState<FontSizeId>("normal");
  const [isNavbarDropdownOpen, setIsNavbarDropdownOpen] = useState(false);

  // Sync on initial mount
  useEffect(() => {
    const rawTheme = localStorage.getItem("subarna_theme");
    const savedTheme = normalizeTheme(rawTheme);
    const savedFont = (localStorage.getItem("subarna_font") as FontId) || "inter";
    const savedSize = (localStorage.getItem("subarna_font_size") as FontSizeId) || "normal";

    document.documentElement.setAttribute("data-theme", savedTheme);
    document.documentElement.setAttribute("data-font", savedFont);
    document.documentElement.setAttribute("data-font-size", savedSize);

    // Save normalized theme back if it was mapped
    if (rawTheme !== savedTheme) {
      localStorage.setItem("subarna_theme", savedTheme);
    }

    queueMicrotask(() => {
      setThemeState(savedTheme);
      setFontState(savedFont);
      setFontSizeState(savedSize);
    });
  }, []);

  const setTheme = (newTheme: ThemeId) => {
    setThemeState(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("subarna_theme", newTheme);
  };

  const setFont = (newFont: FontId) => {
    setFontState(newFont);
    document.documentElement.setAttribute("data-font", newFont);
    localStorage.setItem("subarna_font", newFont);
  };

  const setFontSize = (newSize: FontSizeId) => {
    setFontSizeState(newSize);
    document.documentElement.setAttribute("data-font-size", newSize);
    localStorage.setItem("subarna_font_size", newSize);
  };

  const toggleNavbarDropdown = () => {
    setIsNavbarDropdownOpen((prev) => !prev);
  };

  const resetDefaults = () => {
    setTheme("executive");
    setFont("inter");
    setFontSize("normal");
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        font,
        setFont,
        fontSize,
        setFontSize,
        isNavbarDropdownOpen,
        setIsNavbarDropdownOpen,
        toggleNavbarDropdown,
        resetDefaults,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
