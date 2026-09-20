import { useEffect, useRef } from "react";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { usePageVisible } from "../../../hooks/usePageVisible";
import styles from "./Constellation.module.css";

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
}

const COLORS = ["#a78bfa", "#22d3ee", "#2dd4bf"];

/**
 * Concept B — Floating Particle Constellation.
 *
 * A flat-ish cloud of glowing points drifting independently on a 2D canvas.
 * Nearby points get a thin connecting line that fades in/out as they pass —
 * a classic "constellation" look. Deliberately distributed across a loose
 * rectangular field (not a spherical shell) so it never reads as a globe.
 *
 * Uses plain Canvas2D rather than WebGL/R3F: for a few hundred flat points
 * and short line segments this is cheap, avoids pulling in a GL context for
 * a 2D effect, and pauses trivially via `usePageVisible`.
 */
export default function Constellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const pageVisible = usePageVisible();
  const pointerRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let points: Point[] = [];
    let rafId = 0;

    const count = isMobile ? 45 : 110;
    const linkDistance = isMobile ? 90 : 130;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      points = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        r: Math.random() * 1.6 + 0.8,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));
    };

    resize();
    seed();

    const handleResize = () => {
      resize();
      seed();
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };

    const handlePointerLeave = () => {
      pointerRef.current = null;
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerleave", handlePointerLeave);

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of points) {
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.7;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    if (reducedMotion) {
      drawStatic();
      return () => {
        window.removeEventListener("resize", handleResize);
        canvas.removeEventListener("pointermove", handlePointerMove);
        canvas.removeEventListener("pointerleave", handlePointerLeave);
      };
    }

    const step = () => {
      ctx.clearRect(0, 0, width, height);

      const pointer = pointerRef.current;

      for (const p of points) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        if (pointer) {
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          const dist = Math.hypot(dx, dy);
          const influence = 140;
          if (dist < influence && dist > 0.001) {
            const force = ((influence - dist) / influence) * 0.02;
            // Damped drift away from the cursor — subtle, not a hard repel.
            p.vx -= (dx / dist) * force;
            p.vy -= (dy / dist) * force;
          }
        }

        // Gentle velocity damping so points settle into slow wandering
        // rather than accelerating indefinitely.
        p.vx *= 0.995;
        p.vy *= 0.995;
      }

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i];
          const b = points[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDistance) {
            const alpha = (1 - dist / linkDistance) * 0.35;
            ctx.beginPath();
            ctx.strokeStyle = a.color;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 0.6;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      for (const p of points) {
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      rafId = requestAnimationFrame(step);
    };

    if (pageVisible) {
      rafId = requestAnimationFrame(step);
    } else {
      drawStatic();
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [reducedMotion, isMobile, pageVisible]);

  return (
    <div className={styles.wrap} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
