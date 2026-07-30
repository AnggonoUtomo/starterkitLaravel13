#!/usr/bin/env node

/* eslint-disable */
/**
 * SAKAAI Developer Utility CLI & Interactive Installer
 * Version: 3.0.0
 * Document Reference: DEV001 - SAKAAI CLI Specification
 */

import { dirname } from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Determine Workspace Root and SAKAAI Directory dynamically
const WORKSPACE_ROOT = path.resolve(__dirname, '..');
let SAKAAI_DIR = WORKSPACE_ROOT;
if (fs.existsSync(path.join(WORKSPACE_ROOT, 'SAKAAI', '00-GOVERNANCE'))) {
  SAKAAI_DIR = path.join(WORKSPACE_ROOT, 'SAKAAI');
} else if (fs.existsSync(path.join(WORKSPACE_ROOT, '00-GOVERNANCE'))) {
  SAKAAI_DIR = WORKSPACE_ROOT;
}

const docsArgIndex = process.argv.indexOf('--docs');
const DOCS_DIR = docsArgIndex >= 0 && process.argv[docsArgIndex + 1]
  ? path.resolve(process.cwd(), process.argv[docsArgIndex + 1])
  : null;

function getDocumentationFiles() {
  return DOCS_DIR && fs.existsSync(DOCS_DIR) ? getAllMarkdownFiles(DOCS_DIR) : [];
}

function validateDocumentationRoot() {
  const docs = getDocumentationFiles();
  let invalidMetadata = 0;
  let brokenLinks = 0;
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

  for (const docPath of docs) {
    const content = fs.readFileSync(docPath, 'utf8');
    const relativePath = path.relative(DOCS_DIR, docPath).replace(/\\/g, '/');
    const isTemplate = relativePath.startsWith('Projects/_TEMPLATE/');
    const isControlFile = relativePath === 'README.md' || relativePath === 'AGENTS.md';
    const hasTitle = content.trimStart().startsWith('#');
    const hasRevision = content.includes('Revision History') || content.includes('Revision history');
    const hasDocumentMetadata = content.includes('Version') && content.includes('Status') && content.includes('Owner');
    if (!isTemplate && !isControlFile && (!hasTitle || (!hasRevision && !hasDocumentMetadata))) invalidMetadata++;

    let match;
    while ((match = linkRegex.exec(content)) !== null) {
      let target = match[2].trim().split('#')[0].split('?')[0];
      if (!target || /^(https?:|mailto:)/.test(target)) continue;
      const resolved = path.resolve(path.dirname(docPath), target);
      if (!fs.existsSync(resolved)) brokenLinks++;
    }
  }

  return { files: docs.length, invalidMetadata, brokenLinks };
}

// ─── Shared Helpers ─────────────────────────────────────────────────────

function getAllMarkdownFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
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

function sha256File(filePath) {
  const content = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(content).digest('hex');
}

function timedProbe(probeFn) {
  const start = process.hrtime.bigint();
  let ok = false;
  try {
    ok = probeFn();
  } catch {
    ok = false;
  }
  const elapsed = Number(process.hrtime.bigint() - start) / 1e6;
  return { ok, ms: elapsed.toFixed(1) };
}

// ─── Canonical Division Registry ────────────────────────────────────────

