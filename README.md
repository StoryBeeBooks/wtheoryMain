# wtheory.com

Corporate website for **West Solution Consulting Corp.** — a consulting firm that engineers digital infrastructure to help small businesses scale into market leaders.

**Live at:** [wtheory.com](https://wtheory.com)

## Stack

- Pure HTML5, CSS3, Vanilla JavaScript
- Hosted on GitHub Pages
- No frameworks, no build tools, no dependencies

## Structure

```
├── index.html                        # Corporate homepage & solution routing
├── global-intelligence.html          # OSINT infrastructure directory
├── faq.html                          # Global FAQ with JSON-LD schema
│
├── waymark.html                      # Waymark product landing page
├── waymark-support.html              # Waymark help center
├── waymark-privacy-policy.html       # Waymark privacy policy
├── waymark-terms-of-service.html     # Waymark terms of service
│
├── access-canada.html                # Access Canada (launching soon)
├── access-canada-support.html
├── access-canada-privacy-policy.html
├── access-canada-terms-of-service.html
│
├── signet.html                       # Signet (launching soon)
├── signet-support.html
├── signet-privacy-policy.html
├── signet-terms-of-service.html
│
├── privacy-policy.html               # Corporate legal pages
├── terms-of-service.html
├── cookies-policy.html
├── accessibility.html
├── disclaimer.html
│
├── css/style.css                     # Shared design system
├── js/layout.js                      # Header/footer injection
├── components/header.html            # Shared navigation
└── components/footer.html            # Shared footer
```

## Architecture

- **Flat file structure** — all pages at root, no directory nesting
- **Naming convention** — `{product}-{page}.html` (e.g. `waymark-support.html`)
- **Shared chrome** — header and footer are fetched and injected via `layout.js` on every page
- **Two-tier legal** — corporate-level policies at root + product-specific policies with product prefix
- **Product pages** keep their own navigation (section anchors) while receiving the shared footer

## Solutions

| Product | Description | Status |
|---------|-------------|--------|
| [Waymark](https://wtheory.com/waymark.html) | iPadOS app for live transcription, translation, and AI analysis | Live |
| [Access Canada](https://wtheory.com/access-canada.html) | Market entry ecosystem for international businesses expanding into Canada | Coming Soon |
| [Signet](https://wtheory.com/signet.html) | Strategic intelligence platform for local business growth | Coming Soon |
| [Web Development](https://sites.wtheory.com) | Enterprise web presence services | Live |

## License

© 2026 West Solution Consulting Corp. All rights reserved.
