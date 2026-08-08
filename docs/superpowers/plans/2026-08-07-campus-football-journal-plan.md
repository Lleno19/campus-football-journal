# Campus Football Journal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (recommended for inline execution). Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and verify an original, responsive React + Vite single-page Campus Football Journal for Lleno using only the supplied local videos and photos.

**Architecture:** Use a small React component tree with one configuration module (`src/data/profile.js`) owning profile copy, journal entries, video metadata, photo groups, alt text, and focal positions. Keep interaction state local to the components: the hero owns video crossfade/autoplay fallback, the gallery owns pointer parallax and tile selection, and the lightbox owns keyboard/focus/scroll-lock behavior. Use one global stylesheet with scoped section naming and native CSS media queries rather than a UI framework.

**Tech Stack:** React, Vite, native CSS, CSS keyframes/transitions, React state/effects, Vitest + jsdom for focused interaction/data tests, real browser verification at four viewport sizes, Vite production build.

---

## File map

### Create

- `C:\Users\Lleno\Documents\ChatGPT\self website\package.json` — Vite scripts and minimal runtime/test dependencies.
- `C:\Users\Lleno\Documents\ChatGPT\self website\index.html` — document shell, metadata, font fallback declarations.
- `C:\Users\Lleno\Documents\ChatGPT\self website\src\main.jsx` — React entry point.
- `C:\Users\Lleno\Documents\ChatGPT\self website\src\App.jsx` — single-page composition and lightbox state boundary.
- `C:\Users\Lleno\Documents\ChatGPT\self website\src\data\profile.js` — all editable personal content and local asset metadata.
- `C:\Users\Lleno\Documents\ChatGPT\self website\src\components\SiteNavigation.jsx` — desktop links and mobile menu.
- `C:\Users\Lleno\Documents\ChatGPT\self website\src\components\HeroVideo.jsx` — two-video autoplay, timed rotation, crossfade, fallback, CTA.
- `C:\Users\Lleno\Documents\ChatGPT\self website\src\components\AboutSection.jsx` — bilingual profile narrative.
- `C:\Users\Lleno\Documents\ChatGPT\self website\src\components\FootballStyle.jsx` — qualitative style tags.
- `C:\Users\Lleno\Documents\ChatGPT\self website\src\components\MatchDay.jsx` — two video moment cards.
- `C:\Users\Lleno\Documents\ChatGPT\self website\src\components\DriftWallGallery.jsx` — three-column desktop DriftWall with responsive variants.
- `C:\Users\Lleno\Documents\ChatGPT\self website\src\components\Lightbox.jsx` — accessible image dialog.
- `C:\Users\Lleno\Documents\ChatGPT\self website\src\components\JournalTimeline.jsx` — editable journal timeline.
- `C:\Users\Lleno\Documents\ChatGPT\self website\src\styles\global.css` — tokens, typography, layout, responsive rules, motion preferences.
- `C:\Users\Lleno\Documents\ChatGPT\self website\src\test\setup.js` — Testing Library matchers and cleanup.
- `C:\Users\Lleno\Documents\ChatGPT\self website\src\data\profile.test.js` — data integrity tests.
- `C:\Users\Lleno\Documents\ChatGPT\self website\src\components\Lightbox.test.jsx` — open/close/Escape/focus behavior test.
- `C:\Users\Lleno\Documents\ChatGPT\self website\vite.config.js` — Vite and Vitest configuration.
- `C:\Users\Lleno\Documents\ChatGPT\self website\public\media\videos\` — the two MP4 files copied from `E:\self\soccer_university`.
- `C:\Users\Lleno\Documents\ChatGPT\self website\public\media\photos\` — JPG originals plus browser-safe HEIC derivatives copied from the inspected local material.

### Modify

- None expected because the repository currently has no application files. Existing contact sheets, preview HTML, and preview folders remain local inspection artifacts and are not used as website placeholders.

---

## Task 1: Scaffold the empty React + Vite application

**Files:** Create `package.json`, `index.html`, `src/main.jsx`, `src/App.jsx`, `src/styles/global.css`, `vite.config.js`.

- [ ] **Step 1: Create the package and scripts.**

Use this package shape:

```json
{
  "name": "campus-football-journal",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "@vitejs/plugin-react": "latest",
    "vite": "latest",
    "react": "latest",
    "react-dom": "latest"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "latest",
    "@testing-library/react": "latest",
    "@testing-library/user-event": "latest",
    "jsdom": "latest",
    "vitest": "latest"
  }
}
```

- [ ] **Step 2: Add Vite configuration and the HTML shell.**

`vite.config.js` must enable the React plugin and Vitest jsdom setup. `index.html` must set the title to `Campus Football Journal — Lleno`, include a short description, and include `<div id="root"></div>`.

- [ ] **Step 3: Add the entry point and a temporary composition shell.**

`src/main.jsx` renders `<App />` into `#root`. `src/App.jsx` initially renders one semantic `<main>` with a short heading so the server can be smoke-tested before feature components are added.

