# SECURITY.md Template

## Security Policy

Thank you for helping keep this project secure.

## Supported Versions

| Version | Supported |
|---------|-----------|
| Latest | ✅ Active development |
| Previous | ⚠️ Limited support |
| Older | ❌ Not supported |

## Reporting a Vulnerability

### Do NOT open public issues for security vulnerabilities

To report a vulnerability, please use one of these methods:

1. **Email**: Send to `security@yourdomain.com`
2. **GitHub Private Vulnerability Report**: Use the "Report a vulnerability" button

We typically respond to vulnerability reports within 24-48 hours.

### Information to Include

When reporting, please include:

- Description of the vulnerability
- Steps to reproduce
- Affected component(s)
- Potential impact
- Any proposed fixes (optional)

## Security Best Practices

### For Contributors

1. **Never commit secrets** - Use `.env` files and GitHub secrets
2. **Review before pushing** - Check for accidental credential exposure
3. **Use signed commits** - Verify your identity
4. **Follow least privilege** - Request minimal permissions for Actions

### For Users

1. **Keep updated** - Use latest version for security patches
2. **Audit dependencies** - Review Dependabot security alerts
3. **Use environment variables** - Don't hardcode credentials
4. **Monitor deployments** - Review CI/CD activity

## Security Features

This repository uses:

- ✅ Branch protection on main
- ✅ Required code review
- ✅ Status checks before merge
- ✅ Dependabot for dependency updates
- ✅ CodeQL for code analysis
- ✅ Dependency review
- ✅ Secret scanning
- ✅ Push protection
- ✅ Signed commits recommended

## Related Resources

- [GitHub Security Documentation](https://docs.github.com/en/code-security)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Security Hardening for GitHub Actions](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions)
