"use client";

import React, { useState, useMemo } from "react";
import { portfolioData, AssignmentItem } from "@/data/portfolio";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Search,
  FileText,
  User,
  GraduationCap,
  Sparkles,
  ExternalLink,
  Layers,
  CheckCircle,
} from "lucide-react";

export default function AssignmentAccordion() {
  const { assignments, student } = portfolioData;

  const [searchQuery, setSearchQuery] = useState("");
  const [openIds, setOpenIds] = useState<number[]>([1]); // First question open by default

  const toggleAccordion = (id: number) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const expandAll = () => {
    setOpenIds(assignments.map((a) => a.id));
  };

  const collapseAll = () => {
    setOpenIds([]);
  };

  // Filter questions based on query
  const filteredAssignments = useMemo(() => {
    if (!searchQuery.trim()) return assignments;
    const q = searchQuery.toLowerCase();
    return assignments.filter(
      (a) =>
        a.question.toLowerCase().includes(q) ||
        a.answer.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.id.toString() === q
    );
  }, [assignments, searchQuery]);

  return (
    <section id="assignments" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Curriculum & Coursework</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            COA Assignments & Lecture Questions
          </h2>
          <p className="text-base text-slate-600">
            Official coursework submissions and technical evaluations for Computer Organization & Architecture (Assignment – I).
          </p>
        </div>

        {/* Academic Submission Card / Header Bar */}
        <div className="bg-slate-50 rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-2xs max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 font-mono">
                Assignment – I Submission Sheet
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                Computer Organization and Architecture (COA)
              </h3>
            </div>

            <a
              href={student.documents.assignmentPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-blue-50 text-blue-700 text-xs font-bold border border-slate-200 shadow-2xs transition-colors"
            >
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Original Assignment Document (PDF)</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </div>

          {/* Academic Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs">
            <div className="bg-white p-3 rounded-xl border border-slate-200/80">
              <span className="text-slate-400 block font-medium">Student Name</span>
              <span className="font-bold text-slate-900 mt-0.5 block">{student.name}</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200/80">
              <span className="text-slate-400 block font-medium">UID</span>
              <span className="font-mono font-bold text-blue-800 mt-0.5 block">{student.uid}</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200/80">
              <span className="text-slate-400 block font-medium">Section</span>
              <span className="font-mono font-bold text-slate-900 mt-0.5 block">{student.section}</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200/80">
              <span className="text-slate-400 block font-medium">Faculty Mentor</span>
              <span className="font-bold text-slate-900 mt-0.5 block">{student.submittedTo}</span>
            </div>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search assignments by keyword or topic..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-700"
              >
                Clear
              </button>
            )}
          </div>

          {/* Expand / Collapse buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end text-xs">
            <button
              type="button"
              onClick={expandAll}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold border border-slate-200 transition-colors"
            >
              Expand All
            </button>
            <button
              type="button"
              onClick={collapseAll}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold border border-slate-200 transition-colors"
            >
              Collapse All
            </button>
            <span className="text-slate-400 ml-2 font-mono">
              {filteredAssignments.length} / 12
            </span>
          </div>

        </div>

        {/* Accordion Questions List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredAssignments.length === 0 ? (
            <div className="p-12 text-center bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <p className="text-base font-bold text-slate-800">No questions found</p>
              <p className="text-xs text-slate-500">
                No assignment questions matched &ldquo;{searchQuery}&rdquo;. Try clearing your search.
              </p>
            </div>
          ) : (
            filteredAssignments.map((item) => {
              const isOpen = openIds.includes(item.id);

              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "border-blue-300 bg-white shadow-sm ring-1 ring-blue-100"
                      : "border-slate-200 bg-white hover:border-slate-300 shadow-2xs"
                  }`}
                >
                  {/* Accordion Header / Toggle */}
                  <button
                    type="button"
                    onClick={() => toggleAccordion(item.id)}
                    aria-expanded={isOpen}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-blue-400 group"
                  >
                    <div className="flex items-start sm:items-center gap-3.5">
                      <span
                        className={`w-8 h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${
                          isOpen
                            ? "bg-blue-700 text-white"
                            : "bg-slate-100 text-slate-700 group-hover:bg-blue-100 group-hover:text-blue-800"
                        }`}
                      >
                        {item.id < 10 ? `0${item.id}` : item.id}
                      </span>

                      <div className="space-y-0.5">
                        <span className="text-[11px] font-semibold text-blue-700 uppercase tracking-wider block">
                          {item.category}
                        </span>
                        <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                          {item.question}
                        </h4>
                      </div>
                    </div>

                    <div className="shrink-0 p-1.5 rounded-lg bg-slate-100 group-hover:bg-blue-50 text-slate-500 group-hover:text-blue-700 transition-colors">
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  </button>

                  {/* Accordion Body */}
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 text-slate-700 space-y-5 animate-fadeIn">
                      
                      {/* Short summary banner */}
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-600 font-medium">
                        <span className="font-bold text-slate-800 mr-1.5">Overview:</span>
                        {item.summary}
                      </div>

                      {/* Main Answer text from document */}
                      <div className="space-y-2">
                        <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Complete Answer
                        </h5>
                        <p className="text-sm sm:text-base leading-relaxed text-slate-800 whitespace-pre-line">
                          {item.answer}
                        </p>
                      </div>

                      {/* Key Points Breakdown if present */}
                      {item.keyPoints && item.keyPoints.length > 0 && (
                        <div className="space-y-2 pt-2">
                          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                            <span>Structured Takeaways / Key Points</span>
                          </h5>
                          <div className="space-y-2">
                            {item.keyPoints.map((pt, idx) => (
                              <div
                                key={idx}
                                className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50/70 border border-slate-200/80 text-xs sm:text-sm text-slate-700"
                              >
                                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                <span className="leading-snug">{pt}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Specialized Table for Question 9 (CPU vs TPU vs GPU) */}
                      {item.tableData && (
                        <div className="pt-2 space-y-2">
                          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 text-indigo-600" />
                            <span>Architecture Comparison Matrix</span>
                          </h5>
                          <div className="overflow-x-auto rounded-xl border border-slate-200">
                            <table className="min-w-full divide-y divide-slate-200 text-left text-xs sm:text-sm">
                              <thead className="bg-slate-100 text-slate-800 font-bold">
                                <tr>
                                  {item.tableData.headers.map((h, hi) => (
                                    <th key={hi} className="px-4 py-3 font-semibold">
                                      {h}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 bg-white">
                                {item.tableData.rows.map((row, ri) => (
                                  <tr key={ri} className="hover:bg-slate-50 transition-colors">
                                    {row.map((cell, ci) => (
                                      <td
                                        key={ci}
                                        className={`px-4 py-3 leading-relaxed ${
                                          ci === 0 ? "font-bold text-slate-900 bg-slate-50/40" : "text-slate-700"
                                        }`}
                                      >
                                        {cell}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
}
