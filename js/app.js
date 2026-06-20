/**
 * PAUSA NATURAL - NÚCLEO CENTRAL DE OPERACIONES (CORE SCRIPT)
 * Desarrollado por el equipo de ingeniería de Grupo Gevizz
 * --------------------------------------------------------------------------
 * Controla: Enrutamiento SPA, Carrusel, Renderizado, Máquina de Escribir y Chatbot.
 */

document.addEventListener("DOMContentLoaded", () => {
    // Inicializaciones globales al cargar el DOM
    inicializarSPA();
    inicializarCarrusel();
    renderizarCatalogo();
    inicializarMaquinaEscribir();
    inicializarChatbot();
});

/* ==========================================================================
   1. NAVEGACIÓN SINGLE PAGE APPLICATION (SPA)
   ========================================================================== */
function navigateTo(sectionId) {
    // Ocultar todas las secciones primarias de la app
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Activar la sección solicitada por ID
    const targetSection = document.getElementById(sectionId);
    if (targetSection) targetSection.classList.add('active');

    // Sincronizar clases activas en el menú de escritorio
    document.querySelectorAll('.nav-link').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(`'${sectionId}'`)) {
            btn.classList.add('active');
        }
    });

    // Sincronizar clases activas en el menú de smartphones
    document.querySelectorAll('.mobile-nav .mobile-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(`'${sectionId}'`)) {
            btn.classList.add('active');
        }
    });

    // Ajustar el comportamiento del scroll según el módulo activo
    if (sectionId === 'chat') {
        // Si entramos al chat, fijamos la pantalla al inicio para evitar desajustes verticales
        window.scrollTo({ top: 0 });
    } else {
        // En catálogo o inicio, sube suavemente al top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Exponer la función globalmente para enlazarla con los clics del HTML
window.navigateTo = navigateTo;

function inicializarSPA() {
    const hash = window.location.hash.replace('#', '');
    if (['inicio', 'catalogo', 'chat'].includes(hash)) {
        navigateTo(hash);
    }
}

/* ==========================================================================
   2. CONTROLADOR DEL HERO CARRUSEL
   ========================================================================== */
let slideActual = 0;
let carruselIntervalo;

function inicializarCarrusel() {
    const slides = document.querySelectorAll('.carousel-slide');
    if (slides.length <= 1) return; // No ciclar si no hay múltiples slides
    
    resetearCarruselIntervalo();
}

function setSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.hero-carousel .dot');
    if (!slides.length) return;

    // Quitar estados activos viejos
    slides[slideActual].classList.remove('active');
    if (dots.length) dots[slideActual].classList.remove('active');

    // Actualizar puntero
    slideActual = index;

    // Asignar nuevos estados activos con transición CSS
    slides[slideActual].classList.add('active');
    if (dots.length) dots[slideActual].classList.add('active');

    resetearCarruselIntervalo();
}
window.setSlide = setSlide;

function siguienteSlide() {
    const slides = document.querySelectorAll('.carousel-slide');
    if (!slides.length) return;
    let proximoSlide = (slideActual + 1) % slides.length;
    setSlide(proximoSlide);
}

function resetearCarruselIntervalo() {
    clearInterval(carruselIntervalo);
    carruselIntervalo = setInterval(siguienteSlide, 6000); // Rotación cada 6 segundos
}

/* ==========================================================================
   3. EFECTO DINÁMICO: MÁQUINA DE ESCRIBIR
   ========================================================================== */
function inicializarMaquinaEscribir() {
    const elementoTarget = document.getElementById('typingTarget');
    // Verificación de seguridad si por alguna razón no existiera el arreglo en contenido.js
    if (!elementoTarget || typeof textosDinamicos === 'undefined' || !textosDinamicos.length) return;

    let fraseIndex = 0;
    let caracterIndex = 0;
    let borrando = false;
    let tiempoEscritura = 100;

    function procesarAnimacion() {
        const fraseActual = textosDinamicos[fraseIndex];

        if (!borrando) {
            // Añadir letra por letra
            elementoTarget.textContent = fraseActual.substring(0, caracterIndex + 1);
            caracterIndex++;

            if (caracterIndex === fraseActual.length) {
                // Pausa larga al terminar la frase antes de empezar a borrar
                borrando = true;
                tiempoEscritura = 3000; 
            } else {
                tiempoEscritura = 60; // Velocidad de tecleo estándar
            }
        } else {
            // Eliminar letra por letra de atrás hacia adelante
            elementoTarget.textContent = fraseActual.substring(0, caracterIndex - 1);
            caracterIndex--;

            if (caracterIndex === 0) {
                borrando = false;
                fraseIndex = (fraseIndex + 1) % textosDinamicos.length; // Ciclar a la siguiente frase
                tiempoEscritura = 500; // Pausa antes de escribir la nueva frase
            } else {
                tiempoEscritura = 30; // Velocidad de borrado rápido
            }
        }

        setTimeout(procesarAnimacion, tiempoEscritura);
    }

    // Arrancar la máquina de escribir
    procesarAnimacion();
}

/* ==========================================================================
   4. RENDERIZACIÓN AUTOMÁTICA DEL CATÁLOGO DE MASAJES (RUTAS CORREGIDAS)
   ========================================================================== */
