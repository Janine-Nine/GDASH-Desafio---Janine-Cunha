// assets/js/script.js (moved from root)
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    if (typeof lucide.createIcons === 'function') lucide.createIcons();
    else if (typeof lucide.replace === 'function') lucide.replace();
  }
  // Iniciar demo de dados se os elementos existirem (temp, mini stat or humidity/wind spans)
  const tempEl = document.getElementById('temp');
  const miniTempEl = document.getElementById('mini-temp');
  const miniHumEl = document.getElementById('mini-humidity');
  const miniWindEl = document.getElementById('mini-wind');
  if (tempEl || miniTempEl || miniHumEl || miniWindEl) {
    updateDemo();
    setInterval(updateDemo, 5000); // update every 5s for near-real-time
  }

  // fallback: hide images that fail to load (avoid inline onerror handlers)
  for (const img of document.querySelectorAll('img[data-hide-onerror]')) {
    img.addEventListener('error', () => { img.style.display = 'none'; });
  }

  // mark active nav link based on current path
  const path = location.pathname.split('/').pop() || 'index.html';
  for (const a of document.querySelectorAll('a.nav-link')) {
    const href = a.getAttribute('href') || '';
    const normalized = href.split('/').pop();
    if (normalized === path || (normalized === 'index.html' && path === '')) {
      a.setAttribute('aria-current','page');
      a.classList.add('active');
    }
  }

  // if an anchor with id open-dashboard is clicked from the same page, do smooth scroll; otherwise let it navigate
  const openBtn = document.getElementById('open-dashboard');
  if (openBtn) {
    openBtn.addEventListener('click', function(e){
      const href = this.getAttribute('href') || '';
      const target = href.split('/').pop();
      const current = location.pathname.split('/').pop();
      if (target === current || (target === '' && (current === 'index.html' || current === ''))) {
        // same page — smooth scroll to main
        e.preventDefault();
        const main = document.querySelector('main');
        if (main) window.scrollTo({ top: main.offsetTop - 8, behavior: 'smooth' });
      }
      // otherwise default navigation happens
    });
  }

  // back button handler: if available, navigate back or fallback to index
  const backBtn = document.getElementById('btn-back');
  if (backBtn) {
    // hide on index to avoid confusion (we keep a link to dashboard/home there)
    if (path === 'index.html' || path === '') backBtn.hidden = true;
    else backBtn.hidden = false;
    backBtn.addEventListener('click', (e) => {
      if (history.length > 1) history.back();
      else window.location.href = 'index.html';
    });
  }

  // CSV / XLSX export for table
  // CSV / XLSX export for table
  function tableToCSV(table) {
    const rows = Array.from(table.querySelectorAll('tr'));
    return rows.map(r => {
      const cols = Array.from(r.querySelectorAll('th,td'));
      return cols.map(c => '"' + (c.textContent || '').replace(/"/g, '""') + '"').join(',');
    }).join('\n');
  }

  function downloadCSV(csvString, filename) {
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  for (const btn of document.querySelectorAll('button[data-export]')) {
    btn.addEventListener('click', (e) => {
      const table = document.querySelector('#tabela-registros table');
      if (!table) return alert('Tabela de registros não encontrada.');
      const csv = tableToCSV(table);
      const type = btn.getAttribute('data-export');
      const filename = `gdash-registros-${new Date().toISOString().slice(0,10)}.${type === 'xlsx' ? 'xlsx' : 'csv'}`;
      downloadCSV(csv, filename);
    });
  }
});

function formatDirection(deg) {
  const dirs = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];
  return dirs[Math.round(deg / 22.5) % 16];
}

function updateDemo(){
  const temp = (Math.random() * 18 + 12).toFixed(1);
  const hum = Math.round(Math.random() * 60 + 20);
  const wind = (Math.random() * 30).toFixed(1);
  const dir = Math.round(Math.random() * 360);

  const tempEl = document.getElementById('temp');
  const tempDesc = document.getElementById('temp-desc');
  const humEl = document.getElementById('humidity');
  const humDesc = document.getElementById('humidity-desc');
  const windEl = document.getElementById('wind');
  const windDesc = document.getElementById('wind-desc');
  const insightEl = document.getElementById('insight');
  const ul = document.getElementById('recent-logs');
  const miniTempEl = document.getElementById('mini-temp');
  const miniHumEl = document.getElementById('mini-humidity');
  const miniWindEl = document.getElementById('mini-wind');

  if (tempEl) tempEl.textContent = temp + ' °C';
  if (miniTempEl) miniTempEl.textContent = temp + ' °C';
  if (tempDesc) {
    if (temp >= 30) tempDesc.textContent = 'Calor extremo';
    else if (temp <= 10) tempDesc.textContent = 'Frio intenso';
    else tempDesc.textContent = 'Temperatura amena';
  }
  if (humEl) humEl.textContent = hum + ' %';
  if (miniHumEl) miniHumEl.textContent = hum + ' %';
  if (humDesc) humDesc.textContent = hum > 70 ? 'Alta umidade' : 'Umidade normal';
  if (windEl) windEl.textContent = wind + ' km/h';
  if (miniWindEl) miniWindEl.textContent = wind + ' km/h';
  if (windDesc) windDesc.textContent = 'Direção: ' + formatDirection(dir);

  const insights = [
    'Baixa probabilidade de chuva nas próximas horas.',
    'A partir das 18h: aumento de nuvens e chance de pancadas.',
    'Tendência de queda de temperatura à noite.',
    'Índice de conforto térmico: moderado.'
  ];
  if (insightEl) insightEl.textContent = insights[Math.floor(Math.random()*insights.length)];

  if (ul) {
    const now = new Date();
    const logs = [
      `${now.toLocaleString()} — Temp: ${temp} °C • Umid: ${hum}%`,
      `${new Date(now-3600e3).toLocaleString()} — Temp: ${(temp-1).toFixed(1)} °C • Umid: ${hum-2}%`,
      `${new Date(now-7200e3).toLocaleString()} — Temp: ${(temp-2).toFixed(1)} °C • Umid: ${hum+1}%`
    ];
    ul.innerHTML = '';
    for (const l of logs) {
      const li = document.createElement('li');
      li.className = 'text-xs text-gray-600';
      li.textContent = l;
      ul.appendChild(li);
    }
  }
}

// NOTE: smooth scroll handled by the openBtn listener inside DOMContentLoaded
