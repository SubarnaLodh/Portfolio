"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import ResumeCard from "@/components/ResumeCard";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-blue-100 selection:text-blue-900">
      {/* Sticky Navigation Bar */}
      <Navbar />

      <main className="flex-1">
        {/* 1. Hero / Home Section */}
        <Hero />

        {/* 2. About Me Section (Profile, Interests, Technical Skills, Goals) */}
        <About />

        {/* 3. Education Timeline */}
        <Education />

        {/* 4. Resume Card Feature Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ResumeCard />
        </div>

        {/* 5. Contact Section */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

