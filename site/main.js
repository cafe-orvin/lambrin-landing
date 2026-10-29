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

  // ---------- Texturas conceptuales (T05) ----------

  function textureFor() { return null; }

  // ---------- Pintado ----------

  function paint(el, finish) {
    el.style.setProperty('--wall-base', finish.paleta.base);
    el.style.setProperty('--wall-light', finish.paleta.luz);
    el.style.setProperty('--wall-shadow', finish.paleta.sombra);
    el.style.setProperty('--texture-size', finish.textura.escala + 'px');
    const texture = textureFor(finish);
    if (texture) el.style.setProperty('--texture', texture);
  }

  function paintSamples(finish) {
    document.querySelectorAll('[data-paint="' + finish.id + '"]').forEach(function (el) { paint(el, finish); });
    Object.keys(INSPIRATIONS).forEach(function (key) {
      if (INSPIRATIONS[key].acabadoId !== finish.id) return;
      const mini = document.querySelector('[data-idea-scene="' + key + '"]');
      if (mini) paint(mini, finish);
    });
  }

  function showSurface(finish, initial) {
    if (initial) {
      paint(front, finish);
      return;
    }
    paint(back, finish);
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
    paint(document.getElementById('cta-swatch'), finish);

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
})();
