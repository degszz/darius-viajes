export interface SlideData {
  imagen: string;
  emoji: string;
  etiqueta: string;
  titulo: string;
  tituloDestacado: string;
  subtitulo: string;
  textoWhatsApp: string;
}

export interface DetalleViaje {
  id: string;
  nombre: string;
  categoria: string;
  imagen: string;
  descripcionCorta: string;
  descripcionLarga: string;
  precio: string;
  textoWhatsApp: string;
}

export interface PromoViaje {
  id: string;
  nombre: string;
  imagen: string;
  descripcion: string;
  precio: string;
  viajeRef: string;
  textoWhatsApp: string;
}

export const whatsappNumero = "542226689720";

export function waLink(texto: string): string {
  return `https://wa.me/${whatsappNumero}?text=${encodeURIComponent(texto)}`;
}

export const slides: SlideData[] = [
  {
    imagen: "/puntacana.avif",
    emoji: "✈",
    etiqueta: "Viajes a medida",
    titulo: "Descubrí",
    tituloDestacado: "tu próximo destino",
    subtitulo: "Caribe, Brasil, Cruceros y los mejores destinos de Argentina. Viajá con quienes realmente te acompañan.",
    textoWhatsApp: "Hola! Vi la web de Darius Viajes y quiero info sobre sus paquetes ✈",
  },
  {
    imagen: "/janeiro.avif",
    emoji: "🌴",
    etiqueta: "Ofertas especiales",
    titulo: "Brasil,",
    tituloDestacado: "tierra de alegría",
    subtitulo: "Río de Janeiro, Florianópolis y más. Paquetes con aéreo incluido y las mejores condiciones de pago.",
    textoWhatsApp: "Hola! Quiero info sobre los paquetes a Brasil 🇧🇷",
  },
  {
    imagen: "/altamar.avif",
    emoji: "🛳",
    etiqueta: "Cruceros 2024",
    titulo: "Cruceros",
    tituloDestacado: "por el mundo",
    subtitulo: "Navegá el Mediterráneo, el Caribe o Sudamérica en los mejores barcos. Financiación disponible.",
    textoWhatsApp: "Hola! Quiero info sobre los cruceros disponibles 🛳",
  },
];

export const destinos: DetalleViaje[] = [
  {
    id: "caribe",
    nombre: "Caribe",
    categoria: "Caribe",
    imagen: "/puntacana.avif",
    descripcionCorta: "Playas paradisíacas y aguas turquesas",
    descripcionLarga: "Descubrí el Caribe con nuestros paquetes todo incluido. Playas de arena blanca, aguas cristalinas y una experiencia inolvidable te esperan. Trabajamos con los mejores resorts all-inclusive de Punta Cana, Cancún y más destinos caribeños. Incluimos aéreo, traslados y asistencia 24/7 para que solo te preocupes por disfrutar.",
    precio: "USD 999",
    textoWhatsApp: "Hola! Quiero info sobre paquetes al Caribe 🏝",
  },
  {
    id: "brasil",
    nombre: "Brasil",
    categoria: "Brasil",
    imagen: "/janeiro.avif",
    descripcionCorta: "Alegría, naturaleza y cultura",
    descripcionLarga: "Brasil te espera con los brazos abiertos. Desde las playas de Río de Janeiro hasta la magia de Florianópolis, cada rincón tiene algo único. Ofrecemos paquetes con aéreo, alojamiento y excursiones para que vivas la experiencia brasileña al máximo. Consultá por salidas grupales y viajes personalizados.",
    precio: "USD 699",
    textoWhatsApp: "Hola! Quiero info sobre los paquetes a Brasil 🇧🇷",
  },
  {
    id: "cruceros",
    nombre: "Cruceros",
    categoria: "Cruceros",
    imagen: "/altamar.avif",
    descripcionCorta: "Viví una experiencia única en alta mar",
    descripcionLarga: "Navegá los mares más increíbles con nuestros cruceros todo incluido. Caribe, Mediterráneo, Sudamérica y más destinos en los mejores barcos. Disfrutá de gastronomía premium, entretenimiento a bordo y excursiones en cada puerto. Financiación disponible en cuotas fijas. ¡Tu aventura en altamar empieza acá!",
    precio: "USD 789",
    textoWhatsApp: "Hola! Quiero info sobre los cruceros 🛳",
  },
  {
    id: "argentina",
    nombre: "Argentina",
    categoria: "Argentina",
    imagen: "/bariloche.avif",
    descripcionCorta: "Paisajes únicos, aventura y tradición",
    descripcionLarga: "Argentina tiene todo para vos. Desde la majestuosa Patagonia con Bariloche y sus lagos, hasta las Cataratas del Iguazú y los viñedos de Mendoza. Paquetes nacionales con aéreo, traslados y excursiones. Viajes en colectivo, avión o combinados. Descubrí tu país con nosotros.",
    precio: "USD 449",
    textoWhatsApp: "Hola! Quiero info sobre paquetes en Argentina 🇦🇷",
  },
];

export const promos: PromoViaje[] = [
  {
    id: "promo-puntacana",
    nombre: "Punta Cana",
    imagen: "/puntacana.avif",
    descripcion: "7 noches All Inclusive · Aéreo + Traslados",
    precio: "USD 999",
    viajeRef: "caribe",
    textoWhatsApp: "Hola! Quiero info sobre la promo de Punta Cana 🏝",
  },
  {
    id: "promo-rio",
    nombre: "Río de Janeiro",
    imagen: "/janeiro.avif",
    descripcion: "Aéreo + 7 noches con desayuno",
    precio: "USD 699",
    viajeRef: "brasil",
    textoWhatsApp: "Hola! Quiero info sobre la promo de Río de Janeiro 🇧🇷",
  },
  {
    id: "promo-crucero",
    nombre: "Crucero MSC",
    imagen: "/altamar.avif",
    descripcion: "Brasil y Buenos Aires · 7 noches",
    precio: "USD 789",
    viajeRef: "cruceros",
    textoWhatsApp: "Hola! Quiero info sobre la promo del Crucero MSC 🛳",
  },
  {
    id: "promo-bariloche",
    nombre: "Bariloche",
    imagen: "/bariloche.avif",
    descripcion: "7 noches con desayuno · Aéreo incluido",
    precio: "USD 449",
    viajeRef: "argentina",
    textoWhatsApp: "Hola! Quiero info sobre la promo de Bariloche ❄",
  },
];
