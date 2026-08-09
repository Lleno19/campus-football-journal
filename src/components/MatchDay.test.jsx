import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import MatchDay from './MatchDay';

const videos = [
  { id: 'penalty', src: '/media/full-penalty.mp4', poster: '/media/penalty.jpg', position: '50% 50%' },
];
const matchDay = [
  { videoId: 'penalty', kicker: 'MATCH', title: 'Penalty Shootout', titleZh: 'Penalty', body: 'Moment', bodyZh: 'Moment' },
];

describe('MatchDay', () => {
  it('waits for an explicit play action before attaching the full video source', async () => {
    const user = userEvent.setup();
    render(<MatchDay matchDay={matchDay} videos={videos} />);

    expect(document.querySelector('video')).not.toBeInTheDocument();
    const playButton = screen.getByRole('button', { name: /play full video/i });
    await user.click(playButton);

    const video = document.querySelector('video');
    expect(video).toHaveAttribute('src', '/media/full-penalty.mp4');
    expect(video).toHaveAttribute('preload', 'metadata');
    expect(playButton).not.toBeInTheDocument();
  });
});
