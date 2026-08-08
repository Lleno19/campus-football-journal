# React Bits Journal Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refine the Campus Football Journal with a local-video masked `CAMPUS / FOOTBALL / JOURNAL` hero, an accessible pill navigation, an immediately-following DriftWall gallery, and the corrected gallery image path.

**Architecture:** Keep the site as a single React/Vite page with local media and native anchor navigation. Add two focused, adapted React Bits components: `MaskedHeading` owns the GSAP title reveal and reduced-motion fallback; `PillNav` owns desktop/mobile menu state and keyboard behavior. `App` owns section order and lightbox state, while `profile.js` remains the editable source of hero/navigation media metadata.

**Tech Stack:** React, Vite, native CSS, GSAP, Vitest, React Testing Library, local JPG/MP4 assets.

---

## File structure

- Create: `src/components/MaskedHeading.jsx` — animated local-video letter mask; stable reduced-motion rendering.
- Create: `src/components/MaskedHeading.test.jsx` — verifies three intact title lines and no per-character rendered text nodes.
- Create: `src/components/PillNav.jsx` — anchor-based desktop/mobile pill navigation with focus and Escape behavior.
- Create: `src/components/PillNav.test.jsx` — verifies menu open/close, Escape behavior, and anchor selection close.
- Modify: `src/components/HeroVideo.jsx` — renders `MaskedHeading`; changes CTA target from About to Gallery.
- Modify: `src/components/DriftWallGallery.jsx` — adds `id="gallery"` to the section and updates its ordinal label.
- Modify: `src/App.jsx` — replaces `SiteNavigation` with `PillNav` and moves gallery immediately after Hero.
- Modify: `src/data/profile.js` — changes hero CTA text and corrects the final after-match image source.
- Modify: `src/data/profile.test.js` — locks down the corrected asset path and hero CTA value.
- Modify: `src/styles/global.css` — scopes the masked-heading and pill-nav visual system; removes any narrow-screen character-breaking behavior from hero headings.
- Modify: `package.json`, `package-lock.json` — adds `gsap`.
- Retain temporarily: `src/components/SiteNavigation.jsx` — delete only after no imports or matching CSS selectors remain.

## Task 1: Add the dependency and lock down editable data

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `src/data/profile.js:4,26`
- Modify: `src/data/profile.test.js`

- [ ] **Step 1: Extend the data test before changing the data.**

Add this assertion to `src/data/profile.test.js` inside the existing test:

```js
expect(profile.hero.cta).toBe('EXPLORE THE GALLERY');
expect(profile.galleryGroups[2].images.at(-1).src)
  .toBe('/media/photos/IMG_20250420_193630.jpg');
```

- [ ] **Step 2: Run the focused data test and confirm the expected failure.**

Run:

```powershell
npm.cmd test -- src/data/profile.test.js
```

Expected: one failure because the CTA is still `EXPLORE MY STORY` and the source still lacks the underscore.

- [ ] **Step 3: Install GSAP using the project package manager.**

Run:

```powershell
npm.cmd install gsap
```

Expected: `package.json` contains a `gsap` dependency and `package-lock.json` records the resolved package; do not add `react-router-dom`.

- [ ] **Step 4: Apply only the specified data changes.**

Update the corresponding `profile.js` entries to:

```js
hero: {
  eyebrow: 'PLAY WITH HEART',
  title: 'Campus Football Journal',
  subtitle: '校园足球记录',
  cta: 'EXPLORE THE GALLERY',
},
```

and:

```js
{ src: '/media/photos/IMG_20250420_193630.jpg', alt: 'A football moment in warm evening light', focalPosition: '50% 45%' },
```

- [ ] **Step 5: Re-run the focused data test.**

Run:

```powershell
npm.cmd test -- src/data/profile.test.js
```

Expected: PASS.

- [ ] **Step 6: Commit the dependency and data correction if Git identity is configured.**

