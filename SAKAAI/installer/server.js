/**
 * SAKAAI Interactive Web Installer & Live Telemetry Dashboard HTTP Server
 * Serves the installer UI, live telemetry API, RAG search, and dashboard.
 * Zero npm dependencies — pure Node.js native modules.
 *
 * Document Reference: DEV001 - SAKAAI CLI Specification
 */

const { exec } = require('child_process');
const crypto = require('crypto');
const fs = require('fs');
const http = require('http');
const path = require('path');
const { runInstallation } = require('./engine');

const WORKSPACE_ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(__dirname, 'public');
const REGISTRY_PATH = path.join(__dirname, 'registry.json');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

let sseClients = [];
let installedTargetPath = null;
let lastApprovalDecision = null;

function broadcastLog(message, type = 'info') {
  const data = JSON.stringify({ message, type, timestamp: new Date().toISOString() });

  for (const res of sseClients) {
    try {
      res.write(`data: ${data}\n\n`);
    } catch {
      // Client disconnected
    }
  }
}

function getAllMarkdownFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) {
return fileList;
}

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      getAllMarkdownFiles(full, fileList);
    } else if (entry.name.endsWith('.md')) {
      fileList.push(full);
    }
  }

  return fileList;
}

function getActiveSAKAAIDir() {
  if (installedTargetPath) {
    const targetSakaai = path.join(installedTargetPath, 'SAKAAI');

    if (fs.existsSync(targetSakaai)) {
return targetSakaai;
}
  }

  const rootSakaai = path.join(WORKSPACE_ROOT, 'SAKAAI');

  if (fs.existsSync(rootSakaai)) {
return rootSakaai;
}

  return WORKSPACE_ROOT;
}

function searchMarkdownFiles(query, baseDir) {
  if (!query || query.trim().length === 0) {
    query = 'architecture';
  }

  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const docs = getAllMarkdownFiles(baseDir);
  const results = [];

  for (const docPath of docs) {
    const content = fs.readFileSync(docPath, 'utf8');
    const lower = content.toLowerCase();

    let matchCount = 0;

    for (const term of terms) {
      const regex = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      const matches = lower.match(regex);

      if (matches) {
matchCount += matches.length;
}
    }

    if (matchCount > 0) {
      const relPath = path.relative(baseDir, docPath);
      const lines = content.split('\n');
      const firstHeader = lines.find(l => l.startsWith('# ')) || path.basename(docPath);
      const title = firstHeader.replace('# ', '').trim();

      let snippetLine = lines.find(l => terms.some(t => l.toLowerCase().includes(t)) && !l.startsWith('#')) || lines[0] || '';

      if (snippetLine.length > 220) {
snippetLine = snippetLine.substring(0, 217) + '...';
}

      const score = (Math.min(0.99, 0.50 + matchCount * 0.08)).toFixed(2);
      results.push({
        title: `${path.basename(docPath)} (${title})`,
        path: relPath,
        score: score,
        snippet: snippetLine.trim() || 'Specification document match.'
      });
    }
  }

  return results.sort((a, b) => parseFloat(b.score) - parseFloat(a.score)).slice(0, 6);
}

function serveStatic(req, res) {
  let rawUrl = req.url.split('?')[0];

  if (rawUrl === '/dashboard' || rawUrl === '/dashboard/') {
    rawUrl = '/dashboard/index.html';
  }

  let filePath;

  if (rawUrl.startsWith('/dashboard/')) {
    const relDashPath = rawUrl.replace('/dashboard/', '');

    if (installedTargetPath) {
      filePath = path.join(installedTargetPath, 'SAKAAI', 'dashboard', relDashPath);
    }

    if (!filePath || !fs.existsSync(filePath)) {
      filePath = path.join(WORKSPACE_ROOT, 'SAKAAI', 'dashboard', relDashPath);
    }

    if (!fs.existsSync(filePath)) {
      filePath = path.join(WORKSPACE_ROOT, 'dashboard', relDashPath);
    }
  } else {
    filePath = rawUrl === '/' ? '/index.html' : rawUrl;
    filePath = path.join(PUBLIC_DIR, filePath);
  }

  const ext = path.extname(filePath);
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  if (!fs.existsSync(filePath)) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found: ' + rawUrl);

    return;
  }

  const content = fs.readFileSync(filePath);
  res.writeHead(200, { 'Content-Type': contentType });
  res.end(content);
}

