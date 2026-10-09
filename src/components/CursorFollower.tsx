"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CursorFollower() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        setIsVisible(true);
      }

      // Move both the dot and circle together in 100% lockstep (zero lag, zero drift)
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check if hovering over an interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = Boolean(
          target.closest("a, button, input, select, textarea, [role='button']")
        );
        setIsHovering(interactive);
      }
    };

    const onMouseDown = () => {
      setIsClicking(true);

      // Trigger concentric click ripple animation
      if (rippleRef.current) {
        rippleRef.current.classList.remove("animate-cursor-ripple");
        // Force reflow
        void rippleRef.current.offsetWidth;
        rippleRef.current.classList.add("animate-cursor-ripple");
      }
    };

    const onMouseUp = () => {
      setIsClicking(false);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isVisible]);

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[99999] will-change-transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      <div className="relative flex items-center justify-center">
        {/* 1. Outer Black Ring / Circle — Locked directly around the dot */}
        <div
          className={`rounded-full border-2 border-black flex items-center justify-center transition-all duration-150 ease-out ${
            isClicking
              ? "w-7 h-7 bg-black/25 scale-90 border-black"
              : isHovering
              ? "w-10 h-10 bg-black/10 scale-125 border-black shadow-xs"
              : "w-8 h-8 bg-transparent scale-100"
          }`}
        >
          {/* Subtle directional notches for crosshair aesthetic */}
          <div className="w-1 h-0.5 bg-black/70 absolute -top-0.5"></div>
          <div className="w-1 h-0.5 bg-black/70 absolute -bottom-0.5"></div>
          <div className="h-1 w-0.5 bg-black/70 absolute -left-0.5"></div>
          <div className="h-1 w-0.5 bg-black/70 absolute -right-0.5"></div>
        </div>

        {/* 2. Concentric Center Black Dot — Fixed permanently at the exact center */}
        <div className="absolute w-2.5 h-2.5 rounded-full bg-black border border-white/90 shadow-xs flex items-center justify-center">
          <div className="w-0.5 h-0.5 rounded-full bg-white"></div>
        </div>

        {/* 3. Concentric Click Ripple Effect */}
        <div
          ref={rippleRef}
          className="absolute rounded-full border-2 border-black pointer-events-none opacity-0"
          style={{ width: "2rem", height: "2rem" }}
        ></div>
      </div>
    </div>
  );
}
