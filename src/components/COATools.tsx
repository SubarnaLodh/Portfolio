"use client";

import React, { useState } from "react";
import NumberSystemConverter from "./NumberSystemConverter";
import BinaryArithmeticCalculator from "./BinaryArithmeticCalculator";
import { Cpu, Binary, Layers } from "lucide-react";

export default function COATools() {
  const [activeTab, setActiveTab] = useState<"converter" | "alu">("converter");

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
            Hands-on simulation tools for understanding foundational computer architecture, number systems, and hardware microoperations.
          </p>

          {/* Interactive Tool Selector Tabs */}
          <div className="pt-4 flex justify-center">
            <div className="inline-flex p-1.5 bg-slate-200/80 rounded-2xl border border-slate-300 shadow-2xs">
              <button
                type="button"
                onClick={() => setActiveTab("converter")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === "converter"
                    ? "bg-white text-blue-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Layers className="w-4 h-4 text-blue-600" />
                <span>Number System Converter</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("alu")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === "alu"
                    ? "bg-white text-blue-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Binary className="w-4 h-4 text-indigo-600" />
                <span>Binary ALU & Complements</span>
                <span className="px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
                  ACTIVE
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Active Interactive Feature Tool */}
        <div className="max-w-5xl mx-auto">
          {activeTab === "converter" ? (
            <NumberSystemConverter />
          ) : (
            <BinaryArithmeticCalculator />
          )}
        </div>

      </div>
    </section>
  );
}
