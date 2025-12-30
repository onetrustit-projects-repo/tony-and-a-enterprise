# Monorepo Structure

This repository hosts multiple project types organized by category.

## Directory Structure

```
├── .github/              # GitHub Actions workflows
├── .cursor/              # Cursor IDE rules (optional)
├── scripts/              # Shared build/test/deploy scripts
├── docs/                 # Repository documentation
├── projects/             # All projects
│   ├── websites/         # Static and dynamic web projects
│   ├── skills/           # Claude Skills
│   ├── automation/       # DevOps and automation scripts
│   ├── libraries/        # Reusable code libraries
│   └── apps/             # Desktop and mobile applications
├── README.md
├── AGENTS.md             # AI agent guidelines
└── CONVERSATION_HISTORY.md
```

## Project Types

### Websites (`projects/websites/`)

Static sites, SPAs, and web applications.

**Structure:**
```
projects/websites/[name]/
├── src/                  # Source code
├── public/               # Static assets
├── tests/                # Test files
├── package.json          # Dependencies
└── README.md
```

### Skills (`projects/skills/`)

Claude Skills for AI assistant extensions.

**Structure:**
```
projects/skills/[name]/
├── SKILL.md              # Required: skill documentation
├── scripts/              # Python/Bash executables
├── references/           # Documentation
├── examples/             # Usage examples
└── assets/               # Templates, configs
```

### Automation (`projects/automation/`)

DevOps, infrastructure, and automation scripts.

**Structure:**
```
projects/automation/[type]/[name]/
├── config/               # Configuration files
├── scripts/              # Automation scripts
├── README.md
└── .env.example
```

### Libraries (`projects/libraries/`)

Reusable code packages.

**Structure:**
```
projects/libraries/[name]/
├── src/                  # Source code
├── tests/                # Unit tests
├── package.json          # or pyproject.toml
└── README.md
```

### Apps (`projects/apps/`)

Desktop and mobile applications.

**Structure:**
```
projects/apps/[platform]/[name]/
├── src/                  # Application source
├── tests/                # Tests
└── README.md
```

## Shared Commands

```bash
# Build all projects
./scripts/build-all.sh

# Test all projects
./scripts/test-all.sh

# Deploy all websites
./scripts/deploy-websites.sh
```

## Contributing

1. Create project in appropriate `projects/[type]/` directory
2. Add README.md with setup instructions
3. Add `.env.example` for credentials
4. Update this README if adding new project type
