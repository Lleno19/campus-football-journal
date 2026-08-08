import { useEffect, useRef } from 'react';

export default function Lightbox({ image, onClose, returnFocusRef }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      returnFocusRef?.current?.focus();
    };
  }, [onClose, returnFocusRef]);

  return (
    <div className="lightbox-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="lightbox" role="dialog" aria-modal="true" aria-label="Expanded football photo">
        <button className="lightbox-close" ref={closeRef} type="button" onClick={onClose} aria-label="Close photo">{'\u00d7'}</button>
        <img src={image.src} alt={image.alt} />
        <p>{image.alt}</p>
      </section>
    </div>
  );
}
