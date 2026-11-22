import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type Key = { y: number; v: number };

// Interpola un valor por tramos según la posición de scroll.
const piecewise = (y: number, keys: Key[]) => {
  if (y <= keys[0].y) return keys[0].v;
  for (let i = 1; i < keys.length; i++) {
    const a = keys[i - 1];
    const b = keys[i];
    if (y <= b.y) return a.v + (b.v - a.v) * ((y - a.y) / (b.y - a.y || 1));
  }
  return keys[keys.length - 1].v;
};

const clamp = gsap.utils.clamp(0, 1);

// Fondo scrolleable con clips propios en loop constante.
// Lenis + ScrollTrigger eligen la parada y mueven textos, foco y raíl; el vídeo nunca se congela con el scroll.
export function initWorld(world: HTMLElement, reduceMotion: boolean) {
  const stage = world.querySelector<HTMLElement>('[data-stage]');
  if (!stage) return;
  const stops = [...world.querySelectorAll<HTMLElement>('[data-stop]')];
  const frames = [...stage.querySelectorAll<HTMLElement>('[data-frame]')];
  const links = [...stage.querySelectorAll<HTMLAnchorElement>('[data-goto]')];
  const fill = stage.querySelector<HTMLElement>('[data-rail-fill]');
  const hint = stage.querySelector<HTMLElement>('[data-hint]');
  const clips = [...stage.querySelectorAll<HTMLVideoElement>('[data-clip]')];
  const last = stops.length - 1;
  const focus = stops.map((stop) => Number(stop.dataset.focus ?? 50));

  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
  const videoOn = clips.length > 0 && !reduceMotion && !saveData;
  if (!videoOn) stage.dataset.mode = 'poster';

  const marks = stops.map((stop) => ScrollTrigger.create({ trigger: stop, start: 'top top' }));
  let current = -1;
  let activeFrame = -1;
  let activeClip = -1;

  const setCurrent = (index: number) => {
    if (index === current) return;
    current = index;
    stops.forEach((stop, i) => stop.classList.toggle('is-current', i === index));
    links.forEach((link, i) => link.setAttribute('aria-current', String(i === index)));
  };

  // Solo se carga el clip activo; el resto permanece en preload="none".
  const activate = (index: number) => {
    if (index === activeClip) return;
    activeClip = index;
    clips.forEach((clip, i) => clip.classList.toggle('is-shown', i === index));

    const clip = clips[index];
    if (!clip || !videoOn) return;

    clips.forEach((other, i) => {
      if (i !== index && !other.paused) other.pause();
    });

    const src = clip.dataset.src;
    if (!src) return;

    const start = () => {
      stage.dataset.mode = 'video';
      clip.play().catch(() => {
        stage.dataset.mode = 'poster';
      });
    };

    if (!clip.src) {
      clip.src = src;
      clip.addEventListener('loadeddata', start, { once: true });
      clip.addEventListener('error', () => {
        stage.dataset.mode = 'poster';
      }, { once: true });
    } else if (clip.readyState >= 2) {
      start();
    } else {
      clip.addEventListener('loadeddata', start, { once: true });
    }
  };

  const render = (self: ScrollTrigger) => {
    const y = self.scroll();
    const w = piecewise(y, [...marks.map((mark, i) => ({ y: mark.start, v: i })), { y: self.end, v: stops.length }]);
    const at = Math.min(w, last);
    const index = Math.round(at);

    setCurrent(index);
    stage.style.setProperty('--focus-x', `${piecewise(y, marks.map((mark, i) => ({ y: mark.start, v: focus[i] })))}%`);
    if (fill) fill.style.transform = `scaleY(${at / last})`;
    if (hint) hint.style.opacity = String(clamp(1 - w * 4));

    if (index !== activeFrame) {
      activeFrame = index;
      frames.forEach((frame, i) => frame.classList.toggle('is-active', i === index));
    }

    activate(index);
  };

  const span = ScrollTrigger.create({
    trigger: world,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: render,
    onRefresh: render,
  });
  render(span);

  if (videoOn) {
    document.addEventListener('visibilitychange', () => {
      const clip = clips[activeClip];
      if (!clip) return;
      if (document.hidden) clip.pause();
      else if (stage.dataset.mode === 'video') clip.play().catch(() => {});
    });
  }
}
