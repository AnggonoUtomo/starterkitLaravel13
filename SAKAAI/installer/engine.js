/**
 * SAKAAI Installation Engine
 * Handles the actual file copying, template generation, and configuration.
 * Emits log events via callback for real-time streaming to the web UI or CLI.
 *
 * Document Reference: DEV001 - SAKAAI CLI Specification
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const WORKSPACE_ROOT = path.resolve(__dirname, '..');
let SAKAAI_SOURCE_DIR = path.join(WORKSPACE_ROOT, 'SAKAAI');

if (!fs.existsSync(SAKAAI_SOURCE_DIR) || !fs.existsSync(path.join(SAKAAI_SOURCE_DIR, '00-GOVERNANCE'))) {
  SAKAAI_SOURCE_DIR = WORKSPACE_ROOT;
}

function copyDirSync(src, dest, log) {
  let count = 0;

  if (!fs.existsSync(src)) {
    if (log) {
log(`  [SKIP] Source not found: ${path.basename(src)}`, 'warn');
}

    return 0;
  }

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      count += copyDirSync(srcPath, destPath, log);
    } else {
      fs.copyFileSync(srcPath, destPath);
      count++;
    }
  }

  return count;
}

function runInstallation(config, log) {
  const { targetPath, skillPacks, architectureTemplate } = config;
  const summary = {
    targetPath,
    architectureTemplate,
    skillPacks: [],
    foldersCopied: 0,
    filesCopied: 0,
    errors: [],
    hashChain: ''
  };

  try {
    log('━━━ Phase 1/5: Validating Target Path ━━━', 'phase');

    if (!targetPath || targetPath.trim() === '') {
      throw new Error('Target path is empty.');
    }

    const resolvedTarget = path.resolve(targetPath);

    if (!fs.existsSync(resolvedTarget)) {
      log(`  Creating directory: ${resolvedTarget}`, 'info');
      fs.mkdirSync(resolvedTarget, { recursive: true });
    }

    log(`  ✓ Target path validated: ${resolvedTarget}`, 'success');

    const sakaaiTargetDir = path.join(resolvedTarget, 'SAKAAI');

    log('━━━ Phase 2/5: Copying Core Specifications ━━━', 'phase');
    const coreFolders = [
      '00-GOVERNANCE', '01-CONSTITUTION', '02-SPECIFICATION', '03-CONTEXT',
      '04-WORKFLOW', '05-DECISION-MANAGEMENT', '06-PROJECT-STATE', '07-EXTENSION',
      '08-AUDIT', '09-IMPLEMENTATION', '10-ENGINEERING-SPECIFICATION',
      '11-TESTING-AND-EVALUATION', '12-INTEROPERABILITY-MCP', '13-OBSERVABILITY-METRICS',
      '14-DEVELOPER-TOOLING', '15-HUMAN-INTERACTIVE-PORTAL', '16-DISASTER-RECOVERY-AND-BACKUP',
      '17-COST-GOVERNANCE-AND-FINOPS', '18-CONTINUOUS-LEARNING-AND-RLHF',
      '19-LARAVEL-DDD-LITE', '20-GO-CLEAN-ARCHITECTURE', '21-DOCKER-DEVOPS',
      '22-NEXTJS-MODULAR', '23-PYTHON-FASTAPI',
      'dashboard', 'templates'
    ];

    for (const folder of coreFolders) {
      let src = path.join(SAKAAI_SOURCE_DIR, folder);

      if (!fs.existsSync(src)) {
        src = path.join(WORKSPACE_ROOT, folder);
      }

      const dest = path.join(sakaaiTargetDir, folder);

      if (fs.existsSync(src)) {
        const count = copyDirSync(src, dest, log);
        summary.filesCopied += count;
        summary.foldersCopied++;
        log(`  ✓ ${folder} (${count} files)`, 'success');
      }
    }

    const runnerFolders = ['cli', 'installer'];

    for (const folder of runnerFolders) {
      let src = path.join(WORKSPACE_ROOT, folder);

      if (!fs.existsSync(src)) {
        src = path.join(SAKAAI_SOURCE_DIR, folder);
      }

      const dest = path.join(sakaaiTargetDir, folder);

      if (fs.existsSync(src)) {
        const count = copyDirSync(src, dest, log);
        summary.filesCopied += count;
        summary.foldersCopied++;
        log(`  ✓ ${folder} (${count} files)`, 'success');
      }
    }

    const rootFiles = ['README.md', 'SAKAAI-IMPLEMENTATION-GUIDE.md', 'AGENTS.md', 'AGENTS-LARAVEL13.md', 'AGENTS-ROOT.md'];

    for (const file of rootFiles) {
      let src = path.join(SAKAAI_SOURCE_DIR, file);

      if (!fs.existsSync(src)) {
        src = path.join(WORKSPACE_ROOT, file);
      }

      const dest = path.join(sakaaiTargetDir, file);

      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        summary.filesCopied++;
      }
    }

    log(`  ✓ Core root files copied (${rootFiles.length})`, 'success');

    log('━━━ Phase 3/5: Installing Skill Packs ━━━', 'phase');
    const registryPath = path.join(__dirname, 'registry.json');
    const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));

    for (const packId of (skillPacks || [])) {
      const pack = registry.skillPacks.find(p => p.id === packId);

      if (!pack) {
        log(`  [WARN] Skill pack "${packId}" not found in registry.`, 'warn');
        continue;
      }

      let srcFolder = path.join(SAKAAI_SOURCE_DIR, pack.folder);

      if (!fs.existsSync(srcFolder)) {
        srcFolder = path.join(WORKSPACE_ROOT, pack.folder);
      }

      const destFolder = path.join(sakaaiTargetDir, pack.folder);

      if (fs.existsSync(srcFolder)) {
        const count = copyDirSync(srcFolder, destFolder, log);
        summary.filesCopied += count;
        summary.skillPacks.push({ id: packId, author: pack.author, skills: pack.skillCount, files: count });
        log(`  ✓ ${pack.author} Pack (${pack.skillCount} skills, ${count} files)`, 'success');
      } else {
        log(`  [WARN] Skill folder not found: ${srcFolder}`, 'warn');
      }
    }

    let existingSkillsJson = path.join(SAKAAI_SOURCE_DIR, '.agents', 'skills.json');

    if (!fs.existsSync(existingSkillsJson)) {
      existingSkillsJson = path.join(WORKSPACE_ROOT, '.agents', 'skills.json');
    }

    const skillsJsonDest = path.join(sakaaiTargetDir, '.agents', 'skills.json');

    if (fs.existsSync(existingSkillsJson)) {
      if (!fs.existsSync(path.dirname(skillsJsonDest))) {
        fs.mkdirSync(path.dirname(skillsJsonDest), { recursive: true });
      }

      fs.copyFileSync(existingSkillsJson, skillsJsonDest);
    }

    log('━━━ Phase 4/5: Applying Architecture Template ━━━', 'phase');
    const template = registry.architectureTemplates.find(t => t.id === architectureTemplate);

    if (template) {
      let specSrc = path.join(SAKAAI_SOURCE_DIR, template.specFolder);

      if (!fs.existsSync(specSrc)) {
        specSrc = path.join(WORKSPACE_ROOT, template.specFolder);
      }

      const specDest = path.join(sakaaiTargetDir, template.specFolder);

      if (fs.existsSync(specSrc)) {
        const count = copyDirSync(specSrc, specDest, log);
        summary.filesCopied += count;
        log(`  ✓ Architecture spec: ${template.specFolder} (${count} files)`, 'success');
      }

      let templateSrc = path.join(SAKAAI_SOURCE_DIR, template.templateFolder);

      if (!fs.existsSync(templateSrc)) {
        templateSrc = path.join(WORKSPACE_ROOT, template.templateFolder);
      }

      if (fs.existsSync(templateSrc)) {
        const templateAgents = path.join(templateSrc, 'AGENTS.md');

        if (fs.existsSync(templateAgents)) {
          const outerContent = fs.readFileSync(templateAgents, 'utf8');
          fs.writeFileSync(path.join(resolvedTarget, 'AGENTS.md'), outerContent, 'utf8');
          log(`  ✓ Outer AGENTS.md generated from ${template.name} template`, 'success');
        }
      } else {
        const fallbackGate = generateFallbackGate(template);
        fs.writeFileSync(path.join(resolvedTarget, 'AGENTS.md'), fallbackGate, 'utf8');
        log(`  ✓ Outer AGENTS.md generated (fallback for ${template.name})`, 'success');
      }

      log(`  ✓ Architecture template "${template.name}" applied`, 'success');
    } else {
      let rootGateSrc = path.join(SAKAAI_SOURCE_DIR, 'AGENTS-ROOT.md');

      if (!fs.existsSync(rootGateSrc)) {
        rootGateSrc = path.join(WORKSPACE_ROOT, 'AGENTS-ROOT.md');
      }

      if (fs.existsSync(rootGateSrc)) {
        fs.copyFileSync(rootGateSrc, path.join(resolvedTarget, 'AGENTS.md'));
        log('  ✓ Standard AGENTS.md outer gate generated', 'success');
      }
    }

    log('━━━ Phase 5/5: Verifying Installation ━━━', 'phase');

    const installedDocs = getAllMarkdownFiles(sakaaiTargetDir);
    log(`  Total installed documents: ${installedDocs.length}`, 'info');

    let chainHash = crypto.createHash('sha256').update('SAKAAI-INSTALL-GENESIS').digest('hex');

    for (const doc of installedDocs) {
      const fileHash = crypto.createHash('sha256').update(fs.readFileSync(doc)).digest('hex');
      chainHash = crypto.createHash('sha256').update(chainHash + fileHash).digest('hex');
    }

    summary.hashChain = chainHash;
    log(`  Installation hash: ${chainHash.substring(0, 32)}...`, 'info');

    const outerAgentsExists = fs.existsSync(path.join(resolvedTarget, 'AGENTS.md'));

    if (outerAgentsExists) {
      log('  ✓ Outer AGENTS.md gate: PRESENT', 'success');
    } else {
      log('  ✗ Outer AGENTS.md gate: MISSING', 'error');
      summary.errors.push('Outer AGENTS.md was not generated.');
    }

    log('', 'info');
    log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'phase');
    log('  SAKAAI INSTALLATION COMPLETE', 'phase');
    log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'phase');
    log(`  Target     : ${resolvedTarget}`, 'info');
    log(`  Folders    : ${summary.foldersCopied}`, 'info');
    log(`  Files      : ${summary.filesCopied}`, 'info');
    log(`  Documents  : ${installedDocs.length}`, 'info');
    log(`  Template   : ${template ? template.name : 'Standard'}`, 'info');
    log(`  Skills     : ${summary.skillPacks.map(s => s.author).join(', ') || 'None'}`, 'info');
    log(`  Errors     : ${summary.errors.length}`, summary.errors.length > 0 ? 'error' : 'info');
    log(`  Hash       : ${chainHash.substring(0, 16)}...`, 'info');

    summary.totalDocs = installedDocs.length;
    summary.success = summary.errors.length === 0;

    return summary;

  } catch (err) {
    log(`\n  ✗ FATAL ERROR: ${err.message}`, 'error');
    log(`  Stack: ${err.stack}`, 'error');
    summary.errors.push(err.message);
    summary.success = false;

    return summary;
  }
}

function generateFallbackGate(template) {
  return `# Project Master Entry Point (SAKAAI Governed — ${template.name})

**Document ID:** DEV014  
**Version:** 1.0  
**Status:** ACTIVE  
**Category:** Developer Tooling & Outer Root Gate  
**Reference:** UUD001 - SAKAAI Unified Architecture v1.0

---

> [!IMPORTANT]
> **PERHATIAN UNTUK AI AGENT (Antigravity IDE / Gemini / Claude / Cursor)**:
> Proyek ini berada di bawah kendali **SAKAAI (Structural Pillar OS for AI)**.
> Architecture template: **${template.name}** (${template.tags.join(', ')}).
> Seluruh aktivitas penalaran, perancangan, dan penulisan kode WAJIB mematuhi spesifikasi SAKAAI di folder \`./SAKAAI/\`.

---

# 1. Pintu Gerbang Utama & Lokasi Spesifikasi SAKAAI

1. **Master SAKAAI System Gate**: [SAKAAI/AGENTS.md](./SAKAAI/AGENTS.md) (\`GOV000\`)
2. **Architecture Specification**: [SAKAAI/${template.specFolder}/](./SAKAAI/${template.specFolder}/)
3. **Governance & Control Policy**: [SAKAAI/00-GOVERNANCE/003-CONTROL-POLICY.md](./SAKAAI/00-GOVERNANCE/003-CONTROL-POLICY.md) (\`GOV003\`)
4. **Code Generation Spec**: [SAKAAI/02-SPECIFICATION/006-CODE-GENERATION-SPECIFICATION.md](./SAKAAI/02-SPECIFICATION/006-CODE-GENERATION-SPECIFICATION.md) (\`SPC006\`) — **DILARANG PLACEHOLDER // TODO**

---

# 2. Execution Pipeline

\`\`\`
[User Input] ---> [Read AGENTS.md] ---> [Read SAKAAI Specs] ---> [Plan First] ---> [Execute Code] ---> [Verify]
\`\`\`
`;
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

module.exports = { runInstallation };
