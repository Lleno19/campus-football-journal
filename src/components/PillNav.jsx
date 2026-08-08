import { useEffect, useId, useRef, useState } from 'react';
import { gsap } from 'gsap';

const PILL_NAV_STYLES = `
  .pill-nav-container {
    position: fixed;
    top: 1rem;
    left: 50%;
    z-index: 40;
    width: max-content;
    transform: translateX(-50%);
  }

  .pill-nav {
    --nav-h: 44px;
    --pill-gap: 3px;
    display: flex;
    align-items: center;
    width: max-content;
    min-height: var(--nav-h);
  }

  .pill-nav-items {
    display: flex;
    align-items: center;
    height: var(--nav-h);
    padding: 3px;
    border-radius: 999px;
    background: var(--pill-nav-base);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.18);
  }

  .pill-nav-logo {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--nav-h);
    height: var(--nav-h);
    padding: 8px;
    overflow: hidden;
    border-radius: 50%;
    color: var(--pill-nav-pill);
    background: var(--pill-nav-base);
    text-decoration: none;
  }

  .pill-nav-logo img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .pill-nav-logo-text {
    font-size: 0.73rem;
    font-weight: 800;
    letter-spacing: 0.08em;
  }

  .pill-nav-list {
    display: flex;
    align-items: stretch;
    gap: var(--pill-gap);
    height: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .pill-nav-list > li {
    display: flex;
    height: 100%;
  }

  .pill-nav-pill {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    min-width: 66px;
    padding: 0 16px;
    overflow: hidden;
    border-radius: 999px;
    color: var(--pill-nav-text);
    background: var(--pill-nav-pill);
    font: inherit;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    line-height: 1;
    text-decoration: none;
    text-transform: uppercase;
    white-space: nowrap;
    cursor: pointer;
    isolation: isolate;
  }

  .pill-nav-pill:focus-visible,
  .pill-nav-logo:focus-visible,
  .pill-nav-menu-button:focus-visible,
  .pill-nav-mobile-link:focus-visible {
    outline: 3px solid var(--pill-nav-accent);
    outline-offset: 3px;
  }

  .pill-nav-hover-circle {
    position: absolute;
    bottom: -2px;
    left: 50%;
    z-index: -1;
    display: block;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: var(--pill-nav-base);
    pointer-events: none;
    transform: translateX(-50%) scale(0);
    transform-origin: 50% 100%;
  }

  .pill-nav-label-stack {
    position: relative;
    z-index: 1;
    display: inline-block;
    line-height: 1;
  }

  .pill-nav-label,
  .pill-nav-label-hover {
    display: inline-block;
  }

  .pill-nav-label-hover {
    position: absolute;
    top: 0;
    left: 0;
    color: var(--pill-nav-hover-text);
    opacity: 0;
    transform: translateY(120%);
  }

  .pill-nav-pill.is-active::after {
    position: absolute;
    bottom: -7px;
    left: 50%;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--pill-nav-base);
    content: '';
    transform: translateX(-50%);
  }

  .pill-nav-menu-button {
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    width: var(--nav-h);
    height: var(--nav-h);
    padding: 0;
    border: 0;
    border-radius: 50%;
    color: var(--pill-nav-pill);
    background: var(--pill-nav-base);
    cursor: pointer;
  }

  .pill-nav-menu-line {
    display: block;
    width: 16px;
    height: 2px;
    border-radius: 2px;
    background: currentColor;
  }

  .pill-nav-mobile-popover {
    position: absolute;
    top: calc(100% + 10px);
    right: 1rem;
    left: 1rem;
    z-index: 50;
    visibility: hidden;
    padding: 4px;
    border-radius: 24px;
    background: var(--pill-nav-base);
    box-shadow: 0 18px 48px rgba(0, 0, 0, 0.28);
    opacity: 0;
    transform: translateY(-8px) scaleY(0.96);
    transform-origin: top center;
  }

  .pill-nav-mobile-popover.is-open {
    visibility: visible;
    opacity: 1;
    transform: translateY(0) scaleY(1);
  }

  .pill-nav-mobile-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .pill-nav-mobile-link {
    display: block;
    padding: 13px 16px;
    border-radius: 999px;
    color: var(--pill-nav-text);
    background: var(--pill-nav-pill);
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-decoration: none;
    text-transform: uppercase;
  }

  .pill-nav-mobile-link:hover,
  .pill-nav-mobile-link.is-active {
    color: var(--pill-nav-hover-text);
    background: var(--pill-nav-base);
  }

  @media (max-width: 768px) {
    .pill-nav-container {
      top: 0.75rem;
      right: 0;
      left: 0;
      width: 100%;
      transform: none;
    }

    .pill-nav {
      justify-content: space-between;
      width: 100%;
      padding: 0 1rem;
    }

    .pill-nav-items {
      background: transparent;
      box-shadow: none;
    }

    .pill-nav-list {
      display: none;
    }

    .pill-nav-menu-button {
      display: inline-flex;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .pill-nav-hover-circle,
    .pill-nav-label-hover,
    .pill-nav-mobile-popover {
      transition: none;
    }
  }
`;

