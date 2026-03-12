import React, { useEffect, useRef } from 'react';

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

/**
 * Fixed vertical scroll progress indicator.
 * Uses a ref + rAF updates (no React re-renders on scroll) for smooth animation.
 */
const ScrollProgress: React.FC = () => {
  const barRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let rafId = 0;

    const update = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? clamp01(scrollTop / scrollable) : 0;

      if (barRef.current) {
        barRef.current.style.transform = `scaleY(${progress})`;
      }

      if (dotRef.current) {
        // Move the dot along the track. `top` is set in % for simplicity.
        dotRef.current.style.top = `${progress * 100}%`;
      }
    };

    const onScrollOrResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    // initial paint
    update();

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);

    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fixed left-4 top-24 bottom-10 z-50 hidden md:block pointer-events-none">
      {/* Track */}
      <div className="relative h-full w-[2px] rounded-full bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.20)_0px,rgba(255,255,255,0.20)_4px,transparent_4px,transparent_14px)] overflow-visible">
        {/* Fill (completed portion as a solid line) */}
        <div
          ref={barRef}
          className="absolute inset-x-0 top-0 h-full origin-top rounded-full bg-emerald-400/90 shadow-[0_0_18px_rgba(52,211,153,0.18)] transition-transform duration-150 ease-out"
          style={{ transform: 'scaleY(0)' }}
        />

        {/* Animated circle marker */}
        <div
          ref={dotRef}
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(52,211,153,0.45)] scroll-progress-dot"
          style={{ top: '0%' }}
        />
      </div>
    </div>
  );
};

export default ScrollProgress;
