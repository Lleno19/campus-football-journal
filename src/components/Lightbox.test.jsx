import { useRef, useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import Lightbox from './Lightbox';

function Harness() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  return (
    <>
      <button ref={triggerRef} type="button" onClick={() => setOpen(true)}>Open photo</button>
      {open && <Lightbox image={{ src: '/media/photos/IMG_20260526_110154.jpg', alt: 'Football moment' }} onClose={() => setOpen(false)} returnFocusRef={triggerRef} />}
    </>
  );
}

describe('Lightbox', () => {
  it('closes with Escape and returns focus to the trigger', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    const trigger = screen.getByRole('button', { name: 'Open photo' });
    await user.click(trigger);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
