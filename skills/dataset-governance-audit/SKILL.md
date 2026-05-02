---
name: dataset-governance-audit
description: Run evidence-backed audits and governance reviews for model development, evaluation, and research operations in the data-governance context.
rank: a
class: ai-research
domain: ai-research
subdomain: data-governance
maturity: pro
---

# Dataset Governance Audit

Use this skill to inspect the current state, surface real risk, and drive remediation with ownership for model development, evaluation, and research operations. The method assumes you need evidence-backed decisions, reusable artifacts, and a review trail that survives beyond the current session.

## Use This Skill When

- You are preparing to audit the current state and need a repeatable operating method instead of ad hoc judgment.
- The work affects researchers, ML engineers, and evaluators and the decision needs explicit tradeoffs, evidence, and ownership.
- You expect review, approval, or downstream execution by someone who did not participate in the first draft.
- The output must survive changing context, handoffs, or future audits.

## Do Not Use This Skill When

- The request only needs a quick opinion or a lightweight one-off answer.
- Inputs are missing and no effort has been made to collect the minimum evidence set.
- Stakeholders need a decision immediately and cannot wait for the review loop defined here.
- Another skill already governs the narrower problem more directly than dataset governance audit.

## Trigger Question

What evidence, constraints, and decision criteria do we need before we can confidently audit the current state for model development, evaluation, and research operations?

## Required Inputs

- Objective statement for dataset governance audit with scope and non-goals.
- Current state evidence covering benchmarks, datasets, experiment logs, model metrics.
- Named stakeholders: researchers, ML engineers, and evaluators.
- Constraints across time, cost, risk, and operational limits.
- Any prior decisions, incident history, or baseline metrics that frame the tradeoff space.

## Expected Outputs

- Dataset Governance Audit working document with assumptions, options, recommendation, and review notes.
- audit packet that another contributor can execute without reconstructing the reasoning.
- Decision log capturing unresolved risks, owners, and follow-up checkpoints.
- A quality gate summary showing whether the result is ready for approval, pilot, or revision.

## Operating Method

### Phase 1: Scope The Audit

Objective: Define what is being inspected, why, and at what level of depth.

Actions:
- Set audit boundaries, systems, and time period.
- Identify evidence sources and access paths.
- Name the risk categories under review.

Exit Signal:
- The audit scope is specific enough to execute.

### Phase 2: Collect Evidence

Objective: Gather evidence from systems, documents, and stakeholder interviews.

Actions:
- Record observed findings with timestamps and source links.
- Separate direct evidence from interpretation.
- Mark gaps that require follow-up rather than filling them with assumptions.

Exit Signal:
- The audit can be replayed by another reviewer.

### Phase 3: Assess Severity

Objective: Prioritize findings so remediation follows impact rather than noise.

Actions:
- Score likelihood, impact, and detectability.
- Cluster findings by root cause.
- Decide which items are immediate blockers versus tracked remediation.

Exit Signal:
- Findings are ranked with a defensible scoring method.

### Phase 4: Drive Remediation

Objective: Turn findings into owned actions with review checkpoints.

Actions:
- Assign owners and target dates.
- Define required evidence for closure.
- Schedule follow-up review for unresolved risks.

Exit Signal:
- The audit ends with an action plan, not a static report.

## Decision Rules

- Prefer options that reduce ambiguity for researchers, ML engineers, and evaluators without hiding material tradeoffs.
- Do not collapse multiple decisions into one recommendation when the owners, evidence, or time horizons differ.
- Escalate if the chosen path increases risk without a matching control, rollback, or monitoring plan.
- If evidence is incomplete, mark the gap explicitly and convert it into a prerequisite instead of quietly assuming it away.

## Quality Gates

- Scope, success criteria, and constraints are explicit and internally consistent.
- The output references concrete evidence from benchmarks, datasets, experiment logs, model metrics rather than generic advice.
- Owners, deadlines, and review checkpoints are named wherever the result depends on follow-up action.
- The recommendation includes at least one tradeoff, one rejected option, and one risk handling decision.
- A reviewer can trace the conclusion back to the artifacts without additional verbal explanation.

## Failure Recovery

- Inputs are broad slogans instead of evidence, which leads to output that sounds polished but cannot be executed.
- The team optimizes for speed and skips the tradeoff analysis needed by researchers, ML engineers, and evaluators.
- Owners are implied instead of assigned, so no one closes the final decision loop.
- Risk handling is reduced to a warning paragraph instead of a concrete mitigation or monitoring plan.
- The package is approved before a second contributor can use it as a standalone artifact.

## Review Metrics

- Experiment cycle time from request to approved artifact.
- Rework rate after first review.
- Number of unresolved risks carried into execution.
- Percentage of decisions with named owners and target dates.
- Auditability: whether a reviewer can reconstruct the recommendation from saved artifacts alone.

## Collaboration Notes

- Pull in researchers, ML engineers, and evaluators early enough to validate constraints before solution shaping begins.
- Keep open questions separate from blocked items so reviewers can distinguish uncertainty from missing work.
- Use short review loops; long silent drafting phases tend to hide assumption drift in data-governance.
- When handing off, package the recommendation, evidence links, and next decision checkpoint together.

## Companion Assets

- templates/dataset-governance-scorecard.md
- examples/foundation-model-data-review-example.md
- references/provenance-and-license-checklist.md

## Exit Standard

The skill is complete only when the resulting audit packet can be executed by another contributor without additional oral context and the review gates above can be checked directly from the artifacts.
