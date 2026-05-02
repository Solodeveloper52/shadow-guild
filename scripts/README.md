# Scripts

Automation scripts for install, enrichment, and coverage auditing.

## Files

- `install.mjs`: installer CLI
- `catalog-coverage-audit.mjs`: resource-backed coverage audit
- `enrich-skill-catalog.mjs`: catalog content enrichment utility

## Common Commands

```bash
node scripts/install.mjs list
node scripts/install.mjs install --class software --dry-run
node scripts/catalog-coverage-audit.mjs
```
