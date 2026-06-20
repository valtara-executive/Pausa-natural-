/**
 * PAUSA NATURAL - BASE DE DATOS LOCAL DE SERVICIOS
 * Datos de marca y catálogo con códigos optimizados para renderizado.
 */

const infoEmpresa = {
    telefonoWhatsApp: "525561403707", // Número de Pausa Natural con código de país
    nombreMarca: "Pausa Natural",
    eslogan: "Bienestar Muscular Integral"
};

const catalogoMasajes = [
    {
        id: "M1",
        foto: "assets/images/F1.jpg",
        titulo: "Masaje Relajante",
        descripcion: "Terapia manual profunda diseñada con movimientos suaves, lentos y rítmicos para mitigar los efectos del estrés, reducir de forma progresiva la tensión acumulada y restaurar un estado de serenidad y bienestar corporal absoluto.",
        duracion: "45 minutos",
        precio: 350,
        mensajeWhatsApp: "Hola Pausa Natural, me interesa agendar una cita para el Masaje Relajante (M1) de 45 minutos."
    },
    {
        id: "M2",
        foto: "assets/images/F2.jpg",
        titulo: "Masaje Facial Rejuvenecedor",
        descripcion: "Tratamiento estético-clínico enfocado en tonificar los músculos faciales, atenuar líneas de expresión y combatir la flacidez. Estimula de forma natural la producción de colágeno y elastina, devolviendo luminosidad y firmeza al rostro.",
        duracion: "25 minutos",
        precio: 300,
        mensajeWhatsApp: "Hola Pausa Natural, me gustaría reservar un espacio para el Masaje Facial Rejuvenecedor (M2) de 25 minutos."
    },
    {
        id: "M3",
        foto: "assets/images/F3.jpg",
        titulo: "Masaje Facial Terapéutico",
        descripcion: "Procedimiento especializado de estimulación neuromuscular, ideal como coadyuvante en la rehabilitación de parálisis faciales y asimetrías musculares. Activa la contracción, mejora la microcirculación local y asiste en la recuperación de la movilidad.",
        duracion: "45 minutos",
        precio: 300,
        mensajeWhatsApp: "Hola Pausa Natural, necesito más información o agendar una sesión del Masaje Facial Terapéutico (M3) de 45 minutos."
    },
    {
        id: "M4",
        foto: "assets/images/F4.jpg",
        titulo: "Masaje con Velas (Terapia Térmica)",
        descripcion: "Experiencia multisensorial premium donde la cera templada de aceites esenciales puros se desliza sobre el cuerpo. Alivia las contracturas musculares, reduce la fatiga nerviosa y provee una hidratación y nutrición celular profunda en la piel.",
        duracion: "45 minutos",
        precio: 350,
        mensajeWhatsApp: "Hola Pausa Natural, me interesa vivir la experiencia del Masaje con Velas (M4) de 45 minutos."
    },
    {
        id: "M5",
        foto: "assets/images/F5.jpg",
        titulo: "Masaje Deportivo de Alto Rendimiento",
        descripcion: "Terapia manual avanzada orientada a la preparación de las fibras musculares antes de la actividad física o la aceleración de la recuperación tisular post-esfuerzo. Optimiza el rendimiento muscular, previene lesiones metabólicas y drena el ácido láctico.",
        duracion: "45 minutos",
        precio: 350,
        mensajeWhatsApp: "Hola Pausa Natural, quiero agendar una sesión de Masaje Deportivo de Alto Rendimiento (M5) de 45 minutos."
    },
    {
        id: "M6",
        foto: "assets/images/F6.jpg",
        titulo: "Masaje con Esferas Chinas (Qi Gong)",
        descripcion: "Terapia holística avanzada que fusiona la microvibración acústica con la presión física controlada sobre puntos de acupresión. Destensa capas musculares profundas, alivia la rigidez articular y reequilibra el flujo energético corporal.",
        duracion: "45 minutos",
        precio: 450,
        mensajeWhatsApp: "Hola Pausa Natural, me interesa reservar una sesión de Masaje con Esferas Chinas (M6) de 45 minutos."
    },
    {
        id: "M7",
        foto: "assets/images/F7.jpg",
        titulo: "Ritual de Piedras Calientes (Basalto Volcánico)",
        descripcion: "Tratamiento premium que combina masoterapia clínica con el uso de piedras volcánicas lisas de basalto a temperatura controlada. El calor penetra directamente en el tejido conectivo, permitiendo deshacer contracturas graves sin necesidad de aplicar presión dolorosa.",
        duracion: "90 minutos",
        precio: 900,
        mensajeWhatsApp: "Hola Pausa Natural, deseo agendar una sesión del exclusivo Ritual de Piedras Calientes (M7) de 90 minutos."
    }
];

// Opciones pre-entrenadas para el chatbot
const opcionesChatbot = [
    { texto: "📍 Ver ubicación del consultorio", respuestaBot: "Nuestras instalaciones principales de atención se encuentran ubicadas de manera estratégica en Paseo de la Reforma 195, Ciudad de México. ¿Te gustaría agendar una cita en esta sucursal?", requiereWhatsApp: true, msgWhatsApp: "Hola Pausa Natural, me gustaría obtener los detalles de la ubicación e indicaciones para llegar a su consultorio de Paseo de la Reforma." },
    { texto: "📅 Consultar horarios disponibles", respuestaBot: "Nuestros horarios de atención clínica son de Lunes a Viernes de 9:00 AM a 8:00 PM, y Sábados de 9:00 AM a 4:00 PM. ¿Qué día se adapta mejor a tus necesidades?", requiereWhatsApp: true, msgWhatsApp: "Hola Pausa Natural, quiero consultar la disponibilidad de horarios para agendar un masaje esta semana." },
    { texto: "💆 ¿Cómo elijo mi masaje ideal?", respuestaBot: "Si sufres de dolor por estrés, te recomendamos el Masaje Relajante o Piedras Calientes. Si eres deportista, tu mejor opción es la terapia de Alto Rendimiento. Si tienes dudas específicas, puedes hacernos una pregunta personalizada con el botón de abajo.", requiereWhatsApp: false },
    { texto: "❓ Tengo una duda específica", respuestaBot: "Por favor, escribe detalladamente tu consulta en el campo de texto que se acaba de habilitar abajo. Al finalizar, presiona enviar para canalizar tu duda directamente con nuestro especialista vía WhatsApp.", habilitaInput: true }
];