Run:

```powershell
git add package.json package-lock.json src/data/profile.js src/data/profile.test.js
git diff --cached --check
git commit -m "fix: correct gallery media and add gsap"
```

Expected: a commit only when `git config user.name` and `git config user.email` are available. If either is absent, keep this verified change staged and report the exact identity requirement rather than inventing an author identity.

## Task 2: Build and test the masked local-video headline

**Files:**
- Create: `src/components/MaskedHeading.jsx`
- Create: `src/components/MaskedHeading.test.jsx`
- Modify: `src/components/HeroVideo.jsx`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Write the failing masked-heading test.**

Create `src/components/MaskedHeading.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import MaskedHeading from './MaskedHeading';

describe('MaskedHeading', () => {
  it('renders the three title words as complete lines and exposes decorative media as hidden', () => {
    render(<MaskedHeading lines={['CAMPUS', 'FOOTBALL', 'JOURNAL']} videoSrc="/media/videos/free-kick-moment.mp4" poster="/media/photos/IMG_20260526_110154.jpg" reducedMotion />);

    expect(screen.getByRole('heading', { level: 1, name: 'CAMPUS FOOTBALL JOURNAL' })).toBeInTheDocument();
    expect(screen.getByText('CAMPUS')).toBeInTheDocument();
    expect(screen.getByText('FOOTBALL')).toBeInTheDocument();
    expect(screen.getByText('JOURNAL')).toBeInTheDocument();
    expect(screen.getByTestId('masked-heading-media')).toHaveAttribute('aria-hidden', 'true');
  });
});
```

- [ ] **Step 2: Run the new component test and confirm the expected failure.**

Run:

```powershell
npm.cmd test -- src/components/MaskedHeading.test.jsx
```

Expected: FAIL because `MaskedHeading.jsx` does not exist.

- [ ] **Step 3: Implement the focused component.**

Create `src/components/MaskedHeading.jsx` with this public interface and lifecycle shape:

```jsx
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function MaskedHeading({ lines, videoSrc, poster, reducedMotion = false }) {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    if (reducedMotion || !rootRef.current) return undefined;
    const context = gsap.context(() => {
      gsap.fromTo('.masked-heading__line', { yPercent: 112, opacity: 0 }, {
        yPercent: 0,
        opacity: 1,
        duration: 0.82,
        ease: 'power4.out',
        stagger: 0.1,
      });
    }, rootRef);
    return () => context.revert();
  }, [reducedMotion]);

  return (
    <h1 ref={rootRef} className="masked-heading" aria-label={lines.join(' ')}>
      <video data-testid="masked-heading-media" className="masked-heading__media" aria-hidden="true" src={videoSrc} poster={poster} autoPlay muted loop playsInline />
      {lines.map((line) => <span className="masked-heading__line" key={line}>{line}</span>)}
    </h1>
  );
}
```

Keep the `<video>` decorative and use CSS masking/background clipping or a positioned media layer so visible words remain real, accessible text. Do not split a word into individual character spans.

- [ ] **Step 4: Integrate the component into the Hero.**

In `HeroVideo.jsx`, replace the ordinary title node and use the active local video metadata:

```jsx
<MaskedHeading
  lines={['CAMPUS', 'FOOTBALL', 'JOURNAL']}
  videoSrc={activeVideo.src}
  poster={activeVideo.poster}
  reducedMotion={reducedMotion}
/>
```

Change the CTA handler to:

```js
const scrollToGallery = () => {
  document.getElementById('gallery')?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
};
```

Bind `scrollToGallery` to the signal button.

- [ ] **Step 5: Add scoped visual and reduced-motion rules.**

In `global.css`, implement these constraints:

```css
.masked-heading { display: grid; isolation: isolate; line-height: .78; overflow: clip; }
.masked-heading__line { display: block; white-space: nowrap; overflow-wrap: normal; word-break: normal; }
.masked-heading__media { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
@media (prefers-reduced-motion: reduce) { .masked-heading__line { transform: none !important; opacity: 1 !important; } }
```

