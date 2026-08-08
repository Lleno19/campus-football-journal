# Campus Football Journal — Design Specification

- Date: 2026-08-07
- Project: `C:\Users\Lleno\Documents\ChatGPT\self website`
- Status: Revision 1 approved by user; pending written-spec review before implementation

## 0. Approved revision — React Bits headline, pill navigation, and gallery priority

**Precedence:** This approved revision supersedes the visual-direction, page-order, navigation, technical, motion, and verification statements below wherever they conflict.

### Direction

Preserve the original, local-media campus-football journal but focus its first impression into a restrained editorial sports identity: dark graphite field, condensed off-white type, and fluorescent green only as a precise signal for navigation state, focus, counters, rules, and a restrained glow. Keep all football stories personal and truthful; import no external images, third-party branding, names, scores, awards, or invented records.

### Hero, gallery, and order

- Adapt the supplied React Bits `MaskedHeading` to render the exact hero composition `CAMPUS` / `FOOTBALL` / `JOURNAL`: three complete words, one per line. The existing local football video is revealed inside the letters over a dark graphite field.
- At every viewport, words may move to a new line only as whole words. Do not use `overflow-wrap: anywhere`, letter-by-letter splitting, or any equivalent character-breaking behavior.
- Reorder the page to: Hero → DriftWall gallery → About → Football Style → Match Day → Football Journal → Closing.
- Change the hero CTA to scroll to the gallery immediately below it.
- Correct the missing gallery image reference from `/media/photos/IMG20250420_193630.jpg` to the verified asset `/media/photos/IMG_20250420_193630.jpg`.

### Navigation and interaction boundaries

- Replace the existing text navigation with an adapted React Bits `PillNav`: a rounded semi-transparent pill, focused signal-green active/hover state, and compact small-screen popover.
- This is a single-page site. Use anchor links for `Home`, `Gallery`, `About`, `Style`, `Match Day`, and `Journal`; do not add React Router just for navigation.
- Add the focused `gsap` dependency required by the two user-supplied React Bits patterns. Preserve accessibility: a labelled menu trigger, `aria-expanded`, Escape close, close-after-anchor-selection, keyboard focus management, visible focus states, and `prefers-reduced-motion` fallbacks.
- Preserve the existing accessible lightbox behavior: click-away and Escape close, focus return, touch-friendly controls, and body-scroll locking.

### Acceptance criteria

- **1440px:** high-impact masked heading, readable video inside letters, subtle pill nav, and a stable three-column gallery.
- **768px:** complete words, usable pill navigation, two-column gallery, and no overlap.
- **390px / 320px:** `CAMPUS`, `FOOTBALL`, and `JOURNAL` stay whole; menu controls are not clipped; no horizontal scrolling occurs.
- Every gallery image has `naturalWidth > 0`, including `IMG_20250420_193630.jpg`.
- Reduced-motion mode retains all content and navigation while suppressing nonessential GSAP, hero, and DriftWall movement.
- Final evidence: `npm.cmd test`, `npm.cmd run build`, `git diff --check`, plus browser review at 1440px, 768px, 390px, and 320px.

## 1. Product intent

Create an original, single-page personal campus-football journal for Lleno. The site should feel truthful, restrained, and personal: a visual archive of campus football, practice, teammates, match-day moments, and memories—not a professional-player profile.

All factual content is limited to confirmed information:

- Nickname: Lleno
- Shirt number: 19
- Position: Defensive Midfielder / 后腰
- Started playing: 2016
- Reason: football is fun and helps meet many friends
- Main context: campus football, daily practice, friends' games, and campus memories

Do not invent clubs, competitions, scores, dates, rankings, goals, assists, awards, ratings, or player identities.

## 2. Visual direction

Use a dark graphite/black foundation with white condensed English display typography and small cyan / fluorescent-green accents. The mood is cinematic and competitive but quiet: floodlights, field markings, documentary captions, and measured movement. English carries visual hierarchy; Chinese explains personal meaning.

Primary copy:

- `PLAY WITH HEART`
- `用热爱踢球`
- `Campus Football Journal`
- `校园足球记录`

Reference only the atmosphere and interaction language of UFL; do not copy its logo, words, brand assets, media, or page layout.

## 3. Page structure

### Hero / first screen