- [ ] **Step 4: Add the global CSS foundation.**

Define tokens for `--ink`, `--panel`, `--paper`, `--muted`, `--signal`, `--signal-2`, spacing, radii, and shadows. Set `box-sizing: border-box`, `body { margin: 0; min-width: 0; overflow-x: hidden; }`, dark background, readable default line-height, and visible `:focus-visible` outlines.

- [ ] **Step 5: Install and run the scaffold.**

Run:

```powershell
npm install
npm run build
```

Expected: dependency installation succeeds and Vite reports a successful production build.

- [ ] **Step 6: Commit the scaffold.**

```powershell
git add package.json package-lock.json index.html src vite.config.js
git commit -m "feat: scaffold campus football journal"
```

---

## Task 2: Copy and normalize the real local media

**Files:** Create `public/media/videos/` and `public/media/photos/`; modify `src/data/profile.js` in Task 3.

- [ ] **Step 1: Copy the two inspected MP4 files.**

```powershell
New-Item -ItemType Directory -Force public/media/videos, public/media/photos | Out-Null
Copy-Item 'E:\self\soccer_university\VID_20231111_182842.mp4' public/media/videos/penalty-shootout.mp4
Copy-Item 'E:\self\soccer_university\VID_20260526_010701.mp4' public/media/videos\free-kick-moment.mp4
```

- [ ] **Step 2: Copy all supplied JPG photos.**

Copy every `.jpg` from `E:\self\soccer_university` to `public/media/photos/` without renaming the original content except where a stable, readable filename is needed. Keep the source basename in a mapping comment or data entry.

- [ ] **Step 3: Preserve HEIC originals outside the public web asset path and generate derivatives.**

Do not edit the three source `.heic` files. Use the existing inspected derivatives in `C:\Users\Lleno\Documents\ChatGPT\self website\heic-preview\` when they match the corresponding originals. If a derivative is missing, generate a JPG with the installed image conversion tool, save it under `public/media/photos/`, and record the derivative in the data file.

- [ ] **Step 4: Verify media files exist and are non-empty.**

Run:

```powershell
Get-ChildItem public/media -Recurse -File | Where-Object Length -gt 0 | Sort-Object FullName
```

Expected: two MP4 files and all selected JPG/JPG-derivative files appear under `public/media`.

- [ ] **Step 5: Commit the media import.**

```powershell
git add public/media
 git commit -m "feat: add local football media"