Use the media layer only inside the heading visual treatment; preserve sufficient contrast with a dark outline/shadow. At `max-width: 390px` and `max-width: 360px`, reduce `font-size` with `clamp()` rather than breaking text at individual letters.

- [ ] **Step 6: Re-run the component test and existing tests.**

Run:

```powershell
npm.cmd test -- src/components/MaskedHeading.test.jsx src/components/Lightbox.test.jsx src/data/profile.test.js
```

Expected: all listed tests PASS.

- [ ] **Step 7: Commit the headline change if Git identity is configured.**

Run:

```powershell
git add src/components/MaskedHeading.jsx src/components/MaskedHeading.test.jsx src/components/HeroVideo.jsx src/styles/global.css
git diff --cached --check
git commit -m "feat: add masked campus football heading"
```

Expected: a focused commit or, without an available identity, a clean staged set limited to these files.

## Task 3: Build and test anchor-based PillNav

**Files:**
- Create: `src/components/PillNav.jsx`
- Create: `src/components/PillNav.test.jsx`
- Modify: `src/App.jsx`
- Modify: `src/styles/global.css`
- Delete: `src/components/SiteNavigation.jsx` only after import and selector checks pass

- [ ] **Step 1: Write the failing PillNav interaction test.**

Create `src/components/PillNav.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import PillNav from './PillNav';

const items = [
  { href: '#top', label: 'Home' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#about', label: 'About' },
];

describe('PillNav', () => {
  it('opens, closes with Escape, and closes after choosing an anchor', async () => {
    const user = userEvent.setup();
    render(<PillNav items={items} nickname="Lleno" number="19" />);
    const trigger = screen.getByRole('button', { name: 'Open navigation' });

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await user.keyboard('{Escape}');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await user.click(trigger);
    await user.click(screen.getByRole('link', { name: 'Gallery' }));
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });
});
```

- [ ] **Step 2: Run the test and confirm the expected failure.**

Run:

```powershell
npm.cmd test -- src/components/PillNav.test.jsx
```

Expected: FAIL because `PillNav.jsx` does not exist.

- [ ] **Step 3: Implement the navigation component.**

Create `src/components/PillNav.jsx` with local menu state, native anchors, and document-level Escape handling:

```jsx
import { useEffect, useId, useState } from 'react';

export default function PillNav({ items, nickname, number }) {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    const onKeyDown = (event) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <header className="pill-nav-shell">
      <nav className="pill-nav" aria-label="Primary navigation">
        <a className="pill-nav__mark" href="#top" aria-label="Back to the top">{nickname}<b>/{number}</b></a>
        <div className="pill-nav__links">{items.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</div>
        <button className="pill-nav__toggle" type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls={menuId} onClick={() => setOpen((value) => !value)}><span /><span /></button>
      </nav>
      <div id={menuId} className={open ? 'pill-nav__popover is-open' : 'pill-nav__popover'}>{items.map((item) => <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>)}</div>
    </header>
  );
}
```

Use a GSAP context only for optional open/close decoration when it does not conflict with CSS reduced-motion; native state must remain the source of truth. Do not use `react-router-dom`.

- [ ] **Step 4: Wire the approved anchors into `App.jsx`.**

Replace the `SiteNavigation` import and render with:

```jsx
const navigationItems = [
  { href: '#top', label: 'Home' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#about', label: 'About' },
  { href: '#style', label: 'Style' },
  { href: '#match-day', label: 'Match Day' },
  { href: '#journal', label: 'Journal' },
];

<PillNav items={navigationItems} nickname={profile.nickname} number={profile.number} />
```

- [ ] **Step 5: Add the compact editorial pill styling.**

