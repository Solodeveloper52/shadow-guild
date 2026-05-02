#!/usr/bin/env node

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const registryPath = path.join(repoRoot, 'inventory', 'registry.json');

const registry = JSON.parse(await fs.readFile(registryPath, 'utf8'));
const skillItems = registry.items.filter((item) => item.type === 'skill');

async function ensureResourceLayout(skillDir, skillName) {
  const result = {};

  for (const kind of ['templates', 'examples', 'references']) {
    const dirPath = path.join(skillDir, kind);
    await fs.mkdir(dirPath, { recursive: true });

    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    const mdFiles = entries
      .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.md'))
      .map((entry) => entry.name)
      .sort();

    if (mdFiles.length > 0) {
      result[kind] = mdFiles;
      continue;
    }

    const defaultName = `${skillName}-${defaultSuffix(kind)}.md`;
    result[kind] = [defaultName];
  }

  return result;
}

function defaultSuffix(kind) {
  if (kind === 'templates') {
    return 'template';
  }
  if (kind === 'examples') {
    return 'case-study';
  }
  return 'operating-guide';
}

function buildSkillDocument(item, resourceMap) {
  const title = humanize(item.name);
  const archetype = getArchetype(item);
  const domain = getDomainLens(item);
  const trigger = triggerLine(item, archetype, domain);
  const outputs = buildOutputs(item, archetype, domain);
  const phases = buildPhases(item, archetype, domain);
  const acceptance = buildAcceptance(item, archetype, domain);
  const failureModes = buildFailureModes(item, archetype, domain);
  const metrics = buildMetrics(item, archetype, domain);

  return [
    '---',
    `name: ${item.name}`,
    `description: ${buildDescription(item, archetype, domain)}`,
    `rank: ${item.rank}`,
    `class: ${item.class}`,
    `domain: ${item.domain}`,
    `subdomain: ${item.subdomain}`,
    `maturity: ${item.maturity}`,
    '---',
    '',
    `# ${title}`,
    '',
    `${buildPromise(item, archetype, domain)}`,
    '',
    '## Use This Skill When',
    '',
    ...buildUseWhen(item, archetype, domain).map((line) => `- ${line}`),
    '',
    '## Do Not Use This Skill When',
    '',
    ...buildDoNotUseWhen(item, archetype, domain).map((line) => `- ${line}`),
    '',
    '## Trigger Question',
    '',
    trigger,
    '',
    '## Required Inputs',
    '',
    ...buildInputs(item, archetype, domain).map((line) => `- ${line}`),
    '',
    '## Expected Outputs',
    '',
    ...outputs.map((line) => `- ${line}`),
    '',
    '## Operating Method',
    '',
    ...phases.flatMap((phase, index) => [
      `### Phase ${index + 1}: ${phase.title}`,
      '',
      `Objective: ${phase.objective}`,
      '',
      'Actions:',
      ...phase.actions.map((line) => `- ${line}`),
      '',
      'Exit Signal:',
      `- ${phase.exit}`,
      ''
    ]),
    '## Decision Rules',
    '',
    ...buildDecisionRules(item, archetype, domain).map((line) => `- ${line}`),
    '',
    '## Quality Gates',
    '',
    ...acceptance.map((line) => `- ${line}`),
    '',
    '## Failure Recovery',
    '',
    ...failureModes.map((line) => `- ${line}`),
    '',
    '## Review Metrics',
    '',
    ...metrics.map((line) => `- ${line}`),
    '',
    '## Collaboration Notes',
    '',
    ...buildCollaborationNotes(item, archetype, domain).map((line) => `- ${line}`),
    '',
    '## Companion Assets',
    '',
    ...resourceMap.templates.map((file) => `- templates/${file}`),
    ...resourceMap.examples.map((file) => `- examples/${file}`),
    ...resourceMap.references.map((file) => `- references/${file}`),
    '',
    '## Exit Standard',
    '',
    `The skill is complete only when the resulting ${artifactPhrase(archetype)} can be executed by another contributor without additional oral context and the review gates above can be checked directly from the artifacts.`,
    ''
  ].join('\n');
}

function buildTemplateDocument(item, fileName) {
  const title = humanize(path.basename(fileName, '.md'));
  const archetype = getArchetype(item);
  const domain = getDomainLens(item);
  const sections = templateSections(item, archetype, domain, fileName);

  return [
    `# ${title}`,
    '',
    `${humanize(item.name)} template for ${domain.scope}. Fill every section with concrete evidence, named owners, dates, and measurable thresholds.`,
    '',
    '## How To Use',
    '',
    '1. Capture the current state with evidence, not assumptions.',
    '2. Work through the sections in order and mark unknowns explicitly.',
    '3. Convert unresolved items into blockers, risks, or follow-up actions.',
    '4. Do not approve the output until the review checklist at the end passes.',
    '',
    ...sections.flatMap((section) => [
      `## ${section.title}`,
      '',
      ...section.prompts.map((line) => `- ${line}`),
      '',
      'Working Notes:',
      '',
      '| Field | Notes |',
      '| --- | --- |',
      ...section.tableRows.map((row) => `| ${row[0]} | ${row[1]} |`),
      ''
    ]),
    '## Review Checklist',
    '',
    ...templateChecklist(item, archetype, domain).map((line) => `- [ ] ${line}`),
    '',
    '## Approval Record',
    '',
    '| Decision | Owner | Date | Evidence Link |',
    '| --- | --- | --- | --- |',
    '| Approve / Revise / Reject |  |  |  |',
    ''
  ].join('\n');
}