function handleAPI(req, res) {
  const urlObj = new URL(req.url, 'http://localhost');
  const pathname = urlObj.pathname;

  if (req.method === 'GET' && pathname === '/api/registry') {
    const registry = fs.readFileSync(REGISTRY_PATH, 'utf8');
    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    res.end(registry);

    return;
  }

  if (req.method === 'GET' && pathname === '/api/sse') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    });
    res.write(`data: ${JSON.stringify({ message: 'SSE connected. Waiting for installation...', type: 'info' })}\n\n`);
    sseClients.push(res);

    req.on('close', () => {
      sseClients = sseClients.filter(c => c !== res);
    });

    return;
  }

  if (req.method === 'POST' && pathname === '/api/install') {
    let body = '';
    req.on('data', chunk => {
 body += chunk; 
});
    req.on('end', () => {
      try {
        const config = JSON.parse(body);
        installedTargetPath = path.resolve(config.targetPath);
        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify({ status: 'started' }));

        setTimeout(() => {
          const result = runInstallation(config, broadcastLog);
          broadcastLog(JSON.stringify(result), 'result');
        }, 300);
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });

    return;
  }

  if (req.method === 'POST' && pathname === '/api/open-dashboard') {
    let body = '';
    req.on('data', chunk => {
 body += chunk; 
});
    req.on('end', () => {
      try {
        const payload = body ? JSON.parse(body) : {};
        const target = payload.targetPath || installedTargetPath;
        let dashPath = target ? path.join(path.resolve(target), 'SAKAAI', 'dashboard', 'index.html') : null;

        if (!dashPath || !fs.existsSync(dashPath)) {
          dashPath = path.join(WORKSPACE_ROOT, 'SAKAAI', 'dashboard', 'index.html');
        }

        if (!fs.existsSync(dashPath)) {
          dashPath = path.join(WORKSPACE_ROOT, 'dashboard', 'index.html');
        }

        if (fs.existsSync(dashPath)) {
          openBrowser(`file:///${dashPath.replace(/\\/g, '/')}`);
          res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
          res.end(JSON.stringify({ success: true, path: dashPath }));
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
          res.end(JSON.stringify({ success: false, message: 'Dashboard file not found' }));
        }
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify({ success: false, message: err.message }));
      }
    });

    return;
  }

  if (req.method === 'POST' && pathname === '/api/validate-path') {
    let body = '';
    req.on('data', chunk => {
 body += chunk; 
});
    req.on('end', () => {
      try {
        const { targetPath } = JSON.parse(body);
        const resolved = path.resolve(targetPath);
        const exists = fs.existsSync(resolved);
        const parentExists = fs.existsSync(path.dirname(resolved));
        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify({
          valid: parentExists,
          resolved,
          exists,
          parentExists,
          message: parentExists
            ? (exists ? 'Directory exists. SAKAAI subfolder will be created inside.' : 'Directory will be created.')
            : 'Parent directory does not exist. Please check the path.'
        }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ valid: false, message: err.message }));
      }
    });

    return;
  }

  // GET /api/dashboard/status
  if (req.method === 'GET' && pathname === '/api/dashboard/status') {
    const sakaaiDir = getActiveSAKAAIDir();
    const docs = getAllMarkdownFiles(sakaaiDir);

    let chainHash = crypto.createHash('sha256').update('SAKAAI-LIVE-GENESIS').digest('hex');

    for (const doc of docs) {
      const h = crypto.createHash('sha256').update(fs.readFileSync(doc)).digest('hex');
      chainHash = crypto.createHash('sha256').update(chainHash + h).digest('hex');
    }

    let activeObj = 'SAKAAI Enterprise Operational Portal & Active Telemetry';
    const ctxPath = path.join(sakaaiDir, '06-PROJECT-STATE', 'active-context.md');

    if (fs.existsSync(ctxPath)) {
      const ctxContent = fs.readFileSync(ctxPath, 'utf8');
      const match = ctxContent.match(/"active_objective"\s*:\s*"([^"]+)"/);

      if (match) {
activeObj = match[1];
}
    }

    const memoryUsage = process.memoryUsage();
    const uptimeSec = Math.floor(process.uptime());

    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    res.end(JSON.stringify({
      kernel_status: 'ACTIVE',
      total_docs: docs.length,
      valid_specs: docs.length,
      hash_chain: '#' + chainHash.substring(0, 10) + '...',
      full_hash_chain: chainHash,
      active_objective: activeObj,
      active_subsystem: '15-HUMAN-INTERACTIVE-PORTAL',
      memory_rss_mb: (memoryUsage.rss / (1024 * 1024)).toFixed(1),
      uptime_seconds: uptimeSec,
      target_path: installedTargetPath || sakaaiDir,
      latest_decision: lastApprovalDecision
    }));

    return;
  }

  // GET /api/dashboard/memory-search?q=query
  if (req.method === 'GET' && pathname === '/api/dashboard/memory-search') {
    const q = urlObj.searchParams.get('q') || '';
    const sakaaiDir = getActiveSAKAAIDir();
    const results = searchMarkdownFiles(q, sakaaiDir);

    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    res.end(JSON.stringify({ query: q, totalMatches: results.length, results }));

    return;
  }

  // POST /api/dashboard/approval
  if (req.method === 'POST' && pathname === '/api/dashboard/approval') {
    let body = '';
    req.on('data', chunk => {
 body += chunk; 
});
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        lastApprovalDecision = {
          decision: payload.decision,
          command: payload.command || 'git commit',
          timestamp: new Date().toISOString(),
          actor: 'Human Administrator (HITL Portal)'
        };
        broadcastLog(`Approval Gate Decision: ${payload.decision} for command "${payload.command}"`, 'info');
        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify({ success: true, decision: lastApprovalDecision }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });

    return;
  }

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end();

    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('API endpoint not found');
}