In `global.css`, provide a fixed top-level shell, translucent dark pill, narrow off-white type, signal-green focus/active indicator, and a `max-width: 760px` popover. Include:

```css
.pill-nav__toggle:focus-visible,
.pill-nav a:focus-visible { outline: 2px solid var(--signal); outline-offset: 3px; }
@media (prefers-reduced-motion: reduce) { .pill-nav__popover { transition: none; } }
```

Ensure the desktop links remain visible at large widths and the menu button only appears for the small-screen layout.

- [ ] **Step 6: Run the navigation and regression tests.**

Run:

```powershell
npm.cmd test -- src/components/PillNav.test.jsx src/components/MaskedHeading.test.jsx src/components/Lightbox.test.jsx src/data/profile.test.js
```

Expected: all tests PASS.

- [ ] **Step 7: Remove the obsolete navigation file only after proving it is unused.**

Run:

```powershell
rg "SiteNavigation|site-header|site-nav|nav-toggle" src
```

Expected: no active component import or live CSS selector remains. Then delete `src/components/SiteNavigation.jsx` and remove its obsolete CSS rules without touching unrelated layout styles.

- [ ] **Step 8: Commit navigation work if Git identity is configured.**

Run:

```powershell
git add src/App.jsx src/components/PillNav.jsx src/components/PillNav.test.jsx src/components/SiteNavigation.jsx src/styles/global.css
git diff --cached --check
git commit -m "feat: replace navigation with football pill nav"
```

Expected: a focused commit, or a focused staged set if author identity remains unavailable.

## Task 4: Put the gallery directly after Hero and refine the visual rhythm

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/components/DriftWallGallery.jsx`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Add an App-level order regression test.**

Create `src/App.test.jsx` with mocked media-less child components if necessary, then assert section order from the rendered DOM:

```jsx
const ids = [...container.querySelectorAll('main > section')].map((section) => section.id || section.className);
expect(ids.indexOf('gallery')).toBeGreaterThan(ids.indexOf('top'));
expect(ids.indexOf('gallery')).toBeLessThan(ids.indexOf('about'));
```

Use `vi.mock` for `HeroVideo`, `DriftWallGallery`, and the other visual components only when their video/image rendering prevents a deterministic DOM test.

- [ ] **Step 2: Run the new order test and confirm it fails.**

Run:

```powershell
npm.cmd test -- src/App.test.jsx
```

Expected: FAIL because the existing gallery appears after Match Day and has no `gallery` section id.

- [ ] **Step 3: Move gallery directly after Hero.**

In `App.jsx`, make the `main` order exactly:

```jsx
<HeroVideo profile={profile} />
<DriftWallGallery groups={profile.galleryGroups} onSelectImage={openLightbox} />
<AboutSection profile={profile} />
<FootballStyle tags={profile.styleTags} />
<MatchDay matchDay={profile.matchDay} videos={profile.videos} />
<JournalTimeline journal={profile.journal} />
```

Keep the closing section and lightbox state unchanged.

- [ ] **Step 4: Give the gallery a stable anchor and correct its editorial number.**

Change the opening gallery section to:

```jsx
<section className="gallery-section section-block" id="gallery" aria-labelledby="gallery-title">
```

Change the visible kicker from `04` to `01` because it is now the first content section below the hero.

- [ ] **Step 5: Refine only the affected layout rules.**

In `global.css`, adjust Hero bottom spacing, gallery top padding, section-kicker sequencing, pill-nav z-index, and image-tile hover shadows. Preserve the existing gallery responsive column rules and lightbox dimensions. Do not introduce new external assets or global overflow.

- [ ] **Step 6: Run targeted tests and production build.**

Run:

```powershell
npm.cmd test -- src/App.test.jsx src/components/PillNav.test.jsx src/components/MaskedHeading.test.jsx src/components/Lightbox.test.jsx src/data/profile.test.js
npm.cmd run build
git diff --check
```

Expected: all tests PASS, Vite build succeeds, and no whitespace errors are reported.

- [ ] **Step 7: Commit the ordering and styling work if Git identity is configured.**

Run:

```powershell
git add src/App.jsx src/App.test.jsx src/components/DriftWallGallery.jsx src/styles/global.css
git diff --cached --check
git commit -m "feat: prioritize the football photo wall"
```

Expected: a focused commit, or a focused staged set if author identity remains unavailable.

## Task 5: Browser and media acceptance verification

**Files:**
- Modify only if a verified defect is found: `src/components/MaskedHeading.jsx`, `src/components/PillNav.jsx`, `src/components/HeroVideo.jsx`, `src/components/DriftWallGallery.jsx`, `src/App.jsx`, `src/data/profile.js`, `src/styles/global.css`

- [ ] **Step 1: Start the local server.**

Run:

```powershell
npm.cmd run dev -- --host 127.0.0.1
```

Expected: Vite prints a local URL, normally `http://127.0.0.1:5173/`.

