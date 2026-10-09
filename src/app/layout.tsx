import type { Metadata, Viewport } from "next";
import "./globals.css";
import CursorFollower from "@/components/CursorFollower";
import { ThemeProvider } from "@/context/ThemeContext";

import ThemeAndFontController from "@/components/ThemeAndFontController";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Subarna Lodh | Academic Portfolio & Interactive COA Platform",
  description:
    "Official academic portfolio and interactive Computer Organization & Architecture platform of Subarna Lodh (UID: 25BAI10051), B.E. CSE (AI) student at Chandigarh University.",
  keywords: [
    "Subarna Lodh",
    "25BAI10051",
    "Chandigarh University",
    "Computer Organization and Architecture",
    "COA",
    "Number System Converter",
    "Student Portfolio",
    "B.E. CSE AI",
  ],
  authors: [{ name: "Subarna Lodh" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col selection:bg-blue-100 selection:text-blue-900">
        <ThemeProvider>
          <CursorFollower />
          <ThemeAndFontController />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
