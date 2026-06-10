// ====== Loader ======
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('hide'), 800);
});

// ====== Custom Cursor ======
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
window.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
});
function animateRing(){
  rx += (mx - rx) * 0.15;
  ry += (my - ry) * 0.15;
  ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
  requestAnimationFrame(animateRing);
}
animateRing();
document.querySelectorAll('a, button, .project, .service-card').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('hover'));
  el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
});

// ====== Scroll Progress ======
window.addEventListener('scroll', () => {
  const s = document.documentElement.scrollTop;
  const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  document.getElementById('scrollProgress').style.width = (s / h * 100) + '%';
  document.getElementById('navbar').classList.toggle('scrolled', s > 30);
  document.getElementById('backTop').classList.toggle('show', s > 500);
});

// ====== Back to top ======
document.getElementById('backTop').addEventListener('click', () =>
  window.scrollTo({ top: 0, behavior: 'smooth' })
);

// ====== Mobile menu ======
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ====== Theme toggle ======
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const icon = themeToggle.querySelector('i');
  icon.className = document.body.classList.contains('light') ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
});

// ====== Reveal on scroll ======
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      // Animate skill bars
      if (e.target.classList.contains('skill')) {
        const fill = e.target.querySelector('.fill');
        fill.style.width = fill.dataset.fill + '%';
      }
      // Animate counters
      if (e.target.classList.contains('about-text')) {
        e.target.querySelectorAll('.counter').forEach(animateCounter);
      }
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal, .skill').forEach(el => io.observe(el));

// ====== Counters ======
function animateCounter(el) {
  const target = +el.dataset.target;
  let cur = 0;
  const step = Math.max(1, Math.ceil(target / 50));
  const tick = () => {
    cur += step;
    if (cur >= target) { el.textContent = target + '+'; return; }
    el.textContent = cur;
    requestAnimationFrame(tick);
  };
  tick();
}

// ====== Testimonials Carousel ======
const track = document.getElementById('testiTrack');
const cards = track.children;
const dots = document.getElementById('testiDots');
let idx = 0;
for (let i = 0; i < cards.length; i++) {
  const b = document.createElement('button');
  b.addEventListener('click', () => goTo(i));
  dots.appendChild(b);
}
function goTo(i) {
  idx = i;
  track.scrollTo({ left: track.clientWidth * i, behavior: 'smooth' });
  [...dots.children].forEach((d, j) => d.classList.toggle('active', j === i));
}
goTo(0);
setInterval(() => goTo((idx + 1) % cards.length), 5000);

// ====== Parallax glows ======
window.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;
  document.querySelectorAll('.glow').forEach((g, i) => {
    g.style.transform = `translate(${x * (i + 1) * 0.5}px, ${y * (i + 1) * 0.5}px)`;
  });
});