function findAvailablePort(base = 3456) {
  return new Promise((resolve) => {
    const testServer = http.createServer();
    testServer.listen(base, () => {
      testServer.close(() => resolve(base));
    });
    testServer.on('error', () => {
      resolve(findAvailablePort(base + 1));
    });
  });
}

function openBrowser(url) {
  const platform = process.platform;
  let cmd;

  if (platform === 'win32') {
    cmd = `start "" "${url}"`;
  } else if (platform === 'darwin') {
    cmd = `open "${url}"`;
  } else {
    cmd = `xdg-open "${url}"`;
  }

  exec(cmd, (err) => {
    if (err) {
      console.log(`  [!] Could not auto-open browser. Open manually: ${url}`);
    }
  });
}

async function startServer() {
  const port = await findAvailablePort(3456);

  const server = http.createServer((req, res) => {
    if (req.url.startsWith('/api/')) {
      handleAPI(req, res);
    } else {
      serveStatic(req, res);
    }
  });

  server.listen(port, () => {
    const url = `http://localhost:${port}`;
    console.log('\n======================================================');
    console.log('     SAKAAI INTERACTIVE WEB INSTALLER & DASHBOARD     ');
    console.log('======================================================');
    console.log(`  Server running at: ${url}`);
    console.log(`  Installer URL:     ${url}/`);
    console.log(`  Dashboard URL:     ${url}/dashboard/`);
    console.log('  Press Ctrl+C to stop server.');
    console.log('======================================================\n');
    openBrowser(url);
  });
}

module.exports = { startServer };
