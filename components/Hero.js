"use client";

import { useEffect, useRef } from "react";
import useGsap from "./useGsap";

export default function Hero() {
  const ready = useGsap();
  const pathRef = useRef(null);
  const textRefs = useRef([]);
  textRefs.current = [];

  const addText = (el) => {
    if (el && !textRefs.current.includes(el)) textRefs.current.push(el);
  };

  useEffect(() => {
    if (!ready) return;
    const gsap = window.gsap;
    const path = pathRef.current;
    if (!gsap || !path) return;

    // Path-trim setup: hide the stroke, then "draw" it over 1.5s.
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    gsap.set(textRefs.current, { opacity: 0, yPercent: 60 });

    const tl = gsap.timeline();
    tl.to(path, {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: "power3.out",
    }).to(
      textRefs.current,
      {
        opacity: 1,
        yPercent: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
      },
      ">-0.1"
    );

    return () => tl.kill();
  }, [ready]);

  // Fallback: if GSAP never loads, still show the text.
  useEffect(() => {
    if (ready) return;
    const t = setTimeout(() => {
      textRefs.current.forEach((el) => {
        if (el) el.style.opacity = "1";
      });
    }, 2500);
    return () => clearTimeout(t);
  }, [ready]);

  return (
    <section className="px-4 sm:px-6">
      <div className="relative mx-auto flex min-h-[78vh] max-w-[1760px] items-center overflow-hidden rounded-[40px] bg-hero px-6 py-24 sm:rounded-[48px] sm:py-32 md:py-40 lg:min-h-[82vh] lg:py-48 xl:py-56">
        {/* Animated background shape (path-trim) */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 1379 778"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <path
            ref={pathRef}
            d="M-42 692.863C193.5 612.696 604 306.329 540 6.3629C476 -293.604 -150 723.863 209 708.363C568 692.863 1032.5 627.863 1224 99.3629C1415.5 -429.137 168 850.396 1032.5 692.863C1897 535.329 1450.4 780.428 1774 504.828"
            stroke="#5D44FA"
            strokeWidth="137"
          />
        </svg>

        {/* Hero content */}
        <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
          <h1
            ref={addText}
            className="text-[40px] font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl md:text-[64px] lg:text-[72px] xl:text-[80px]"
          >
            Your mind deserves
            <br />a safe place.
          </h1>
          <p
            ref={addText}
            className="mx-auto mt-6 max-w-md text-base font-normal leading-relaxed text-white/85 sm:text-lg lg:mt-7 lg:max-w-lg lg:text-xl"
          >
            We can help you understand your emotions, build healthy habits, and
            find calm — at your own pace.
          </p>
          <div ref={addText} className="mt-9 lg:mt-10">
            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-full bg-white px-9 py-4 text-base font-bold text-hero shadow-sm transition-transform duration-200 hover:scale-[1.03]"
            >
              Start for Free
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
