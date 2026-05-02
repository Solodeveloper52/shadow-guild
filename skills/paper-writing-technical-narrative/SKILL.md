---
name: paper-writing-technical-narrative
description: Produce high-clarity narrative and communication assets for model development, evaluation, and research operations in the research-writing context.
rank: a
class: ai-research
domain: ai-research
subdomain: research-writing
maturity: pro
---

# Paper Writing Technical Narrative

Use this skill to shape complex context into a communication asset that changes decisions or behavior for model development, evaluation, and research operations. The method assumes you need evidence-backed decisions, reusable artifacts, and a review trail that survives beyond the current session.

## Use This Skill When

- You are preparing to craft a clear narrative asset and need a repeatable operating method instead of ad hoc judgment.
- The work affects researchers, ML engineers, and evaluators and the decision needs explicit tradeoffs, evidence, and ownership.
- You expect review, approval, or downstream execution by someone who did not participate in the first draft.
- The output must survive changing context, handoffs, or future audits.

## Do Not Use This Skill When

- The request only needs a quick opinion or a lightweight one-off answer.
- Inputs are missing and no effort has been made to collect the minimum evidence set.
- Stakeholders need a decision immediately and cannot wait for the review loop defined here.
- Another skill already governs the narrower problem more directly than paper writing technical narrative.

## Trigger Question

What evidence, constraints, and decision criteria do we need before we can confidently craft a clear narrative asset for model development, evaluation, and research operations?

## Required Inputs

- Objective statement for paper writing technical narrative with scope and non-goals.
- Current state evidence covering benchmarks, datasets, experiment logs, model metrics.
- Named stakeholders: researchers, ML engineers, and evaluators.
- Constraints across time, cost, risk, and operational limits.
- Any prior decisions, incident history, or baseline metrics that frame the tradeoff space.

## Expected Outputs

- Paper Writing Technical Narrative working document with assumptions, options, recommendation, and review notes.
- narrative package that another contributor can execute without reconstructing the reasoning.
- Decision log capturing unresolved risks, owners, and follow-up checkpoints.
- A quality gate summary showing whether the result is ready for approval, pilot, or revision.

## Operating Method

### Phase 1: Clarify Audience And Outcome

Objective: Define who must understand the asset and what should happen next.

Actions:
- State the audience and decision context.
- Choose the desired action or understanding shift.
- Identify what the audience already knows and what they will resist.

Exit Signal:
- The narrative is anchored to a real audience need.

### Phase 2: Shape The Message

Objective: Build the message hierarchy before polishing the draft.

Actions:
- Lead with the main point.
- Support it with evidence, examples, and constraints.
- Remove any detail that does not help the audience act.

Exit Signal:
- The asset has a strong spine and clear supporting logic.

### Phase 3: Draft For Action

Objective: Turn the message hierarchy into a readable artifact.

Actions:
- Use headings, summaries, and explicit calls to action.
- Make uncertainty visible rather than burying it in vague language.
- Tailor the depth to the attention span of the target audience.

Exit Signal:
- A reviewer can understand the recommendation in one pass.

### Phase 4: Pressure Test Clarity

Objective: Check whether the draft actually changes understanding or behavior.

Actions:
- Test the draft with someone close to the target audience.
- Look for ambiguity, hidden assumptions, and missing asks.
- Revise until the next step is obvious.

Exit Signal:
- The final asset is concise, accurate, and action-oriented.

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
- Use short review loops; long silent drafting phases tend to hide assumption drift in research-writing.
- When handing off, package the recommendation, evidence links, and next decision checkpoint together.

## Companion Assets

- templates/paper-section-outline-template.md
- examples/transformer-paper-narrative-example.md
- references/claim-evidence-mapping-checklist.md

## Exit Standard

The skill is complete only when the resulting narrative package can be executed by another contributor without additional oral context and the review gates above can be checked directly from the artifacts.