function buildExampleDocument(item, fileName) {
  const title = humanize(path.basename(fileName, '.md'));
  const archetype = getArchetype(item);
  const domain = getDomainLens(item);
  const scenario = exampleScenario(item, archetype, domain);
  const phases = buildPhases(item, archetype, domain);

  return [
    `# ${title}`,
    '',
    `Worked example showing ${humanize(item.name).toLowerCase()} in a realistic ${domain.scope} setting.`,
    '',
    '## Scenario',
    '',
    ...scenario.summary.map((line) => `- ${line}`),
    '',
    '## Baseline Signals',
    '',
    ...scenario.baseline.map((line) => `- ${line}`),
    '',
    ...phases.flatMap((phase, index) => [
      `## Step ${index + 1}: ${phase.title}`,
      '',
      `Goal: ${phase.objective}`,
      '',
      'Applied Actions:',
      ...exampleActions(item, archetype, domain, phase).map((line) => `- ${line}`),
      '',
      'Artifacts Produced:',
      ...exampleArtifacts(item, archetype, domain, phase).map((line) => `- ${line}`),
      '',
      'Decision Taken:',
      `- ${exampleDecision(item, archetype, domain, phase, index)}`,
      ''
    ]),
    '## Outcome',
    '',
    ...scenario.outcomes.map((line) => `- ${line}`),
    '',
    '## Lessons Learned',
    '',
    ...scenario.lessons.map((line) => `- ${line}`),
    '',
    '## Reuse Guidance',
    '',
    ...scenario.reuse.map((line) => `- ${line}`),
    ''
  ].join('\n');
}

function buildReferenceDocument(item, fileName) {
  const title = humanize(path.basename(fileName, '.md'));
  const archetype = getArchetype(item);
  const domain = getDomainLens(item);

  return [
    `# ${title}`,
    '',
    `Reference guide for reviewing ${humanize(item.name).toLowerCase()} outputs in ${domain.scope}.`,
    '',
    '## What This Reference Is For',
    '',
    `Use this guide when you need fast but defensible judgment about the quality of a ${artifactPhrase(archetype)} before approval, rollout, or publication.`,
    'It is optimized for review conversations where the team needs concrete prompts, escalation signals, and evidence standards.',
    '',
    '## Heuristics',
    '',
    ...referenceHeuristics(item, archetype, domain).map((line) => `- ${line}`),
    '',
    '## Evidence Expectations',
    '',
    ...referenceEvidenceExpectations(item, archetype, domain).map((line) => `- ${line}`),
    '',
    '## Failure Patterns',
    '',
    ...buildFailureModes(item, archetype, domain).map((line) => `- ${line}`),
    '',
    '## Review Questions',
    '',
    ...referenceQuestions(item, archetype, domain).map((line) => `- ${line}`),
    '',
    '## Signals Of A Strong Output',
    '',
    ...buildAcceptance(item, archetype, domain).map((line) => `- ${line}`),
    '',
    '## Reviewer Moves',
    '',
    ...referenceReviewerMoves(item, archetype, domain).map((line) => `- ${line}`),
    '',
    '## Quick Triage Table',
    '',
    '| Signal | Meaning | Immediate Move |',
    '| --- | --- | --- |',
    ...referenceTriageRows(item, archetype, domain).map((row) => `| ${row[0]} | ${row[1]} | ${row[2]} |`),
    '',
    '## Escalate When',
    '',
    ...referenceEscalations(item, archetype, domain).map((line) => `- ${line}`),
    '',
    '## Review Checklist',
    '',
    ...referenceChecklist(item, archetype, domain).map((line) => `- [ ] ${line}`),
    '',
    '## Ongoing Maintenance',
    '',
    ...referenceMaintenance(item, archetype, domain).map((line) => `- ${line}`),
    ''
  ].join('\n');
}

function buildDescription(item, archetype, domain) {
  return `${archetype.descriptionVerb} for ${domain.scope} in the ${item.subdomain} context.`;
}

function buildPromise(item, archetype, domain) {
  return `Use this skill to ${archetype.promise} for ${domain.scope}. The method assumes you need evidence-backed decisions, reusable artifacts, and a review trail that survives beyond the current session.`;
}

function buildUseWhen(item, archetype, domain) {
  return [
    `You are preparing to ${archetype.primaryAction} and need a repeatable operating method instead of ad hoc judgment.`,
    `The work affects ${domain.stakeholders} and the decision needs explicit tradeoffs, evidence, and ownership.`,
    `You expect review, approval, or downstream execution by someone who did not participate in the first draft.`,
    `The output must survive changing context, handoffs, or future audits.`
  ];
}

function buildDoNotUseWhen(item, archetype, domain) {
  return [
    'The request only needs a quick opinion or a lightweight one-off answer.',
    'Inputs are missing and no effort has been made to collect the minimum evidence set.',
    'Stakeholders need a decision immediately and cannot wait for the review loop defined here.',
    `Another skill already governs the narrower problem more directly than ${humanize(item.name).toLowerCase()}.`
  ];
}

