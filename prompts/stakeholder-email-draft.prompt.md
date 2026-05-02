---
name: stakeholder-email-draft
description: Draft concise stakeholder updates with clear decisions, risks, and asks.
rank: b
class: project-management
---

# stakeholder-email-draft

Produce an email in this structure:

- Subject with status signal
- What changed since last update
- Key risks and owner
- Decision or support request
- Next milestone and date

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
