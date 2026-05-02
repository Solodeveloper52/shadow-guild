---
name: security-test-matrix
description: Generate a prioritized security test matrix by attack surface, risk, and release scope.
rank: b
class: security
---

# security-test-matrix

Given a feature, system, or API surface, produce:

- Assets and trust boundaries
- Top abuse paths and exploit chains
- Security test cases by severity
- Required telemetry and alerts
- Release blocking criteria

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