function triggerLine(item, archetype, domain) {
  return `What evidence, constraints, and decision criteria do we need before we can confidently ${archetype.primaryAction} for ${domain.scope}?`;
}

function buildInputs(item, archetype, domain) {
  return [
    `Objective statement for ${humanize(item.name).toLowerCase()} with scope and non-goals.`,
    `Current state evidence covering ${domain.evidence.join(', ')}.`,
    `Named stakeholders: ${domain.stakeholders}.`,
    `Constraints across time, cost, risk, and operational limits.`,
    `Any prior decisions, incident history, or baseline metrics that frame the tradeoff space.`
  ];
}

function buildOutputs(item, archetype, domain) {
  return [
    `${humanize(item.name)} working document with assumptions, options, recommendation, and review notes.`,
    `${artifactPhrase(archetype)} that another contributor can execute without reconstructing the reasoning.`,
    `Decision log capturing unresolved risks, owners, and follow-up checkpoints.`,
    `A quality gate summary showing whether the result is ready for approval, pilot, or revision.`
  ];
}

function buildPhases(item, archetype, domain) {
  return archetype.phases.map((phase) => ({
    title: phase.title,
    objective: phase.objective(item, domain),
    actions: phase.actions(item, domain),
    exit: phase.exit(item, domain)
  }));
}

function buildDecisionRules(item, archetype, domain) {
  return [
    `Prefer options that reduce ambiguity for ${domain.stakeholders} without hiding material tradeoffs.`,
    'Do not collapse multiple decisions into one recommendation when the owners, evidence, or time horizons differ.',
    `Escalate if the chosen path increases risk without a matching control, rollback, or monitoring plan.`,
    `If evidence is incomplete, mark the gap explicitly and convert it into a prerequisite instead of quietly assuming it away.`
  ];
}

function buildAcceptance(item, archetype, domain) {
  return [
    `Scope, success criteria, and constraints are explicit and internally consistent.`,
    `The output references concrete evidence from ${domain.evidence.join(', ')} rather than generic advice.`,
    `Owners, deadlines, and review checkpoints are named wherever the result depends on follow-up action.`,
    `The recommendation includes at least one tradeoff, one rejected option, and one risk handling decision.`,
    `A reviewer can trace the conclusion back to the artifacts without additional verbal explanation.`
  ];
}

function buildFailureModes(item, archetype, domain) {
  return [
    'Inputs are broad slogans instead of evidence, which leads to output that sounds polished but cannot be executed.',
    `The team optimizes for speed and skips the tradeoff analysis needed by ${domain.stakeholders}.`,
    'Owners are implied instead of assigned, so no one closes the final decision loop.',
    'Risk handling is reduced to a warning paragraph instead of a concrete mitigation or monitoring plan.',
    'The package is approved before a second contributor can use it as a standalone artifact.'
  ];
}

function buildMetrics(item, archetype, domain) {
  return [
    `${domain.metricPrefix} cycle time from request to approved artifact.`,
    'Rework rate after first review.',
    'Number of unresolved risks carried into execution.',
    'Percentage of decisions with named owners and target dates.',
    'Auditability: whether a reviewer can reconstruct the recommendation from saved artifacts alone.'
  ];
}

function buildCollaborationNotes(item, archetype, domain) {
  return [
    `Pull in ${domain.stakeholders} early enough to validate constraints before solution shaping begins.`,
    'Keep open questions separate from blocked items so reviewers can distinguish uncertainty from missing work.',
    `Use short review loops; long silent drafting phases tend to hide assumption drift in ${item.subdomain}.`,
    'When handing off, package the recommendation, evidence links, and next decision checkpoint together.'
  ];
}

function templateSections(item, archetype, domain, fileName) {
  const title = humanize(path.basename(fileName, '.md'));
  return [
    {
      title: 'Framing',
      prompts: [
        `What exact decision or output is ${title.toLowerCase()} meant to support?`,
        'What is explicitly out of scope so the package does not sprawl?',
        `Which stakeholders from ${domain.stakeholders} must sign off before execution?`
      ],
      tableRows: [
        ['Objective', ''],
        ['Scope boundary', ''],
        ['Non-goals', ''],
        ['Decision owner', '']
      ]
    },
    {
      title: 'Evidence',
      prompts: [
        `Which evidence sources are available across ${domain.evidence.join(', ')}?`,
        'What baseline metrics define the current state?',
        'Which assumptions still need validation before approval?'
      ],
      tableRows: [
        ['Evidence source', ''],
        ['Observed signal', ''],
        ['Confidence level', ''],
        ['Gap to close', '']
      ]
    },
    {
      title: 'Options',
      prompts: [
        `List at least three viable options for ${humanize(item.name).toLowerCase()}.`,
        'What tradeoff does each option create across speed, risk, cost, and maintainability?',
        'Which option is being rejected and why?'
      ],
      tableRows: [
        ['Option', ''],
        ['Benefits', ''],
        ['Costs', ''],
        ['Risks', '']
      ]
    },
    {
      title: 'Recommendation',
      prompts: [
        'What is the recommendation in one sentence?',
        'Why is it stronger than the next-best option?',
        'Which guardrails or follow-up checks are mandatory?'
      ],
      tableRows: [
        ['Recommendation', ''],
        ['Reasoning', ''],
        ['Dependencies', ''],
        ['Approval status', '']
      ]
    },
    {
      title: 'Execution Readiness',
      prompts: [
        `What must be true before execution begins in ${domain.scope}?`,
        'Which artifacts must be stored for later review or audit?',
        'What metric or checkpoint will trigger reconsideration?'
      ],
      tableRows: [
        ['Owner', ''],
        ['Due date', ''],
        ['Checkpoint', ''],
        ['Escalation path', '']
      ]
    }
  ];
}

