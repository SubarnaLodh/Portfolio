"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NumberSystemConverter from "@/components/NumberSystemConverter";
import { Cpu, Binary, BookOpen, Sparkles } from "lucide-react";

export default function COAToolsPage() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-blue-100 selection:text-blue-900">
      {/* Sticky Navigation Bar */}
      <Navbar />

      <main className="flex-1 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Compact Page Heading & Educational Introduction */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80 text-xs font-semibold uppercase tracking-wider shadow-2xs">
              <Cpu className="w-3.5 h-3.5 text-blue-600" />
              <span>COA Tools • Computer Organization & Architecture</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Number System Converter
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Interactive academic tool developed for real-time radix conversion between Binary (Base 2), Octal (Base 8), Decimal (Base 10), and Hexadecimal (Base 16) formats, featuring hardware register bit inspections and comprehensive mathematical step-by-step derivations.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                <Binary className="w-3 h-3 text-cyan-600" /> Multi-Base Equivalence
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                <Sparkles className="w-3 h-3 text-blue-600" /> Hardware Bit Register (Nibbles)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                <BookOpen className="w-3 h-3 text-indigo-600" /> Mathematical Derivations
              </span>
            </div>
          </div>

          {/* Preserved Number System Converter */}
          <div className="max-w-5xl mx-auto">
            <NumberSystemConverter />
          </div>

        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
