---
name: bug-repro-forge
description: Produce a deterministic bug reproduction brief from incomplete issue reports.
rank: b
class: software
---

# bug-repro-forge

Given an issue report, produce:

- Environment assumptions
- Reproduction steps with exact inputs
- Expected vs actual behavior
- Potential root-cause hypotheses
- Evidence to collect next

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
