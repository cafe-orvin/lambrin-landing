/*
 * Capa de demo para el prospecto (ADR-0010): botón «Cotiza tu landing page» y
 * cotización de Orvin. Solo se incluye en la copia publicada en /demo/; el sitio
 * principal no carga este archivo.
 */
(function () {
  "use strict";

  var COTIZACION = {
    marca: "Orvin",
    cliente: "Lambrin",
    whatsapp: "528681259055", // provisional, el mismo de las pruebas
    nota: "Precios en MXN más IVA.",
    conceptos: [
      { nombre: "Desarrollo de la landing page", detalle: "Pago único · 50 % de anticipo y 50 % a la entrega", monto: 18500, periodo: "" },
      { nombre: "Dominio .com.mx", detalle: "Registro y renovación", monto: 650, periodo: "/año" },
      { nombre: "Hosting con certificado SSL", detalle: "Sitio en línea con candado de seguridad", monto: 1800, periodo: "/año" },
      { nombre: "Soporte y cambios", detalle: "Actualización de precios, productos y fotos", monto: 600, periodo: "/mes", opcional: true }
    ],
    incluye: [
      "Diseño a la medida con movimiento y escenas fotográficas",
      "Catálogo completo: 13 productos, 44 colores y accesorios con precios",
      "Fotos realistas de cada color generadas con IA",
      "Visualizador de muro y calculadora de piezas",
      "Lista de cotización que llega directo a tu WhatsApp",
      "Optimizada para celular y lista para Google"
    ]
  };

  function money(n) { return "$" + n.toLocaleString("es-MX"); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  var C = COTIZACION;
  var arranque = C.conceptos.filter(function (c) { return !c.opcional; }).reduce(function (s, c) { return s + c.monto; }, 0);
  var soporte = C.conceptos.filter(function (c) { return c.opcional; })[0];
  var msg = "Hola, " + C.marca + ". Vi el demo de la landing page de " + C.cliente + " y quiero cotizarla.";
  var waUrl = "https://wa.me/" + C.whatsapp + "?text=" + encodeURIComponent(msg);

  var pill = document.createElement("button");
  pill.type = "button";
  pill.className = "demo-pill";
  pill.setAttribute("aria-haspopup", "dialog");
  pill.innerHTML = '<span class="demo-pill__tag">Demo</span><span class="demo-pill__txt">Cotiza tu landing page</span>';

  var tip = document.createElement("div");
  tip.className = "demo-tip";
  tip.setAttribute("role", "status");
  tip.innerHTML = "Esta es una demo de tu landing. Explórala y, cuando quieras, consulta aquí cuánto cuesta.";

  var dlg = document.createElement("dialog");
  dlg.className = "demo-dlg";
  dlg.setAttribute("aria-labelledby", "demo-dlg-t");
  dlg.innerHTML =
    '<div class="demo-dlg__in">' +
      '<button type="button" class="demo-dlg__x" data-demo-close aria-label="Cerrar">×</button>' +
      '<p class="demo-dlg__brand">' + esc(C.marca) + ' · Propuesta para ' + esc(C.cliente) + "</p>" +
      '<h2 id="demo-dlg-t">Tu landing page, lista para vender</h2>' +
      '<p class="demo-dlg__lead">Lo que acabas de recorrer es tu sitio funcionando. Esto es lo que cuesta publicarlo con tu propio dominio.</p>' +
      '<ul class="demo-dlg__inc">' + C.incluye.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" +
      '<table class="demo-dlg__tbl"><tbody>' +
        C.conceptos.map(function (c) {
          return "<tr><th scope=\"row\">" + esc(c.nombre) + (c.opcional ? ' <em>opcional</em>' : "") + "<small>" + esc(c.detalle) + "</small></th><td>" + money(c.monto) + "<small>" + c.periodo + "</small></td></tr>";
        }).join("") +
      "</tbody></table>" +
      '<div class="demo-dlg__sum">' +
        "<div><span>Para arrancar</span><b>" + money(arranque) + "</b><small>Desarrollo, dominio y hosting del primer año</small></div>" +
        (soporte ? "<div><span>Soporte opcional</span><b>" + money(soporte.monto) + "<i>" + soporte.periodo + "</i></b><small>" + esc(soporte.detalle) + "</small></div>" : "") +
      "</div>" +
      '<p class="demo-dlg__note">' + esc(C.nota) + "</p>" +
      '<a class="demo-dlg__cta" href="' + waUrl + '" target="_blank" rel="noopener">Quiero mi landing</a>' +
    "</div>";

  function open() { tip.classList.remove("is-on"); if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", ""); }
  function close() { if (typeof dlg.close === "function") dlg.close(); else dlg.removeAttribute("open"); pill.focus(); }

  pill.addEventListener("click", open);
  dlg.addEventListener("click", function (e) { if (e.target === dlg || e.target.closest("[data-demo-close]")) close(); });

  document.body.appendChild(pill);
  document.body.appendChild(tip);
  document.body.appendChild(dlg);

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  setTimeout(function () {
    pill.classList.add("is-on");
    tip.classList.add("is-on");
    setTimeout(function () { tip.classList.remove("is-on"); }, 7000);
  }, reduce ? 0 : 4200);
})();
