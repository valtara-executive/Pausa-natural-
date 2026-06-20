/**
 * PAUSA NATURAL - BASE DE DATOS LOCAL DE SERVICIOS (PRODUCCIÓN)
 * --------------------------------------------------------------------------
 * Cliente: Pausa Natural
 * Especialidad: Masoterapia Clínica y Bienestar Muscular Integral
 * Canal de Destino: +52 55 6140 3707
 * 
 * NOTA DE INFRAESTRUCTURA: Todas las rutas multimedia apuntan directamente 
 * a la raíz de la carpeta 'assets/' según la configuración física del repositorio.
 */

// 1. CONFIGURACIÓN E IDENTIDAD DE MARCA
const infoEmpresa = {
    telefonoWhatsApp: "525561403707", // Número de Pausa Natural con código de país sin espacios
    nombreMarca: "Pausa Natural",
    eslogan: "Bienestar Muscular Integral",
    logoRuta: "assets/logo.png"
};

// 2. CATÁLOGO MAESTRO DE MASOTERAPIA (Claves unificadas M1-M7 y F1-F7)
const catalogoMasajes = [
    {
        id: "M1",
        foto: "assets/F1.jpg",
        titulo: "Masaje Relajante Antiestrés",
        descripcion: "Terapia manual de descarga profunda diseñada metódicamente con movimientos suaves, lentos y rítmicos. Su objetivo clínico es mitigar los efectos sistémicos del estrés, reducir de forma progresiva la tensión acumulada en las cadenas musculares y restaurar un estado de serenidad y equilibrio corporal absoluto.",
        duracion: "45 minutos",
        precio: 350,
        mensajeWhatsApp: "Hola Pausa Natural, me interesa agendar una cita para el Masaje Relajante Antiestrés (M1) de 45 minutos."
    },
    {
        id: "M2",
        foto: "assets/F2.jpg",
        titulo: "Masaje Facial Rejuvenecedor",
        descripcion: "Tratamiento estético-clínico de estimulación superficial enfocado en tonificar la musculatura facial, atenuar de manera visible las líneas de expresión y combatir la flacidez tisular. Promueve de forma natural la síntesis de colágeno y elastina, devolviendo la luminosidad, firmeza y lozanía al rostro.",
        duracion: "25 minutos",
        precio: 300,
        mensajeWhatsApp: "Hola Pausa Natural, me gustaría reservar un espacio para el Masaje Facial Rejuvenecedor (M2) de 25 minutos."
    },
    {
        id: "M3",
        foto: "assets/F3.jpg",
        titulo: "Masaje Facial Terapéutico Clínico",
        descripcion: "Procedimiento altamente especializado de estimulación y reactivación neuromuscular. Funciona como un coadyuvante clave en la rehabilitación de condiciones complejas como la parálisis facial periférica o asimetrías musculares, activando la contracción muscular controlada, mejorando la microcirculación local y asistiendo en la recuperación simétrica de la movilidad facial.",
        duracion: "45 minutos",
        precio: 300,
        mensajeWhatsApp: "Hola Pausa Natural, necesito más información o agendar una sesión del Masaje Facial Terapéutico Clínico (M3) de 45 minutos."
    },
    {
        id: "M4",
        foto: "assets/F4.jpg",
        titulo: "Masaje con Velas (Terapia Térmica Premium)",
        descripcion: "Experiencia de masoterapia multisensorial donde la cera templada de aceites esenciales puros y mantecas orgánicas se desliza sobre los tejidos a una temperatura perfectamente tolerable. Destensa las fibras musculares contracturadas, mitiga la fatiga del sistema nervioso y provee una hidratación profunda y nutrición celular en la capa dérmica.",
        duracion: "45 minutos",
        precio: 350,
        mensajeWhatsApp: "Hola Pausa Natural, me interesa vivir la experiencia del Masaje con Velas - Terapia Térmica (M4) de 45 minutos."
    },
    {
        id: "M5",
        foto: "assets/F5.jpg",
        titulo: "Masaje Deportivo de Alto Rendimiento",
        descripcion: "Terapia manual avanzada orientada a las necesidades específicas de atletas. Se enfoca en la preparación profunda de las fibras musculares antes de la actividad física o en la aceleración de la recuperación tisular post-esfuerzo. Optimiza el rendimiento muscular general, previene lesiones metabólicas crónicas y asiste eficazmente en el drenaje de ácido láctico acumulado.",
        duracion: "45 minutos",
        precio: 350,
        mensajeWhatsApp: "Hola Pausa Natural, quiero agendar una sesión de Masaje Deportivo de Alto Rendimiento (M5) de 45 minutos."
    },
    {
        id: "M6",
        foto: "assets/F6.jpg",
        titulo: "Masaje con Esferas Chinas (Equilibrio Qi Gong)",
        descripcion: "Tratamiento holístico avanzado que fusiona de manera precisa la microvibración acústica, la presión física controlada y el estímulo sobre puntos de acupresión. Diseñado específicamente para liberar tensiones arraigadas en las capas musculares más profundas, aliviar la rigidez articular provocada por posturas estáticas y reequilibrar el flujo energético corporal.",
        duracion: "45 minutos",
        precio: 450,
        mensajeWhatsApp: "Hola Pausa Natural, me interesa reservar una sesión de Masaje con Esferas Chinas (M6) de 45 minutos."
    },
    {
        id: "M7",
        foto: "assets/F7.jpg",
        titulo: "Ritual de Piedras Calientes (Basalto Volcánico)",
        descripcion: "Tratamiento premium que combina la masoterapia clínica convencional con el uso estático y dinámico de piedras volcánicas lisas de basalto a temperatura controlada. El calor de las rocas volcánicas penetra directamente en el tejido conectivo y los músculos, permitiendo deshacer contracturas profundas o crónicas de manera efectiva sin necesidad de someter al paciente a presiones dolorosas o excesivas.",
        duracion: "90 minutos",
        precio: 900,
        mensajeWhatsApp: "Hola Pausa Natural, deseo agendar una sesión del exclusivo Ritual de Piedras Calientes de Basalto Volcánico (M7) de 90 minutos."
    }
];