function templateChecklist(item, archetype, domain) {
  return [
    'Objective, scope, and non-goals are explicit.',
    `Evidence covers the relevant ${domain.scope} signals.`,
    'At least one alternative was considered and rejected with a reason.',
    'The recommendation names owners, dependencies, and review checkpoints.',
    'A reviewer can approve or reject the package without asking for missing basics.'
  ];
}

function exampleScenario(item, archetype, domain) {
  return {
    summary: [
      `Team: cross-functional ${domain.stakeholders} group operating in ${domain.scope}.`,
      `Objective: use ${humanize(item.name).toLowerCase()} to improve a live initiative rather than invent a greenfield answer.`,
      'Constraint: leadership expects a decision in one working week with traceable evidence and clear owners.'
    ],
    baseline: [
      `The current workflow lacks a durable artifact for ${humanize(item.name).toLowerCase()}.`,
      'Signals are fragmented across tickets, dashboards, and verbal context.',
      'Previous decisions created rework because rejected options and assumptions were never captured.'
    ],
    outcomes: [
      `The team produced a reusable ${artifactPhrase(archetype)} with explicit tradeoffs.`,
      'Review latency dropped because approvers could inspect one coherent package instead of reconstructing the context.',
      `The final recommendation included owners, metrics, and a follow-up checkpoint tied to ${domain.metricPrefix.toLowerCase()} operations.`
    ],
    lessons: [
      'The first draft improved only after assumptions were separated from evidence.',
      'A named reviewer caught a hidden dependency before execution started.',
      'Saving the rejected options was valuable during later retrospection.'
    ],
    reuse: [
      'Reuse the same structure for similar work by swapping in the new evidence set and stakeholder map.',
      'Do not copy the recommendation verbatim; only reuse the method, decision framing, and review gates.',
      'Archive the final package where future contributors can find the rationale quickly.'
    ]
  };
}

function exampleActions(item, archetype, domain, phase) {
  return [
    `Collected current-state evidence relevant to ${phase.title.toLowerCase()} from the working system, documents, and stakeholder interviews.`,
    `Translated ambiguous requests into explicit decisions that matter for ${domain.scope}.`,
    'Recorded the tradeoff discussion in writing instead of resolving it informally in chat.',
    `Prepared a reviewable artifact that another contributor could execute without additional explanation.`
  ];
}

function exampleArtifacts(item, archetype, domain, phase) {
  return [
    `Annotated working draft for ${humanize(item.name).toLowerCase()}.`,
    `Evidence table linking source material to the recommendation.`,
    'Owner and risk log for follow-up actions.',
    `Review notes showing what changed after the ${phase.title.toLowerCase()} pass.`
  ];
}

function exampleDecision(item, archetype, domain, phase, index) {
  return `After ${phase.title.toLowerCase()}, the team advanced the option that best balanced speed, control, and clarity for ${domain.stakeholders} while deferring lower-value enhancements to a later checkpoint ${index + 1}.`;
}

function referenceHeuristics(item, archetype, domain) {
  return [
    'Prefer artifacts with explicit boundaries over broad documents that try to answer every adjacent question.',
    'Treat missing evidence as a blocker, not a note to self.',
    `Optimize for reviewer comprehension; the package should be legible to ${domain.stakeholders} outside the creation session.`,
    'Write the recommendation in plain language first, then add domain detail and supporting evidence.',
    'Keep the owner, due date, and escalation path visible anywhere unresolved work remains.'
  ];
}

function referenceQuestions(item, archetype, domain) {
  return [
    `What decision becomes safer or faster because this ${artifactPhrase(archetype)} exists?`,
    'Which assumption would most weaken the recommendation if it proved false?',
    'What evidence supports the preferred option, and what evidence pushes against it?',
    'Could a second contributor continue the work tomorrow without a verbal briefing?',
    'What would cause the current recommendation to be revisited?' 
  ];
}

function referenceEscalations(item, archetype, domain) {
  return [
    'The recommendation depends on data that is unavailable or known to be stale.',
    'Risk has been identified but no mitigation owner or monitoring plan exists.',
    `A required stakeholder from ${domain.stakeholders} has not reviewed the decision.`,
    'Execution is starting before acceptance criteria can be checked against the saved artifacts.'
  ];
}

function referenceMaintenance(item, archetype, domain) {
  return [
    'Review the artifact after each major execution milestone and update assumptions that changed.',
    'Retire examples that no longer reflect the current stack, policy, or delivery model.',
    'Promote repeated review comments into permanent checklist items.',
    'Refresh the evidence sources when the system, team topology, or risk profile shifts.'
  ];
}