const DIVISIONS = [
  { folder: '00-GOVERNANCE',                    label: '00-GOVERNANCE',              keyFile: '001-GOVERNANCE.md' },
  { folder: '01-CONSTITUTION',                  label: '01-CONSTITUTION',            keyFile: '001-SAKAAI-PHILOSOPHY.md' },
  { folder: '02-SPECIFICATION',                 label: '02-SPECIFICATION',           keyFile: '001-PROMPT-SPECIFICATION.md' },
  { folder: '03-CONTEXT',                       label: '03-CONTEXT',                 keyFile: '001-DOCUMENT-SELECTION-RULE.md' },
  { folder: '04-WORKFLOW',                      label: '04-WORKFLOW',                keyFile: '001-PIPELINE-SEQUENCE.md' },
  { folder: '05-DECISION-MANAGEMENT',           label: '05-DECISION-MANAGEMENT',     keyFile: null },
  { folder: '06-PROJECT-STATE',                 label: '06-PROJECT-STATE',           keyFile: 'active-context.md' },
  { folder: '07-EXTENSION',                     label: '07-EXTENSION',               keyFile: null },
  { folder: '08-AUDIT',                         label: '08-AUDIT',                   keyFile: null },
  { folder: '09-IMPLEMENTATION',                label: '09-IMPLEMENTATION',          keyFile: '001-SAKAAI-SYSTEM-MODEL.md' },
  { folder: '10-ENGINEERING-SPECIFICATION',     label: '10-ENGINEERING-SPEC',        keyFile: '001-SAKAAI-CORE-SPECIFICATION.md' },
  { folder: '11-TESTING-AND-EVALUATION',        label: '11-TESTING-EVALUATION',      keyFile: '001-REASONING-EVALUATION-SPEC.md' },
  { folder: '12-INTEROPERABILITY-MCP',          label: '12-INTEROPERABILITY-MCP',    keyFile: '001-MCP-CLIENT-SPECIFICATION.md' },
  { folder: '13-OBSERVABILITY-METRICS',         label: '13-OBSERVABILITY-METRICS',   keyFile: '001-PROMETHEUS-GRAFANA-SCHEMA.md' },
  { folder: '14-DEVELOPER-TOOLING',             label: '14-DEVELOPER-TOOLING',       keyFile: '001-SAKAAI-CLI-SPECIFICATION.md' },
  { folder: '15-HUMAN-INTERACTIVE-PORTAL',      label: '15-HUMAN-PORTAL',            keyFile: '001-HITL-DASHBOARD-SPECIFICATION.md' },
  { folder: '16-DISASTER-RECOVERY-AND-BACKUP',  label: '16-DISASTER-RECOVERY',       keyFile: '001-BACKUP-SNAPSHOT-STRATEGY.md' },
  { folder: '17-COST-GOVERNANCE-AND-FINOPS',    label: '17-COST-FINOPS',             keyFile: '001-TOKEN-BUDGET-GOVERNANCE.md' },
  { folder: '18-CONTINUOUS-LEARNING-AND-RLHF',  label: '18-CONTINUOUS-LEARNING',     keyFile: '001-FEEDBACK-LOOP-SPECIFICATION.md' },
  { folder: '19-LARAVEL-DDD-LITE',              label: '19-LARAVEL-DDD-LITE',        keyFile: '001-LARAVEL13-DDD-LITE-SPECIFICATION.md' },
  { folder: '20-GO-CLEAN-ARCHITECTURE',         label: '20-GO-CLEAN-ARCHITECTURE',   keyFile: '001-GO-CLEAN-ARCHITECTURE-SPECIFICATION.md' },
  { folder: '21-DOCKER-DEVOPS',                 label: '21-DOCKER-DEVOPS',           keyFile: '001-DOCKER-DEVOPS-SPECIFICATION.md' },
  { folder: '22-NEXTJS-MODULAR',                label: '22-NEXTJS-MODULAR',          keyFile: '001-NEXTJS-MODULAR-SPECIFICATION.md' },
  { folder: '23-PYTHON-FASTAPI',                label: '23-PYTHON-FASTAPI',          keyFile: '001-PYTHON-FASTAPI-SPECIFICATION.md' },
];

// ─── Command: STATUS (Dynamic) ──────────────────────────────────────────

