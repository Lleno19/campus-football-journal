import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import MaskedHeading from './MaskedHeading';

describe('MaskedHeading', () => {
  it('exposes an exact semantic heading while keeping complete words and the media layer decorative', () => {
    render(
      <MaskedHeading
        poster="/media/photos/campus-football.jpg"
        reducedMotion
      />,
    );

    expect(screen.getByRole('heading', { level: 1, name: 'CAMPUS FOOTBALL JOURNAL' })).toBeInTheDocument();
    expect(screen.getAllByTestId('masked-heading-word').map((node) => node.textContent)).toEqual([
      'CAMPUS',
      'FOOTBALL',
      'JOURNAL',
    ]);

    const media = document.querySelector('.masked-heading-media');
    expect(media).toHaveAttribute('aria-hidden', 'true');
    expect(media).toHaveAttribute('href', '/media/photos/campus-football.jpg');
    expect(document.querySelectorAll('video')).toHaveLength(0);
  });
});
