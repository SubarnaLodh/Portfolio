"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeaturedProject from "@/components/FeaturedProject";
import Achievements from "@/components/Achievements";
import AssignmentAccordion from "@/components/AssignmentAccordion";
import { FolderGit2, Sparkles, Award, BookOpen } from "lucide-react";

export default function ProjectsAcademicsPage() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-blue-100 selection:text-blue-900">
      {/* Sticky Navigation Bar */}
      <Navbar />

      <main className="flex-1">
        {/* Compact Page Banner */}
        <section className="bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80 text-xs font-semibold uppercase tracking-wider shadow-2xs">
              <FolderGit2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Projects & Academics Portfolio</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Projects, Achievements & Academic Coursework
            </h1>

            <p className="max-w-3xl mx-auto text-sm sm:text-base text-slate-600 leading-relaxed">
              Explore my verified software systems including the Instruction Set Simulator, technical achievements & certifications gallery, and complete Computer Organization & Architecture lecture assignments.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <a
                href="#project"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 transition-colors"
              >
                <Sparkles className="w-3 h-3 text-cyan-600" /> Instruction Set Simulator
              </a>
              <a
                href="#achievements"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 transition-colors"
              >
                <Award className="w-3 h-3 text-amber-600" /> Achievements & Certifications
              </a>
              <a
                href="#assignments"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 transition-colors"
              >
                <BookOpen className="w-3 h-3 text-indigo-600" /> COA Coursework (12 Questions)
              </a>
            </div>
          </div>
        </section>

        {/* 1. Featured GitHub Project & Systems */}
        <FeaturedProject />

        {/* 2. Achievements & Certificate Image Gallery (with Lightbox Modal) */}
        <Achievements />

        {/* 3. COA Assignments & Lecture Questions (12 Questions with Search Filter) */}
        <AssignmentAccordion />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
