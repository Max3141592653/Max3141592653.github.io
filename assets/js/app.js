import { elements, getCategory } from './elements.js';
import {
  translations, SUPPORTED_LANGUAGES, getLanguage, setLanguage, t
} from './i18n.js';

const MAIN_ROWS = [
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 6, 7, 8, 9, 10],
  [11, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 14, 15, 16, 17, 18],
  [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
  [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
  [55, 56, '*', 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86],
  [87, 88, '**', 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, '*', 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71],
  [0, 0, '**', 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103]
];

const SIMPLE_SYMBOLS = new Set([
  'H', 'Li', 'Na', 'K', 'Rb', 'Cs', 'Fr',
  'Be', 'Mg', 'Ca', 'Sr', 'Ba', 'Ra',
  'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn', 'Pd', 'Pt', 'Ag', 'Au', 'Cd', 'Hg',
  'B', 'Al', 'Ga', 'In', 'Tl',
  'C', 'Si', 'Ge', 'Sn', 'Pb',
  'N', 'P', 'As', 'Sb', 'Bi',
  'O', 'S', 'Se', 'Te', 'Po',
  'F', 'Cl', 'Br', 'I', 'At',
  'He', 'Ne', 'Ar', 'Kr', 'Xe', 'Rn'
]);

const state = {
  language: getLanguage(),
  theme: localStorage.getItem('ptm.theme') || 'dark',
  version: localStorage.getItem('ptm.version') || 'full',
  showColors: localStorage.getItem('ptm.showColors') === 'true',
  hits: 0,
  errors: 0,
  seconds: 0,
  filled: new Set(),
  mistakes: [],
  completed: false,
  best: Number(localStorage.getItem('ptm.best') || 0),
  timerId: null,
  quiz: { element: null, answered: false, score: Number(localStorage.getItem('ptm.quizScore') || 0), streak: 0 },
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const byNumber = new Map(elements.map((element) => [element.atomicNumber, element]));

function track(key, value) { localStorage.setItem(key, String(value)); }

function lang() { return state.language; }
function msg(path, vars) { return t(lang(), path, vars); }

function applyTheme() {
  document.documentElement.dataset.theme = state.theme;
  const button = $('#theme-toggle');
  if (button) {
    button.textContent = state.theme === 'dark' ? '🌙' : '☀️';
    button.setAttribute('aria-label', state.theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  }
}

function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  track('ptm.theme', state.theme);
  applyTheme();
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${minutes}:${String(remainder).padStart(2, '0')}`;
}

function updateStats() {
  $('#hits').textContent = state.hits;
  $('#errors').textContent = state.errors;
  $('#timer').textContent = formatTime(state.seconds);
  $('#best').textContent = state.best ? formatTime(state.best) : '—';
  $('#quiz-score').textContent = state.quiz.score;
  $('#quiz-streak').textContent = state.quiz.streak;
}

function startTimer() {
  if (state.timerId) return;
  state.timerId = setInterval(() => {
    state.seconds += 1;
    updateStats();
  }, 1000);
}

function stopTimer() {
  if (state.timerId) {
    clearInterval(state.timerId);
    state.timerId = null;
  }
}

function resetProgress() {
  stopTimer();
  state.hits = 0;
  state.errors = 0;
  state.seconds = 0;
  state.filled.clear();
  state.mistakes = [];
  state.completed = false;
  state.quiz.score = 0;
  state.quiz.streak = 0;
  track('ptm.quizScore', 0);
  refreshTable();
  updateStats();
  showToast(msg('controls.reset') + ' ✓');
}

function isSimple(symbol) { return SIMPLE_SYMBOLS.has(symbol); }

function targetCount() {
  if (state.version === 'simple') {
    return elements.filter((element) => isSimple(element.symbol)).length;
  }
  return elements.length;
}

function refreshTable() {
  $$('.cell[data-num]').forEach((cell) => {
    const number = Number(cell.dataset.num);
    const element = byNumber.get(number);
    if (!element) return;
    const filled = state.filled.has(number);
    if (filled) {
      cell.classList.add('is-filled');
      cell.innerHTML = `
        <span class="num">${element.atomicNumber}</span>
        <span class="sym">${element.symbol}</span>
        <span class="name">${element.names[lang()]}</span>`;
      applyCategoryClass(cell, element, true);
    } else {
      cell.classList.remove('is-filled');
      cell.innerHTML = `
        <span class="num">${element.atomicNumber}</span>
        <span class="sym">?</span>`;
      cell.classList.remove('metal', 'nonmetal', 'semi-metal', 'noble-gas');
    }
    cell.classList.toggle('is-disabled', state.version === 'simple' && !isSimple(element.symbol) && !filled);
    if (state.version === 'simple' && !isSimple(element.symbol) && !filled) {
      cell.innerHTML = `
        <span class="num">${element.atomicNumber}</span>
        <span class="sym">${element.symbol}</span>`;
    }
    cell.setAttribute('aria-label', `${element.atomicNumber} ${element.symbol} ${element.names[lang()]}`);
  });
  updateColorReveal();
}

function fitTableToViewport() {
  if (document.body.classList.contains('table-focus')) return;
  const scroll = document.querySelector('.table-scroll');
  if (!scroll) return;
  const top = scroll.getBoundingClientRect().top;
  const availableHeight = Math.max(120, window.innerHeight - top - 12);
  const availableWidth = Math.max(180, scroll.clientWidth - 24);
  const cols = 18;
  const rows = 9;
  const tableGrid = document.querySelector('.periodic-table');
  const gap = tableGrid ? parseFloat(getComputedStyle(tableGrid).gap) || 6 : 6;
  const size = Math.max(24, Math.min((availableWidth - (cols - 1) * gap) / cols, (availableHeight - (rows - 1) * gap) / rows, 70));
  document.documentElement.style.setProperty('--cell-size', `${size}px`);
}

function applyCategoryClass(cell, element, filled) {
  cell.classList.remove('metal', 'nonmetal', 'semi-metal', 'noble-gas');
  if (!filled) return;
  const category = getCategory(element.groupBlock);
  if (state.showColors) cell.classList.add(category);
}

function updateColorReveal() {
  $$('.cell[data-num].is-filled').forEach((cell) => {
    const element = byNumber.get(Number(cell.dataset.num));
    if (!element) return;
    cell.classList.remove('metal', 'nonmetal', 'semi-metal', 'noble-gas');
    if (state.showColors) cell.classList.add(getCategory(element.groupBlock));
  });
}

function createCell(value) {
  if (value === 0) {
    const gap = document.createElement('div');
    gap.className = 'gap';
    gap.setAttribute('aria-hidden', 'true');
    return gap;
  }
  if (value === '*' || value === '**') {
    const marker = document.createElement('div');
    marker.className = 'placeholder';
    marker.textContent = value;
    marker.setAttribute('aria-hidden', 'true');
    marker.title = value === '*' ? msg('table.lanthanides') : msg('table.actinides');
    return marker;
  }

  const element = byNumber.get(value);
  const cell = document.createElement('button');
  cell.type = 'button';
  cell.className = 'cell';
  cell.dataset.num = String(element.atomicNumber);
  cell.setAttribute('aria-label', `${element.atomicNumber} ${element.symbol}`);
  cell.style.font = 'inherit';
  cell.addEventListener('click', () => handleCellClick(element));
  cell.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCellClick(element);
    }
  });
  return cell;
}

function buildTable() {
  const table = $('#periodic-table');
  const series = $('#series-wrapper');
  table.innerHTML = '';
  series.innerHTML = '';
  const rowLimit = 7;
  MAIN_ROWS.forEach((row, index) => {
    if (row.every((value) => value === 0)) return;
    row.forEach((value) => {
      const node = createCell(value);
      if (index < rowLimit) table.appendChild(node);
      else series.appendChild(node);
    });
  });
  refreshTable();
}

function scaleFocusTable() {
  if (!document.body.classList.contains('table-focus')) return;
  const padding = 24;
  const availableWidth = window.innerWidth - padding;
  const availableHeight = window.innerHeight - padding;
  const cols = 18;
  const rows = 9;
  const tableGrid = document.querySelector('.periodic-table');
  const gap = tableGrid ? parseFloat(getComputedStyle(tableGrid).gap) || 6 : 6;
  const size = Math.max(24, Math.min((availableWidth - (cols - 1) * gap) / cols, (availableHeight - (rows - 1) * gap) / rows));
  document.documentElement.style.setProperty('--cell-size', `${size}px`);
}

function resetFocusScale() {
  document.documentElement.style.removeProperty('--cell-size');
  const scroll = document.querySelector('.table-scroll');
  if (scroll) scroll.style.transform = 'none';
}

function handleCellClick(element) {
  if (state.version === 'simple' && !isSimple(element.symbol)) return;
  if (state.filled.has(element.atomicNumber)) {
    openDetails(element);
    return;
  }
  openGuess(element);
}

function openGuess(element) {
  const dialog = $('#answer-dialog');
  $('#answer-title').textContent = msg('modal.guessTitle', { number: element.atomicNumber });
  $('#answer-number').textContent = element.atomicNumber;
  const input = $('#answer-input');
  input.value = '';
  $('#answer-feedback').textContent = '';
  $('#answer-feedback').className = 'feedback';
  dialog.showModal();
  setTimeout(() => input.focus(), 20);
  dialog.onsubmit = (event) => {
    event.preventDefault();
    submitGuess(element, input.value);
  };
  dialog.querySelector('button[value="cancel"]').onclick = () => dialog.close();
}

function submitGuess(element, rawGuess) {
  const guess = rawGuess.trim().toLowerCase();
  const feedback = $('#answer-feedback');
  if (!guess) {
    feedback.textContent = msg('modal.wrongFeedback');
    feedback.className = 'feedback is-wrong';
    return;
  }
  const accepted = [
    element.symbol,
    ...Object.values(element.names)
  ].map((value) => value.toLowerCase());
  if (accepted.includes(guess)) {
    state.filled.add(element.atomicNumber);
    state.hits += 1;
    refreshTable();
    startTimer();
    const dialog = $('#answer-dialog');
    dialog.close();
    updateStats();
    showToast(msg('modal.correctFeedback', { symbol: element.symbol, name: element.names[lang()] }));
    checkCompletion();
  } else {
    state.errors += 1;
    state.mistakes.push(msg('modal.guessTitle', { number: element.atomicNumber }) + ` — "${rawGuess}"`);
    feedback.textContent = msg('modal.wrongFeedback');
    feedback.className = 'feedback is-wrong';
    updateStats();
  }
  startTimer();
}

function checkCompletion() {
  if (state.filled.size < targetCount()) return;
  if (state.completed) return;
  state.completed = true;
  stopTimer();
  if (state.best === 0 || state.seconds < state.best) {
    state.best = state.seconds;
    track('ptm.best', state.best);
  }
  const message = msg('completion.message', {
    version: state.version === 'simple' ? msg('controls.versionSimple') : msg('controls.versionFull'),
    time: formatTime(state.seconds),
    hits: state.hits,
    errors: state.errors
  });
  $('#completion-message').textContent = message;
  const dialog = $('#completion-dialog');
  if (typeof dialog.showModal === 'function') dialog.showModal();
}

function openDetails(element) {
  $('#details-title').textContent = `${element.symbol} — ${element.names[lang()]}`;
  $('#detail-number').textContent = element.atomicNumber;
  $('#detail-symbol').textContent = element.symbol;
  $('#detail-name').textContent = element.names[lang()];
  $('#detail-category').textContent = msg('categories.' + getCategory(element.groupBlock));
  const color = element.cpkHexColor ? `#${element.cpkHexColor}` : 'transparent';
  $('#detail-color').style.background = color;
  $('#details-dialog').showModal();
}

function openMistakes() {
  const container = $('#mistakes-list');
  container.innerHTML = '';
  if (state.mistakes.length === 0) {
    const empty = document.createElement('p');
    empty.textContent = '—';
    empty.style.color = 'var(--text-muted)';
    container.appendChild(empty);
  } else {
    const list = document.createElement('ul');
    list.style.paddingLeft = '18px';
    state.mistakes.forEach((mistake) => {
      const item = document.createElement('li');
      item.textContent = mistake;
      item.style.marginBottom = '4px';
      list.appendChild(item);
    });
    container.appendChild(list);
  }
  $('#mistakes-dialog').showModal();
}

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('is-visible'), 2400);
}
showToast.timer = null;

