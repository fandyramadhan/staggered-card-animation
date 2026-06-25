"use client";

import { useEffect, useState } from "react";

const SCRIPTS = [
  "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js",
];

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded === "true") return resolve();
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", reject);
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.addEventListener("load", () => {
      s.dataset.loaded = "true";
      resolve();
    });
    s.addEventListener("error", reject);
    document.head.appendChild(s);
  });
}

/**
 * Loads GSAP + ScrollTrigger from CDN (in order) and returns true once ready.
 */
export default function useGsap() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        // Load GSAP core first, then the ScrollTrigger plugin.
        for (const src of SCRIPTS) {
          // eslint-disable-next-line no-await-in-loop
          await loadScript(src);
        }
        if (cancelled) return;
        if (window.gsap && window.ScrollTrigger) {
          window.gsap.registerPlugin(window.ScrollTrigger);
        }
        setReady(true);
      } catch (e) {
        // If the CDN fails, reveal content so nothing stays hidden.
        console.error("GSAP failed to load", e);
        setReady(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return ready;
}
