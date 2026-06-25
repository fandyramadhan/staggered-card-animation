"use client";

import { useEffect, useRef } from "react";
import useGsap from "./useGsap";

const CARDS = [
  {
    title: ["Track How", "You Feel"],
    body: "Log your daily mood and discover patterns over time.",
    bg: "bg-card-pink",
    img: "/assets/illustration-01.webp",
    from: "top", // enters from above
  },
  {
    title: ["Write Without", "Judgment"],
    body: "Guided prompts that help you reflect and process your thoughts.",
    bg: "bg-card-blue",
    img: "/assets/illustration-02.webp",
    from: "bottom", // enters from below
  },
  {
    title: ["Pause and", "Breathe"],
    body: "Simple breathing techniques to calm your mind in 5 minutes.",
    bg: "bg-card-green",
    img: "/assets/illustration03.webp",
    from: "top", // enters from above
  },
];

export default function Features() {
  const ready = useGsap();
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const titleGroupRef = useRef(null);
  const revealRefs = useRef([]);
  const cardsRef = useRef([]);
  revealRefs.current = [];
  cardsRef.current = [];

  const addReveal = (el) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };
  const addCard = (el) => {
    if (el && !cardsRef.current.includes(el)) cardsRef.current.push(el);
  };

  useEffect(() => {
    if (!ready) return;
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (!gsap || !ScrollTrigger) return;

    const section = sectionRef.current;
    const pin = pinRef.current;
    const titleGroup = titleGroupRef.current;
    const cards = cardsRef.current;

    const ctx = gsap.context(() => {
      // --- Title + subtitle reveal when the section first enters the viewport ---
      gsap.fromTo(
        revealRefs.current,
        { yPercent: 70, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: section, start: "top 70%", once: true },
        }
      );

      const mm = gsap.matchMedia();

      // --- Desktop / tablet: pinned, scroll-scrubbed reveal ---
      mm.add("(min-width: 768px)", () => {
        gsap.set(cards, { opacity: 1 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=2200",
            scrub: 1,
            pin: pin,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Title travels from the vertical center of the viewport up to its
        // resting position at the top. offsetTop/offsetHeight are layout-based
        // so they are not skewed by any active transforms.
        tl.fromTo(
          titleGroup,
          {
            y: () =>
              pin.clientHeight / 2 -
              (titleGroup.offsetTop + titleGroup.offsetHeight / 2),
          },
          { y: 0, ease: "none" },
          0
        );

        // Cards slide in — pink & green from the top, blue from the bottom —
        // staggered, landing into the row.
        tl.fromTo(
          cards,
          {
            y: (i) =>
              (CARDS[i].from === "bottom" ? 1 : -1) *
              (window.innerHeight * 1.15),
          },
          {
            y: 0,
            ease: "power3.out",
            duration: 1,
            stagger: 0.15,
          },
          0
        );
      });

      // --- Mobile: simple staggered reveal, no pin ---
      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: { trigger: pin, start: "top 75%" },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [ready]);

  // 3D tilt following the mouse (max 10deg), smoothed with GSAP.
  useEffect(() => {
    if (!ready) return;
    const gsap = window.gsap;
    if (!gsap) return;

    const cleanups = [];
    cardsRef.current.forEach((card) => {
      const onMove = (e) => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        gsap.to(card, {
          rotateY: (px - 0.5) * 20, // -10..10
          rotateX: (0.5 - py) * 20, // -10..10
          duration: 0.4,
          ease: "power3.out",
          transformPerspective: 800,
          transformOrigin: "center",
        });
      };
      const onLeave = () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.6,
          ease: "power3.out",
        });
      };
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, [ready]);

  // Fallback reveal if GSAP never loads.
  useEffect(() => {
    if (ready) return;
    const t = setTimeout(() => {
      revealRefs.current.forEach((el) => el && (el.style.opacity = "1"));
      cardsRef.current.forEach((el) => el && (el.style.opacity = "1"));
    }, 2500);
    return () => clearTimeout(t);
  }, [ready]);

  return (
    <section id="features" ref={sectionRef} className="relative">
      <div
        ref={pinRef}
        className="relative flex min-h-screen flex-col items-center overflow-hidden px-4 pt-[8vh] sm:px-6"
      >
        <div ref={titleGroupRef} className="text-center">
          <h2 className="text-[34px] font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl md:text-[52px]">
            <span ref={addReveal} className="reveal-text">
              Everything you need,
            </span>
            <br />
            <span ref={addReveal} className="reveal-text">
              in one place.
            </span>
          </h2>
          <p className="mt-5 text-sm font-normal text-neutral-500 sm:text-base">
            <span ref={addReveal} className="reveal-text">
              Simple tools to help you feel better, one day at a time.
            </span>
          </p>
        </div>

        <div className="mt-[5vh] grid w-full max-w-[1240px] grid-cols-1 gap-6 md:grid-cols-3">
          {CARDS.map((card) => (
            <article
              key={card.title.join(" ")}
              ref={addCard}
              className={`feature-card group flex flex-col rounded-[28px] ${card.bg} p-6 sm:p-7`}
            >
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.img}
                  alt={card.title.join(" ")}
                  className="h-auto w-full"
                  draggable="false"
                />
              </div>
              <h3 className="mt-6 text-[24px] font-extrabold leading-[1.12] tracking-tight text-white sm:text-[28px]">
                {card.title[0]}
                <br />
                {card.title[1]}
              </h3>
              <p className="mt-3 max-w-[16rem] text-sm font-normal leading-relaxed text-white/85">
                {card.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
