#!/usr/bin/env node

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import readline from 'node:readline/promises';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const command = args[0] && !args[0].startsWith('-') ? args[0] : 'install';
let options = parseArgs(args);
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const registry = readRegistry();

const personaPresets = {
  starter: { bundle: 'awakening' },
  engineer: { bundle: 'engineering-pro' },
  fullstack: { bundle: 'software' },
  'ai-researcher': { bundle: 'ai-research-advanced' },
  'product-lead': { bundle: 'pm-strategy' },
  growth: { bundle: 'marketing-growth-pro' },
  'security-devops': { bundle: 'security-devops-pro' },
  platform: { bundle: 'platform-engineering-pro' },
  quality: { bundle: 'quality-engineering-pro' },
  governance: { bundle: 'governance-compliance' },
  release: { bundle: 'release' },
  novice: { bundle: 'novice-guild' },
  apprentice: { bundle: 'apprentice-guild' },
  journeyman: { bundle: 'journeyman-guild' }
};

const targets = {
  copilot: path.join(os.homedir(), '.shadow-guild', 'targets', 'copilot'),
  'claude-code': path.join(os.homedir(), '.shadow-guild', 'targets', 'claude-code'),
  codex: path.join(os.homedir(), '.shadow-guild', 'targets', 'codex'),
  cursor: path.join(os.homedir(), '.shadow-guild', 'targets', 'cursor')
};

if (command === 'list') {
  printCatalog();
  process.exit(0);
}

await main();

async function main() {
  if (command !== 'install') {
    printHelp(`Unknown command: ${command}`);
    process.exit(1);
  }

  if (shouldRunInteractive(options)) {
    options = await runInteractiveWizard(options);
  }

  options = applyPersonaPreset(options);

  const target = options.target || 'copilot';
  const installRoot = targets[target] || path.join(os.homedir(), '.shadow-guild', 'targets', target);
  const selection = buildSelection(options);
  const selected = selection.items;

  if (selected.length === 0) {
    printHelp(`No registry items matched filters: ${selection.label}`);
    process.exit(1);
  }

  if (!options['dry-run']) {
    fs.mkdirSync(installRoot, { recursive: true });
    for (const item of selected) {
      copyItem(item, installRoot);
    }
  }

  const manifest = {
    installedAt: new Date().toISOString(),
    target,
    selector: selection.label,
    dryRun: Boolean(options['dry-run']),
    selected: selected.map((item) => ({
      name: item.name,
      type: item.type,
      rank: item.rank,
      class: item.class,
      domain: item.domain,
      roles: item.roles,
      path: item.path
    })),
    source: repoRoot,
    note: 'Installed from inventory/registry.json.'
  };

  if (!options['dry-run']) {
    fs.writeFileSync(path.join(installRoot, 'shadow-guild-install.json'), JSON.stringify(manifest, null, 2));
  }

  console.log('Shadow Guild installer');
  console.log(`Target: ${target}`);
  console.log(`Selector: ${selection.label}`);
  console.log(`Install root: ${installRoot}`);
  if (options['dry-run']) {
    console.log('Mode: dry-run');
  }
  console.log('Selected assets:');
  for (const item of selected) {
    console.log(`- ${item.name} (${item.type}, ${item.rank.toUpperCase()}-Rank, ${item.class}, ${item.domain})`);
  }
  console.log(options['dry-run'] ? 'No files were copied.' : 'Install manifest written.');
}

function readRegistry() {
  const registryPath = path.join(repoRoot, 'inventory', 'registry.json');
  return JSON.parse(fs.readFileSync(registryPath, 'utf8'));
}

function buildSelection(parsedOptions) {
  const active = [];
  let selected = registry.items;

  if (parsedOptions.bundle) {
    const names = registry.bundles[parsedOptions.bundle] || [];
    selected = names.map((name) => registry.items.find((item) => item.name === name)).filter(Boolean);
    active.push(`bundle:${parsedOptions.bundle}`);
  }

  if (!parsedOptions.bundle && !parsedOptions.name && !parsedOptions.rank && !parsedOptions.class && !parsedOptions.domain && !parsedOptions.role) {
    const names = registry.bundles.awakening || [];
    selected = names.map((name) => registry.items.find((item) => item.name === name)).filter(Boolean);
    active.push('bundle:awakening');
  }

  if (parsedOptions.name) {
    selected = selected.filter((item) => item.name.toLowerCase() === String(parsedOptions.name).toLowerCase());
    active.push(`name:${parsedOptions.name}`);
  }

  if (parsedOptions.rank) {
    selected = selected.filter((item) => item.rank.toLowerCase() === String(parsedOptions.rank).toLowerCase());
    active.push(`rank:${parsedOptions.rank}`);
  }

  if (parsedOptions.class) {
    selected = selected.filter((item) => item.class.toLowerCase() === String(parsedOptions.class).toLowerCase());
    active.push(`class:${parsedOptions.class}`);
  }

  if (parsedOptions.domain) {
    selected = selected.filter((item) => item.domain.toLowerCase() === String(parsedOptions.domain).toLowerCase());
    active.push(`domain:${parsedOptions.domain}`);
  }

  if (parsedOptions.role) {
    selected = selected.filter((item) => Array.isArray(item.roles) && item.roles.map((role) => role.toLowerCase()).includes(String(parsedOptions.role).toLowerCase()));
    active.push(`role:${parsedOptions.role}`);
  }

  return {
    label: active.length > 0 ? active.join(',') : 'none',
    items: selected
  };
}

