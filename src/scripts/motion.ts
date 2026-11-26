import { initWorld } from './world';

document.documentElement.classList.add('js');

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Entradas al hacer scroll: IntersectionObserver, nunca un listener de scroll.
const reveal = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-in');
      reveal.unobserve(entry.target);
    }
  },
  { rootMargin: '0px 0px -10% 0px' },
);
document.querySelectorAll('[data-reveal]').forEach((el) => reveal.observe(el));

const world = document.querySelector<HTMLElement>('[data-world]');
if (world) initWorld(world, reduceMotion);