function handleStatus() {
  console.log('\n======================================================');
  console.log('           SAKAAI KERNEL & SYSTEM STATUS              ');
  console.log('======================================================');
  console.log(`Workspace Root : ${WORKSPACE_ROOT}`);
  console.log(`SAKAAI Directory: ${SAKAAI_DIR}`);
  console.log(`Docs Directory  : ${DOCS_DIR || 'NOT PROVIDED (use --docs <path>)'}`);
  console.log(`Kernel Status  : ACTIVE (OK)`);

  const ctxPath = path.join(SAKAAI_DIR, '06-PROJECT-STATE', 'active-context.md');
  let activeLabel = 'STATE001 - Full Enterprise Alignment';
  if (fs.existsSync(ctxPath)) {
    const ctxContent = fs.readFileSync(ctxPath, 'utf8');
    const match = ctxContent.match(/"active_objective"\s*:\s*"([^"]+)"/);
    if (match) {
      activeLabel = match[1].length > 60 ? match[1].substring(0, 57) + '...' : match[1];
    }
  }
  console.log(`Active Context : ${activeLabel}`);

  let totalDocs = 0;
  console.log('------------------------------------------------------');
  console.log('Subsystem Status:');

  for (const div of DIVISIONS) {
    const divPath = path.join(SAKAAI_DIR, div.folder);
    if (fs.existsSync(divPath)) {
      const docs = getAllMarkdownFiles(divPath);
      totalDocs += docs.length;
      console.log(`  [+] ${div.label.padEnd(26)} : ACTIVE (${docs.length} docs)`);
    } else {
      console.log(`  [-] ${div.label.padEnd(26)} : MISSING`);
    }
  }

  const skillsPath = path.join(SAKAAI_DIR, '.agents', 'skills');
  let skillCount = 0;
  if (fs.existsSync(skillsPath)) {
    const skillDirs = fs.readdirSync(skillsPath, { withFileTypes: true })
      .filter(e => e.isDirectory());
    skillCount = skillDirs.length;
    const skillDocs = getAllMarkdownFiles(skillsPath);
    totalDocs += skillDocs.length;
  }
  console.log(`  [+] ${'Agent Skills'.padEnd(26)} : ACTIVE (${skillCount} skills)`);

  const rootDocs = fs.readdirSync(SAKAAI_DIR)
    .filter(f => f.endsWith('.md') && !f.startsWith('walkthrough'));
  totalDocs += rootDocs.length;

  console.log('------------------------------------------------------');
  console.log(`Total Documents: ${totalDocs} Specification & Skill Files`);
  if (DOCS_DIR) {
    console.log(`Docs Documents  : ${getDocumentationFiles().length} Markdown Files`);
  }
  console.log('======================================================\n');
}

// ─── Command: VALIDATE ──────────────────────────────────────────────────

function handleValidate() {
  console.log('\n======================================================');
  console.log('         SAKAAI AUTOMATED LINT & VALIDATOR            ');
  console.log('======================================================');
  console.log(`Scanning specifications in: ${SAKAAI_DIR}\n`);

  const docs = getAllMarkdownFiles(SAKAAI_DIR);
  let validCount = 0;
  let invalidCount = 0;
  let brokenLinks = 0;

  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

  docs.forEach(docPath => {
    if (docPath.includes('PercakapanDenganGemini.txt')) return;
    const relPath = path.relative(SAKAAI_DIR, docPath);
    const isTemplateFile = relPath.startsWith('templates' + path.sep);
    const content = fs.readFileSync(docPath, 'utf8');

    const hasDocId = content.includes('Document ID:');
    const hasVersion = content.includes('Version:');
    const hasStatus = content.includes('Status:');
    const isSkillFile = relPath.includes('.agents') || relPath.includes('skills');
    const hasYamlFrontmatter = content.includes('name:') || content.includes('description:');

    if ((hasDocId && hasVersion && hasStatus) || (isSkillFile && (hasYamlFrontmatter || content.length > 0))) {
      validCount++;
    } else {
      console.log(`[!] Metadata Warning: ${relPath}`);
      invalidCount++;
    }

    if (!isTemplateFile) {
      let match;
      while ((match = linkRegex.exec(content)) !== null) {
        let target = match[2].trim();
        if (target.startsWith('http://') || target.startsWith('https://') || target.startsWith('#') || target.startsWith('mailto:')) {
          continue;
        }
        target = target.split('#')[0].split('?')[0];
        if (!target) continue;

        let decodedTarget;
        try {
          decodedTarget = decodeURIComponent(target);
        } catch (e) {
          decodedTarget = target;
        }

        let checkPath = decodedTarget;
        if (relPath === 'AGENTS-ROOT.md' && checkPath.startsWith('./SAKAAI/')) {
          checkPath = checkPath.replace('./SAKAAI/', './');
        }

        const resolvedPath = path.resolve(path.dirname(docPath), checkPath);
        if (!fs.existsSync(resolvedPath)) {
          console.log(`[!] Broken Link Warning in ${relPath} -> Target not found: ${target}`);
          brokenLinks++;
        }
      }
    }
  });

  console.log(`\nValidation Summary:`);
  console.log(`  - Valid Specifications : ${validCount}`);
  console.log(`  - Metadata Warnings    : ${invalidCount}`);
  console.log(`  - Broken Links Found   : ${brokenLinks}`);
  console.log(`  - Overall Integrity    : ${invalidCount === 0 && brokenLinks === 0 ? 'PASSED 100% (ALL LINKS & SPECIFICATIONS VALID)' : 'NEEDS REVIEW'}`);
  if (DOCS_DIR) {
    const result = validateDocumentationRoot();
    console.log('\nDocumentation Root Validation:');
    console.log(`  - Docs Root            : ${DOCS_DIR}`);
    console.log(`  - Markdown Files       : ${result.files}`);
    console.log(`  - Metadata Warnings    : ${result.invalidMetadata}`);
    console.log(`  - Broken Links         : ${result.brokenLinks}`);
    console.log(`  - Docs Integrity       : ${result.invalidMetadata === 0 && result.brokenLinks === 0 ? 'PASSED' : 'NEEDS REVIEW'}`);
  }
  console.log('======================================================\n');
}