```

---

## Task 3: Create the editable content model

**Files:** Create `src/data/profile.js`, `src/data/profile.test.js`.

- [ ] **Step 1: Write the failing data-shape test.**

```js
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
  });
});
```

- [ ] **Step 2: Run the test and verify it fails before the data file exists.**

Run:

```powershell
npm test -- src/data/profile.test.js
```

Expected: FAIL because `src/data/profile.js` is not yet defined.

- [ ] **Step 3: Implement `profile.js`.**

Use this shape and only confirmed copy:

```js
const profile = {
  nickname: 'Lleno',
  number: '19',
  position: 'Defensive Midfielder / ??',
  startedPlaying: '2016',
  reason: '??????????????',
  hero: {
    eyebrow: 'PLAY WITH HEART',
    title: 'Campus Football Journal',
    subtitle: '??????',
    cta: 'EXPLORE MY STORY',
  },
  intro: {
    en: 'Since 2016, football has been part of my campus life.',
    zh: '? 2016 ???????????????????',
    body: 'I play as a defensive midfielder ? learning, connecting, and enjoying the game with the people around me.',
    bodyZh: '????????????????????????????????',
  },
  styleTags: [
    { en: 'Ball Control', zh: '??' },
    { en: 'Defensive Awareness', zh: '????' },
    { en: 'Free Kick', zh: '???' },
    { en: 'Penalty', zh: '??' },
    { en: 'Team Play', zh: '????' },
    { en: 'Communication', zh: '????' },
  ],
  videos: [
    { id: 'penalty', src: '/media/videos/penalty-shootout.mp4', title: 'Penalty Shootout', titleZh: '????', poster: '/media/photos/IMG20250322225211.jpg' },
    { id: 'free-kick', src: '/media/videos/free-kick-moment.mp4', title: 'Free Kick Moment', titleZh: '?????', poster: '/media/photos/IMG_20260526_110154.jpg' },
  ],
  matchDay: [
    { videoId: 'penalty', kicker: 'NIGHT SESSION', title: 'Penalty Shootout', titleZh: '????', body: 'A focused moment under the lights.', bodyZh: '?????????' },
    { videoId: 'free-kick', kicker: 'CAMPUS FIELD', title: 'Free Kick Moment', titleZh: '?????', body: 'A ball, an open field, and the next touch.', bodyZh: '??????????????????' },
  ],
  galleryGroups: [
    {
      id: 'moments',
      label: 'My Moments',
      labelZh: '????',
      images: [
        { src: '/media/photos/IMG_20260526_000734.jpg', alt: 'Player controlling a ball on a campus field', focalPosition: '50% 50%' },
        { src: '/media/photos/IMG_20260526_110154.jpg', alt: 'Player running with the ball on a campus field', focalPosition: '50% 50%' },
        { src: '/media/photos/mmexport1779723731332.jpg', alt: 'Player striking a ball near the goal', focalPosition: '50% 50%' },
      ],
    },
    {
      id: 'team',
      label: 'My Team',
      labelZh: '????',
      images: [
        { src: '/media/photos/-6ea14c8d06105986.jpg', alt: 'Campus Team posing with a football banner', focalPosition: '50% 50%' },
        { src: '/media/photos/mmexport1735383826473.jpg', alt: 'Teammates gathering on a lit football field', focalPosition: '50% 50%' },
        { src: '/media/photos/mmexport1779723870830.jpg', alt: 'Campus Team gathered on the field', focalPosition: '50% 50%' },
      ],
    },
    {
      id: 'after-match',
      label: 'After the Match',
      labelZh: '????',
      images: [
        { src: '/media/photos/IMG20250528232602.jpg', alt: 'Teammates resting together after football', focalPosition: '50% 50%' },
        { src: '/media/photos/IMG20250413202035.jpg', alt: 'Teammates relaxing together on the field', focalPosition: '50% 50%' },
        { src: '/media/photos/mmexport1696509847898.jpg', alt: 'Player walking with a ball at sunset', focalPosition: '50% 50%' },
      ],
    },
  ],
  journal: [
    { year: '2016', label: 'BEGINNING', title: 'Started playing football', titleZh: '????', body: 'The first line in this journal.', bodyZh: '???????????' },
    { year: '', label: 'TRAINING', title: 'Campus training', titleZh: '????', body: 'A place to keep adding real practice memories.', bodyZh: '???????????' },
    { year: '', label: 'FRIENDS', title: 'Playing with friends', titleZh: '?????', body: 'Football is fun, and it brings people together.', bodyZh: '???????????????' },
    { year: '', label: 'MATCH DAY', title: 'Match-day moments', titleZh: '???', body: 'Keep this entry editable as the journal grows.', bodyZh: '?????????????????' },
    { year: '', label: 'AFTER', title: 'Conversations after training', titleZh: '????????', body: 'The game continues in the memories after the field.', bodyZh: '?????????????????' },
  ],
  closing: {
    image: '/media/photos/IMG20250528232602.jpg',
    imageAlt: 'Teammates resting together after a night football session',
    title: 'FOOTBALL STAYS WITH ME',
    titleZh: '???????????',
  },
};

