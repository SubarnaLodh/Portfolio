"use client";

import React from "react";
import NumberSystemConverter from "./NumberSystemConverter";
import { Cpu } from "lucide-react";

export default function COATools() {
  return (
    <section id="coa-tools" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5 text-blue-700" />
            <span>Interactive Academic Suite</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Computer Organization & Architecture Tools
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Interactive tools for understanding important COA concepts.
          </p>
        </div>

        {/* Feature: Number System Converter */}
        <div className="max-w-5xl mx-auto">
          <NumberSystemConverter />
        </div>

      </div>
    </section>
  );
}
