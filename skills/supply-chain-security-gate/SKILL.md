---
name: supply-chain-security-gate
description: Define enforceable quality gates for security posture, delivery controls, and operational resilience in the supply-chain-security context.
rank: a
class: security
domain: security-devops
subdomain: supply-chain-security
maturity: pro
---

# Supply Chain Security Gate

Use this skill to define pass fail controls that catch bad changes before they escape for security posture, delivery controls, and operational resilience. The method assumes you need evidence-backed decisions, reusable artifacts, and a review trail that survives beyond the current session.

## Use This Skill When

- You are preparing to set and enforce decision gates and need a repeatable operating method instead of ad hoc judgment.
- The work affects security engineers, platform owners, and delivery teams and the decision needs explicit tradeoffs, evidence, and ownership.
- You expect review, approval, or downstream execution by someone who did not participate in the first draft.
- The output must survive changing context, handoffs, or future audits.

## Do Not Use This Skill When

- The request only needs a quick opinion or a lightweight one-off answer.
- Inputs are missing and no effort has been made to collect the minimum evidence set.
- Stakeholders need a decision immediately and cannot wait for the review loop defined here.
- Another skill already governs the narrower problem more directly than supply chain security gate.

## Trigger Question

What evidence, constraints, and decision criteria do we need before we can confidently set and enforce decision gates for security posture, delivery controls, and operational resilience?

## Required Inputs

- Objective statement for supply chain security gate with scope and non-goals.
- Current state evidence covering scan results, control evidence, pipeline logs, incident data.
- Named stakeholders: security engineers, platform owners, and delivery teams.
- Constraints across time, cost, risk, and operational limits.
- Any prior decisions, incident history, or baseline metrics that frame the tradeoff space.

## Expected Outputs

- Supply Chain Security Gate working document with assumptions, options, recommendation, and review notes.
- gate specification that another contributor can execute without reconstructing the reasoning.
- Decision log capturing unresolved risks, owners, and follow-up checkpoints.
- A quality gate summary showing whether the result is ready for approval, pilot, or revision.

## Operating Method

### Phase 1: Define What Must Not Slip

Objective: Clarify which failures supply chain security gate must prevent.

Actions:
- List the unacceptable failure modes.
- Map each failure mode to a signal or test.
- Separate blocking criteria from warning criteria.

Exit Signal:
- The gate has a concrete reason to exist.

### Phase 2: Choose Signals

Objective: Select the metrics, tests, and checks that can be automated or reviewed consistently.

Actions:
- Define thresholds, waivers, and exception handling.
- Tie each signal to a source of truth.
- Remove vanity metrics that do not change a decision.

Exit Signal:
- Each control has a measurable threshold and owner.

### Phase 3: Operationalize The Gate

Objective: Place the gate where it blocks the right work with the least avoidable friction.

Actions:
- Choose pre-commit, CI, release, or review checkpoints.
- Define reporting output for success, warning, and failure.
- Document how engineers appeal or remediate failures.

Exit Signal:
- The gate can run repeatedly without interpretation drift.

### Phase 4: Review And Tune

Objective: Keep the gate strict enough to matter and practical enough to use.

Actions:
- Review false positives and false negatives.
- Tighten weak thresholds after observing real usage.
- Archive evidence from production incidents back into the gate.

Exit Signal:
- The gate has a maintenance path instead of becoming stale policy.

## Decision Rules

- Prefer options that reduce ambiguity for security engineers, platform owners, and delivery teams without hiding material tradeoffs.
- Do not collapse multiple decisions into one recommendation when the owners, evidence, or time horizons differ.
- Escalate if the chosen path increases risk without a matching control, rollback, or monitoring plan.
- If evidence is incomplete, mark the gap explicitly and convert it into a prerequisite instead of quietly assuming it away.

## Quality Gates

- Scope, success criteria, and constraints are explicit and internally consistent.
- The output references concrete evidence from scan results, control evidence, pipeline logs, incident data rather than generic advice.
- Owners, deadlines, and review checkpoints are named wherever the result depends on follow-up action.
- The recommendation includes at least one tradeoff, one rejected option, and one risk handling decision.
- A reviewer can trace the conclusion back to the artifacts without additional verbal explanation.

## Failure Recovery

- Inputs are broad slogans instead of evidence, which leads to output that sounds polished but cannot be executed.
- The team optimizes for speed and skips the tradeoff analysis needed by security engineers, platform owners, and delivery teams.
- Owners are implied instead of assigned, so no one closes the final decision loop.
- Risk handling is reduced to a warning paragraph instead of a concrete mitigation or monitoring plan.
- The package is approved before a second contributor can use it as a standalone artifact.

## Review Metrics

- Risk cycle time from request to approved artifact.
- Rework rate after first review.
- Number of unresolved risks carried into execution.
- Percentage of decisions with named owners and target dates.
- Auditability: whether a reviewer can reconstruct the recommendation from saved artifacts alone.

## Collaboration Notes

- Pull in security engineers, platform owners, and delivery teams early enough to validate constraints before solution shaping begins.
- Keep open questions separate from blocked items so reviewers can distinguish uncertainty from missing work.
- Use short review loops; long silent drafting phases tend to hide assumption drift in supply-chain-security.
- When handing off, package the recommendation, evidence links, and next decision checkpoint together.

## Companion Assets

- templates/supply-chain-security.md
- examples/supply-chain-case-study.md
- references/supply-chain-pitfalls.md

## Exit Standard

The skill is complete only when the resulting gate specification can be executed by another contributor without additional oral context and the review gates above can be checked directly from the artifacts.
