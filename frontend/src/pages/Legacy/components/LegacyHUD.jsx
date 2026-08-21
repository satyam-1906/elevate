/**
 * LegacyHUD — pinned year-range counter during the Legacy scroll.
 *
 * Shows the active era's year range in a large Space Grotesk numeral.
 * Transitions between years with a mechanical-counter vertical roll.
 */
import { useState, useEffect, useRef } from 'react';

export default function LegacyHUD({ entries, activeIndex }) {
  const [display, setDisplay] = useState(entries[0]?.yearRange || '');
  const [rolling, setRolling] = useState(false);
  const prevRef = useRef(activeIndex);

  useEffect(() => {
    if (activeIndex === prevRef.current) return;
    prevRef.current = activeIndex;

    const next = entries[activeIndex]?.yearRange || '';
    if (next === display) return;

    // Trigger roll-out, swap value after the CSS transition (350 ms)
    setRolling(true);
    const id = setTimeout(() => {
      setDisplay(next);
      setRolling(false);
    }, 350);

    return () => clearTimeout(id);
  }, [activeIndex, entries, display]);

  const isFoundingEra = entries[activeIndex]?.isFoundingEra;

  return (
    <div className="legacy-hud" aria-live="polite" aria-atomic="true">
      <span className="legacy-hud-label">ARCHIVE // YEAR</span>
      <div className="legacy-hud-divider" aria-hidden="true" />

      <div className="legacy-hud-counter">
        <span
          className={`legacy-hud-year ${rolling ? 'is-rolling-out' : 'is-rolling-in'}`}
          key={display}
        >
          {display}
        </span>
      </div>

      {isFoundingEra && (
        <span className="legacy-hud-badge">FOUNDING ERA</span>
      )}
    </div>
  );
}
