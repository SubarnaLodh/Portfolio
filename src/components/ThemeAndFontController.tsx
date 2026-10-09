"use client";

import React, { useState, useEffect } from "react";
import {
  Palette,
  Type,
  X,
  Check,
  RotateCcw,
  Sparkles,
  Sliders,
} from "lucide-react";
import { useTheme, THEMES_LIST, FONTS_LIST } from "@/context/ThemeContext";

export default function ThemeAndFontController() {
  const {
    theme,
    setTheme,
    font,
    setFont,
    fontSize,
    setFontSize,
    resetDefaults,
  } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"themes" | "fonts">("themes");

  // Keyboard shortcut: ESC closes modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
                    Full-Page Theme & Typography Studio
                  </h3>
                  <p className="text-xs font-medium text-slate-500">
                    Applies live across every page section, card, and tool
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs Bar */}
            <div className="flex items-center gap-2 px-6 pt-4 pb-2 border-b border-slate-100">
              <button
                onClick={() => setActiveTab("themes")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === "themes"
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Palette className="w-4 h-4" />
                <span>Professional Themes (4)</span>
              </button>

              <button
                onClick={() => setActiveTab("fonts")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === "fonts"
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Type className="w-4 h-4" />
                <span>Typography & Fonts</span>
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* TAB 1: EXACTLY 4 THEMES IN 2x2 GRID */}
              {activeTab === "themes" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Select a Professional Theme
                    </p>
                    <span className="text-xs text-slate-400">Instant full-page transformation</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {THEMES_LIST.map((th) => {
                      const isActive = theme === th.id;

                      return (
                        <div
                          key={th.id}
                          onClick={() => setTheme(th.id)}
                          tabIndex={0}
                          role="button"
                          aria-pressed={isActive}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              setTheme(th.id);
                            }
                          }}
                          className={`relative p-4 rounded-2xl border-2 transition-all cursor-pointer text-left flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            isActive
                              ? "border-blue-600 bg-blue-50/40 shadow-md ring-2 ring-blue-500/20"
                              : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/70"
                          }`}
                        >
                          <div>
                            {/* Header row with Theme Name, Badge & Selected Checkmark */}
                            <div className="flex items-center justify-between mb-1.5">
                              <div className="flex items-center gap-2">
                                <span
                                  className="w-3.5 h-3.5 rounded-full shadow-xs border border-slate-300"
                                  style={{ backgroundColor: th.colors.accent }}
                                />
                                <span className="text-sm font-bold text-slate-900">
                                  {th.name}
                                </span>
                              </div>

                              {isActive ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold shadow-xs">
                                  <Check className="w-3 h-3 stroke-[3]" />
                                  <span>Selected</span>
                                </span>
                              ) : (
                                <span className="text-[10px] font-semibold text-slate-400 uppercase">
                                  {th.badge}
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                              {th.description}
                            </p>

                            {/* Miniature Theme Preview Mockup */}
                            <div
                              className="rounded-xl p-2.5 border mb-3 shadow-2xs"
                              style={{
                                backgroundColor: th.colors.bg,
                                borderColor: th.colors.border,
                              }}
                            >
                              {/* Mini Navbar */}
                              <div
                                className="h-2.5 rounded-md flex items-center justify-between px-1.5 mb-2"
                                style={{
                                  backgroundColor:
                                    th.id === "corporate"
                                      ? th.colors.accent
                                      : th.colors.card,
                                  border: `1px solid ${th.colors.border}`,
                                }}
                              >
                                <div className="flex items-center gap-1">
                                  <div
                                    className="w-1.5 h-1.5 rounded-full"
                                    style={{
                                      backgroundColor:
                                        th.id === "corporate"
                                          ? "#FFFFFF"
                                          : th.colors.accent,
                                    }}
                                  />
                                  <div
                                    className="h-1 w-6 rounded opacity-80"
                                    style={{
                                      backgroundColor:
                                        th.id === "corporate"
                                          ? "#FFFFFF"
                                          : th.colors.text,
                                    }}
                                  />
                                </div>
                                <div
                                  className="h-1 w-3 rounded"
                                  style={{ backgroundColor: th.colors.accent }}
                                />
                              </div>

                              {/* Mini Hero Card */}
                              <div
                                className="p-2 rounded-lg"
                                style={{
                                  backgroundColor: th.colors.card,
                                  border: `1px solid ${th.colors.border}`,
                                }}
                              >
                                <div
                                  className="h-1.5 w-16 rounded mb-1"
                                  style={{ backgroundColor: th.colors.text }}
                                />
                                <div
                                  className="h-1 w-24 rounded mb-2 opacity-60"
                                  style={{ backgroundColor: th.colors.mutedText }}
                                />
                                <div className="flex items-center gap-1">
                                  <div
                                    className="h-2 w-10 rounded"
                                    style={{ backgroundColor: th.colors.accent }}
                                  />
                                  <div
                                    className="h-2 w-8 rounded opacity-40"
                                    style={{ backgroundColor: th.colors.border }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* 4 Theme Color Palette Swatches */}
                          <div className="flex items-center justify-between pt-2.5 border-t border-slate-100">
                            <span className="text-[10px] font-mono text-slate-400 uppercase">
                              Palette
                            </span>
                            <div className="flex items-center gap-1.5">
                              <span
                                className="w-4 h-4 rounded-full border border-slate-300 shadow-xs"
                                style={{ backgroundColor: th.colors.bg }}
                                title="Page Background"
                              />
                              <span
                                className="w-4 h-4 rounded-full border border-slate-300 shadow-xs"
                                style={{ backgroundColor: th.colors.card }}
                                title="Surface Card"
                              />
                              <span
                                className="w-4 h-4 rounded-full shadow-xs"
                                style={{ backgroundColor: th.colors.accent }}
                                title="Primary Accent"
                              />
                              <span
                                className="w-4 h-4 rounded-full border border-slate-300 shadow-xs"
                                style={{ backgroundColor: th.colors.text }}
                                title="Text Foreground"
                              />
                            </div>
                            <span className="text-[10px] font-semibold text-slate-500 uppercase px-1.5 py-0.5 rounded bg-slate-100">
                              {th.category}
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
                      {FONTS_LIST.map((f) => {
                        const isActive = font === f.id;

                        return (
                          <div
                            key={f.id}
                            onClick={() => setFont(f.id)}
                            tabIndex={0}
                            role="button"
                            aria-pressed={isActive}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                setFont(f.id);
                              }
                            }}
                            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              isActive
                                ? "border-blue-600 bg-blue-50/40 shadow-md ring-2 ring-blue-500/20"
                                : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/70"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-slate-900">
                                  {f.name}
                                </span>
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold uppercase">
                                  {f.category}
                                </span>
                              </div>

                              {isActive && (
                                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white">
                                  <Check className="w-3 h-3 stroke-[3]" />
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-slate-500 mb-2">
                              {f.description}
                            </p>

                            {/* Live sample rendered in that exact font */}
                            <div
                              className="p-2.5 rounded-xl bg-slate-100/70 border border-slate-200 text-slate-800 text-xs sm:text-sm font-medium truncate"
                              style={{ fontFamily: f.cssFamily }}
                            >
                              {f.sample}
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
                          onClick={() => setFontSize(s.id)}
                          className={`px-3 py-2.5 rounded-xl border-2 text-xs font-bold transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            fontSize === s.id
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