export default profile;

All paths above must point to files copied under `public/media` before running tests. Do not use a remote image or a placeholder asset.

- [ ] **Step 4: Run the data test.**

Run `npm test -- src/data/profile.test.js`; expected: PASS.

- [ ] **Step 5: Commit the configuration model.**

```powershell
git add src/data/profile.js src/data/profile.test.js
 git commit -m "feat: add editable football journal data"
```

---

## Task 4: Build navigation, Hero, and page shell

**Files:** Create `src/components/SiteNavigation.jsx`, `src/components/HeroVideo.jsx`; modify `src/App.jsx`, `src/styles/global.css`.

- [ ] **Step 1: Write the Hero behavior contract before implementation.**

The component must render one active `<video>` with `autoPlay`, `muted`, `playsInline`, and `loop`; use a timer of 7000ms to switch between the two entries; use opacity classes for crossfade; update the title/Chinese title with the active video; show a play fallback when `onError` or `play()` rejects; and honor `prefers-reduced-motion` by disabling transition timing and automatic rotation.

- [ ] **Step 2: Implement `SiteNavigation`.**

Render a fixed or sticky compact nav with `Lleno / 19` branding, anchor links for `About`, `Style`, `Match Day`, `Journal`, and a mobile menu button with `aria-expanded`. Close the mobile menu after link activation and on Escape.

- [ ] **Step 3: Implement `HeroVideo`.**

Use a single hero wrapper with layered video, gradient overlays, eyebrow, title, metadata chips, active moment label, CTA, and a small progress indicator. Set mobile `object-position` to keep the main subject and ball visible. Use a poster from a real local photo for fallback.

- [ ] **Step 4: Compose the hero and navigation into `App.jsx`.**

Render `<SiteNavigation />`, `<HeroVideo />`, and empty anchor sections for later components. The CTA must call `document.getElementById('about')?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' })`.

- [ ] **Step 5: Run build and manually inspect the hero.**

Run `npm run dev -- --host 127.0.0.1`, open the local URL in a real browser, confirm the first video paints and text remains readable. Stop the server only after capture of the smoke result.

- [ ] **Step 6: Commit the hero shell.**

```powershell
git add src/App.jsx src/components/SiteNavigation.jsx src/components/HeroVideo.jsx src/styles/global.css
 git commit -m "feat: add responsive navigation and hero"
```

---

## Task 5: Add About, Football Style, Match Day, and Journal sections

**Files:** Create `AboutSection.jsx`, `FootballStyle.jsx`, `MatchDay.jsx`, `JournalTimeline.jsx`; modify `App.jsx`, `global.css`.

- [ ] **Step 1: Implement `AboutSection` from `profile.intro`.**

Use a split editorial layout: section index and title on the left, bilingual narrative and a small fact rail on the right. Render only `startedPlaying`, `position`, and `reason` from data.

- [ ] **Step 2: Implement `FootballStyle` from `profile.styleTags`.**

