"use client";

import React from "react";
import Link from "next/link";
import { portfolioData } from "@/data/portfolio";
import { Mail, ArrowUp } from "lucide-react";
import { GitHubIcon, LinkedInIcon, LeetCodeIcon } from "@/components/Icons";

export default function Footer() {
  const { student } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Identity Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-800 text-white flex items-center justify-center font-bold tracking-tight">
                <span className="text-sm font-black text-cyan-300">{student.monogram}</span>
              </div>
              <div>
                <h3 className="font-extrabold text-white text-lg tracking-tight">
                  {student.name.toUpperCase()}
                </h3>
                <p className="text-xs font-medium text-slate-400">
                  {student.branch} • UID: {student.uid}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Academic student portfolio and interactive Computer Organization & Architecture learning suite for Chandigarh University.
            </p>

            <div className="pt-2 text-xs text-slate-500 font-mono">
              Chandigarh University • Specialization in Microsoft AI
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Primary Pages & Sections
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
              <li>
                <Link href="/" className="hover:text-cyan-400 transition-colors">
                  Home & About
                </Link>
              </li>
              <li>
                <Link href="/coa-tools" className="hover:text-cyan-400 transition-colors">
                  COA Tools
                </Link>
              </li>
              <li>
                <Link href="/projects-academics" className="hover:text-cyan-400 transition-colors">
                  Projects & Academics
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-cyan-400 transition-colors">
                  About & Skills
                </Link>
              </li>
              <li>
                <Link href="/#education" className="hover:text-cyan-400 transition-colors">
                  Education Timeline
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-cyan-400 transition-colors">
                  Contact Me
                </Link>
              </li>
            </ul>
          </div>

          {/* Social / Handles */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Social & Handles
            </h4>
            <div className="space-y-2 text-xs sm:text-sm">
              <a
                href={student.contact.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
              >
                <GitHubIcon className="w-4 h-4" />
                <span>GitHub ({student.contact.githubUrl.replace("https://github.com/", "@")})</span>
              </a>

              <a
                href={student.contact.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
                aria-label="LinkedIn profile"
              >
                <LinkedInIcon className="w-4 h-4 text-[#0A66C2]" />
                <span>LinkedIn</span>
              </a>

              <a
                href={student.contact.leetcodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
                aria-label="LeetCode profile"
              >
                <LeetCodeIcon className="w-4 h-4 text-[#FFA116]" />
                <span>LeetCode</span>
              </a>

              <a
                href={`mailto:${student.contact.email}`}
                className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Email Subarna</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Subarna Lodh. All Rights Reserved.</p>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Back to Top</span>
          </button>
        </div>

      </div>
    </footer>
  );
}
