"use client";

import React from "react";
import { portfolioData } from "@/data/portfolio";
import { FileText, Download, ExternalLink, ShieldCheck, CheckCircle } from "lucide-react";

export default function ResumeCard() {
  const { student } = portfolioData;

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl border border-slate-800 my-12 relative overflow-hidden">
      {/* Background subtle grid */}
      <div className="absolute inset-0 tech-grid-pattern opacity-10 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        
        {/* Left side text and credentials */}
        <div className="space-y-4 max-w-2xl text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Verified Academic Document</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            My Resume
          </h3>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            View my academic background, technical skills, projects and achievements.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs text-slate-300">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              B.E. CSE (Microsoft AI)
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              Verified CGPA: 7.9
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              Microsoft Azure AZ-900
            </span>
          </div>
        </div>

        {/* Right side action buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <a
            href={student.documents.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-md transition-all group"
          >
            <FileText className="w-4 h-4" />
            <span>View Resume</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 transition-transform" />
          </a>

          <a
            href={student.documents.resumePdf}
            download="Subarna_Lodh_Resume.pdf"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-slate-100 font-semibold text-sm border border-slate-700 shadow-sm transition-all"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Download Resume</span>
          </a>
        </div>

      </div>
    </div>
  );
}