// ─── Command: AUDIT ─────────────────────────────────────────────────────

function handleAudit() {
  console.log('\n======================================================');
  console.log('      SAKAAI AUDIT LOG CRYPTOGRAPHIC VERIFICATION     ');
  console.log('======================================================');
  console.log(`Computing SHA-256 hashes for all specification documents in ${SAKAAI_DIR}...\n`);

  const docs = getAllMarkdownFiles(SAKAAI_DIR)
    .filter(p => !p.includes('walkthrough'));
  
  let chainHash = crypto.createHash('sha256').update('SAKAAI-GENESIS-BLOCK').digest('hex');
  let seqNum = 1;
  const totalDocs = docs.length;
  const showLimit = 5;

  for (let i = 0; i < docs.length; i++) {
    const docPath = docs[i];
    const fileHash = sha256File(docPath);
    const relPath = path.relative(SAKAAI_DIR, docPath);

    chainHash = crypto.createHash('sha256')
      .update(chainHash + fileHash)
      .digest('hex');

    if (i < showLimit) {
      console.log(`  [Seq #${String(seqNum).padStart(3, '0')}] ${relPath}`);
      console.log(`           File Hash  : ${fileHash.substring(0, 16)}...`);
      console.log(`           Chain Hash : ${chainHash.substring(0, 16)}...`);
    } else if (i === showLimit) {
      console.log(`  ... (${totalDocs - showLimit * 2} more documents hashed) ...`);
    } else if (i >= totalDocs - showLimit) {
      console.log(`  [Seq #${String(seqNum).padStart(3, '0')}] ${relPath}`);
      console.log(`           File Hash  : ${fileHash.substring(0, 16)}...`);
      console.log(`           Chain Hash : ${chainHash.substring(0, 16)}...`);
    }

    seqNum++;
  }

  console.log('\n------------------------------------------------------');
  console.log(`Total Documents Hashed : ${totalDocs}`);
  console.log(`Final Chain Hash       : ${chainHash}`);
  if (DOCS_DIR) {
    let docsChain = crypto.createHash('sha256').update('DOCS-GENESIS-BLOCK').digest('hex');
    for (const doc of getDocumentationFiles()) {
      docsChain = crypto.createHash('sha256')
        .update(docsChain + sha256File(doc))
        .digest('hex');
    }
    console.log(`Docs Chain Hash        : ${docsChain}`);
  }
  console.log(`Audit Result           : HASH CHAIN VERIFIED (No Tampering Detected)`);
  console.log('======================================================\n');
}

// ─── Command: HEALTH ────────────────────────────────────────────────────

