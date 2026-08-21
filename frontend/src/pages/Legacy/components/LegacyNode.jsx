/**
 * LegacyNode — desktop terminal content block for a single era.
 *
 * Renders an "About terminal"-style card with a phased boot-up sequence:
 *   Phase 0 → leader name decode
 *   Phase 1 → position decode
 *   Phase 2 → tenure decode
 *   Phase 3 → bio + list items appear line-by-line
 *
 * Profile image is revealed via a scanline sweep + clip-path animation.
 * Achievement list items slide in sequentially with staggered delay.
 */
import { useState, useEffect, useCallback } from 'react';
import DecodeText from './LegacyDecodeText';

function initials(name) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function LegacyNode({ entry, isActive }) {
  const [phase, setPhase] = useState(0);
  const [imgRevealed, setImgRevealed] = useState(false);
  const [visibleItems, setVisibleItems] = useState(0);

  const advance = useCallback(() => setPhase((p) => p + 1), []);

  /* Trigger scanline image reveal shortly after mount */
  useEffect(() => {
    if (!isActive) return;
    const id = setTimeout(() => setImgRevealed(true), 150);
    return () => clearTimeout(id);
  }, [isActive]);

  /* Stagger list items once the bio section is showing (phase ≥ 3) */
  const totalListItems =
    entry.contributions.length +
    entry.achievements.length +
    entry.majorEvents.length;

  useEffect(() => {
    if (phase < 3 || visibleItems >= totalListItems) return;
    const id = setTimeout(() => setVisibleItems((v) => v + 1), 120);
    return () => clearTimeout(id);
  }, [phase, visibleItems, totalListItems]);

  /* Compute global index for a given group + local index */
  const gIdx = (group, i) => {
    if (group === 'contributions') return i;
    if (group === 'achievements') return entry.contributions.length + i;
    return entry.contributions.length + entry.achievements.length + i;
  };

  return (
    <article
      className="legacy-terminal"
      tabIndex={0}
      aria-label={`${entry.leaderName}, ${entry.position} — ${entry.yearRange}`}
    >
      {/* ── Header (decorative) ─────────────────────────── */}
      <div className="legacy-terminal-header" aria-hidden="true">
        <div className="legacy-terminal-dots">
          <span className="dot-red" />
          <span className="dot-yellow" />
          <span className="dot-green" />
        </div>
        <span className="legacy-terminal-title">legacy://{entry.id}</span>
      </div>

      {/* ── Body ────────────────────────────────────────── */}
      <div className="legacy-terminal-body">
        {/* Profile header */}
        <div className="legacy-profile">
          <div
            className={`legacy-profile-image ${imgRevealed ? 'is-revealed' : ''}`}
          >
            {entry.profileImage ? (
              <img src={entry.profileImage} alt="" />
            ) : (
              <div className="legacy-profile-initials" aria-hidden="true">
                {initials(entry.leaderName)}
              </div>
            )}
          </div>

          <div className="legacy-profile-info">
            <h3 className="legacy-decode-name">
              <DecodeText
                text={entry.leaderName}
                trigger={isActive}
                onComplete={advance}
              />
              {phase === 0 && (
                <span className="legacy-cursor" aria-hidden="true" />
              )}
            </h3>

            <div className="legacy-decode-position">
              <DecodeText
                text={entry.position}
                trigger={phase >= 1}
                delay={80}
                onComplete={advance}
              />
              {phase === 1 && (
                <span className="legacy-cursor" aria-hidden="true" />
              )}
            </div>

            <div className="legacy-decode-tenure">
              <DecodeText
                text={entry.tenure}
                trigger={phase >= 2}
                delay={50}
                onComplete={advance}
              />
              {phase === 2 && (
                <span className="legacy-cursor" aria-hidden="true" />
              )}
            </div>
          </div>
        </div>

        {/* Bio + lists — render once header decode finishes (phase ≥ 3) */}
        {phase >= 3 && (
          <>
            <p className="legacy-bio">
              <DecodeText text={entry.shortBio} trigger delay={0} />
            </p>

            {/* ── Contributions ─────────────────────────── */}
            <span className="legacy-field-label" aria-hidden="true">
              // CONTRIBUTIONS
            </span>
            <ul className="legacy-list" aria-label="Contributions">
              {entry.contributions.map((item, i) => (
                <li
                  key={i}
                  className={`legacy-list-item ${
                    visibleItems > gIdx('contributions', i) ? 'is-visible' : ''
                  }`}
                  tabIndex={0}
                >
                  {item}
                </li>
              ))}
            </ul>

            {/* ── Achievements ──────────────────────────── */}
            <span className="legacy-field-label" aria-hidden="true">
              // ACHIEVEMENTS
            </span>
            <ul className="legacy-list" aria-label="Achievements">
              {entry.achievements.map((item, i) => (
                <li
                  key={i}
                  className={`legacy-list-item ${
                    visibleItems > gIdx('achievements', i) ? 'is-visible' : ''
                  }`}
                  tabIndex={0}
                >
                  {item}
                </li>
              ))}
            </ul>

            {/* ── Major Events ──────────────────────────── */}
            <span className="legacy-field-label" aria-hidden="true">
              // MAJOR EVENTS
            </span>
            <ul className="legacy-list" aria-label="Major events">
              {entry.majorEvents.map((item, i) => (
                <li
                  key={i}
                  className={`legacy-list-item ${
                    visibleItems > gIdx('events', i) ? 'is-visible' : ''
                  }`}
                  tabIndex={0}
                >
                  {item}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </article>
  );
}