// 3. MENÚ DE RESPUESTAS AUTOMATIZADAS DEL ASISTENTE INTERACTIVO
const opcionesChatbot = [
    { 
        texto: "📍 Ver ubicación del consultorio", 
        respuestaBot: "Nuestras instalaciones principales de atención clínica se encuentran ubicadas de manera estratégica en Paseo de la Reforma 195, Ciudad de México. Es un espacio diseñado para tu completa comodidad y relajación. ¿Te gustaría agendar una cita en esta ubicación?", 
        requiereWhatsApp: true, 
        msgWhatsApp: "Hola Pausa Natural, me gustaría obtener los detalles exactos de la ubicación, mapas e indicaciones para llegar a su consultorio en Paseo de la Reforma." 
    },
    { 
        texto: "📅 Consultar horarios disponibles", 
        respuestaBot: "Nuestros horarios habituales de atención clínica son de Lunes a Viernes de 9:00 AM a 8:00 PM, y los Sábados de 9:00 AM a 4:00 PM (previa cita). ¿Qué día y rango de horario se adapta mejor a tus actividades semanales?", 
        requiereWhatsApp: true, 
        msgWhatsApp: "Hola Pausa Natural, quiero consultar la disponibilidad de días y horarios para agendar un masaje con ustedes esta semana." 
    },
    { 
        texto: "💆 ¿Cómo elijo mi masaje ideal?", 
        respuestaBot: "Si sufres de dolor provocado por estrés diario o mala postura, te recomendamos ampliamente el Masaje Relajante o el Ritual de Piedras Calientes. Si practicas ejercicio constante, tu mejor opción es la terapia Deportiva. Si requieres rehabilitación facial, el Terapéutico es el indicado. Si tienes un caso muy específico, selecciona el botón de 'Duda específica' abajo para habilitar el teclado.", 
        requiereWhatsApp: false 
    },
    { 
        texto: "❓ Tengo una duda específica", 
        respuestaBot: "Entendido perfectamente. Por favor, escribe de forma detallada tu consulta o sintomatología en el campo de texto que se acaba de habilitar aquí abajo. Al finalizar, presiona el botón de enviar para transferir tu caso directamente a nuestro especialista vía WhatsApp.", 
        habilitaInput: true 
    }
];
// Frases dinámicas para el efecto máquina de escribir en el Inicio
const textosDinamicos = [
    "Masoterapia clínica especializada para tu salud muscular.",
    "Instalaciones de lujo diseñadas para tu descanso absoluto.",
    "Liberación del estrés diario con expertos en anatomía humana.",
    "Tratamientos térmicos y mecánicos adaptados a tu cuerpo."
];
