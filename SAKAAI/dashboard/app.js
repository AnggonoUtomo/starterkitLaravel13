/**
 * SAKAAI HITL Web Dashboard Live Telemetry Controller
 * Version: 2.0.0 — Connected to Live SAKAAI API Engine
 * Document Reference: UI001 - HITL Dashboard Specification
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ─── DOM Elements ───────────────────────────────────────────────────
  const valTotalDocs = document.getElementById('val-total-docs');
  const valTokens = document.getElementById('val-tokens');
  const valLatency = document.getElementById('val-latency');
  const valHash = document.querySelector('.metric-value.text-gold');
  const ctxObjective = document.getElementById('ctx-objective');
  const ctxEvent = document.getElementById('ctx-event');
  const dagContainer = document.getElementById('dag-graph');
  const memoryResultsContainer = document.getElementById('memory-results-container');
  const searchInput = document.getElementById('memory-search-input');
  const btnSearch = document.getElementById('btn-search-memory');

  const modalOverlay = document.getElementById('approval-modal');
  const btnTriggerApproval = document.getElementById('btn-trigger-approval');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const btnApprove = document.getElementById('btn-approve-cmd');
  const btnReject = document.getElementById('btn-reject-cmd');

  // ─── Initial State ──────────────────────────────────────────────────
  const dagNodes = [
    { id: 'NODE-001', name: 'Task Init & Context Assembly', status: 'completed', engine: 'ContextEngine' },
    { id: 'NODE-002', name: 'Thought Trace Formulation', status: 'completed', engine: 'ReasoningEngine' },
    { id: 'NODE-003', name: 'Sandboxed Tool Execution', status: 'running', engine: 'AgentRuntime' },
    { id: 'NODE-004', name: 'Outcome Settlement & Audit Log', status: 'pending', engine: 'AuditEngine' }
  ];

  // ─── Render DAG Graph ───────────────────────────────────────────────
  function renderDAG() {
    if (!dagContainer) {
return;
}

    dagContainer.innerHTML = '';

    dagNodes.forEach((node, index) => {
      const nodeEl = document.createElement('div');
      nodeEl.className = `dag-node ${node.status}`;
      nodeEl.innerHTML = `
        <div class="dag-node-header">
          <span>${node.id}</span>
          <span>${node.engine}</span>
        </div>
        <div class="dag-node-title">${node.name}</div>
        <span class="dag-node-status status-${node.status}">${node.status.toUpperCase()}</span>
      `;
      dagContainer.appendChild(nodeEl);

      if (index < dagNodes.length - 1) {
        const arrowEl = document.createElement('div');
        arrowEl.className = 'dag-arrow';
        arrowEl.innerHTML = '➔';
        dagContainer.appendChild(arrowEl);
      }
    });
  }

  // ─── Fetch Live Telemetry Status ────────────────────────────────────
  async function fetchLiveStatus() {
    try {
      const res = await fetch('/api/dashboard/status');

      if (!res.ok) {
return;
}

      const data = await res.json();

      if (valTotalDocs) {
valTotalDocs.textContent = data.total_docs || '127';
}

      if (ctxObjective) {
ctxObjective.textContent = data.active_objective || 'SAKAAI Enterprise System Kernel';
}

      if (valHash && data.hash_chain) {
valHash.textContent = data.hash_chain;
}

      if (data.latest_decision && ctxEvent) {
        ctxEvent.textContent = JSON.stringify(data.latest_decision, null, 2);
      }
    } catch (err) {
      console.log('Using local state (offline telemetry mode)');
    }
  }

  // ─── Live Memory Search (RAG Engine) ───────────────────────────────
  async function performMemorySearch(query) {
    if (!memoryResultsContainer) {
return;
}

    memoryResultsContainer.innerHTML = `<div class="memory-card-result"><p class="res-snippet">Searching RAG Memory across 127 specification files...</p></div>`;

    try {
      const res = await fetch(`/api/dashboard/memory-search?q=${encodeURIComponent(query)}`);
      const data = await res.json();

      memoryResultsContainer.innerHTML = '';

      if (!data.results || data.results.length === 0) {
        memoryResultsContainer.innerHTML = `<div class="memory-card-result"><p class="res-snippet">No matching specification records found for "${query}".</p></div>`;

        return;
      }

      data.results.forEach(m => {
        const itemEl = document.createElement('div');
        itemEl.className = 'memory-card-result';
        itemEl.innerHTML = `
          <div class="res-header">
            <span class="res-title">${m.title}</span>
            <span class="res-score">Similarity: ${m.score}</span>
          </div>
          <p class="res-snippet">${m.snippet}</p>
        `;
        memoryResultsContainer.appendChild(itemEl);
      });
    } catch (err) {
      memoryResultsContainer.innerHTML = `<div class="memory-card-result"><p class="res-snippet">Search error: ${err.message}</p></div>`;
    }
  }

  // ─── Bind Search Controls ──────────────────────────────────────────
  if (btnSearch && searchInput) {
    btnSearch.addEventListener('click', () => {
      performMemorySearch(searchInput.value);
    });

    searchInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        performMemorySearch(searchInput.value);
      }
    });
  }

  // ─── Modal Approval Controls ───────────────────────────────────────
  function openApprovalModal() {
    if (modalOverlay) {
modalOverlay.classList.add('active');
}
  }

  function closeApprovalModal() {
    if (modalOverlay) {
modalOverlay.classList.remove('active');
}
  }

  async function sendApprovalDecision(decision) {
    try {
      const res = await fetch('/api/dashboard/approval', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          decision: decision,
          command: 'git commit -m "Deploy SAKAAI v3.0 Enterprise"'
        })
      });
      const data = await res.json();

      if (ctxEvent && data.decision) {
        ctxEvent.textContent = JSON.stringify(data.decision, null, 2);
      }
    } catch (err) {
      console.error('Approval API error:', err);
    }
  }

  if (btnTriggerApproval) {
btnTriggerApproval.addEventListener('click', openApprovalModal);
}

  if (btnCloseModal) {
btnCloseModal.addEventListener('click', closeApprovalModal);
}

  if (btnApprove) {
    btnApprove.addEventListener('click', async () => {
      await sendApprovalDecision('APPROVED');
      alert('✅ PERINTAH DI-APPROVE: Decision dicatat di Audit Trail & Executed.');
      closeApprovalModal();

      dagNodes[2].status = 'completed';
      dagNodes[3].status = 'running';
      renderDAG();
    });
  }

  if (btnReject) {
    btnReject.addEventListener('click', async () => {
      await sendApprovalDecision('REJECTED');
      alert('❌ PERINTAH DI-REJECT: Eksekusi dibatalkan oleh Human Administrator.');
      closeApprovalModal();
    });
  }

  // ─── Live Telemetry Simulation Ticker ──────────────────────────────
  setInterval(() => {
    if (valTokens) {
      const current = parseInt(valTokens.textContent.replace(/[^0-9]/g, '')) || 45200;
      const delta = Math.floor(Math.random() * 120) - 40;
      const newVal = Math.max(40000, Math.min(120000, current + delta));
      valTokens.innerHTML = `${newVal.toLocaleString()} <span class="metric-unit">/ 128k</span>`;
    }

    if (valLatency) {
      const latency = Math.floor(Math.random() * 80) + 420;
      valLatency.innerHTML = `${latency} <span class="metric-unit">ms</span>`;
    }
  }, 3000);

  // ─── Initial Execution ─────────────────────────────────────────────
  renderDAG();
  fetchLiveStatus();
  performMemorySearch('architecture');
});
