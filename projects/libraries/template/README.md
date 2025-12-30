# Library Template

A reusable code library template.

## Structure

```
├── src/                  # Source code
│   ├── index.ts          # Main export
│   ├── utils/
│   └── types/
├── tests/                # Unit tests
├── package.json          # or pyproject.toml
├── tsconfig.json         # or pyproject.toml
└── README.md
```

## Quick Start

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build
npm run build

# Publish
npm publish
```

## Usage

### TypeScript/JavaScript

```typescript
import { myFunction } from '@my-org/my-library';

myFunction('input');
```

### Python

```python
from my_library import my_function

my_function('input')
```

## Publishing

### npm

```bash
npm login
npm publish --access public
```

### PyPI

```bash
pip install build
python -m build
twine upload dist/*
```

## Versioning

This library uses [Semantic Versioning](https://semver.org/).

```
MAJOR.MINOR.PATCH
```

- MAJOR: Breaking changes
- MINOR: New features (backward compatible)
- PATCH: Bug fixes
