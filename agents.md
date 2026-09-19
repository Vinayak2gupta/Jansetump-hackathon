# AGENTS.md

Guidance for AI agents (and humans) working on this repository.

## What this project is

JanSetu is a static, client-only citizen-services prototype: a knowledge base of government welfare
schemes, a plain-language eligibility matcher, and a grievance redressal form. See `README.md` for the
product description and file map.

## Architecture

- No build step, no framework, no bundler. Every `.html` file at the project root is a real, independently
  loadable page — there is no client-side router.
- All scheme content lives in one place: `assets/js/schemes-data.js` (`SCHEMES` array + `TAG_SYNONYMS` map
  + `CATEGORIES` list). Both `schemes.js` (knowledge base) and `eligibility.js` (matcher) read from this
  same file, so it is the single source of truth — update scheme data there, not inline in HTML.
- The eligibility "engine" is deliberately simple: free text is lower-cased and checked for substring
  matches against `TAG_SYNONYMS`, then schemes are ranked by tag overlap. It is not an LLM call — no server
  round-trip, so it works offline and instantly. If this is ever upgraded to an LLM-backed matcher, it
  would need a Netlify Function (see the `netlify-functions` and `netlify-ai-gateway` skills) since API
  keys can't live in client-side JS.
- Cross-page context (which scheme a grievance relates to) is passed via URL query params
  (`?scheme=<id>&name=<Scheme+Name>`), read by `grievance.js` on load. There is no shared client-side
  state beyond the URL.
- The grievance form is a real static `<form data-netlify="true">` — Netlify's build bot detects it
  directly at deploy time because it's plain HTML, no SPA skeleton trick needed. It submits with a normal
  full-page POST to `/thank-you.html` (no AJAX), which is the simplest reliable pattern for a static
  multi-page site.
- The hero illustration (`img/hero.png`) was generated once via Netlify AI Gateway (Gemini image model)
  during initial build and is checked into the repo as a static asset. It is served through
  `/.netlify/images?url=/img/hero.png...` (Netlify Image CDN) rather than directly, for responsive
  resizing/format negotiation. There is no runtime image-generation feature — don't add one unless asked.

## Conventions

- Every page repeats the same header/nav/footer markup rather than using a templating layer — this is a
  deliberate tradeoff for a zero-build static site. When changing nav links or branding, update all five
  HTML files (`index.html`, `schemes.html`, `eligibility.html`, `grievance.html`, `thank-you.html`).
- Tailwind is loaded via the CDN `<script>` (play CDN), configured inline per page with the same `gov`
  color extension. Keep that config block identical across pages.
- Icons come from Lucide via CDN; `main.js` calls `lucide.createIcons()` on load, and any script that
  injects new `<i data-lucide="...">` markup after load must call `window.lucide.createIcons()` again
  (see `schemes.js` and `eligibility.js` for the pattern).

## Roadmap

See the "Roadmap" section in `README.md` for what a next milestone (real persistence, department-editable
content, status tracking) would look like. No `PLAN.md` exists — this build was delivered as a complete,
self-contained prototype rather than staged across milestones.
