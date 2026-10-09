"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type ThemeId =
  | "light"
  | "midnight"
  | "navy"
  | "forest"
  | "cyber"
  | "oxford"
  | "titanium"
  | "sunset";

export type FontId = "inter" | "mono" | "serif" | "geometric" | "system";
export type FontSizeId = "compact" | "normal" | "large";

export interface ThemeMeta {
  id: ThemeId;
  name: string;
  category: "Light" | "Dark" | "Warm";
  badge: string;
  description: string;
  colors: {
    bg: string;
    card: string;
    accent: string;
    text: string;
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
    id: "light",
    name: "Executive Light",
    category: "Light",
    badge: "Default Academic",
    description: "Crisp white, refined slate borders, royal blue accents.",
    colors: {
      bg: "#f8fafc",
      card: "#ffffff",
      accent: "#2563eb",
      text: "#0f172a",
    },
  },
  {
    id: "midnight",
    name: "Midnight Pro (OLED)",
    category: "Dark",
    badge: "Pure Black",
    description: "Deep obsidian dark mode with glowing ice-blue highlights.",
    colors: {
      bg: "#05070a",
      card: "#0f131a",
      accent: "#38bdf8",
      text: "#f9fafb",
    },
  },
  {
    id: "navy",
    name: "Corporate Navy",
    category: "Dark",
    badge: "Enterprise Tech",
    description: "Deep maritime navy with crisp cyan and steel accents.",
    colors: {
      bg: "#060d1a",
      card: "#0b172d",
      accent: "#0ea5e9",
      text: "#f0f6fc",
    },
  },
  {
    id: "forest",
    name: "Nordic Forest",
    category: "Dark",
    badge: "Minimal Jade",
    description: "Deep jade and forest tones with mint accents. High contrast.",
    colors: {
      bg: "#040e09",
      card: "#0a1c13",
      accent: "#10b981",
      text: "#ecfdf5",
    },
  },
  {
    id: "cyber",
    name: "Cyberpunk Matrix",
    category: "Dark",
    badge: "AI / Neon",
    description: "Futuristic deep violet with bright neon purple and cyan glow.",
    colors: {
      bg: "#070614",
      card: "#110e28",
      accent: "#a855f7",
      text: "#faf5ff",
    },
  },
  {
    id: "oxford",
    name: "Oxford Academic",
    category: "Warm",
    badge: "Editorial Paper",
    description: "Classic scholar parchment cream with deep charcoal typography.",
    colors: {
      bg: "#f9f6ee",
      card: "#ffffff",
      accent: "#b91c1c",
      text: "#1c1917",
    },
  },
  {
    id: "titanium",
    name: "Titanium Slate",
    category: "Dark",
    badge: "Monochrome Minimal",
    description: "Pure charcoal and silver monochrome. High-end developer aesthetic.",
    colors: {
      bg: "#121214",
      card: "#1a1a1e",
      accent: "#ffffff",
      text: "#f4f4f5",
    },
  },
  {
    id: "sunset",
    name: "Solar Sunset",
    category: "Dark",
    badge: "Warm Espresso",
    description: "Deep roasted espresso background with warm terracotta and amber glow.",
    colors: {
      bg: "#140e0d",
      card: "#201614",
      accent: "#f97316",
      text: "#fff7ed",
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

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>("light");
  const [font, setFontState] = useState<FontId>("inter");
  const [fontSize, setFontSizeState] = useState<FontSizeId>("normal");
  const [isNavbarDropdownOpen, setIsNavbarDropdownOpen] = useState(false);

  // Sync on initial mount
  useEffect(() => {
    const savedTheme = (localStorage.getItem("subarna_theme") as ThemeId) || "light";
    const savedFont = (localStorage.getItem("subarna_font") as FontId) || "inter";
    const savedSize = (localStorage.getItem("subarna_font_size") as FontSizeId) || "normal";

    document.documentElement.setAttribute("data-theme", savedTheme);
    document.documentElement.setAttribute("data-font", savedFont);
    document.documentElement.setAttribute("data-font-size", savedSize);

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
    setTheme("light");
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