function renderizarCatalogo() {
    const gridMasajes = document.getElementById('grid-masajes');
    if (!gridMasajes || typeof catalogoMasajes === 'undefined') return;

    gridMasajes.innerHTML = ''; // Limpieza preventiva

    catalogoMasajes.forEach(masaje => {
        // Inyectamos codificación URL segura para el mensaje que se enviará por WhatsApp
        const urlWhatsApp = `https://wa.me/${infoEmpresa.telefonoWhatsApp}?text=${encodeURIComponent(masaje.mensajeWhatsApp)}`;
        
        const tarjetaHTML = `
            <div class="menu-card" data-id="${masaje.id}">
                <img src="${masaje.foto}" alt="${masaje.titulo}" class="menu-img" onerror="this.src='assets/hero-placeholder.jpg'">
                <div class="menu-info">
                    <h3 class="menu-title">${masaje.titulo}</h3>
                    <p class="menu-desc">${masaje.descripcion}</p>
                    <div class="menu-meta">
                        <span class="menu-price">$${masaje.precio}.00 MXN</span>
                        <span class="menu-time"><i class="fa-regular fa-clock"></i> ${masaje.duracion}</span>
                    </div>
                    <a href="${urlWhatsApp}" target="_blank" class="btn-full">Reservar vía WhatsApp</a>
                </div>
            </div>
        `;
        gridMasajes.insertAdjacentHTML('beforeend', tarjetaHTML);
    });
}

/* ==========================================================================
   5. ASISTENTE INTERACTIVO DE CHAT (LÓGICA OPERATIVA)
   ========================================================================== */
function inicializarChatbot() {
    const chatMessages = document.getElementById('chatMessages');
    const chatOptionsPanel = document.getElementById('chatOptionsPanel');
    const chatInputArea = document.getElementById('chatInputArea');
    const customQueryInput = document.getElementById('customQueryInput');
    const btnSendChat = document.getElementById('btnSendChat');

    if (!chatOptionsPanel || !chatMessages || typeof opcionesChatbot === 'undefined') return;

    // Pintar los botones pre-entrenados del chatbot de inicio
    inyectarBotonesOpciones();

    function inyectarBotonesOpciones() {
        chatOptionsPanel.innerHTML = '';
        opcionesChatbot.forEach((opcion, index) => {
            const boton = document.createElement('button');
            boton.className = 'chat-btn-option';
            boton.textContent = opcion.texto;
            boton.addEventListener('click', () => despacharClicOpcion(opcion));
            chatOptionsPanel.appendChild(boton);
        });
    }

    function despacharClicOpcion(opcion) {
        // Dibujar el mensaje que mandó el usuario en forma de burbuja a la derecha
        pintarMensajeBurbuja(opcion.texto, 'user-message');

        // Simular tiempo de respuesta orgánica
        setTimeout(() => {
            pintarMensajeBurbuja(opcion.respuestaBot, 'bot-message');

            // Comportamiento A: Requiere transferir de inmediato al usuario a WhatsApp
            if (opcion.requiereWhatsApp) {
                const urlAccion = `https://wa.me/${infoEmpresa.telefonoWhatsApp}?text=${encodeURIComponent(opcion.msgWhatsApp)}`;
                setTimeout(() => window.open(urlAccion, '_blank'), 1000);
            }

            // Comportamiento B: El usuario activa la entrada libre para "Duda específica"
            if (opcion.habilitaInput) {
                chatInputArea.style.display = 'flex';
                chatOptionsPanel.style.display = 'none'; // Desvanecer la botonera para forzar teclado
                customQueryInput.focus();
            }
        }, 650);
    }

    function pintarMensajeBurbuja(texto, claseIdentificadora) {
        const mensajeDiv = document.createElement('div');
        mensajeDiv.className = `message ${claseIdentificadora}`;
        mensajeDiv.innerHTML = `<p>${texto}</p>`;
        chatMessages.appendChild(mensajeDiv);
        
        // Mantener el scroll interno siempre al fondo de la pantalla fija
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    /* Comportamiento Dinámico del Área de Texto (Auto-escalable) */
    if (customQueryInput) {
        customQueryInput.addEventListener('input', function() {
            this.style.height = 'auto'; // Reset estructural
            this.style.height = (this.scrollHeight) + 'px'; // Crece proporcionalmente
        });
    }

    /* Motor de Procesamiento para Consultas Personalizadas */
    function procesarEnvioTextoLibre() {
        const queryOriginal = customQueryInput.value.trim();
        if (queryOriginal === '') return;

        // Mostrar lo escrito en el chatbox
        pintarMensajeBurbuja(queryOriginal, 'user-message');
        
        // Formatear la cadena final con los requerimientos de la marca
        const mensajeFinalEstructurado = `Hola Pausa Natural, tengo la siguiente duda específica: ${queryOriginal}`;
        const urlWhatsAppDespacho = `https://wa.me/${infoEmpresa.telefonoWhatsApp}?text=${encodeURIComponent(mensajeFinalEstructurado)}`;

        // Limpieza y restauración de la interfaz
        customQueryInput.value = '';
        customQueryInput.style.height = 'auto';
        chatInputArea.style.display = 'none';
        chatOptionsPanel.style.display = 'flex'; // Revivir el menú guiado de botones

        // Redirigir de inmediato al canal oficial de WhatsApp de Pausa Natural
        setTimeout(() => window.open(urlWhatsAppDespacho, '_blank'), 800);
    }

    // Escuchadores de eventos para el botón de enviar y la tecla Enter
    if (btnSendChat) {
        btnSendChat.addEventListener('click', procesarEnvioTextoLibre);
    }

    if (customQueryInput) {
        customQueryInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault(); // Evitar el salto de línea tradicional
                procesarEnvioTextoLibre();
            }
        });
    }
}
