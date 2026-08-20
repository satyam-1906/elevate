import { useEffect, useRef, useState } from 'react';
import './StaggeredText.css';

export default function StaggeredText({
  text,
  className = '',
  as: Component = 'span',
  stagger = 0.035,
  delay = 0,
  duration = 0.65,
  triggerOnce = true
}) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) observer.disconnect();
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [triggerOnce]);

  const words = text ? text.split(' ') : [];

  let globalCharIndex = 0;

  return (
    <Component ref={containerRef} className={`staggered-text ${className} ${isVisible ? 'is-visible' : ''}`}>
      {words.map((word, wordIndex) => (
        <span className="staggered-word" key={wordIndex}>
          {Array.from(word).map((char, charIndex) => {
            const index = globalCharIndex++;
            const charDelay = delay + index * stagger;
            return (
              <span
                key={charIndex}
                className="staggered-char"
                style={{
                  transitionDelay: `${charDelay}s`,
                  transitionDuration: `${duration}s`
                }}
              >
                {char}
              </span>
            );
          })}
          {wordIndex < words.length - 1 && <span className="staggered-space">&nbsp;</span>}
        </span>
      ))}
    </Component>
  );
}
