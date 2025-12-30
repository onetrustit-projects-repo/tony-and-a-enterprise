# GitHub Actions Security Best Practices

This document outlines security practices for GitHub Actions in this repository.

## Principle of Least Privilege

- Use minimal permissions for workflow tokens
- Avoid `GITHUB_TOKEN` with admin permissions
- Use separate tokens for different operations

## Secure Workflow Configuration

### Minimal Permissions

```yaml
permissions:
  contents: read
  id-token: write  # Only if needed for OIDC
  packages: read
```

### Environment Protection

```yaml
jobs:
  deploy:
    environment: production
    environment-url: https://example.com
```

## Secrets Management

### Do's

- ✅ Store all secrets in GitHub encrypted secrets
- ✅ Use environment-specific secrets for different stages
- ✅ Rotate secrets periodically
- ✅ Use OIDC for cloud provider authentication

### Don'ts

- ❌ Never commit `.env` files
- ❌ Never hardcode secrets in workflows
- ❌ Don't use secrets in debug logging
- ❌ Don't expose secrets in job summaries

## OIDC for Cloud Providers

### AWS (Recommended)

```yaml
- name: Configure AWS Credentials
  uses: aws-actions/configure-aws-credentials@v4
  with:
    role-to-assume: arn:aws:iam::123456789012:role/github-actions
    aws-region: us-east-1
```

### GitHub (OIDC)

```yaml
permissions:
  id-token: write
  contents: read
```

## Third-Party Actions

### Pin to Commit SHA

```yaml
uses: actions/checkout@v4  # NOT recommended
uses: actions/checkout@11bd7c129d4a1ec6e6e3e2f5e8b1a5c5e8d9c8b7a  # Recommended
```

### Review Third-Party Actions

- Check action repository stars and activity
- Review action source code before using
- Use actions from trusted organizations

## Security Scanning

### CodeQL

```yaml
- name: Initialize CodeQL
  uses: github/codeql-action/init@v3
  with:
    languages: javascript,python
```

### Dependency Scanning

```yaml
- name: Dependency Review
  uses: actions/dependency-review-action@v4
```

## Job Security

### Avoid Untrusted Code

```yaml
# DANGER: Runs untrusted code
- name: Run user script
  run: |
    curl -s https://example.com/script.sh | bash
```

### Use Container Security

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    container: node:20-alpine
```

## Audit Logging

- All workflow runs are logged
- Review audit logs periodically
- Set up alerts for suspicious activity

## References

- [GitHub Actions Security Hardening](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions)
- [Encrypted Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [OpenID Connect](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments-using-openid-connect)
