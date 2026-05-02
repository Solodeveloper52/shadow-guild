---
name: executive-status-window
description: Summarize initiative status for leadership in a concise, decision-oriented format.
rank: b
class: project-management
---

# executive-status-window

Summarize initiative status in this structure:

- Objective
- Current status (green, amber, red)
- Progress since last update
- Top risks and blockers
- Decision requests
- Next milestones and dates

Keep total output under 300 words unless requested otherwise.

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