function artifactPhrase(archetype) {
  return archetype.artifact;
}

function getArchetype(item) {
  const name = item.name;

  if (name.includes('blueprint') || name.includes('architecture')) {
    return archetypes.blueprint;
  }
  if (name.includes('quality-gate') || name.includes('gate') || name.includes('review')) {
    return archetypes.gate;
  }
  if (name.includes('audit') || name.includes('register') || name.includes('threat') || name.includes('exposure')) {
    return archetypes.audit;
  }
  if (name.includes('workshop') || name.includes('playbook') || name.includes('runbook')) {
    return archetypes.workshop;
  }
  if (name.includes('brief') || name.includes('narrative') || name.includes('content') || name.includes('message') || name.includes('readme')) {
    return archetypes.narrative;
  }
  if (name.includes('orchestrator') || name.includes('routing') || name.includes('budget')) {
    return archetypes.orchestration;
  }
  if (name.includes('model') || name.includes('probe') || name.includes('lab') || name.includes('harness') || name.includes('selector') || name.includes('designer') || name.includes('tokenization') || name.includes('reproducibility') || name.includes('synthesis')) {
    return archetypes.experimental;
  }
  return archetypes.planner;
}

function getDomainLens(item) {
  return domainLenses[item.domain] ?? domainLenses['cross-domain'];
}

function buildDescriptionVerb(archetype) {
  return archetype.descriptionVerb;
}

function humanize(value) {
  return value
    .split('/')
    .pop()
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (match) => match.toUpperCase());
}

