"use client";

import React, { useState } from "react";
import NumberSystemConverter from "./NumberSystemConverter";
import BinaryArithmeticCalculator from "./BinaryArithmeticCalculator";
import { portfolioData } from "@/data/portfolio";
import {
  Cpu,
  Binary,
  Layers,
  Database,
  RefreshCw,
  Clock,
  Sparkles,
  CheckCircle,
  FileCode2,
} from "lucide-react";

export default function COATools() {
  const { futureCoaTools } = portfolioData;
  const [activeTab, setActiveTab] = useState<"converter" | "alu">("converter");

  const toolIconMap: Record<string, React.ReactNode> = {
    "binary-arithmetic": <Binary className="w-5 h-5 text-blue-600" />,
    "cache-mapping": <Database className="w-5 h-5 text-indigo-600" />,
    "physical-address": <Cpu className="w-5 h-5 text-cyan-600" />,
    "paging-translator": <FileCode2 className="w-5 h-5 text-teal-600" />,
    "page-replacement": <RefreshCw className="w-5 h-5 text-amber-600" />,
    "cpu-scheduling": <Clock className="w-5 h-5 text-rose-600" />,
  };

  return (
    <section id="coa-tools" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
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
                  NEW
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

        {/* Section 2: Future COA Tools — Roadmap & Scheduled Modules */}
        {futureCoaTools && futureCoaTools.length > 0 && (
          <div className="space-y-8 pt-6 max-w-5xl mx-auto">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-200/60">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Modular Architecture Roadmap</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                More COA Tools — Simulator Roadmap
              </h3>
              <p className="text-sm text-slate-600">
                Specialized architectural simulation modules scheduled for progressive integration into the learning suite.
              </p>
            </div>

            {/* Cards Grid for the COA tools */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {futureCoaTools.map((tool) => {
                const isActive = tool.status === "ACTIVE";

                return (
                  <div
                    key={tool.id}
                    className={`rounded-2xl p-6 border shadow-xs hover:shadow-md transition-all flex flex-col justify-between group ${
                      isActive
                        ? "bg-white border-blue-300 ring-1 ring-blue-100"
                        : "bg-white border-slate-200 hover:border-blue-300"
                    }`}
                  >
                    <div className="space-y-4">
                      {/* Card Header & Badge */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs">
                          {toolIconMap[tool.id] || <Cpu className="w-5 h-5 text-blue-600" />}
                        </div>
                        
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold font-mono tracking-wider border ${
                            isActive
                              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                              : "bg-amber-50 text-amber-800 border-amber-200"
                          }`}
                        >
                          {tool.status}
                        </span>
                      </div>

                      <div>
                        <span className="text-[11px] font-semibold text-blue-700 uppercase tracking-wider block">
                          {tool.category}
                        </span>
                        <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors mt-0.5">
                          {tool.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                          {tool.description}
                        </p>
                      </div>

                      {/* Planned Feature Bullets */}
                      <div className="space-y-1.5 pt-2">
                        {tool.features.map((feat) => (
                          <div key={feat} className="flex items-center gap-2 text-xs text-slate-600">
                            <CheckCircle className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                      <span>Architecture Module</span>
                      {isActive ? (
                        <button
                          type="button"
                          onClick={() => {
                            setActiveTab("alu");
                            window.scrollTo({
                              top: document.getElementById("coa-tools")?.offsetTop || 0,
                              behavior: "smooth",
                            });
                          }}
                          className="font-bold text-blue-700 hover:underline"
                        >
                          Try Simulator ↑
                        </button>
                      ) : (
                        <span className="font-mono text-slate-500">v1.1 Target</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
