---
name: test-smell-detection-playbook
description: Facilitate structured sessions and reusable playbooks for software delivery and system operation in the test-smells context.
rank: a
class: software
domain: software-engineering
subdomain: test-smells
maturity: pro
---

# Test Smell Detection Playbook

Use this skill to run a high-signal collaborative session that ends with decisions and owned follow-up for software delivery and system operation. The method assumes you need evidence-backed decisions, reusable artifacts, and a review trail that survives beyond the current session.

## Use This Skill When

- You are preparing to facilitate a structured working session and need a repeatable operating method instead of ad hoc judgment.
- The work affects engineering leads, developers, and operators and the decision needs explicit tradeoffs, evidence, and ownership.
- You expect review, approval, or downstream execution by someone who did not participate in the first draft.
- The output must survive changing context, handoffs, or future audits.

## Do Not Use This Skill When

- The request only needs a quick opinion or a lightweight one-off answer.
- Inputs are missing and no effort has been made to collect the minimum evidence set.
- Stakeholders need a decision immediately and cannot wait for the review loop defined here.
- Another skill already governs the narrower problem more directly than test smell detection playbook.

## Trigger Question

What evidence, constraints, and decision criteria do we need before we can confidently facilitate a structured working session for software delivery and system operation?

## Required Inputs

- Objective statement for test smell detection playbook with scope and non-goals.
- Current state evidence covering code paths, tests, runtime metrics, incident history.
- Named stakeholders: engineering leads, developers, and operators.
- Constraints across time, cost, risk, and operational limits.
- Any prior decisions, incident history, or baseline metrics that frame the tradeoff space.

## Expected Outputs

- Test Smell Detection Playbook working document with assumptions, options, recommendation, and review notes.
- facilitation packet that another contributor can execute without reconstructing the reasoning.
- Decision log capturing unresolved risks, owners, and follow-up checkpoints.
- A quality gate summary showing whether the result is ready for approval, pilot, or revision.

## Operating Method

### Phase 1: Prepare The Session

Objective: Set the objective, inputs, attendees, and agenda before the meeting starts.

Actions:
- Clarify the decision or artifact expected from the session.
- Choose the right participants and pre-work.
- Time-box the agenda and assign facilitation roles.

Exit Signal:
- The workshop has the right room and the right objective.

### Phase 2: Open With Context

Objective: Align the group on facts, constraints, and desired outcomes.

Actions:
- Review the baseline data and scope.
- State the rules for discussion and decision-making.
- Capture open questions visibly.

Exit Signal:
- Participants understand the frame before ideation begins.

### Phase 3: Drive Structured Participation

Objective: Gather input without letting the loudest voice dominate the outcome.

Actions:
- Use prompts, rounds, voting, or breakout work as needed.
- Keep the conversation attached to evidence and the stated goal.
- Separate parking-lot topics from the main decision.

Exit Signal:
- The group has generated and filtered useful options.

### Phase 4: Close With Commitments

Objective: End the session with a documented decision and owned next steps.

Actions:
- Summarize what was decided and what remains open.
- Assign owners and deadlines.
- Publish the summary fast enough that people still act on it.

Exit Signal:
- The workshop ends with commitments, not good vibes.

## Decision Rules

- Prefer options that reduce ambiguity for engineering leads, developers, and operators without hiding material tradeoffs.
- Do not collapse multiple decisions into one recommendation when the owners, evidence, or time horizons differ.
- Escalate if the chosen path increases risk without a matching control, rollback, or monitoring plan.
- If evidence is incomplete, mark the gap explicitly and convert it into a prerequisite instead of quietly assuming it away.

## Quality Gates

- Scope, success criteria, and constraints are explicit and internally consistent.
- The output references concrete evidence from code paths, tests, runtime metrics, incident history rather than generic advice.
- Owners, deadlines, and review checkpoints are named wherever the result depends on follow-up action.
- The recommendation includes at least one tradeoff, one rejected option, and one risk handling decision.
- A reviewer can trace the conclusion back to the artifacts without additional verbal explanation.

## Failure Recovery

- Inputs are broad slogans instead of evidence, which leads to output that sounds polished but cannot be executed.
- The team optimizes for speed and skips the tradeoff analysis needed by engineering leads, developers, and operators.
- Owners are implied instead of assigned, so no one closes the final decision loop.
- Risk handling is reduced to a warning paragraph instead of a concrete mitigation or monitoring plan.
- The package is approved before a second contributor can use it as a standalone artifact.

## Review Metrics

- Delivery cycle time from request to approved artifact.
- Rework rate after first review.
- Number of unresolved risks carried into execution.
- Percentage of decisions with named owners and target dates.
- Auditability: whether a reviewer can reconstruct the recommendation from saved artifacts alone.

## Collaboration Notes

- Pull in engineering leads, developers, and operators early enough to validate constraints before solution shaping begins.
- Keep open questions separate from blocked items so reviewers can distinguish uncertainty from missing work.
- Use short review loops; long silent drafting phases tend to hide assumption drift in test-smells.
- When handing off, package the recommendation, evidence links, and next decision checkpoint together.

## Companion Assets

- templates/test-smell-framework.md
- examples/test-smell-case-study.md
- references/test-smell-pitfalls.md

## Exit Standard

The skill is complete only when the resulting facilitation packet can be executed by another contributor without additional oral context and the review gates above can be checked directly from the artifacts.
