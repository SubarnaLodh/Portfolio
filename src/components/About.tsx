"use client";

import React from "react";
import { portfolioData } from "@/data/portfolio";
import {
  User,
  GraduationCap,
  Wrench,
  Target,
  CheckCircle2,
  Cpu,
  Brain,
  Code,
  Layers,
  Workflow,
  Sparkles,
} from "lucide-react";

export default function About() {
  const { student } = portfolioData;

  return (
    <section id="about" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <User className="w-3.5 h-3.5" />
            <span>Profile Overview</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            About Me
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            A comprehensive look at my academic foundation, technical core, and aspirations in software and artificial intelligence.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: About Me */}
          <div className="bg-slate-50/80 rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-700 text-white flex items-center justify-center font-bold shadow-xs">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">About Me</h3>
                  <p className="text-xs font-medium text-slate-500">Student Profile & Core Strengths</p>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {student.aboutBio}
              </p>

              {/* Strengths list */}
              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                  Core Strengths
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {student.strengths.map((strength) => (
                    <div
                      key={strength}
                      className="flex items-center gap-2 p-2 rounded-lg bg-white border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{strength}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
              <span>Section: {student.section}</span>
              <span>Mentor: {student.submittedTo}</span>
            </div>
          </div>

          {/* Card 2: Academic Interests */}
          <div className="bg-slate-50/80 rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-700 text-white flex items-center justify-center font-bold shadow-xs">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Academic Interests</h3>
                  <p className="text-xs font-medium text-slate-500">Domains of Study & Exploration</p>
                </div>
              </div>

              <p className="text-sm text-slate-600">
                Focused on low-level computing paradigms, modern intelligent systems, algorithmic efficiency, and automation pipelines.
              </p>

              <div className="space-y-2.5 pt-2">
                {student.academicInterests.map((interest, idx) => {
                  const icons = [Code, Brain, Workflow, Layers, Cpu];
                  const Icon = icons[idx % icons.length];
                  return (
                    <div
                      key={interest}
                      className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200/90 shadow-2xs hover:border-blue-300 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-semibold text-slate-800">{interest}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200/80 text-xs text-slate-500">
              Department of Computer Science & Engineering
            </div>
          </div>

          {/* Card 3: Technical Skills */}
          <div className="bg-slate-50/80 rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-700 text-white flex items-center justify-center font-bold shadow-xs">
                  <Wrench className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Technical Skills</h3>
                  <p className="text-xs font-medium text-slate-500">Verified Technical Toolset</p>
                </div>
              </div>

              <p className="text-sm text-slate-600">
                Practical programming languages, systems foundations, and automated workflow orchestrations grounded in coursework and projects.
              </p>

              <div className="space-y-3 pt-2">
                {student.technicalSkills.map((cat) => (
                  <div key={cat.category} className="bg-white p-3 rounded-xl border border-slate-200/90">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      {cat.category}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.items.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 text-slate-800 hover:text-blue-700 font-semibold text-xs rounded-md border border-slate-200 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200/80 text-xs text-slate-500">
              Consistent focus on clean architecture & testable code
            </div>
          </div>

          {/* Card 4: Future Goals */}
          <div className="bg-slate-50/80 rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold shadow-xs">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Future Goals</h3>
                    <p className="text-xs font-medium text-slate-500">Academic & Career Horizons</p>
                  </div>
                </div>
                
                {/* Placeholder badge as explicitly specified */}
                <span className="text-[11px] font-mono font-semibold px-2.5 py-1 bg-amber-100/80 text-amber-900 border border-amber-300 rounded-md">
                  {student.futureGoals.placeholder}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3">
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic">
                  &ldquo;{student.futureGoals.statement}&rdquo;
                </p>
              </div>

              <div className="space-y-2 pt-1 text-xs sm:text-sm text-slate-600">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Deepen understanding of instruction sets, CPU microarchitectures, and hardware accelerators.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Build intelligent software applications utilizing modern machine learning frameworks.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Scale workflow automation and system reliability through modern DevOps & n8n orchestration.</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
              <span>Status: Active Academic Pathway</span>
              <span className="font-mono text-amber-700 font-medium">Ready for updates</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
