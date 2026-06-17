'use client';
import { useEffect, useRef } from 'react';

// Canvas 2D starfield — loads instantly, no Three.js overhead on hero.
// Depth-layered stars with cursor parallax + repulsion, occasional shooting
// stars, and faint constellation links that form near the cursor.
const STAR_COUNT = 200;
const REPEL_RADIUS = 110;   // px — cursor pushes stars away within this radius
const LINK_RADIUS = 130;    // px — stars within this of the cursor get linked

export default function StarField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width, height, animId, frame = 0;
    const mouse = { x: -9999, y: -9999, active: false };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const stars = Array.from({ length: STAR_COUNT }, () => {
      const z = Math.random(); // depth 0 (far) .. 1 (near)
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        z,
        r: z * 1.6 + 0.3,
        speed: z * 0.16 + 0.04,
        opacity: z * 0.5 + 0.2,
        hue: Math.random() > 0.72 ? 265 : 205, // mostly ice-blue, some violet
        dx: 0,
        dy: 0,
      };
    });

    const shooters = [];
    const spawnShooter = () => {
      const ang = Math.PI * 0.16 + Math.random() * 0.14;
      const spd = 7 + Math.random() * 4;
      shooters.push({
        x: Math.random() * width * 0.7,
        y: Math.random() * height * 0.28,
        vx: Math.cos(ang) * spd,
        vy: Math.sin(ang) * spd,
        life: 1,
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      frame++;

      // Parallax offset from screen centre.
      const ox = mouse.active ? mouse.x - width / 2 : 0;
      const oy = mouse.active ? mouse.y - height / 2 : 0;
      const near = [];

      for (const s of stars) {
        if (mouse.active) {
          const dxm = s.x - mouse.x;
          const dym = s.y - mouse.y;
          const d2 = dxm * dxm + dym * dym;
          if (d2 < REPEL_RADIUS * REPEL_RADIUS) {
            const d = Math.sqrt(d2) || 1;
            const f = (1 - d / REPEL_RADIUS) * 6;
            s.dx += (dxm / d) * f;
            s.dy += (dym / d) * f;
          }
        }
        s.dx *= 0.9;
        s.dy *= 0.9;

        // Render position: base + repel displacement + depth parallax.
        const px = s.x + s.dx - ox * s.z * 0.06;
        const py = s.y + s.dy - oy * s.z * 0.06;

        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue}, 80%, 82%, ${s.opacity})`;
        ctx.fill();

        // Gentle upward drift.
        s.y -= s.speed;
        if (s.y + s.r < 0) {
          s.y = height + s.r;
          s.x = Math.random() * width;
        }

        if (mouse.active) {
          const lx = px - mouse.x;
          const ly = py - mouse.y;
          if (lx * lx + ly * ly < LINK_RADIUS * LINK_RADIUS) near.push({ px, py });
        }
      }

      // Constellation: link the cursor to nearby stars, and nearby stars to each other.
      if (mouse.active && near.length) {
        for (let i = 0; i < near.length; i++) {
          const a = near[i];
          const md = Math.hypot(a.px - mouse.x, a.py - mouse.y);
          ctx.strokeStyle = `rgba(96,165,250,${(1 - md / LINK_RADIUS) * 0.5})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(a.px, a.py);
          ctx.stroke();
          for (let j = i + 1; j < near.length; j++) {
            const b = near[j];
            const dd = Math.hypot(a.px - b.px, a.py - b.py);
            if (dd < 72) {
              ctx.strokeStyle = `rgba(125,211,252,${(1 - dd / 72) * 0.22})`;
              ctx.beginPath();
              ctx.moveTo(a.px, a.py);
              ctx.lineTo(b.px, b.py);
              ctx.stroke();
            }
          }
        }
      }

      // Shooting stars.
      if (frame % 230 === 0 && shooters.length < 2) spawnShooter();
      for (let i = shooters.length - 1; i >= 0; i--) {
        const sh = shooters[i];
        sh.x += sh.vx;
        sh.y += sh.vy;
        sh.life -= 0.012;
        const tailX = sh.x - sh.vx * 6;
        const tailY = sh.y - sh.vy * 6;
        const grad = ctx.createLinearGradient(sh.x, sh.y, tailX, tailY);
        grad.addColorStop(0, `rgba(186,230,253,${Math.max(sh.life, 0)})`);
        grad.addColorStop(1, 'rgba(186,230,253,0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(sh.x, sh.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
        if (sh.life <= 0 || sh.x > width + 60 || sh.y > height + 60) shooters.splice(i, 1);
      }

      animId = requestAnimationFrame(draw);
    };

    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true; };
    const onLeave = () => { mouse.active = false; mouse.x = -9999; mouse.y = -9999; };

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseout', onLeave, { passive: true });
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseout', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
}
