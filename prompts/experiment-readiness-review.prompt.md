---
name: experiment-readiness-review
description: Review an experiment plan for readiness, controls, metric validity, and deployment relevance.
rank: b
class: ai-research
---

# experiment-readiness-review

Given an experiment proposal, evaluate:

- Hypothesis clarity and falsifiability
- Control quality and confounder handling
- Metric validity and threshold quality
- Reproducibility readiness (seeds, versions, artifacts)
- Go or no-go decision with remediation checklist

## Deep Prompt Contract

### Required Inputs

- Objective, constraints, baseline evidence, and audience.

### Required Outputs

- Prioritized summary, detailed analysis, risks, and next actions.

### Quality Rules

- Label assumptions, tie recommendations to evidence, include fallback.
