---
name: context-compression-lens
description: Compress large context into a token-efficient execution brief while preserving critical constraints and decision quality.
rank: a
class: core
---

# context-compression-lens

Given long context, return:

- Objective in one sentence
- Hard constraints and non-negotiables
- Top evidence bullets only
- Risks and confidence
- Next-step command or workflow

## Compression Protocol

1. Remove duplicate or stale context.
2. Preserve must-not-drop constraints.
3. Separate facts from assumptions.
4. Return high-signal structured output only.

## Output Contract

- Max 12 bullets unless expanded mode requested.
- Include confidence score and missing-input list.
- Include fallback path if uncertainty is high.

## Deep Prompt Contract

### Required Inputs

- Full context source or excerpt.
- Desired output artifact and audience.
- Token budget constraints.

### Required Outputs

- Compact execution brief.
- Critical assumptions and risk flags.
- Immediate next action.

### Quality Rules

- No generic filler.
- No hidden assumptions.
- No omission of safety/compliance constraints.