Render the six qualitative tags as animated-but-subtle pills/cards. No scores, ratings, progress bars, percentages, or invented claims.

- [ ] **Step 3: Implement `MatchDay` from `profile.matchDay`.**

Render two cards using the same local video paths and verified labels: penalty shootout for the night-field clip and free kick moment for the campus-stadium clip. Keep captions documentary and generic: no date, match name, score, or competition name.

- [ ] **Step 4: Implement `JournalTimeline` from `profile.journal`.**

Render each entry with an editable year/label/title/body structure. Keep the visual timeline usable at 320px by switching to a single vertical rule and full-width cards.

- [ ] **Step 5: Compose sections in `App.jsx`.**

Use semantic IDs `about`, `style`, `match-day`, and `journal` matching navigation anchors. Keep content data-driven and keep interaction out of the data file.

- [ ] **Step 6: Run build and test at narrow width.**

Run `npm run build`; open DevTools or browser emulation at 390px and 320px; verify text wraps without horizontal overflow.

- [ ] **Step 7: Commit the content sections.**

```powershell
git add src/App.jsx src/components/AboutSection.jsx src/components/FootballStyle.jsx src/components/MatchDay.jsx src/components/JournalTimeline.jsx src/styles/global.css
 git commit -m "feat: add football journal content sections"
```

---

## Task 6: Implement DriftWall gallery and accessible lightbox

**Files:** Create `src/components/DriftWallGallery.jsx`, `src/components/Lightbox.jsx`, `src/components/Lightbox.test.jsx`; modify `App.jsx`, `global.css`.

- [ ] **Step 1: Write the failing lightbox interaction test.**

```jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import Lightbox from './Lightbox';

describe('Lightbox', () => {
  it('closes with Escape and returns focus to the trigger', async () => {
    const user = userEvent.setup();
    const trigger = document.createElement('button');
    document.body.append(trigger);
    render(<Lightbox image={{ src: '/media/photos/example.jpg', alt: 'Football moment' }} onClose={() => trigger.focus()} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(trigger).toHaveFocus();
  });
});
```

- [ ] **Step 2: Run the test and verify it fails before implementation.**

Run `npm test -- src/components/Lightbox.test.jsx`; expected: FAIL because `Lightbox` does not exist.

- [ ] **Step 3: Implement `Lightbox`.**

Render a `role="dialog"` with `aria-modal="true"`, image alt text, close button, click-away handler, Escape listener, focus on mount, focus return through the caller, and body overflow restoration in an effect cleanup. Do not use a dependency for focus management.

- [ ] **Step 4: Implement `DriftWallGallery`.**

Flatten `profile.galleryGroups` into grouped sections. Render three desktop columns with CSS variables for tile width/height, depth, tilt, turn, speed, fade, dim, and overlay. Apply pointer-derived CSS transforms only above 768px and only when reduced motion is not requested. Use `button` tiles, local image sources, alt text, `loading="lazy"`, focal position CSS variables, and `onClick` to call the parent lightbox opener.

- [ ] **Step 5: Compose gallery/lightbox state in `App.jsx`.**

Keep `selectedImage` in `App`. Render the gallery after Match Day, pass `onSelectImage`, and render `Lightbox` only when an image is selected. Close on click-away and Escape.

- [ ] **Step 6: Run interaction tests and build.**

Run:

```powershell
npm test -- src/components/Lightbox.test.jsx
npm run build
```

Expected: PASS for Escape/focus behavior and a successful production build.

- [ ] **Step 7: Commit gallery and lightbox.**

```powershell
git add src/App.jsx src/components/DriftWallGallery.jsx src/components/Lightbox.jsx src/components/Lightbox.test.jsx src/styles/global.css
 git commit -m "feat: add drifting gallery and accessible lightbox"
```

---

## Task 7: Add closing section and final visual polish

**Files:** Modify `src/App.jsx`, `src/styles/global.css`, and `src/data/profile.js` only if verified asset metadata needs correction.

