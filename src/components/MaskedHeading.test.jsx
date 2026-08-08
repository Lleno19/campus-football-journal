import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import MaskedHeading from './MaskedHeading';

describe('MaskedHeading', () => {
  it('exposes an exact semantic heading while keeping complete words and video decorative', () => {
    render(
      <MaskedHeading
        src="/media/video/campus-football.mp4"
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

    const media = screen.getByTestId('masked-heading-media');
    expect(media).toHaveAttribute('aria-hidden', 'true');
    expect(media).toHaveAttribute('src', '/media/video/campus-football.mp4');
  });
});
