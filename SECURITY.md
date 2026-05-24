# Security Policy

## Scope

This is a static educational website with no backend, no user accounts, no authentication, and no data collection. There is no server-side code and no personally identifiable information is processed or stored.

The attack surface is limited to:
- The static HTML/JS/CSS bundle served by Netlify
- Third-party embeds (YouTube `youtube-nocookie.com`)
- External links to primary sources

## Reporting a Security Vulnerability

If you discover a genuine security issue (e.g. a supply-chain problem in the build dependencies, a harmful redirect in an embedded resource, or a Netlify misconfiguration), please use **[GitHub's private vulnerability reporting](https://github.com/bster/ai-future/security/advisories/new)** rather than filing a public issue.

GitHub's private reporting allows you to describe the issue without disclosing it publicly until it's been assessed and addressed.

## Content Errors Are Not Security Issues

Broken links, outdated facts, or sourcing problems are content errors, not security vulnerabilities. Please report those via [GitHub Issues](https://github.com/bster/ai-future/issues) using the appropriate issue template.
