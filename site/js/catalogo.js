/*
 * Catálogo Lambrin — único archivo de datos de la landing (ADR-0006).
 * Fuente: catálogo lambrin.pdf (8 páginas). Medidas en centímetros, precios en MXN.
 * Para cambiar un precio, un color o el número de WhatsApp, edita solo este archivo.
 */
window.LAMBRIN = {
  // ADR-0007: solo dígitos con código de país, p. ej. "5218112345678". Vacío = «Contacto próximamente».
  CONTACT: {
    whatsapp: "",
    saludo: "Hola, Lambrin. Me interesa cotizar lo siguiente:"
  },

  LEYENDA_PRECIOS: "Precios en MXN, sujetos a cambio sin previo aviso.",
  MERMA: 0.10,

  productos: [
    {
      id: "interior-15",
      nombre: "Lambrin Interior",
      serie: "Serie 15",
      linea: "interior",
      escena: "interior-15",
      escenaAlt: "Sala con muro de listones de madera oscura y sofá verde",
      resumen: "Listones de 15 cm en siete tonos, de los nogales cálidos a los textiles claros.",
      descripcion: "La línea más versátil: siete acabados que van del nogal y el encino a tonos negros, grises y textiles como Tapiz y Lino. Pensada para muros de TV, cabeceras, recepciones y pasillos.",
      medida: { largo: 290, ancho: 15, espesor: 2.3 },
      precio: { pieza: 185, caja: { precio: 2500, piezas: 14 } },
      colores: [
        { id: "nogal", nombre: "Nogal", muestra: "int15-nogal", tono: "#92664d" },
        { id: "encino", nombre: "Encino", muestra: "int15-encino", tono: "#6b4e3a" },
        { id: "natural", nombre: "Natural", muestra: "int15-natural", tono: "#bda793" },
        { id: "negro", nombre: "Negro", muestra: "int15-negro", tono: "#363636" },
        { id: "gris", nombre: "Gris", muestra: "int15-gris", tono: "#54514f" },
        { id: "tapiz", nombre: "Tapiz", muestra: "int15-tapiz", tono: "#b9aea0" },
        { id: "lino", nombre: "Lino", muestra: "int15-lino", tono: "#c1bbab" }
      ],
      visual: { modo: "listones", muestraCm: 15 },
      calc: "superficie"
    },
    {
      id: "interior-16",
      nombre: "Lambrin Interior",
      serie: "Serie 16",
      linea: "interior",
      escena: "interior-16",
      escenaAlt: "Sala con muro de listones grises, sofá azul y planta",
      resumen: "Listones de 16 cm con vetas profundas: Golden, Walnut, Light Walnut, Oak y Beige.",
      descripcion: "Listones un poco más anchos y con veta marcada. Cinco tonos de madera, del dorado al nogal profundo, más un beige luminoso para espacios claros.",
      medida: { largo: 290, ancho: 16, espesor: 2.4 },
      precio: { pieza: 185, caja: { precio: 2500, piezas: 14 } },
      colores: [
        { id: "golden", nombre: "Golden", muestra: "int16-golden", tono: "#a57159" },
        { id: "walnut", nombre: "Walnut", muestra: "int16-walnut", tono: "#584840" },
        { id: "light-walnut", nombre: "Light Walnut", muestra: "int16-light-walnut", tono: "#5e392d" },
        { id: "oak", nombre: "Oak", muestra: "int16-oak", tono: "#745c52" },
        { id: "beige", nombre: "Beige", muestra: "int16-beige", tono: "#c3b7ab" }
      ],
      visual: { modo: "listones", muestraCm: 16 },
      calc: "superficie"
    },
    {
      id: "waby",
      nombre: "Lambrin Interior Waby",
      serie: "Waby",
      linea: "interior",
      escena: "waby",
      escenaAlt: "Vestíbulo con muro de listones de madera, lámparas colgantes y mostrador de mármol",
      resumen: "Relieve ondulado de 16 cm con acabados textiles y metálicos.",
      descripcion: "Un relieve suave que juega con la luz rasante. Acabados Tapestry Oyster, Cloth 126, Beige Metal y Skin para recepciones, mostradores y muros protagonistas.",
      medida: { largo: 290, ancho: 16, espesor: 2.4 },
      precio: { pieza: 215, caja: { precio: 3200, piezas: 16 } },
      colores: [
        { id: "tapestry-oyster", nombre: "Tapestry Oyster", muestra: "waby-tapestry-oyster", tono: "#ccc6c0" },
        { id: "cloth-126", nombre: "Cloth 126", muestra: "waby-cloth-126", tono: "#b4b1b1" },
        { id: "beige-metal", nombre: "Beige Metal", muestra: "waby-beige-metal", tono: "#d8cfc2", soloTono: true },
        { id: "skin", nombre: "Skin", muestra: "waby-skin", tono: "#e9dccd", soloTono: true }
      ],
      visual: { modo: "listones", muestraCm: 16 },
      calc: "superficie"
    },
    {
      id: "marmol",
      nombre: "Láminas de Mármol PVC",
      serie: "Mármol PVC",
      linea: "interior",
      escena: "marmol",
      escenaAlt: "Sala con muro de mármol blanco veteado, sillón blanco y lámpara",
      resumen: "Láminas de 1.22 × 2.90 m con vetas de mármol, en cuatro estilos.",
      descripcion: "El efecto de un muro de mármol en láminas de gran formato y solo 3 mm de espesor. Gray, Borghini, Black y White Marble para muros de TV, baños y recepciones.",
      medida: { largo: 290, ancho: 122, espesor: 0.3 },
      precio: { pieza: 990, caja: null },
      colores: [
        { id: "gray-marble", nombre: "Gray Marble", muestra: "marmol-gray", tono: "#2e2c27" },
        { id: "borghini", nombre: "Borghini", muestra: "marmol-borghini", tono: "#a9a7a2" },
        { id: "black-marble", nombre: "Black Marble", muestra: "marmol-black", tono: "#0c0c0c" },
        { id: "white-marble", nombre: "White Marble", muestra: "marmol-white", tono: "#c5c6c6" }
      ],
      visual: { modo: "lamina", muestraCm: 122 },
      calc: "superficie"
    },
    {
      id: "viga-interior",
      nombre: "Viga Interior",
      serie: "Viga 7.5",
      linea: "interior",
      escena: "viga-interior",
      escenaAlt: "Escalera con celosía de vigas de madera",
      resumen: "Vigas de 7.5 × 5 cm para celosías, divisores y plafones.",
      descripcion: "Vigas huecas de 7.5 × 5 cm para dividir espacios sin cerrarlos: celosías, cancelería decorativa, plafones y cabeceras. En Light Walnut, Walnut y Oak.",
      medida: { largo: 290, ancho: 7.5, espesor: 5 },
      precio: { pieza: 600, caja: null },
      colores: [
        { id: "light-walnut", nombre: "Light Walnut", muestra: "vigaint-light-walnut", tono: "#7a3f2c" },
        { id: "walnut", nombre: "Walnut", muestra: "vigaint-walnut", tono: "#4a3a33" },
        { id: "oak", nombre: "Oak", muestra: "vigaint-oak", tono: "#c9a27e" }
      ],
      visual: { modo: "celosia", muestraCm: 7.5 },
      calc: "viga"
    },
    {
      id: "acustico",
      nombre: "Panel Acústico Interior",
      serie: "Hexágono",
      linea: "interior",
      escena: "acustico",
      escenaAlt: "Muro de piezas hexagonales con luz rasante",
      resumen: "Paneles de hexágonos de 56.5 × 65 cm en Oak y Light Walnut.",
      descripcion: "Módulos de hexágonos de madera sobre fondo oscuro que forman un patrón continuo. Para salas de TV, estudios, oficinas y salas de juntas.",
      medida: { largo: 56.5, ancho: 65, espesor: 1.8 },
      precio: { pieza: 850, caja: { precio: 4000, piezas: 5 } },
      colores: [
        { id: "oak", nombre: "Oak", muestra: "acus-oak", tono: "#ccb9a7" },
        { id: "light-walnut", nombre: "Light Walnut", muestra: "acus-light-walnut", tono: "#896959" }
      ],
      visual: { modo: "mosaico", muestraCm: 65, altoCm: 56.5 },
      calc: "superficie"
    },
    {
      id: "exterior",
      nombre: "Lambrin Exterior",
      serie: "Exterior 22",
      linea: "exterior",
      escena: "exterior",
      escenaAlt: "Casa moderna con fachada de listones de madera y jardín",
      resumen: "Listones de 22 cm para fachadas en Teka, Walnut, Light Gray y Black.",
      descripcion: "El listón más ancho del catálogo, para fachadas, muros de jardín, accesos y bardas. Cuatro tonos: dos maderas cálidas, un gris y un negro.",
      medida: { largo: 290, ancho: 22, espesor: 2.5 },
      precio: { pieza: 700, caja: { precio: 3250, piezas: 5 } },
      colores: [
        { id: "teka", nombre: "Teka", muestra: "ext-teka", tono: "#7b4b37" },
        { id: "walnut", nombre: "Walnut", muestra: "ext-walnut", tono: "#5d3c36" },
        { id: "light-gray", nombre: "Light Gray", muestra: "ext-light-gray", tono: "#595b66" },
        { id: "black", nombre: "Black", muestra: "ext-black", tono: "#28282a" }
      ],
      visual: { modo: "listones", muestraCm: 22 },
      calc: "superficie"
    },
    {
      id: "viga-exterior",
      nombre: "Viga Exterior",
      serie: "Viga 10",
      linea: "exterior",
      escena: "viga-exterior",
      escenaAlt: "Terraza bajo pérgola de vigas de madera con sala exterior",
      resumen: "Vigas de 10 × 5 cm para pérgolas, celosías y plafones exteriores.",
      descripcion: "Vigas huecas de 10 × 5 cm para pérgolas, celosías de jardín, cubre-vistas y plafones exteriores. En Teka, Light Gray y Walnut.",
      medida: { largo: 290, ancho: 10, espesor: 5 },
      precio: { pieza: 650, caja: null },
      colores: [
        { id: "teka", nombre: "Teka", muestra: "vigaext-teka", tono: "#a8714a" },
        { id: "light-gray", nombre: "Light Gray", muestra: "vigaext-light-gray", tono: "#6e7178" },
        { id: "walnut", nombre: "Walnut", muestra: "vigaext-walnut", tono: "#4a3b35" }
      ],
      visual: { modo: "celosia", muestraCm: 10 },
      calc: "viga"
    },
    {
      id: "panel-techo",
      nombre: "Panel Techo & Pared",
      serie: "Duela 15",
      linea: "exterior",
      escena: "panel-techo",
      escenaAlt: "Casa con plafón y muro revestidos de duela de madera",
      resumen: "Duela de 15 cm para plafones y muros, en Teka y Light Gray.",
      descripcion: "Duela de 15 cm para cubrir plafones de terrazas, aleros, cocheras y muros. Dos tonos: Teka cálido y Light Gray.",
      medida: { largo: 290, ancho: 15, espesor: 2.1 },
      precio: { pieza: 420, caja: { precio: 3050, piezas: 8 } },
      colores: [
        { id: "teka", nombre: "Teka", muestra: "techo-teka", tono: "#93512e" },
        { id: "light-gray", nombre: "Light Gray", muestra: "techo-light-gray", tono: "#6f7178" }
      ],
      visual: { modo: "listones", muestraCm: 15 },
      calc: "superficie"
    },
    {
      id: "panel-muro",
      nombre: "Panel Muro & Techo",
      serie: "Panel 60",
      linea: "exterior",
      escena: "panel-muro",
      escenaAlt: "Sala con muros y techo revestidos de paneles de madera y sofá blanco",
      resumen: "Paneles de 60 cm de ancho con veta lisa, en Oak, Light Walnut y Walnut.",
      descripcion: "Paneles anchos y lisos de 60 × 290 cm para cubrir muros y techos completos con pocas juntas. En Oak, Light Walnut y Walnut.",
      medida: { largo: 290, ancho: 60, espesor: 0.9 },
      precio: { pieza: 650, caja: { precio: 3700, piezas: 6 } },
      colores: [
        { id: "oak", nombre: "Oak", muestra: "muro-oak", tono: "#d5a38b" },
        { id: "light-walnut", nombre: "Light Walnut", muestra: "muro-light-walnut", tono: "#a46248" },
        { id: "walnut", nombre: "Walnut", muestra: "muro-walnut", tono: "#62423a" }
      ],
      visual: { modo: "tablero", muestraCm: 60 },
      calc: "superficie"
    },
    {
      id: "piedra-pu",
      nombre: "Piedra PU",
      serie: "Piedra PU",
      linea: "exterior",
      escena: "piedra-pu",
      escenaAlt: "Fachada moderna revestida de piedra laja oscura",
      resumen: "Placas de 120 × 60 cm con relieve de piedra, en White y Gray.",
      descripcion: "Placas de poliuretano con relieve de piedra de 5 cm de espesor, para fachadas, columnas y muros de acento. En White y Gray.",
      medida: { largo: 120, ancho: 60, espesor: 5 },
      precio: { pieza: 750, caja: null },
      colores: [
        { id: "white", nombre: "White", muestra: "pu-white", tono: "#f3f1f0" },
        { id: "gray", nombre: "Gray", muestra: "pu-gray", tono: "#4f4f4f" }
      ],
      visual: { modo: "mosaico", muestraCm: 60, altoCm: 120 },
      calc: "superficie"
    },
    {
      id: "piedras-flexibles",
      nombre: "Piedras Flexibles",
      serie: "Flexible",
      linea: "exterior",
      escena: "piedras-flexibles",
      escenaAlt: "Casa moderna con columna de piedra clara en el acceso",
      resumen: "Láminas de 120 × 60 cm con relieve de piedra en cuatro diseños.",
      descripcion: "Láminas delgadas con textura de piedra: Rubik Cube Stone, New Line Stone, Undersea Travertine y Wave Board. Para accesos, columnas y muros de acento.",
      medida: { largo: 120, ancho: 60, espesor: 0.09 },
      precio: { pieza: 650, caja: null },
      colores: [
        { id: "rubik", nombre: "Rubik Cube Stone", muestra: "flex-rubik", tono: "#f7f6f5" },
        { id: "new-line", nombre: "New Line Stone", muestra: "flex-new-line", tono: "#e4e1de" },
        { id: "undersea", nombre: "Undersea Travertine", muestra: "flex-undersea", tono: "#e5e5e2" },
        { id: "wave", nombre: "Wave Board", muestra: "flex-wave", tono: "#ebe9e8" }
      ],
      visual: { modo: "mosaico", muestraCm: 60, altoCm: 120 },
      calc: "superficie"
    },
    {
      id: "deck",
      nombre: "Deck Piso",
      serie: "Deck 14",
      linea: "exterior",
      escena: "deck",
      escenaAlt: "Terraza de deck de madera junto a una casa con ventanales",
      resumen: "Duela de piso de 14 cm para terrazas, en caja de 5 piezas.",
      descripcion: "Duela de 14 × 2.5 cm para terrazas, andadores y bordes de alberca. Se vende por caja de 5 piezas.",
      medida: { largo: 290, ancho: 14, espesor: 2.5 },
      precio: { pieza: 380, caja: { precio: 1900, piezas: 5 }, soloCaja: true },
      colores: [
        { id: "teka", nombre: "Teka", muestra: "deck-teka", tono: "#97674f", agotado: true }
      ],
      visual: null,
      calc: "piso"
    }
  ],

  accesorios: [
    { id: "clip-interior", nombre: "Clip instalación interior", precio: 3, muestra: "acc-clip-interior" },
    { id: "clip-exterior", nombre: "Clip instalación exterior", precio: 4, muestra: "acc-clip-exterior" },
    { id: "viga-interior", nombre: "Accesorio viga interior", precio: 75, muestra: "acc-viga-interior" },
    { id: "viga-exterior", nombre: "Accesorio viga exterior", precio: 85, muestra: "acc-viga-exterior" },
    { id: "clip-piso", nombre: "Clip piso instalación", precio: 5, muestra: "acc-clip-piso" }
  ],

  portada: [
    { escena: "hero-oscuro", titulo: "Lambrin Interior", nota: "Tonos profundos", alt: "Muro de listones de madera oscura con chimenea y lámparas colgantes" },
    { escena: "hero-calido", titulo: "Lambrin Interior", nota: "Luz cálida", alt: "Cocina con muro de listones claros iluminados por una repisa" },
    { escena: "hero-fachada", titulo: "Lambrin Exterior", nota: "Fachadas", alt: "Casa moderna de dos pisos con fachada de listones de madera" }
  ],

  galeria: [
    { escena: "g-recepcion", titulo: "Recepción con listones y mármol", producto: "waby" },
    { escena: "g-marmol-tv", titulo: "Muro de TV con mármol", producto: "marmol" },
    { escena: "g-celosia", titulo: "Celosía como divisor", producto: "viga-interior" },
    { escena: "g-fachada", titulo: "Fachada de listones verticales", producto: "exterior" },
    { escena: "g-pergola", titulo: "Pérgola frente a la alberca", producto: "viga-exterior" },
    { escena: "g-sala", titulo: "Sala con techo de madera", producto: "panel-techo" },
    { escena: "g-terraza", titulo: "Galería con plafón de madera", producto: "panel-muro" },
    { escena: "g-acceso", titulo: "Acceso con muro de piedra", producto: "piedras-flexibles" },
    { escena: "g-deck", titulo: "Terraza de deck", producto: "deck" },
    { escena: "g-detalle", titulo: "Recámara con lambrin", producto: "interior-16" }
  ],

  // Créditos (Licencia Unsplash). Ver assets/CREDITOS.md.
  creditos: [
    ["Jean-Philippe Delberghe", "https://unsplash.com/@jipy32"],
    ["旅人 森", "https://unsplash.com/@forester2022"],
    ["Tile Merchant Ireland", "https://unsplash.com/@tilemerchant"],
    ["Aalo Lens", "https://unsplash.com/@aalolens"],
    ["Franco Debartolo", "https://unsplash.com/@francotheshooter"],
    ["Guzmán Barquín", "https://unsplash.com/@guzmanbarquin"],
    ["wu lao", "https://unsplash.com/@magpienya"],
    ["Alef Morais", "https://unsplash.com/@alef_visuals"],
    ["Hans", "https://unsplash.com/@hansphoto"],
    ["Caroline Badran", "https://unsplash.com/@___atmos"],
    ["Max Zhang", "https://unsplash.com/@so666max"],
    ["Esphera ArqEng", "https://unsplash.com/@espheraarqeng"],
    ["Eli Chamoun", "https://unsplash.com/@nvision_3d"],
    ["Andy Vult", "https://unsplash.com/@andyvult"],
    ["David Peters", "https://unsplash.com/@gnipoolator"],
    ["Bryan Agua", "https://unsplash.com/@mongos134"],
    ["Timur Seyfelmlyukov", "https://unsplash.com/@timurse"],
    ["Salvo Media LLC", "https://unsplash.com/@salvomedia"]
  ]
};
