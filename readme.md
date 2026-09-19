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
- **Grievance Redressal** (`grievance.html`) — a client-only form that creates a downloadable grievance
  record, pre-filled with scheme context when linked from a scheme's detail view or an eligibility match.

## Tech stack

- Static HTML5 pages, no build step
- Tailwind CSS (via CDN) for styling
- Vanilla JavaScript for search, filtering, the eligibility matcher, and form pre-fill
- [Lucide icons](https://lucide.dev/) via CDN
- Browser `localStorage` and downloadable text records for the grievance workflow
- Checked-in static assets and browser-side JavaScript for GitHub Pages compatibility
- A local, scheme-aware JanSetu chatbot that works without an API key or server

## Languages and AI chat

The header includes a client-side language chooser for English plus Hindi, Bengali, Telugu, Marathi, Tamil,
Gujarati, Kannada, Malayalam, Punjabi, Odia, Assamese, and Urdu. The preference is saved in the browser and
the shared navigation and JanSetu AI interface update without a page reload.

The floating **Chat with JanSetu AI** widget is a client-side assistant. It searches the shared scheme dataset
for relevant matches and explains eligibility, benefits, official links, courses, and grievance steps. It does
not send questions or personal information to a server.

## Running locally

No build step is required. From the project root:

Open `index.html` directly in a browser, or serve the project with any static web server.

## Project structure

```
index.html          Landing page
schemes.html         Knowledge base with search/filter + scheme detail modal
eligibility.html      Plain-language eligibility checker
  grievance.html        Client-side grievance record builder
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
