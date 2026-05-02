---
name: release-notes-quality-gate
description: Generate and validate release notes for completeness, risk disclosure, and operator readiness.
rank: b
class: release
---

# release-notes-quality-gate

Given release context, PR list, and rollout notes, produce:

- User-facing change summary
- Breaking changes and migration notes
- Risks, mitigations, and rollback notes
- Post-release verification checklist
- Stakeholder communication draft

## Deep Prompt Contract

### Required Inputs

- Objective, constraints, baseline evidence, and audience.

### Required Outputs

- Prioritized summary, detailed analysis, risks, and next actions.

### Quality Rules

- Label assumptions, tie recommendations to evidence, include fallback.
