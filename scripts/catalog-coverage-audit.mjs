#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const auditName = 'catalog-coverage-audit';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const shadowSkillsRoot = path.join(repoRoot, 'skills');

const shadowSkillFolders = fs
  .readdirSync(shadowSkillsRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

const shadowSkillCount = shadowSkillFolders.length;
const resourceCoverage = shadowSkillFolders.map((skill) => {
  const base = path.join(shadowSkillsRoot, skill);
  const hasTemplates = isNonEmptyDirectory(path.join(base, 'templates'));
  const hasExamples = isNonEmptyDirectory(path.join(base, 'examples'));
  const hasReferences = isNonEmptyDirectory(path.join(base, 'references'));
  const score = Number(hasTemplates) + Number(hasExamples) + Number(hasReferences);

  return {
    skill,
    hasTemplates,
    hasExamples,
    hasReferences,
    score
  };
});

const fullyResourceBacked = resourceCoverage.filter((item) => item.score === 3).length;
const partialResourceBacked = resourceCoverage.filter((item) => item.score > 0 && item.score < 3).length;
const missingResourceBacked = resourceCoverage.filter((item) => item.score === 0);

console.log(`Catalog coverage audit (${auditName})`);
console.log(`- skill packages: ${shadowSkillCount}`);
console.log(`- fully resource-backed skills: ${fullyResourceBacked}`);
console.log(`- partially resource-backed skills: ${partialResourceBacked}`);
console.log(`- skills with no companion resources: ${missingResourceBacked.length}`);

const topGaps = missingResourceBacked.slice(0, 15).map((item) => item.skill);
if (topGaps.length > 0) {
  console.log('- top resource-pack gap candidates:');
  for (const skill of topGaps) {
    console.log(`  - ${skill}`);
  }
}

const fullCoverageRatio = shadowSkillCount > 0 ? ((fullyResourceBacked / shadowSkillCount) * 100).toFixed(2) : '0.00';
console.log(`- full resource coverage: ${fullCoverageRatio}%`);

function isNonEmptyDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return false;
  }

  const stat = fs.statSync(dirPath);
  if (!stat.isDirectory()) {
    return false;
  }

  return fs.readdirSync(dirPath).length > 0;
}
