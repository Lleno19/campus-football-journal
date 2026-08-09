import { useEffect, useId, useRef } from 'react';
import { gsap } from 'gsap';

const WORDS = [
  { label: 'CAMPUS', y: 176 },
  { label: 'FOOTBALL', y: 370 },
  { label: 'JOURNAL', y: 564 },
];

function TitleWords({ className, testId }) {
  return WORDS.map(({ label, y }) => (
    <text
      className={className}
      data-testid={testId}
      key={label}
      x="18"
      y={y}
    >
      {label}
    </text>
  ));
}

export default function MaskedHeading({ poster, reducedMotion = false }) {
  const rootRef = useRef(null);
  const maskId = `masked-heading-${useId().replace(/:/g, '')}`;

  useEffect(() => {
    if (reducedMotion || !rootRef.current) return undefined;

    const layer = rootRef.current.querySelector('[data-masked-heading-layer]');
    const context = gsap.context(() => {
      gsap.fromTo(
        layer,
        { autoAlpha: 0, y: 22 },
        { autoAlpha: 1, y: 0, duration: 0.82, ease: 'power3.out', clearProps: 'transform' },
      );
    }, rootRef);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <div className="masked-heading" ref={rootRef}>
      <h1 className="sr-only">CAMPUS FOOTBALL JOURNAL</h1>
      <div className="masked-heading-frame" data-masked-heading-layer>
        <svg
          aria-hidden="true"
          className="masked-heading-art"
          focusable="false"
          preserveAspectRatio="xMinYMid meet"
          viewBox="0 0 1200 624"
        >
          <defs>
            <clipPath id={maskId} clipPathUnits="userSpaceOnUse">
              <TitleWords className="masked-heading-clip-word" />
            </clipPath>
          </defs>
          <image
            aria-hidden="true"
            className="masked-heading-media"
            clipPath={`url(#${maskId})`}
            height="624"
            href={poster}
            preserveAspectRatio="xMidYMid slice"
            width="1200"
            x="0"
            y="0"
          />
          <g className="masked-heading-outline">
            <TitleWords className="masked-heading-word" testId="masked-heading-word" />
          </g>
        </svg>
      </div>
    </div>
  );
}