- [ ] **Step 2: Verify 1440px desktop.**

Confirm masked title has exactly three visual word rows, the local video is visible inside the title treatment, nav links are readable and unobtrusive, Gallery navigation scrolls to the first content section, all images load, the gallery is three columns, and there is no horizontal scrollbar.

- [ ] **Step 3: Verify 768px tablet.**

Confirm each title word remains intact, the gallery uses two columns, navigation remains reachable, and the Hero-to-gallery transition does not overlap.

- [ ] **Step 4: Verify 390px and 320px mobile.**

Open the pill menu, close it with Escape, choose `Gallery`, reopen it, and choose `Journal`. Confirm each action closes the popover; the three title words remain whole; controls are not clipped; and no horizontal overflow appears.

- [ ] **Step 5: Verify reduced motion and image loading.**

Use browser media emulation for `prefers-reduced-motion: reduce`. Confirm GSAP entrance movement, video rotation/crossfade, and DriftWall parallax are suppressed while all text, anchors, and gallery tiles remain usable. In the browser console, run:

```js
[...document.querySelectorAll('.drift-tile img')].map(({ currentSrc, naturalWidth }) => ({ currentSrc, naturalWidth }))
```

Expected: every row has `naturalWidth` greater than zero; the corrected image URL includes `IMG_20250420_193630.jpg`.

- [ ] **Step 6: Re-run final automated evidence.**

Run:

```powershell
npm.cmd test
npm.cmd run build
git diff --check
git status --short
```

Expected: all tests and build pass; status lists only intentionally changed project files.

- [ ] **Step 7: Make a final verification commit if Git identity is configured.**

Run:

```powershell
git add src package.json package-lock.json
git diff --cached --check
git commit -m "fix: verify responsive football journal refinement"
```

Expected: a final commit only when repository author identity is configured; otherwise report the exact verified checks and leave files ready for the user to commit.

---

## Plan self-review

- **Spec coverage:** Task 1 covers GSAP and the filename fix; Task 2 covers the complete-word masked headline and reduced motion; Task 3 covers the adapted anchor-only pill navigation and accessibility; Task 4 covers gallery order, anchor, and visual rhythm; Task 5 covers all four viewport sizes, image loading, reduced motion, tests, build, and whitespace validation.
- **Completeness scan:** Every code-oriented task includes concrete affected files, commands, expected results, and the public component interface; no deferred or undefined work remains.
- **Type/name consistency:** `MaskedHeading` accepts `lines`, `videoSrc`, `poster`, and `reducedMotion` throughout. `PillNav` accepts `items`, `nickname`, and `number`; its approved anchors match `#top`, `#gallery`, `#about`, `#style`, `#match-day`, and `#journal`. The corrected asset path is consistently `IMG_20250420_193630.jpg`.
- **Scope:** This is one cohesive refinement of the existing single-page journal, not independent subsystems requiring separate plans.