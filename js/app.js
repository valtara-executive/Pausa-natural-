/**
 * PAUSA NATURAL - NÚCLEO DE OPERACIONES (CORE LOGIC)
 * Controla: Navegación SPA, Render dinámico de catálogos y el Asistente de Chat.
 */

document.addEventListener("DOMContentLoaded", () => {
    inicializarSPA();
    renderizarCatalogo();
    inicializarChatbot();
});

/* ==========================================================================
   1. NAVEGACIÓN SINGLE PAGE APPLICATION (SPA)
   ========================================================================== */
function navigateTo(sectionId) {
    // Alternar visibilidad de las secciones primarias
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
    const targetSection = document.getElementById(sectionId);
    if (targetSection) targetSection.classList.add('active');

    // Sincronizar botones de navegación de escritorio
    document.querySelectorAll('.nav-link').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(`'${sectionId}'`)) {
            btn.classList.add('active');
        }
    });

    // Sincronizar menú de navegación en smartphones
    document.querySelectorAll('.mobile-nav .mobile-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(`'${sectionId}'`)) {
            btn.classList.add('active');
        }
    });

    // Resetear el scroll de la ventana al inicio de la sección de manera sutil
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Inyección global de la función para el ámbito del HTML
window.navigateTo = navigateTo;

function inicializarSPA() {
    // Si se accede a la raíz, nos aseguramos que el inicio esté activo
    const hash = window.location.hash.replace('#', '');
    if (['inicio', 'catalogo', 'chat'].includes(hash)) {
        navigateTo(hash);
    }
}

/* ==========================================================================
   2. RENDERIZACIÓN AUTOMÁTICA DEL CATÁLOGO (M1, M2...)
   ========================================================================== */
function renderizarCatalogo() {
    const gridMasajes = document.getElementById('grid-masajes');
    if (!gridMasajes) return;

    gridMasajes.innerHTML = ''; // Limpiar contenedor

    catalogoMasajes.forEach(masaje => {
        const urlWhatsApp = `https://wa.me/${infoEmpresa.telefonoWhatsApp}?text=${encodeURIComponent(masaje.mensajeWhatsApp)}`;
        
        const tarjetaHTML = `
            <div class="menu-card" data-id="${masaje.id}">
                <img src="${masaje.foto}" alt="${masaje.titulo}" class="menu-img" onerror="this.src='assets/images/hero-placeholder.jpg'">
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
   3. ASISTENTE DE CHAT INTERACTIVO (BOTONES + TEXTAREA ADAPTABLE)
   ========================================================================== */
function inicializarChatbot() {
    const chatMessages = document.getElementById('chatMessages');
    const chatOptionsPanel = document.getElementById('chatOptionsPanel');
    const chatInputArea = document.getElementById('chatInputArea');
    const customQueryInput = document.getElementById('customQueryInput');
    const btnSendChat = document.getElementById('btnSendChat');

    if (!chatOptionsPanel || !chatMessages) return;

    // Generar botones pre-entrenados iniciales
    renderizarBotonesOpciones();

    function renderizarBotonesOpciones() {
        chatOptionsPanel.innerHTML = '';
        opcionesChatbot.forEach((opcion, index) => {
            const boton = document.createElement('button');
            boton.className = 'chat-btn-option';
            boton.textContent = opcion.texto;
            boton.addEventListener('click', () => procesarClicOpcion(opcion, index));
            chatOptionsPanel.appendChild(boton);
        });
    }

    function procesarClicOpcion(opcion, index) {
        // Inyectar mensaje de usuario en el chat burbuja
        inyectarMensaje(opcion.texto, 'user-message');

        // Retraso de cortesía para simular respuesta natural del bot
        setTimeout(() => {
            inyectarMensaje(opcion.respuestaBot, 'bot-message');

            // Caso A: La opción requiere un redireccionamiento directo por botón
            if (opcion.requiereWhatsApp) {
                const urlDirecta = `https://wa.me/${infoEmpresa.telefonoWhatsApp}?text=${encodeURIComponent(opcion.msgWhatsApp)}`;
                setTimeout(() => window.open(urlDirecta, '_blank'), 1000);
            }

            // Caso B: El usuario activa el flujo de Duda Específica (Se libera el teclado)
            if (opcion.habilitaInput) {
                chatInputArea.style.display = 'flex';
                customQueryInput.focus();
                chatOptionsPanel.style.display = 'none'; // Se ocultan botones para centrar la atención
            }
        }, 600);
    }

    function inyectarMensaje(texto, clase) {
        const mensajeDiv = document.createElement('div');
        mensajeDiv.className = `message ${clase}`;
        mensajeDiv.innerHTML = `<p>${texto}</p>`;
        chatMessages.appendChild(mensajeDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll hacia abajo
    }

    /* Lógica del campo de texto inteligente (Auto-ajustable) */
    if (customQueryInput) {
        customQueryInput.addEventListener('input', function() {
            // Regresar al tamaño base para calcular correctamente el scrollHeight
            this.style.height = 'auto';
            // Se adapta la altura de acuerdo al texto escrito (manejado por el max-height de CSS)
            this.style.height = (this.scrollHeight) + 'px';
        });
    }

    /* Disparador de envío de texto a WhatsApp */
    function enviarMensajePersonalizado() {
        const consultaTexto = customQueryInput.value.trim();
        if (consultaTexto === '') return;

        inyectarMensaje(consultaTexto, 'user-message');
        
        // Estructura de mensaje limpio con prefijo de marca
        const mensajeEstructurado = `Hola Pausa Natural, tengo la siguiente duda específica: ${consultaTexto}`;
        const urlWhatsAppFinal = `https://wa.me/${infoEmpresa.telefonoWhatsApp}?text=${encodeURIComponent(mensajeEstructurado)}`;

        // Limpieza de interfaz post-envío
        customQueryInput.value = '';
        customQueryInput.style.height = 'auto';
        chatInputArea.style.display = 'none';
        chatOptionsPanel.style.display = 'flex'; // Regresa el menú original de botones

        // Redirección directa a la API
        setTimeout(() => window.open(urlWhatsAppFinal, '_blank'), 800);
    }

    if (btnSendChat) {
        btnSendChat.addEventListener('click', enviarMensajePersonalizado);
    }

    if (customQueryInput) {
        customQueryInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault(); // Evita salto de línea por defecto
                enviarMensajePersonalizado();
            }
        });
    }
}
