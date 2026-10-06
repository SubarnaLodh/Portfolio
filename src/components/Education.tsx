"use client";

import React from "react";
import { portfolioData } from "@/data/portfolio";
import { GraduationCap, Calendar, MapPin, Award, Building2 } from "lucide-react";

export default function Education() {
  const { education } = portfolioData;

  return (
    <section id="education" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Education
          </h2>
          <p className="mt-2 text-base text-slate-600">
            A proven trajectory of consistent academic performance and technical focus.
          </p>
        </div>

        {/* Education Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical connecting line */}
          <div className="hidden sm:block absolute left-8 top-6 bottom-6 w-0.5 bg-blue-200" aria-hidden="true"></div>

          <div className="space-y-8 sm:space-y-10">
            {education.map((item, index) => {
              const isCurrent = index === 0;

              return (
                <div key={item.degree} className="relative flex flex-col sm:flex-row items-start sm:gap-8 group">
                  
                  {/* Timeline Node Icon */}
                  <div className="hidden sm:flex items-center justify-center w-16 h-16 rounded-2xl bg-white border-2 border-blue-500 shadow-md text-blue-700 shrink-0 z-10 group-hover:scale-105 group-hover:bg-blue-700 group-hover:text-white transition-all">
                    <GraduationCap className="w-7 h-7" />
                  </div>

                  {/* Education Details Card */}
                  <div className="w-full bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:shadow-md hover:border-blue-300 transition-all">
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                            {item.degree}
                          </h3>
                          {isCurrent && (
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 uppercase tracking-wide">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-sm sm:text-base font-semibold text-blue-800 flex items-center gap-1.5 mt-0.5">
                          <Building2 className="w-4 h-4 text-blue-600" />
                          <span>{item.institution}</span>
                        </p>
                      </div>

                      <div className="flex sm:flex-col items-start sm:items-end gap-2 sm:gap-1 text-xs sm:text-sm font-semibold">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-mono">
                          <Calendar className="w-3.5 h-3.5 text-slate-500" />
                          {item.period}
                        </span>
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <Award className="w-3.5 h-3.5 text-emerald-600" />
                          {item.grade}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-slate-600">
                      {item.specialization ? (
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-800">Specialization:</span>
                          <span className="bg-slate-100 px-2.5 py-1 rounded-md text-slate-800 font-medium">
                            {item.specialization}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-slate-500">
                          <span>Board Examination Curriculum</span>
                        </div>
                      )}

                      <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <span>{item.location}</span>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
