"use client";

import React, { useState } from "react";
import { portfolioData } from "@/data/portfolio";
import {
  Mail,
  Code2,
  Copy,
  Check,
  Send,
  Building,
  User,
  Shield,
  MessageSquare,
} from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/Icons";

export default function Contact() {
  const { student } = portfolioData;

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [senderName, setSenderName] = useState("");
  const [senderSubject, setSenderSubject] = useState("");
  const [senderMessage, setSenderMessage] = useState("");

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(student.contact.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${student.contact.email}?subject=${encodeURIComponent(
      senderSubject || "Portfolio Inquiry from University / Recruiter"
    )}&body=${encodeURIComponent(
      `From: ${senderName}\n\nMessage:\n${senderMessage}`
    )}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5" />
            <span>Connect & Inquire</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Contact Me
          </h2>
          <p className="text-base text-slate-600">
            Open for academic collaborations, research discussions, engineering projects, and internship opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
          
          {/* Left Column: Student Academic Contact Profile */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col justify-between space-y-6">
            
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-blue-700 text-white flex items-center justify-center font-bold text-lg">
                  {student.monogram}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    {student.name}
                  </h3>
                  <p className="text-xs text-blue-700 font-semibold">
                    {student.branch} • UID: {student.uid}
                  </p>
                </div>
              </div>

              {/* Student details */}
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <Building className="w-4 h-4 text-blue-600 shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[11px]">Institution</span>
                    <span className="font-semibold text-slate-800">
                      {student.university}, {student.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <User className="w-4 h-4 text-indigo-600 shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[11px]">Specialization</span>
                    <span className="font-semibold text-slate-800">
                      {student.specialization}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50/60 rounded-xl border border-blue-200/60">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <Mail className="w-4 h-4 text-blue-700 shrink-0" />
                    <div className="overflow-hidden">
                      <span className="text-blue-600 block text-[11px]">Email Address</span>
                      <a
                        href={`mailto:${student.contact.email}`}
                        className="font-semibold text-slate-900 hover:text-blue-700 truncate block"
                      >
                        {student.contact.email}
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    title="Copy email to clipboard"
                    className="p-2 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 shrink-0 transition-colors"
                  >
                    {copiedEmail ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Social Platforms & Icons */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Professional Handles
                </h4>
                
                <div className="grid grid-cols-2 gap-2">
                  {/* GitHub */}
                  <a
                    href={student.contact.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
                  >
                    <GitHubIcon className="w-4 h-4" />
                    <span>GitHub Profile</span>
                  </a>

                  {/* Email */}
                  <a
                    href={`mailto:${student.contact.email}`}
                    className="flex items-center gap-2 p-3 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send Email</span>
                  </a>

                  {/* LinkedIn Placeholder */}
                  <div className="flex items-center justify-between p-3 bg-slate-100 border border-slate-200 rounded-xl text-xs">
                    <div className="flex items-center gap-2 text-slate-700 font-semibold">
                      <LinkedInIcon className="w-4 h-4 text-blue-600" />
                      <span>LinkedIn</span>
                    </div>
                    <span className="text-[10px] font-mono font-medium text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                      {student.contact.linkedinUrl}
                    </span>
                  </div>

                  {/* LeetCode Placeholder */}
                  <div className="flex items-center justify-between p-3 bg-slate-100 border border-slate-200 rounded-xl text-xs">
                    <div className="flex items-center gap-2 text-slate-700 font-semibold">
                      <Code2 className="w-4 h-4 text-amber-600" />
                      <span>LeetCode</span>
                    </div>
                    <span className="text-[10px] font-mono font-medium text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                      {student.contact.leetcodeUrl}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy notice banner */}
            <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-400">
              <Shield className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>Full residential address withheld for privacy protection.</span>
            </div>

          </div>

          {/* Right Column: Direct Message Composer */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="space-y-1 pb-2 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-700" />
                <span>Send a Direct Message</span>
              </h3>
              <p className="text-xs text-slate-500">
                Compose an email dispatch directly to Subarna Lodh&apos;s academic inbox.
              </p>
            </div>

            <form onSubmit={handleSendMessage} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Your Name / Title</label>
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="e.g. Prof. / Recruiter Name"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Subject</label>
                  <input
                    type="text"
                    required
                    value={senderSubject}
                    onChange={(e) => setSenderSubject(e.target.value)}
                    placeholder="e.g. COA Coursework / Project Inquiry"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Message</label>
                <textarea
                  rows={5}
                  required
                  value={senderMessage}
                  onChange={(e) => setSenderMessage(e.target.value)}
                  placeholder="Write your message or inquiry here..."
                  className="w-full p-3.5 rounded-xl border border-slate-300 bg-slate-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Transfers to your default email client
                </span>
                
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm shadow-sm transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
