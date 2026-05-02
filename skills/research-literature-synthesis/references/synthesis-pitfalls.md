# Synthesis Pitfalls

Reference guide for reviewing research literature synthesis outputs in model development, evaluation, and research operations.

## What This Reference Is For

Use this guide when you need fast but defensible judgment about the quality of a experiment package before approval, rollout, or publication.
It is optimized for review conversations where the team needs concrete prompts, escalation signals, and evidence standards.

## Heuristics

- Prefer artifacts with explicit boundaries over broad documents that try to answer every adjacent question.
- Treat missing evidence as a blocker, not a note to self.
- Optimize for reviewer comprehension; the package should be legible to researchers, ML engineers, and evaluators outside the creation session.
- Write the recommendation in plain language first, then add domain detail and supporting evidence.
- Keep the owner, due date, and escalation path visible anywhere unresolved work remains.

## Evidence Expectations

- Expect evidence from benchmarks, datasets, experiment logs, model metrics whenever the recommendation claims a priority, risk, or expected impact.
- If the draft cites assumptions, the assumption owner and validation plan must be named.
- If a tradeoff is described as acceptable, the downside must be visible, not implied.
- Require a saved artifact that can be reviewed asynchronously by researchers, ML engineers, and evaluators.

## Failure Patterns

- Inputs are broad slogans instead of evidence, which leads to output that sounds polished but cannot be executed.
- The team optimizes for speed and skips the tradeoff analysis needed by researchers, ML engineers, and evaluators.
- Owners are implied instead of assigned, so no one closes the final decision loop.
- Risk handling is reduced to a warning paragraph instead of a concrete mitigation or monitoring plan.
- The package is approved before a second contributor can use it as a standalone artifact.

## Review Questions

- What decision becomes safer or faster because this experiment package exists?
- Which assumption would most weaken the recommendation if it proved false?
- What evidence supports the preferred option, and what evidence pushes against it?
- Could a second contributor continue the work tomorrow without a verbal briefing?
- What would cause the current recommendation to be revisited?

## Signals Of A Strong Output

- Scope, success criteria, and constraints are explicit and internally consistent.
- The output references concrete evidence from benchmarks, datasets, experiment logs, model metrics rather than generic advice.
- Owners, deadlines, and review checkpoints are named wherever the result depends on follow-up action.
- The recommendation includes at least one tradeoff, one rejected option, and one risk handling decision.
- A reviewer can trace the conclusion back to the artifacts without additional verbal explanation.

## Reviewer Moves

- Ask the author to restate the recommendation in one sentence; if that fails, the artifact is not ready.
- Challenge the strongest rejected option, not only the chosen path.
- Trace one important conclusion back to raw evidence to confirm the reasoning chain holds.
- Check whether the artifact still makes sense if the primary owner is unavailable tomorrow.
- Look for hidden dependencies, especially when timelines seem unusually optimistic.

## Quick Triage Table

| Signal | Meaning | Immediate Move |
| --- | --- | --- |
| Missing owner | Follow-up work will drift | Block approval until ownership is assigned |
| Weak evidence | The recommendation is opinion-heavy | Request concrete sources or reduce the claim |
| No rejected option | Tradeoff quality is unclear | Ask for at least one serious alternative |
| Risk without control | Execution may create unmanaged failure | Add mitigation, monitor, or rollback plan |
| Unclear checkpoint | The team will not know when to revisit | Define a date, metric, or event trigger |

## Escalate When

- The recommendation depends on data that is unavailable or known to be stale.
- Risk has been identified but no mitigation owner or monitoring plan exists.
- A required stakeholder from researchers, ML engineers, and evaluators has not reviewed the decision.
- Execution is starting before acceptance criteria can be checked against the saved artifacts.

## Review Checklist

- [ ] Recommendation is explicit and reviewable.
- [ ] Evidence and assumptions are distinguishable.
- [ ] Rejected options are captured with reasons.
- [ ] Owners, dates, and escalation paths are named.
- [ ] A second contributor could continue the work from the saved artifacts alone.

## Ongoing Maintenance

- Review the artifact after each major execution milestone and update assumptions that changed.
- Retire examples that no longer reflect the current stack, policy, or delivery model.
- Promote repeated review comments into permanent checklist items.
- Refresh the evidence sources when the system, team topology, or risk profile shifts.
