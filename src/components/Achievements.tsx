"use client";

import React, { useState, useEffect } from "react";
import { portfolioData, AchievementItem } from "@/data/portfolio";
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  X,
  Maximize2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Achievements() {
  const { achievements } = portfolioData;
  const [selectedItem, setSelectedItem] = useState<AchievementItem | null>(null);

  const currentIndex = selectedItem
    ? achievements.findIndex((a) => a.title === selectedItem.title)
    : -1;

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex > 0) {
      setSelectedItem(achievements[currentIndex - 1]);
    } else {
      setSelectedItem(achievements[achievements.length - 1]);
    }
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex < achievements.length - 1) {
      setSelectedItem(achievements[currentIndex + 1]);
    } else {
      setSelectedItem(achievements[0]);
    }
  };

  // Accessible keyboard navigation for lightbox
  useEffect(() => {
    if (!selectedItem) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedItem(null);
      } else if (e.key === "ArrowLeft") {
        const idx = achievements.findIndex((a) => a.title === selectedItem.title);
        if (idx > 0) setSelectedItem(achievements[idx - 1]);
        else setSelectedItem(achievements[achievements.length - 1]);
      } else if (e.key === "ArrowRight") {
        const idx = achievements.findIndex((a) => a.title === selectedItem.title);
        if (idx < achievements.length - 1) setSelectedItem(achievements[idx + 1]);
        else setSelectedItem(achievements[0]);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItem, achievements]);

  return (
    <section id="achievements" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Honors & Certifications</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Achievements & Gallery
          </h2>
          <p className="text-base text-slate-600">
            Competitions, official Microsoft certifications, and academic milestones achieved during university studies.
          </p>
        </div>

        {/* Featured Achievements Cards (Top Highlights) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Highlight 1: Ideathon 2026 */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Academic Achievement</span>
                </span>
                <span className="text-xs font-mono text-slate-500 font-semibold">Year 2026</span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Integrated Green Mobility Ideathon 2026
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-blue-700 mt-1">
                  Active Participant & Ideator
                </p>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                Participated in the university-recognized Integrated Green Mobility Ideathon 2026, creating and pitching software-driven concepts for smart, eco-friendly transit and electric infrastructure.
              </p>

              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Sustainable transport concept modeling</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Interdisciplinary problem-solving and presentation</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>Chandigarh University Academic Events</span>
              <span className="font-semibold text-slate-600">Ideathon</span>
            </div>
          </div>

          {/* Highlight 2: Microsoft Azure AZ-900 */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span>Professional Certification</span>
                </span>
                <span className="text-xs font-mono text-slate-500 font-semibold">Microsoft Verified</span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Microsoft Azure Fundamentals AZ-900
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-blue-700 mt-1">
                  Cloud Concepts, Security, & Governance
                </p>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                Earned foundational certification from Microsoft verifying comprehensive mastery of cloud computing services, high-availability architecture, network security, and compliance.
              </p>

              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Core Azure compute, storage, and networking</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Cloud security, defense-in-depth, & privacy standards</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>Microsoft Certified</span>
              <span className="font-semibold text-slate-600">AZ-900</span>
            </div>
          </div>

        </div>

        {/* Gallery Section */}
        <div className="space-y-6 pt-4">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <h3 className="text-2xl font-bold text-slate-900">
              Achievements Gallery
            </h3>
            <p className="text-sm text-slate-500">
              Interactive visual gallery for certificates, event photographs, and competition credentials.
            </p>
          </div>

          {/* Responsive Gallery Grid: 3 columns desktop, 2 columns tablet, 1 column mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((item) => (
              <div
                key={item.title}
                onClick={() => setSelectedItem(item)}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-400 transition-all cursor-pointer group flex flex-col justify-between"
              >
                {/* Image / Thumbnail Preview Area (Consistent height across cards) */}
                {item.imageUrl ? (
                  <div className="relative w-full h-52 sm:h-56 bg-slate-900 flex items-center justify-center p-3 overflow-hidden border-b border-slate-200/50">
                    <div className="absolute inset-0 tech-grid-pattern opacity-10 pointer-events-none"></div>

                    {/* Actual Certificate Image - 100% width/height, object-fit contain, no cropping */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.imageUrl}
                      alt={`Certificate: ${item.title}`}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                      loading="lazy"
                    />

                    {/* Category pill */}
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-slate-900/85 backdrop-blur-xs text-cyan-300 text-[10px] font-semibold border border-cyan-500/20 shadow-xs">
                      {item.category}
                    </div>

                    {/* "Click to view details" indicator */}
                    <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-md bg-slate-900/85 backdrop-blur-xs text-slate-300 text-[11px] font-medium border border-slate-700/60 shadow-xs flex items-center gap-1 opacity-90 group-hover:opacity-100 group-hover:text-white transition-opacity">
                      <span>Click to view details</span>
                    </div>

                    {/* Corner expand icon */}
                    <div className="absolute bottom-2.5 right-2.5 bg-slate-900/85 backdrop-blur-xs p-1.5 rounded-lg text-slate-300 group-hover:text-white group-hover:bg-blue-600 transition-all shadow-xs border border-slate-700/60">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full h-52 sm:h-56 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex flex-col items-center justify-center p-6 text-center overflow-hidden border-b border-slate-200/50">
                    <div className="absolute inset-0 tech-grid-pattern opacity-15 pointer-events-none"></div>

                    <div className="w-12 h-12 rounded-xl bg-blue-600/30 border border-blue-400/40 text-cyan-300 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <Award className="w-6 h-6" />
                    </div>

                    <span className="px-3 py-1 rounded-md bg-blue-500/20 text-cyan-300 font-mono text-xs font-bold border border-blue-400/30">
                      {item.placeholderText || item.title}
                    </span>

                    <p className="text-[11px] text-slate-400 mt-2">
                      Click to view details
                    </p>

                    <div className="absolute bottom-2.5 right-2.5 bg-slate-950/70 p-1.5 rounded-lg text-slate-300 group-hover:text-white transition-colors">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>
                )}

                {/* Card Content Info */}
                <div className="p-5 space-y-2.5 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="font-semibold text-blue-700 truncate max-w-[65%]">
                        {item.subtitle}
                      </span>
                      <span className="flex items-center gap-1 font-mono shrink-0">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {item.period}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2">
                      {item.title}
                    </h4>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                      {item.category}
                    </span>
                    <span className="text-blue-600 font-semibold group-hover:translate-x-0.5 transition-transform">
                      Inspect Certificate →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Lightbox / Modal for Item Details */}
        {selectedItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-sm animate-fadeIn"
            onClick={() => setSelectedItem(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`Certificate viewer: ${selectedItem.title}`}
          >
            <div
              className="bg-white rounded-3xl max-w-3xl w-full p-5 sm:p-8 space-y-5 shadow-2xl border border-slate-200 relative animate-scaleUp max-h-[92vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 bg-white/80 backdrop-blur-xs border border-slate-200 transition-colors shadow-xs"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Top Preview Area: Full Original Image without distortion */}
              {selectedItem.imageUrl ? (
                <div className="relative rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center p-3 sm:p-6 overflow-hidden min-h-[240px] max-h-[58vh]">
                  <div className="absolute inset-0 tech-grid-pattern opacity-10 pointer-events-none"></div>

                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedItem.imageUrl}
                    alt={selectedItem.title}
                    className="max-h-[52vh] w-auto max-w-full object-contain rounded-md shadow-2xl border border-slate-800"
                  />

                  {/* Prev Button */}
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/85 hover:bg-blue-600 text-white border border-slate-700/80 transition-all hover:scale-110 shadow-lg cursor-pointer"
                    aria-label="Previous certificate"
                    title="Previous certificate (Left Arrow)"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {/* Next Button */}
                  <button
                    type="button"
                    onClick={handleNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/85 hover:bg-blue-600 text-white border border-slate-700/80 transition-all hover:scale-110 shadow-lg cursor-pointer"
                    aria-label="Next certificate"
                    title="Next certificate (Right Arrow)"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Index indicator */}
                  <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-xs text-[11px] font-mono text-slate-300 border border-slate-700/50">
                    {currentIndex + 1} / {achievements.length}
                  </div>
                </div>
              ) : (
                <div className="relative aspect-16/9 rounded-2xl bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex flex-col items-center justify-center p-6 text-center text-white overflow-hidden">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600/30 border border-blue-400/40 text-cyan-300 flex items-center justify-center mb-3">
                    <Award className="w-8 h-8" />
                  </div>
                  <div className="px-3.5 py-1.5 rounded-lg bg-blue-500/20 text-cyan-300 font-mono text-sm font-bold border border-blue-400/30">
                    {selectedItem.placeholderText || selectedItem.title}
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    Verified academic coursework & COA tooling milestone
                  </p>
                </div>
              )}

              {/* Modal Description Details */}
              <div className="space-y-3 pt-1">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-semibold text-blue-700 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60">
                    {selectedItem.category} • {selectedItem.subtitle}
                  </span>
                  <span className="font-mono text-slate-500 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {selectedItem.period}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  {selectedItem.title}
                </h3>

                {selectedItem.organizer && (
                  <p className="text-xs text-slate-500 font-medium">
                    <span className="font-semibold text-slate-700">Organizer / Issuer:</span> {selectedItem.organizer}
                  </p>
                )}

                {selectedItem.team && (
                  <p className="text-xs text-slate-500 font-medium">
                    <span className="font-semibold text-slate-700">Team:</span> {selectedItem.team}
                  </p>
                )}

                <p className="text-sm text-slate-600 leading-relaxed">
                  {selectedItem.description}
                </p>

                {/* Highlights */}
                {selectedItem.highlights && selectedItem.highlights.length > 0 && (
                  <div className="pt-2 space-y-1.5">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Key Highlights & Verification
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedItem.highlights.map((h) => (
                        <div key={h} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 p-2 rounded-lg bg-slate-50 border border-slate-100">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer navigation */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="text-slate-400">
                  Use <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-300 font-mono text-[10px]">Esc</kbd> to close, <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-300 font-mono text-[10px]">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-300 font-mono text-[10px]">→</kbd> to navigate
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors font-medium cursor-pointer"
                  >
                    ← Prev
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors font-medium cursor-pointer"
                  >
                    Next →
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedItem(null)}
                    className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
