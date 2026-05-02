---
name: inventory-skill-finder
description: Help a user choose the right shadow-guild asset from the catalog.
rank: b
class: authoring
---

# inventory-skill-finder

Given a user goal and the shadow-guild catalog, recommend the smallest useful agent, skill, prompt, workflow, or bundle.

Return:

- Recommended asset
- Why it fits
- Command to install it, if available
- Next step after installation

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