const archetypes = {
  blueprint: {
    descriptionVerb: 'Design operational blueprints',
    promise: 'turn a vague solution space into an implementable blueprint',
    primaryAction: 'design the operating shape',
    artifact: 'blueprint package',
    phases: [
      {
        title: 'Frame The System Boundary',
        objective: (item, domain) => `Define the exact system or change surface covered by ${humanize(item.name).toLowerCase()} in ${domain.scope}.`,
        actions: (item, domain) => [
          'List the system boundary, dependencies, and non-goals.',
          'Capture functional requirements and non-functional requirements separately.',
          'Name the interfaces that other teams or systems depend on.'
        ],
        exit: () => 'The architecture boundary and operating assumptions are explicit.'
      },
      {
        title: 'Model Options',
        objective: () => 'Generate viable structures before locking into a single design.',
        actions: () => [
          'Compare at least three design options.',
          'Map tradeoffs across performance, reliability, operability, and complexity.',
          'Reject options that fail the hard constraints.'
        ],
        exit: () => 'One option emerges as the best fit with recorded tradeoffs.'
      },
      {
        title: 'Specify Interfaces',
        objective: () => 'Make the design implementable by defining contracts and data flows.',
        actions: () => [
          'Describe inputs, outputs, dependencies, and failure handling.',
          'Document the key components and their responsibilities.',
          'State how the design will be validated before rollout.'
        ],
        exit: () => 'A contributor can implement without guessing the integration model.'
      },
      {
        title: 'Review Risk And Readiness',
        objective: () => 'Check that the chosen design is safe to implement and operate.',
        actions: () => [
          'Score delivery, operational, and security risks.',
          'Add rollout, rollback, and monitoring guidance.',
          'Resolve or defer open questions explicitly.'
        ],
        exit: () => 'The blueprint includes execution controls and review checkpoints.'
      }
    ]
  },
  gate: {
    descriptionVerb: 'Define enforceable quality gates',
    promise: 'define pass fail controls that catch bad changes before they escape',
    primaryAction: 'set and enforce decision gates',
    artifact: 'gate specification',
    phases: [
      {
        title: 'Define What Must Not Slip',
        objective: (item) => `Clarify which failures ${humanize(item.name).toLowerCase()} must prevent.`,
        actions: () => [
          'List the unacceptable failure modes.',
          'Map each failure mode to a signal or test.',
          'Separate blocking criteria from warning criteria.'
        ],
        exit: () => 'The gate has a concrete reason to exist.'
      },
      {
        title: 'Choose Signals',
        objective: () => 'Select the metrics, tests, and checks that can be automated or reviewed consistently.',
        actions: () => [
          'Define thresholds, waivers, and exception handling.',
          'Tie each signal to a source of truth.',
          'Remove vanity metrics that do not change a decision.'
        ],
        exit: () => 'Each control has a measurable threshold and owner.'
      },
      {
        title: 'Operationalize The Gate',
        objective: () => 'Place the gate where it blocks the right work with the least avoidable friction.',
        actions: () => [
          'Choose pre-commit, CI, release, or review checkpoints.',
          'Define reporting output for success, warning, and failure.',
          'Document how engineers appeal or remediate failures.'
        ],
        exit: () => 'The gate can run repeatedly without interpretation drift.'
      },
      {
        title: 'Review And Tune',
        objective: () => 'Keep the gate strict enough to matter and practical enough to use.',
        actions: () => [
          'Review false positives and false negatives.',
          'Tighten weak thresholds after observing real usage.',
          'Archive evidence from production incidents back into the gate.'
        ],
        exit: () => 'The gate has a maintenance path instead of becoming stale policy.'
      }
    ]
  },
  audit: {
    descriptionVerb: 'Run evidence-backed audits and governance reviews',
    promise: 'inspect the current state, surface real risk, and drive remediation with ownership',
    primaryAction: 'audit the current state',
    artifact: 'audit packet',
    phases: [
      {
        title: 'Scope The Audit',
        objective: () => 'Define what is being inspected, why, and at what level of depth.',
        actions: () => [
          'Set audit boundaries, systems, and time period.',
          'Identify evidence sources and access paths.',
          'Name the risk categories under review.'
        ],
        exit: () => 'The audit scope is specific enough to execute.'
      },
      {
        title: 'Collect Evidence',
        objective: () => 'Gather evidence from systems, documents, and stakeholder interviews.',
        actions: () => [
          'Record observed findings with timestamps and source links.',
          'Separate direct evidence from interpretation.',
          'Mark gaps that require follow-up rather than filling them with assumptions.'
        ],
        exit: () => 'The audit can be replayed by another reviewer.'
      },
      {
        title: 'Assess Severity',
        objective: () => 'Prioritize findings so remediation follows impact rather than noise.',
        actions: () => [
          'Score likelihood, impact, and detectability.',
          'Cluster findings by root cause.',
          'Decide which items are immediate blockers versus tracked remediation.'
        ],
        exit: () => 'Findings are ranked with a defensible scoring method.'
      },
      {
        title: 'Drive Remediation',
        objective: () => 'Turn findings into owned actions with review checkpoints.',
        actions: () => [
          'Assign owners and target dates.',
          'Define required evidence for closure.',
          'Schedule follow-up review for unresolved risks.'
        ],
        exit: () => 'The audit ends with an action plan, not a static report.'
      }
    ]
  },
  planner: {
    descriptionVerb: 'Plan structured decisions and execution paths',
    promise: 'shape ambiguous work into a staged plan with explicit tradeoffs',
    primaryAction: 'build a decision-ready plan',
    artifact: 'planning pack',
    phases: [
      {
        title: 'Frame The Goal',
        objective: () => 'Translate the request into a bounded objective with a clear success condition.',
        actions: () => [
          'Define the target outcome.',
          'List what success and failure look like.',
          'Capture hard constraints and sequencing requirements.'
        ],
        exit: () => 'The plan has a clear goal and a bounded scope.'
      },
      {
        title: 'Map The Work',
        objective: () => 'Break the objective into decision slices and execution stages.',
        actions: () => [
          'Identify milestones, dependencies, and decision points.',
          'Sequence work based on risk and information gain.',
          'Call out items that can run in parallel.'
        ],
        exit: () => 'The work is staged into executable chunks.'
      },
      {
        title: 'Prioritize Tradeoffs',
        objective: () => 'Choose where to spend time, risk budget, and stakeholder attention.',
        actions: () => [
          'Rank options by value, uncertainty, and reversibility.',
          'Identify what must happen now versus later.',
          'Reject low-value scope that threatens the main objective.'
        ],
        exit: () => 'The sequence and recommendation reflect explicit priorities.'
      },
      {
        title: 'Commit Execution Signals',
        objective: () => 'Set owners, checkpoints, and revision triggers before execution starts.',
        actions: () => [
          'Assign owners to each milestone.',
          'Define review checkpoints and leading indicators.',
          'Record what would cause a re-plan.'
        ],
        exit: () => 'The plan is ready to execute and revise without confusion.'
      }
    ]
  },
  workshop: {
    descriptionVerb: 'Facilitate structured sessions and reusable playbooks',
    promise: 'run a high-signal collaborative session that ends with decisions and owned follow-up',
    primaryAction: 'facilitate a structured working session',
    artifact: 'facilitation packet',
    phases: [
      {
        title: 'Prepare The Session',
        objective: () => 'Set the objective, inputs, attendees, and agenda before the meeting starts.',
        actions: () => [
          'Clarify the decision or artifact expected from the session.',
          'Choose the right participants and pre-work.',
          'Time-box the agenda and assign facilitation roles.'
        ],
        exit: () => 'The workshop has the right room and the right objective.'
      },
      {
        title: 'Open With Context',
        objective: () => 'Align the group on facts, constraints, and desired outcomes.',
        actions: () => [
          'Review the baseline data and scope.',
          'State the rules for discussion and decision-making.',
          'Capture open questions visibly.'
        ],
        exit: () => 'Participants understand the frame before ideation begins.'
      },
      {
        title: 'Drive Structured Participation',
        objective: () => 'Gather input without letting the loudest voice dominate the outcome.',
        actions: () => [
          'Use prompts, rounds, voting, or breakout work as needed.',
          'Keep the conversation attached to evidence and the stated goal.',
          'Separate parking-lot topics from the main decision.'
        ],
        exit: () => 'The group has generated and filtered useful options.'
      },
      {
        title: 'Close With Commitments',
        objective: () => 'End the session with a documented decision and owned next steps.',
        actions: () => [
          'Summarize what was decided and what remains open.',
          'Assign owners and deadlines.',
          'Publish the summary fast enough that people still act on it.'
        ],
        exit: () => 'The workshop ends with commitments, not good vibes.'
      }
    ]
  },
  narrative: {
    descriptionVerb: 'Produce high-clarity narrative and communication assets',
    promise: 'shape complex context into a communication asset that changes decisions or behavior',
    primaryAction: 'craft a clear narrative asset',
    artifact: 'narrative package',
    phases: [
      {
        title: 'Clarify Audience And Outcome',
        objective: () => 'Define who must understand the asset and what should happen next.',
        actions: () => [
          'State the audience and decision context.',
          'Choose the desired action or understanding shift.',
          'Identify what the audience already knows and what they will resist.'
        ],
        exit: () => 'The narrative is anchored to a real audience need.'
      },
      {
        title: 'Shape The Message',
        objective: () => 'Build the message hierarchy before polishing the draft.',
        actions: () => [
          'Lead with the main point.',
          'Support it with evidence, examples, and constraints.',
          'Remove any detail that does not help the audience act.'
        ],
        exit: () => 'The asset has a strong spine and clear supporting logic.'
      },
      {
        title: 'Draft For Action',
        objective: () => 'Turn the message hierarchy into a readable artifact.',
        actions: () => [
          'Use headings, summaries, and explicit calls to action.',
          'Make uncertainty visible rather than burying it in vague language.',
          'Tailor the depth to the attention span of the target audience.'
        ],
        exit: () => 'A reviewer can understand the recommendation in one pass.'
      },
      {
        title: 'Pressure Test Clarity',
        objective: () => 'Check whether the draft actually changes understanding or behavior.',
        actions: () => [
          'Test the draft with someone close to the target audience.',
          'Look for ambiguity, hidden assumptions, and missing asks.',
          'Revise until the next step is obvious.'
        ],
        exit: () => 'The final asset is concise, accurate, and action-oriented.'
      }
    ]
  },
  orchestration: {
    descriptionVerb: 'Coordinate routing, orchestration, and efficiency decisions',
    promise: 'route work to the right path with explicit policies, controls, and monitoring',
    primaryAction: 'orchestrate execution flow',
    artifact: 'routing specification',
    phases: [
      {
        title: 'Classify Inputs',
        objective: () => 'Understand the incoming work well enough to route it intelligently.',
        actions: () => [
          'Extract intent, urgency, complexity, and risk.',
          'Normalize inconsistent requests into comparable categories.',
          'Record unknowns that affect routing confidence.'
        ],
        exit: () => 'Inputs are categorized consistently.'
      },
      {
        title: 'Define Routing Policy',
        objective: () => 'Specify how decisions are made and when fallback logic applies.',
        actions: () => [
          'Create scoring or decision rules.',
          'Define fallback, escalation, and exception behavior.',
          'Document what evidence improves routing quality over time.'
        ],
        exit: () => 'Routing logic is explicit rather than implicit.'
      },
      {
        title: 'Instrument The Flow',
        objective: () => 'Make the routing behavior observable once it is live.',
        actions: () => [
          'Track decisions, latency, and failure conditions.',
          'Measure the cost of poor routing and unnecessary escalation.',
          'Make manual overrides visible for later analysis.'
        ],
        exit: () => 'The routing path can be monitored and tuned.'
      },
      {
        title: 'Tune With Feedback',
        objective: () => 'Improve the policy using real outcomes instead of intuition alone.',
        actions: () => [
          'Review overrides, misses, and costly edge cases.',
          'Update scoring rules and fallback paths.',
          'Retire logic that no longer reflects the operating environment.'
        ],
        exit: () => 'The orchestration logic evolves from observed evidence.'
      }
    ]
  },
  experimental: {
    descriptionVerb: 'Design technical experiments and research operations',
    promise: 'turn a technical question into a disciplined experiment or operating method',
    primaryAction: 'run a disciplined technical investigation',
    artifact: 'experiment package',
    phases: [
      {
        title: 'State The Technical Question',
        objective: () => 'Clarify the decision or unknown the work is meant to reduce.',
        actions: () => [
          'Write the core question and success condition.',
          'Separate hypotheses from implementation ideas.',
          'Choose the metrics that can disconfirm the current belief.'
        ],
        exit: () => 'The investigation has a falsifiable question.'
      },
      {
        title: 'Design The Method',
        objective: () => 'Choose data, controls, and evaluation structure before running tests.',
        actions: () => [
          'Define datasets, baselines, and control variables.',
          'Record environmental assumptions and reproducibility needs.',
          'Limit the first pass to the smallest discriminating test.'
        ],
        exit: () => 'The method can reveal something meaningful quickly.'
      },
      {
        title: 'Run And Observe',
        objective: () => 'Execute the method and capture results with enough detail to compare runs.',
        actions: () => [
          'Log configuration, seed state, and execution context.',
          'Capture both expected and unexpected outcomes.',
          'Compare results against the baseline instead of isolated anecdotes.'
        ],
        exit: () => 'Results are recorded in a reusable format.'
      },
      {
        title: 'Interpret And Package',
        objective: () => 'Convert raw results into a recommendation, next step, or operating rule.',
        actions: () => [
          'State what changed and why it matters.',
          'Separate signal from noise and note remaining uncertainty.',
          'Document what should be repeated, scaled, or rejected.'
        ],
        exit: () => 'The experiment produces a decision-ready artifact.'
      }
    ]
  }
};

