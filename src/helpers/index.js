export const formatearDinero = (cantidad) => {
  return cantidad.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const limpiarUrlImagen = (direccion) => {
  const nombreArchivo = direccion
    .split("\\")
    .pop()
    .split("/")
    .pop()
    .split(".")[0];
  return nombreArchivo;
};
export const limpiarCreateAtFecha = (fecha) => {
  const fechaCompleta = new Date(fecha);
  const opciones = { day: "2-digit", month: "2-digit", year: "numeric" };
  const fechaFormateada = fechaCompleta.toLocaleDateString("es-ES", opciones);
  return fechaFormateada;
};
export const limpiarCreateAtHora = (fecha) => {
  const fechaCompleta = new Date(fecha);
  const horaFormateada = fechaCompleta.toLocaleTimeString();
  return horaFormateada;
};

export const calcularDescuento = (precio, descuento) => {
  if (descuento) {
    const restante = (precio * descuento) / 100;
    const total = precio - restante;
    return total;
  } else {
    return precio;
  }
};
export const formatearTextoDB = (texto) => {
  const textoFormateado = texto.toLowerCase().replace(/\s+/g, "-");
  return textoFormateado;
};
export const formatoNombreImg = (nombre) => {
  const partes = nombre.split(".");
  const formato = partes[partes.length - 1];
  return formato;
};
export const formatearTextoVista = (texto) => {
  const textoFormateado = texto
    .split("-") // Divide el string en un array usando "-" como separador
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Convierte la primera letra de cada palabra a mayúscula
    .join(" "); // Une las palabras con un espacio

  return textoFormateado;
};
export const formatearFecha = (fechaISO) => {
  const fecha = new Date(fechaISO);
  const dia = fecha.getDate();
  const mes = fecha.getMonth(); // Los meses son indexados desde 0 (enero) a 11 (diciembre)
  const anio = fecha.getFullYear();
  const horas = fecha.getHours();
  const minutos = fecha.getMinutes();

  const mesesEnEspanol = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  // Formatea los minutos para que siempre tengan dos dígitos
  const minutosFormateados = minutos < 10 ? `0${minutos}` : minutos;

  return `${dia} de ${mesesEnEspanol[mes]} de ${anio} a las ${horas}:${minutosFormateados}`;
};

export const generateGoogleMapsUrl = (positions) => {
  if (positions.length < 2) {
    return "";
  }

  const [origin, destination] = positions;
  const [latB, lngB] = destination;

  return `https://www.google.com/maps/dir/?api=1&origin=my+location&destination=${latB},${lngB}`;
};

/* https://www.google.com/maps/dir/?api=1&origin=LATITUD_A,LONGITUD_A&destination=LATITUD_B,LONGITUD_B */

