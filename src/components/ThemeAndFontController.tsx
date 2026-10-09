"use client";

import React, { useState, useEffect } from "react";
import {
  Palette,
  Type,
  X,
  Check,
  RotateCcw,
  Sparkles,
  Sun,
  Moon,
  Compass,
  Trees,
  Gem,
  BookOpen,
  Sliders,
  Info,
} from "lucide-react";

export type ThemeId = "light" | "dark" | "ocean" | "emerald" | "purple" | "sepia";
export type FontId = "inter" | "mono" | "serif" | "geometric" | "system";
export type FontSizeId = "compact" | "normal" | "large";

interface ThemeOption {
  id: ThemeId;
  name: string;
  category: "Light" | "Dark" | "Warm";
  description: string;
  icon: React.ElementType;
  preview: {
    bg: string;
    card: string;
    accent: string;
    text: string;
  };
}

interface FontOption {
  id: FontId;
  name: string;
  category: string;
  description: string;
  cssFamily: string;
  sample: string;
}

const THEMES: ThemeOption[] = [
  {
    id: "light",
    name: "Academic Slate",
    category: "Light",
    description: "Clean crisp light background, slate borders, and royal blue accents.",
    icon: Sun,
    preview: {
      bg: "#f8fafc",
      card: "#ffffff",
      accent: "#2563eb",
      text: "#0f172a",
    },
  },
  {
    id: "dark",
    name: "Midnight Cyber",
    category: "Dark",
    description: "Deep obsidian dark mode with cyber cyan and electric blue highlights.",
    icon: Moon,
    preview: {
      bg: "#090d16",
      card: "#111827",
      accent: "#38bdf8",
      text: "#f8fafc",
    },
  },
  {
    id: "ocean",
    name: "Oceanic Deep",
    category: "Dark",
    description: "Midnight navy blue with glowing aquamarine and teal accents.",
    icon: Compass,
    preview: {
      bg: "#030c18",
      card: "#071a2f",
      accent: "#06b6d4",
      text: "#e6f1ff",
    },
  },
  {
    id: "emerald",
    name: "Emerald Terminal",
    category: "Dark",
    description: "Deep forest terminal dark mode with crisp mint and jade accents.",
    icon: Trees,
    preview: {
      bg: "#05130b",
      card: "#092214",
      accent: "#10b981",
      text: "#ecfdf5",
    },
  },
  {
    id: "purple",
    name: "Royal Amethyst",
    category: "Dark",
    description: "Luxury deep violet and indigo with bright neon purple tech glow.",
    icon: Gem,
    preview: {
      bg: "#0b0716",
      card: "#150d2a",
      accent: "#a855f7",
      text: "#faf5ff",
    },
  },
  {
    id: "sepia",
    name: "Warm Editorial",
    category: "Warm",
    description: "Warm parchment paper with amber and bronze. Ideal for long reading.",
    icon: BookOpen,
    preview: {
      bg: "#fbf6ee",
      card: "#ffffff",
      accent: "#d97706",
      text: "#292524",
    },
  },
];

const FONTS: FontOption[] = [
  {
    id: "inter",
    name: "Inter",
    category: "Modern Sans",
    description: "Industry-standard clean sans-serif with high readability on all screens.",
    cssFamily: "'Inter', -apple-system, sans-serif",
    sample: "Subarna Lodh • Artificial Intelligence & COA Platform",
  },
  {
    id: "mono",
    name: "Fira / JetBrains Mono",
    category: "Developer Code",
    description: "Crisp monospace terminal font, ideal for algorithms and engineering.",
    cssFamily: "'Fira Code', 'JetBrains Mono', monospace",
    sample: "const student = { name: 'Subarna Lodh', branch: 'CSE (AI)' };",
  },
  {
    id: "serif",
    name: "Merriweather",
    category: "Academic Serif",
    description: "Editorial research paper style with elegant serifs and scholarly tone.",
    cssFamily: "'Merriweather', Georgia, serif",
    sample: "Computer Organization & Architecture • Research Portfolio",
  },
  {
    id: "geometric",
    name: "Plus Jakarta Sans",
    category: "Geometric Sans",
    description: "Contemporary, premium geometric typeface with wide proportion.",
    cssFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    sample: "Designing modern software and intelligent AI architectures.",
  },
  {
    id: "system",
    name: "System UI",
    category: "Native Platform",
    description: "Native OS system typography (Segoe UI / San Francisco / Roboto).",
    cssFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    sample: "Fastest native rendering engine with zero network overhead.",
  },
];