const domainLenses = {
  'software-engineering': {
    scope: 'software delivery and system operation',
    stakeholders: 'engineering leads, developers, and operators',
    evidence: ['code paths', 'tests', 'runtime metrics', 'incident history'],
    metricPrefix: 'Delivery'
  },
  'programming-languages': {
    scope: 'language-specific implementation quality and maintainability',
    stakeholders: 'developers, reviewers, and maintainers',
    evidence: ['compiler output', 'lint results', 'test evidence', 'profiling data'],
    metricPrefix: 'Quality'
  },
  'ai-research': {
    scope: 'model development, evaluation, and research operations',
    stakeholders: 'researchers, ML engineers, and evaluators',
    evidence: ['benchmarks', 'datasets', 'experiment logs', 'model metrics'],
    metricPrefix: 'Experiment'
  },
  'project-management': {
    scope: 'planning, prioritization, and stakeholder alignment',
    stakeholders: 'project managers, product leads, and technical owners',
    evidence: ['roadmaps', 'backlogs', 'decision logs', 'delivery metrics'],
    metricPrefix: 'Planning'
  },
  'marketing-growth': {
    scope: 'market positioning, campaign execution, and growth systems',
    stakeholders: 'marketers, product marketers, and growth leads',
    evidence: ['funnel metrics', 'audience research', 'campaign reports', 'content performance'],
    metricPrefix: 'Growth'
  },
  'security-devops': {
    scope: 'security posture, delivery controls, and operational resilience',
    stakeholders: 'security engineers, platform owners, and delivery teams',
    evidence: ['scan results', 'control evidence', 'pipeline logs', 'incident data'],
    metricPrefix: 'Risk'
  },
  'operations-governance': {
    scope: 'governance, risk, controls, and operational accountability',
    stakeholders: 'governance owners, team leads, and auditors',
    evidence: ['access records', 'policy documents', 'risk logs', 'audit trails'],
    metricPrefix: 'Governance'
  },
  'cross-domain': {
    scope: 'cross-functional operating systems and shared practices',
    stakeholders: 'cross-functional contributors and decision-makers',
    evidence: ['shared artifacts', 'workflow data', 'handoff notes', 'review history'],
    metricPrefix: 'Operating'
  }
};