- [ ] **Step 1: Add the Closing section.**

Use one real local night-field, team, or post-match photo from `profile.closing`. Render the closing title, Chinese line, and `Lleno · No.19 · Since 2016` without adding new factual claims.

- [ ] **Step 2: Finish section rhythm and visual states.**

Add section numbering, thin rules, signal-green accents, hover/focus states, mobile nav transitions, and a footer with a simple content boundary. Keep decorative shapes clipped inside their section so they cannot create overflow.

- [ ] **Step 3: Implement reduced-motion rules.**

In `@media (prefers-reduced-motion: reduce)`, set all nonessential animation/transition durations to near-zero, disable DriftWall transform updates, disable smooth scrolling, and keep content visible.

- [ ] **Step 4: Run all automated checks.**

```powershell
npm test
npm run build
```

Expected: all tests pass and Vite production build succeeds.

- [ ] **Step 5: Commit final UI polish.**

```powershell
git add src/App.jsx src/data/profile.js src/styles/global.css
 git commit -m "feat: finish campus football journal experience"
```

---

## Task 8: Real-browser verification at four viewports

**Files:** No source changes unless a verification defect is found; update the plan/checklist only after fixes.

- [ ] **Step 1: Start the development server.**

Run `npm run dev -- --host 127.0.0.1` and note the actual local URL.

- [ ] **Step 2: Verify 1440px desktop in a real browser.**

Check that the hero text is readable over both videos, both clips switch after about 7 seconds, the DriftWall is visibly three columns, pointer parallax is subtle, all anchors work, and no horizontal scrollbar is present.

- [ ] **Step 3: Verify 768px tablet.**

Check that the nav remains usable, the gallery is two columns, the hero keeps the principal subject visible, cards do not overlap, and the closing image does not overflow.

- [ ] **Step 4: Verify 390px mobile.**

Check that the menu opens/closes, the hero text does not cover the subject, the gallery remains readable, lightbox touch sizing works, Escape closes it, and no horizontal overflow appears.

- [ ] **Step 5: Verify 320px small mobile.**

Check that navigation, bilingual text, tags, timeline, gallery tiles, and closing copy remain inside the viewport without clipped controls or tiny unreadable type.

- [ ] **Step 6: Verify reduced motion.**

Enable the browser's `prefers-reduced-motion: reduce` emulation. Confirm hero crossfade/rotation and DriftWall parallax are disabled or minimized while all content remains available.

- [ ] **Step 7: Verify fallback and media support.**

Temporarily block autoplay or pause media in the browser and confirm the hero still exposes a poster/play fallback. Record that original HEIC files are not referenced directly if the browser does not reliably decode them; the JPG derivatives are used instead.

- [ ] **Step 8: Fix any observed defects, rerun all checks, and create a final verification commit.**

Use a focused commit such as:

```powershell
git add <only-files-fixed-during-verification>
git commit -m "fix: resolve responsive browser verification issues"
```

- [ ] **Step 9: Report verified and unresolved items separately.**

Final report must list changed files, startup command, editable configuration fields, browser/media limitations, viewport checks, and any copy still intentionally left editable.

---

## Plan self-review

- Spec coverage: all seven page sections, two inspected videos, local-only media, HEIC derivatives, DriftWall parameters, lightbox behavior, editable journal, responsive breakpoints, reduced-motion, browser verification, and production build are assigned to Tasks 2–8.
- Placeholder scan: no TODO/TBD/lorem/FIXME instructions, ellipsis asset paths, or stub collection comments remain; Task 3 contains concrete local asset paths and editable entries.
- Type/name consistency: the plan consistently uses `profile.videos`, `profile.matchDay`, `profile.galleryGroups`, `profile.journal`, `Lightbox`, `DriftWallGallery`, and `selectedImage`.
- Scope: this is one cohesive single-page frontend subsystem, so it remains one implementation plan.
