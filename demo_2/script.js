/* ══════════════════════════════════════════════════════════════
   ASHI — DEMO 2 SCRIPT
   ══════════════════════════════════════════════════════════════ */

'use strict';

/* ── Product Data ── */
const PRODUCTS = [
  { id: 1,  title: 'MIDNIGHT_DRILL',   type: 'beats',   key: 'D MIN',   bpm: 140, price: '$29', img: 'https://picsum.photos/seed/drill01/400/400?grayscale' },
  { id: 2,  title: 'CARBON_LOOP_04',   type: 'loops',   key: 'F# MAJ',  bpm: 95,  price: '$14', img: 'https://picsum.photos/seed/carbon02/400/400?grayscale' },
  { id: 3,  title: 'PERCUSSIVE_KIT_1', type: 'kits',    key: '—',       bpm: 128, price: '$22', img: 'https://picsum.photos/seed/perc03/400/400?grayscale' },
  { id: 4,  title: 'ATMO_PAD_SET',     type: 'samples', key: 'G MAJ',   bpm: 80,  price: '$18', img: 'https://picsum.photos/seed/atmo04/400/400?grayscale' },
  { id: 5,  title: 'AMBER_TRAP_VOL2',  type: 'beats',   key: 'A MIN',   bpm: 138, price: '$35', img: 'https://picsum.photos/seed/amber05/400/400?grayscale' },
  { id: 6,  title: 'RAW_808_PACK',     type: 'samples', key: '—',       bpm: 150, price: '$12', img: 'https://picsum.photos/seed/raw06/400/400?grayscale' },
  { id: 7,  title: 'SEQUENCE_09',      type: 'loops',   key: 'C MAJ',   bpm: 112, price: '$16', img: 'https://picsum.photos/seed/seq07/400/400?grayscale' },
  { id: 8,  title: 'INDUSTRIAL_KIT',   type: 'kits',    key: '—',       bpm: 160, price: '$28', img: 'https://picsum.photos/seed/indust08/400/400?grayscale' },
  { id: 9,  title: 'DEEP_STEM_VOL1',   type: 'beats',   key: 'E MIN',   bpm: 88,  price: '$42', img: 'https://picsum.photos/seed/deep09/400/400?grayscale' },
  { id: 10, title: 'GRANULAR_TEXTURES',type: 'samples', key: '—',       bpm: 90,  price: '$20', img: 'https://picsum.photos/seed/gran10/400/400?grayscale' },
  { id: 11, title: 'CHROMATIC_BASS',   type: 'loops',   key: 'B MIN',   bpm: 130, price: '$15', img: 'https://picsum.photos/seed/chrom11/400/400?grayscale' },
  { id: 12, title: 'GHOST_PERCUSSION', type: 'kits',    key: '—',       bpm: 145, price: '$25', img: 'https://picsum.photos/seed/ghost12/400/400?grayscale' },
  { id: 13, title: 'WIRE_SYNTH_01',    type: 'beats',   key: 'G MIN',   bpm: 118, price: '$38', img: 'https://picsum.photos/seed/wire13/400/400?grayscale' },
  { id: 14, title: 'VAPOR_CHORDS',     type: 'samples', key: 'Eb MAJ',  bpm: 85,  price: '$17', img: 'https://picsum.photos/seed/vapor14/400/400?grayscale' },
  { id: 15, title: 'MECHANICAL_HH',    type: 'kits',    key: '—',       bpm: 155, price: '$22', img: 'https://picsum.photos/seed/mech15/400/400?grayscale' },
  { id: 16, title: 'ORBIT_LOOP_SET',   type: 'loops',   key: 'C# MIN',  bpm: 102, price: '$13', img: 'https://picsum.photos/seed/orbit16/400/400?grayscale' },
];

/* ── State ── */
let cartCount = 0;
let activeFilter = 'all';

/* ── Badge colour map ── */
const BADGE_CLASS = { beats: 'badge--beat', samples: 'badge--sample', loops: 'badge--loop', kits: 'badge--kit' };

/* ══════════════════════════════════════════════════════════════
   RENDER PRODUCTS
   ══════════════════════════════════════════════════════════════ */
