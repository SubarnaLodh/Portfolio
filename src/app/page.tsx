"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import ResumeCard from "@/components/ResumeCard";
import COATools from "@/components/COATools";
import FeaturedProject from "@/components/FeaturedProject";
import Achievements from "@/components/Achievements";
import AssignmentAccordion from "@/components/AssignmentAccordion";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-blue-100 selection:text-blue-900">
      {/* Sticky Navigation Bar */}
      <Navbar />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. About Me Section */}
        <About />

        {/* Education Timeline */}
        <Education />

        {/* Resume Card Feature Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ResumeCard />
        </div>

        {/* 3. COA Tools Section (Number System Converter & Binary ALU) */}
        <COATools />

        {/* 4. GitHub Featured Project */}
        <FeaturedProject />

        {/* 5. Achievements & Gallery */}
        <Achievements />

        {/* 6. COA Assignments & Lecture Questions (12 Questions Accordion) */}
        <AssignmentAccordion />

        {/* 7. Contact Section */}
        <Contact />
      </main>

      {/* 8. Footer */}
      <Footer />
    </div>
  );
}
