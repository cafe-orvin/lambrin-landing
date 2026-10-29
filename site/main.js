/* Lambrin — landing conceptual.
   JavaScript clásico, sin dependencias ni llamadas de red (ADR-0001). */
(function () {
  'use strict';

  // Valores visuales conceptuales: no provienen de un catálogo (ADR-0002, 03-modelo-datos).
  const FINISHES = [
    {
      id: 'nogal', nombre: 'Nogal', tono: 'Oscuro y cálido',
      paleta: { base: '#6a4b35', luz: '#9a7455', sombra: '#3c2a1e' },
      textura: { tipo: 'veta', escala: 560, contraste: 0.9, semilla: 11 },
      escena: { sol: 0.95, sombraNoche: 0.72, lampara: 1, acento: 1 }
    },
    {
      id: 'encino', nombre: 'Encino', tono: 'Claro y sereno',
      paleta: { base: '#a7895f', luz: '#cdb28a', sombra: '#715d3e' },
      textura: { tipo: 'veta', escala: 600, contraste: 0.75, semilla: 23 },
      escena: { sol: 0.85, sombraNoche: 0.82, lampara: 0.85, acento: 0.85 }
    },
    {
      id: 'natural', nombre: 'Natural', tono: 'Luminoso y suave',
      paleta: { base: '#c5ac84', luz: '#e2cfa9', sombra: '#8f7957' },
      textura: { tipo: 'veta', escala: 640, contraste: 0.6, semilla: 37 },
      escena: { sol: 0.75, sombraNoche: 0.86, lampara: 0.75, acento: 0.75 }
    },
    {
      id: 'negro', nombre: 'Negro', tono: 'Profundo y sobrio',
      paleta: { base: '#33312e', luz: '#56534d', sombra: '#1d1c1a' },
      textura: { tipo: 'mineral', escala: 420, contraste: 0.95, semilla: 41 },
      escena: { sol: 1, sombraNoche: 0.6, lampara: 1, acento: 1 }
    },
    {
      id: 'gris', nombre: 'Gris', tono: 'Neutro y arquitectónico',
      paleta: { base: '#8e8b85', luz: '#b9b6af', sombra: '#64615c' },
      textura: { tipo: 'mineral', escala: 420, contraste: 0.7, semilla: 53 },
      escena: { sol: 0.85, sombraNoche: 0.84, lampara: 0.85, acento: 0.85 }
    },
    {
      id: 'lino', nombre: 'Lino', tono: 'Pálido y tranquilo',
      paleta: { base: '#cfc4ae', luz: '#e7dfcf', sombra: '#958a75' },
      textura: { tipo: 'tejido', escala: 200, contraste: 0.75, semilla: 67 },
      escena: { sol: 0.7, sombraNoche: 0.88, lampara: 0.7, acento: 0.7 }
    }
  ];

  const INSPIRATIONS = {
    estancia: { acabadoId: 'natural', modo: 'dia', acento: false },
    recamara: { acabadoId: 'nogal', modo: 'noche', acento: true },
    recepcion: { acabadoId: 'negro', modo: 'dia', acento: true },
    estudio: { acabadoId: 'gris', modo: 'dia', acento: false }
  };

  // Sin canal confirmado (ADR-0003). Cambiarlo requiere aprobación del usuario.
  const CONTACT = { channel: null };

  const BY_ID = {};
  FINISHES.forEach(function (finish) { BY_ID[finish.id] = finish; });

  const state = { acabadoId: 'nogal', modo: 'dia', acento: false };

  const scene = document.getElementById('escena');
  const surfaces = Array.prototype.slice.call(document.querySelectorAll('[data-surface]'));
  const daySwitch = document.getElementById('switch-day');
  const accentSwitch = document.getElementById('switch-accent');
  const radiogroup = document.querySelector('[role="radiogroup"]');
  const radios = Array.prototype.slice.call(document.querySelectorAll('[role="radio"][data-finish]'));
  const announcer = document.getElementById('announcer');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  let front = surfaces[0];
  let back = surfaces[1];

  function modeLabel(modo) { return modo === 'dia' ? 'De día' : 'De noche'; }
  function accentLabel(acento) { return acento ? 'Con acento' : 'Sin acento'; }
  function pad(n) { return (n < 10 ? '0' : '') + n; }

  // ---------- Texturas conceptuales (ADR-0002) ----------
  // Se generan en el navegador con semilla fija: siempre el mismo resultado.
  // Son una interpretación visual del nombre del acabado, no una textura del producto.

  function seeded(seed) {
    let a = seed >>> 0;
    return function () {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // Ruido de valor periódico: el mosaico se repite sin costuras.
  function periodicNoise(random, px, py) {
    const grid = new Float32Array(px * py);
    for (let i = 0; i < grid.length; i++) grid[i] = random();
    return function (u, v) {
      const x = u * px;
      const y = v * py;
      const x0 = Math.floor(x);
      const y0 = Math.floor(y);
      const fx = x - x0;
      const fy = y - y0;
      const sx = fx * fx * (3 - 2 * fx);
      const sy = fy * fy * (3 - 2 * fy);
      const xa = ((x0 % px) + px) % px;
      const ya = ((y0 % py) + py) % py;
      const xb = (xa + 1) % px;
      const yb = (ya + 1) % py;
      const a = grid[ya * px + xa];
      const b = grid[ya * px + xb];
      const c = grid[yb * px + xa];
      const d = grid[yb * px + xb];
      return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy;
    };
  }

  function fbm(layers, u, v) {
    let sum = 0;
    let amp = 0.5;
    let norm = 0;
    for (let i = 0; i < layers.length; i++) {
      sum += layers[i](u, v) * amp;
      norm += amp;
      amp *= 0.5;
    }
    return sum / norm;
  }

  // Cada patrón devuelve valores alrededor de 0 (aprox. −1 a 1).
  const PATTERNS = {
    veta: function (random) {
      const warp = [periodicNoise(random, 3, 2), periodicNoise(random, 6, 4), periodicNoise(random, 12, 8)];
      const fibre = periodicNoise(random, 160, 12);
      return function (u, v) {
        const w = fbm(warp, u, v);
        const rings = Math.sin(2 * Math.PI * (u * 9 + w * 2.6));
        const lines = Math.sin(2 * Math.PI * (u * 31 + w * 5));
        const pore = random() < 0.012 ? -0.8 : 0;
        return rings * 0.45 + lines * 0.18 + (fibre(u, v) - 0.5) * 0.7 + pore;
      };
    },
    mineral: function (random) {
      const layers = [4, 8, 16, 32, 64].map(function (p) { return periodicNoise(random, p, p); });
      return function (u, v) {
        const speck = random() < 0.018 ? (random() - 0.5) * 1.6 : 0;
        return (fbm(layers, u, v) - 0.5) * 1.8 + speck + (random() - 0.5) * 0.18;
      };
    },
    tejido: function (random) {
      const threads = 32;
      const vertical = periodicNoise(random, threads, 4);
      const horizontal = periodicNoise(random, 4, threads);
      return function (u, v) {
        const cx = Math.floor(u * threads);
        const cy = Math.floor(v * threads);
        const over = (cx + cy) % 2 === 0;
        const profile = over ? Math.sin(Math.PI * (u * threads - cx)) : Math.sin(Math.PI * (v * threads - cy));
        const slub = (over ? vertical(u, v) : horizontal(u, v)) - 0.5;
        return (profile - 0.62) * 1.1 + slub * 0.7 + (random() - 0.5) * 0.15;
      };
    }
  };

  const textureCache = {};

  function renderTile(size, sample, gain) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    const image = ctx.createImageData(size, size);
    const data = image.data;
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const g = Math.max(0, Math.min(255, 128 + sample(x / size, y / size) * gain));
        const i = (y * size + x) * 4;
        data[i] = data[i + 1] = data[i + 2] = g;
        data[i + 3] = 255;
      }
    }
    ctx.putImageData(image, 0, 0);
    return 'url("' + canvas.toDataURL('image/png') + '")';
  }

  function textureFor(finish) {
    if (!(finish.id in textureCache)) {
      const size = finish.textura.tipo === 'tejido' ? 256 : 512;
      const sample = PATTERNS[finish.textura.tipo](seeded(finish.textura.semilla));
      textureCache[finish.id] = renderTile(size, sample, 92 * finish.textura.contraste);
    }
    return textureCache[finish.id];
  }

  function cachedTexture(finish) {
    return textureCache[finish.id] || null;
  }

  // Genera las texturas restantes en momentos libres para no bloquear la primera pintura.
  function warmTextures() {
    const queue = FINISHES.slice();
    const idle = window.requestIdleCallback
      ? function (callback) { window.requestIdleCallback(callback, { timeout: 600 }); }
      : function (callback) { window.setTimeout(callback, 60); };
    (function next() {
      const finish = queue.shift();
      if (!finish) return;
      textureFor(finish);
      paintSamples(finish);
      idle(next);
    })();
  }

  function paintGrain() {
    const random = seeded(7);
    const grain = renderTile(160, function () { return random() - 0.5; }, 120);
    if (grain) scene.style.setProperty('--grain', grain);
  }

  // ---------- Pintado ----------

  // La escena genera su textura al momento; las muestras usan la que ya esté en caché.
  function paint(el, finish, texture) {
    el.style.setProperty('--wall-base', finish.paleta.base);
    el.style.setProperty('--wall-light', finish.paleta.luz);
    el.style.setProperty('--wall-shadow', finish.paleta.sombra);
    el.style.setProperty('--texture-size', finish.textura.escala + 'px');
    if (texture) el.style.setProperty('--texture', texture);
    else el.style.removeProperty('--texture');
  }

  function paintSamples(finish) {
    const texture = cachedTexture(finish);
    document.querySelectorAll('[data-paint="' + finish.id + '"]').forEach(function (el) { paint(el, finish, texture); });
    Object.keys(INSPIRATIONS).forEach(function (key) {
      if (INSPIRATIONS[key].acabadoId !== finish.id) return;
      const mini = document.querySelector('[data-idea-scene="' + key + '"]');
      if (mini) paint(mini, finish, texture);
    });
  }

  function showSurface(finish, initial) {
    const texture = textureFor(finish);
    if (initial) {
      paint(front, finish, texture);
      return;
    }
    paint(back, finish, texture);
    back.classList.add('is-front');
    front.classList.remove('is-front');
    const previous = front;
    front = back;
    back = previous;
  }

  // ---------- Estado ----------

  function render(finishChanged, options) {
    const finish = BY_ID[state.acabadoId];
    const index = FINISHES.indexOf(finish);

    if (finishChanged || options.initial) {
      showSurface(finish, options.initial);
      scene.style.setProperty('--sun', finish.escena.sol);
      scene.style.setProperty('--night-shade', finish.escena.sombraNoche);
      scene.style.setProperty('--lamp', finish.escena.lampara);
      scene.style.setProperty('--accent-k', finish.escena.acento);
    }

    scene.classList.toggle('is-night', state.modo === 'noche');
    scene.classList.toggle('has-accent', state.acento);
    daySwitch.setAttribute('aria-checked', String(state.modo === 'dia'));
    accentSwitch.setAttribute('aria-checked', String(state.acento));

    radios.forEach(function (radio) {
      const active = radio.dataset.finish === finish.id;
      radio.setAttribute('aria-checked', String(active));
      radio.tabIndex = active ? 0 : -1;
    });

    document.getElementById('finish-index').textContent = pad(index + 1) + ' / ' + pad(FINISHES.length);
    document.getElementById('finish-name').textContent = finish.nombre;
    document.getElementById('finish-tone').textContent = finish.tono;

    document.getElementById('cta-finish').textContent = finish.nombre;
    document.getElementById('cta-mode').textContent = modeLabel(state.modo);
    document.getElementById('cta-accent').textContent = accentLabel(state.acento);
    paint(document.getElementById('cta-swatch'), finish, textureFor(finish));

    if (options.announce) announcer.textContent = options.announce;
    if (finishChanged && options.writeHash) writeHash(finish.id);
  }

  function setState(patch, options) {
    const previous = state.acabadoId;
    Object.assign(state, patch);
    render(previous !== state.acabadoId, options || {});
  }

  function selectFinish(id, focus) {
    const finish = BY_ID[id];
    setState({ acabadoId: id }, { announce: 'Acabado ' + finish.nombre + '. ' + finish.tono + '.', writeHash: true });
    if (focus) activeRadio().focus();
  }

  function step(delta) {
    const index = FINISHES.indexOf(BY_ID[state.acabadoId]);
    const next = (index + delta + FINISHES.length) % FINISHES.length;
    selectFinish(FINISHES[next].id, false);
  }

  function activeRadio() {
    return radios.filter(function (radio) { return radio.dataset.finish === state.acabadoId; })[0];
  }

  // ---------- Enlace a una vista (#acabado-<id>) ----------

  function finishFromHash() {
    const match = /^#acabado-([a-z]+)$/.exec(window.location.hash);
    return match && BY_ID[match[1]] ? match[1] : null;
  }

  function writeHash(id) {
    try {
      window.history.replaceState(null, '', '#acabado-' + id);
    } catch (error) {
      // Algunos navegadores restringen el historial en file://; la página sigue funcionando.
    }
  }

  window.addEventListener('hashchange', function () {
    const id = finishFromHash();
    if (id && id !== state.acabadoId) selectFinish(id, false);
  });

  // ---------- Controles ----------

  radios.forEach(function (radio) {
    radio.addEventListener('click', function () { selectFinish(radio.dataset.finish, false); });
  });

  radiogroup.addEventListener('keydown', function (event) {
    const moves = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    const index = FINISHES.indexOf(BY_ID[state.acabadoId]);
    let next;
    if (event.key in moves) next = (index + moves[event.key] + FINISHES.length) % FINISHES.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = FINISHES.length - 1;
    else return;
    event.preventDefault();
    selectFinish(FINISHES[next].id, true);
  });

  daySwitch.addEventListener('click', function () {
    setState({ modo: state.modo === 'dia' ? 'noche' : 'dia' }, {});
  });

  accentSwitch.addEventListener('click', function () {
    setState({ acento: !state.acento }, {});
  });

  // Deslizar sobre la escena cambia de acabado; el desplazamiento vertical sigue libre (touch-action: pan-y).
  let swipe = null;

  scene.addEventListener('pointerdown', function (event) {
    if (event.pointerType === 'mouse' || event.target.closest('button, a')) return;
    swipe = { id: event.pointerId, x: event.clientX, y: event.clientY };
  });

  scene.addEventListener('pointerup', function (event) {
    if (!swipe || event.pointerId !== swipe.id) return;
    const dx = event.clientX - swipe.x;
    const dy = event.clientY - swipe.y;
    swipe = null;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) step(dx < 0 ? 1 : -1);
  });

  scene.addEventListener('pointercancel', function () { swipe = null; });

  function goToScene() {
    scene.scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth', block: 'start' });
    activeRadio().focus({ preventScroll: true });
  }

  document.querySelectorAll('[data-show-finish]').forEach(function (button) {
    button.addEventListener('click', function () {
      selectFinish(button.dataset.showFinish, false);
      goToScene();
    });
  });

  document.querySelectorAll('[data-idea]').forEach(function (button) {
    const idea = INSPIRATIONS[button.dataset.idea];
    if (!idea) return;
    button.addEventListener('click', function () {
      const finish = BY_ID[idea.acabadoId];
      setState(
        { acabadoId: idea.acabadoId, modo: idea.modo, acento: idea.acento },
        {
          announce: 'Escena: ' + finish.nombre + ', ' + modeLabel(idea.modo).toLowerCase() + ', ' + accentLabel(idea.acento).toLowerCase() + '.',
          writeHash: true
        }
      );
      goToScene();
    });
  });

  // ---------- Inicio ----------

  Object.keys(INSPIRATIONS).forEach(function (key) {
    const idea = INSPIRATIONS[key];
    const mini = document.querySelector('[data-idea-scene="' + key + '"]');
    const meta = document.querySelector('[data-idea-meta="' + key + '"]');
    if (mini) {
      mini.dataset.mode = idea.modo;
      mini.dataset.accent = String(idea.acento);
    }
    if (meta) meta.textContent = BY_ID[idea.acabadoId].nombre + ' · ' + modeLabel(idea.modo) + ' · ' + accentLabel(idea.acento);
  });

  if (CONTACT.channel === null) document.getElementById('contacto').dataset.contact = 'pendiente';

  FINISHES.forEach(paintSamples);

  const initial = finishFromHash();
  if (initial) state.acabadoId = initial;
  render(false, { initial: true });
  paintSamples(BY_ID[state.acabadoId]);
  paintGrain();
  warmTextures();
})();
