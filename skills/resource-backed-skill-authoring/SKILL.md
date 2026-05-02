---
name: resource-backed-skill-authoring
description: Plan structured decisions and execution paths for cross-functional operating systems and shared practices in the skill-system-design context.
rank: s
class: authoring
domain: cross-domain
subdomain: skill-system-design
maturity: core
---

# Resource Backed Skill Authoring

Use this skill to shape ambiguous work into a staged plan with explicit tradeoffs for cross-functional operating systems and shared practices. The method assumes you need evidence-backed decisions, reusable artifacts, and a review trail that survives beyond the current session.

## Use This Skill When

- You are preparing to build a decision-ready plan and need a repeatable operating method instead of ad hoc judgment.
- The work affects cross-functional contributors and decision-makers and the decision needs explicit tradeoffs, evidence, and ownership.
- You expect review, approval, or downstream execution by someone who did not participate in the first draft.
- The output must survive changing context, handoffs, or future audits.

## Do Not Use This Skill When

- The request only needs a quick opinion or a lightweight one-off answer.
- Inputs are missing and no effort has been made to collect the minimum evidence set.
- Stakeholders need a decision immediately and cannot wait for the review loop defined here.
- Another skill already governs the narrower problem more directly than resource backed skill authoring.

## Trigger Question

What evidence, constraints, and decision criteria do we need before we can confidently build a decision-ready plan for cross-functional operating systems and shared practices?

## Required Inputs

- Objective statement for resource backed skill authoring with scope and non-goals.
- Current state evidence covering shared artifacts, workflow data, handoff notes, review history.
- Named stakeholders: cross-functional contributors and decision-makers.
- Constraints across time, cost, risk, and operational limits.
- Any prior decisions, incident history, or baseline metrics that frame the tradeoff space.

## Expected Outputs

- Resource Backed Skill Authoring working document with assumptions, options, recommendation, and review notes.
- planning pack that another contributor can execute without reconstructing the reasoning.
- Decision log capturing unresolved risks, owners, and follow-up checkpoints.
- A quality gate summary showing whether the result is ready for approval, pilot, or revision.

## Operating Method

### Phase 1: Frame The Goal

Objective: Translate the request into a bounded objective with a clear success condition.

Actions:
- Define the target outcome.
- List what success and failure look like.
- Capture hard constraints and sequencing requirements.

Exit Signal:
- The plan has a clear goal and a bounded scope.

### Phase 2: Map The Work

Objective: Break the objective into decision slices and execution stages.

Actions:
- Identify milestones, dependencies, and decision points.
- Sequence work based on risk and information gain.
- Call out items that can run in parallel.

Exit Signal:
- The work is staged into executable chunks.

### Phase 3: Prioritize Tradeoffs

Objective: Choose where to spend time, risk budget, and stakeholder attention.

Actions:
- Rank options by value, uncertainty, and reversibility.
- Identify what must happen now versus later.
- Reject low-value scope that threatens the main objective.

Exit Signal:
- The sequence and recommendation reflect explicit priorities.

### Phase 4: Commit Execution Signals

Objective: Set owners, checkpoints, and revision triggers before execution starts.

Actions:
- Assign owners to each milestone.
- Define review checkpoints and leading indicators.
- Record what would cause a re-plan.

Exit Signal:
- The plan is ready to execute and revise without confusion.

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
- Use short review loops; long silent drafting phases tend to hide assumption drift in skill-system-design.
- When handing off, package the recommendation, evidence links, and next decision checkpoint together.

## Companion Assets

- templates/SKILL_BLUEPRINT.md
- examples/high-depth-skill-sample.md
- references/resource-authoring-quality-gates.md

## Exit Standard

The skill is complete only when the resulting planning pack can be executed by another contributor without additional oral context and the review gates above can be checked directly from the artifacts.
