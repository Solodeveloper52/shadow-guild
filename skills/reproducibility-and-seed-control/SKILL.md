---
name: reproducibility-and-seed-control
description: Design technical experiments and research operations for model development, evaluation, and research operations in the reproducibility context.
rank: a
class: ai-research
domain: ai-research
subdomain: reproducibility
maturity: pro
---

# Reproducibility And Seed Control

Use this skill to turn a technical question into a disciplined experiment or operating method for model development, evaluation, and research operations. The method assumes you need evidence-backed decisions, reusable artifacts, and a review trail that survives beyond the current session.

## Use This Skill When

- You are preparing to run a disciplined technical investigation and need a repeatable operating method instead of ad hoc judgment.
- The work affects researchers, ML engineers, and evaluators and the decision needs explicit tradeoffs, evidence, and ownership.
- You expect review, approval, or downstream execution by someone who did not participate in the first draft.
- The output must survive changing context, handoffs, or future audits.

## Do Not Use This Skill When

- The request only needs a quick opinion or a lightweight one-off answer.
- Inputs are missing and no effort has been made to collect the minimum evidence set.
- Stakeholders need a decision immediately and cannot wait for the review loop defined here.
- Another skill already governs the narrower problem more directly than reproducibility and seed control.

## Trigger Question

What evidence, constraints, and decision criteria do we need before we can confidently run a disciplined technical investigation for model development, evaluation, and research operations?

## Required Inputs

- Objective statement for reproducibility and seed control with scope and non-goals.
- Current state evidence covering benchmarks, datasets, experiment logs, model metrics.
- Named stakeholders: researchers, ML engineers, and evaluators.
- Constraints across time, cost, risk, and operational limits.
- Any prior decisions, incident history, or baseline metrics that frame the tradeoff space.

## Expected Outputs

- Reproducibility And Seed Control working document with assumptions, options, recommendation, and review notes.
- experiment package that another contributor can execute without reconstructing the reasoning.
- Decision log capturing unresolved risks, owners, and follow-up checkpoints.
- A quality gate summary showing whether the result is ready for approval, pilot, or revision.

## Operating Method

### Phase 1: State The Technical Question

Objective: Clarify the decision or unknown the work is meant to reduce.

Actions:
- Write the core question and success condition.
- Separate hypotheses from implementation ideas.
- Choose the metrics that can disconfirm the current belief.

Exit Signal:
- The investigation has a falsifiable question.

### Phase 2: Design The Method

Objective: Choose data, controls, and evaluation structure before running tests.

Actions:
- Define datasets, baselines, and control variables.
- Record environmental assumptions and reproducibility needs.
- Limit the first pass to the smallest discriminating test.

Exit Signal:
- The method can reveal something meaningful quickly.

### Phase 3: Run And Observe

Objective: Execute the method and capture results with enough detail to compare runs.

Actions:
- Log configuration, seed state, and execution context.
- Capture both expected and unexpected outcomes.
- Compare results against the baseline instead of isolated anecdotes.

Exit Signal:
- Results are recorded in a reusable format.

### Phase 4: Interpret And Package

Objective: Convert raw results into a recommendation, next step, or operating rule.

Actions:
- State what changed and why it matters.
- Separate signal from noise and note remaining uncertainty.
- Document what should be repeated, scaled, or rejected.

Exit Signal:
- The experiment produces a decision-ready artifact.

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
- Use short review loops; long silent drafting phases tend to hide assumption drift in reproducibility.
- When handing off, package the recommendation, evidence links, and next decision checkpoint together.

## Companion Assets

- templates/reproducibility-seed-control.md
- examples/reproducibility-debugging-case-study.md
- references/reproducibility-pitfalls.md

## Exit Standard

The skill is complete only when the resulting experiment package can be executed by another contributor without additional oral context and the review gates above can be checked directly from the artifacts.