function renderProducts(filter) {
  const grid  = document.getElementById('productGrid');
  const count = document.getElementById('productCount');
  if (!grid) return;

  const list = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.type === filter);
  count.textContent = `${list.length} TRACK${list.length !== 1 ? 'S' : ''}`;

  grid.innerHTML = list.map(p => `
    <div class="col-6 col-md-4 col-lg-3">
      <article class="product-card" data-id="${p.id}" data-type="${p.type}">

        <div class="product-thumb-wrap">
          <img
            class="product-thumb"
            src="${p.img}"
            alt="${p.title}"
            loading="lazy"
          />
          <span class="product-type-badge ${BADGE_CLASS[p.type]}">${p.type.toUpperCase()}</span>
          <span class="product-bpm">${p.bpm} BPM</span>
          <div class="play-overlay">
            <button class="play-btn" aria-label="Preview ${p.title}">
              <i class="ph ph-play"></i>
            </button>
          </div>
        </div>

        <div class="product-body">
          <p class="product-title">${p.title}</p>
          <div class="product-meta-row">
            <span class="product-key">${p.key}</span>
            <span class="product-price">${p.price}</span>
          </div>
          <button class="product-card-btn" data-id="${p.id}">+ ADD TO CART</button>
        </div>

      </article>
    </div>
  `).join('');

  /* Bind card buttons */
  grid.querySelectorAll('.product-card-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      const product = PRODUCTS.find(p => p.id === id);
      if (product) addToCart(product);
    });
  });

  /* Bind play buttons */
  grid.querySelectorAll('.play-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const card = btn.closest('.product-card');
      const id   = parseInt(card.dataset.id);
      const product = PRODUCTS.find(p => p.id === id);
      if (product) showToast(`▶ PLAYING: ${product.title}`);
    });
  });
}

/* ══════════════════════════════════════════════════════════════
   CART
   ══════════════════════════════════════════════════════════════ */
function addToCart(product) {
  cartCount++;
  const badge = document.getElementById('cartBadge');
  if (badge) badge.textContent = cartCount;
  showToast(`ADDED: ${product.title} — ${product.price}`);
}

/* ══════════════════════════════════════════════════════════════
   TOAST
   ══════════════════════════════════════════════════════════════ */
function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  toast.innerHTML = `<span class="toast-dot"></span>${message}`;
  container.appendChild(toast);

  setTimeout(() => { toast.remove(); }, 2800);
}

/* ══════════════════════════════════════════════════════════════
   FILTER BUTTONS
   ══════════════════════════════════════════════════════════════ */
function initFilters() {
  const btns = document.querySelectorAll('.filter-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      renderProducts(activeFilter);
    });
  });
}

/* ══════════════════════════════════════════════════════════════
   WAVEFORM BARS (decorative)
   ══════════════════════════════════════════════════════════════ */
function buildWaveform() {
  const container = document.getElementById('waveformBars');
  if (!container) return;

  const BAR_COUNT = 120;
  const fragment  = document.createDocumentFragment();

  for (let i = 0; i < BAR_COUNT; i++) {
    const bar = document.createElement('div');
    bar.className = 'waveform-bar';
    const h = Math.max(8, Math.random() * 100);
    bar.style.height = h + '%';
    fragment.appendChild(bar);
  }

  container.appendChild(fragment);
  animateWaveform(container);
}

function animateWaveform(container) {
  const bars = container.querySelectorAll('.waveform-bar');
  if (!bars.length) return;

  let tick = 0;
  setInterval(() => {
    tick++;
    bars.forEach((bar, i) => {
      const phase = (i / bars.length) * Math.PI * 4 + tick * 0.05;
      const h = Math.max(6, (Math.sin(phase) * 0.5 + 0.5) * 100);
      bar.style.height = h + '%';
      const bright = h > 60 ? 'rgba(0,85,255,0.8)' : 'rgba(0,85,255,0.18)';
      bar.style.background = bright;
    });
  }, 80);
}

/* ══════════════════════════════════════════════════════════════
   CART BUTTON HINT
   ══════════════════════════════════════════════════════════════ */
function initCartButton() {
  const btn = document.getElementById('cartBtn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    if (cartCount === 0) {
      showToast('CART IS EMPTY');
    } else {
      showToast(`${cartCount} ITEM${cartCount > 1 ? 'S' : ''} IN CART`);
    }
  });
}

/* ══════════════════════════════════════════════════════════════
   INIT
   ══════════════════════════════════════════════════════════════ */
function initHeroCard() {
  const btn = document.getElementById('heroAddBtn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const product = PRODUCTS.find(p => p.id === 1);
    if (product) addToCart(product);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts('all');
  initFilters();
  buildWaveform();
  initCartButton();
  initHeroCard();
});
