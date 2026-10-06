"use client";

import React from "react";
import { portfolioData } from "@/data/portfolio";
import NumberSystemConverter from "./NumberSystemConverter";
import {
  Cpu,
  Calculator,
  Binary,
  Layers,
  HardDrive,
  Network,
  RotateCw,
  Clock,
  Sparkles,
  CheckCircle,
} from "lucide-react";

export default function COATools() {
  const { futureCoaTools } = portfolioData;

  const iconMap: Record<string, React.ReactNode> = {
    "binary-arithmetic": <Calculator className="w-5 h-5 text-blue-600" />,
    "complements-calc": <Binary className="w-5 h-5 text-indigo-600" />,
    "cache-mapping": <Layers className="w-5 h-5 text-cyan-600" />,
    "physical-address": <HardDrive className="w-5 h-5 text-purple-600" />,
    "paging-translator": <Network className="w-5 h-5 text-emerald-600" />,
    "page-replacement": <RotateCw className="w-5 h-5 text-amber-600" />,
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
            Interactive tools for understanding important COA concepts.
          </p>
        </div>

        {/* Feature 1: Number System Converter */}
        <div className="max-w-5xl mx-auto">
          <NumberSystemConverter />
        </div>

        {/* Section 2: Future COA Tools — Coming Soon */}
        <div className="space-y-8 pt-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/80 text-slate-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Modular Architecture Roadmap</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              More COA Tools — Coming Soon
            </h3>
            <p className="text-sm text-slate-600">
              Dedicated simulator modules scheduled for progressive integration into the learning suite.
            </p>
          </div>

          {/* Cards Grid for the 7 requested tools */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {futureCoaTools.map((tool) => (
              <div
                key={tool.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Card Header & Badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {iconMap[tool.id] || <Cpu className="w-5 h-5 text-blue-600" />}
                    </div>
                    
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold font-mono tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
                      {tool.status}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold text-blue-700 uppercase tracking-wider">
                      {tool.category}
                    </span>
                    <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                      {tool.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
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
                  <span className="font-mono text-slate-500">v1.1 Target</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
