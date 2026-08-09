import { useEffect, useState } from 'react';
import MaskedHeading from './MaskedHeading';

function useReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false);

  useEffect(() => {
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!media) return undefined;
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener?.('change', update);
    return () => media.removeEventListener?.('change', update);
  }, []);

  return reduced;
}

export default function HeroVideo({ profile }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [needsPlay, setNeedsPlay] = useState(false);
  const reducedMotion = useReducedMotion();
  const activeVideo = profile.videos[activeIndex];

  useEffect(() => {
    if (reducedMotion) return undefined;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % profile.videos.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [profile.videos.length, reducedMotion]);

  const scrollToGallery = () => {
    document.getElementById('gallery')?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <section className="hero" id="top" aria-label="Campus Football Journal introduction">
      <div className="hero-media" aria-hidden="true">
        <video
          className="hero-video is-active"
          key={activeVideo.id}
          src={activeVideo.heroSrc ?? activeVideo.src}
          poster={activeVideo.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          style={{ objectPosition: activeVideo.position }}
          onError={() => setNeedsPlay(true)}
          onPlay={() => setNeedsPlay(false)}
        />
      </div>
      <div className="hero-shade" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-content section-shell">
        <div className="hero-copy">
          <p className="eyebrow"><span className="pulse-dot" /> {profile.hero.eyebrow}</p>
          <MaskedHeading poster={activeVideo.poster} reducedMotion={reducedMotion} />
          <p className="hero-subtitle">{profile.hero.subtitle}</p>
          <div className="hero-meta" aria-label="Player profile">
            <span>{profile.nickname} <b>/ No.{profile.number}</b></span>
            <span>{profile.position}</span>
            <span>Since {profile.startedPlaying}</span>
          </div>
          <button className="signal-button" type="button" onClick={scrollToGallery}>
            <span>{profile.hero.cta}</span><span aria-hidden="true">{'\u2198'}</span>
          </button>
        </div>
        <div className="hero-moment" aria-live="polite">
          <span>0{activeIndex + 1} / 0{profile.videos.length}</span>
          <strong>{activeVideo.title}</strong>
          <small>{activeVideo.titleZh}</small>
          <div className="hero-progress"><i style={{ width: `${((activeIndex + 1) / profile.videos.length) * 100}%` }} /></div>
        </div>
      </div>
      {needsPlay && (
        <button className="hero-play-fallback" type="button" onClick={() => setNeedsPlay(false)}>
          Video ready <span aria-hidden="true">·</span> tap to continue
        </button>
      )}
      <div className="hero-index" aria-hidden="true">19</div>
    </section>
  );
}
