---
name: research-gap-scanner
description: Scan a literature summary to identify unresolved gaps, weak evidence zones, and high-leverage experiment opportunities.
rank: b
class: ai-research
---

# research-gap-scanner

Given a research topic and literature summary, produce:

- Top unresolved gaps with rationale
- Why current methods are insufficient
- Candidate hypotheses to test next
- Experiment ideas ranked by impact and tractability
- Risks, assumptions, and required resources

## Deep Prompt Contract

### Required Inputs

- Objective, constraints, baseline evidence, and audience.

### Required Outputs

- Prioritized summary, detailed analysis, risks, and next actions.

### Quality Rules

- Label assumptions, tie recommendations to evidence, include fallback.
