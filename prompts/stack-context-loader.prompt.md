---
name: stack-context-loader
description: Normalize project constraints before writing architecture, implementation, or migration plans.
rank: b
class: software
---

# stack-context-loader

Given a project description, extract and normalize:

- Business objective
- Technical stack
- Runtime and deployment model
- Data model constraints
- Non-functional requirements
- Security and compliance constraints
- Delivery timeline

Output as a compact context block to feed into other skills.

## Deep Prompt Contract

### Required Inputs

- Problem objective and decision context.
- Constraints: time, quality, legal/safety limits.
- Known evidence and uncertainty zones.
- Preferred response format and audience level.

### Required Outputs

- Executive summary (priority ordered).
- Detailed analysis with assumptions labeled.
- Risks and mitigation plan.
- Immediate next actions with owners/timebox.

### Response Quality Rules

- No generic filler statements.
- Every recommendation tied to evidence or explicit assumption.
- Include at least one fallback strategy.
- Separate what is known vs inferred.

### Recovery Path

If critical inputs are missing, first list missing inputs, then continue with best-effort assumptions and confidence labels.
