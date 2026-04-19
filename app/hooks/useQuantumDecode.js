'use client';
import { useState, useEffect } from 'react';

const CHARSET = '!@#$%^&*ABCDEFabcdef0123456789░▒▓█';

/**
 * Animates text by cycling each character through random glyphs
 * before resolving to the final character, left-to-right.
 *
 * @param {string} targetText  The final string to reveal
 * @param {object} options
 * @param {number} options.startDelay       ms before animation begins (default 300)
 * @param {number} options.charDelay        ms between each char resolving (default 55)
 * @param {number} options.scrambleDuration ms each char scrambles before resolving (default 350)
 */
export function useQuantumDecode(targetText, {
  startDelay = 300,
  charDelay = 55,
  scrambleDuration = 350,
} = {}) {
  const [displayText, setDisplayText] = useState(() => '█'.repeat(targetText.length));

  useEffect(() => {
    let rafId;
    let startTimestamp = null;
    let outerTimeout;

    outerTimeout = setTimeout(() => {
      const animate = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const elapsed = timestamp - startTimestamp;

        const result = targetText.split('').map((finalChar, i) => {
          const resolveAt = i * charDelay + scrambleDuration;
          if (elapsed >= resolveAt) return finalChar;
          if (elapsed < i * charDelay) return '█';
          return CHARSET[Math.floor(Math.random() * CHARSET.length)];
        }).join('');

        setDisplayText(result);

        const totalDuration = (targetText.length - 1) * charDelay + scrambleDuration;
        if (elapsed < totalDuration) {
          rafId = requestAnimationFrame(animate);
        } else {
          setDisplayText(targetText);
        }
      };

      rafId = requestAnimationFrame(animate);
    }, startDelay);

    return () => {
      clearTimeout(outerTimeout);
      cancelAnimationFrame(rafId);
    };
  }, [targetText, startDelay, charDelay, scrambleDuration]);

  return displayText;
}
