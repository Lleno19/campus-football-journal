# Hero Caption and Poster Alignment Design

## Goal
Keep the existing truthful Hero titles??Penalty Shootout / ????? and ?Free Kick Moment / ???????while ensuring the initial image shown before each video starts comes from that exact Hero clip.

## Root Cause
`HeroVideo` correctly renders the active clip and its active title from `profile.videos`, but its `poster` values currently point at unrelated gallery photographs. With `preload="metadata"`, those unrelated posters are visible before the video frame is decoded.

## Selected Design
1. Extract one representative JPEG frame from each lightweight Hero MP4.
2. Store them in `public/media/posters/` with stable descriptive names.
3. Point each video?s `poster` field to its matching extracted frame.
4. Retain `heroSrc`, English and Chinese captions, and current switching behavior unchanged.

## Constraints
- Use only the user?s own local football footage.
- Do not alter the full Match Day videos or the DriftWall photo gallery.
- Keep the poster payload small enough for fast static-site loading.

## Verification
- A profile-data regression test asserts each Hero clip uses its matching poster path.
- Component tests retain the one-lightweight-video and poster-attribute checks.
- Run the full test suite and production build.
- Commit and push to `main`, then verify the Pages workflow for the pushed commit.
