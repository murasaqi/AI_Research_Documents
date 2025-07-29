# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Docusaurus-based knowledge base called "AI Research Documents" (AIリサーチの記録と振り返り) for documenting AI research, development notes, experimental results, and ideas in chronological order.

## Commands

### Development
```bash
# Start development server
npm start

# Build the site
npm build

# Serve the built site locally
npm serve

# Clear cache
npm run clear
```

## Architecture

### Tech Stack
- **Docusaurus 3.8.1** - Static site generator
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Mermaid** - Diagram support

### Project Structure
```
my-notes/
├── docs/                    # All documentation content
│   ├── intro.md            # Homepage (slug: /)
│   ├── YYYY-MM-DD-*.md     # Date-prefixed documents
│   └── *.md                # Other documents
├── src/
│   ├── css/custom.css      # Custom styling
│   └── pages/              # Custom React pages
├── static/                 # Static assets
├── docusaurus.config.js    # Main configuration
└── sidebars.js            # Sidebar structure
```

### Key Configuration
- **Docs at root**: The docs are served at `/` instead of `/docs/`
- **Japanese locale**: Default locale is set to `ja`
- **No blog**: Blog feature is disabled
- **Mermaid support**: Enabled for diagrams
- **Auto-generated sidebar**: Documents are automatically included

## Document Format

This project uses a structured format for recording AI dialogues:

### File Naming Convention
- Use `YYYY-MM-DD-title.md` format for chronological organization
- Example: `2025-01-28-ai-dialogue-format.md`

### Front Matter
```markdown
---
title: Document Title
tags: [ai, development, tag3]
date: YYYY-MM-DD
---
```

### AI Dialogue Recording Format
When documenting AI conversations, use the established format with:
- 💭 for human thoughts/requests
- 🤖 for AI responses
- Quote blocks for dialogue
- Code blocks for technical details

See `docs/2025-01-28-ai-dialogue-format.md` for the complete format guide and `docs/ai-dialogue-format-template.md` for a ready-to-use template.