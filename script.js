/* =========================================================
   PETALFRAME GALLERY LOGIC
   Two independent features live here:
   1. Category filtering (the pills at the top)
   2. The lightbox (click an image -> big view -> next/prev/close)
   They're kept separate on purpose — each does one job.
   ========================================================= */

// ---- Grab the elements we'll need, once, up front ----
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems  = document.querySelectorAll('.gallery-item');
const emptyState    = document.getElementById('emptyState');

const lightbox        = document.getElementById('lightbox');
const lightboxImage   = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const closeBtn        = document.getElementById('lightboxClose');
const prevBtn         = document.getElementById('lightboxPrev');
const nextBtn         = document.getElementById('lightboxNext');

// This tracks which image is currently open in the lightbox, as an
// index into the "currently visible" items array. We need this so
// next/prev know where to go.
let visibleItems = Array.from(galleryItems);
let currentIndex = 0;

// ---- Fun entrance animation setup ----
// Each card's CSS animation-delay reads a --i custom property (see
// style.css's .gallery-item rule). We set it here, once, per item's
// position — that's what makes them rise in one-after-another instead
// of all at once.
galleryItems.forEach((item, index) => {
  item.style.setProperty('--i', index);
});


/* =========================================================
   1. FILTERING
   Each button has data-filter="bloom" etc. Each figure has
   data-category="bloom" etc. We just compare the two.
   ========================================================= */
filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const chosenFilter = btn.dataset.filter; // e.g. "bloom" or "all"

    // Swap the .active style to whichever button was just clicked
    filterButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    // Show/hide items based on whether they match the filter.
    // We toggle a class instead of removing elements from the DOM —
    // that keeps things simple and instant (no re-fetching, no re-render).
    galleryItems.forEach((item) => {
      const matches = chosenFilter === 'all' || item.dataset.category === chosenFilter;
      item.classList.toggle('hidden', !matches);
    });

    // Recompute which items are visible now — the lightbox's next/prev
    // should only cycle through what the user can currently see.
    visibleItems = Array.from(galleryItems).filter(
      (item) => !item.classList.contains('hidden')
    );

    // If a filter matches nothing, show a friendly empty state instead
    // of a blank page.
    emptyState.hidden = visibleItems.length > 0;
  });
});


/* =========================================================
   2. LIGHTBOX — OPEN
   Clicking any gallery image opens the lightbox showing THAT
   image's full-size version (data-full), and remembers its
   index so Next/Prev can move relative to it.
   ========================================================= */
function openLightbox(item) {
  currentIndex = visibleItems.indexOf(item);
  showImageAt(currentIndex);

  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden'; // stop background scroll while open
}

function showImageAt(index) {
  const item = visibleItems[index];
  const img  = item.querySelector('img');

  // data-full is the high-res version; we load that only now, on demand,
  // rather than upfront — keeps the initial page load fast.
  lightboxImage.src = img.dataset.full;
  lightboxImage.alt = img.alt;
  lightboxCaption.textContent = item.querySelector('figcaption').textContent;
}

galleryItems.forEach((item) => {
  item.addEventListener('click', () => openLightbox(item));

  // Let keyboard users "click" an item with Enter, same as a mouse click
  item.setAttribute('tabindex', '0');
  item.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') openLightbox(item);
  });
});


/* =========================================================
   3. LIGHTBOX — CLOSE
   ========================================================= */
function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

closeBtn.addEventListener('click', closeLightbox);

// Clicking the dark backdrop (but not the image itself) also closes it
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});


/* =========================================================
   4. LIGHTBOX — NEXT / PREV
   The "+ visibleItems.length) % visibleItems.length" pattern wraps
   the index around (so Next on the last image loops to the first,
   and Prev on the first loops to the last) without an if/else.
   ========================================================= */
function showNext() {
  currentIndex = (currentIndex + 1) % visibleItems.length;
  showImageAt(currentIndex);
}

function showPrev() {
  currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
  showImageAt(currentIndex);
}

nextBtn.addEventListener('click', showNext);
prevBtn.addEventListener('click', showPrev);


/* =========================================================
   5. KEYBOARD SUPPORT
   Left/Right arrows navigate, Escape closes — expected behavior
   for anyone who's used a lightbox before.
   ========================================================= */
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return; // ignore if closed

  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowRight') showNext();
  if (e.key === 'ArrowLeft')  showPrev();
});