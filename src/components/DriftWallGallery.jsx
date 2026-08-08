import { useEffect, useMemo, useRef, useState } from 'react';

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia?.(query).matches ?? false);
  useEffect(() => {
    const media = window.matchMedia?.(query);
    if (!media) return undefined;
    const update = () => setMatches(media.matches);
    media.addEventListener?.('change', update);
    return () => media.removeEventListener?.('change', update);
  }, [query]);
  return matches;
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false);
  useEffect(() => {
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!media) return undefined;
    const update = () => setReduced(media.matches);
    media.addEventListener?.('change', update);
    return () => media.removeEventListener?.('change', update);
  }, []);
  return reduced;
}

export default function DriftWallGallery({ groups, onSelectImage }) {
  const wallRef = useRef(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const reducedMotion = useReducedMotion();
  const compactWall = useMediaQuery('(max-width: 900px)');
  const columns = useMemo(() => {
    const output = Array.from({ length: compactWall ? 2 : 3 }, () => []);
    groups.flatMap((group) => group.images.map((image) => ({ ...image, group: group.label, groupZh: group.labelZh })))
      .forEach((image, index) => output[index % output.length].push(image));
    return output;
  }, [compactWall, groups]);

  const onPointerMove = (event) => {
    if (reducedMotion || compactWall || !wallRef.current) return;
    const rect = wallRef.current.getBoundingClientRect();
    setPointer({ x: ((event.clientX - rect.left) / rect.width - 0.5) * 0.8, y: ((event.clientY - rect.top) / rect.height - 0.5) * -0.8 });
  };

  return (
    <section className="gallery-section section-block" id="gallery" aria-labelledby="gallery-title">
      <div className="section-shell gallery-intro">
        <div className="section-kicker"><span>01</span><p>DRIFT WALL / 漂移照片墙</p></div>
        <div className="gallery-heading"><h2 id="gallery-title">Things we<br /><em>carry home.</em></h2><p>把球场上的瞬间、队友和比赛后的余温，慢慢收进这面会漂移的照片墙。</p></div>
      </div>
      <div
        className={reducedMotion ? 'drift-stage reduce-motion' : 'drift-stage'}
        ref={wallRef}
        onPointerMove={onPointerMove}
        onPointerLeave={() => setPointer({ x: 0, y: 0 })}
      >
        <div className="drift-glow" aria-hidden="true" />
        <div className={compactWall ? 'drift-wall is-compact' : 'drift-wall'} style={{ '--pointer-x': pointer.x, '--pointer-y': pointer.y }}>
          {columns.map((column, columnIndex) => (
            <div className={`drift-column drift-column-${columnIndex + 1}`} key={columnIndex}>
              {column.map((image, imageIndex) => (
                <button
                  className="drift-tile"
                  key={`${image.src}-${imageIndex}`}
                  type="button"
                  style={{ '--focal-position': image.focalPosition }}
                  aria-label={`Open photo: ${image.alt}`}
                  onClick={(event) => onSelectImage(image, event.currentTarget)}
                >
                  <img src={image.src} alt={image.alt} loading={imageIndex < 2 ? 'eager' : 'lazy'} decoding="async" />
                  <span className="drift-tile-info"><b>{image.group}</b><small>{image.groupZh}</small></span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
