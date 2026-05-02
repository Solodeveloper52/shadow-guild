# shadow-guild

<p align="center">
	<img src="./Shadow%20Guild.png" alt="Shadow Guild Banner" width="100%" />
</p>

<p align="center">
	<a href="https://github.com/Solodeveloper52/shadow-guild"><img alt="GitHub Repo" src="https://img.shields.io/badge/GitHub-shadow--guild-111111?style=for-the-badge&logo=github" /></a>
	<img alt="Catalog Items" src="https://img.shields.io/badge/Catalog-96_Items-0A7C86?style=for-the-badge" />
	<img alt="Bundles" src="https://img.shields.io/badge/Bundles-45-146C2E?style=for-the-badge" />
	<img alt="Resource Backed Skills" src="https://img.shields.io/badge/Resource--Backed_Skills-59%2F59-8E4B10?style=for-the-badge" />
</p>

Shadow Guild is a curated system of installable agents, skills, prompts, workflows, and validation scripts for software, AI research, product, marketing, and security/devops operations.

## Guild Flavor

Shadow Guild uses a Solo Leveling-inspired naming layer to make the system memorable, while staying practical for real engineering work.

| Lore Name | System Meaning |
| --- | --- |
| Shadow Monarch | Top-level orchestrator role for cross-domain execution |
| Shadow Army | The agent layer in `shadow-army/` |
| Dungeons | Workflow runbooks in `dungeons/` |
| Gates | Target routing and adapter policy in `gates/` |
| Ranks (S/A/B/...) | Priority and maturity signals for assets |
| Arise | Install and activate the selected asset bundle |

The flavor is an interface layer, not cosplay. Every item still maps to concrete install behavior, catalog metadata, and delivery outcomes.

### Arise Path

Use this sequence when onboarding:

1. List what exists: `npm run list`
2. Inspect by class or persona with dry-run: `node scripts/install.mjs install --class web --dry-run`
3. Install to your target: `node scripts/install.mjs install --class web --target copilot`
4. Verify manifest output in the target root.

## Current State

- Catalog size: 96 items
- Bundles: 45
- Fully resource-backed skills: 59/59
- Last catalog audit: passed

## Quick Start

From repo root:

```bash
npm run list
npm run audit:catalog
```

## Distribution Channels

Shadow Guild supports two delivery paths.

1. Package path (best for fast install)

- List catalog:
	npx shadow-guild list
- Dry-run install preview:
	npx shadow-guild install --class web --target copilot --dry-run
- Real install:
	npx shadow-guild install --class web --target copilot

2. Git path (best when you want full source visibility)

- Clone and run installer locally:
	git clone --depth 1 <your-repo-url> shadow-guild
	cd shadow-guild
	node scripts/install.mjs install --class web --target copilot

Both paths use the same selector model and the same target mapping.

Use installer directly:

```bash
node scripts/install.mjs list
node scripts/install.mjs install --class web --dry-run
node scripts/install.mjs install --persona engineer --dry-run
node scripts/install.mjs install --bundle ai-research-advanced --dry-run
```

Targets supported by installer:

- `copilot`
- `claude-code`
- `codex`
- `cursor`

After publish to npm, the package can be invoked as:

```bash
npx shadow-guild install --class web --dry-run
```

## What Is Inside

- [CATALOG.md](CATALOG.md): human-readable catalog
- [inventory/registry.json](inventory/registry.json): machine-readable source of truth
- [shadow-army/](shadow-army): agents
- [skills/](skills): skill modules with templates/examples/references
- [prompts/](prompts): focused prompt assets
- [dungeons/](dungeons): workflow playbooks
- [scripts/](scripts): install and catalog automation
- [gates/](gates): target mapping and install gates

## Installation Model

Installer entrypoint: [scripts/install.mjs](scripts/install.mjs)

Default behavior:

- If no selector is provided, installs `awakening` bundle.
- Supports selectors by `--bundle`, `--class`, `--persona`, `--rank`, `--domain`, `--role`, `--name`.
- Uses `--dry-run` for non-destructive inspection.

Install manifest path (non-dry-run):

- `<target-root>/shadow-guild-install.json`

## Domain Coverage

This repository ships production-style assets for:

- software engineering and architecture
- web/app design and implementation quality
- python/typescript quality gates
- project and product management
- AI research and model evaluation
- marketing strategy and campaign execution
- security, governance, and compliance
- devops reliability and release readiness

See [catalog/DOMAIN_COVERAGE.md](catalog/DOMAIN_COVERAGE.md).

## Structure

```text
shadow-guild/
├── shadow-army/      # agents
├── skills/           # skill frameworks and assets
├── prompts/          # reusable prompts
├── dungeons/         # workflows
├── scripts/          # installer and catalog scripts
├── inventory/        # registry source of truth
└── gates/            # target mapping and gate docs
```

## Release Steps

Use this checklist for dual-channel release (public GitHub + npm package).

1. Verify package contents:

```bash
npm pack --dry-run
```

2. Commit and push to GitHub:

```bash
git add .
git commit -m "release: prepare public repository and installer docs"
git push origin main
```

3. Authenticate npm and publish:

```bash
npm login
npm publish --access public
```

4. Smoke-check public install:

```bash
npx shadow-guild list
npx shadow-guild install --class web --target copilot --dry-run
```

5. Tag release in git (recommended):

```bash
git tag v0.1.0
git push origin v0.1.0
```
