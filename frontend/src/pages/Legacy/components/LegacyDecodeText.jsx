/**
 * DecodeText — character-by-character "file decode" reveal.
 *
 * Cycles through random characters before resolving to the real text,
 * with a slightly uneven per-character rhythm (random jitter on the
 * stagger delay) so the effect feels alive rather than mechanical.
 *
 * Uses requestAnimationFrame + direct DOM textContent writes to avoid
 * React re-renders during the animation — only a single setState fires
 * when the decode completes.
 */
import { useEffect, useRef, useState } from 'react';

const CHARSET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*<>{}!?';

/* Timing constants — tuned by eye, not arbitrary ──────────────────
   STAGGER: base ms between each character resolving.
   JITTER:  ± random offset per character so adjacent chars don't
            resolve in perfectly mechanical lockstep.
   CYCLE:   how often un-resolved characters re-randomise (ms).     */
const STAGGER_MS = 28;
const JITTER_MS = 18;
const CYCLE_MS = 45;

function randChar() {
  return CHARSET[(Math.random() * CHARSET.length) | 0];
}

/**
 * @param {{ text: string, trigger: boolean, delay?: number, onComplete?: () => void, className?: string }} props
 */
export default function DecodeText({
  text = '',
  trigger = false,
  delay = 0,
  onComplete,
  className = '',
}) {
  const ref = useRef(null);
  const cbRef = useRef(onComplete);
  const [done, setDone] = useState(false);

  // Keep callback ref current without re-triggering the effect
  useEffect(() => { cbRef.current = onComplete; });

  useEffect(() => {
    const el = ref.current;
    if (!el || !text) return;

    // If not triggered, show nothing — content appears when decode starts
    if (!trigger) { el.textContent = ''; return; }

    // Pre-compute per-character resolve times with jitter
    const times = Array.from({ length: text.length }, (_, i) =>
      delay + i * STAGGER_MS + (Math.random() - 0.5) * 2 * JITTER_MS,
    );

    // Show scrambled text immediately so there's no empty-frame flash
    el.textContent = Array.from({ length: text.length }, randChar).join('');

    const t0 = performance.now();
    let raf;

    const step = (now) => {
      const dt = now - t0;
      const chars = [];
      let pending = false;

      for (let i = 0; i < text.length; i++) {
        if (dt >= times[i]) {
          chars.push(text[i]);
        } else {
          pending = true;
          chars.push(randChar());
        }
      }

      el.textContent = chars.join('');

      if (!pending) {
        el.textContent = text;
        setDone(true);
        cbRef.current?.();
      } else {
        raf = requestAnimationFrame(step);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [trigger, text, delay]); // onComplete intentionally omitted — using ref

  return (
    <span
      ref={ref}
      className={`legacy-decode-text ${done ? 'is-decoded' : ''} ${className}`}
      aria-label={text}
    />
  );
}
