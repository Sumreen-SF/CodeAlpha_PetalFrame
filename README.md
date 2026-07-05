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

```bash
# from inside the petalframe folder
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy to GitHub Pages

1. Create a new GitHub repository (e.g. `petalframe`).
2. Push these three files to the repo's root:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: PetalFrame gallery"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/petalframe.git
   git push -u origin main
   ```
3. On GitHub: go to **Settings → Pages**.
4. Under "Build and deployment", set **Source** to `Deploy from a branch`.
5. Set **Branch** to `main` and folder to `/ (root)`, then **Save**.
6. Wait about a minute — GitHub will give you a live URL like:
   `https://YOUR-USERNAME.github.io/petalframe/`

That's it — no build step, since this is plain HTML/CSS/JS.

## Swapping in your own photos
Replace the `src` and `data-full` URLs in `index.html` with your own image
links (or local files in an `/images` folder). Keep `data-category` matching
one of the filter values (`bloom`, `texture`, `still-life`, `facade`), or
rename the categories to fit your own photos — just make sure the filter
button's `data-filter` and the image's `data-category` use the exact same
text.