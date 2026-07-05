# PetalFrame — Image Gallery

A responsive image gallery built with HTML, CSS, and vanilla JavaScript.
No frameworks, no build step — just three files.

## Files
- `index.html` — page structure, gallery markup, lightbox markup
- `style.css` — palette, layout, hover effects, lightbox styling, responsive rules
- `script.js` — filtering logic + lightbox open/close/next/prev

## Features
- Responsive CSS Grid gallery (auto-adjusts columns to screen width)
- Click any image to open a full-screen lightbox
- Next / Prev buttons, plus arrow-key navigation, inside the lightbox
- Escape key or backdrop click closes the lightbox
- Category filter pills (Bloom, Texture, Still Life, Facade)
- Hover "frame" effect — a thin line draws in around each photo
- Keyboard accessible (tab to an image, hit Enter to open it)
- Small fun touches: cards rise/fade in on load (staggered), the
  lightbox "pops" open with a slight bounce, and a 🌸 gently floats
  next to the tagline

## About the gallery photos
Images are hosted on [Picsum](https://picsum.photos) — a placeholder
image service built specifically so links don't go stale (unlike
hotlinking directly to a random photo site, which can 404 over time,
as happened with the earlier version of this project). Swap them out
for your own photos whenever you're ready — see the section below.

## Run it locally
No build tools needed. Just open `index.html` in a browser, or for a
closer-to-production test, serve it locally:
