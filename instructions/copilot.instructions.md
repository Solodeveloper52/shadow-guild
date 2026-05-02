# Copilot Target Instructions

Use these conventions when installing Shadow Guild assets for Copilot.

## Placement

- Agents: `.github/agents/*.agent.md`
- Skills: `.github/skills/<skill>/SKILL.md`
- Prompts: `prompts/*.prompt.md` or `.github/prompts/`

## Rules

1. Preserve YAML frontmatter.
2. Keep naming consistent with registry `name`.
3. Do not install labs assets by default.

## Routing And Token Discipline

1. Route ambiguous requests through `skill-routing-orchestrator` before deep execution.
2. Enforce token budget strategy using `token-budget-optimizer` for long-context tasks.
3. Prefer compact first-pass output, then progressive expansion on demand.
4. For multi-domain requests, use `beru-guild-operator` as the primary orchestration agent.

## Resource-Backed Skill Standard

Each high-value skill should include companion assets when practical:

- `templates/` for repeatable execution contracts.
- `examples/` for realistic worked scenarios.
- `references/` for durable heuristics and guardrails.
