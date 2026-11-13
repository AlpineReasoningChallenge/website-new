// ARC motion and small interactions.
// The code that hides an element is the same code that shows it again, and it only hides
// elements below the fold when it runs. If this file fails, nothing stays hidden.
import Lenis from 'lenis';

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasIO = 'IntersectionObserver' in window;
const narrow = matchMedia('(max-width: 52rem)').matches;

// Smooth wheel scrolling. Touch scrolling stays native. In-page links glide to their target;
// the skip link is left alone so it still moves keyboard focus.
let lenis = null;
function smoothScroll() {
  if (reduce) return;
  lenis = new Lenis({ lerp: 0.13, smoothWheel: true });
  const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || link.classList.contains('skip-link') || link.hash.length < 2) return;
    const target = document.getElementById(link.hash.slice(1));
    if (!target) return;
    event.preventDefault();
    lenis.scrollTo(target, { duration: 1.1 });
    history.pushState(null, '', link.hash);
  });
}

// Section headings rise in once, as they reach the screen.
function reveals() {
  if (!hasIO || reduce) return;
  const below = (el) => el.getBoundingClientRect().top > innerHeight * (narrow ? 1 : 0.92);
  const io = new IntersectionObserver(
    (entries) => {
      let step = 0;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target;
        io.unobserve(el);
        const delay = Math.min(step++, 3) * 70;
        el.style.setProperty('--reveal-delay', `${delay}ms`);
        el.classList.add('reveal-in');
        el.classList.remove('reveal-pending');
        setTimeout(() => {
          el.classList.remove('reveal-in');
          el.style.removeProperty('--reveal-delay');
        }, delay + 1500);
      }
    },
    { rootMargin: narrow ? '0px' : '0px 0px -8% 0px' },
  );
  for (const el of document.querySelectorAll('[data-reveal]')) {
    if (!below(el)) continue;
    el.classList.add('reveal-pending');
    io.observe(el);
  }
}

// The header gains a shadow once the page has moved.
function headerState() {
  const header = document.querySelector('.site-header');
  if (!header || !hasIO) return;
  const sentinel = document.createElement('div');
  sentinel.setAttribute('aria-hidden', 'true');
  sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:8px;pointer-events:none';
  document.body.prepend(sentinel);
  new IntersectionObserver(([entry]) => header.toggleAttribute('data-scrolled', !entry.isIntersecting)).observe(sentinel);
}

// "74 days to go" beside the next event. Left empty once the day has passed.
function countdown() {
  for (const el of document.querySelectorAll('[data-countdown]')) {
    const [y, m, d] = el.dataset.countdown.split('-').map(Number);
    const today = new Date();
    const days = Math.round((new Date(y, m - 1, d) - new Date(today.getFullYear(), today.getMonth(), today.getDate())) / 864e5);
    if (days > 1) el.textContent = `${days} days to go`;
    else if (days === 1) el.textContent = 'Tomorrow';
    else if (days === 0) el.textContent = 'Today';
    if (days >= 0) el.hidden = false;
  }
}

// Sample problem: check a typed answer against the part's answer.
function answerChecks() {
  for (const form of document.querySelectorAll('form.check')) {
    const input = form.querySelector('input');
    const result = form.querySelector('.check-result');
    form.hidden = false;
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const value = input.value.trim();
      if (!value) return;
      const right = Number(value) === Number(form.dataset.answer);
      form.classList.remove('is-right', 'is-wrong');
      void form.offsetWidth;
      form.classList.add(right ? 'is-right' : 'is-wrong');
      result.textContent = right ? 'Correct.' : 'Not yet. Try again.';
    });
    input.addEventListener('input', () => {
      form.classList.remove('is-right', 'is-wrong');
      result.textContent = '';
    });
  }
}

// "Try another rhythm": deals a new 7-beat rhythm to the figure and to the 3D notes.
function rhythm() {
  const fig = document.querySelector('[data-rhythm]');
  const beats = fig && fig.querySelector('.beats');
  const caption = fig && fig.querySelector('.rhythm-caption');
  const next = fig && fig.querySelector('.rhythm-next');
  if (!beats || !caption || !next) return;
  const TOTAL = 7;
  const ways = [1, 1];
  for (let n = 2; n <= TOTAL; n++) ways[n] = ways[n - 1] + ways[n - 2];
  // Uniform over every rhythm that fills TOTAL beats. It never shows how many there are,
  // because that number is the answer to part 1.
  const randomRhythm = () => {
    const out = [];
    for (let left = TOTAL; left > 0; ) {
      const len = left >= 2 && Math.random() >= ways[left - 1] / ways[left] ? 2 : 1;
      out.push(len);
      left -= len;
    }
    return out;
  };
  let current = [...beats.children].map((s) => (s.classList.contains('long') ? 2 : 1));
  const render = (pattern) => {
    beats.replaceChildren(
      ...pattern.map((len, n) => {
        const s = document.createElement('span');
        s.className = len === 2 ? 'long' : 'short';
        s.textContent = String(len);
        s.style.setProperty('--n', n);
        return s;
      }),
    );
    caption.textContent = `Another way to fill ${TOTAL} beats: ${pattern.map((l) => (l === 2 ? 'long' : 'short')).join(', ')}.`;
    current = pattern;
    window.dispatchEvent(new CustomEvent('arc:rhythm', { detail: pattern }));
    if (!reduce) {
      beats.classList.add('is-arriving');
      setTimeout(() => beats.classList.remove('is-arriving'), 800);
    }
  };
  // Light the figure's note while the 3D row plays it.
  window.addEventListener('arc:beat', (event) => {
    [...beats.children].forEach((span, i) => span.classList.toggle('is-playing', i === event.detail));
  });
  next.hidden = false;
  next.addEventListener('click', () => {
    let pattern;
    do pattern = randomRhythm();
    while (pattern.join() === current.join());
    if (reduce) return render(pattern);
    beats.classList.add('is-leaving');
    setTimeout(() => {
      beats.classList.remove('is-leaving');
      render(pattern);
    }, 140);
  });
}

// The 3D scene: wide screens with WebGL only, loaded after the page is ready.
function scene() {
  const canvas = document.querySelector('.scene-canvas');
  if (!canvas) return;
  // The head script runs the same test (wide screen, WebGL2, no data saver) before paint.
  if (!document.documentElement.classList.contains('scene-capable')) return;
  const start = () =>
    import('../scene/arc-scene.js')
      .then(({ runScene }) =>
        runScene(canvas, { reduced: reduce, onReady: () => document.documentElement.classList.add('scene-on') }),
      )
      .catch(() => {});
  if (document.readyState === 'complete') setTimeout(start, 50);
  else window.addEventListener('load', () => setTimeout(start, 50), { once: true });
}

for (const run of [smoothScroll, reveals, headerState, countdown, answerChecks, rhythm, scene]) {
  try {
    run();
  } catch {
    // One feature failing must not stop the others.
  }
}
