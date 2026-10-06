"use client";

import React, { useState } from "react";
import { portfolioData, AchievementItem } from "@/data/portfolio";
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  X,
  Maximize2,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export default function Achievements() {
  const { achievements } = portfolioData;
  const [selectedItem, setSelectedItem] = useState<AchievementItem | null>(null);

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

          {/* Responsive Gallery Grid: 3-4 desktop, 2 tablet, 1 mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((item) => (
              <div
                key={item.title}
                onClick={() => setSelectedItem(item)}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg hover:border-blue-400 transition-all cursor-pointer group flex flex-col justify-between"
              >
                {/* Image / Placeholder Area */}
                <div className="relative aspect-16/10 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
                  <div className="absolute inset-0 tech-grid-pattern opacity-15 pointer-events-none"></div>

                  <div className="w-12 h-12 rounded-xl bg-blue-600/30 border border-blue-400/40 text-cyan-300 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <Award className="w-6 h-6" />
                  </div>

                  <span className="px-3 py-1 rounded-md bg-blue-500/20 text-cyan-300 font-mono text-xs font-bold border border-blue-400/30">
                    {item.placeholderText}
                  </span>

                  <p className="text-[11px] text-slate-400 mt-2">
                    Click to view details
                  </p>

                  <div className="absolute bottom-2 right-2 bg-slate-950/70 p-1.5 rounded-lg text-slate-300 group-hover:text-white transition-colors">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                {/* Card Content Info */}
                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold text-blue-700">{item.subtitle}</span>
                    <span className="flex items-center gap-1 font-mono">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {item.period}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-1">
                    {item.title}
                  </h4>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox / Modal for Item Details */}
        {selectedItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
            onClick={() => setSelectedItem(null)}
          >
            <div
              className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 relative animate-scaleUp"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Top Preview Area */}
              <div className="aspect-16/9 rounded-2xl bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex flex-col items-center justify-center p-6 text-center text-white relative overflow-hidden">
                <div className="w-14 h-14 rounded-2xl bg-blue-600/30 border border-blue-400/40 text-cyan-300 flex items-center justify-center mb-3">
                  <Award className="w-8 h-8" />
                </div>
                <div className="px-3.5 py-1.5 rounded-lg bg-blue-500/20 text-cyan-300 font-mono text-sm font-bold border border-blue-400/30">
                  {selectedItem.placeholderText}
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Image slot ready for student certificate upload
                </p>
              </div>

              {/* Modal Description Details */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-blue-700 uppercase tracking-wider">
                    {selectedItem.category} • {selectedItem.subtitle}
                  </span>
                  <span className="font-mono text-slate-500">{selectedItem.period}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  {selectedItem.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {selectedItem.description}
                </p>

                {/* Highlights */}
                <div className="pt-2 space-y-1.5">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Key Highlights
                  </p>
                  {selectedItem.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm transition-colors"
                >
                  Close Preview
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
