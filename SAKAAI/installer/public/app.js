/**
 * SAKAAI Interactive Web Installer — Frontend Logic
 * Multi-step wizard, SSE listener, path validation, and auto-dashboard launch.
 */

(function () {
  'use strict';

  const state = {
    currentStep: 1,
    targetPath: '',
    pathValid: false,
    selectedSkills: ['addyosmani'],
    selectedArch: 'laravel-ddd-lite',
    registry: null,
    installing: false,
    installResult: null,
  };

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  async function init() {
    await loadRegistry();
    renderSkills();
    renderArchitectures();
    bindEvents();
  }

  async function loadRegistry() {
    try {
      const res = await fetch('/api/registry');
      state.registry = await res.json();
    } catch (err) {
      console.error('Failed to load registry:', err);
      state.registry = { skillPacks: [], architectureTemplates: [] };
    }
  }

  function renderSkills() {
    const grid = $('#skills-grid');

    if (!state.registry) {
return;
}

    grid.innerHTML = state.registry.skillPacks.map(pack => `
      <div class="skill-card ${state.selectedSkills.includes(pack.id) ? 'selected' : ''}" data-id="${pack.id}">
        <div class="skill-checkbox"></div>
        <div class="skill-info">
          <h3>${pack.author}</h3>
          <p>${pack.description}</p>
          <div class="skill-meta">${pack.skillCount} skills • ${pack.folder}</div>
        </div>
        ${pack.preinstalled ? '<span class="skill-badge preinstalled">Included</span>' : ''}
      </div>
    `).join('');

    grid.querySelectorAll('.skill-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.id;

        if (state.selectedSkills.includes(id)) {
          state.selectedSkills = state.selectedSkills.filter(s => s !== id);
          card.classList.remove('selected');
        } else {
          state.selectedSkills.push(id);
          card.classList.add('selected');
        }
      });
    });
  }

  function renderArchitectures() {
    const grid = $('#arch-grid');

    if (!state.registry) {
return;
}

    grid.innerHTML = state.registry.architectureTemplates.map(tmpl => `
      <div class="arch-card ${state.selectedArch === tmpl.id ? 'selected' : ''}" data-id="${tmpl.id}">
        <div class="arch-icon">${tmpl.icon}</div>
        <h3>${tmpl.name}</h3>
        <p>${tmpl.description}</p>
        <div class="arch-tags">${tmpl.tags.map(t => `<span class="arch-tag">${t}</span>`).join('')}</div>
      </div>
    `).join('');

    grid.querySelectorAll('.arch-card').forEach(card => {
      card.addEventListener('click', () => {
        grid.querySelectorAll('.arch-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        state.selectedArch = card.dataset.id;
      });
    });
  }

  function bindEvents() {
    $('#btn-validate-path').addEventListener('click', validatePath);
    $('#input-path').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
validatePath();
}
    });
    $('#input-path').addEventListener('input', () => {
      state.pathValid = false;
      $('#btn-next-1').disabled = true;
      $('#path-feedback').style.display = 'none';
    });

    $('#btn-next-1').addEventListener('click', () => goToStep(2));
    $('#btn-prev-2').addEventListener('click', () => goToStep(1));
    $('#btn-next-2').addEventListener('click', () => goToStep(3));
    $('#btn-prev-3').addEventListener('click', () => goToStep(2));
    $('#btn-next-3').addEventListener('click', () => startInstallation());
    $('#btn-new-install').addEventListener('click', () => {
      state.currentStep = 1;
      state.installing = false;
      state.installResult = null;
      goToStep(1);
    });

    const btnDash = $('#btn-open-dashboard');

    if (btnDash) {
      btnDash.addEventListener('click', launchDashboard);
    }
  }

  async function validatePath() {
    const inputPath = $('#input-path').value.trim();

    if (!inputPath) {
return;
}

    const feedback = $('#path-feedback');

    try {
      const res = await fetch('/api/validate-path', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetPath: inputPath })
      });
      const data = await res.json();

      feedback.textContent = `${data.valid ? '✓' : '✗'} ${data.message} → ${data.resolved}`;
      feedback.className = `path-feedback ${data.valid ? 'valid' : 'invalid'}`;

      state.pathValid = data.valid;
      state.targetPath = data.resolved || inputPath;
      $('#btn-next-1').disabled = !data.valid;
    } catch (err) {
      feedback.textContent = `✗ Validation error: ${err.message}`;
      feedback.className = 'path-feedback invalid';
      state.pathValid = false;
      $('#btn-next-1').disabled = true;
    }
  }

  function goToStep(step) {
    $$('.wizard-step').forEach(el => el.classList.add('hidden'));

    const target = $(`#step-${step}`);

    if (target) {
      target.classList.remove('hidden');
      target.style.animation = 'none';
      target.offsetHeight;
      target.style.animation = '';
    }

    $$('.step-indicator .step').forEach(el => {
      const s = parseInt(el.dataset.step);
      el.classList.remove('active', 'completed');

      if (s === step) {
el.classList.add('active');
} else if (s < step) {
el.classList.add('completed');
}
    });

    const lines = $$('.step-indicator .step-line');
    lines.forEach((line, i) => {
      line.classList.toggle('active', i < step - 1);
    });

    state.currentStep = step;
  }

  function launchDashboard() {
    fetch('/api/open-dashboard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ targetPath: state.targetPath })
    }).catch(() => {});

    window.location.href = '/dashboard/index.html';
  }

  async function startInstallation() {
    if (state.installing) {
return;
}

    state.installing = true;

    goToStep(4);

    const terminal = $('#terminal-body');
    const progressBar = $('#install-progress');
    const progressText = $('#progress-text');
    const phaseCount = 5;

    terminal.innerHTML = '';

    const sse = new EventSource('/api/sse');
    sse.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === 'result') {
          try {
            state.installResult = JSON.parse(data.message);
          } catch {
            state.installResult = data;
          }

          sse.close();
          progressBar.style.width = '100%';
          progressText.textContent = 'Installation complete! Launching Dashboard...';

          setTimeout(() => {
            renderSummary();
            goToStep(5);
            setTimeout(() => {
              launchDashboard();
            }, 1200);
          }, 800);

          return;
        }

        const line = document.createElement('div');
        line.className = `terminal-line ${data.type || 'info'}`;
        line.textContent = data.message;
        terminal.appendChild(line);
        terminal.scrollTop = terminal.scrollHeight;

        if (data.type === 'phase') {
          const match = data.message.match(/Phase (\d)\/(\d)/);

          if (match) {
            const phase = parseInt(match[1]);
            const pct = Math.round((phase / phaseCount) * 85);
            progressBar.style.width = pct + '%';
            progressText.textContent = data.message.replace(/━/g, '').trim();
          }
        }
      } catch {
        const line = document.createElement('div');
        line.className = 'terminal-line info';
        line.textContent = event.data;
        terminal.appendChild(line);
      }
    };

    sse.onerror = () => {
      const line = document.createElement('div');
      line.className = 'terminal-line warn';
      line.textContent = 'SSE connection interrupted. Attempting to reconnect...';
      terminal.appendChild(line);
    };

    try {
      await fetch('/api/install', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetPath: state.targetPath,
          skillPacks: state.selectedSkills,
          architectureTemplate: state.selectedArch
        })
      });
    } catch (err) {
      const line = document.createElement('div');
      line.className = 'terminal-line error';
      line.textContent = `Failed to start installation: ${err.message}`;
      terminal.appendChild(line);
    }
  }

  function renderSummary() {
    const grid = $('#summary-grid');
    const r = state.installResult || {};
    const tmpl = state.registry?.architectureTemplates?.find(t => t.id === state.selectedArch);

    grid.innerHTML = `
      <div class="summary-item">
        <div class="summary-label">Status</div>
        <div class="summary-value ${r.success !== false ? 'success' : 'error'}">${r.success !== false ? '✓ SUCCESS' : '✗ FAILED'}</div>
      </div>
      <div class="summary-item">
        <div class="summary-label">Target Path</div>
        <div class="summary-value" style="font-size:0.85rem;word-break:break-all;">${r.targetPath || state.targetPath}</div>
      </div>
      <div class="summary-item">
        <div class="summary-label">Files Copied</div>
        <div class="summary-value">${r.filesCopied || 0}</div>
      </div>
      <div class="summary-item">
        <div class="summary-label">Documents</div>
        <div class="summary-value">${r.totalDocs || 0}</div>
      </div>
      <div class="summary-item">
        <div class="summary-label">Architecture</div>
        <div class="summary-value" style="font-size:0.95rem;">${tmpl ? tmpl.name : 'Standard'}</div>
      </div>
      <div class="summary-item">
        <div class="summary-label">Skill Packs</div>
        <div class="summary-value" style="font-size:0.95rem;">${(r.skillPacks || []).map(s => s.author).join(', ') || 'None'}</div>
      </div>
      <div class="summary-item">
        <div class="summary-label">Errors</div>
        <div class="summary-value ${(r.errors || []).length > 0 ? 'error' : 'success'}">${(r.errors || []).length}</div>
      </div>
      <div class="summary-item">
        <div class="summary-label">Integrity Hash</div>
        <div class="summary-value" style="font-size:0.7rem;font-family:var(--font-mono);word-break:break-all;">${(r.hashChain || '').substring(0, 32)}...</div>
      </div>
    `;
  }

  document.addEventListener('DOMContentLoaded', init);
})();