function changeLanguage(code) {
  setLanguage(code);
  state.language = code;
  track('ptm.language', code);
  translateStatic();
  const optionsToggle = $('#options-toggle');
  const controlsPanel = $('.controls');
  if (optionsToggle && controlsPanel) {
    optionsToggle.textContent = controlsPanel.classList.contains('is-collapsed')
      ? msg('controls.showOptions')
      : msg('controls.hideOptions');
  }
  const focusButton = $('#focus-btn');
  if (focusButton) focusButton.textContent = msg('controls.expandTable');
  const closeFocusButton = $('#close-focus');
  if (closeFocusButton) closeFocusButton.textContent = msg('controls.closeTable');
  refreshTable();
  $('#language').value = code;
  document.documentElement.lang = code;
  if (state.quiz.element) renderQuizQuestion();
}

function translateStatic() {
  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const key = node.getAttribute('data-i18n');
    if (key) node.textContent = msg(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((node) => {
    const key = node.getAttribute('data-i18n-placeholder');
    if (key) node.setAttribute('placeholder', msg(key));
  });
  document.title = msg('appTitle');
}

function switchTab(name) {
  $$('.tab').forEach((tab) => {
    const active = tab.dataset.tab === name;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-selected', String(active));
  });
  $$('.panel').forEach((panel) => {
    const active = panel.id === `panel-${name}`;
    panel.classList.toggle('is-active', active);
    panel.hidden = !active;
  });
  if (name === 'table' && document.body.classList.contains('table-focus')) setTimeout(scaleFocusTable, 0);
}

function nextQuizQuestion() {
  const pool = state.version === 'simple'
    ? elements.filter((element) => isSimple(element.symbol))
    : elements;
  state.quiz.element = pool[Math.floor(Math.random() * pool.length)];
  state.quiz.answered = false;
  $('#quiz-answer').value = '';
  $('#quiz-feedback').textContent = '';
  $('#quiz-feedback').className = 'feedback';
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const element = state.quiz.element;
  if (!element) return nextQuizQuestion();
  const mode = $('#quiz-mode').value;
  const question = $('#quiz-question');
  if (mode === 'symbol') question.textContent = element.symbol;
  else if (mode === 'name') question.textContent = element.names[lang()];
  else question.textContent = element.atomicNumber;
}

function checkQuizAnswer(event) {
  event.preventDefault();
  const element = state.quiz.element;
  if (!element || state.quiz.answered) return;
  const mode = $('#quiz-mode').value;
  const answer = $('#quiz-answer').value.trim().toLowerCase();
  if (!answer) {
    $('#quiz-feedback').textContent = msg('quiz.empty');
    $('#quiz-feedback').className = 'feedback is-wrong';
    return;
  }
  let expected = '';
  if (mode === 'symbol') expected = element.names[lang()].toLowerCase();
  else if (mode === 'name') expected = element.symbol.toLowerCase();
  else expected = element.names[lang()].toLowerCase();
  if (answer === expected) {
    state.quiz.score += 1;
    state.quiz.streak += 1;
    track('ptm.quizScore', state.quiz.score);
    $('#quiz-feedback').textContent = msg('quiz.correct');
    $('#quiz-feedback').className = 'feedback is-correct';
  } else {
    state.quiz.streak = 0;
    $('#quiz-feedback').textContent = msg('quiz.wrong', { answer: expected });
    $('#quiz-feedback').className = 'feedback is-wrong';
  }
  state.quiz.answered = true;
  updateStats();
}

function wireEvents() {
  $$('.tab').forEach((tab) => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  });

  $('#language').addEventListener('change', (event) => changeLanguage(event.target.value));
  $('#theme-toggle').addEventListener('click', toggleTheme);

  $('#version-select').addEventListener('change', (event) => {
    state.version = event.target.value;
    track('ptm.version', state.version);
    state.completed = false;
    refreshTable();
  });

  $('#reveal-colors').addEventListener('change', (event) => {
    state.showColors = event.target.checked;
    track('ptm.showColors', state.showColors);
    updateColorReveal();
  });

  $('#reset-btn').addEventListener('click', () => {
    if (confirm('Reset all progress?')) resetProgress();
  });
  $('#mistakes-btn').addEventListener('click', openMistakes);

  const optionsToggle = $('#options-toggle');
  const controlsPanel = $('.controls');
  const updateOptionsToggle = () => {
    if (!optionsToggle || !controlsPanel) return;
    optionsToggle.textContent = controlsPanel.classList.contains('is-collapsed')
      ? msg('controls.showOptions')
      : msg('controls.hideOptions');
  };
  optionsToggle?.addEventListener('click', () => {
    controlsPanel?.classList.toggle('is-collapsed');
    localStorage.setItem('ptm.controlsCollapsed', String(controlsPanel?.classList.contains('is-collapsed')));
    updateOptionsToggle();
  });
  if (localStorage.getItem('ptm.controlsCollapsed') === 'true') controlsPanel?.classList.add('is-collapsed');
  updateOptionsToggle();

  const focusButton = $('#focus-btn');
  const closeFocusButton = $('#close-focus');
  const setFocusMode = (active) => {
    document.body.classList.toggle('table-focus', active);
    if (!active) resetFocusScale();
  };
  const updateFocusButtons = () => {
    if (focusButton) focusButton.textContent = msg('controls.expandTable');
    if (closeFocusButton) closeFocusButton.textContent = msg('controls.closeTable');
  };
  focusButton?.addEventListener('click', () => setFocusMode(true));
  closeFocusButton?.addEventListener('click', () => setFocusMode(false));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && document.body.classList.contains('table-focus')) {
      setFocusMode(false);
    }
  });
  updateFocusButtons();

  $('#quiz-form').addEventListener('submit', checkQuizAnswer);
  $('#quiz-next').addEventListener('click', nextQuizQuestion);
  $('#quiz-mode').addEventListener('change', () => {
    state.quiz.answered = false;
    renderQuizQuestion();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') return;
  });
}

function populateLanguageSelect() {
  const select = $('#language');
  select.innerHTML = '';
  SUPPORTED_LANGUAGES.forEach(({ code, label }) => {
    const option = document.createElement('option');
    option.value = code;
    option.textContent = label;
    select.appendChild(option);
  });
  select.value = lang();
}

function init() {
  if (!elements || elements.length === 0) {
    showToast(msg('errors.noElements'));
    return;
  }
  populateLanguageSelect();
  applyTheme();
  $('#version-select').value = state.version;
  $('#reveal-colors').checked = state.showColors;

  translateStatic();
  buildTable();
  fitTableToViewport();
  window.addEventListener('resize', () => {
    if (document.body.classList.contains('table-focus')) scaleFocusTable();
    else fitTableToViewport();
  });
  wireEvents();
  updateStats();

  document.documentElement.lang = lang();
}

init();
