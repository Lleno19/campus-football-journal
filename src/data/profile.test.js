import { describe, expect, it } from 'vitest';
import profile from './profile';

const collectStrings = (value) => {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(collectStrings);
  if (value && typeof value === 'object') return Object.values(value).flatMap(collectStrings);
  return [];
};

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

  it('does not ship placeholder question marks in user-facing copy', () => {
    const userFacingCopy = collectStrings(profile).filter((text) => !text.startsWith('/media/'));
    expect(userFacingCopy.filter((text) => text.includes('?'))).toEqual([]);
    expect(profile.position).toContain('后腰');
    expect(profile.intro.zh).toContain('2016');
  });
});
