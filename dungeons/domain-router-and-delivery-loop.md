# domain-router-and-delivery-loop

Use this workflow to run complex requests from intake through routing, token shaping, execution, and handoff.

## Entry Criteria

- Objective is provided.
- Deadline and risk tolerance are explicit.
- Minimum baseline context is available.

## Phase 1: Intent Intake

1. Capture objective, audience, and artifact type.
2. Tag domain and complexity tier.
3. Identify unknowns that block safe execution.

## Phase 2: Routing Decision

1. Run skill-routing-orchestrator.
2. Select primary asset and support assets.
3. Assign confidence score and fallback path.

## Phase 3: Token Shaping

1. Run token-budget-optimizer on prompt payload.
2. Compress context using context-compression-lens prompt.
3. Confirm must-not-drop constraints are preserved.

## Phase 4: Execution

1. Execute selected assets in sequence.
2. Capture evidence for major decisions.
3. Run quality gate checks before final output.

## Phase 5: Handoff

1. Deliver final artifact and confidence.
2. Publish risk register and mitigation owners.
3. Record next actions and acceptance checks.

## Exit Artifacts

- Routing scorecard
- Token budget report
- Decision and risk log
- Final delivery artifact

## Failure Recovery

- If confidence is low, pause and request missing constraints.
- If budget overflows, switch to staged output mode.
- If quality gate fails, reroute to specialist skill and re-run.

## Execution Governance

### Decision Gates

1. Routing confidence gate
2. Token budget gate
3. Quality and handoff gate

### Escalation Rules

- Escalate to workflow-level execution if risk is high.
- Escalate to human review for compliance-critical decisions.
