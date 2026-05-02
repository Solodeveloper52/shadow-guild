# Shadow Guild Catalog

Shadow Guild now operates as a categorized God repository with domain, class, role, rank, and maturity metadata.

## Active Domains

- software-engineering
- programming-languages
- ai-research
- project-management
- marketing-growth
- security-devops
- operations-governance
- cross-domain

## Rank System

| Rank | Meaning |
| --- | --- |
| `S-Rank` | Flagship orchestrators and quality gates. |
| `A-Rank` | Production-ready domain assets. |
| `B-Rank` | Supporting prompts and workflows. |
| `C-Rank` | Internal helpers. |
| `D-Rank` | Dev scaffolding assets. |
| `E-Rank` | Experimental assets. |
| `National Level` | Mission-critical control layers. |

## Core Assets

| Name | Type | Class | Domain | Maturity |
| --- | --- | --- | --- | --- |
| `shadow-monarch` | Agent | core | cross-domain | core |
| `igris-validator` | Agent | authoring | cross-domain | core |
| `status-window-readme` | Skill | authoring | cross-domain | pro |
| `rulers-authority-github-audit` | Skill | github | operations-governance | pro |

## Domain Packs

| Class | Install Command | Key Assets |
| --- | --- | --- |
| `web` | `npx shadow-guild install --class web` | `web-architecture-blueprint`, `design-direction-compass`, `ui-system-token-forge` |
| `python` | `npx shadow-guild install --class python` | `python-quality-gate`, `stack-context-loader` |
| `architecture` | `npx shadow-guild install --class architecture` | `software-architecture-review`, `architecture-decision-record` |
| `ai-research` | `npx shadow-guild install --class ai-research` | `rag-system-blueprint`, `hypothesis-to-experiment-mapper`, `paper-writing-technical-narrative` |
| `project-management` | `npx shadow-guild install --class project-management` | `pm-roadmap-planner`, `user-story-splitting-strategy`, `workshop-facilitation-playbook` |
| `product-management` | `npx shadow-guild install --class product-management` | `problem-framing-canvas`, `product-strategy-session` |
| `marketing` | `npx shadow-guild install --class marketing` | `marketing-campaign-orchestrator`, `positioning-message-architecture`, `launch-experiment-retro` |
| `security` | `npx shadow-guild install --class security` | `security-threat-modeler`, `supply-chain-security-gate`, `secrets-exposure-audit` |
| `devops` | `npx shadow-guild install --class devops` | `devops-pipeline-hardening`, `progressive-delivery-checklist`, `reliability-gate-runbook` |
| `backend` | `npx shadow-guild install --class backend` | `backend-service-blueprint`, `mcp-server-architecture`, `dotnet-performance-diagnostics` |
| `release` | `npx shadow-guild install --class release` | `release-readiness-gate`, `release-notes-quality-gate` |
| `software` | `npx shadow-guild install --class software` | engineering cross-pack bundle |

## Advanced Install Filters

- `npx shadow-guild install --domain software-engineering`
- `npx shadow-guild install --role architect`
- `npx shadow-guild install --bundle software --role developer`

## Validation And Governance

- `npm run audit:catalog` checks resource-backed coverage and catalog quality.
- Registry is the source of truth: `inventory/registry.json`.
- Quality rubric and taxonomy are defined in catalog and registry metadata.

