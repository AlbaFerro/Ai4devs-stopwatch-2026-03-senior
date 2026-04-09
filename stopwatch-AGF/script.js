/* ─────────────────────────────────────────────
   TABS
───────────────────────────────────────────── */
const tabStopwatch = document.getElementById('tab-stopwatch');
const tabCountdown = document.getElementById('tab-countdown');
const panelStopwatch = document.getElementById('panel-stopwatch');
const panelCountdown = document.getElementById('panel-countdown');

function activateTab(tab) {
  const isStopwatch = tab === tabStopwatch;

  tabStopwatch.classList.toggle('active', isStopwatch);
  tabCountdown.classList.toggle('active', !isStopwatch);
  tabStopwatch.setAttribute('aria-selected', isStopwatch);
  tabCountdown.setAttribute('aria-selected', !isStopwatch);

  panelStopwatch.classList.toggle('hidden', !isStopwatch);
  panelCountdown.classList.toggle('hidden', isStopwatch);
}

tabStopwatch.addEventListener('click', () => activateTab(tabStopwatch));
tabCountdown.addEventListener('click', () => activateTab(tabCountdown));


/* ─────────────────────────────────────────────
   CRONÓMETRO
───────────────────────────────────────────── */
const swDisplay = document.getElementById('stopwatch-display');
const swStartBtn = document.getElementById('sw-start');
const swStopBtn  = document.getElementById('sw-stop');
const swResetBtn = document.getElementById('sw-reset');

let swInterval  = null;
let swElapsed   = 0;      // milliseconds
let swStartTime = null;   // timestamp when last started

function formatStopwatch(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours   = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds]
    .map(v => String(v).padStart(2, '0'))
    .join(':');
}

function swTick() {
  swDisplay.textContent = formatStopwatch(swElapsed + (Date.now() - swStartTime));
}

function swStart() {
  if (swInterval !== null) return; // ya está corriendo
  swStartTime = Date.now();
  swInterval = setInterval(swTick, 100);
  swStartBtn.disabled = true;
}

function swStop() {
  if (swInterval === null) return;
  clearInterval(swInterval);
  swElapsed += Date.now() - swStartTime;
  swInterval = null;
  swStartTime = null;
  swStartBtn.disabled = false;
  swDisplay.textContent = formatStopwatch(swElapsed);
}

function swReset() {
  swStop();
  swElapsed = 0;
  swDisplay.textContent = '00:00:00';
  swStartBtn.disabled = false;
}

swStartBtn.addEventListener('click', swStart);
swStopBtn.addEventListener('click', swStop);
swResetBtn.addEventListener('click', swReset);


/* ─────────────────────────────────────────────
   CUENTA ATRÁS
───────────────────────────────────────────── */
const cdMinutesInput = document.getElementById('cd-minutes');
const cdError        = document.getElementById('cd-error');
const cdStartBtn     = document.getElementById('cd-start');
const cdSetup        = document.getElementById('cd-setup');
const cdRunning      = document.getElementById('cd-running');
const cdDisplay      = document.getElementById('countdown-display');
const cdFinished     = document.getElementById('cd-finished');
const cdStopBtn      = document.getElementById('cd-stop');
const cdBackBtn      = document.getElementById('cd-back');

let cdInterval    = null;
let cdEndTime     = null;   // timestamp when countdown should reach 0
let cdTotalMs     = 0;      // total milliseconds for this countdown

function formatCountdown(ms) {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const days    = Math.floor(totalSeconds / 86400);
  const hours   = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const mm = String(minutes).padStart(2, '0');
  const ss = String(seconds).padStart(2, '0');

  if (days > 0) {
    const dd = String(days).padStart(2, '0');
    const hh = String(hours).padStart(2, '0');
    return `${dd}:${hh}:${mm}:${ss}`;
  }
  if (hours > 0) {
    const hh = String(hours).padStart(2, '0');
    return `${hh}:${mm}:${ss}`;
  }
  return `${mm}:${ss}`;
}

function cdTick() {
  const remaining = cdEndTime - Date.now();
  if (remaining <= 0) {
    cdDisplay.textContent = '00:00';
    clearInterval(cdInterval);
    cdInterval = null;
    cdFinished.classList.remove('hidden');
    cdStopBtn.disabled = true;
    return;
  }
  cdDisplay.textContent = formatCountdown(remaining);
}

function cdStart() {
  const raw = cdMinutesInput.value.trim();
  const minutes = parseFloat(raw);

  // Validación
  cdError.classList.add('hidden');
  cdMinutesInput.classList.remove('error');

  if (raw === '' || isNaN(minutes) || minutes < 1 || !Number.isFinite(minutes)) {
    cdError.classList.remove('hidden');
    cdMinutesInput.classList.add('error');
    cdMinutesInput.focus();
    return;
  }

  cdTotalMs = Math.round(minutes * 60 * 1000);
  cdEndTime = Date.now() + cdTotalMs;

  cdDisplay.textContent = formatCountdown(cdTotalMs);
  cdFinished.classList.add('hidden');
  cdStopBtn.disabled = false;

  cdSetup.classList.add('hidden');
  cdRunning.classList.remove('hidden');

  if (cdInterval) clearInterval(cdInterval);
  cdInterval = setInterval(cdTick, 250);
}

function cdStop() {
  if (cdInterval) {
    clearInterval(cdInterval);
    cdInterval = null;
  }
  cdStopBtn.disabled = true;
}

function cdBack() {
  cdStop();
  cdRunning.classList.add('hidden');
  cdSetup.classList.remove('hidden');
  cdFinished.classList.add('hidden');
  cdMinutesInput.value = '';
  cdMinutesInput.classList.remove('error');
  cdError.classList.add('hidden');
  cdStopBtn.disabled = false;
}

cdStartBtn.addEventListener('click', cdStart);
cdStopBtn.addEventListener('click', cdStop);
cdBackBtn.addEventListener('click', cdBack);

// Permitir iniciar con Enter
cdMinutesInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') cdStart();
});