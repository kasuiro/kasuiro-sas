// Fondo scrolleable con clips propios en loop constante.
// IntersectionObserver elige la parada activa; CSS y el navegador hacen las transiciones.
// Sin GSAP ni Lenis: las seis paradas siguen siendo las mismas y el vídeo nunca se congela.

export function initWorld(world: HTMLElement, reduceMotion: boolean) {
  const stage = world.querySelector<HTMLElement>('[data-stage]');
  if (!stage) return;
  const stops = [...world.querySelectorAll<HTMLElement>('[data-stop]')];
  const frames = [...stage.querySelectorAll<HTMLElement>('[data-frame]')];
  const links = [...stage.querySelectorAll<HTMLAnchorElement>('[data-goto]')];
  const fill = stage.querySelector<HTMLElement>('[data-rail-fill]');
  const hint = stage.querySelector<HTMLElement>('[data-hint]');
  const clips = [...stage.querySelectorAll<HTMLVideoElement>('[data-clip]')];
  const last = Math.max(stops.length - 1, 0);

  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
  const videoOn = clips.length > 0 && !reduceMotion && !saveData;
  if (!videoOn) stage.dataset.mode = 'poster';

  let current = -1;
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

  const apply = (index: number) => {
    setCurrent(index);
    frames.forEach((frame, i) => frame.classList.toggle('is-active', i === index));
    activate(index);
    if (fill) fill.style.transform = `scaleY(${last ? index / last : 0})`;
    if (hint) hint.style.opacity = index === 0 ? '1' : '0';
  };

  apply(0);

  // Franja fina en la parte inferior del viewport: coincide con el punto medio
  // entre marcas que usaba el scroll anterior y mantiene una sola parada activa.
  const visible = new Set<number>();
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const index = stops.indexOf(entry.target as HTMLElement);
        if (index < 0) continue;
        if (entry.isIntersecting) visible.add(index);
        else visible.delete(index);
      }
      if (visible.size === 0) return;
      const next = Math.max(...visible);
      if (next !== current) apply(next);
    },
    { rootMargin: '0px 0px -99% 0px', threshold: 0 },
  );
  stops.forEach((stop) => observer.observe(stop));

  if (videoOn) {
    document.addEventListener('visibilitychange', () => {
      const clip = clips[activeClip];
      if (!clip) return;
      if (document.hidden) clip.pause();
      else if (stage.dataset.mode === 'video') clip.play().catch(() => {});
    });
  }
}
