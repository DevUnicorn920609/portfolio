import React, { useEffect, useRef } from 'react';

type Vec2 = { x: number; y: number };

const FloatingShapes: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId = 0;
    let width = 0;
    let height = 0;
    const dpr = Math.max(1, window.devicePixelRatio || 1);

    const mouse: Vec2 & { active: boolean } = { x: 0, y: 0, active: false };

    type Dot = {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      opacity: number;
      lastBounceAt: number;
    };

    const dots: Dot[] = [];

    const MOUSE_RADIUS = 90;
    // Connection threshold (higher => more visible connections)
    const CONNECT_DIST = 160;
    // Approximate number of dots requested
    const BASE_DOTS = 150;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      // Reset transform so we don't compound scales across resizes.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const createDot = (): Dot => {
      const speed = 0.15 + Math.random() * 0.55;
      const angle = Math.random() * Math.PI * 2;

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.9 + Math.random() * 1.6,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        opacity: 0.35 + Math.random() * 0.55,
        lastBounceAt: 0,
      };
    };

    const initDots = () => {
      dots.length = 0;
      const count = BASE_DOTS;
      for (let i = 0; i < count; i++) dots.push(createDot());
    };

    const updateMouseFromEvent = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        mouse.active = false;
        return;
      }

      mouse.active = true;
      mouse.x = x;
      mouse.y = y;
    };

    const onPointerMove = (e: PointerEvent) => updateMouseFromEvent(e.clientX, e.clientY);
    const onPointerDown = (e: PointerEvent) => updateMouseFromEvent(e.clientX, e.clientY);
    const onPointerLeaveWindow = () => {
      mouse.active = false;
    };

    const drawDots = () => {
      for (const d of dots) {
        ctx.beginPath();
        ctx.globalAlpha = d.opacity;
        ctx.fillStyle = '#34d399';
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const drawConnections = (time: number) => {
      ctx.save();
      // Dotted line effect between close dots
      ctx.setLineDash([2, 6]);
      ctx.lineDashOffset = -time * 0.03;
      ctx.lineWidth = 1.2;
      ctx.lineCap = 'round';

      const connectDistSq = CONNECT_DIST * CONNECT_DIST;

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const distSq = dx * dx + dy * dy;

          if (distSq < connectDistSq) {
            const dist = Math.sqrt(distSq);
            // Make connections clearly visible but still subtle.
            const alpha = 0.55 * (1 - dist / CONNECT_DIST);
            ctx.strokeStyle = `rgba(52,211,153,${alpha})`;
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }

      ctx.restore();
    };

    const applyMouseExclusion = (d: Dot, now: number) => {
      if (!mouse.active) return;

      const dx = d.x - mouse.x;
      const dy = d.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist >= MOUSE_RADIUS) return;

      // Don't flip velocity every frame at the boundary.
      if (now - d.lastBounceAt > 80) {
        d.vx *= -1;
        d.vy *= -1;
        d.lastBounceAt = now;
      }

      // Ensure dots cannot exist inside the radius (place them on the boundary).
      const safeDist = dist || 0.0001;
      const nx = dx / safeDist;
      const ny = dy / safeDist;
      d.x = mouse.x + nx * (MOUSE_RADIUS + 2);
      d.y = mouse.y + ny * (MOUSE_RADIUS + 2);
    };

    const tick = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      for (const d of dots) {
        applyMouseExclusion(d, time);

        d.x += d.vx;
        d.y += d.vy;

        // wrap edges
        if (d.x < -10) d.x = width + 10;
        if (d.x > width + 10) d.x = -10;
        if (d.y < -10) d.y = height + 10;
        if (d.y > height + 10) d.y = -10;
      }

      drawConnections(time);
      drawDots();
      animationId = requestAnimationFrame(tick);
    };

    resize();
    initDots();

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('blur', onPointerLeaveWindow);

    animationId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('blur', onPointerLeaveWindow);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default FloatingShapes;