function copyItem(item, installRoot) {
  const sourcePath = path.join(repoRoot, item.path);
  const destinationPath = path.join(installRoot, item.path);

  if (item.type === 'skill' && path.basename(item.path).toLowerCase() === 'skill.md') {
    const sourceDirectory = path.dirname(sourcePath);
    const destinationDirectory = path.dirname(destinationPath);
    fs.mkdirSync(path.dirname(destinationDirectory), { recursive: true });
    fs.cpSync(sourceDirectory, destinationDirectory, { recursive: true });
    return;
  }

  fs.mkdirSync(path.dirname(destinationPath), { recursive: true });
  fs.copyFileSync(sourcePath, destinationPath);
}

function parseArgs(values) {
  const parsed = {};
  for (let index = 0; index < values.length; index += 1) {
    const value = values[index];
    if (!value.startsWith('--')) {
      continue;
    }

    const key = value.slice(2);
    const next = values[index + 1];
    if (!next || next.startsWith('--')) {
      parsed[key] = true;
    } else {
      parsed[key] = next;
      index += 1;
    }
  }
  return parsed;
}

function shouldRunInteractive(parsedOptions) {
  if (parsedOptions.interactive) {
    return true;
  }

  const hasSelector = Boolean(
    parsedOptions.bundle ||
      parsedOptions.name ||
      parsedOptions.rank ||
      parsedOptions.class ||
      parsedOptions.domain ||
      parsedOptions.role ||
      parsedOptions.persona
  );

  return !hasSelector && process.stdin.isTTY && process.stdout.isTTY;
}

function applyPersonaPreset(parsedOptions) {
  if (!parsedOptions.persona) {
    return parsedOptions;
  }

  const persona = String(parsedOptions.persona).toLowerCase();
  const preset = personaPresets[persona];
  if (!preset) {
    printHelp(`Unknown persona: ${parsedOptions.persona}`);
    process.exit(1);
  }

  return {
    ...preset,
    ...parsedOptions
  };
}

async function runInteractiveWizard(parsedOptions) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  try {
    const next = { ...parsedOptions };
    const target = await askWithDefault(rl, 'Target (copilot|claude-code|codex|cursor)', next.target || 'copilot');
    if (target) {
      next.target = target;
    }

    const mode = await askWithDefault(
      rl,
      'Selector mode (persona|bundle|class|domain|role|rank|name|awakening)',
      'persona'
    );

    if (mode === 'awakening') {
      next.bundle = 'awakening';
    } else if (mode === 'persona') {
      next.persona = await askWithDefault(
        rl,
        `Persona (${Object.keys(personaPresets).join('|')})`,
        'starter'
      );
    } else {
      const key = mode;
      const value = await askWithDefault(rl, `Value for ${mode}`, '');
      if (value) {
        next[key] = value;
      }
    }

    const dryRun = await askWithDefault(rl, 'Dry run? (y/n)', next['dry-run'] ? 'y' : 'n');
    if (dryRun.toLowerCase() === 'y') {
      next['dry-run'] = true;
    }

    return next;
  } finally {
    rl.close();
  }
}

async function askWithDefault(rl, prompt, fallback) {
  const suffix = fallback ? ` [${fallback}]` : '';
  const answer = await rl.question(`${prompt}${suffix}: `);
  const trimmed = String(answer || '').trim();
  return trimmed || fallback;
}

function printCatalog() {
  console.log('Shadow Guild catalog');
  console.log('Items:');
  for (const item of registry.items) {
    console.log(`- ${item.name} (${item.type}, ${item.rank.toUpperCase()}-Rank, ${item.class}, ${item.domain})`);
  }
  console.log('Bundles:');
  for (const [name, items] of Object.entries(registry.bundles)) {
    console.log(`- ${name}: ${items.join(', ')}`);
  }
}

function printHelp(message) {
  if (message) {
    console.error(message);
  }
  console.log(`Usage:
  shadow-guild install [--bundle awakening] [--target copilot]
  shadow-guild install --name shadow-monarch
  shadow-guild install --rank s
  shadow-guild install --class github
  shadow-guild install --domain software-engineering
  shadow-guild install --role architect
  shadow-guild install --persona platform
  shadow-guild install --interactive
  shadow-guild install --bundle awakening --dry-run
  shadow-guild list`);
}
