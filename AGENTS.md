# AGENTS.md

This file provides guidelines for AI agents operating in the Awesome Claude Skills repository.

## Project Overview

This is a collection of Claude Skills - modular, self-contained packages that extend Claude's capabilities. Each skill resides in its own directory with a required `SKILL.md` file and optional bundled resources (scripts/, references/, assets/).

## Build, Lint, and Test Commands

```bash
# Initialize a new skill from template
python3 skill-creator/scripts/init_skill.py <skill-name> --path <output-directory>

# Package a skill for distribution
python3 skill-creator/scripts/package_skill.py <path/to/skill-folder>

# Validate all skills (runs n8n, unifi tests)
bash scripts/test_all_skills.sh

# Test individual skill scripts
python3 n8n-automation/scripts/n8n_automation.py workflow test
python3 unifi-access/scripts/unifi_access.py sitemanager $KEY hosts
python3 grafana-automation/scripts/grafana_automation.py dashboard list

# Quick validation for new skills
python3 skill-creator/scripts/quick_validate.py <skill-path>

# Load environment variables for testing
source scripts/setup_environment.sh
```

## Code Style Guidelines

### Python Style

| Element | Convention | Example |
|---------|------------|---------|
| Classes | PascalCase | `N8nAPI`, `GrafanaClient` |
| Functions/methods | snake_case | `get_dashboard()` |
| Variables | snake_case | `api_key`, `workflow_id` |
| Constants | UPPER_SNAKE_CASE | `DEFAULT_TIMEOUT` |
| Private methods | `_snake_case()` | `_make_request()` |
| Type aliases | PascalCase | `WorkflowDict = Dict[str, Any]` |

### Imports

```python
# Standard library first (alphabetical), then third-party, then local
import json
import os
import sys
from pathlib import Path
from typing import Optional, Dict, Any, List, Union
from urllib.parse import urljoin

import requests
from PIL import Image

from .utils import helper_function
```

### Type Hints & Docstrings

```python
def get_workflow(self, workflow_id: str) -> Dict[str, Any]:
    """Get workflow by ID."""
    ...

def create_dashboard(
    self,
    name: str,
    panels: List[Dict],
    folder_id: int = 0
) -> Dict[str, Any]:
    """Create a new dashboard with specified panels.

    Args:
        name: Display name for the dashboard
        panels: List of panel configurations
        folder_id: Target folder ID (default: 0)

    Returns:
        Dictionary containing created dashboard metadata

    Raises:
        DashboardError: If dashboard creation fails
    """
```

### Error Handling

- Define custom exceptions per module:
  ```python
  class N8nError(Exception):
      """Custom exception for n8n operations."""
      pass
  ```
- Use specific exception types, not bare `except:`
- Include context in error messages
- Return structured error responses in CLI tools

### CLI Argument Parsing

Use `argparse` for CLI tools with subcommands:

```python
def main():
    parser = argparse.ArgumentParser(
        description="Grafana Automation CLI",
        formatter_class=argparse.RawDescriptionHelpFormatter
    )
    subparsers = parser.add_subparsers(dest="command", help="Commands")
    # ... add subparsers
    args = parser.parse_args()
```

### File Structure

```
skill-name/
├── SKILL.md              # Required: skill documentation (frontmatter + content)
├── scripts/              # Optional: Python/Bash executables
├── examples/             # Optional: JSON templates, input files
├── references/           # Optional: documentation for context
├── assets/               # Optional: templates, images, fonts
└── .env.example          # Optional: credential template
```

### SKILL.md Format

```markdown
---
name: skill-name
description: Clear, specific description of what the skill does.
---

# Skill Title

## When to Use
- Scenario 1
- Scenario 2

## Instructions
Detailed instructions for Claude...

## Examples
Practical usage examples...
```

### Security

- Never commit `.env` files or API keys
- Use environment variables for credentials
- Remove exposed credentials from documentation immediately
- Validate and sanitize all inputs
- Use HTTPS for all API connections

### General Guidelines

- Keep functions focused (single responsibility)
- Use meaningful variable and function names
- Write modular, reusable code
- Handle edge cases and failures gracefully
- Test scripts work before committing
- Use `pathlib.Path` for file operations
- Use type hints consistently
- Follow existing patterns in each skill
