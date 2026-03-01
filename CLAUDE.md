# clearway

Clearway — crowdfunding landing page for a fictional ethical banking startup from HBO's Industry

## Stack
<!-- Fill in your project's tech stack -->

## Rules
<!-- Add project-specific rules for AI agents -->

## Context Routing

<!-- Point agents to subdirectory CLAUDE.md files -->
<!-- Example: → src: src/CLAUDE.md -->

## Agent Memory System

### Before Working
- Read this file for global context
- Check .memory/decisions.md before architectural changes
- Check .memory/patterns.md before implementing common functionality

### After Work
- Update relevant CLAUDE.md if conventions changed
- Log decisions to .memory/decisions.md (ADR format)
- Log patterns to .memory/patterns.md
- Uncertain inferences → .memory/inbox.md (never canonical files)

### Safety
- Never record secrets, API keys, or user data
- Never overwrite decisions — mark as [superseded]
- Never promote from inbox without user confirmation