function getPillGeometry(element) {
  const rect = element.getBoundingClientRect();
  const width = rect.width || element.offsetWidth || 96;
  const height = rect.height || element.offsetHeight || 44;
  const radius = ((width * width) / 4 + height * height) / (2 * height);
  const diameter = Math.ceil(2 * radius) + 2;
  const delta = Math.ceil(radius - Math.sqrt(Math.max(0, radius * radius - (width * width) / 4))) + 1;

  return { diameter, delta, height };
}

export default function PillNav({
  logo,
  logoAlt = 'Logo',
  items = [],
  activeHref,
  className = '',
  ease = 'power3.out',
  baseColor = '#f3f5ed',
  pillColor = '#172019',
  hoveredPillTextColor = '#172019',
  pillTextColor,
  onMobileMenuClick,
  initialLoadAnimation = true,
}) {
  const navId = useId().replace(/:/g, '');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const rootRef = useRef(null);
  const logoRef = useRef(null);
  const navItemsRef = useRef(null);
  const menuButtonRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const circleRefs = useRef([]);
  const timelines = useRef([]);
  const activeTweens = useRef([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const context = gsap.context(() => {
      const layout = () => {
        circleRefs.current.forEach((circle, index) => {
          const pill = circle?.parentElement;
          if (!pill) return;

          const { diameter, delta, height } = getPillGeometry(pill);
          circle.style.width = `${diameter}px`;
          circle.style.height = `${diameter}px`;
          circle.style.bottom = `-${delta}px`;

          gsap.set(circle, {
            xPercent: -50,
            scale: 0,
            transformOrigin: `50% ${diameter - delta}px`,
          });

          const label = pill.querySelector('.pill-nav-label');
          const hoverLabel = pill.querySelector('.pill-nav-label-hover');
          if (label) gsap.set(label, { y: 0 });
          if (hoverLabel) gsap.set(hoverLabel, { y: Math.ceil(height + 100), opacity: 0 });

          timelines.current[index]?.kill();
          const timeline = gsap.timeline({ paused: true });
          timeline.to(circle, { scale: 1.2, duration: 0.45, ease }, 0);
          if (label) timeline.to(label, { y: -(height + 8), duration: 0.45, ease }, 0);
          if (hoverLabel) timeline.to(hoverLabel, { y: 0, opacity: 1, duration: 0.45, ease }, 0);
          timelines.current[index] = timeline;
        });

        if (initialLoadAnimation) {
          if (logoRef.current) {
            gsap.fromTo(logoRef.current, { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease });
          }
          if (navItemsRef.current) {
            gsap.fromTo(navItemsRef.current, { clipPath: 'inset(0 100% 0 0 round 999px)' }, { clipPath: 'inset(0 0% 0 0 round 999px)', duration: 0.55, ease });
          }
        }
      };

      layout();
      window.addEventListener('resize', layout);
      if (document.fonts?.ready) document.fonts.ready.then(layout).catch(() => {});

      return () => {
        window.removeEventListener('resize', layout);
        timelines.current.forEach((timeline) => timeline?.kill());
        activeTweens.current.forEach((tween) => tween?.kill());
      };
    }, root);

    return () => context.revert();
  }, [ease, initialLoadAnimation, items]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key !== 'Escape' || !isMobileMenuOpen) return;
      setIsMobileMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const menu = mobileMenuRef.current;
    if (!menu) return;
    gsap.to(menu, {
      autoAlpha: isMobileMenuOpen ? 1 : 0,
      y: isMobileMenuOpen ? 0 : -8,
      scaleY: isMobileMenuOpen ? 1 : 0.96,
      duration: 0.22,
      ease,
      overwrite: true,
      onStart: () => {
        if (isMobileMenuOpen) menu.style.visibility = 'visible';
      },
      onComplete: () => {
        if (!isMobileMenuOpen) menu.style.visibility = 'hidden';
      },
    });
  }, [ease, isMobileMenuOpen]);

  const handlePillEnter = (index) => {
    activeTweens.current[index]?.kill();
    const timeline = timelines.current[index];
    if (timeline) activeTweens.current[index] = timeline.tweenTo(timeline.duration(), { duration: 0.2, ease, overwrite: true });
  };

  const handlePillLeave = (index) => {
    activeTweens.current[index]?.kill();
    const timeline = timelines.current[index];
    if (timeline) activeTweens.current[index] = timeline.tweenTo(0, { duration: 0.16, ease, overwrite: true });
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((open) => !open);
    onMobileMenuClick?.();
  };

  const style = {
    '--pill-nav-base': baseColor,
    '--pill-nav-pill': pillColor,
    '--pill-nav-text': pillTextColor ?? baseColor,
    '--pill-nav-hover-text': hoveredPillTextColor,
    '--pill-nav-accent': hoveredPillTextColor,
  };

  return (
    <div ref={rootRef} className={`pill-nav-container ${className}`.trim()} style={style}>
      <style>{PILL_NAV_STYLES}</style>
      <div className="pill-nav">
        <div className="pill-nav-items" ref={navItemsRef}>
          <a className="pill-nav-logo" ref={logoRef} href="#top" aria-label="Back to the top">
            {logo ? <img src={logo} alt={logoAlt} /> : <span className="pill-nav-logo-text">CFJ</span>}
          </a>
          <nav aria-label="Main navigation">
            <ul className="pill-nav-list">
              {items.map((item, index) => {
                const isActive = activeHref === item.href;
                return (
                  <li key={`${item.href}-${item.label}`}>
                    <a
                      className={`pill-nav-pill${isActive ? ' is-active' : ''}`}
                      href={item.href}
                      aria-label={item.ariaLabel}
                      aria-current={isActive ? 'page' : undefined}
                      onMouseEnter={() => handlePillEnter(index)}
                      onMouseLeave={() => handlePillLeave(index)}
                    >
                      <span className="pill-nav-hover-circle" ref={(element) => { circleRefs.current[index] = element; }} />
                      <span className="pill-nav-label-stack">
                        <span className="pill-nav-label">{item.label}</span>
                        <span className="pill-nav-label-hover" aria-hidden="true">{item.label}</span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
        <button
          ref={menuButtonRef}
          className="pill-nav-menu-button"
          type="button"
          aria-label="Toggle navigation"
          aria-controls={`${navId}-mobile-menu`}
          aria-expanded={isMobileMenuOpen}
          onClick={toggleMobileMenu}
        >
          <span className="pill-nav-menu-line" />
          <span className="pill-nav-menu-line" />
        </button>
      </div>
      <nav
        ref={mobileMenuRef}
        id={`${navId}-mobile-menu`}
        className={`pill-nav-mobile-popover${isMobileMenuOpen ? ' is-open' : ''}`}
        aria-label="Mobile navigation"
        aria-hidden={!isMobileMenuOpen}
      >
        <ul className="pill-nav-mobile-list">
          {items.map((item) => {
            const isActive = activeHref === item.href;
            return (
              <li key={`mobile-${item.href}-${item.label}`}>
                <a
                  className={`pill-nav-mobile-link${isActive ? ' is-active' : ''}`}
                  href={item.href}
                  aria-label={item.ariaLabel}
                  aria-current={isActive ? 'page' : undefined}
                  tabIndex={isMobileMenuOpen ? 0 : -1}
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
