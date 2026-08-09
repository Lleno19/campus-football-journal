import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import HeroVideo from './HeroVideo';

const profile = {
  videos: [
    { id: 'first', src: '/media/full-first.mp4', heroSrc: '/media/hero-first.mp4', poster: '/media/first.jpg', title: 'First', titleZh: 'First' },
    { id: 'second', src: '/media/full-second.mp4', heroSrc: '/media/hero-second.mp4', poster: '/media/second.jpg', title: 'Second', titleZh: 'Second' },
  ],
  hero: { eyebrow: 'PLAY', title: 'Campus Football Journal', subtitle: 'A journal', cta: 'Explore' },
};

describe('HeroVideo', () => {
  it('renders one lightweight hero video and does not duplicate the full video for the masked heading', () => {
    render(<HeroVideo profile={profile} />);

    const media = document.querySelectorAll('video');
    expect(media).toHaveLength(1);
    expect(media[0]).toHaveAttribute('src', '/media/hero-first.mp4');
    expect(media[0]).toHaveAttribute('poster', '/media/first.jpg');
    expect(media[0]).toHaveAttribute('preload', 'metadata');
  });
});
