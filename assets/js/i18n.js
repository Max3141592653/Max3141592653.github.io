export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'ca', label: 'Català' },
  { code: 'es', label: 'Español' }
];

export const translations = {
  en: {
    appTitle: 'Periodic Table Master',
    subtitle: 'Explore the elements, test your knowledge, and learn the periodic table.',
    tabs: { table: 'Periodic table', quiz: 'Quiz', about: 'About' },
    scoreboard: { title: 'Scoreboard', hits: 'Correct', errors: 'Errors', time: 'Time', best: 'Best' },
    controls: {
      version: 'Mode',
      versionSimple: 'Simple (56)',
      versionFull: 'Full (118)',
      revealColors: 'Reveal colours',
      reset: 'Reset progress',
      viewMistakes: 'View mistakes',
      expandTable: 'Enlarge table',
      closeTable: 'Close table',
      showOptions: 'Options',
      hideOptions: 'Hide options'
    },
    table: { lanthanides: 'Lanthanides (57–71)', actinides: 'Actinides (89–103)' , legend: 'Legend' },
    categories: { metal: 'Metal', 'semi-metal': 'Metalloid', nonmetal: 'Non-metal', 'noble-gas': 'Noble gas' },
    versionLabels: { simple: 'SIMPLE', full: 'FULL' },
    quiz: {
      title: 'Knowledge quiz',
      mode: 'Mode',
      modes: { symbol: 'Symbol → Name', name: 'Name → Symbol', number: 'Number → Name' },
      question: 'Question',
      answerPlaceholder: 'Your answer…',
      check: 'Check',
      next: 'Next',
      score: 'Score',
      streak: 'Streak',
      correct: 'Correct!',
      wrong: 'Wrong. Correct answer: {answer}',
      empty: 'Type an answer first.',
      finished: 'Quiz session complete. Score: {score}',
      statsTitle: 'Statistics',
      statsBody: 'Your quiz score and streak are tracked above.'
    },
    modal: {
      close: 'Close',
      symbol: 'Symbol',
      name: 'Name',
      atomicNumber: 'Atomic number',
      category: 'Category',
      cpkColor: 'CPK colour',
      guessTitle: 'Guess element {number}',
      yourAnswer: 'Your answer (symbol or name)',
      submit: 'Submit',
      cancel: 'Cancel',
      correctFeedback: 'Correct! {symbol} — {name}',
      wrongFeedback: 'Incorrect. Try again.'
    },
    completion: {
      title: 'Table complete!',
      message: 'You filled the {version} table in {time}. Correct: {hits}, errors: {errors}.',
      close: 'Continue'
    },
    about: {
      title: 'About',
      description: 'Periodic Table Master is an interactive, accessible learning tool for the periodic table. All data is stored locally in your browser; we do not collect personal information.',
      links: 'Links',
      license: 'Released under the MIT License.',
      privacy: 'Privacy policy',
      terms: 'Terms of use'
    },
    aria: {
      table: 'Periodic table grid',
      openDetails: 'Open details for {symbol}',
      answerDialog: 'Answer dialog',
      detailsDialog: 'Element details'
    },
    errors: { noElements: 'Element data could not be loaded.' }
  },
  ca: {
    appTitle: 'Mestre de la taula periòdica',
    subtitle: 'Explora els elements, posa a prova els teus coneixements i aprèn la taula periòdica.',
    tabs: { table: 'Taula periòdica', quiz: 'Qüestionari', about: 'Quant a' },
    scoreboard: { title: 'Puntuació', hits: 'Encerts', errors: 'Errors', time: 'Temps', best: 'Rècord' },
    controls: {
      version: 'Mode',
      versionSimple: "Simple (56)",
      versionFull: 'Complet (118)',
      revealColors: 'Mostrar colors',
      reset: 'Reiniciar progrés',
      viewMistakes: 'Veure errors',
      expandTable: 'Ampliar taula',
      closeTable: 'Tancar taula',
      showOptions: 'Opcions',
      hideOptions: 'Amagar opcions'
    },
    table: { lanthanides: 'Lantànids (57–71)', actinides: 'Actínids (89–103)', legend: 'Llegenda' },
    categories: { metal: 'Metall', 'semi-metal': 'Semimetall', nonmetal: 'No metall', 'noble-gas': 'Gas noble' },
    versionLabels: { simple: 'SIMPLE', full: 'COMPLET' },
    quiz: {
      title: 'Qüestionari de coneixements',
      mode: 'Mode',
      modes: { symbol: 'Símbol → Nom', name: 'Nom → Símbol', number: 'Número → Nom' },
      question: 'Pregunta',
      answerPlaceholder: 'La teva resposta…',
      check: 'Comprovar',
      next: 'Següent',
      score: 'Puntuació',
      streak: 'Ratxa',
      correct: 'Correcte!',
      wrong: 'Incorrecte. Resposta correcta: {answer}',
      empty: "Escriu una resposta primer.",
      finished: 'Sessió de qüestionari acabada. Puntuació: {score}',
      statsTitle: 'Estadístiques',
      statsBody: 'La puntuació i la ratxa del qüestionari es mostren a dalt.'
    },
    modal: {
      close: 'Tancar',
      symbol: 'Símbol',
      name: 'Nom',
      atomicNumber: 'Número atòmic',
      category: 'Categoria',
      cpkColor: 'Color CPK',
      guessTitle: 'Endevina l’element {number}',
      yourAnswer: 'La teva resposta (símbol o nom)',
      submit: 'Enviar',
      cancel: 'Cancel·lar',
      correctFeedback: 'Correcte! {symbol} — {name}',
      wrongFeedback: 'Incorrecte. Torna-ho a provar.'
    },
    completion: {
      title: 'Taula completa!',
      message: 'Has omplert la taula {version} en {time}. Encerts: {hits}, errors: {errors}.',
      close: 'Continuar'
    },
    about: {
      title: 'Quant a',
      description: 'Mestre de la taula periòdica és una eina interactiva i accessible per aprendre la taula periòdica. Totes les dades es guarden localment al navegador; no recollim informació personal.',
      links: 'Enllaços',
      license: 'Publicat sota la llicència MIT.',
      privacy: 'Política de privadesa',
      terms: "Condicions d'ús"
    },
    aria: {
      table: 'Graella de la taula periòdica',
      openDetails: 'Obrir detalls de {symbol}',
      answerDialog: 'Diàleg de resposta',
      detailsDialog: "Diàleg de detalls de l'element"
    },
    errors: { noElements: 'No s’han pogut carregar les dades dels elements.' }
  },
  es: {
    appTitle: 'Maestro de la tabla periódica',
    subtitle: 'Explora los elementos, pon a prueba tus conocimientos y aprende la tabla periódica.',
    tabs: { table: 'Tabla periódica', quiz: 'Cuestionario', about: 'Acerca de' },
    scoreboard: { title: 'Puntuación', hits: 'Aciertos', errors: 'Errores', time: 'Tiempo', best: 'Récord' },
    controls: {
      version: 'Modo',
      versionSimple: 'Simple (56)',
      versionFull: 'Completa (118)',
      revealColors: 'Mostrar colores',
      reset: 'Reiniciar progreso',
      viewMistakes: 'Ver errores',
      expandTable: 'Ampliar tabla',
      closeTable: 'Cerrar tabla',
      showOptions: 'Opciones',
      hideOptions: 'Ocultar opciones'
    },
    table: { lanthanides: 'Lantánidos (57–71)', actinides: 'Actínidos (89–103)', legend: 'Leyenda' },
    categories: { metal: 'Metal', 'semi-metal': 'Semimetal', nonmetal: 'No metal', 'noble-gas': 'Gas noble' },
    versionLabels: { simple: 'SIMPLE', full: 'COMPLETA' },
    quiz: {
      title: 'Cuestionario de conocimientos',
      mode: 'Modo',
      modes: { symbol: 'Símbolo → Nombre', name: 'Nombre → Símbolo', number: 'Número → Nombre' },
      question: 'Pregunta',
      answerPlaceholder: 'Tu respuesta…',
      check: 'Comprobar',
      next: 'Siguiente',
      score: 'Puntuación',
      streak: 'Racha',
      correct: '¡Correcto!',
      wrong: 'Incorrecto. Respuesta correcta: {answer}',
      empty: 'Escribe una respuesta primero.',
      finished: 'Sesión de cuestionario terminada. Puntuación: {score}',
      statsTitle: 'Estadísticas',
      statsBody: 'Tu puntuación y racha del cuestionario se muestran arriba.'
    },
    modal: {
      close: 'Cerrar',
      symbol: 'Símbolo',
      name: 'Nombre',
      atomicNumber: 'Número atómico',
      category: 'Categoría',
      cpkColor: 'Color CPK',
      guessTitle: 'Adivina el elemento {number}',
      yourAnswer: 'Tu respuesta (símbolo o nombre)',
      submit: 'Enviar',
      cancel: 'Cancelar',
      correctFeedback: '¡Correcto! {symbol} — {name}',
      wrongFeedback: 'Incorrecto. Inténtalo de nuevo.'
    },
    completion: {
      title: '¡Tabla completa!',
      message: 'Has completado la tabla {version} en {time}. Aciertos: {hits}, errores: {errors}.',
      close: 'Continuar'
    },
    about: {
      title: 'Acerca de',
      description: 'Maestro de la tabla periódica es una herramienta interactiva y accesible para aprender la tabla periódica. Todos los datos se guardan localmente en tu navegador; no recopilamos información personal.',
      links: 'Enlaces',
      license: 'Publicado bajo licencia MIT.',
      privacy: 'Política de privacidad',
      terms: 'Condiciones de uso'
    },
    aria: {
      table: 'Cuadrícula de la tabla periódica',
      openDetails: 'Abrir detalles de {symbol}',
      answerDialog: 'Diálogo de respuesta',
      detailsDialog: 'Diálogo de detalles del elemento'
    },
    errors: { noElements: 'No se han podido cargar los datos de los elementos.' }
  }
};

export function getLanguage() {
  const saved = localStorage.getItem('ptm.language');
  if (saved && translations[saved]) return saved;
  const browser = (navigator.language || 'en').slice(0, 2).toLowerCase();
  return translations[browser] ? browser : 'en';
}

export function setLanguage(code) {
  if (!translations[code]) return;
  localStorage.setItem('ptm.language', code);
}

export function t(lang, path, vars = {}) {
  const segments = path.split('.');
  let value = translations[lang] || translations.en;
  for (const segment of segments) value = value?.[segment];
  if (typeof value !== 'string') return path;
  return value.replace(/\{(\w+)\}/g, (_, key) => (vars[key] != null ? vars[key] : `{${key}}`));
}
