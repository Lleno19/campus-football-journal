import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import PillNav from './PillNav';

const items = [
  { label: 'Home', href: '#top' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About', href: '#about' },
];

describe('PillNav', () => {
  it('renders anchor navigation and marks the active item', () => {
    render(<PillNav items={items} activeHref="#gallery" />);

    expect(screen.getByRole('link', { name: 'Gallery' })).toHaveAttribute('href', '#gallery');
    expect(screen.getByRole('link', { name: 'Gallery' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'About' })).not.toHaveAttribute('aria-current');
  });

  it('opens the mobile popover, closes with Escape, and restores focus', async () => {
    const user = userEvent.setup();
    const { container } = render(<PillNav items={items} />);

    const button = screen.getByLabelText('Toggle navigation');
    const mobileMenu = container.querySelector('[aria-label="Mobile navigation"]');

    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(mobileMenu).toHaveAttribute('aria-hidden', 'true');

    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(mobileMenu).toHaveAttribute('aria-hidden', 'false');
    expect(within(mobileMenu).getByRole('link', { name: 'Gallery' })).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(mobileMenu).toHaveAttribute('aria-hidden', 'true');
    expect(button).toHaveFocus();
  });

  it('closes the mobile popover after an anchor is selected', async () => {
    const user = userEvent.setup();
    render(<PillNav items={items} />);

    const button = screen.getByLabelText('Toggle navigation');
    await user.click(button);
    await user.click(within(document.querySelector('[aria-label=\"Mobile navigation\"]')).getByRole('link', { name: 'About' }));

    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('calls the mobile menu callback when the toggle is clicked', async () => {
    const user = userEvent.setup();
    const onMobileMenuClick = vi.fn();
    render(<PillNav items={items} onMobileMenuClick={onMobileMenuClick} />);

    await user.click(screen.getByLabelText('Toggle navigation'));
    expect(onMobileMenuClick).toHaveBeenCalledTimes(1);
  });
});
