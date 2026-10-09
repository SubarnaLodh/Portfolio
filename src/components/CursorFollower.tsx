"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Only enable on pointer-enabled desktop devices
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        setIsVisible(true);
      }

      // Instant dot position for precision
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
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

    const onMouseDown = (e: MouseEvent) => {
      setIsClicking(true);

      // Trigger click ripple at current cursor location
      if (rippleRef.current) {
        rippleRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) scale(1.6)`;
        rippleRef.current.style.opacity = "0.7";

        setTimeout(() => {
          if (rippleRef.current) {
            rippleRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) scale(2.4)`;
            rippleRef.current.style.opacity = "0";
          }
        }, 150);
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

    // Smooth trailing physics for the follower ring
    const render = () => {
      // Linear interpolation (lerp) for smooth trailing motion
      const speed = 0.22;
      ringX += (mouseX - ringX) * speed;
      ringY += (mouseY - ringY) * speed;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    render();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[99999] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* 1. Precise Black Center Point & Symbol */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1.5 -mt-1.5 w-3 h-3 rounded-full bg-black border border-white/90 shadow-sm pointer-events-none transition-transform duration-75 will-change-transform flex items-center justify-center"
      >
        {/* Subtle high-contrast central core */}
        <div className="w-1 h-1 rounded-full bg-white"></div>
      </div>

      {/* 2. Smooth Trailing Black Halo / Circle */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -ml-4 -mt-4 w-8 h-8 rounded-full border-2 border-black/80 pointer-events-none will-change-transform transition-[width,height,background-color,border-color] duration-150 flex items-center justify-center ${
          isClicking
            ? "scale-75 bg-black/30 border-black"
            : isHovering
            ? "scale-150 bg-black/10 border-black"
            : "scale-100 bg-transparent"
        }`}
      >
        {/* Directional crosshair indicator notches */}
        <div className="w-1.5 h-0.5 bg-black/60 absolute -top-1"></div>
        <div className="w-1.5 h-0.5 bg-black/60 absolute -bottom-1"></div>
        <div className="h-1.5 w-0.5 bg-black/60 absolute -left-1"></div>
        <div className="h-1.5 w-0.5 bg-black/60 absolute -right-1"></div>
      </div>

      {/* 3. Click Ripple Wave */}
      <div
        ref={rippleRef}
        className="fixed top-0 left-0 -ml-5 -mt-5 w-10 h-10 rounded-full border-2 border-black pointer-events-none opacity-0 transition-[transform,opacity] duration-300 ease-out will-change-transform"
      ></div>
    </div>
  );
}
