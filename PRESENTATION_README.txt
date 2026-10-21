═══════════════════════════════════════════════════════════════════════
Emissync Project Presentation - Generated Files & Instructions
═══════════════════════════════════════════════════════════════════════

Generated: 21 October 2026

FILES CREATED
─────────────────────────────────────────────────────────────────────
✓ presentation.pptx (341 KB)
   - Editable PowerPoint presentation
   - 13 main slides + 2 backup slides
   - Template-matched design (Fira Sans, navy/slate/orange palette)
   - 16:9 widescreen format (10" × 5.625")

✓ build_presentation.js
   - Source script for regenerating the presentation
   - Fully commented and organized by slide
   - Edit this file to modify slide content

SLIDES STRUCTURE
─────────────────────────────────────────────────────────────────────
1.  Title Slide — Project title, group members, supervisor
2.  Introduction & Background — Internet infrastructure, ICT emissions
3.  Problem Statement — Visibility gap, research question
4.  Objectives — Four main objective clusters
5.  Methodology: System Workflow — Flow diagram + measurement design
6.  Methodology: Models & Experiments — 5 models table, planned experiments
7.  Tech Stack — Chrome MV3, CO2.js, storage, charts
8.  Work Completed: Prototype Features — Phase 1 v0.1 features
9.  Work Completed: Project Status — 5-phase status table
10. Preliminary Results — Measured data comparison table (3 websites)
11. Limitations — 5 key limitations clearly stated
12. Future Work & Timeline — Phase timeline + improvements
13. References — SWDM, RFCs, ISO standard, sources
B1. Backup: Panel Q&A — 6 likely questions + answers
B2. Backup: Data Transfer Proxy — System boundary explanation

ITEMS YOU MUST FILL IN MANUALLY
─────────────────────────────────────────────────────────────────────
⚠ SLIDE 1 (Title Slide):
   - Roll Numbers: [TO BE FILLED]
   - Supervisor Name: [NAME]

These are marked as placeholders in the presentation. Edit them in PowerPoint
or update build_presentation.js lines 94-96 and regenerate.

PDF CONVERSION INSTRUCTIONS
─────────────────────────────────────────────────────────────────────
Since LibreOffice is not installed on this system, convert to PDF manually:

METHOD 1: Microsoft PowerPoint (Recommended)
1. Open presentation.pptx in PowerPoint
2. File → Export → Create PDF/XPS
3. Save as: presentation.pdf

METHOD 2: PowerPoint Online
1. Upload presentation.pptx to OneDrive
2. Open in PowerPoint Online
3. File → Download as → PDF

METHOD 3: Google Slides
1. Upload to Google Drive
2. Open with Google Slides
3. File → Download → PDF Document

DESIGN VERIFICATION COMPLETED
─────────────────────────────────────────────────────────────────────
✓ Template palette matched: #222831 (navy), #30475E (slate), #F2A365 (orange)
✓ Fira Sans font with Arial fallback
✓ 16:9 aspect ratio preserved
✓ Body text ≥18pt where practical
✓ Max 5 bullets per slide adhered to
✓ Speaker notes added to every slide

CONTENT VERIFICATION COMPLETED
─────────────────────────────────────────────────────────────────────
✓ All claims sourced from content PDF (page references tracked)
✓ Measured results from your 3 test websites included
✓ DevTools comparison shown as preliminary (not validated)
✓ No invented statistics or external numbers added
✓ Unknown-size limitation prominently featured (slides 10, 11)
✓ Limitations given dedicated slide before Future Work
✓ All prototype features verified against actual source code:
  - webRequest listeners (onBeforeRequest, onCompleted, onErrorOccurred)
  - Classification: failed | cache | 304 | network
  - Content-Length parsing, unknown-size flagging
  - Serialized promise queue for storage
  - JSON export with cache-state label
  - All claims match background.js + popup.js implementation

