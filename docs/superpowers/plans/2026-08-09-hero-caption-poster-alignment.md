# Hero Caption and Poster Alignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the first Hero image match the ????? / ?????? captions before video playback begins.

**Architecture:** Keep `HeroVideo.jsx` unchanged because it already reads the active clip, title, and `poster` from one entry in `profile.videos`. Replace only the unrelated poster assets with small JPEG frames extracted from their matching lightweight Hero videos, and lock the mapping with a data-level regression test.

**Tech Stack:** React, Vite, Vitest, FFmpeg, GitHub Pages.

---

### Task 1: Lock the expected media mapping with a failing test

**Files:**
- Modify: `src/data/profile.test.js`
- Test: `src/data/profile.test.js`

- [ ] **Step 1: Write the failing test**

```js
it('uses a matching extracted poster for each lightweight hero video', () => {
  expect(profile.videos).toEqual(expect.arrayContaining([
    expect.objectContaining({
      id: 'penalty',
      heroSrc: '/media/videos/hero-penalty.mp4',
      poster: '/media/posters/hero-penalty.jpg',
    }),
    expect.objectContaining({
      id: 'free-kick',
      heroSrc: '/media/videos/hero-free-kick.mp4',
      poster: '/media/posters/hero-free-kick.jpg',
    }),
  ]));
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm.cmd test -- src/data/profile.test.js`

Expected: FAIL because `profile.js` still points at unrelated photo posters.

### Task 2: Add matching poster assets and switch the profile mapping

**Files:**
- Create: `public/media/posters/hero-penalty.jpg`
- Create: `public/media/posters/hero-free-kick.jpg`
- Modify: `src/data/profile.js:31-46`

- [ ] **Step 1: Extract the corresponding Hero-video frames**

```powershell
& $ff -y -hide_banner -loglevel error -ss 3 -i public/media/videos/hero-penalty.mp4 -frames:v 1 public/media/posters/hero-penalty.jpg
& $ff -y -hide_banner -loglevel error -ss 3 -i public/media/videos/hero-free-kick.mp4 -frames:v 1 public/media/posters/hero-free-kick.jpg
```

- [ ] **Step 2: Change only the two poster fields**

```js
poster: asset('/media/posters/hero-penalty.jpg')
poster: asset('/media/posters/hero-free-kick.jpg')
```

- [ ] **Step 3: Run the focused test**

Run: `npm.cmd test -- src/data/profile.test.js`

Expected: PASS.

### Task 3: Verify and publish

**Files:**
- Modify: generated `dist/` only through the production build; do not commit it unless repository conventions require it.

- [ ] **Step 1: Run all automated checks**

Run: `npm.cmd test -- --run` and `npm.cmd run build`

Expected: all tests pass and Vite build succeeds.

- [ ] **Step 2: Commit intended files**

```powershell
git add src/data/profile.js src/data/profile.test.js public/media/posters/hero-penalty.jpg public/media/posters/hero-free-kick.jpg docs/superpowers/specs/2026-08-09-hero-caption-poster-alignment-design.md docs/superpowers/plans/2026-08-09-hero-caption-poster-alignment.md
git commit -m "fix: align hero posters with video captions"
```

- [ ] **Step 3: Push the verified commit to the publishing branch**

```powershell
git push origin HEAD:main
```

- [ ] **Step 4: Confirm GitHub Pages deployment**

Check the repository?s Actions workflow for the pushed commit and verify it completed successfully before reporting the public site as updated.