await main();

async function main() {
  for (const item of skillItems) {
    const skillDir = path.join(repoRoot, path.dirname(item.path));
    const resourceMap = await ensureResourceLayout(skillDir, item.name);

    await fs.writeFile(
      path.join(skillDir, 'SKILL.md'),
      buildSkillDocument(item, resourceMap),
      'utf8'
    );

    for (const fileName of resourceMap.templates) {
      await fs.writeFile(
        path.join(skillDir, 'templates', fileName),
        buildTemplateDocument(item, fileName),
        'utf8'
      );
    }

    for (const fileName of resourceMap.examples) {
      await fs.writeFile(
        path.join(skillDir, 'examples', fileName),
        buildExampleDocument(item, fileName),
        'utf8'
      );
    }

    for (const fileName of resourceMap.references) {
      await fs.writeFile(
        path.join(skillDir, 'references', fileName),
        buildReferenceDocument(item, fileName),
        'utf8'
      );
    }
  }

  console.log(`Enriched ${skillItems.length} skill packages.`);
}

function referenceEvidenceExpectations(item, archetype, domain) {
  return [
    `Expect evidence from ${domain.evidence.join(', ')} whenever the recommendation claims a priority, risk, or expected impact.`,
    'If the draft cites assumptions, the assumption owner and validation plan must be named.',
    'If a tradeoff is described as acceptable, the downside must be visible, not implied.',
    `Require a saved artifact that can be reviewed asynchronously by ${domain.stakeholders}.`
  ];
}

function referenceReviewerMoves(item, archetype, domain) {
  return [
    'Ask the author to restate the recommendation in one sentence; if that fails, the artifact is not ready.',
    'Challenge the strongest rejected option, not only the chosen path.',
    'Trace one important conclusion back to raw evidence to confirm the reasoning chain holds.',
    'Check whether the artifact still makes sense if the primary owner is unavailable tomorrow.',
    'Look for hidden dependencies, especially when timelines seem unusually optimistic.'
  ];
}

function referenceTriageRows(item, archetype, domain) {
  return [
    ['Missing owner', 'Follow-up work will drift', 'Block approval until ownership is assigned'],
    ['Weak evidence', 'The recommendation is opinion-heavy', 'Request concrete sources or reduce the claim'],
    ['No rejected option', 'Tradeoff quality is unclear', 'Ask for at least one serious alternative'],
    ['Risk without control', 'Execution may create unmanaged failure', 'Add mitigation, monitor, or rollback plan'],
    ['Unclear checkpoint', 'The team will not know when to revisit', 'Define a date, metric, or event trigger']
  ];
}

function referenceChecklist(item, archetype, domain) {
  return [
    'Recommendation is explicit and reviewable.',
    'Evidence and assumptions are distinguishable.',
    'Rejected options are captured with reasons.',
    'Owners, dates, and escalation paths are named.',
    'A second contributor could continue the work from the saved artifacts alone.'
  ];
}