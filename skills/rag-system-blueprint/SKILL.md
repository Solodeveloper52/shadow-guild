---
name: rag-system-blueprint
description: Design operational blueprints for model development, evaluation, and research operations in the rag context.
rank: a
class: ai-research
domain: ai-research
subdomain: rag
maturity: pro
---

# Rag System Blueprint

Use this skill to turn a vague solution space into an implementable blueprint for model development, evaluation, and research operations. The method assumes you need evidence-backed decisions, reusable artifacts, and a review trail that survives beyond the current session.

## Use This Skill When

- You are preparing to design the operating shape and need a repeatable operating method instead of ad hoc judgment.
- The work affects researchers, ML engineers, and evaluators and the decision needs explicit tradeoffs, evidence, and ownership.
- You expect review, approval, or downstream execution by someone who did not participate in the first draft.
- The output must survive changing context, handoffs, or future audits.

## Do Not Use This Skill When

- The request only needs a quick opinion or a lightweight one-off answer.
- Inputs are missing and no effort has been made to collect the minimum evidence set.
- Stakeholders need a decision immediately and cannot wait for the review loop defined here.
- Another skill already governs the narrower problem more directly than rag system blueprint.

## Trigger Question

What evidence, constraints, and decision criteria do we need before we can confidently design the operating shape for model development, evaluation, and research operations?

## Required Inputs

- Objective statement for rag system blueprint with scope and non-goals.
- Current state evidence covering benchmarks, datasets, experiment logs, model metrics.
- Named stakeholders: researchers, ML engineers, and evaluators.
- Constraints across time, cost, risk, and operational limits.
- Any prior decisions, incident history, or baseline metrics that frame the tradeoff space.

## Expected Outputs

- Rag System Blueprint working document with assumptions, options, recommendation, and review notes.
- blueprint package that another contributor can execute without reconstructing the reasoning.
- Decision log capturing unresolved risks, owners, and follow-up checkpoints.
- A quality gate summary showing whether the result is ready for approval, pilot, or revision.

## Operating Method

### Phase 1: Frame The System Boundary

Objective: Define the exact system or change surface covered by rag system blueprint in model development, evaluation, and research operations.

Actions:
- List the system boundary, dependencies, and non-goals.
- Capture functional requirements and non-functional requirements separately.
- Name the interfaces that other teams or systems depend on.

Exit Signal:
- The architecture boundary and operating assumptions are explicit.

### Phase 2: Model Options

Objective: Generate viable structures before locking into a single design.

Actions:
- Compare at least three design options.
- Map tradeoffs across performance, reliability, operability, and complexity.
- Reject options that fail the hard constraints.

Exit Signal:
- One option emerges as the best fit with recorded tradeoffs.

### Phase 3: Specify Interfaces

Objective: Make the design implementable by defining contracts and data flows.

Actions:
- Describe inputs, outputs, dependencies, and failure handling.
- Document the key components and their responsibilities.
- State how the design will be validated before rollout.

Exit Signal:
- A contributor can implement without guessing the integration model.

### Phase 4: Review Risk And Readiness

Objective: Check that the chosen design is safe to implement and operate.

Actions:
- Score delivery, operational, and security risks.
- Add rollout, rollback, and monitoring guidance.
- Resolve or defer open questions explicitly.

Exit Signal:
- The blueprint includes execution controls and review checkpoints.

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
- Use short review loops; long silent drafting phases tend to hide assumption drift in rag.
- When handing off, package the recommendation, evidence links, and next decision checkpoint together.

## Companion Assets

- templates/rag-architecture-blueprint.md
- examples/medical-rag-case-study.md
- references/rag-pitfalls-optimization.md

## Exit Standard

The skill is complete only when the resulting blueprint package can be executed by another contributor without additional oral context and the review gates above can be checked directly from the artifacts.
