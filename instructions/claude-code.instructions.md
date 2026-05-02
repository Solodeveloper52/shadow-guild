# Claude Code Target Instructions

Use these conventions when installing Shadow Guild assets for Claude Code.

## Placement

- Agents and skills under `.claude-plugin/` compatible structure.
- Prompts under `prompts/` with stable names.

## Rules

1. Keep metadata fields unchanged.
2. Ensure each installed asset has a deterministic trigger phrase.
3. Validate installation manifest after copy.

## Routing And Cost Controls

1. Start broad requests with `skill-routing-orchestrator` to avoid misrouting.
2. Apply `token-budget-optimizer` when context or output volume is high.
3. Use staged outputs: concise action plan first, full expansion second.

## Orchestration Guidance

1. Use `beru-guild-operator` for multi-step cross-domain tasks.
2. Include confidence score and fallback route in orchestration outputs.
3. Escalate to workflow assets when risk or complexity is high.

## Resource-Backed Authoring

Prefer skill packages that include `templates`, `examples`, and `references` over single-file guidance.
