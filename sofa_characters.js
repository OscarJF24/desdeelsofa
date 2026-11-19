// ============================================================
// DESDE EL SOFÁ - PERSONAJES ILUSTRADOS DE LA FAMILIA COLOMBIANA
// Ilustraciones mejoradas con alto detalle y estilo cartoon familiar
// Roles: Papá, Mamá, Hijo, Hija, Tío, Tía, Abuelo, Abuela
// ============================================================

window.renderSofaCharacters = function(playersList, activePlayerId = null) {
  const container = document.getElementById('sofaSeatedCharacters');
  const emptyHint = document.getElementById('emptySofaHint');
  if (!container) return;

  container.innerHTML = '';

  if (!playersList || playersList.length === 0) {
    if (emptyHint) emptyHint.style.display = 'block';
    return;
  }
  if (emptyHint) emptyHint.style.display = 'none';

  playersList.forEach((player) => {
    const personDiv = document.createElement('div');
    personDiv.className = 'seated-person';
    personDiv.id = `seated_${player.id}`;

    const isActive = (player.id === activePlayerId);
    if (isActive) {
      personDiv.style.transform = 'scale(1.18) translateY(-14px)';
      personDiv.style.zIndex = '10';
    }

    // Burbuja con Nombre, Rol y Ruta de Maestría
    const bubble = document.createElement('div');
    bubble.className = 'person-name-bubble';
    const title = player.roleTitle || getRoleTitleDefault(player.role);
    const badge = player.masteryBadge ? ` (${player.masteryBadge})` : '';
    bubble.textContent = `${title}: ${player.name}${badge}`;
    if (isActive) {
      bubble.style.background = '#fde047';
      bubble.style.color = '#0f172a';
      bubble.style.fontWeight = '900';
      bubble.style.boxShadow = '0 0 15px rgba(253, 224, 71, 0.9)';
    }

    // Avatar SVG Ilustrado
    const svgWrap = document.createElement('div');
    svgWrap.innerHTML = getRoleSvg(player.role || 'papa', isActive);

    personDiv.appendChild(bubble);
    personDiv.appendChild(svgWrap);
    container.appendChild(personDiv);
  });
};

function getRoleTitleDefault(role) {
  const map = {
    papa: 'Papá',
    mama: 'Mamá',
    hijo: 'Hijo',
    hija: 'Hija',
    tio: 'Tío',
    tia: 'Tía',
    abuelo: 'Abuelo',
    abuela: 'Abuela'
  };
  return map[role] || 'Familiar';
}

