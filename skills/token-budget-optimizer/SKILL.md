---
name: token-budget-optimizer
description: Coordinate routing, orchestration, and efficiency decisions for cross-functional operating systems and shared practices in the token-efficiency context.
rank: s
class: core
domain: cross-domain
subdomain: token-efficiency
maturity: core
---

# Token Budget Optimizer

Use this skill to route work to the right path with explicit policies, controls, and monitoring for cross-functional operating systems and shared practices. The method assumes you need evidence-backed decisions, reusable artifacts, and a review trail that survives beyond the current session.

## Use This Skill When

- You are preparing to orchestrate execution flow and need a repeatable operating method instead of ad hoc judgment.
- The work affects cross-functional contributors and decision-makers and the decision needs explicit tradeoffs, evidence, and ownership.
- You expect review, approval, or downstream execution by someone who did not participate in the first draft.
- The output must survive changing context, handoffs, or future audits.

## Do Not Use This Skill When

- The request only needs a quick opinion or a lightweight one-off answer.
- Inputs are missing and no effort has been made to collect the minimum evidence set.
- Stakeholders need a decision immediately and cannot wait for the review loop defined here.
- Another skill already governs the narrower problem more directly than token budget optimizer.

## Trigger Question

What evidence, constraints, and decision criteria do we need before we can confidently orchestrate execution flow for cross-functional operating systems and shared practices?

## Required Inputs

- Objective statement for token budget optimizer with scope and non-goals.
- Current state evidence covering shared artifacts, workflow data, handoff notes, review history.
- Named stakeholders: cross-functional contributors and decision-makers.
- Constraints across time, cost, risk, and operational limits.
- Any prior decisions, incident history, or baseline metrics that frame the tradeoff space.

## Expected Outputs

- Token Budget Optimizer working document with assumptions, options, recommendation, and review notes.
- routing specification that another contributor can execute without reconstructing the reasoning.
- Decision log capturing unresolved risks, owners, and follow-up checkpoints.
- A quality gate summary showing whether the result is ready for approval, pilot, or revision.

## Operating Method

### Phase 1: Classify Inputs

Objective: Understand the incoming work well enough to route it intelligently.

Actions:
- Extract intent, urgency, complexity, and risk.
- Normalize inconsistent requests into comparable categories.
- Record unknowns that affect routing confidence.

Exit Signal:
- Inputs are categorized consistently.

### Phase 2: Define Routing Policy

Objective: Specify how decisions are made and when fallback logic applies.

Actions:
- Create scoring or decision rules.
- Define fallback, escalation, and exception behavior.
- Document what evidence improves routing quality over time.

Exit Signal:
- Routing logic is explicit rather than implicit.

### Phase 3: Instrument The Flow

Objective: Make the routing behavior observable once it is live.

Actions:
- Track decisions, latency, and failure conditions.
- Measure the cost of poor routing and unnecessary escalation.
- Make manual overrides visible for later analysis.

Exit Signal:
- The routing path can be monitored and tuned.

### Phase 4: Tune With Feedback

Objective: Improve the policy using real outcomes instead of intuition alone.

Actions:
- Review overrides, misses, and costly edge cases.
- Update scoring rules and fallback paths.
- Retire logic that no longer reflects the operating environment.

Exit Signal:
- The orchestration logic evolves from observed evidence.

## Decision Rules

- Prefer options that reduce ambiguity for cross-functional contributors and decision-makers without hiding material tradeoffs.
- Do not collapse multiple decisions into one recommendation when the owners, evidence, or time horizons differ.
- Escalate if the chosen path increases risk without a matching control, rollback, or monitoring plan.
- If evidence is incomplete, mark the gap explicitly and convert it into a prerequisite instead of quietly assuming it away.

## Quality Gates

- Scope, success criteria, and constraints are explicit and internally consistent.
- The output references concrete evidence from shared artifacts, workflow data, handoff notes, review history rather than generic advice.
- Owners, deadlines, and review checkpoints are named wherever the result depends on follow-up action.
- The recommendation includes at least one tradeoff, one rejected option, and one risk handling decision.
- A reviewer can trace the conclusion back to the artifacts without additional verbal explanation.

## Failure Recovery

- Inputs are broad slogans instead of evidence, which leads to output that sounds polished but cannot be executed.
- The team optimizes for speed and skips the tradeoff analysis needed by cross-functional contributors and decision-makers.
- Owners are implied instead of assigned, so no one closes the final decision loop.
- Risk handling is reduced to a warning paragraph instead of a concrete mitigation or monitoring plan.
- The package is approved before a second contributor can use it as a standalone artifact.

## Review Metrics

- Operating cycle time from request to approved artifact.
- Rework rate after first review.
- Number of unresolved risks carried into execution.
- Percentage of decisions with named owners and target dates.
- Auditability: whether a reviewer can reconstruct the recommendation from saved artifacts alone.

## Collaboration Notes

- Pull in cross-functional contributors and decision-makers early enough to validate constraints before solution shaping begins.
- Keep open questions separate from blocked items so reviewers can distinguish uncertainty from missing work.
- Use short review loops; long silent drafting phases tend to hide assumption drift in token-efficiency.
- When handing off, package the recommendation, evidence links, and next decision checkpoint together.

## Companion Assets

- templates/token-budget.md
- examples/token-optimization-case-study.md
- references/compression-patterns.md
- references/token-budget-pitfalls.md
- references/token-budget-template.md

## Exit Standard

The skill is complete only when the resulting routing specification can be executed by another contributor without additional oral context and the review gates above can be checked directly from the artifacts.
