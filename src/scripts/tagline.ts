// Revela la declaración de valor palabra por palabra, en orden de lectura.
// Usa un IntersectionObserver por palabra: nunca un listener de scroll sin throttling.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const words = document.querySelectorAll<HTMLElement>('[data-word]');

if (!words.length) {
  // Nada que revelar.
} else if (reduceMotion) {
  words.forEach((word) => word.classList.add('is-on'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-on');
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -20% 0px', threshold: 0.2 },
  );
  words.forEach((word) => observer.observe(word));
}
