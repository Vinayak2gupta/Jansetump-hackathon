# JanSetu Hackathon Submission Brief

## One-minute pitch

JanSetu helps citizens move from "I may be eligible" to a concrete next step. It brings welfare schemes, scholarships, farm support, learning resources, eligibility guidance, and grievance escalation into one citizen-facing flow. The product is designed for people who should not need to understand departmental structure before finding help.

## The problem

Government benefits are fragmented across departments, eligibility language is difficult to interpret, and a delayed DBT or rejected application often has no obvious escalation path. These gaps disproportionately affect people with limited time, connectivity, or familiarity with government portals.

## What is different

- Plain-language eligibility matching instead of a long form-first workflow.
- A single searchable knowledge base covering MP and central schemes.
- Scheme context follows the citizen into the grievance form.
- Official application links remain visible, so JanSetu guides rather than impersonates a government portal.
- Multilingual navigation and a guarded AI assistant support first-time users.
- The entire experience is a lightweight multi-page web app with no framework or build step.

## Three-minute demo

1. Start on `index.html` and choose **Check What I'm Eligible For**.
2. Use the farmer example and show ranked scheme matches.
3. Open a scheme detail, then choose **Report a problem** to demonstrate scheme context pre-filling the grievance form.
4. Return to the home page and choose **A farmer comparing options** to show category filtering.
5. Open the chat widget and ask: `I am a farmer whose payment is delayed. What should I check?`
6. Show the official scheme link and the grievance pathway. End by pointing out that personal secrets such as Aadhaar, OTPs, passwords, and bank details are not requested.

## Technical proof points

- `assets/js/schemes-data.js` is the single source of truth for scheme content and tags.
- `assets/js/eligibility.js` ranks matches locally and instantly by tag overlap.
- `assets/js/main.js` provides the independent browser-side assistant without an API key or server.
- `grievance.html` creates a downloadable record so the workflow remains useful on any static host.
- Every page is independently loadable, which keeps the prototype resilient and easy to deploy.

## Deployment

Run locally by opening `index.html`, or serve the folder with any static web server. The project has no required
backend, API key, paid credits, or hosting vendor.

## Important disclaimer

JanSetu is an independent prototype. Scheme details are illustrative and must be verified on the linked official department portal before a citizen applies.
