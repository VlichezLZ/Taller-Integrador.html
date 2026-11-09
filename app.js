/**
 * EcoAcción - Lógica interactiva con Imágenes y Alta Visibilidad
 * Proyecto: Taller Integrado - Zuleyka (+ChicasTec)
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================
  // 1. GUÍA Y BUSCADOR DE RESIDUOS (CON IMÁGENES REALES)
  // ==========================================================
  const wasteData = [
    {
      name: "Botellas plásticas (PET)",
      category: "plastico",
      bin: "Amarillo / Envases y Plásticos",
      binClass: "bin-plastico",
      emoji: "🍶",
      image: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=500&q=80",
      desc: "Envases de agua, refrescos y yogures. Tardan hasta 500 años en degradarse en la naturaleza.",
      tip: "Enjuágalas con poca agua, sécalas y aplástalas con su tapa puesta para que no ocupen espacio."
    },
    {
      name: "Cajas de cartón y papeles",
      category: "papel",
      bin: "Azul / Papel y Cartón",
      binClass: "bin-papel",
      emoji: "📦",
      image: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=500&q=80",
      desc: "Cajas de embalaje, cuadernos, revistas y folletos secos y limpios.",
      tip: "Desarma las cajas para aplanarlas. Si tienen restos de comida o grasa de pizza, no se pueden reciclar."
    },
    {
      name: "Botellas y frascos de vidrio",
      category: "vidrio",
      bin: "Verde / Vidrio Puro",
      binClass: "bin-vidrio",
      emoji: "🍾",
      image: "https://images.unsplash.com/photo-1516715094483-75da7dee9758?auto=format&fit=crop&w=500&q=80",
      desc: "Frascos de mermelada, conservas y botellas. El vidrio es 100% reciclable sin perder calidad.",
      tip: "Retira las tapas de metal o corcho. Nunca mezcles espejos, focos o vajilla rota en este contenedor."
    },
    {
      name: "Cáscaras de frutas y verduras",
      category: "organico",
      bin: "Marrón / Materia Orgánica",
      binClass: "bin-organico",
      emoji: "🍎",
      image: "https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?auto=format&fit=crop&w=500&q=80",
      desc: "Restos crudos de vegetales, cáscaras de plátano, manzana, café pasado y hojas secas.",
      tip: "Son perfectos para abono natural (compost) para nutrir plantas sin usar químicos contaminantes."
    },
    {
      name: "Pilas y baterías gastadas",
      category: "peligroso",
      bin: "Rojo / Punto Limpio Especial",
      binClass: "bin-peligroso",
      emoji: "🔋",
      image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=500&q=80",
      desc: "Contienen metales altamente tóxicos como mercurio y cadmio que envenenan las aguas subterráneas.",
      tip: "Nunca las tires a la basura del tacho. Almacénalas dentro de una botella de plástico cerrada hasta llevarlas a un punto limpio."
    },
    {
      name: "Aceite de cocina usado",
      category: "peligroso",
      bin: "Rojo / Residuos Especiales",
      binClass: "bin-peligroso",
      emoji: "🛢️",
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=500&q=80",
      desc: "1 solo litro arrojado al lavadero contamina hasta 1,000 litros de agua y malogra los desagües.",
      tip: "Espera a que se enfríe por completo, fíltralo con un colador y guárdalo en una botella plástica con tapa."
    },
    {
      name: "Latas de conservas y aluminio",
      category: "plastico",
      bin: "Amarillo / Metales y Latas",
      binClass: "bin-plastico",
      emoji: "🥫",
      image: "https://images.unsplash.com/photo-1584473457406-6240486418e9?auto=format&fit=crop&w=500&q=80",
      desc: "Latas de atún, leche, refrescos y desodorantes en aerosol totalmente vacíos.",
      tip: "Lávalas rápidamente para que no atraigan hormigas o moscas en el centro de acopio."
    },
    {
      name: "Medicamentos vencidos",
      category: "peligroso",
      bin: "Rojo / Contenedor Farmacias",
      binClass: "bin-peligroso",
      emoji: "💊",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500&q=80",
      desc: "Pastillas, jarabes o ampollas vencidas. Si se tiran a la basura o inodoro, contaminan el agua y la fauna.",
      tip: "Llévalos a los puntos de recolección de medicamentos en boticas, farmacias o centros de salud."
    }
  ];

  const wasteGrid = document.getElementById('waste-grid');
  const wasteSearch = document.getElementById('waste-search');
  const filterPills = document.querySelectorAll('.pill');

  let currentCategory = 'todos';
  let currentSearchQuery = '';

  function renderWasteItems() {
    wasteGrid.innerHTML = '';

    const filtered = wasteData.filter(item => {
      const matchesCategory = currentCategory === 'todos' || item.category === currentCategory;
      const matchesQuery = item.name.toLowerCase().includes(currentSearchQuery) || 
                           item.desc.toLowerCase().includes(currentSearchQuery) ||
                           item.category.toLowerCase().includes(currentSearchQuery);
      return matchesCategory && matchesQuery;
    });

    if (filtered.length === 0) {
      wasteGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 50px 20px; background: #ffffff; border-radius: 16px; border: 2px dashed #cbd5e1;">
          <span style="font-size: 3rem; display: block; margin-bottom: 12px;">🔎</span>
          <h4 style="font-size: 1.3rem; color: var(--text-title); margin-bottom: 6px;">No se encontró "${currentSearchQuery}"</h4>
          <p style="color: var(--text-muted); font-size: 1.05rem;">Prueba buscando otra palabra como <strong>"botella"</strong>, <strong>"aceite"</strong>, <strong>"vidrio"</strong> o <strong>"pilas"</strong>.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(item => {
      const card = document.createElement('article');
      card.className = 'waste-card';
      card.innerHTML = `
        <div class="waste-img-box">
          <img src="${item.image}" alt="${item.name}" class="waste-card-img" loading="lazy">
          <span class="waste-bin-tag ${item.binClass}">${item.bin}</span>
        </div>
        <div class="waste-body">
          <div class="waste-header">
            <div class="waste-emoji">${item.emoji}</div>
            <div class="waste-title-box">
              <h4>${item.name}</h4>
            </div>
          </div>
          <p>${item.desc}</p>
          <div class="waste-tip">
            💡 <strong>Consejo ecológico:</strong> ${item.tip}
          </div>
        </div>
      `;
      wasteGrid.appendChild(card);
    });
  }

  // Filtros por categorías
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategory = pill.getAttribute('data-filter');
      renderWasteItems();
    });
  });

  // Búsqueda en vivo
  wasteSearch.addEventListener('input', (e) => {
    currentSearchQuery = e.target.value.trim().toLowerCase();
    renderWasteItems();
  });

  renderWasteItems();


  // ==========================================================
  // 2. TEST / CALCULADORA VERDE (ALTA LEGIBILIDAD)
  // ==========================================================
  const quizData = [
    {
      question: "¿Qué haces con las bolsas plásticas cuando compras en el mercado o bodega?",
      options: [
        { text: "Pido bolsas nuevas para cada compra", points: 0 },
        { text: "A veces llevo una bolsa reutilizable cuando me acuerdo", points: 2 },
        { text: "Llevo siempre mi bolsa de tela, mochila o canasta", points: 4 }
      ]
    },
    {
      question: "¿Cómo manejas los residuos reciclables (botellas, cartón, latas) en casa?",
      options: [
        { text: "Va todo revuelto en una sola bolsa de basura", points: 0 },
        { text: "A veces separo botellas de plástico si alguien las pide", points: 2 },
        { text: "Separo siempre plásticos, papeles y vidrios limpios y secos", points: 4 }
      ]
    },
    {
      question: "¿Cómo te trasladas en tu barrio cuando el destino queda a menos de 10 cuadras?",
      options: [
        { text: "Siempre en mototaxi, taxi o auto", points: 0 },
        { text: "En transporte público", points: 2 },
        { text: "Caminando o en bicicleta (cero humo y saludable)", points: 4 }
      ]
    },
    {
      question: "¿Qué hacen en tu casa con el aceite que sobra después de freír?",
      options: [
        { text: "Lo tiramos por el lavadero o la alcantarilla", points: 0 },
        { text: "Lo tiramos caliente en la bolsa de basura común", points: 1 },
        { text: "Se deja enfriar y se guarda en una botella para reciclar", points: 4 }
      ]
    },
    {
      question: "¿Cómo cuidan el agua en tu hogar durante las actividades diarias?",
      options: [
        { text: "Dejo correr el agua mientras me baño o me cepillo los dientes", points: 0 },
        { text: "A veces cierro la llave, pero me demoro más de 10 minutos duchándome", points: 2 },
        { text: "Duchas cortas de 5 minutos y caño siempre cerrado mientras me enjabono", points: 4 }
      ]
    }
  ];

  let currentQuestionIndex = 0;
  let totalScore = 0;

  const quizQuestionText = document.getElementById('quiz-question-text');
  const quizOptions = document.getElementById('quiz-options');
  const quizProgressFill = document.getElementById('quiz-progress-fill');
  const quizQuestionNumber = document.getElementById('quiz-question-number');
  const quizBody = document.getElementById('quiz-body');
  const quizResult = document.getElementById('quiz-result');
  const resultIcon = document.getElementById('result-icon');
  const resultTitle = document.getElementById('result-title');
  const resultScore = document.getElementById('result-score');
  const resultFeedback = document.getElementById('result-feedback');
  const resultTipsList = document.getElementById('result-tips-list');
  const btnRestartQuiz = document.getElementById('btn-restart-quiz');

  function loadQuizQuestion() {
    const q = quizData[currentQuestionIndex];
    quizQuestionNumber.textContent = `Pregunta ${currentQuestionIndex + 1} de ${quizData.length}`;
    quizQuestionText.textContent = q.question;
    
    const progressPercent = ((currentQuestionIndex + 1) / quizData.length) * 100;
    quizProgressFill.style.width = `${progressPercent}%`;

    quizOptions.innerHTML = '';
    q.options.forEach((opt, index) => {
      const button = document.createElement('button');
      button.className = 'quiz-option-btn';
      button.innerHTML = `<strong>${String.fromCharCode(65 + index)}.</strong> <span>${opt.text}</span>`;
      button.addEventListener('click', () => handleQuizAnswer(opt.points));
      quizOptions.appendChild(button);
    });
  }

  function handleQuizAnswer(points) {
    totalScore += points;
    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
      loadQuizQuestion();
    } else {
      showQuizResults();
    }
  }

  function showQuizResults() {
    quizBody.classList.add('hidden');
    quizResult.classList.remove('hidden');

    let level = "";
    let icon = "";
    let feedback = "";
    let tips = [];

    if (totalScore <= 7) {
      icon = "🌱";
      level = "Nivel Semilla (¡Mucho potencial por cuidar!)";
      feedback = "Actualmente tus hábitos cotidianos generan contaminación acumulada en el barrio, pero implementar pequeños cambios hoy hará una diferencia enorme.";
      tips = [
        "Ten a mano una bolsa de tela doblada en tu cartera o mochila para las compras.",
        "Recuerda que 1 litro de aceite usado contamina 1,000 litros de agua: ¡guárdalo en botellas!",
        "Separa botellas plásticas limpias y entrégaselas a recicladores autorizados de tu zona."
      ];
    } else if (totalScore <= 15) {
      icon = "🌿";
      level = "Nivel Brote Verde (¡Muy buen camino!)";
      feedback = "Tienes conciencia ecológica activa y practicas buenas acciones. Si sumas un par de hábitos adicionales serás una líder ambiental en tu barrio.";
      tips = [
        "Cronometra tus duchas para que no pasen de 5 minutos y ahorres cientos de litros.",
        "Elige caminar o ir en bicicleta a lugares cercanos para evitar el humo del tráfico.",
        "Motiva a tu familia a guardar el aceite usado y llevarlo a un punto limpio."
      ];
    } else {
      icon = "🌳";
      level = "Nivel Guardián del Planeta (¡Ejemplar!)";
      feedback = "¡Felicitaciones! Tus hábitos protegen directamente el aire, el agua y el suelo. Eres un verdadero ejemplo para tu familia y comunidad.";
      tips = [
        "Comparte tus consejos en el Muro de Compromisos para inspirar a otros vecinos.",
        "Inicia una pequeña compostera casera con cáscaras de fruta para abonar plantas.",
        "Organiza o apoya una jornada vecinal de limpieza y reciclaje en tu cuadra."
      ];
    }

    resultIcon.textContent = icon;
    resultTitle.textContent = level;
    resultScore.textContent = `Puntaje obtenido: ${totalScore} de 20 puntos posibles`;
    resultFeedback.textContent = feedback;

    resultTipsList.innerHTML = '';
    tips.forEach(tip => {
      const li = document.createElement('li');
      li.textContent = tip;
      resultTipsList.appendChild(li);
    });
  }

  btnRestartQuiz.addEventListener('click', () => {
    currentQuestionIndex = 0;
    totalScore = 0;
    quizResult.classList.add('hidden');
    quizBody.classList.remove('hidden');
    loadQuizQuestion();
  });

  loadQuizQuestion();


  // ==========================================================
  // 3. RETOS VERDES SEMANALES
  // ==========================================================
  const challenges = [
    { id: 1, title: "Llevar bolsa de tela al mercado o tienda", desc: "Evita de 3 a 5 bolsas plásticas de un solo uso en una sola compra." },
    { id: 2, title: "Día completo sin botellas desechables", desc: "Lleva tu tomatodo o tomatodo recargable a todas partes." },
    { id: 3, title: "Desconectar cargadores y apagar focos vacíos", desc: "Frena el consumo fantasma de energía y reduce las emisiones de carbono." },
    { id: 4, title: "Ducha veloz de 5 minutos cerrando la llave", desc: "Ahorra más de 40 litros de agua limpia cada día." },
    { id: 5, title: "Aplastar y guardar 5 botellas plásticas limpias", desc: "Almacénalas sin residuos de líquido para reciclarlas con tus vecinos." },
    { id: 6, title: "Caminar o usar bicicleta para un recado", desc: "Cero humo, cero smog y más salud para tus pulmones." }
  ];

  const challengesList = document.getElementById('challenges-list');
  const challengesProgressFill = document.getElementById('challenges-progress-fill');
  const challengePercentage = document.getElementById('challenge-percentage');
  const challengeStatusText = document.getElementById('challenge-status-text');

  let completedChallenges = JSON.parse(localStorage.getItem('eco_challenges_completed')) || [];

  function renderChallenges() {
    challengesList.innerHTML = '';

    challenges.forEach(ch => {
      const isCompleted = completedChallenges.includes(ch.id);
      const item = document.createElement('div');
      item.className = `challenge-item ${isCompleted ? 'completed' : ''}`;
      item.innerHTML = `
        <div class="challenge-checkbox">${isCompleted ? '✓' : ''}</div>
        <div class="challenge-text">
          <div class="challenge-title">${ch.title}</div>
          <div class="challenge-desc">${ch.desc}</div>
        </div>
      `;

      item.addEventListener('click', () => toggleChallenge(ch.id));
      challengesList.appendChild(item);
    });

    updateChallengeProgress();
  }

  function toggleChallenge(id) {
    if (completedChallenges.includes(id)) {
      completedChallenges = completedChallenges.filter(chId => chId !== id);
    } else {
      completedChallenges.push(id);
    }
    localStorage.setItem('eco_challenges_completed', JSON.stringify(completedChallenges));
    renderChallenges();
  }

  function updateChallengeProgress() {
    const total = challenges.length;
    const count = completedChallenges.length;
    const percent = Math.round((count / total) * 100);

    challengesProgressFill.style.width = `${percent}%`;
    challengePercentage.textContent = `${percent}% (${count} de ${total})`;

    if (count === 0) {
      challengeStatusText.textContent = "Haz clic en el reto que hayas cumplido hoy para empezar.";
    } else if (count < total) {
      challengeStatusText.textContent = `¡Muy bien! Llevas ${count} retos completados. ¡Sigue así!`;
    } else {
      challengeStatusText.textContent = "🎉 ¡Extraordinario! Completaste todos los retos ecológicos de la semana.";
    }
  }

  renderChallenges();


  // ==========================================================
  // 4. MURO COMUNITARIO DE COMPROMISOS
  // ==========================================================
  const formCommitment = document.getElementById('form-commitment');
  const commName = document.getElementById('comm-name');
  const commDistrict = document.getElementById('comm-district');
  const commAction = document.getElementById('comm-action');
  const commitmentsContainer = document.getElementById('commitments-container');
  const totalCommitmentsSpan = document.getElementById('total-commitments');

  const defaultCommitments = [
    {
      name: "Zuleyka",
      district: "ChicasTec",
      action: "Me comprometo a enseñar en mi casa a separar plásticos y papeles limpios, y jamás verter aceite de freír al lavadero.",
      date: "Hoy"
    },
    {
      name: "Camila V.",
      district: "Barrio Esperanza",
      action: "Llevaré siempre mi tomatodo reutilizable a clases y ya no compraré botellas plásticas de agua de un solo uso.",
      date: "Ayer"
    },
    {
      name: "Prof. Andrea",
      district: "Taller Comunitario",
      action: "Organizaremos un punto de recolección de pilas usadas en el aula para evitar que terminen en la basura común.",
      date: "Hace 2 días"
    }
  ];

  let storedCommitments = JSON.parse(localStorage.getItem('eco_commitments')) || defaultCommitments;

  function renderCommitments() {
    commitmentsContainer.innerHTML = '';
    totalCommitmentsSpan.textContent = storedCommitments.length;

    storedCommitments.forEach(item => {
      const card = document.createElement('div');
      card.className = 'commitment-card';
      card.innerHTML = `
        <div class="comm-top">
          <span class="comm-author">🌱 ${item.name}</span>
          <span class="comm-district">${item.district} • ${item.date}</span>
        </div>
        <p class="comm-text">"${item.action}"</p>
      `;
      commitmentsContainer.appendChild(card);
    });
  }

  formCommitment.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameVal = commName.value.trim();
    const distVal = commDistrict.value.trim();
    const actionVal = commAction.value.trim();

    if (!nameVal || !actionVal) return;

    const newCommitment = {
      name: nameVal,
      district: distVal || "Mi Comunidad",
      action: actionVal,
      date: "Justo ahora"
    };

    storedCommitments.unshift(newCommitment);
    localStorage.setItem('eco_commitments', JSON.stringify(storedCommitments));

    renderCommitments();
    formCommitment.reset();

    alert("¡Muchas gracias! Tu compromiso ambiental ha sido publicado con éxito en el muro.");
  });

  renderCommitments();

});