- Full-bleed rotating video background with two real local MP4 assets.
- `VID_20231111_182842.mp4` is assigned to `Penalty Shootout / 点球大战` after frame inspection: night field, penalty area and goal direction.
- `VID_20260526_010701.mp4` is assigned to `Free Kick Moment / 任意球时刻` after frame inspection: campus stadium, Lleno's No.19 shirt, and kicking sequence.
- Each clip displays for approximately 6–8 seconds with muted autoplay, loop, and crossfade.
- Layer a dark gradient and readable content panel over the video.
- Hero metadata: `Lleno / No.19`, `Defensive Midfielder`, `Since 2016`.
- CTA: `EXPLORE MY STORY`, scrolling to About.
- Provide a poster/play fallback when autoplay is unavailable.
- Preserve the main person and ball on narrow viewports through responsive object positioning.

### About Me

A bilingual, configuration-driven personal introduction using only the confirmed facts above. The section explains that football has been part of campus life since 2016 and that the defensive-midfielder role connects play, protects the team, and enjoys the moment without presenting invented statistics.

### My Football Style

Display editable qualitative tags/cards only:

- Ball Control / 控球
- Defensive Awareness / 防守意识
- Free Kick / 任意球
- Penalty / 点球
- Team Play / 团队配合
- Communication / 场上交流

No numerical ratings or scouting-report claims.

### Match Day

Two editorial cards tied to the two real videos. Copy describes the moment and feeling, not a fabricated match, date, score, or competition. The section visually alternates the two moments and includes a restrained motion cue.

### DriftWall gallery

Integrate a dedicated DriftWall component rather than replacing it with a normal grid. Use only local assets from `E:\self\soccer_university` and browser-safe converted HEIC derivatives when necessary.

Desktop baseline:

- 3 columns
- tile width 210px
- tile height 140px
- gap 16px
- tilt 12
- turn -10
- perspective 1200
- depth 110
- speed 28
- parallax 0.4
- lift 52
- fade 0.58
- dim 0.56
- overlay `#05080A`

Responsive behavior:

- 1440px: stable three-column wall with pointer parallax.
- 768px: two-column wall with reduced depth.
- 390px / 320px: one or two columns, reduced or disabled parallax, no forced tiny tiles.

Group labels:

- `My Moments / 我的瞬间`
- `My Team / 我的球队`
- `After the Match / 比赛之后`

People in photos are described generically (`Teammates`, `Campus Team`); do not infer identities or add names. Images use meaningful alt text and preserve heads, balls, and key actions with `object-fit: cover` plus suitable focal positions.

Clicking a tile opens an accessible lightbox with a large image, close button, click-away close, keyboard focus, Escape close, touch-friendly sizing, and body-scroll locking without stopping DriftWall's own motion.

### Football Journal

A simple editable timeline driven by configuration, initially containing only:

- 2016: started playing football
- campus training
- playing with friends
- match days
- free-kick and penalty moments
- post-training conversations and memories

The data structure must remain easy to edit rather than hard-coding copy into components.

### Closing

Use a night-field, team, or post-match local photo with:

- `FOOTBALL STAYS WITH ME`
- `足球会一直在我的生活里`
- `Lleno · No.19 · Since 2016`

## 4. Technical structure

If the project is empty, scaffold React + Vite. Use native CSS and React state; do not add a large dependency for visual effects.

Planned components:

- `SiteNavigation`
- `HeroVideo`
- `AboutSection`
- `FootballStyle`
- `MatchDay`
- `DriftWallGallery`
- `Lightbox`
- `JournalTimeline`

Planned data file:

- `src/data/profile.js`

The data file owns profile copy, journal entries, video paths, video labels, photo paths, gallery groups, alt text, and focal-position metadata. Components own layout and interaction only.

## 5. Accessibility and motion

- Semantic sections and headings.
- Keyboard-operable navigation, gallery tiles, and lightbox.
- Visible focus states.
- `aria-label` / `aria-describedby` where needed.
- `prefers-reduced-motion: reduce` disables crossfade animation, DriftWall parallax, and nonessential movement.
- No horizontal overflow at 1440, 768, 390, or 320px.

## 6. Verification gates

After implementation:

1. Start the local development server.
2. Open the site in a real browser.
3. Check 1440px, 768px, 390px, and 320px viewports.
4. Verify both videos load, autoplay when allowed, and crossfade.
5. Verify the DriftWall is three columns on desktop and responsive below it.
6. Verify the lightbox opens, is keyboard-focusable, and closes with click and Escape.
7. Verify video focal points and text contrast on mobile.
8. Verify no horizontal overflow.
9. Verify reduced-motion behavior.
10. Run the production build.

Build success alone is not acceptance proof; browser and visual checks are required.

## 7. Open items / honest boundaries

- The exact wording of future journal entries remains editable in `src/data/profile.js`.
- The original HEIC files remain untouched; the website may use existing/generated JPG derivatives for browser compatibility.
- No additional personal names, competition names, dates, scores, or statistics are required for the first implementation.