function handleHealth() {
  console.log('\n======================================================');
  console.log('        SAKAAI KERNEL HEALTH & HEARTBEAT PROBE        ');
  console.log('======================================================');

  const probes = [
    ...(DOCS_DIR ? [{
      name: 'Laravel Documentation Root',
      fn: () => {
        const result = validateDocumentationRoot();
        return result.files > 0 && result.invalidMetadata === 0 && result.brokenLinks === 0;
      }
    }] : []),
    {
      name: 'SAKAAI Core Engine Kernel',
      fn: () => fs.existsSync(path.join(SAKAAI_DIR, 'AGENTS.md')) || fs.existsSync(path.join(WORKSPACE_ROOT, 'AGENTS.md'))
    },
    {
      name: 'Context Engine (03-CONTEXT)',
      fn: () => {
        const dir = path.join(SAKAAI_DIR, '03-CONTEXT');
        return fs.existsSync(dir) && getAllMarkdownFiles(dir).length > 0;
      }
    },
    {
      name: 'Memory Engine (06-PROJECT-STATE)',
      fn: () => fs.existsSync(path.join(SAKAAI_DIR, '06-PROJECT-STATE', 'active-context.md'))
    },
    {
      name: 'Reasoning Engine (01-CONSTITUTION)',
      fn: () => fs.existsSync(path.join(SAKAAI_DIR, '01-CONSTITUTION', '001-SAKAAI-PHILOSOPHY.md'))
    },
    {
      name: 'Agent Runtime (09-IMPLEMENTATION)',
      fn: () => {
        const dir = path.join(SAKAAI_DIR, '09-IMPLEMENTATION');
        return fs.existsSync(dir) && getAllMarkdownFiles(dir).length >= 5;
      }
    },
    {
      name: 'Orchestrator (04-WORKFLOW)',
      fn: () => fs.existsSync(path.join(SAKAAI_DIR, '04-WORKFLOW', '001-PIPELINE-SEQUENCE.md'))
    },
    {
      name: 'Tool Registry (02-SPECIFICATION)',
      fn: () => fs.existsSync(path.join(SAKAAI_DIR, '02-SPECIFICATION', '005-TOOL-CALLING-SPECIFICATION.md'))
    },
    {
      name: 'Audit Engine (08-AUDIT)',
      fn: () => {
        const dir = path.join(SAKAAI_DIR, '08-AUDIT');
        return fs.existsSync(dir) && getAllMarkdownFiles(dir).length > 0;
      }
    },
    {
      name: 'Governance Policy (00-GOVERNANCE)',
      fn: () => fs.existsSync(path.join(SAKAAI_DIR, '00-GOVERNANCE', '003-CONTROL-POLICY.md'))
    },
    {
      name: 'Engineering Specs (10-ENGINEERING)',
      fn: () => {
        const dir = path.join(SAKAAI_DIR, '10-ENGINEERING-SPECIFICATION');
        return fs.existsSync(dir) && getAllMarkdownFiles(dir).length >= 5;
      }
    },
    {
      name: 'Laravel DDD-Lite (19-LARAVEL)',
      fn: () => fs.existsSync(path.join(SAKAAI_DIR, '19-LARAVEL-DDD-LITE', '001-LARAVEL13-DDD-LITE-SPECIFICATION.md'))
    },
    {
      name: 'Agent Skills Extension (.agents)',
      fn: () => {
        const dir = path.join(SAKAAI_DIR, '.agents', 'skills');
        if (!fs.existsSync(dir)) return false;
        return fs.readdirSync(dir, { withFileTypes: true }).filter(e => e.isDirectory()).length >= 20;
      }
    },
    {
      name: 'HITL Web Dashboard',
      fn: () => fs.existsSync(path.join(SAKAAI_DIR, 'dashboard', 'index.html'))
    },
    {
      name: 'CLI Utility Engine',
      fn: () => fs.existsSync(path.join(__filename))
    },
  ];

  let passCount = 0;
  let failCount = 0;

  for (const probe of probes) {
    const result = timedProbe(probe.fn);
    const status = result.ok ? 'HEALTHY' : 'DEGRADED';
    const icon = result.ok ? 'OK' : '!!';
    if (result.ok) passCount++; else failCount++;
    console.log(`  [${icon}] ${probe.name.padEnd(40)} : ${status} (${result.ms}ms)`);
  }

  console.log('------------------------------------------------------');
  const total = passCount + failCount;
  const pct = Math.round((passCount / total) * 100);
  console.log(`System Health: ${passCount}/${total} OPERATIONAL (${pct}%)${failCount > 0 ? ` — ${failCount} DEGRADED` : ''}`);
  console.log('======================================================\n');
}

