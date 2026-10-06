"use client";

import React from "react";
import { portfolioData } from "@/data/portfolio";
import {
  FileCode,
  ExternalLink,
  Cpu,
  GitBranch,
  Terminal,
} from "lucide-react";
import { GitHubIcon } from "@/components/Icons";

export default function FeaturedProject() {
  const { featuredProject } = portfolioData;

  return (
    <section id="project" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            <span>Academic Software Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Featured Project
          </h2>
          <p className="text-base text-slate-600">
            Hardware-software co-design and architectural simulation highlighting core Computer Organization principles.
          </p>
        </div>

        {/* Featured Project Showcase Card */}
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl border border-slate-800 overflow-hidden">
            
            {/* Tech grid texture */}
            <div className="absolute inset-0 tech-grid-pattern opacity-15 pointer-events-none"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Details */}
              <div className="lg:col-span-7 space-y-6">
                
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-cyan-300 border border-blue-400/30">
                    {featuredProject.category}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1.5">
                    <GitBranch className="w-3.5 h-3.5" />
                    <span>Active Repository</span>
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    {featuredProject.title}
                  </h3>
                  <p className="text-sm font-mono text-cyan-400">
                    Instruction-Level Architecture Simulator
                  </p>
                </div>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {featuredProject.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {featuredProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-lg bg-slate-800/90 text-slate-200 text-xs font-medium border border-slate-700/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Primary Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
                  <a
                    href={featuredProject.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-md transition-all group"
                  >
                    <GitHubIcon className="w-4 h-4" />
                    <span>View GitHub Repository</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 transition-transform" />
                  </a>

                  <a
                    href={featuredProject.readmeUrl || featuredProject.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-sm border border-slate-700 shadow-xs transition-all"
                  >
                    <FileCode className="w-4 h-4 text-cyan-400" />
                    <span>View README</span>
                  </a>
                </div>

              </div>

              {/* Right Column: Visual Architecture Preview */}
              <div className="lg:col-span-5">
                <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 space-y-4 font-mono shadow-inner text-xs">
                  
                  {/* Console header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-slate-400">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                      <span>isa_simulator.log</span>
                    </div>
                    <span className="text-emerald-400 font-semibold">ONLINE</span>
                  </div>

                  {/* Simulated ISA Pipeline */}
                  <div className="space-y-2 text-slate-300">
                    <p className="text-slate-500">// Fetch - Decode - Execute Simulation</p>
                    <div className="p-2.5 rounded bg-slate-950 border border-slate-800/80 space-y-1">
                      <p className="text-blue-400">PC: 0x0040 [FETCH]</p>
                      <p className="text-amber-300">INSTRUCTION: LOAD R1, [0x1024]</p>
                      <p className="text-emerald-300">ALU STATUS: ZERO=0, CARRY=0</p>
                    </div>
                    <div className="p-2.5 rounded bg-slate-950 border border-slate-800/80 space-y-1">
                      <p className="text-blue-400">PC: 0x0044 [DECODE]</p>
                      <p className="text-amber-300">INSTRUCTION: ADD R1, R2</p>
                      <p className="text-purple-300">RESULT REG: R1 &lt;= 0x003F</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Target: x86 / RISC Concepts</span>
                    <span className="text-cyan-400">UID: 25BAI10051</span>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
