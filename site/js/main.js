/* Lambrin v2 — interacción y movimiento. JS clásico, sin dependencias (ADR-0001, ADR-0008). */
(function () {
  "use strict";

  var L = window.LAMBRIN;
  if (!L) return;

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var WA = String(L.CONTACT.whatsapp || "").replace(/\D/g, "");

  /* ---------- Utilidades ---------- */
  function money(n) {
    var cents = Math.round(n * 100) % 100 !== 0;
    return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", minimumFractionDigits: cents ? 2 : 0, maximumFractionDigits: 2 }).format(n);
  }
  function num(n, d) { return new Intl.NumberFormat("es-MX", { maximumFractionDigits: d == null ? 2 : d }).format(n); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function scene(e, w) { return "assets/escenas/" + e + "-" + w + ".webp"; }
  function srcset(e) { return scene(e, 800) + " 800w, " + scene(e, 1600) + " 1600w"; }
  function swatchUrl(m) { return "assets/muestras/" + m + ".jpg"; }
  function product(id) { for (var i = 0; i < L.productos.length; i++) if (L.productos[i].id === id) return L.productos[i]; return null; }
  function color(p, id) { for (var i = 0; i < p.colores.length; i++) if (p.colores[i].id === id) return p.colores[i]; return p.colores[0]; }
  function fullName(p) {
    var twins = L.productos.filter(function (q) { return q.nombre === p.nombre; }).length > 1;
    return twins ? p.nombre + " " + p.serie : p.nombre;
  }
  function lineLabel(p) { return p.linea === "interior" ? "Interior" : "Exterior"; }
  function sizeText(m) { return num(m.largo) + " × " + num(m.ancho) + " × " + num(m.espesor) + " cm"; }
  function boxUnit(p) { return p.precio.caja ? p.precio.caja.precio / p.precio.caja.piezas : null; }
  function storeGet(k, d) { try { var v = window.localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
  function storeSet(k, v) { try { window.localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* sin almacenamiento */ } }
  function shade(hex, amt) {
    var n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    var t = amt < 0 ? 0 : 255, a = Math.abs(amt);
    r = Math.round((t - r) * a + r); g = Math.round((t - g) * a + g); b = Math.round((t - b) * a + b);
    return "rgb(" + r + "," + g + "," + b + ")";
  }

  var toastTimer;
  function toast(msg) {
    var t = $("[data-toast]");
    t.textContent = msg;
    t.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("is-on"); }, 2600);
  }

  /* ---------- WhatsApp (ADR-0007) ---------- */
  function waUrl(text) { return WA ? "https://wa.me/" + WA + "?text=" + encodeURIComponent(text) : null; }
  function setWa(a, text) {
    if (!a.dataset.label) a.dataset.label = a.textContent.trim();
    var u = waUrl(text);
    if (u) {
      a.href = u; a.target = "_blank"; a.rel = "noopener";
      a.removeAttribute("aria-disabled");
      if (a.dataset.label) a.textContent = a.dataset.label;
    } else {
      a.href = "#contacto"; a.removeAttribute("target");
      a.setAttribute("aria-disabled", "true");
      if (a.dataset.label) a.textContent = "Contacto próximamente";
    }
  }

  /* ---------- Lista de cotización ---------- */
  var cart = storeGet("lambrin-cotizacion", []);
  function itemData(it) {
    if (it.tipo === "accesorio") {
      var a = L.accesorios.filter(function (x) { return x.id === it.id; })[0];
      if (!a) return null;
      return { nombre: a.nombre, detalle: "Accesorio", unidad: "pieza", precio: a.precio, img: swatchUrl(a.muestra), agotado: false };
    }
    var p = product(it.id); if (!p) return null;
    var c = color(p, it.color);
    var caja = it.unidad === "caja" && p.precio.caja;
    return {
      nombre: fullName(p),
      detalle: c.nombre + (caja ? " · caja de " + p.precio.caja.piezas + " pz" : " · pieza"),
      unidad: caja ? "caja" : "pieza",
      precio: caja ? p.precio.caja.precio : p.precio.pieza,
      img: swatchUrl(c.muestra),
      agotado: !!c.agotado
    };
  }
  function cartAdd(it) {
    var key = [it.tipo, it.id, it.color || "", it.unidad || "pieza"].join("|");
    var found = cart.filter(function (x) { return x.key === key; })[0];
    if (found) found.qty += it.qty; else { it.key = key; cart.push(it); }
    saveCart(true);
  }
  function saveCart(bump) {
    cart = cart.filter(function (x) { return x.qty > 0 && itemData(x); });
    storeSet("lambrin-cotizacion", cart);
    renderCart(bump);
  }
  function cartTotal() { return cart.reduce(function (s, x) { var d = itemData(x); return s + d.precio * x.qty; }, 0); }
  function cartText() {
    var lines = [L.CONTACT.saludo, ""];
    cart.forEach(function (x) {
      var d = itemData(x);
      var u = d.unidad === "caja" ? (x.qty === 1 ? "caja" : "cajas") : (x.qty === 1 ? "pieza" : "piezas");
      lines.push("• " + d.nombre + " — " + d.detalle + " — " + x.qty + " " + u + " — " + money(d.precio * x.qty) + (d.agotado ? " (aparece agotado: consultar disponibilidad)" : ""));
    });
    lines.push("", "Total estimado: " + money(cartTotal()), L.LEYENDA_PRECIOS);
    return lines.join("\n");
  }
  function renderCart(bump) {
    var count = cart.reduce(function (s, x) { return s + 1; }, 0);
    $$("[data-cart-count]").forEach(function (b) {
      b.textContent = count;
      if (bump) { b.classList.remove("is-bump"); void b.offsetWidth; b.classList.add("is-bump"); }
    });
    $(".fab__cart").classList.toggle("is-visible", count > 0);
    var list = $("[data-cart-list]");
    list.innerHTML = cart.map(function (x, i) {
      var d = itemData(x);
      return '<li class="cart__item"><i style="background-image:url(' + d.img + ')"></i><div><h3>' + esc(d.nombre) + "</h3><p>" + esc(d.detalle) + (d.agotado ? " · <strong>agotado</strong>" : "") + " · " + money(d.precio) + '</p><div class="stepper"><button type="button" data-cq="' + i + '" data-d="-1" aria-label="Menos">−</button><input type="number" min="0" value="' + x.qty + '" data-ci="' + i + '" aria-label="Cantidad"><button type="button" data-cq="' + i + '" data-d="1" aria-label="Más">+</button></div></div><div><b>' + money(d.precio * x.qty) + '</b><button type="button" class="rm" data-cr="' + i + '">Quitar</button></div></li>';
    }).join("");
    $("[data-cart-empty]").hidden = cart.length > 0;
    $("[data-cart-total]").textContent = money(cartTotal());
    var send = $("[data-cart-send]");
    setWa(send, cartText());
    if (!cart.length) send.setAttribute("aria-disabled", "true");
    $$("[data-wa-direct]").forEach(function (a) { setWa(a, cart.length ? cartText() : L.CONTACT.saludo.replace(" lo siguiente:", ".")); });
  }
  $("[data-cart-list]").addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    if (b.dataset.cq != null) { cart[+b.dataset.cq].qty = Math.max(0, cart[+b.dataset.cq].qty + (+b.dataset.d)); saveCart(); }
    if (b.dataset.cr != null) { cart.splice(+b.dataset.cr, 1); saveCart(); }
  });
  $("[data-cart-list]").addEventListener("change", function (e) {
    if (e.target.dataset.ci == null) return;
    cart[+e.target.dataset.ci].qty = Math.max(0, Math.round(+e.target.value || 0)); saveCart();
  });
  $("[data-cart-clear]").addEventListener("click", function () { cart = []; saveCart(); toast("Lista vacía"); });
  $("[data-cart-copy]").addEventListener("click", function () {
    var text = cart.length ? cartText() : "";
    if (!text) { toast("La lista está vacía"); return; }
    function fallback() {
      var ta = document.createElement("textarea"); ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); toast("Pedido copiado"); } catch (err) { toast("No se pudo copiar"); }
      ta.remove();
    }
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(function () { toast("Pedido copiado"); }, fallback);
    else fallback();
  });

  /* ---------- Diálogos (ficha y cotización) ---------- */
  var lastFocus = null;
  function openDialog(root) {
    lastFocus = document.activeElement;
    root.hidden = false;
    document.body.classList.add("is-locked");
    requestAnimationFrame(function () { requestAnimationFrame(function () { root.classList.add("is-open"); }); });
    var panel = root.querySelector("[role=dialog]");
    setTimeout(function () { panel.focus(); }, 60);
  }
  function closeDialog(root) {
    root.classList.remove("is-open");
    setTimeout(function () {
      root.hidden = true;
      if (!$(".sheet.is-open") && !$(".cart.is-open")) document.body.classList.remove("is-locked");
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }, reduce ? 0 : 600);
  }
  function trap(e, root) {
    if (e.key !== "Tab") return;
    var f = $$('a[href], button:not([disabled]), input, select, [tabindex]:not([tabindex="-1"])', root).filter(function (el) { return el.offsetParent !== null; });
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  var sheet = $("[data-sheet]"), cartEl = $("[data-cart]");
  $$("[data-open-cart]").forEach(function (b) { b.addEventListener("click", function () { closeMenu(); openDialog(cartEl); }); });
  $$("[data-close-cart]").forEach(function (b) { b.addEventListener("click", function () { closeDialog(cartEl); }); });
  $$("[data-close-sheet]").forEach(function (b) { b.addEventListener("click", function () { closeDialog(sheet); }); });
  document.addEventListener("keydown", function (e) {
    var open = !cartEl.hidden ? cartEl : (!sheet.hidden ? sheet : null);
    if (!open) return;
    if (e.key === "Escape") closeDialog(open); else trap(e, open);
  });

  /* ---------- Ficha de producto ---------- */
  var S = { p: null, c: null, unit: "pieza" };
  function animateCount(el, to, dec) {
    if (reduce) { el.textContent = num(to, dec); return; }
    var t0 = performance.now(), dur = 900;
    (function step(t) {
      var k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      el.textContent = num(to * e, k < 1 ? 1 : dec);
      if (k < 1) requestAnimationFrame(step);
    })(t0);
  }
  function openSheet(id, colorId) {
    var p = product(id); if (!p) return;
    S.p = p; S.c = color(p, colorId);
    S.unit = p.precio.soloCaja ? "caja" : "pieza";
    var img = $("[data-sheet-img]");
    img.src = scene(p.escena, 1600); img.srcset = srcset(p.escena); img.sizes = "(max-width: 900px) 100vw, 50vw"; img.alt = p.escenaAlt;
    $("[data-sheet-line]").textContent = lineLabel(p) + " · " + p.serie;
    $("[data-sheet-title]").textContent = fullName(p);
    $("[data-sheet-desc]").textContent = p.descripcion;
    var sw = $("[data-sheet-swatches]");
    sw.innerHTML = p.colores.map(function (c) { return swatchBtn(c, c.id === S.c.id); }).join("");
    var m = p.medida;
    $("[data-sheet-specs]").innerHTML = [["Largo", m.largo], ["Ancho", m.ancho], ["Espesor", m.espesor]].map(function (r) {
      return "<div><dt>" + r[0] + '</dt><dd><span data-to="' + r[1] + '">0</span><small>cm</small></dd></div>';
    }).join("");
    var bu = boxUnit(p), pr = p.precio;
    var html = '<div class="price"><span>' + (pr.soloCaja ? "Por pieza (en caja)" : "Pieza suelta") + "</span><b>" + money(pr.pieza) + "</b><small>" + num((m.largo * m.ancho) / 10000, 3) + " m² por pieza</small></div>";
    if (pr.caja) {
      var save = Math.round((1 - bu / pr.pieza) * 100);
      html += '<div class="price price--box"><span>Caja de ' + pr.caja.piezas + " piezas</span><b>" + money(pr.caja.precio) + "</b><small>" + money(bu) + " por pieza</small>" + (save > 0 ? '<em class="save">Ahorras ' + save + " %</em>" : "") + "</div>";
    }
    $("[data-sheet-prices]").innerHTML = html;
    var units = pr.soloCaja ? ["caja"] : (pr.caja ? ["pieza", "caja"] : ["pieza"]);
    $("[data-sheet-unit]").innerHTML = units.map(function (u) { return '<button type="button" role="radio" aria-checked="' + (u === S.unit) + '" data-unit="' + u + '">' + (u === "caja" ? "Cajas" : "Piezas") + "</button>"; }).join("");
    $("[data-sheet-qty]").value = 1;
    updateSheet();
    openDialog(sheet);
    $$("[data-to]", sheet).forEach(function (el) { animateCount(el, +el.dataset.to, 2); });
  }
  function swatchBtn(c, on) {
    return '<button type="button" role="radio" class="swatch' + (c.agotado ? " is-out" : "") + '" aria-checked="' + on + '" aria-label="' + esc(c.nombre) + (c.agotado ? " (agotado)" : "") + '" title="' + esc(c.nombre) + '" data-color="' + c.id + '" style="background-image:url(' + swatchUrl(c.muestra) + ');background-color:' + c.tono + '"></button>';
  }
  function updateSheet() {
    var p = S.p, c = S.c;
    $("[data-sheet-color]").textContent = c.nombre;
    $("[data-sheet-stock]").textContent = c.agotado ? "Agotado" : "";
    var li = $("[data-lens-img]"); li.src = swatchUrl(c.muestra); li.alt = "Muestra " + c.nombre;
    $$(".swatch", $("[data-sheet-swatches]")).forEach(function (b) { b.setAttribute("aria-checked", b.dataset.color === c.id); });
    var qty = Math.max(1, Math.round(+$("[data-sheet-qty]").value || 1));
    var unitPrice = S.unit === "caja" ? p.precio.caja.precio : p.precio.pieza;
    var pcs = S.unit === "caja" ? qty * p.precio.caja.piezas : qty;
    $("[data-sheet-total]").textContent = money(unitPrice * qty) + " · " + pcs + " pz · " + num(pcs * p.medida.largo * p.medida.ancho / 10000, 2) + " m²";
    $("[data-sheet-add]").textContent = c.agotado ? "Consultar disponibilidad" : "Agregar a cotización";
    var u = S.unit === "caja" ? (qty === 1 ? "caja" : "cajas") : (qty === 1 ? "pieza" : "piezas");
    setWa($("[data-sheet-wa]"), L.CONTACT.saludo + "\n• " + fullName(p) + " — " + c.nombre + " — " + qty + " " + u + " — " + money(unitPrice * qty) + (c.agotado ? " (aparece agotado: consultar disponibilidad)" : ""));
  }
  $("[data-sheet-swatches]").addEventListener("click", function (e) {
    var b = e.target.closest(".swatch"); if (!b) return;
    S.c = color(S.p, b.dataset.color); updateSheet();
  });
  $("[data-sheet-unit]").addEventListener("click", function (e) {
    var b = e.target.closest("[data-unit]"); if (!b) return;
    S.unit = b.dataset.unit;
    $$("[data-unit]").forEach(function (x) { x.setAttribute("aria-checked", x === b); });
    updateSheet();
  });
  $$("[data-step]", sheet).forEach(function (b) {
    b.addEventListener("click", function () { var q = $("[data-sheet-qty]"); q.value = Math.max(1, (+q.value || 1) + (+b.dataset.step)); updateSheet(); });
  });
  $("[data-sheet-qty]").addEventListener("input", updateSheet);
  $("[data-sheet-add]").addEventListener("click", function () {
    var qty = Math.max(1, Math.round(+$("[data-sheet-qty]").value || 1));
    cartAdd({ tipo: "producto", id: S.p.id, color: S.c.id, unidad: S.unit, qty: qty });
    toast(fullName(S.p) + " · " + S.c.nombre + " agregado");
  });
  $("[data-sheet-viz]").addEventListener("click", function () { if (S.p.visual) vizSet(S.p.id, S.c.id); closeDialog(sheet); });
  $("[data-sheet-calc]").addEventListener("click", function () { calcSet(S.p.id, S.c.id); closeDialog(sheet); });
  // Lupa
  var lens = $("[data-lens]");
  lens.addEventListener("pointermove", function (e) {
    var r = lens.getBoundingClientRect();
    lens.style.setProperty("--zx", ((e.clientX - r.left) / r.width * 100) + "%");
    lens.style.setProperty("--zy", ((e.clientY - r.top) / r.height * 100) + "%");
    if (e.pointerType === "mouse") lens.classList.add("is-zoom");
  });
  lens.addEventListener("pointerleave", function () { lens.classList.remove("is-zoom"); });
  lens.addEventListener("click", function () { lens.classList.toggle("is-zoom"); });

  /* ---------- Catálogo ---------- */
  var grid = $("[data-grid]");
  grid.innerHTML = L.productos.map(function (p) {
    var from = p.precio.caja && !p.precio.soloCaja ? boxUnit(p) : p.precio.pieza;
    var dots = p.colores.slice(0, 6).map(function (c, k) { return '<i style="--k:' + k + ';background-image:url(' + swatchUrl(c.muestra) + ');background-color:' + c.tono + '"></i>'; }).join("");
    return '<button type="button" class="card" data-line="' + p.linea + '" data-id="' + p.id + '" aria-label="' + esc(fullName(p)) + ', ver ficha">' +
      '<img class="card__img" src="' + scene(p.escena, 800) + '" srcset="' + srcset(p.escena) + '" sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 40vw" alt="' + esc(p.escenaAlt) + '" loading="lazy">' +
      '<span class="card__glare"></span><span class="card__tag">' + lineLabel(p) + '</span><span class="card__more" aria-hidden="true">↗</span>' +
      '<span class="card__body"><span class="card__name"><small>' + esc(p.serie) + " · " + p.colores.length + (p.colores.length === 1 ? " color" : " colores") + "</small>" + esc(fullName(p)) + "</span>" +
      '<span class="card__meta"><span class="card__price">' + (from < p.precio.pieza ? "Desde" : "Pieza") + "<b>" + money(from) + '</b></span><span class="card__dots">' + dots + "</span></span>" +
      '<span class="card__meta" style="margin-top:6px"><span>' + sizeText(p.medida) + "</span></span></span></button>";
  }).join("");
  var cards = $$(".card", grid);
  cards.forEach(function (card) {
    card.addEventListener("click", function () { openSheet(card.dataset.id); });
    if (!finePointer || reduce) return;
    card.addEventListener("pointermove", function (e) {
      var r = card.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      card.style.transform = "perspective(1000px) rotateY(" + ((x - .5) * 7) + "deg) rotateX(" + ((.5 - y) * 7) + "deg)";
      card.style.setProperty("--gx", x * 100 + "%"); card.style.setProperty("--gy", y * 100 + "%");
    });
    card.addEventListener("pointerleave", function () { card.style.transform = ""; });
  });
  // Filtros
  var counts = { todos: L.productos.length, interior: 0, exterior: 0 };
  L.productos.forEach(function (p) { counts[p.linea]++; });
  $$("[data-filter-count]").forEach(function (s) { s.textContent = counts[s.dataset.filterCount]; });
  // Filas completas en la rejilla de 12 columnas: [6,6] y [4,4,4] alternadas
  function layoutCards() {
    var vis = cards.filter(function (c) { return !c.classList.contains("is-hidden"); }), i = 0, row = 0;
    while (i < vis.length) {
      var r = vis.length - i, n = r === 1 ? 1 : (r === 2 || r === 4) ? 2 : r === 3 ? 3 : (row % 2 ? 3 : 2);
      for (var k = 0; k < n; k++) vis[i + k].dataset.span = n === 1 ? "12" : n === 2 ? "6" : "4";
      i += n; row++;
    }
  }
  layoutCards();
  var ink = $(".filters__ink");
  function moveInk(b) { ink.style.width = b.offsetWidth + "px"; ink.style.transform = "translateX(" + b.offsetLeft + "px)"; }
  $$("[data-filter]").forEach(function (b) {
    b.addEventListener("click", function () {
      $$("[data-filter]").forEach(function (x) { x.setAttribute("aria-selected", x === b); });
      moveInk(b);
      var f = b.dataset.filter, k = 0;
      cards.forEach(function (c) {
        var show = f === "todos" || c.dataset.line === f;
        c.classList.toggle("is-hidden", !show);
        if (show && !reduce) {
          c.classList.add("enter");
          (function (el, d) { setTimeout(function () { el.classList.remove("enter"); }, 40 + d * 60); })(c, k++);
        }
      });
      layoutCards();
    });
  });
  window.addEventListener("load", function () { moveInk($('[data-filter][aria-selected="true"]')); });
  window.addEventListener("resize", function () { moveInk($('[data-filter][aria-selected="true"]')); });

  /* ---------- Visualizador ---------- */
  var room = $("[data-room]");
  var vizProducts = L.productos.filter(function (p) { return p.visual; });
  var V = { p: vizProducts[0], a: vizProducts[0].colores[0], b: vizProducts[0].colores[1] || vizProducts[0].colores[0], light: "dia", horiz: false, compare: false, split: 50 };
  var vSel = $("[data-viz-product]");
  vSel.innerHTML = ["interior", "exterior"].map(function (l) {
    return '<optgroup label="' + (l === "interior" ? "Interior" : "Exterior") + '">' + vizProducts.filter(function (p) { return p.linea === l; }).map(function (p) { return '<option value="' + p.id + '">' + esc(fullName(p)) + "</option>"; }).join("") + "</optgroup>";
  }).join("");
  function paintWall(wall, p, c) {
    var tex = wall.querySelector(".room__tex"), v = p.visual;
    var wpx = room.clientWidth || 1000;
    var bw = Math.max(4, wpx * v.muestraCm / 300);
    wall.dataset.modo = v.modo;
    wall.style.setProperty("--tone", c.tono);
    wall.style.setProperty("--bw", bw + "px");
    wall.style.setProperty("--beam-dark", shade(c.tono, -.35));
    wall.style.setProperty("--beam-light", shade(c.tono, .18));
    if (v.modo === "celosia") { tex.style.backgroundImage = ""; tex.style.backgroundSize = ""; return; }
    tex.style.backgroundImage = c.soloTono ? "none" : "url(" + swatchUrl(c.muestra) + ")";
    tex.style.backgroundSize = v.modo === "mosaico" ? bw + "px " + (bw * v.altoCm / v.muestraCm) + "px" : bw + "px 100%";
  }
  function renderViz() {
    var p = V.p;
    vSel.value = p.id;
    paintWall($('[data-wall="a"]'), p, V.a);
    paintWall($('[data-wall="b"]'), p, V.b);
    room.dataset.light = V.light;
    room.classList.toggle("is-horizontal", V.horiz);
    room.classList.toggle("is-compare", V.compare);
    room.style.setProperty("--split", V.split + "%");
    $("[data-compare]").hidden = !V.compare;
    $("[data-tag-a]").textContent = V.a.nombre;
    $("[data-tag-b]").textContent = V.b.nombre;
    $("[data-viz-swatches]").innerHTML = p.colores.map(function (c) { return swatchBtn(c, c.id === V.a.id); }).join("");
    $("[data-viz-color-name]").textContent = V.a.nombre;
    var orient = $("[data-viz-orient]"), canTurn = p.visual.modo === "listones" || p.visual.modo === "tablero" || p.visual.modo === "celosia";
    orient.hidden = !canTurn; if (!canTurn) V.horiz = false;
    orient.setAttribute("aria-pressed", V.horiz);
    $("[data-viz-compare]").setAttribute("aria-pressed", V.compare);
    $$("[data-light]").forEach(function (b) { b.setAttribute("aria-checked", b.dataset.light === V.light); });
    $("[data-viz-summary-name]").textContent = fullName(p) + " · " + V.a.nombre;
    $("[data-viz-summary-meta]").textContent = sizeText(p.medida) + " · " + money(p.precio.pieza) + " por pieza" + (p.precio.caja ? " · " + money(p.precio.caja.precio) + " caja de " + p.precio.caja.piezas : "");
    $("[data-viz-add]").textContent = V.a.agotado ? "Consultar disponibilidad" : "Agregar a cotización";
  }
  function vizSet(pid, cid) {
    var p = product(pid); if (!p || !p.visual) return;
    V.p = p; V.a = color(p, cid);
    V.b = p.colores.filter(function (c) { return c.id !== V.a.id; })[0] || V.a;
    renderViz();
  }
  vSel.addEventListener("change", function () { vizSet(vSel.value); });
  $("[data-viz-swatches]").addEventListener("click", function (e) {
    var b = e.target.closest(".swatch"); if (!b) return;
    var c = color(V.p, b.dataset.color);
    if (c.id !== V.a.id) { V.b = V.a; V.a = c; }
    renderViz();
  });
  $("[data-viz-light]").addEventListener("click", function (e) { var b = e.target.closest("[data-light]"); if (b) { V.light = b.dataset.light; renderViz(); } });
  $("[data-viz-orient]").addEventListener("click", function () { V.horiz = !V.horiz; renderViz(); });
  $("[data-viz-compare]").addEventListener("click", function () { V.compare = !V.compare; renderViz(); if (V.compare) toast("Arrastra la línea para comparar " + V.a.nombre + " y " + V.b.nombre); });
  $("[data-viz-add]").addEventListener("click", function () {
    cartAdd({ tipo: "producto", id: V.p.id, color: V.a.id, unidad: V.p.precio.soloCaja ? "caja" : "pieza", qty: 1 });
    toast(fullName(V.p) + " · " + V.a.nombre + " agregado");
  });
  $("[data-viz-calc]").addEventListener("click", function () { calcSet(V.p.id, V.a.id); });
  room.addEventListener("pointermove", function (e) {
    var r = room.getBoundingClientRect();
    room.style.setProperty("--tx", (e.clientX - r.left) + "px");
    room.style.setProperty("--ty", (e.clientY - r.top) + "px");
    room.classList.add("is-torch");
  });
  room.addEventListener("pointerleave", function () { room.classList.remove("is-torch"); });
  var handle = $(".room__handle"), dragging = false;
  function setSplit(x) {
    var r = room.getBoundingClientRect();
    V.split = Math.max(5, Math.min(95, (x - r.left) / r.width * 100));
    room.style.setProperty("--split", V.split + "%");
    handle.setAttribute("aria-valuenow", Math.round(V.split));
  }
  handle.addEventListener("pointerdown", function (e) { dragging = true; handle.setPointerCapture(e.pointerId); });
  handle.addEventListener("pointermove", function (e) { if (dragging) setSplit(e.clientX); });
  handle.addEventListener("pointerup", function () { dragging = false; });
  handle.addEventListener("keydown", function (e) {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    V.split = Math.max(5, Math.min(95, V.split + (e.key === "ArrowLeft" ? -5 : 5)));
    room.style.setProperty("--split", V.split + "%"); handle.setAttribute("aria-valuenow", V.split);
  });
  window.addEventListener("resize", function () { renderViz(); });
  renderViz();

  /* ---------- Calculadora ---------- */
  var form = $("[data-calc]"), cSel = $("[data-calc-product]"), cCol = $("[data-calc-color]");
  var merma = L.MERMA;
  cSel.innerHTML = ["interior", "exterior"].map(function (l) {
    return '<optgroup label="' + (l === "interior" ? "Interior" : "Exterior") + '">' + L.productos.filter(function (p) { return p.linea === l; }).map(function (p) { return '<option value="' + p.id + '">' + esc(fullName(p)) + "</option>"; }).join("") + "</optgroup>";
  }).join("");
  function fillColors() {
    var p = product(cSel.value);
    cCol.innerHTML = p.colores.map(function (c) { return '<option value="' + c.id + '">' + esc(c.nombre) + (c.agotado ? " (agotado)" : "") + "</option>"; }).join("");
    var lab = { superficie: ["Ancho del muro", "Alto del muro"], piso: ["Largo del área", "Ancho del área"], viga: ["Ancho a cubrir", "Alto de cada viga"] }[p.calc];
    $("[data-calc-w-label]").textContent = lab[0];
    $("[data-calc-h-label]").textContent = lab[1];
    $("[data-calc-gap-wrap]").hidden = p.calc !== "viga";
    $("[data-calc-open-wrap]").hidden = p.calc !== "superficie";
    if (p.calc === "viga") form.separacion.value = p.medida.ancho;
  }
  function bestCombo(n, p) {
    var pr = p.precio;
    if (!pr.caja) return { cajas: 0, sueltas: n, total: n * pr.pieza, piezas: n };
    var b = pr.caja.piezas;
    if (pr.soloCaja) { var k = Math.ceil(n / b); return { cajas: k, sueltas: 0, total: k * pr.caja.precio, piezas: k * b }; }
    var best = null;
    for (var k2 = 0; k2 <= Math.ceil(n / b); k2++) {
      var s = Math.max(0, n - k2 * b), t = k2 * pr.caja.precio + s * pr.pieza;
      if (!best || t < best.total - 0.001 || (Math.abs(t - best.total) < 0.001 && k2 * b + s > best.piezas)) best = { cajas: k2, sueltas: s, total: t, piezas: k2 * b + s };
    }
    return best;
  }
  var lastCalc = null;
  function compute() {
    var p = product(cSel.value), c = color(p, cCol.value), m = p.medida;
    var a = Math.max(0, +form.ancho.value || 0), h = Math.max(0, +form.alto.value || 0);
    var out = $("[data-calc-out]");
    if (!a || !h) { out.innerHTML = '<p class="calc__warn">Escribe medidas mayores a cero.</p>'; lastCalc = null; return; }
    var n, area, extra = "";
    if (p.calc === "viga") {
      var gap = Math.max(0, +form.separacion.value || 0);
      var perRow = Math.ceil((a * 100 + gap) / (m.ancho + gap));
      var runs = Math.ceil(h * 100 / m.largo);
      n = Math.ceil(perRow * runs * (1 + merma));
      area = a * h;
      extra = perRow + " vigas a lo ancho" + (runs > 1 ? " × " + runs + " tramos" : "") + " con " + num(gap, 1) + " cm de separación + " + Math.round(merma * 100) + " % de merma";
    } else {
      area = Math.max(0, a * h - (p.calc === "superficie" ? Math.max(0, +form.huecos.value || 0) : 0));
      if (!area) { out.innerHTML = '<p class="calc__warn">El área a cubrir queda en cero. Revisa lo que descuentas.</p>'; lastCalc = null; return; }
      n = Math.ceil(area * (1 + merma) / (m.largo * m.ancho / 10000));
      extra = num(area, 2) + " m² + " + Math.round(merma * 100) + " % de merma";
    }
    var best = bestCombo(n, p);
    var parts = [];
    if (best.cajas) parts.push(best.cajas + (best.cajas === 1 ? " caja" : " cajas") + " de " + p.precio.caja.piezas);
    if (best.sueltas) parts.push(best.sueltas + (best.sueltas === 1 ? " pieza suelta" : " piezas sueltas"));
    lastCalc = { p: p, c: c, best: best };
    out.innerHTML =
      '<div class="calc__nums"><div><span>Área</span><b>' + num(area, 2) + ' m²</b></div><div><span>Piezas necesarias</span><b>' + n + '</b></div><div><span>Costo por m²</span><b>' + money(Math.round(best.total / area)) + "</b></div></div>" +
      '<p style="color:var(--muted-light);font-size:.9rem">' + esc(extra) + (p.precio.caja ? ". Te conviene comprar " + esc(parts.join(" + ")) + " (" + best.piezas + " pz)." : ". Necesitas " + best.piezas + " piezas.") + "</p>" +
      '<div class="calc__best"><p>Total estimado · ' + esc(fullName(p)) + " " + esc(c.nombre) + "<strong>" + money(best.total) + '</strong></p><button type="button" class="btn btn--light" data-calc-add>' + (c.agotado ? "Consultar disponibilidad" : "Agregar a cotización") + "</button></div>" +
      (c.agotado ? '<p class="calc__warn">Este color aparece agotado en el catálogo. Pregunta por disponibilidad antes de comprar.</p>' : "");
  }
  function calcSet(pid, cid) {
    cSel.value = pid; fillColors();
    if (cid) cCol.value = cid;
    compute();
  }
  cSel.addEventListener("change", function () { fillColors(); compute(); });
  form.addEventListener("input", compute);
  form.addEventListener("submit", function (e) { e.preventDefault(); });
  $("[data-calc-merma]").addEventListener("click", function (e) {
    var b = e.target.closest("[data-merma]"); if (!b) return;
    merma = +b.dataset.merma;
    $$("[data-merma]").forEach(function (x) { x.setAttribute("aria-checked", x === b); });
    compute();
  });
  $("[data-calc-out]").addEventListener("click", function (e) {
    if (!e.target.closest("[data-calc-add]") || !lastCalc) return;
    var x = lastCalc;
    if (x.best.cajas) cartAdd({ tipo: "producto", id: x.p.id, color: x.c.id, unidad: "caja", qty: x.best.cajas });
    if (x.best.sueltas) cartAdd({ tipo: "producto", id: x.p.id, color: x.c.id, unidad: "pieza", qty: x.best.sueltas });
    toast(fullName(x.p) + " · " + x.c.nombre + ": " + x.best.piezas + " pz agregadas");
  });
  fillColors(); compute();

  /* ---------- Galería ---------- */
  var track = $("[data-gallery-track]");
  track.innerHTML = L.galeria.map(function (g) {
    var p = product(g.producto);
    return '<button type="button" class="shot" data-id="' + g.producto + '"><figure><img src="' + scene(g.escena, 800) + '" srcset="' + srcset(g.escena) + '" sizes="(max-width: 900px) 74vw, 30vw" alt="' + esc(g.titulo) + '" loading="lazy"><figcaption>' + esc(g.titulo) + "<small>" + esc(fullName(p)) + " ↗</small></figcaption></figure></button>";
  }).join("");
  $$(".shot", track).forEach(function (s) { s.addEventListener("click", function () { openSheet(s.dataset.id); }); });
  var gallery = $("#inspiracion"), gPin = $("[data-gallery]"), gHead = $(".gallery__head");
  var wide = window.matchMedia("(min-width: 901px)");
  function sizeGallery() {
    if (!wide.matches) { gallery.style.removeProperty("--gh"); track.style.transform = ""; gHead.style.transform = ""; return; }
    var dist = track.scrollWidth - (gPin.clientWidth - track.offsetLeft);
    gallery.style.setProperty("--gh", (window.innerHeight + Math.max(0, dist)) + "px");
    gallery.dataset.dist = Math.max(0, dist);
  }

  /* ---------- Accesorios ---------- */
  $("[data-acc]").innerHTML = L.accesorios.map(function (a, i) {
    return '<article class="acc-card" data-reveal style="--d:' + (i * .07) + 's"><div class="acc-card__img"><img src="' + swatchUrl(a.muestra) + '" alt="' + esc(a.nombre) + '" loading="lazy"></div><h3>' + esc(a.nombre) + "</h3><p>" + money(a.precio) + '<small>por pieza</small></p><div class="row"><div class="stepper"><button type="button" data-as="-10" aria-label="Menos 10">−</button><input type="number" min="1" value="10" aria-label="Cantidad de ' + esc(a.nombre) + '" data-aq><button type="button" data-as="10" aria-label="Más 10">+</button></div></div><button type="button" class="btn btn--light" data-acc-add="' + a.id + '">Agregar</button></article>';
  }).join("");
  $("[data-acc]").addEventListener("click", function (e) {
    var card = e.target.closest(".acc-card"); if (!card) return;
    var q = $("[data-aq]", card);
    var s = e.target.closest("[data-as]");
    if (s) { q.value = Math.max(1, (+q.value || 0) + (+s.dataset.as)); return; }
    var add = e.target.closest("[data-acc-add]");
    if (add) {
      var a = L.accesorios.filter(function (x) { return x.id === add.dataset.accAdd; })[0];
      cartAdd({ tipo: "accesorio", id: a.id, qty: Math.max(1, Math.round(+q.value || 1)) });
      toast(q.value + " × " + a.nombre + " agregados");
    }
  });

  /* ---------- Textos comunes ---------- */
  $$("[data-leyenda]").forEach(function (el) { el.textContent = L.LEYENDA_PRECIOS; });
  $("[data-credits]").innerHTML = L.creditos.map(function (c) { return '<a href="' + c[1] + '" rel="noopener" target="_blank">' + esc(c[0]) + "</a>"; }).join(", ");
  $("[data-year]").textContent = new Date().getFullYear();
  var names = L.productos.map(fullName).concat(["Accesorios de instalación"]);
  var mq = $("[data-marquee]");
  mq.innerHTML = names.concat(names).map(function (n) { return "<span>" + esc(n) + "</span>"; }).join("");

  /* ---------- Menú móvil ---------- */
  var menuBtn = $(".nav__menu"), menu = $("#menu-movil");
  function closeMenu() { menu.hidden = true; menuBtn.setAttribute("aria-expanded", "false"); }
  menuBtn.addEventListener("click", function () {
    var open = menu.hidden; menu.hidden = !open; menuBtn.setAttribute("aria-expanded", String(open));
  });
  $$("a", menu).forEach(function (a) { a.addEventListener("click", closeMenu); });

  /* ---------- Portada ---------- */
  var slides = $$(".hero__slide"), dots = $$(".hero__dots button"), wipe = $(".hero__wipe"), heroIdx = 0, heroTimer;
  function goHero(i) {
    if (i === heroIdx) return;
    var info = L.portada[i];
    if (!reduce) { wipe.classList.remove("is-run"); void wipe.offsetWidth; wipe.classList.add("is-run"); }
    setTimeout(function () {
      slides[heroIdx].classList.remove("is-active");
      heroIdx = i;
      var img = slides[i].querySelector("img"); img.loading = "eager";
      slides[i].classList.add("is-active");
      $("[data-hero-title]").textContent = info.titulo;
      $("[data-hero-note]").textContent = info.nota;
    }, reduce ? 0 : 520);
    dots.forEach(function (d, k) { d.setAttribute("aria-selected", k === i); });
    restartHero();
  }
  function restartHero() { clearInterval(heroTimer); if (!reduce) heroTimer = setInterval(function () { goHero((heroIdx + 1) % slides.length); }, 7000); }
  dots.forEach(function (d, k) { d.addEventListener("click", function () { goHero(k); }); });
  document.addEventListener("visibilitychange", function () { if (document.hidden) clearInterval(heroTimer); else restartHero(); });
  var hero = $(".hero");
  hero.addEventListener("pointermove", function (e) {
    var r = hero.getBoundingClientRect();
    hero.style.setProperty("--lx", ((e.clientX - r.left) / r.width * 100) + "%");
    hero.style.setProperty("--ly", ((e.clientY - r.top) / r.height * 100) + "%");
  });

  /* ---------- Revelado y texto dividido ---------- */
  $$("[data-split]").forEach(function (el) {
    var i = 0;
    function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (w) {
            if (!w) return;
            if (/^\s+$/.test(w)) { frag.appendChild(document.createTextNode(w)); return; }
            var o = document.createElement("span"); o.className = "split-word";
            var s = document.createElement("span"); s.textContent = w; s.style.setProperty("--i", i++);
            o.appendChild(s); frag.appendChild(o);
          });
          n.parentNode.replaceChild(frag, n);
        } else if (n.nodeType === 1) walk(n);
      });
    }
    el.setAttribute("aria-label", el.textContent);
    walk(el);
    $$(".split-word", el).forEach(function (w) { w.setAttribute("aria-hidden", "true"); });
  });
  var scrub = $("[data-scrub]"), scrubWords = [];
  if (scrub) {
    scrub.setAttribute("aria-label", scrub.textContent);
    scrub.innerHTML = scrub.textContent.split(" ").map(function (w) { return '<span class="scrub-word" aria-hidden="true">' + esc(w) + "</span>"; }).join(" ");
    scrubWords = $$(".scrub-word", scrub);
  }
  function countUp(el) {
    var to = +el.dataset.count;
    if (reduce) { el.textContent = to; return; }
    var t0 = performance.now();
    (function step(t) { var k = Math.min(1, (t - t0) / 1400); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 4))); if (k < 1) requestAnimationFrame(step); })(t0);
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      en.target.classList.add("is-in");
      $$("[data-count]", en.target).forEach(countUp);
      io.unobserve(en.target);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
  function observeReveals() { $$("[data-reveal], [data-split]").forEach(function (el) { if (!el.classList.contains("is-in")) io.observe(el); }); }

  /* ---------- Desplazamiento: nav, progreso, parallax, galería, manifiesto ---------- */
  var nav = $(".nav"), bar = $(".progress span"), lastY = window.scrollY, ticking = false;
  var parallax = $$("[data-parallax]");
  function onScroll() {
    var y = window.scrollY, vh = window.innerHeight, docH = document.documentElement.scrollHeight - vh;
    nav.classList.toggle("is-solid", y > 40);
    nav.classList.toggle("is-hidden", y > vh && y > lastY + 4 && sheet.hidden && cartEl.hidden);
    if (y < lastY - 4) nav.classList.remove("is-hidden");
    lastY = y;
    bar.style.transform = "scaleX(" + (docH > 0 ? y / docH : 0) + ")";
    if (!reduce) {
      parallax.forEach(function (el) {
        var r = el.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        el.style.transform = "translate3d(0," + ((r.top + r.height / 2 - vh / 2) * -(+el.dataset.parallax)) + "px,0)";
      });
      cards.forEach(function (c) {
        var r = c.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        c.style.setProperty("--py", ((r.top + r.height / 2 - vh / 2) / vh * -24).toFixed(1) + "px");
      });
    }
    if (wide.matches) {
      var gr = gallery.getBoundingClientRect(), dist = +gallery.dataset.dist || 0;
      var k = Math.min(1, Math.max(0, -gr.top / Math.max(1, gr.height - vh)));
      track.style.transform = gHead.style.transform = "translate3d(" + (-dist * k) + "px,0,0)";
    }
    if (scrubWords.length) {
      var sr = scrub.getBoundingClientRect();
      var p = Math.min(1, Math.max(0, (vh * .85 - sr.top) / (sr.height + vh * .45)));
      var lit = Math.round(p * scrubWords.length);
      scrubWords.forEach(function (w, i) { w.classList.toggle("is-lit", reduce || i < lit); });
    }
    ticking = false;
  }
  window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  window.addEventListener("resize", function () { sizeGallery(); onScroll(); });

  /* ---------- Cursor ---------- */
  if (finePointer && !reduce) {
    var cur = $(".cursor"), cx = 0, cy = 0, tx = 0, ty = 0;
    window.addEventListener("pointermove", function (e) { tx = e.clientX; ty = e.clientY; cur.classList.add("is-on"); });
    document.addEventListener("pointerover", function (e) { cur.classList.toggle("is-hover", !!e.target.closest("a, button, .card, select, input, .lens, .room")); });
    document.addEventListener("pointerleave", function () { cur.classList.remove("is-on"); });
    (function loop() { cx += (tx - cx) * .2; cy += (ty - cy) * .2; cur.style.transform = "translate3d(" + cx + "px," + cy + "px,0)"; requestAnimationFrame(loop); })();
  }

  /* ---------- Arranque ---------- */
  renderCart(false);
  sizeGallery();
  onScroll();
  function start() {
    document.body.classList.remove("is-loading");
    document.body.classList.add("is-ready");
    setTimeout(function () { document.body.classList.add("is-done"); observeReveals(); restartHero(); }, reduce ? 0 : 1100);
    setTimeout(function () { sizeGallery(); renderViz(); }, 400);
  }
  if (reduce) start();
  else {
    var started = false;
    var go = function () { if (!started) { started = true; setTimeout(start, 450); } };
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(go);
    window.addEventListener("load", go);
    setTimeout(go, 2200);
  }
})();
