"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { portfolioData } from "@/data/portfolio";
import { ArrowDown, FileText, Sparkles, Code2, Cpu, BookOpen, ExternalLink } from "lucide-react";
import { LinkedInIcon, LeetCodeIcon } from "@/components/Icons";

export default function Hero() {
  const { student } = portfolioData;

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-slate-200"
    >
      {/* Subtle tech grid background */}
      <div className="absolute inset-0 tech-grid-pattern pointer-events-none opacity-60"></div>
      
      {/* Delicate ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none -z-0"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            
            {/* Academic Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-800 text-xs sm:text-sm font-semibold shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span>Chandigarh University • Microsoft AI Collaboration</span>
            </div>

            {/* Main Greeting & Name */}
            <div className="space-y-2">
              <p className="text-base sm:text-lg font-semibold tracking-wide text-blue-700 uppercase">
                Hi, I&apos;m
              </p>
              <h1 className="text-4xl sm:text-6xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-none">
                {student.name.toUpperCase()}
              </h1>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-2 text-sm sm:text-base font-medium text-slate-700">
                <span className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-md font-semibold text-slate-800">
                  {student.branch}
                </span>
                <span className="text-slate-400">•</span>
                <span className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-md font-semibold text-slate-800">
                  UID: {student.uid}
                </span>
                <span className="text-slate-400">•</span>
                <span className="px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-md font-semibold">
                  CGPA: {student.cgpa}
                </span>
              </div>
            </div>

            {/* Tagline & Supporting sentence */}
            <div className="space-y-3 max-w-2xl mx-auto lg:mx-0">
              <p className="text-xl sm:text-2xl font-bold text-slate-800 leading-snug">
                {student.tagline}
              </p>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                {student.supportingSentence}
              </p>
            </div>

            {/* Key Skill Highlights Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                <Code2 className="w-3.5 h-3.5 text-blue-600" /> Python, C & C++
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                <Cpu className="w-3.5 h-3.5 text-indigo-600" /> Computer Organization
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                <Sparkles className="w-3.5 h-3.5 text-cyan-600" /> n8n Automation
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                <BookOpen className="w-3.5 h-3.5 text-amber-600" /> Data Structures & Algorithms
              </span>
            </div>

            {/* Action Buttons & Social Profile Links */}
            <div className="space-y-3 pt-3">
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <a
                  href="#about"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm shadow-sm hover:shadow transition-all group"
                >
                  <span>Explore Portfolio</span>
                  <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                </a>

                <a
                  href={student.documents.resumePdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm border border-slate-300 shadow-xs hover:border-slate-400 transition-all"
                >
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>View Resume</span>
                </a>

                <Link
                  href="/coa-tools"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-xs transition-all"
                >
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span>Interactive COA Tool</span>
                </Link>
              </div>

              {/* Social Profile Buttons (LinkedIn & LeetCode) */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-0.5">
                <a
                  href={student.contact.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-blue-50 text-slate-800 hover:text-blue-700 border border-slate-200 shadow-2xs hover:shadow-xs text-xs sm:text-sm font-semibold transition-all group focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Subarna Lodh on LinkedIn"
                >
                  <LinkedInIcon className="w-4 h-4 text-[#0A66C2] group-hover:scale-110 transition-transform" />
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-blue-600 transition-colors" />
                </a>

                <a
                  href={student.contact.leetcodeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-amber-50/50 text-slate-800 hover:text-amber-700 border border-slate-200 shadow-2xs hover:shadow-xs text-xs sm:text-sm font-semibold transition-all group focus:outline-none focus:ring-2 focus:ring-amber-500"
                  aria-label="Subarna Lodh on LeetCode"
                >
                  <LeetCodeIcon className="w-4 h-4 text-[#FFA116] group-hover:scale-110 transition-transform" />
                  <span>LeetCode</span>
                  <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-amber-600 transition-colors" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Profile Photo Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md">
              
              {/* Outer decorative tech card */}
              <div className="relative bg-white rounded-3xl p-6 shadow-xl border border-slate-200/80 overflow-hidden">
                
                {/* Tech header strip on card */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                    <span className="text-xs font-mono text-slate-400 ml-1">portfolio.sys</span>
                  </div>
                  <span className="text-xs font-mono font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    UID: {student.uid}
                  </span>
                </div>

                {/* Profile Portrait Container */}
                <div className="relative rounded-2xl bg-gradient-to-b from-slate-50 via-blue-50/20 to-slate-50 border border-slate-200/70 p-6 sm:p-7 flex flex-col items-center justify-center text-center">
                  
                  {/* Circular Portrait with subtle border, soft glow ring, and responsive sizing */}
                  <div className="relative group">
                    {/* Subtle ambient gradient ring / glow */}
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 opacity-25 blur-sm group-hover:opacity-40 transition-opacity duration-300"></div>
                    
                    {/* Circular image frame */}
                    <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full p-1 bg-white ring-2 ring-slate-200/80 shadow-md overflow-hidden">
                      <Image
                        src="/profile.jpg"
                        alt={`${student.name} - Profile Photo`}
                        width={400}
                        height={400}
                        priority
                        className="w-full h-full rounded-full object-cover object-top transition duration-300 group-hover:scale-105"
                      />
                    </div>

                    {/* Active student indicator dot */}
                    <span
                      className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-white shadow-md ring-2 ring-white"
                      title="Active Student"
                    >
                      <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-emerald-500"></span>
                    </span>
                  </div>

                  {/* Student Name & Sub-details */}
                  <div className="mt-5 space-y-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                      {student.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-blue-700">
                      {student.branch}
                    </p>
                    <p className="text-xs text-slate-500">
                      {student.university} • 2025–2029
                    </p>
                  </div>

                </div>

                {/* Card footer metrics */}
                <div className="grid grid-cols-2 gap-3 mt-4 pt-2">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                    <p className="text-xs text-slate-500 font-medium">Specialization</p>
                    <p className="text-xs font-bold text-slate-900 mt-0.5">Microsoft AI</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                    <p className="text-xs text-slate-500 font-medium">Department</p>
                    <p className="text-xs font-bold text-slate-900 mt-0.5">Dept. of CSE</p>
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
