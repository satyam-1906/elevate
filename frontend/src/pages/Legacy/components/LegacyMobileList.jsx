/**
 * LegacyMobileList — mobile / reduced-motion / no-WebGL fallback.
 *
 * Vertical timeline with terminal-style reveal per entry.
 * - Normal mode: IntersectionObserver triggers decode + scanline per card.
 * - Reduced-motion mode: content renders immediately, no animation.
 *
 * This is a first-class experience, not an afterthought.
 */
import { useState, useEffect, useRef } from 'react';
import DecodeText from './LegacyDecodeText';

/* ── Helpers ───────────────────────────────────────────────────── */
function initials(name) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/* ── Individual Entry ──────────────────────────────────────────── */
function MobileEntry({ entry, reducedMotion }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(reducedMotion);
  const [phase, setPhase] = useState(reducedMotion ? 99 : 0);
  const [imgRevealed, setImgRevealed] = useState(reducedMotion);
  const [itemCount, setItemCount] = useState(reducedMotion ? 999 : 0);

  /* Intersection Observer — trigger reveal once 30 % is in view */
  useEffect(() => {
    if (reducedMotion || !ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [reducedMotion]);

  /* Image scanline reveal */
  useEffect(() => {
    if (!visible || imgRevealed) return;
    const id = setTimeout(() => setImgRevealed(true), 200);
    return () => clearTimeout(id);
  }, [visible, imgRevealed]);

  /* Stagger list items after name/position/tenure decode */
  const totalItems =
    entry.contributions.length +
    entry.achievements.length +
    entry.majorEvents.length;

  useEffect(() => {
    if (phase < 3 || reducedMotion || itemCount >= totalItems) return;
    const id = setTimeout(() => setItemCount((v) => v + 1), 100);
    return () => clearTimeout(id);
  }, [phase, reducedMotion, itemCount, totalItems]);

  const advance = () => setPhase((p) => p + 1);

  const gIdx = (group, i) => {
    if (group === 'contributions') return i;
    if (group === 'achievements') return entry.contributions.length + i;
    return entry.contributions.length + entry.achievements.length + i;
  };

  return (
    <div
      ref={ref}
      className={`legacy-timeline-entry ${visible ? 'is-active' : ''}`}
      role="listitem"
    >
      <div
        className={`legacy-timeline-dot ${entry.isFoundingEra ? 'is-founding' : ''}`}
        aria-hidden="true"
      />

      <span className="legacy-timeline-year">
        {entry.yearRange}
        {entry.isFoundingEra ? ' — Founding Era' : ''}
      </span>

      <article
        className="legacy-timeline-card"
        tabIndex={0}
        aria-label={`${entry.leaderName}, ${entry.position}`}
      >
        <div className="legacy-timeline-card-header" aria-hidden="true">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
        </div>

        <div className="legacy-timeline-card-body">
          {/* Profile */}
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
                {reducedMotion ? (
                  entry.leaderName
                ) : (
                  <DecodeText
                    text={entry.leaderName}
                    trigger={visible}
                    onComplete={advance}
                  />
                )}
              </h3>

              <div className="legacy-decode-position">
                {reducedMotion ? (
                  entry.position
                ) : (
                  <DecodeText
                    text={entry.position}
                    trigger={phase >= 1}
                    delay={80}
                    onComplete={advance}
                  />
                )}
              </div>

              <div className="legacy-decode-tenure">
                {reducedMotion ? (
                  entry.tenure
                ) : (
                  <DecodeText
                    text={entry.tenure}
                    trigger={phase >= 2}
                    delay={50}
                    onComplete={advance}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Bio + lists */}
          {(phase >= 3 || reducedMotion) && (
            <>
              <p className="legacy-bio">{entry.shortBio}</p>

              <span className="legacy-field-label" aria-hidden="true">
                // CONTRIBUTIONS
              </span>
              <ul className="legacy-list" aria-label="Contributions">
                {entry.contributions.map((item, i) => (
                  <li
                    key={i}
                    className={`legacy-list-item ${
                      reducedMotion || itemCount > gIdx('contributions', i)
                        ? 'is-visible'
                        : ''
                    }`}
                    tabIndex={0}
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <span className="legacy-field-label" aria-hidden="true">
                // ACHIEVEMENTS
              </span>
              <ul className="legacy-list" aria-label="Achievements">
                {entry.achievements.map((item, i) => (
                  <li
                    key={i}
                    className={`legacy-list-item ${
                      reducedMotion || itemCount > gIdx('achievements', i)
                        ? 'is-visible'
                        : ''
                    }`}
                    tabIndex={0}
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <span className="legacy-field-label" aria-hidden="true">
                // MAJOR EVENTS
              </span>
              <ul className="legacy-list" aria-label="Major events">
                {entry.majorEvents.map((item, i) => (
                  <li
                    key={i}
                    className={`legacy-list-item ${
                      reducedMotion || itemCount > gIdx('events', i)
                        ? 'is-visible'
                        : ''
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
    </div>
  );
}

/* ── Main List ─────────────────────────────────────────────────── */
export default function LegacyMobileList({ entries, reducedMotion = false }) {
  if (!entries?.length) return null;

  return (
    <div className="legacy-mobile">
      <div className="legacy-mobile-intro">
        <span className="legacy-mobile-tag">THE ARCHIVE</span>
        <h2 className="legacy-mobile-title">Our Legacy</h2>
        <p className="legacy-mobile-subtitle">
          A journey through the leadership that built Elevate from a dorm-room
          idea into a technical community.
        </p>
      </div>

      <div className="legacy-timeline" role="list">
        {entries.map((entry) => (
          <MobileEntry
            key={entry.id}
            entry={entry}
            reducedMotion={reducedMotion}
          />
        ))}
      </div>
    </div>
  );
}
