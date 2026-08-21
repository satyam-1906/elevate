import { useEffect, useRef, useState } from 'react';
import './SpeedingText.css';

export default function SpeedingText({
  text,
  className = '',
  as: Component = 'span',
  delay = 0,
  triggerOnce = true
}) {
  const containerRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsRevealed(true);
          }, delay * 1000);
          if (triggerOnce) observer.disconnect();
        } else if (!triggerOnce) {
          setIsRevealed(false);
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, triggerOnce]);

  return (
    <Component
      ref={containerRef}
      className={`speeding-text ${className} ${isRevealed ? 'is-speeding-settled' : 'is-speeding-active'}`}
    >
      <span className="speeding-ghost-trace" aria-hidden="true">
        {text}
      </span>
      <span className="speeding-main-text">
        {text}
      </span>
    </Component>
  );
}
