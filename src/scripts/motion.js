// ARC motion and small interactions. No libraries.
// The code that hides an element is the same code that shows it again, and it only hides
// elements that are below the fold when it runs. If this file fails, nothing stays hidden.

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasIO = 'IntersectionObserver' in window;
const narrow = matchMedia('(max-width: 52rem)').matches;
const FOLD = narrow ? 1 : 0.92;
const STAGGER = narrow ? 50 : 70; // ms between items revealed together
const MAX_STEPS = narrow ? 3 : 5;

const below = (el) => el.getBoundingClientRect().top > innerHeight * FOLD;

function reveals() {
  if (!hasIO || reduce) return;
  const io = new IntersectionObserver(
    (entries) => {
      let step = 0;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target;
        io.unobserve(el);
        const delay = Math.min(step++, MAX_STEPS) * STAGGER;
        el.style.setProperty('--reveal-delay', `${delay}ms`);
        el.classList.add('reveal-in');
        el.classList.remove('reveal-pending');
        // Hand the element back to its own hover transitions once it has settled.
        setTimeout(() => {
          el.classList.remove('reveal-in');
          el.style.removeProperty('--reveal-delay');
        }, delay + 1500);
      }
    },
    { rootMargin: narrow ? '0px' : '0px 0px -8% 0px', threshold: 0 },
  );
  for (const el of document.querySelectorAll('[data-reveal]')) {
    if (!below(el)) continue; // already on screen: leave it alone
    el.classList.add('reveal-pending');
    io.observe(el);
  }
}

// Header gains a shadow once the page has moved, without a scroll listener.
function headerState() {
  const header = document.querySelector('.site-header');
  if (!header || !hasIO) return;
  const sentinel = document.createElement('div');
  sentinel.setAttribute('aria-hidden', 'true');
  sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:8px;pointer-events:none';
  document.body.prepend(sentinel);
  new IntersectionObserver(([entry]) => header.toggleAttribute('data-scrolled', !entry.isIntersecting)).observe(
    sentinel,
  );
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
      void form.offsetWidth; // lets the shake replay on a second wrong answer
      form.classList.add(right ? 'is-right' : 'is-wrong');
      result.textContent = right ? 'Correct.' : 'Not yet. Try again.';
    });
    input.addEventListener('input', () => {
      form.classList.remove('is-right', 'is-wrong');
      result.textContent = '';
    });
  }
}

// Signature: the rhythm fills beat by beat, and "Try another rhythm" deals a new one.
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
  const read = () => [...beats.children].map((s) => (s.classList.contains('long') ? 2 : 1));
  let current = read();
  let playing = 0;
  const beatMs = parseFloat(getComputedStyle(beats).getPropertyValue('--beat')) || 190;
  let firstPlay = null;

  const stamp = () => {
    let at = 0;
    for (const s of beats.children) {
      const len = s.classList.contains('long') ? 2 : 1;
      s.style.setProperty('--at', at);
      s.style.setProperty('--len', len);
      at += len;
    }
  };
  const play = () => {
    if (reduce) return;
    stamp();
    beats.classList.remove('is-waiting', 'is-playing');
    void beats.offsetWidth; // restart the animation
    beats.classList.add('is-playing');
    clearTimeout(playing);
    playing = setTimeout(() => beats.classList.remove('is-playing'), TOTAL * beatMs + 300);
  };
  const render = (pattern) => {
    const names = pattern.map((l) => (l === 2 ? 'long' : 'short')).join(', ');
    beats.replaceChildren(
      ...pattern.map((l) => {
        const s = document.createElement('span');
        s.className = l === 2 ? 'long' : 'short';
        s.textContent = String(l);
        return s;
      }),
    );
    caption.textContent = `Another way to fill ${TOTAL} beats: ${names}.`;
    current = pattern;
    play();
  };

  next.hidden = false;
  next.addEventListener('click', () => {
    if (firstPlay) firstPlay();
    let pattern;
    do pattern = randomRhythm();
    while (pattern.join() === current.join());
    if (reduce) return render(pattern);
    beats.classList.remove('is-playing');
    beats.classList.add('is-leaving');
    setTimeout(() => {
      beats.classList.remove('is-leaving');
      render(pattern);
    }, 140);
  });

  // First play: once the row reaches the upper three quarters of the screen, or 800ms after
  // it first shows at all, whichever comes first. The row is never left empty on screen.
  if (hasIO && !reduce && below(fig)) {
    beats.classList.add('is-waiting');
    let timer = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (entry.boundingClientRect.top < innerHeight * 0.75) start(350);
        else if (!timer) timer = setTimeout(() => start(0), 800);
      },
      { threshold: [0, 0.5, 1] },
    );
    const start = (wait) => {
      firstPlay();
      setTimeout(play, wait);
    };
    firstPlay = () => {
      io.disconnect();
      clearTimeout(timer);
      firstPlay = null;
    };
    io.observe(fig);
  }
}

for (const run of [reveals, headerState, countdown, answerChecks, rhythm]) {
  try {
    run();
  } catch {
    // One feature failing must not stop the others.
  }
}
