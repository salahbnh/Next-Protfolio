'use client';
import { useRef } from 'react';

// Wraps an interactive element so it gently pulls toward the cursor while
// hovered, easing back to rest on leave. Pure transform on a wrapper span, so
// it composes with any scale/hover transforms on the child.
export default function Magnetic({ children, strength = 0.35 }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0px, 0px)';
  };

  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ display: 'inline-block', transition: 'transform 0.25s ease-out', willChange: 'transform' }}
    >
      {children}
    </span>
  );
}
