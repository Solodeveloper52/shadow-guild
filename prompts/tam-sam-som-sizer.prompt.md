---
name: tam-sam-som-sizer
description: Produce TAM, SAM, and SOM estimates with assumptions, scenarios, and risk caveats.
rank: b
class: product-management
---

# tam-sam-som-sizer

Given market context, segment definitions, pricing assumptions, and channel constraints, produce:

- TAM estimate with method and assumptions
- SAM estimate aligned to target segment and geography
- SOM estimate for near-term execution capacity
- Best/base/worst scenario table
- Key risks that can invalidate estimates

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
