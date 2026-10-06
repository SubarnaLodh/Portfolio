import type { Metadata, Viewport } from "next";
import "./globals.css";

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
      <body className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-blue-100 selection:text-blue-900">
        {children}
      </body>
    </html>
  );
}