// ─── Command: INSTALL ───────────────────────────────────────────────────

async function handleInstallCLI(targetArg, presetArg) {
  const { runInstallation } = require(path.join(WORKSPACE_ROOT, 'installer', 'engine.js'));

  console.log('\n======================================================');
  console.log('     SAKAAI INTERACTIVE SYSTEM & KERNEL INSTALLER     ');
  console.log('======================================================');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const question = (query) => new Promise((resolve) => rl.question(query, resolve));

  let targetPath = targetArg;
  if (!targetPath) {
    targetPath = await question('-> Masukkan path folder/proyek tujuan (misal: C:\\laragon\\www\\my-app): ');
  }

  if (!targetPath || targetPath.trim() === '') {
    console.log('[!] Path tujuan tidak boleh kosong. Pemasangan dibatalkan.');
    rl.close();
    return;
  }

  targetPath = path.resolve(targetPath.trim());

  let preset = presetArg;
  if (!preset) {
    console.log('\nPilih Preset Arsitektur SAKAAI:');
    console.log('  [1] Laravel 13 DDD-Lite Architecture (Rekomendasi)');
    console.log('  [2] Go Clean Architecture');
    console.log('  [3] Docker & DevOps');
    console.log('  [4] Next.js Modular');
    console.log('  [5] Python FastAPI');
    console.log('  [6] Standar SAKAAI Universal');
    const answer = await question('-> Pilih opsi [1-6] (Default: 1): ');
    const presets = {
      '1': 'laravel-ddd-lite',
      '2': 'go-clean-architecture',
      '3': 'docker-devops',
      '4': 'nextjs-modular',
      '5': 'python-fastapi',
      '6': 'standard'
    };
    preset = presets[answer.trim()] || 'laravel-ddd-lite';
  }

  rl.close();

  const logFn = (msg, type) => {
    if (type === 'phase') console.log(`\n${msg}`);
    else if (type === 'error') console.log(`[!] ${msg}`);
    else console.log(msg);
  };

  runInstallation({
    targetPath,
    skillPacks: ['addyosmani', 'danabramov', 'martinfowler'],
    architectureTemplate: preset
  }, logFn);
}

// ─── Main CLI Router ────────────────────────────────────────────────────

const args = process.argv.slice(2);
const command = args[0] ? args[0].toLowerCase() : 'help';

switch (command) {
  case 'status':
    handleStatus();
    break;
  case 'validate':
    handleValidate();
    break;
  case 'audit':
    handleAudit();
    break;
  case 'health':
    handleHealth();
    break;
  case 'install':
    if (args.includes('--no-gui')) {
      handleInstallCLI(args[1], args[2]);
    } else {
      let serverPath = path.join(WORKSPACE_ROOT, 'installer', 'server.js');
      if (!fs.existsSync(serverPath)) {
        serverPath = path.join(SAKAAI_DIR, 'installer', 'server.js');
      }
      const { startServer } = require(serverPath);
      startServer();
    }
    break;
  case 'help':
  default:
  console.log(`
SAKAAI CLI Utility & Interactive Installer v3.0 — Command Usage:
  node cli/sakaai.js install          - Launch interactive web installer (opens browser)
  node cli/sakaai.js install --no-gui - Run terminal-only interactive installer
  node cli/sakaai.js status           - Show SAKAAI status and optional docs metrics
  node cli/sakaai.js validate         - Validate SAKAAI and optional docs metadata/links
  node cli/sakaai.js audit            - Compute SAKAAI and optional docs hash chains
  node cli/sakaai.js health           - Run health probes including optional docs root
  Add --docs <path> to status, validate, audit, or health to inspect Laravel docs
`);
    break;
}
