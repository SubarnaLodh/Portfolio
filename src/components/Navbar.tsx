"use client";

import React, { useState, useEffect, useRef } from "react";
import { portfolioData } from "@/data/portfolio";
import {
  Menu,
  X,
  FileText,
  Cpu,
  ExternalLink,
  Palette,
  ChevronDown,
  Check,
  Type,
  RotateCcw,
  Sliders,
} from "lucide-react";
import { useTheme, THEMES_LIST, FONTS_LIST } from "@/context/ThemeContext";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"themes" | "fonts">("themes");

  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    theme,
    setTheme,
    font,
    setFont,
    fontSize,
    setFontSize,
    resetDefaults,
  } = useTheme();

  // Scroll detection for sticky shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "About Me", href: "#about" },
    { label: "Education", href: "#education" },
    { label: "COA Tools", href: "#coa-tools" },
    { label: "Projects", href: "#project" },
    { label: "Achievements", href: "#achievements" },
    { label: "Assignments", href: "#assignments" },
    { label: "Contact", href: "#contact" },
  ];

  const currentThemeObj = THEMES_LIST.find((t) => t.id === theme) || THEMES_LIST[0];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200"
          : "bg-white/80 backdrop-blur-sm border-b border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo / Monogram */}
          <a
            href="#hero"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-900 to-indigo-950 text-white flex items-center justify-center font-bold tracking-tight shadow-sm group-hover:scale-105 transition-transform">
              <span className="text-sm font-black text-cyan-300">SL</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-900 text-base sm:text-lg leading-tight tracking-tight group-hover:text-blue-700 transition-colors">
                SUBARNA LODH
              </span>
              <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                Chandigarh University • B.E. CSE (AI)
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-blue-700 hover:bg-slate-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Direct Theme Dropdown Trigger Button */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen((prev) => !prev)}
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-full border transition-all cursor-pointer shadow-xs active:scale-95 ${
                  dropdownOpen
                    ? "bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-300"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200/90"
                }`}
                title="Select Theme & Font"
                aria-label="Select Theme & Font"
                aria-expanded={dropdownOpen}
              >
                <Palette className={`w-3.5 h-3.5 ${dropdownOpen ? "text-white" : "text-blue-600"}`} />
                <span>Theme</span>
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Instant Dropdown Popover */}
              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 sm:w-[500px] rounded-2xl bg-white shadow-2xl border border-slate-200 p-4 z-50 animate-in fade-in zoom-in-95 duration-150 theme-dropdown-popover">
                  {/* Dropdown Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">
                          Theme & Typography
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold uppercase">
                          {currentThemeObj.name}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Changes apply across the entire portfolio
                      </p>
                    </div>

                    <button
                      onClick={resetDefaults}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-slate-900 transition-colors p-1 rounded hover:bg-slate-100 cursor-pointer"
                      title="Reset Defaults"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset</span>
                    </button>
                  </div>

                  {/* Tabs */}
                  <div className="flex items-center gap-1.5 my-3 p-1 bg-slate-100 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setActiveTab("themes")}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        activeTab === "themes"
                          ? "bg-white text-slate-900 shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <Palette className="w-3.5 h-3.5" />
                      <span>Professional Themes (4)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab("fonts")}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        activeTab === "fonts"
                          ? "bg-white text-slate-900 shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <Type className="w-3.5 h-3.5" />
                      <span>Typography & Fonts</span>
                    </button>
                  </div>

                  {/* TAB 1: EXACTLY 4 THEMES (2x2 Grid Desktop, 1 Col Mobile) */}
                  {activeTab === "themes" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
                      {THEMES_LIST.map((th) => {
                        const isSelected = theme === th.id;
                        return (
                          <div
                            key={th.id}
                            onClick={() => setTheme(th.id)}
                            className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              isSelected
                                ? "border-blue-600 bg-blue-50/50 shadow-xs ring-1 ring-blue-500"
                                : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                            }`}
                          >
                            <div>
                              {/* Header: Name + Selected check badge */}
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-bold text-slate-900">
                                  {th.name}
                                </span>
                                {isSelected ? (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded-full">
                                    <Check className="w-3 h-3 stroke-[3]" />
                                    <span>Selected</span>
                                  </span>
                                ) : (
                                  <span className="text-[9px] font-semibold text-slate-400 uppercase">
                                    {th.badge}
                                  </span>
                                )}
                              </div>

                              <p className="text-[11px] text-slate-500 mb-2 leading-tight line-clamp-2">
                                {th.description}
                              </p>

                              {/* Miniature Theme Preview Box */}
                              <div
                                className="rounded-lg p-2 border mb-2 shadow-2xs"
                                style={{
                                  backgroundColor: th.colors.bg,
                                  borderColor: th.colors.border,
                                }}
                              >
                                <div
                                  className="h-2 rounded flex items-center px-1 mb-1.5"
                                  style={{
                                    backgroundColor:
                                      th.id === "corporate"
                                        ? th.colors.accent
                                        : th.colors.card,
                                    border: `1px solid ${th.colors.border}`,
                                  }}
                                >
                                  <div
                                    className="w-1.5 h-1.5 rounded-full"
                                    style={{
                                      backgroundColor:
                                        th.id === "corporate"
                                          ? "#FFFFFF"
                                          : th.colors.accent,
                                    }}
                                  />
                                </div>
                                <div
                                  className="p-1.5 rounded"
                                  style={{
                                    backgroundColor: th.colors.card,
                                    border: `1px solid ${th.colors.border}`,
                                  }}
                                >
                                  <div
                                    className="h-1.5 w-12 rounded mb-1"
                                    style={{ backgroundColor: th.colors.text }}
                                  />
                                  <div
                                    className="h-1 w-20 rounded mb-1.5 opacity-60"
                                    style={{ backgroundColor: th.colors.mutedText }}
                                  />
                                  <div
                                    className="h-2 w-10 rounded"
                                    style={{ backgroundColor: th.colors.accent }}
                                  />
                                </div>
                              </div>
                            </div>

                            {/* 4 Palette Swatches */}
                            <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                              <span className="text-[9px] font-mono text-slate-400 uppercase">
                                Palette
                              </span>
                              <div className="flex items-center gap-1.5">
                                <span
                                  className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-2xs"
                                  style={{ backgroundColor: th.colors.bg }}
                                  title="Background"
                                />
                                <span
                                  className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-2xs"
                                  style={{ backgroundColor: th.colors.card }}
                                  title="Surface"
                                />
                                <span
                                  className="w-3.5 h-3.5 rounded-full shadow-2xs"
                                  style={{ backgroundColor: th.colors.accent }}
                                  title="Primary Accent"
                                />
                                <span
                                  className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-2xs"
                                  style={{ backgroundColor: th.colors.text }}
                                  title="Text"
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* TAB 2: TYPOGRAPHY & FONTS */}
                  {activeTab === "fonts" && (
                    <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                      <div className="space-y-1.5">
                        {FONTS_LIST.map((f) => {
                          const isSelected = font === f.id;
                          return (
                            <button
                              key={f.id}
                              type="button"
                              onClick={() => setFont(f.id)}
                              className={`w-full p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                isSelected
                                  ? "border-blue-600 bg-blue-50/50 shadow-xs ring-1 ring-blue-500"
                                  : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                              }`}
                            >
                              <div className="min-w-0 pr-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-slate-900">
                                    {f.name}
                                  </span>
                                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-500 font-semibold uppercase">
                                    {f.category}
                                  </span>
                                </div>
                                <p
                                  className="text-xs text-slate-700 truncate mt-0.5"
                                  style={{ fontFamily: f.cssFamily }}
                                >
                                  {f.sample}
                                </p>
                              </div>

                              {isSelected && (
                                <Check className="w-4 h-4 text-blue-600 shrink-0 stroke-[3]" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Font Size Scaling */}
                      <div className="pt-2 border-t border-slate-100">
                        <div className="flex items-center gap-1.5 mb-1.5 text-[11px] font-semibold text-slate-500">
                          <Sliders className="w-3 h-3" />
                          <span>Font Size Scale:</span>
                        </div>
                        <div className="grid grid-cols-3 gap-1.5">
                          {(
                            [
                              { id: "compact", label: "Compact" },
                              { id: "normal", label: "Standard" },
                              { id: "large", label: "Comfortable" },
                            ] as const
                          ).map((s) => (
                            <button
                              key={s.id}
                              type="button"
                              onClick={() => setFontSize(s.id)}
                              className={`py-1 px-2 rounded-lg text-[11px] font-semibold transition-all cursor-pointer border ${
                                fontSize === s.id
                                  ? "border-blue-600 bg-blue-50 text-blue-700"
                                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
                              }`}
                            >
                              {s.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Dropdown Footer */}
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Persistent across visits</span>
                    <button
                      type="button"
                      onClick={() => setDropdownOpen(false)}
                      className="px-3 py-1 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors cursor-pointer text-xs"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>

            <a
              href="#coa-tools"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80 hover:bg-blue-100 transition-colors"
            >
              <Cpu className="w-3.5 h-3.5 text-blue-600" />
              <span>COA Tools</span>
            </a>
            <a
              href={portfolioData.student.documents.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-blue-700 text-white hover:bg-blue-800 shadow-sm transition-all hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <FileText className="w-4 h-4" />
              <span>Resume</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={portfolioData.student.documents.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="sm:hidden inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-md bg-blue-700 text-white"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-800 hover:bg-blue-50 hover:text-blue-700 transition-colors"
            >
              {link.label}
            </a>
          ))}

          {/* Mobile Theme Selector: Exactly 4 Themes */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <div className="px-3 text-xs font-bold text-slate-500 uppercase tracking-wider">
              Professional Themes (4)
            </div>
            <div className="grid grid-cols-1 gap-2 px-3">
              {THEMES_LIST.map((th) => (
                <button
                  key={th.id}
                  onClick={() => setTheme(th.id)}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-between ${
                    theme === th.id
                      ? "border-blue-600 bg-blue-50 text-blue-800 ring-1 ring-blue-500"
                      : "border-slate-200 text-slate-700 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full border border-slate-300"
                      style={{ backgroundColor: th.colors.accent }}
                    />
                    <span>{th.name}</span>
                  </div>
                  {theme === th.id && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-blue-700 font-bold bg-blue-100 px-1.5 py-0.5 rounded-full">
                      <Check className="w-3 h-3 stroke-[3]" />
                      <span>Selected</span>
                    </span>
                  )}
                </button>
              ))}
            </div>

            <a
              href={portfolioData.student.documents.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full mt-3 py-2.5 rounded-lg bg-blue-700 text-white font-medium text-sm shadow-sm"
            >
              <FileText className="w-4 h-4" />
              <span>Open Complete Resume (PDF)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
