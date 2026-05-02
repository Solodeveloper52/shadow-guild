---
name: test-scenario-generator
description: Generate test scenarios by risk and boundary conditions for features and APIs.
rank: b
class: software
---

# test-scenario-generator

Given a feature or endpoint, produce:

- Happy path tests
- Boundary tests
- Failure-path tests
- Security and abuse-path tests
- Observability assertions

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