export default function ThemeAndFontController() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"themes" | "fonts">("themes");
  const [currentTheme, setCurrentTheme] = useState<ThemeId>("light");
  const [currentFont, setCurrentFont] = useState<FontId>("inter");
  const [currentFontSize, setCurrentFontSize] = useState<FontSizeId>("normal");

  // Read saved preferences on initial mount
  useEffect(() => {
    const savedTheme = (localStorage.getItem("subarna_theme") as ThemeId) || "light";
    const savedFont = (localStorage.getItem("subarna_font") as FontId) || "inter";
    const savedSize = (localStorage.getItem("subarna_font_size") as FontSizeId) || "normal";

    // Synchronize React state asynchronously to avoid cascading render lint rule
    queueMicrotask(() => {
      setCurrentTheme(savedTheme);
      setCurrentFont(savedFont);
      setCurrentFontSize(savedSize);
    });

    document.documentElement.setAttribute("data-theme", savedTheme);
    document.documentElement.setAttribute("data-font", savedFont);
    document.documentElement.setAttribute("data-font-size", savedSize);

    // Listen to custom event to open the panel from navbar or other buttons
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-theme-customizer", handleOpen);

    // Keyboard ESC to close
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("open-theme-customizer", handleOpen);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const selectTheme = (themeId: ThemeId) => {
    setCurrentTheme(themeId);
    document.documentElement.setAttribute("data-theme", themeId);
    localStorage.setItem("subarna_theme", themeId);
  };

  const selectFont = (fontId: FontId) => {
    setCurrentFont(fontId);
    document.documentElement.setAttribute("data-font", fontId);
    localStorage.setItem("subarna_font", fontId);
  };

  const selectFontSize = (sizeId: FontSizeId) => {
    setCurrentFontSize(sizeId);
    document.documentElement.setAttribute("data-font-size", sizeId);
    localStorage.setItem("subarna_font_size", sizeId);
  };

  const resetDefaults = () => {
    selectTheme("light");
    selectFont("inter");
    selectFontSize("normal");
  };

  return (
    <>
      {/* Floating Bottom-Left Studio Pill Button */}
      <button
        onClick={() => setIsOpen(true)}
        id="theme-font-studio-btn"
        className="fixed bottom-5 left-16 sm:left-20 z-40 flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-slate-900/95 hover:bg-slate-900 text-white shadow-xl hover:shadow-2xl border border-white/20 backdrop-blur-md transition-all duration-200 hover:scale-105 group focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        aria-label="Customize full-page theme and typography"
        title="Customize full-page themes & fonts"
      >
        <Palette className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
        <span className="text-xs font-bold tracking-wide">Themes & Fonts</span>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
      </button>

      {/* Modal / Dialog Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          {/* Modal Container */}
          <div
            className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="theme-dialog-title"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/70">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 text-white flex items-center justify-center shadow-md">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 id="theme-dialog-title" className="text-lg font-bold text-slate-900 leading-tight">
                    Theme & Typography Studio
                  </h3>
                  <p className="text-xs font-medium text-slate-500">
                    Applies live across every page section, card, and tool
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Helpful Notice regarding the Next.js 'N' button */}
            <div className="mx-6 mt-4 p-3 rounded-xl bg-blue-50/80 border border-blue-200/80 flex items-start gap-2.5 text-xs text-blue-900">
              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <span className="font-semibold">Next.js Dev Button Note:</span> The small black &apos;N&apos; button in the bottom-left is Next.js&apos;s internal developer tools overlay. Use this studio panel to change the real full-page themes and typography for Subarna Lodh&apos;s portfolio.
              </p>
            </div>

            {/* Tabs Bar */}
            <div className="flex items-center gap-2 px-6 pt-4 pb-2 border-b border-slate-100">
              <button
                onClick={() => setActiveTab("themes")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === "themes"
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Palette className="w-4 h-4" />
                <span>Full-Page Themes ({THEMES.length})</span>
              </button>

              <button
                onClick={() => setActiveTab("fonts")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === "fonts"
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Type className="w-4 h-4" />
                <span>Typography & Fonts ({FONTS.length})</span>
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* TAB 1: THEMES */}
              {activeTab === "themes" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Select a Professional Theme
                    </p>
                    <span className="text-xs text-slate-400">Instant full-page switch</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {THEMES.map((theme) => {
                      const Icon = theme.icon;
                      const isActive = currentTheme === theme.id;

                      return (
                        <div
                          key={theme.id}
                          onClick={() => selectTheme(theme.id)}
                          className={`relative p-4 rounded-2xl border-2 transition-all cursor-pointer text-left flex flex-col justify-between ${
                            isActive
                              ? "border-blue-600 bg-blue-50/30 shadow-md ring-2 ring-blue-500/20"
                              : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/70"
                          }`}
                        >
                          <div>
                            {/* Header row with Icon, Name & Active check */}
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div
                                  className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs shadow-xs"
                                  style={{ backgroundColor: theme.preview.accent }}
                                >
                                  <Icon className="w-4 h-4" />
                                </div>
                                <span className="text-sm font-bold text-slate-900">
                                  {theme.name}
                                </span>
                              </div>

                              {isActive && (
                                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white">
                                  <Check className="w-3 h-3 stroke-[3]" />
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                              {theme.description}
                            </p>
                          </div>

                          {/* Theme Color Palette Preview Bar */}
                          <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                            <span className="text-[10px] font-mono text-slate-400 uppercase">
                              Colors:
                            </span>
                            <div className="flex items-center gap-1.5">
                              <span
                                className="w-4 h-4 rounded-full border border-slate-300 shadow-xs"
                                style={{ backgroundColor: theme.preview.bg }}
                                title="Page Background"
                              />
                              <span
                                className="w-4 h-4 rounded-full border border-slate-300 shadow-xs"
                                style={{ backgroundColor: theme.preview.card }}
                                title="Card Surface"
                              />
                              <span
                                className="w-4 h-4 rounded-full shadow-xs"
                                style={{ backgroundColor: theme.preview.accent }}
                                title="Primary Accent"
                              />
                              <span
                                className="w-4 h-4 rounded-full border border-slate-300 shadow-xs"
                                style={{ backgroundColor: theme.preview.text }}
                                title="Text Foreground"
                              />
                            </div>
                            <span className="ml-auto text-[10px] font-semibold text-slate-400 uppercase">
                              {theme.category}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 2: FONTS */}
              {activeTab === "fonts" && (
                <div className="space-y-6">
                  {/* Font Family Selection */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Choose Typeface Family
                      </p>
                      <span className="text-xs text-slate-400">Affects all headings & body</span>
                    </div>

                    <div className="space-y-3">
                      {FONTS.map((font) => {
                        const isActive = currentFont === font.id;

                        return (
                          <div
                            key={font.id}
                            onClick={() => selectFont(font.id)}
                            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer text-left ${
                              isActive
                                ? "border-blue-600 bg-blue-50/30 shadow-md ring-2 ring-blue-500/20"
                                : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/70"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-slate-900">
                                  {font.name}
                                </span>
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold uppercase">
                                  {font.category}
                                </span>
                              </div>

                              {isActive && (
                                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white">
                                  <Check className="w-3 h-3 stroke-[3]" />
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-slate-500 mb-2">
                              {font.description}
                            </p>

                            {/* Live sample rendered in that exact font */}
                            <div
                              className="p-2.5 rounded-xl bg-slate-100/70 border border-slate-200 text-slate-800 text-xs sm:text-sm font-medium truncate"
                              style={{ fontFamily: font.cssFamily }}
                            >
                              {font.sample}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Font Size Scaling */}
                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-slate-500" />
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Font Size Scaling
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      {(
                        [
                          { id: "compact", label: "Compact", size: "15px" },
                          { id: "normal", label: "Standard", size: "16px" },
                          { id: "large", label: "Comfortable", size: "17.5px" },
                        ] as const
                      ).map((s) => (
                        <button
                          key={s.id}
                          onClick={() => selectFontSize(s.id)}
                          className={`px-3 py-2.5 rounded-xl border-2 text-xs font-bold transition-all ${
                            currentFontSize === s.id
                              ? "border-blue-600 bg-blue-50 text-blue-800 shadow-xs"
                              : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                          }`}
                        >
                          <div>{s.label}</div>
                          <div className="text-[10px] font-normal text-slate-400 mt-0.5">
                            {s.size}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/70">
              <button
                onClick={resetDefaults}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Default</span>
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold shadow-xs transition-all cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