window.getRoleSvg = function(role, isActive = false) {
  const glow = isActive ? 'filter="drop-shadow(0 0 14px #fde047)"' : '';
  const r = (role || 'papa').toLowerCase();

  // 1. PAPÁ (Sombrero Vueltiao con tejido genuino, bigote estilizado, guayabera con bolsillos y pliegues)
  if (r === 'papa') {
    return `
      <svg class="person-svg-avatar" width="88" height="118" viewBox="0 0 90 120" ${glow}>
        <defs>
          <linearGradient id="skinP" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffedd5"/>
            <stop offset="100%" stop-color="#fed7aa"/>
          </linearGradient>
          <linearGradient id="guayabera" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="100%" stop-color="#f1f5f9"/>
          </linearGradient>
        </defs>
        <!-- Sombrero Vueltiao Ala Exterior -->
        <ellipse cx="45" cy="22" rx="36" ry="11" fill="#fef08a" stroke="#0f172a" stroke-width="2.5"/>
        <path d="M 12 22 Q 45 15 78 22 Q 45 29 12 22" fill="#0f172a" opacity="0.15"/>
        <!-- Cinta del Sombrero con tejido colombiano -->
        <path d="M 27 22 Q 45 10 63 22 L 60 14 Q 45 6 30 14 Z" fill="#0f172a"/>
        <ellipse cx="45" cy="21" rx="19" ry="6" fill="#fef08a" stroke="#0f172a" stroke-width="1.8"/>
        <!-- Detalles geométricos del Sombrero -->
        <line x1="33" y1="17" x2="35" y2="23" stroke="#fef08a" stroke-width="1.5"/>
        <line x1="45" y1="15" x2="45" y2="21" stroke="#fef08a" stroke-width="1.5"/>
        <line x1="57" y1="17" x2="55" y2="23" stroke="#fef08a" stroke-width="1.5"/>
        <!-- Cabeza y Orejas -->
        <circle cx="27" cy="40" r="4.5" fill="#fed7aa"/>
        <circle cx="63" cy="40" r="4.5" fill="#fed7aa"/>
        <circle cx="45" cy="40" r="17" fill="url(#skinP)"/>
        <!-- Ojos con brillo expresivo -->
        <circle cx="38" cy="37" r="2.8" fill="#0f172a"/>
        <circle cx="39" cy="36" r="1" fill="#ffffff"/>
        <circle cx="52" cy="37" r="2.8" fill="#0f172a"/>
        <circle cx="53" cy="36" r="1" fill="#ffffff"/>
        <path d="M 35 32 Q 39 30 42 33" stroke="#451a03" stroke-width="1.8" fill="none" stroke-linecap="round"/>
        <path d="M 55 32 Q 51 30 48 33" stroke="#451a03" stroke-width="1.8" fill="none" stroke-linecap="round"/>
        <!-- Nariz y Bigote Colombiano Paisa -->
        <path d="M 43 39 Q 45 42 47 39" stroke="#ea580c" stroke-width="1.5" fill="none" stroke-linecap="round"/>
        <path d="M 33 46 C 36 41, 44 42, 45 45 C 46 42, 54 41, 57 46 C 52 49, 45 47, 45 47 C 45 47, 38 49, 33 46 Z" fill="#381b0d"/>
        <!-- Sonrisa amigable -->
        <path d="M 41 49 Q 45 53 49 49" stroke="#991b1b" stroke-width="2" fill="none" stroke-linecap="round"/>
        <!-- Cuello -->
        <rect x="40" y="54" width="10" height="7" fill="#fed7aa"/>
        <!-- Guayabera Blanca con alforzas y botones -->
        <path d="M 25 58 Q 45 56 65 58 L 68 92 Q 45 95 22 92 Z" fill="url(#guayabera)" stroke="#cbd5e1" stroke-width="1.5"/>
        <path d="M 38 58 L 45 66 L 52 58" stroke="#cbd5e1" stroke-width="1.5" fill="#fed7aa"/>
        <line x1="33" y1="62" x2="33" y2="90" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="2,2"/>
        <line x1="57" y1="62" x2="57" y2="90" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="2,2"/>
        <line x1="45" y1="66" x2="45" y2="92" stroke="#94a3b8" stroke-width="1.5"/>
        <circle cx="45" cy="72" r="1.2" fill="#64748b"/>
        <circle cx="45" cy="80" r="1.2" fill="#64748b"/>
        <!-- Pantalón y Zapatos de Cuero -->
        <rect x="28" y="90" width="14" height="20" rx="4" fill="#1e293b"/>
        <rect x="48" y="90" width="14" height="20" rx="4" fill="#1e293b"/>
        <ellipse cx="35" cy="111" rx="9" ry="5" fill="#78350f"/>
        <ellipse cx="55" cy="111" rx="9" ry="5" fill="#78350f"/>
      </svg>
    `;
  }

  // 2. MAMÁ (Cabello castaño ondulado brillante, aretes de filigrana dorados, blusa coral con encaje)
  if (r === 'mama') {
    return `
      <svg class="person-svg-avatar" width="88" height="118" viewBox="0 0 90 120" ${glow}>
        <defs>
          <linearGradient id="hairM" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#582914"/>
            <stop offset="100%" stop-color="#2d150a"/>
          </linearGradient>
          <linearGradient id="blouseM" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#fb7185"/>
            <stop offset="100%" stop-color="#e11d48"/>
          </linearGradient>
        </defs>
        <!-- Cabello ondulado fondo -->
        <path d="M 20 34 Q 45 8 70 34 Q 78 58 72 74 Q 65 52 62 42 L 28 42 Q 25 52 18 74 Q 12 58 20 34" fill="url(#hairM)"/>
        <!-- Orejas y Aretes Dorados -->
        <circle cx="28" cy="42" r="4" fill="#fed7aa"/>
        <circle cx="62" cy="42" r="4" fill="#fed7aa"/>
        <circle cx="27" cy="47" r="3.5" fill="#f59e0b" stroke="#d97706" stroke-width="1"/>
        <circle cx="63" cy="47" r="3.5" fill="#f59e0b" stroke="#d97706" stroke-width="1"/>
        <!-- Cabeza y Rostro -->
        <circle cx="45" cy="38" r="16.5" fill="#fed7aa"/>
        <!-- Mechones frontales de cabello -->
        <path d="M 28 32 Q 45 20 62 30 Q 55 24 45 25 Q 35 24 28 32 Z" fill="#582914"/>
        <!-- Ojos y Pestañas -->
        <path d="M 34 32 Q 38 29 42 32" stroke="#451a03" stroke-width="1.8" fill="none" stroke-linecap="round"/>
        <path d="M 48 32 Q 52 29 56 32" stroke="#451a03" stroke-width="1.8" fill="none" stroke-linecap="round"/>
        <circle cx="38" cy="36" r="2.8" fill="#0f172a"/>
        <circle cx="39" cy="35" r="1" fill="#ffffff"/>
        <circle cx="52" cy="36" r="2.8" fill="#0f172a"/>
        <circle cx="53" cy="35" r="1" fill="#ffffff"/>
        <!-- Mejillas sonrosadas y labios -->
        <ellipse cx="33" cy="42" rx="3.5" ry="2" fill="#f43f5e" opacity="0.45"/>
        <ellipse cx="57" cy="42" rx="3.5" ry="2" fill="#f43f5e" opacity="0.45"/>
        <path d="M 40 45 Q 45 50 50 45" stroke="#be123c" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <!-- Cuello y Collar de Perlas -->
        <rect x="41" y="52" width="8" height="6" fill="#fed7aa"/>
        <path d="M 39 56 Q 45 61 51 56" stroke="#fef08a" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        <!-- Blusa Coral Elegante -->
        <path d="M 26 58 Q 45 54 64 58 L 67 92 Q 45 94 23 92 Z" fill="url(#blouseM)"/>
        <path d="M 37 57 Q 45 65 53 57" stroke="#ffffff" stroke-width="1.5" fill="#fed7aa"/>
        <!-- Pantalón blanco y zapatillas -->
        <rect x="29" y="90" width="13" height="20" rx="4" fill="#f8fafc"/>
        <rect x="48" y="90" width="13" height="20" rx="4" fill="#f8fafc"/>
        <ellipse cx="35" cy="110" rx="8" ry="4.5" fill="#e11d48"/>
        <ellipse cx="55" cy="110" rx="8" ry="4.5" fill="#e11d48"/>
      </svg>
    `;
  }

  // 3. HIJO (Gorra hacia atrás, camiseta de la Selección Colombia #10, zapatillas deportivas)
  if (r === 'hijo') {
    return `
      <svg class="person-svg-avatar" width="88" height="118" viewBox="0 0 90 120" ${glow}>
        <defs>
          <linearGradient id="jerseyCol" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffd700"/>
            <stop offset="100%" stop-color="#facc15"/>
          </linearGradient>
        </defs>
        <!-- Gorra Roja Deportiva hacia atrás -->
        <ellipse cx="45" cy="24" rx="20" ry="13" fill="#dc2626"/>
        <path d="M 23 27 Q 45 10 67 27 L 76 27 Q 80 32 72 34 L 20 34 Z" fill="#b91c1c"/>
        <circle cx="45" cy="12" r="2.5" fill="#ffffff"/>
        <!-- Rostro y Cabeza infantil -->
        <circle cx="45" cy="40" r="16.5" fill="#fed7aa"/>
        <!-- Ojos grandes y felices -->
        <circle cx="38" cy="38" r="3" fill="#0f172a"/>
        <circle cx="39" cy="37" r="1.2" fill="#ffffff"/>
        <circle cx="52" cy="38" r="3" fill="#0f172a"/>
        <circle cx="53" cy="37" r="1.2" fill="#ffffff"/>
        <path d="M 35 33 Q 39 31 42 34" stroke="#451a03" stroke-width="1.8" fill="none" stroke-linecap="round"/>
        <path d="M 55 33 Q 51 31 48 34" stroke="#451a03" stroke-width="1.8" fill="none" stroke-linecap="round"/>
        <!-- Sonrisa de oreja a oreja -->
        <path d="M 38 46 Q 45 54 52 46 Z" fill="#991b1b"/>
        <path d="M 41 46 Q 45 49 49 46" fill="#ffffff"/>
        <!-- Camiseta Selección Colombia Tricolor -->
        <path d="M 27 58 Q 45 55 63 58 L 66 88 Q 45 90 24 88 Z" fill="url(#jerseyCol)"/>
        <!-- Cuello y franjas azul y roja -->
        <path d="M 39 57 L 45 64 L 51 57 Z" fill="#0038a8"/>
        <line x1="26" y1="70" x2="64" y2="70" stroke="#0038a8" stroke-width="3"/>
        <line x1="26" y1="74" x2="64" y2="74" stroke="#ce1126" stroke-width="3"/>
        <!-- Número 10 -->
        <text x="45" y="86" font-family="'Outfit', sans-serif" font-weight="900" font-size="9" fill="#0038a8" text-anchor="middle">10</text>
        <!-- Bermuda de jean y Zapatillas -->
        <rect x="29" y="86" width="14" height="18" rx="3" fill="#0284c7"/>
        <rect x="47" y="86" width="14" height="18" rx="3" fill="#0284c7"/>
        <ellipse cx="36" cy="108" rx="9" ry="5" fill="#f8fafc" stroke="#dc2626" stroke-width="1.5"/>
        <ellipse cx="54" cy="108" rx="9" ry="5" fill="#f8fafc" stroke="#dc2626" stroke-width="1.5"/>
      </svg>
    `;
  }

  // 4. HIJA (Coletas castañas con lazos, ojos brillantes, vestidito con moño)
  if (r === 'hija') {
    return `
      <svg class="person-svg-avatar" width="88" height="118" viewBox="0 0 90 120" ${glow}>
        <!-- Coletas laterales abombadas -->
        <circle cx="18" cy="28" r="10.5" fill="#653518"/>
        <circle cx="72" cy="28" r="10.5" fill="#653518"/>
        <!-- Moños fucsia vibrantes -->
        <polygon points="18,28 12,23 12,33" fill="#ec4899"/>
        <polygon points="18,28 24,23 24,33" fill="#ec4899"/>
        <circle cx="18" cy="28" r="3.5" fill="#fde047"/>
        <polygon points="72,28 66,23 66,33" fill="#ec4899"/>
        <polygon points="72,28 78,23 78,33" fill="#ec4899"/>
        <circle cx="72" cy="28" r="3.5" fill="#fde047"/>
        <!-- Cabeza y Rostro tierna -->
        <circle cx="45" cy="38" r="16.5" fill="#fed7aa"/>
        <!-- Flequillo -->
        <path d="M 28 32 Q 45 19 62 32 Q 53 26 45 28 Q 37 26 28 32 Z" fill="#653518"/>
        <!-- Ojos dulces y alegres -->
        <circle cx="38" cy="38" r="3" fill="#0f172a"/>
        <circle cx="39" cy="37" r="1.3" fill="#ffffff"/>
        <circle cx="52" cy="38" r="3" fill="#0f172a"/>
        <circle cx="53" cy="37" r="1.3" fill="#ffffff"/>
        <!-- Sonrisita y pecas -->
        <circle cx="34" cy="42" r="0.8" fill="#d97706"/>
        <circle cx="36" cy="43" r="0.8" fill="#d97706"/>
        <circle cx="54" cy="43" r="0.8" fill="#d97706"/>
        <circle cx="56" cy="42" r="0.8" fill="#d97706"/>
        <path d="M 40 45 Q 45 51 50 45" stroke="#be123c" stroke-width="2.2" fill="none" stroke-linecap="round"/>
        <!-- Vestidito con vuelo y ribete tricolor -->
        <path d="M 33 57 L 57 57 L 68 90 L 22 90 Z" fill="#f43f5e"/>
        <circle cx="45" cy="66" r="3" fill="#ffffff"/>
        <circle cx="45" cy="76" r="3" fill="#ffffff"/>
        <line x1="23" y1="88" x2="67" y2="88" stroke="#fde047" stroke-width="2"/>
        <!-- Medias y zapatos estilo muñeca -->
        <rect x="33" y="90" width="7" height="15" fill="#ffffff"/>
        <rect x="50" y="90" width="7" height="15" fill="#ffffff"/>
        <ellipse cx="36" cy="108" rx="7.5" ry="4.5" fill="#ec4899"/>
        <ellipse cx="54" cy="108" rx="7.5" ry="4.5" fill="#ec4899"/>
      </svg>
    `;
  }

  // 5. TÍO (Barba moderna recortada, gafas de moda, chaqueta de mezclilla y playera blanca)
  if (r === 'tio') {
    return `
      <svg class="person-svg-avatar" width="88" height="118" viewBox="0 0 90 120" ${glow}>
        <!-- Cabello peinado con estilo -->
        <path d="M 27 28 Q 45 10 63 24 Q 66 32 63 36 L 27 36 Z" fill="#1e293b"/>
        <!-- Cabeza y Orejas -->
        <circle cx="28" cy="40" r="4.5" fill="#fed7aa"/>
        <circle cx="62" cy="40" r="4.5" fill="#fed7aa"/>
        <circle cx="45" cy="40" r="17" fill="#fed7aa"/>
        <!-- Gafas modernas cuadradas -->
        <rect x="31" y="34" width="12" height="9" rx="3" fill="none" stroke="#0f172a" stroke-width="2.2"/>
        <rect x="47" y="34" width="12" height="9" rx="3" fill="none" stroke="#0f172a" stroke-width="2.2"/>
        <line x1="43" y1="38" x2="47" y2="38" stroke="#0f172a" stroke-width="2"/>
        <circle cx="37" cy="38" r="2.2" fill="#0f172a"/>
        <circle cx="53" cy="38" r="2.2" fill="#0f172a"/>
        <!-- Barba moderna recortada -->
        <path d="M 33 44 C 33 55, 57 55, 57 44 C 55 52, 35 52, 33 44 Z" fill="#334155"/>
        <path d="M 40 47 Q 45 52 50 47" stroke="#ffffff" stroke-width="2" fill="none" stroke-linecap="round"/>
        <!-- Chaqueta Denim con Playera Blanca -->
        <path d="M 24 58 Q 45 55 66 58 L 68 92 Q 45 94 22 92 Z" fill="#0284c7"/>
        <path d="M 38 58 L 45 74 L 52 58 Z" fill="#ffffff"/>
        <!-- Pantalón Beige y Botines -->
        <rect x="28" y="90" width="14" height="20" rx="4" fill="#d97706"/>
        <rect x="48" y="90" width="14" height="20" rx="4" fill="#d97706"/>
        <ellipse cx="35" cy="111" rx="8.5" ry="4.5" fill="#451a03"/>
        <ellipse cx="55" cy="111" rx="8.5" ry="4.5" fill="#451a03"/>
      </svg>
    `;
  }

  // 6. TÍA (Corte elegante, gafas chic, blusa violeta y pañoleta de seda)
  if (r === 'tia') {
    return `
      <svg class="person-svg-avatar" width="88" height="118" viewBox="0 0 90 120" ${glow}>
        <!-- Cabello lacio elegante con corte bob -->
        <path d="M 23 32 Q 45 12 67 32 Q 72 52 65 60 L 59 40 L 31 40 L 25 60 Q 18 52 23 32" fill="#78350f"/>
        <!-- Cabeza y Aretes -->
        <circle cx="45" cy="38" r="16" fill="#fed7aa"/>
        <circle cx="28" cy="44" r="3" fill="#a855f7"/>
        <circle cx="62" cy="44" r="3" fill="#a855f7"/>
        <!-- Gafas chic estilo cat-eye -->
        <path d="M 30 35 Q 37 31 42 36 L 41 41 Q 35 43 31 38 Z" fill="none" stroke="#9333ea" stroke-width="2"/>
        <path d="M 60 35 Q 53 31 48 36 L 49 41 Q 55 43 59 38 Z" fill="none" stroke="#9333ea" stroke-width="2"/>
        <line x1="42" y1="36" x2="48" y2="36" stroke="#9333ea" stroke-width="1.8"/>
        <circle cx="36" cy="37" r="2" fill="#0f172a"/>
        <circle cx="54" cy="37" r="2" fill="#0f172a"/>
        <!-- Sonrisa y labios rojos -->
        <path d="M 40 46 Q 45 50 50 46" stroke="#e11d48" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <!-- Pañoleta de seda esmeralda y blusa púrpura -->
        <path d="M 38 54 Q 45 62 52 54 L 48 64 L 42 64 Z" fill="#10b981"/>
        <path d="M 26 58 Q 45 55 64 58 L 67 92 Q 45 94 23 92 Z" fill="#7e22ce"/>
        <!-- Pantalón negro y tacones -->
        <rect x="29" y="90" width="13" height="20" rx="4" fill="#0f172a"/>
        <rect x="48" y="90" width="13" height="20" rx="4" fill="#0f172a"/>
        <ellipse cx="35" cy="110" rx="7.5" ry="4" fill="#a855f7"/>
        <ellipse cx="55" cy="110" rx="7.5" ry="4.5" fill="#a855f7"/>
      </svg>
    `;
  }

  // 7. ABUELO (Cabello canoso peinado, gafas redondas de lectura, chaleco marrón sobre camisa y corbata)
  if (r === 'abuelo') {
    return `
      <svg class="person-svg-avatar" width="88" height="118" viewBox="0 0 90 120" ${glow}>
        <!-- Cabello y sienes plateadas -->
        <path d="M 25 32 Q 45 14 65 32 Q 68 44 64 48 L 26 48 Q 22 44 25 32" fill="#cbd5e1"/>
        <!-- Cabeza y arruguitas de cariño -->
        <circle cx="45" cy="40" r="16.5" fill="#fed7aa"/>
        <!-- Gafas redondas de lectura -->
        <circle cx="36" cy="37" r="6" fill="none" stroke="#b45309" stroke-width="2"/>
        <circle cx="54" cy="37" r="6" fill="none" stroke="#b45309" stroke-width="2"/>
        <line x1="42" y1="37" x2="48" y2="37" stroke="#b45309" stroke-width="2"/>
        <circle cx="36" cy="37" r="2.2" fill="#0f172a"/>
        <circle cx="54" cy="37" r="2.2" fill="#0f172a"/>
        <!-- Bigote blanco y sonrisa sabia -->
        <path d="M 36 45 Q 45 42 54 45 Q 45 50 36 45" fill="#e2e8f0"/>
        <path d="M 40 49 Q 45 53 50 49" stroke="#991b1b" stroke-width="2" fill="none" stroke-linecap="round"/>
        <!-- Camisa con Corbata y Cárdigan de Lana -->
        <path d="M 25 58 Q 45 55 65 58 L 68 92 Q 45 94 22 92 Z" fill="#78350f"/>
        <path d="M 38 58 L 45 74 L 52 58 Z" fill="#f8fafc"/>
        <polygon points="45,61 47,72 45,76 43,72" fill="#b91c1c"/>
        <!-- Botones del Cárdigan -->
        <circle cx="45" cy="80" r="1.5" fill="#fde047"/>
        <circle cx="45" cy="86" r="1.5" fill="#fde047"/>
        <!-- Pantalón clásico y mocasines -->
        <rect x="28" y="90" width="14" height="20" rx="4" fill="#334155"/>
        <rect x="48" y="90" width="14" height="20" rx="4" fill="#334155"/>
        <ellipse cx="35" cy="111" rx="9" ry="5" fill="#1e293b"/>
        <ellipse cx="55" cy="111" rx="9" ry="5" fill="#1e293b"/>
      </svg>
    `;
  }

  // 8. ABUELA (Moño canoso con broche, gafas doradas con cadenita, suéter lavanda y collar de perlas)
  if (r === 'abuela') {
    return `
      <svg class="person-svg-avatar" width="88" height="118" viewBox="0 0 90 120" ${glow}>
        <!-- Moño plateado alto con broche -->
        <circle cx="45" cy="16" r="10" fill="#e2e8f0"/>
        <circle cx="45" cy="16" r="3" fill="#f59e0b"/>
        <!-- Cabello ondulado plateado -->
        <path d="M 23 34 Q 45 18 67 34 Q 72 48 65 54 L 25 54 Q 18 48 23 34" fill="#e2e8f0"/>
        <!-- Cabeza y Rostro dulce -->
        <circle cx="45" cy="40" r="16.5" fill="#fed7aa"/>
        <!-- Gafas ovaladas doradas con cadenita -->
        <ellipse cx="36" cy="38" rx="5.5" ry="4.5" fill="none" stroke="#f59e0b" stroke-width="1.8"/>
        <ellipse cx="54" cy="38" rx="5.5" ry="4.5" fill="none" stroke="#f59e0b" stroke-width="1.8"/>
        <line x1="41.5" y1="38" x2="48.5" y2="38" stroke="#f59e0b" stroke-width="1.5"/>
        <path d="M 30.5" y1="38" x2="28" y2="48" stroke="#f59e0b" stroke-width="1" stroke-dasharray="1,1"/>
        <circle cx="36" cy="38" r="2.2" fill="#0f172a"/>
        <circle cx="54" cy="38" r="2.2" fill="#0f172a"/>
        <!-- Sonrisa cariñosa de abuela -->
        <path d="M 40 47 Q 45 52 50 47" stroke="#e11d48" stroke-width="2.2" fill="none" stroke-linecap="round"/>
        <!-- Collar de Perlas -->
        <path d="M 38 56 Q 45 62 52 56" stroke="#f8fafc" stroke-width="2.8" stroke-linecap="round" fill="none"/>
        <!-- Suéter Lavanda Acogedor -->
        <path d="M 25 58 Q 45 55 65 58 L 68 92 Q 45 94 22 92 Z" fill="#c084fc"/>
        <path d="M 38 58 L 45 68 L 52 58" stroke="#a855f7" stroke-width="1.5" fill="#fed7aa"/>
        <!-- Falda larga y zapatitos cómodos -->
        <path d="M 27 90 L 63 90 L 67 106 L 23 106 Z" fill="#475569"/>
        <ellipse cx="36" cy="110" rx="8" ry="4.5" fill="#1e293b"/>
        <ellipse cx="54" cy="110" rx="8" ry="4.5" fill="#1e293b"/>
      </svg>
    `;
  }

  // Fallback genérico
  return `
    <svg class="person-svg-avatar" width="88" height="118" viewBox="0 0 90 120" ${glow}>
      <circle cx="45" cy="38" r="18" fill="#fed7aa"/>
      <rect x="25" y="58" width="40" height="34" rx="8" fill="#f59e0b"/>
      <rect x="29" y="92" width="13" height="18" rx="4" fill="#1e293b"/>
      <rect x="48" y="92" width="13" height="18" rx="4" fill="#1e293b"/>
    </svg>
  `;
};
