# GitHub Setup Guide

This guide walks through securely setting up the monorepo on GitHub.

## Prerequisites

- GitHub account with repository creation permissions
- Git installed locally
- SSH key added to GitHub (recommended) or personal access token

## Step 1: Create Repository

### Option A: Via GitHub Web UI

1. Go to https://github.com/new
2. Repository name: `my-monorepo` (or your choice)
3. Description: "Multi-project monorepo for websites, skills, and automation"
4. **Private** or **Public** based on your needs
5. Do NOT initialize with README (we'll push existing code)
6. Click "Create repository"

### Option B: Via CLI

```bash
# Create repo on GitHub first (via web), then:
gh repo create my-monorepo --private --source=. --push
```

## Step 2: Connect Local Repo

```bash
# If starting fresh
git init
git add .
git commit -m "Initial commit: monorepo structure"

# Add remote (replace with your repo URL)
git remote add origin git@github.com:yourusername/my-monorepo.git

# Push to GitHub
git push -u origin main
```

## Step 3: Configure Repository Security

### Enable Security Features (Settings → Security)

#### 1. Enable Dependabot
```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule: "weekly"
  - package-ecosystem: "pip"
    directory: "/"
    schedule: "weekly"
```
**Settings → Security → Dependabot → Enable**

#### 2. Enable Secret Scanning
**Settings → Security → Secret scanning → Enable**

#### 3. Enable Push Protection
**Settings → Security → Push protection → Enable**

## Step 4: Set Up GitHub Secrets

### Repository Secrets (Settings → Secrets and variables → Actions)

#### Required Secrets

| Secret Name | Description | How to Get |
|-------------|-------------|------------|
| `GH_PAGES_TOKEN` | GitHub Pages deploy token | Settings → Developer settings → Personal access tokens → Generate (repo scope) |
| `NETLIFY_AUTH_TOKEN` | Netlify deployment | Netlify user settings → Personal access tokens |
| `NETLIFY_SITE_ID` | Netlify site ID | Site settings → General → Site ID |
| `AWS_ACCESS_KEY_ID` | AWS S3 deployment | AWS IAM → Create user with S3 access |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key | AWS IAM → Create user with S3 access |

#### Example: Adding Secrets via CLI

```bash
# Using GitHub CLI
gh secret set GH_PAGES_TOKEN --body "ghp_xxxxxxxxxxxx"
gh secret set NETLIFY_AUTH_TOKEN --body "xxxxxxxxxxxxxxxx"
gh secret set AWS_ACCESS_KEY_ID --body "AKIAXXXXXXXX"
gh secret set AWS_SECRET_ACCESS_KEY --body "xxxxxxxxxxxx"
```

#### Example: Adding Secrets via Web

1. Go to **Settings → Secrets and variables → Actions**
2. Click **New repository secret**
3. Add name and value
4. Click **Add secret**

## Step 5: Configure Branch Protection

### Main Branch Protection (Settings → Branches → Add rule)

#### Required Settings

| Setting | Value | Purpose |
|---------|-------|---------|
| Branch name pattern | `main` | Protect main branch |
| Require pull request | ✓ | Code review required |
| Required reviewers | 1 | At least 1 approval |
| Require status checks | ✓ | CI must pass |
| Require signed commits | ✓ | Verified commits |
| Require linear history | ✓ | No merge commits |
| Allow force push | ✗ | Prevent force pushes |
| Restrict who can push | ✗ | (Optional) |

### Status Checks to Require

```
ci.yml / validate
ci.yml / test-scripts
ci.yml / test-websites (for website changes)
skills.yml / validate-skills (for skill changes)
```

## Step 6: Configure Repository Settings

### General Settings

- **Features → Issues**: Enable
- **Features → Projects**: Enable (optional)
- **Features → Discussions**: Enable (optional)

### Pull Requests

- **Allow squash merging**: Recommended
- **Allow rebase merging**: Optional
- **Allow auto-merge**: Optional (requires status checks)
- **Default to pull request template**: Add `PULL_REQUEST_TEMPLATE.md`

### Security & Analysis

Enable all:
- ✅ Dependabot alerts
- ✅ Dependabot security updates
- ✅ Secret scanning
- ✅ Push protection

## Step 7: Add Security Policies

### Create `SECURITY.md`

```markdown
# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| main | ✅ Latest |

## Reporting a Vulnerability

To report a vulnerability, please email:
security@yourdomain.com

Do NOT open public issues for security vulnerabilities.

## Security Best Practices

- All secrets stored in GitHub encrypted secrets
- No .env files committed to repository
- Branch protection enabled on main
- Required code review for all changes
- Signed commits required
```

## Step 8: Add Code Owners

Create `.github/CODEOWNERS`:

```markdown
# Code Owners

# Default owners
* @yourusername

# Website changes
projects/websites/** @web-team
projects/websites/** @yourusername

# Skills
projects/skills/** @yourusername

# Automation
projects/automation/** @devops-team

# Libraries
projects/libraries/** @yourusername

# CI/CD
.github/workflows/** @yourusername
```

## Step 9: Add Issue Templates

Create `.github/ISSUE_TEMPLATE/`:

### Bug Report (`bug_report.md`)
```markdown
---
name: Bug report
about: Create a report to help us improve
labels: bug
---

## Description
<!-- A clear description of the bug -->

## Steps to Reproduce
<!-- Exact steps to reproduce -->
1. 
2. 

## Expected Behavior
<!-- What should happen -->

## Actual Behavior
<!-- What actually happens -->

## Environment
<!-- OS, Node version, etc. -->
```

### Feature Request (`feature_request.md`)
```markdown
---
name: Feature request
about: Suggest an idea for this project
labels: enhancement
---

## Description
<!-- Brief description of the feature -->

## Motivation
<!-- Why is this useful -->

## Proposed Solution
<!-- How should it work -->

## Alternatives
<!-- Any alternatives considered -->
```

## Step 10: Verify Setup

```bash
# Test GitHub Actions locally (optional)
npm install -g @githubnext/github-actions-local-runner

# Push a test change
echo "# Test" >> README.md
git add .
git commit -m "test: verify CI pipeline"
git push

# Check Actions tab on GitHub
gh run list
```

## Verification Checklist

- [ ] Repository created on GitHub
- [ ] Local repo connected and pushed
- [ ] GitHub secrets configured
- [ ] Branch protection rules on main
- [ ] Required status checks configured
- [ ] Dependabot enabled
- [ ] Secret scanning enabled
- [ ] SECURITY.md created
- [ ] CODEOWNERS created
- [ ] Issue templates created
- [ ] CI pipeline runs successfully

## Common Issues

### "Workflow not running"

- Check Actions tab for errors
- Verify branch protection allows workflows
- Ensure required secrets are set

### "Secret not found"

- Verify secret name matches workflow
- Check repository access (org vs repo secrets)
- Re-add secret if corrupted

### "Permission denied"

- Check personal access token scopes
- Verify GitHub Actions permissions in settings
- Review repository admin settings
