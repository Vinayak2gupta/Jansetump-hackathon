# JanSetu

JanSetu is a citizen-facing prototype built for the MP Online Innovation Hackathon. It helps citizens
discover the government welfare schemes, scholarships, and agricultural aid they qualify for, and gives
them a direct path to escalate delayed benefit transfers or rejected applications.

## What's included

- **Landing page** (`index.html`) — introduces the platform and the problem it solves.
- **Knowledge Base** (`schemes.html`) — a searchable, filterable catalogue of state (Madhya Pradesh) and
  central schemes across Higher Education, Scholarships, Agriculture, and Women Welfare, with a detail
  view for each scheme.
- **Courses & Learning** (`courses.html`) — searchable links to official NPTEL, SWAYAM, DIKSHA, Skill India,
  AICTE internship, National Career Service, and Madhya Pradesh employment-learning resources.
- **Eligibility Checker** (`eligibility.html`) — citizens describe their situation in plain language and
  get matched to relevant schemes via a client-side keyword/tag matching engine.
- **Grievance Redressal** (`grievance.html`) — a form (powered by Netlify Forms) for reporting delayed
  DBTs, rejections, or technical errors, pre-filled with scheme context when linked from a scheme's detail
  view or an eligibility match.

## Tech stack

- Static HTML5 pages, no build step
- Tailwind CSS (via CDN) for styling
- Vanilla JavaScript for search, filtering, the eligibility matcher, and form pre-fill
- [Lucide icons](https://lucide.dev/) via CDN
- Netlify Forms for grievance submissions
- Netlify Image CDN for the hero illustration (`/img/hero.png`, generated once via Netlify AI Gateway)

## Running locally

No build step is required. From the project root:

```bash
netlify dev --port 8889
```

Then open `http://localhost:8889`.

## Project structure

```
index.html          Landing page
schemes.html         Knowledge base with search/filter + scheme detail modal
eligibility.html      Plain-language eligibility checker
grievance.html        Grievance redressal form (Netlify Forms)
thank-you.html        Grievance submission confirmation page
courses.html          Official courses, certifications, internships and skills directory
assets/css/styles.css Small set of custom styles layered on Tailwind
assets/js/
  main.js             Shared nav + icon behaviour across every page
  schemes-data.js      The scheme dataset and eligibility tag/synonym map
  schemes.js           Knowledge base search, filter and modal logic
  eligibility.js        Plain-language matching engine
  grievance.js          Pre-fills the grievance form from query params
  courses-data.js       Official course and learning platform directory
  courses.js            Course search and category filter logic
img/hero.png          Generated hero illustration
```

## Roadmap

This prototype ships as a complete, self-contained client experience per its original design brief
(zero-backend, rapid deployment). If it grows beyond a hackathon demo, natural next steps would be:

- Replace the static scheme dataset with a real content source (CMS or database) so departments can update
  scheme details without a code change.
- Persist grievance submissions to a database and add status tracking so citizens can look up a case later.
- Swap the keyword-based eligibility matcher for an LLM-backed one for more nuanced free-text understanding.
