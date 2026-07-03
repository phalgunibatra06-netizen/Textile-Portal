UNIFIED TEXTILE PORTAL — Ministry of Textiles (front-end prototype)
====================================================================

WHAT THIS IS
------------
A complete, self-contained front end (HTML + CSS + vanilla JavaScript).
Page 1 is the landing + login page. The other four pages are beneficiary
dashboards — one each for Farmer, Weaver, Industrialist and Student —
that show the schemes each beneficiary has AVAILED and the schemes they
CAN AVAIL, with full scheme details and a front-end "apply" flow.

No server, no build step, no internet needed. Everything (including the
Ashoka Chakra emblem and the tricolour) is drawn inline so it works
offline with no broken images.


FOLDER STRUCTURE
----------------
UnifiedTextilePortal/
├── index.html            → Page 1: landing + login
├── farmer.html           → Farmer dashboard
├── weaver.html           → Weaver dashboard
├── industrialist.html    → Industrialist dashboard
├── student.html          → Student dashboard
├── css/
│   └── styles.css        → All styling (shared by every page)
├── js/
│   ├── data.js           → *** ALL SCHEME CONTENT LIVES HERE ***
│   └── portal.js         → Rendering + login + modal + apply logic
└── README.txt            → This file


HOW TO RUN
----------
Just open index.html in any modern browser (double-click it), or serve
the folder with any static server, e.g.:
    cd UnifiedTextilePortal
    python3 -m http.server 8000
    → open http://localhost:8000

Using it:
  • Click a category card, OR
  • Pick a category in the login box and click "Login to dashboard"
    (this is a prototype — any ID/password works; type "demo" for a
    sample profile). Log out returns you to the landing page.


HOW TO PLUG IN YOUR REAL SCHEME DOCUMENTS
-----------------------------------------
Open  js/data.js  — it is the single source of truth. You do NOT need to
touch the HTML or portal.js.

1. SCHEME WORDING
   Each scheme (pm-mitra, tex-ramps, nhhp, mggsi, nfs, teem-efc, texeco)
   has: name, full, tagline, benefits[], eligibility[], documents[],
   process[], authority, timeline. Replace the placeholder text with the
   exact wording from your NHHP / Tex-RAMPS / PM MITRA 2.0 / TEEM EFC /
   MGGSI / NFS / TexEco documents.

2. WHICH BENEFICIARY SEES WHICH SCHEME
   Each scheme has a  categories: [...]  array. Add or remove a role key
   ("farmer","weaver","industrialist","student") to control where it can
   appear.

3. AVAILED vs AVAILABLE (per beneficiary)
   Under  roles.<role>  :
     • availed  = schemes already enrolled in, with status / progress /
       sanctioned / disbursed / nextStep shown on the card.
     • available = list of scheme IDs offered with an "apply" button.

4. DEMO PROFILE
   roles.<role>.profile controls the name, ID and the facts shown in the
   beneficiary banner.

The dashboards re-render automatically from this file — no other edits.


IMPORTANT NOTE ON THE DATA
--------------------------
The scheme benefits, eligibility, amounts and a few full scheme names
(marked "provisional") are REPRESENTATIVE PLACEHOLDERS derived from the
scheme names, because the source .docx documents could not be read on
generation. Verify and replace them with the official content before any
real use. The on-screen banner reminds users of this until you remove it
(edit/delete the "provisional" block in each dashboard HTML, or the note
text once your real data is in).


BUILT WITH
----------
Plain HTML5, CSS3 and vanilla JavaScript. No frameworks, no dependencies.
Responsive down to mobile; keyboard accessible; respects reduced-motion.