CODE VERIFICATION REPORT (from subagent analysis)
─────────────────────────────────────────────────────────────────────
background.js:
  ✓ 3 webRequest listeners correctly described
  ✓ Promise queue serialization mechanism verified
  ✓ Per-request data structure matches presentation claims
  ✓ Content-Length extraction from response headers confirmed
  ✓ 304 status handling verified

popup.js:
  ✓ summarise() classification logic matches slide 5 description
  ✓ Byte counting: only sized network requests, matches limitation claim
  ✓ Unknown-size calculation: network.length - sized.length (verified)
  ✓ buildExport() data contract matches slide 8 schema example

No unsupported claims found in prototype features slides.

UNSUPPORTED/UNVERIFIED CLAIMS (flagged in speaker notes)
─────────────────────────────────────────────────────────────────────
1. "442 g CO₂/kWh" grid intensity — Source not cited in any supplied file
2. "3.5–3.7% of global GHG" — Attributed to Climate Impact Partners (not independently verified)
3. SWDM v4 shares (52/19/15/14%) — Per content PDF, not independently verified
4. "0.300 kWh/GB" — Per SWDM v4 via content PDF

These are presented as stated in your content PDF. Be prepared to cite sources
if asked by the panel.

PRELIMINARY RESULTS DATA (Slide 10)
─────────────────────────────────────────────────────────────────────
YouTube homepage:     75 reqs, 374 KB (ext) | 119 reqs, 1,838 KB (DevTools) | 9 unknown-size
Indian Express:       72 reqs, 2.60 MB (ext) | 175 reqs, 7,876 KB (DevTools) | 31 unknown-size
Wikipedia:            24 reqs, 236 KB (ext) | 26 reqs, 270 KB (DevTools) | 0 unknown-size

✓ Labeled as preliminary
✓ DevTools comparison noted as not yet validated
✓ No CO₂e estimates included (calculation not verified)
✓ No percentage differences calculated (assumptions not validated)

SPEAKER NOTES HIGHLIGHTS
─────────────────────────────────────────────────────────────────────
Every slide includes:
- What to say in ~30-60 seconds
- 1-2 likely panel questions + honest answers
- Warnings about unverified claims where applicable
- Reminders to be direct about what is/isn't done

Key speaking points:
- "The measurement layer works; CO₂ conversion is in progress" (slide 9)
- "These are preliminary measurements, not validated" (slide 10)
- "Unknown-size responses + request scope differences need investigation" (slide 11)
- Be ready to say "That's what we need to validate next" for DevTools discrepancy

NEXT STEPS BEFORE PRESENTATION (22 October 2026)
─────────────────────────────────────────────────────────────────────
1. Fill in roll numbers and supervisor name (slide 1)
2. Convert to PDF using one of the methods above
3. Review speaker notes for every slide
4. Practice explaining the DevTools discrepancy honestly
5. Prepare to cite sources for 442 g CO₂/kWh and 3.5-3.7% GHG claim
6. Run through the 6 Q&A backup questions (slide B1)

REGENERATING THE PRESENTATION
─────────────────────────────────────────────────────────────────────
To modify and regenerate:
1. Edit build_presentation.js
2. Run: node build_presentation.js
3. New presentation.pptx will overwrite the existing file

To check for syntax errors before running:
node --check build_presentation.js

TEMPLATE ELEMENTS NOT REPRODUCED
─────────────────────────────────────────────────────────────────────
The Slidesgo template includes decorative vector illustrations (laptop, person
with laptop, game controller, etc.) from Freepik that cannot be recreated with
pptxgenjs shapes. The presentation uses clean geometric layouts in the same
color palette instead. The overall design language and readability are preserved.

CONTACT & SUPPORT
─────────────────────────────────────────────────────────────────────
If you need to modify the presentation:
- Minor text edits: Edit directly in PowerPoint
- Structural changes: Edit build_presentation.js and regenerate
- Design tweaks: Adjust COLORS or FONTS constants in build_presentation.js

═══════════════════════════════════════════════════════════════════════
End of README
═══════════════════════════════════════════════════════════════════════
