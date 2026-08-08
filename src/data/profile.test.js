import { describe, expect, it } from 'vitest';
import profile from './profile';

describe('profile data', () => {
  it('contains confirmed identity and editable media collections', () => {
    expect(profile.nickname).toBe('Lleno');
    expect(profile.number).toBe('19');
    expect(profile.startedPlaying).toBe('2016');
    expect(profile.position).toContain('Defensive Midfielder');
    expect(profile.videos).toHaveLength(2);
    expect(profile.galleryGroups.length).toBeGreaterThanOrEqual(3);
    expect(profile.journal.length).toBeGreaterThanOrEqual(5);
    expect(profile.hero.cta).toBe('EXPLORE THE GALLERY');
    expect(profile.galleryGroups[2].images.at(-1).src).toBe('/media/photos/IMG_20250420_193630.jpg');
  });
});
