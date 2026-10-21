// ═══════════════════════════════════════════════════════════════════════
// build_presentation.js — Generates Emissync project presentation
// Template-matched design: Fira Sans, navy/slate/orange palette, 16:9
// ═══════════════════════════════════════════════════════════════════════

const PptxGenJs = require('pptxgenjs');
const pptx = new PptxGenJs();

// ── Template-matched design constants ────────────────────────────────────
const COLORS = {
  navy:       '222831',  // Primary dark
  slate:      '30475E',  // Secondary blue-grey
  orange:     'F2A365',  // Accent
  lightGrey:  'EBEBEB',  // Muted backgrounds
  darkGrey:   'C4C4C4',  // Disabled/faded
  white:      'FFFFFF',
  black:      '000000',
};

const FONTS = {
  title:  { face: 'Fira Sans, Arial', size: 32, bold: true,  color: COLORS.navy },
  h1:     { face: 'Fira Sans, Arial', size: 28, bold: true,  color: COLORS.navy },
  h2:     { face: 'Fira Sans, Arial', size: 20, bold: true,  color: COLORS.slate },
  body:   { face: 'Fira Sans, Arial', size: 18, bold: false, color: COLORS.navy },
  small:  { face: 'Fira Sans, Arial', size: 14, bold: false, color: COLORS.slate },
  caption:{ face: 'Fira Sans, Arial', size: 12, bold: false, color: COLORS.darkGrey },
};

// 16:9 widescreen (10" x 5.625" = 720 x 405 pt)
pptx.layout = 'LAYOUT_16x9';
pptx.author = 'Emissync Team';
pptx.title = 'Emissync - Carbon Footprint Tracking During Web Browsing';
pptx.subject = 'B.Tech CSE Final Year Project Presentation';

// ── Helper: add a slide with default background ──────────────────────────
function addSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: COLORS.white };
  return slide;
}

// ── Helper: add a title to a slide ───────────────────────────────────────
function addTitle(slide, text, opts = {}) {
  slide.addText(text, {
    x: opts.x || 0.5,
    y: opts.y || 0.4,
    w: opts.w || 9,
    h: opts.h || 0.8,
    fontSize: opts.fontSize || 28,
    bold: true,
    color: opts.color || COLORS.navy,
    fontFace: 'Fira Sans, Arial',
    align: opts.align || 'left',
  });
}

// ── Helper: add body bullets ─────────────────────────────────────────────
function addBullets(slide, bullets, opts = {}) {
  slide.addText(bullets, {
    x: opts.x || 0.5,
    y: opts.y || 1.5,
    w: opts.w || 9,
    h: opts.h || 3.5,
    fontSize: opts.fontSize || 18,
    color: opts.color || COLORS.navy,
    fontFace: 'Fira Sans, Arial',
    bullet: { type: 'bullet', indent: 20 },
    valign: 'top',
  });
}

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 1: Title Slide
// ══════════════════════════════════════════════════════════════════════════
{
  const slide = addSlide();

  // Main title
  slide.addText('Emissync', {
    x: 0.5, y: 1.2, w: 9, h: 0.8,
    fontSize: 48, bold: true, color: COLORS.navy,
    fontFace: 'Fira Sans, Arial',
  });

  // Subtitle
  slide.addText([
    { text: 'Real-Time Estimation and Attribution of Carbon Emissions\n', options: { fontSize: 18, color: COLORS.slate } },
    { text: 'from Web Browsing Sessions', options: { fontSize: 18, color: COLORS.slate } },
  ], {
    x: 0.5, y: 2.1, w: 9, h: 0.6,
    fontFace: 'Fira Sans, Arial',
  });

  // Tagline
  slide.addText('Every Click. Every Byte. One Carbon Impact.', {
    x: 0.5, y: 2.9, w: 9, h: 0.4,
    fontSize: 14, italic: true, color: COLORS.orange,
    fontFace: 'Fira Sans, Arial',
  });

  // Group members
  slide.addText([
    { text: 'Group Members\n', options: { fontSize: 14, bold: true, color: COLORS.navy, breakLine: true } },
    { text: 'Abhishek Maurya  •  Divyanshi Gautam  •  Shruti Bhatt  •  Jaiswar Sushilkumar Sunil\n', options: { fontSize: 14, color: COLORS.slate, breakLine: true } },
    { text: 'Roll Numbers: [TO BE FILLED]\n\n', options: { fontSize: 12, color: COLORS.darkGrey, breakLine: true } },
    { text: 'Supervisor: [NAME]  |  B.Tech CSE, 7th Semester  |  22 October 2026', options: { fontSize: 12, color: COLORS.slate } },
  ], {
    x: 0.5, y: 3.8, w: 9, h: 1.3,
    fontFace: 'Fira Sans, Arial',
    valign: 'top',
  });

  slide.addNotes(`Welcome. This is Emissync, a real-time browser-level carbon monitoring system. Our goal is to make the environmental footprint of web browsing visible to users. Likely question: What makes this different from existing tools? Answer: Real-time session monitoring with multi-source attribution, not just a per-URL estimate.`);
}

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 2: Introduction & Background
// ══════════════════════════════════════════════════════════════════════════
{
  const slide = addSlide();
  addTitle(slide, 'Introduction & Background');

  addBullets(slide, [
    { text: 'The Internet runs on physical infrastructure: data centres, undersea cables, and user devices', options: FONTS.body },
    { text: 'ICT accounts for an estimated 3.5–3.7% of global GHG emissions (comparable to aviation)', options: FONTS.body },
    { text: 'Carbon footprint = total CO₂e across a lifecycle (operational + embodied emissions)', options: FONTS.body },
    { text: 'Operational: electricity during use  •  Embodied: manufacturing & disposal', options: FONTS.body },
    { text: 'SWDM v4 model allocates operational/embodied across device, network, and data centre', options: FONTS.body },
  ]);

  slide.addNotes(`Every page we load travels through cables, data centres, and our device—each stage uses electricity. ICT emissions are substantial and growing with Internet traffic. SWDM v4 is the Sustainable Web Design Model version 4, a bottom-up model we use as our baseline. Likely question: How much of browsing emissions are embodied vs operational? Answer: SWDM allocates roughly 19% to embodied hardware, 81% to operational electricity across device/network/DC.`);
}

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 3: Problem Statement
// ══════════════════════════════════════════════════════════════════════════
{
  const slide = addSlide();
  addTitle(slide, 'Problem Statement');

  addBullets(slide, [
    { text: 'Browsing consumes resources across data centres, networks, and devices—but users have no visibility into their session footprint', options: FONTS.body },
    { text: 'Existing tools mostly estimate per URL from outside the browser, reporting one opaque number', options: FONTS.body },
    { text: 'No continuously updated, session-level view with source-wise breakdown', options: FONTS.body },
    { text: 'Research question: How can real-time browser measurements + established carbon models provide a granular, session-level estimated footprint?', options: FONTS.body },
    { text: 'Key challenge: Exact emissions cannot be measured—only estimated from measurable inputs (bytes, requests, time)', options: FONTS.body },
  ]);

  slide.addNotes(`The gap is visibility. Users do not see the footprint of their own browsing activity in real time. Our research question is about combining measurement with modeling for granularity. Likely question: Why cannot you measure emissions directly? Answer: A browser has no access to server-side electricity meters or network infrastructure power usage—data transfer is the observable proxy.`);
}

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 4: Objectives
// ══════════════════════════════════════════════════════════════════════════
{
  const slide = addSlide();
  addTitle(slide, 'Objectives');

  // Numbered objectives grouped into 4 clusters
  const objText = [
    { text: '① Build a real-time Chrome (MV3) extension that monitors browsing sessions', options: { ...FONTS.body, bold: true, color: COLORS.orange } },
    { text: '② Measure actual network transfer: requests, bytes, resource types, cache hits, 304 responses, failures', options: { ...FONTS.body, bold: true, color: COLORS.slate } },
    { text: '③ Estimate CO₂e using SWDM v4 / CO2.js with attribution to device, network, data centre, and embodied hardware', options: { ...FONTS.body, bold: true, color: COLORS.orange } },
    { text: '④ Provide transparent, privacy-friendly results: local storage only, clearly labeled estimates', options: { ...FONTS.body, bold: true, color: COLORS.slate } },
  ];

  slide.addText(objText, {
    x: 0.5, y: 1.5, w: 9, h: 3.5,
    fontSize: 18,
    fontFace: 'Fira Sans, Arial',
    bullet: { type: 'number' },
    valign: 'top',
  });

  slide.addNotes(`Four main objectives. Objective 1-2 are implemented in Phase 1. Objectives 3-4 are in progress. Likely question: Why MV3? Answer: Manifest V3 is the current Chrome extension standard; MV2 is being deprecated. Likely question: Why local storage only? Answer: Privacy—no user data leaves the browser.`);
}

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 5: Methodology — System Workflow
// ══════════════════════════════════════════════════════════════════════════
{
  const slide = addSlide();
  addTitle(slide, 'Methodology: System Workflow & Measurement', { fontSize: 26 });

  // Simplified flow diagram using shapes
  const flowY = 1.6;
  const boxW = 1.6;
  const boxH = 0.6;
  const gap = 0.15;

  const steps = [
    { text: 'Browse', color: COLORS.lightGrey },
    { text: 'webRequest', color: COLORS.slate },
    { text: 'Classify', color: COLORS.orange },
    { text: 'Bytes', color: COLORS.slate },
    { text: 'CO₂e', color: COLORS.orange },
    { text: 'Dashboard', color: COLORS.navy },
  ];

  let xPos = 0.5;
  steps.forEach((step, i) => {
    // Box
    slide.addShape(pptx.ShapeType.roundRect, {
      x: xPos, y: flowY, w: boxW, h: boxH,
      fill: { color: step.color },
      line: { color: COLORS.white, width: 1 },
    });
    // Label
    slide.addText(step.text, {
      x: xPos, y: flowY, w: boxW, h: boxH,
      fontSize: 14, bold: true, color: COLORS.white,
      fontFace: 'Fira Sans, Arial',
      align: 'center', valign: 'middle',
    });

    // Arrow
    if (i < steps.length - 1) {
      slide.addShape(pptx.ShapeType.rightArrow, {
        x: xPos + boxW, y: flowY + 0.15, w: gap, h: 0.3,
        fill: { color: COLORS.darkGrey },
        line: { type: 'none' },
      });
    }

    xPos += boxW + gap;
  });

  // Measurement design bullets
  slide.addText([
    { text: 'Measurement Design\n', options: { fontSize: 16, bold: true, color: COLORS.navy, breakLine: true } },
    { text: '• Source: Chrome webRequest API (onBeforeRequest, onCompleted, onErrorOccurred)\n', options: { fontSize: 14, color: COLORS.slate } },
    { text: '• Classification: failed | from cache | 304 Not Modified | network transfer\n', options: { fontSize: 14, color: COLORS.slate } },
    { text: '• Per request: URL, type, status, Content-Length, Content-Encoding, initiator\n', options: { fontSize: 14, color: COLORS.slate } },
    { text: '• Unknown sizes flagged (not guessed)  •  Serialized storage prevents race conditions\n', options: { fontSize: 14, color: COLORS.slate } },
    { text: '• Privacy: all data stays local in the browser', options: { fontSize: 14, color: COLORS.slate } },
  ], {
    x: 0.5, y: 2.6, w: 9, h: 2.2,
    fontFace: 'Fira Sans, Arial',
    valign: 'top',
  });

  slide.addNotes(`The workflow shows how browsing activity becomes a carbon estimate. webRequest captures cross-origin resources that the Performance API would report as zero bytes. Classification ensures we only count actual network transfers. Likely question: Why not use the Performance Timing API? Answer: It reports 0 bytes for cross-origin resources without Timing-Allow-Origin headers, which most third-party resources lack.`);
}

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 6: Methodology — Models Studied
// ══════════════════════════════════════════════════════════════════════════
{
  const slide = addSlide();
  addTitle(slide, 'Methodology: Estimation Models', { fontSize: 26 });

  const tableData = [
    [
      { text: 'Model', options: { ...FONTS.h2, fontSize: 14, bold: true, fill: { color: COLORS.navy }, color: COLORS.white } },
      { text: 'Approach', options: { ...FONTS.h2, fontSize: 14, bold: true, fill: { color: COLORS.navy }, color: COLORS.white } },
      { text: 'Role in Emissync', options: { ...FONTS.h2, fontSize: 14, bold: true, fill: { color: COLORS.navy }, color: COLORS.white } },
    ],
    [
      { text: 'SWDM v4', options: { ...FONTS.small, fontSize: 13, bold: true } },
      { text: 'Bottom-up, 0.300 kWh/GB, split by device/network/DC/embodied', options: { ...FONTS.small, fontSize: 13 } },
      { text: 'Baseline (via CO2.js)', options: { ...FONTS.small, fontSize: 13, bold: true, color: COLORS.orange } },
    ],
    [
      { text: 'SCI (ISO 21031:2024)', options: { ...FONTS.small, fontSize: 13 } },
      { text: 'SCI = ((E × I) + M) / R per functional unit', options: { ...FONTS.small, fontSize: 13 } },
      { text: 'Session-level framing (R = one session)', options: { ...FONTS.small, fontSize: 13 } },
    ],
    [
      { text: 'OneByte', options: { ...FONTS.small, fontSize: 13 } },
      { text: 'Top-down bytes × fixed factors', options: { ...FONTS.small, fontSize: 13 } },
      { text: 'Comparison only; ignores device energy', options: { ...FONTS.small, fontSize: 13 } },
    ],
    [
      { text: 'EcoIndex', options: { ...FONTS.small, fontSize: 13 } },
      { text: 'DOM size, request count, payload score', options: { ...FONTS.small, fontSize: 13 } },
      { text: 'Motivates adding request & DOM context', options: { ...FONTS.small, fontSize: 13 } },
    ],
    [
      { text: 'DIMPACT', options: { ...FONTS.small, fontSize: 13 } },
      { text: 'Streaming LCA with fixed base load', options: { ...FONTS.small, fontSize: 13 } },
      { text: 'Shows emissions are not purely linear in data', options: { ...FONTS.small, fontSize: 13 } },
    ],
  ];

  slide.addTable(tableData, {
    x: 0.5, y: 1.5, w: 9, h: 2.8,
    border: { pt: 1, color: COLORS.lightGrey },
    fontSize: 13,
    fontFace: 'Fira Sans, Arial',
    color: COLORS.navy,
    valign: 'middle',
    colW: [1.5, 4.0, 3.5],
  });

  // Experiments
  slide.addText([
    { text: 'Planned Experiments\n', options: { fontSize: 14, bold: true, color: COLORS.navy, breakLine: true } },
    { text: 'A: Measure 20-30 websites (size, transfer, duration, CO₂e)  •  B: Same sites across browsers\n', options: { fontSize: 13, color: COLORS.slate } },
    { text: 'C: Page load vs 5-min vs 10-min sessions  •  D: SWDM baseline vs enhanced estimate (% diff)', options: { fontSize: 13, color: COLORS.slate } },
  ], {
    x: 0.5, y: 4.5, w: 9, h: 0.8,
    fontFace: 'Fira Sans, Arial',
  });

  slide.addNotes(`We studied 5 estimation models. SWDM v4 is our baseline because it is bottom-up, segmented, and reproducible via CO2.js. The others inform our enhanced model layer. Likely question: Why not use OneByte or EcoIndex as the baseline? Answer: OneByte ignores device energy; EcoIndex focuses on DOM/requests but lacks a transparent data-to-energy formula. SWDM is the most complete and maintained open model.`);
}

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 7: Tech Stack
// ══════════════════════════════════════════════════════════════════════════
{
  const slide = addSlide();
  addTitle(slide, 'Tech Stack');

  const items = [
    { label: 'Chrome Extension (Manifest V3)', color: COLORS.orange },
    { label: 'JavaScript (ES6+)', color: COLORS.slate },
    { label: 'CO2.js (SWDM v4 implementation)', color: COLORS.orange },
    { label: 'chrome.storage.session + .local', color: COLORS.slate },
    { label: 'Chart.js / Recharts (dashboard)', color: COLORS.orange },
  ];

  let yPos = 1.8;
  items.forEach((item) => {
    // Badge circle
    slide.addShape(pptx.ShapeType.ellipse, {
      x: 0.8, y: yPos - 0.05, w: 0.35, h: 0.35,
      fill: { color: item.color },
      line: { type: 'none' },
    });
    // Label
    slide.addText(item.label, {
      x: 1.3, y: yPos, w: 7.5, h: 0.3,
      fontSize: 18, color: COLORS.navy,
      fontFace: 'Fira Sans, Arial',
      valign: 'middle',
    });
    yPos += 0.55;
  });

  slide.addText('No AI/ML is required for the core measurement and estimation system.', {
    x: 0.8, y: yPos + 0.3, w: 8, h: 0.4,
    fontSize: 14, italic: true, color: COLORS.darkGrey,
    fontFace: 'Fira Sans, Arial',
  });

  slide.addNotes(`Tech stack is standard web extension technologies. CO2.js provides the SWDM implementation. Likely question: Why no machine learning? Answer: The problem is measurement + applying an established model—ML is not needed for that. If we were predicting user behavior or optimizing recommendations, ML might help, but the core task is transparent calculation.`);
}

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 8: Work Completed — Prototype Features (Phase 1)
// ══════════════════════════════════════════════════════════════════════════
{
  const slide = addSlide();
  addTitle(slide, 'Work Completed: Prototype Features (v0.1)', { fontSize: 26 });

  addBullets(slide, [
    { text: 'Network monitoring via webRequest API (onBeforeRequest, onCompleted, onErrorOccurred)', options: { ...FONTS.body, fontSize: 17 } },
    { text: 'Per-request classification: network | from cache | 304 Not Modified | failed', options: { ...FONTS.body, fontSize: 17 } },
    { text: 'Popup UI: request counts, bytes transferred, unknown-size count, breakdown by resource type', options: { ...FONTS.body, fontSize: 17 } },
    { text: 'JSON export with defined data contract + cache-state label (cold/warm)', options: { ...FONTS.body, fontSize: 17 } },
    { text: 'Serialized storage queue with automatic cleanup when tab closes', options: { ...FONTS.body, fontSize: 17 } },
  ]);

  // Code snippet example
  slide.addText('Example export schema:', {
    x: 0.5, y: 3.9, w: 9, h: 0.3,
    fontSize: 12, bold: true, color: COLORS.slate,
    fontFace: 'Fira Sans, Arial',
  });

  slide.addText(
    '{ url, timestamp, requestCount, bytesTransferred,\n' +
    '  requestsWithUnknownSize, cacheState, perRequest[] }',
    {
      x: 0.5, y: 4.2, w: 9, h: 0.6,
      fontSize: 11, fontFace: 'Courier New, monospace',
      color: COLORS.navy,
      fill: { color: COLORS.lightGrey },
    }
  );

  slide.addNotes(`Phase 1 prototype is functional. The measurement layer works. The carbon conversion (CO2.js integration) is in progress. Likely question: What is the serialized storage queue? Answer: Multiple webRequest events fire concurrently; a promise queue ensures read-modify-write operations on storage don't race and overwrite each other's data.`);
}

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 9: Work Completed — Project Status
// ══════════════════════════════════════════════════════════════════════════
{
  const slide = addSlide();
  addTitle(slide, 'Work Completed: Project Status');

  const statusData = [
    [
      { text: 'Phase', options: { fontSize: 14, bold: true, fill: { color: COLORS.navy }, color: COLORS.white } },
      { text: 'Deliverables', options: { fontSize: 14, bold: true, fill: { color: COLORS.navy }, color: COLORS.white } },
      { text: 'Status', options: { fontSize: 14, bold: true, fill: { color: COLORS.navy }, color: COLORS.white } },
    ],
    [
      { text: '1. MVP: Measurement', options: { fontSize: 14, bold: true } },
      { text: 'webRequest monitoring, classification, popup UI, JSON export', options: { fontSize: 14 } },
      { text: '✓ Done (v0.1)', options: { fontSize: 14, bold: true, color: '2E7D32' } },
    ],
    [
      { text: '1. MVP: CO₂e in popup', options: { fontSize: 14, bold: true } },
      { text: 'Integrate CO2.js, show estimated CO₂e, auto-refresh', options: { fontSize: 14 } },
      { text: '⚙ In progress', options: { fontSize: 14, bold: true, color: COLORS.orange } },
    ],
    [
      { text: '2. Live dashboard', options: { fontSize: 14 } },
      { text: 'Session timer, persistent history, charts', options: { fontSize: 14 } },
      { text: 'Planned', options: { fontSize: 14, color: COLORS.darkGrey } },
    ],
    [
      { text: '3. Attribution', options: { fontSize: 14 } },
      { text: 'DC / network / device / embodied split in UI', options: { fontSize: 14 } },
      { text: 'Planned', options: { fontSize: 14, color: COLORS.darkGrey } },
    ],
    [
      { text: '4. Research layer', options: { fontSize: 14 } },
      { text: 'Enhanced model, baseline vs enhanced % difference', options: { fontSize: 14 } },
      { text: 'Planned', options: { fontSize: 14, color: COLORS.darkGrey } },
    ],
    [
      { text: '5. Experiments & paper', options: { fontSize: 14 } },
      { text: 'Experiments A–D, analysis, limitations, report', options: { fontSize: 14 } },
      { text: 'Planned', options: { fontSize: 14, color: COLORS.darkGrey } },
    ],
  ];

  slide.addTable(statusData, {
    x: 0.5, y: 1.5, w: 9, h: 3.5,
    border: { pt: 1, color: COLORS.lightGrey },
    fontSize: 14,
    fontFace: 'Fira Sans, Arial',
    color: COLORS.navy,
    valign: 'middle',
    colW: [2.0, 5.0, 2.0],
  });

  slide.addNotes(`Phase 1 measurement is done. CO2 estimate integration is the next immediate step. Be direct: "The measurement layer works; the carbon conversion is what we are completing now." Likely question: What is the timeline for Phase 5? Answer: Experiments and paper are planned for late November through December and into semester 8, subject to supervisor approval.`);
}

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 10: Preliminary Results (Measured Data)
// ══════════════════════════════════════════════════════════════════════════
{
  const slide = addSlide();
  addTitle(slide, 'Preliminary Results: Measured Data', { fontSize: 26 });

  const resultsData = [
    [
      { text: 'Website', options: { fontSize: 13, bold: true, fill: { color: COLORS.navy }, color: COLORS.white } },
      { text: 'Extension\nReqs', options: { fontSize: 13, bold: true, fill: { color: COLORS.navy }, color: COLORS.white, align: 'center' } },
      { text: 'Extension\nBytes', options: { fontSize: 13, bold: true, fill: { color: COLORS.navy }, color: COLORS.white, align: 'center' } },
      { text: 'Unknown\nSize', options: { fontSize: 13, bold: true, fill: { color: COLORS.navy }, color: COLORS.white, align: 'center' } },
      { text: 'DevTools\nReqs', options: { fontSize: 13, bold: true, fill: { color: COLORS.navy }, color: COLORS.white, align: 'center' } },
      { text: 'DevTools\nBytes', options: { fontSize: 13, bold: true, fill: { color: COLORS.navy }, color: COLORS.white, align: 'center' } },
    ],
    [
      { text: 'YouTube homepage', options: { fontSize: 13, bold: true } },
      { text: '75\n(61 net)', options: { fontSize: 13, align: 'center' } },
      { text: '374 KB', options: { fontSize: 13, align: 'center' } },
      { text: '9', options: { fontSize: 13, align: 'center', color: COLORS.orange } },
      { text: '119', options: { fontSize: 13, align: 'center' } },
      { text: '1,838 KB', options: { fontSize: 13, align: 'center' } },
    ],
    [
      { text: 'Indian Express homepage', options: { fontSize: 13, bold: true } },
      { text: '72\n(70 net)', options: { fontSize: 13, align: 'center' } },
      { text: '2.60 MB', options: { fontSize: 13, align: 'center' } },
      { text: '31', options: { fontSize: 13, align: 'center', color: COLORS.orange } },
      { text: '175', options: { fontSize: 13, align: 'center' } },
      { text: '7,876 KB', options: { fontSize: 13, align: 'center' } },
    ],
    [
      { text: 'Wikipedia homepage', options: { fontSize: 13, bold: true } },
      { text: '24\n(23 net)', options: { fontSize: 13, align: 'center' } },
      { text: '236 KB', options: { fontSize: 13, align: 'center' } },
      { text: '0', options: { fontSize: 13, align: 'center', color: '2E7D32' } },
      { text: '26', options: { fontSize: 13, align: 'center' } },
      { text: '270 KB', options: { fontSize: 13, align: 'center' } },
    ],
  ];

  slide.addTable(resultsData, {
    x: 0.4, y: 1.6, w: 9.2, h: 2.0,
    border: { pt: 1, color: COLORS.lightGrey },
    fontSize: 13,
    fontFace: 'Fira Sans, Arial',
    color: COLORS.navy,
    valign: 'middle',
    colW: [2.3, 1.3, 1.3, 1.0, 1.3, 1.3],
  });

  // Notes
  slide.addText([
    { text: 'Observations:\n', options: { fontSize: 14, bold: true, color: COLORS.navy, breakLine: true } },
    { text: '• Extension reports fewer requests and lower bytes than DevTools in all three tests\n', options: { fontSize: 13, color: COLORS.slate } },
    { text: '• Unknown-size responses (no Content-Length header) contribute to undercounting\n', options: { fontSize: 13, color: COLORS.slate } },
    { text: '• DevTools vs Extension comparison is preliminary—request scopes may differ\n', options: { fontSize: 13, color: COLORS.slate } },
    { text: '• Wikipedia shows closest alignment; media-heavy pages show larger discrepancies\n', options: { fontSize: 13, color: COLORS.slate } },
  ], {
    x: 0.5, y: 3.8, w: 9, h: 1.3,
    fontFace: 'Fira Sans, Arial',
  });

  slide.addNotes(`These are preliminary measurements. The extension systematically reports fewer bytes than DevTools. Likely causes: (1) unknown-size responses are not counted, (2) Content-Length is compressed body only, (3) request scope differences (e.g., service workers, cached subresources). This is NOT validated yet—we need to investigate the scope and methodology differences. Likely question: Why the big difference for Indian Express? Answer: 31 unknown-size requests, likely media or chunked-transfer responses, plus possible third-party resources the extension sees differently.`);
}

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 11: Limitations
// ══════════════════════════════════════════════════════════════════════════
{
  const slide = addSlide();
  addTitle(slide, 'Limitations');

  addBullets(slide, [
    { text: 'Emissync reports estimated CO₂e, not exact physical emissions measured at the infrastructure level', options: { ...FONTS.body, fontSize: 17 } },
    { text: 'Data transfer (bytes) is a proxy for resource use—results depend on model assumptions (energy per GB, grid intensity)', options: { ...FONTS.body, fontSize: 17 } },
    { text: 'Content-Length header gives compressed body size only; does not include request/response headers or TLS overhead', options: { ...FONTS.body, fontSize: 17 } },
    { text: 'Responses without Content-Length (chunked transfer, some media) are flagged as unknown size → undercounting', options: { ...FONTS.body, fontSize: 17 } },
    { text: 'DevTools comparison is preliminary—request count and byte discrepancies are not yet explained or validated', options: { ...FONTS.body, fontSize: 17 } },
  ]);

  slide.addNotes(`Be honest about limitations before the panel raises them. The biggest technical limitation right now is unknown-size responses and the unvalidated DevTools discrepancy. Likely question: How much of the discrepancy is due to unknown-size responses? Answer: That is part of what we need to validate—unknown size is one contributor, but request-count differences suggest scope/methodology differences too. We need to align what each tool counts.`);
}

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 12: Future Work & Timeline
// ══════════════════════════════════════════════════════════════════════════
{
  const slide = addSlide();
  addTitle(slide, 'Future Work & Timeline');

  const timelineData = [
    [
      { text: 'Phase', options: { fontSize: 13, bold: true, fill: { color: COLORS.navy }, color: COLORS.white } },
      { text: 'Deliverables', options: { fontSize: 13, bold: true, fill: { color: COLORS.navy }, color: COLORS.white } },
      { text: 'Timeline', options: { fontSize: 13, bold: true, fill: { color: COLORS.navy }, color: COLORS.white } },
    ],
    [
      { text: '1. MVP (in progress)', options: { fontSize: 13, bold: true } },
      { text: 'Complete CO2.js integration, show CO₂e, auto-refresh', options: { fontSize: 13 } },
      { text: 'Oct 2026', options: { fontSize: 13 } },
    ],
    [
      { text: '2. Live dashboard', options: { fontSize: 13 } },
      { text: 'Session timer, persistent history, charts', options: { fontSize: 13 } },
      { text: 'Nov 2026', options: { fontSize: 13 } },
    ],
    [
      { text: '3. Attribution', options: { fontSize: 13 } },
      { text: 'DC / network / device / embodied split in UI', options: { fontSize: 13 } },
      { text: 'Nov 2026', options: { fontSize: 13 } },
    ],
    [
      { text: '4. Research layer', options: { fontSize: 13 } },
      { text: 'Enhanced model, baseline vs enhanced % difference', options: { fontSize: 13 } },
      { text: 'Dec 2026', options: { fontSize: 13 } },
    ],
    [
      { text: '5. Experiments & paper', options: { fontSize: 13 } },
      { text: 'Experiments A–D, analysis, report', options: { fontSize: 13 } },
      { text: 'Dec 2026–Sem 8', options: { fontSize: 13 } },
    ],
  ];

  slide.addTable(timelineData, {
    x: 0.5, y: 1.6, w: 9, h: 2.5,
    border: { pt: 1, color: COLORS.lightGrey },
    fontSize: 13,
    fontFace: 'Fira Sans, Arial',
    color: COLORS.navy,
    valign: 'middle',
    colW: [2.2, 5.0, 1.8],
  });

  // Planned improvements
  slide.addText([
    { text: 'Planned Improvements\n', options: { fontSize: 14, bold: true, color: COLORS.navy, breakLine: true } },
    { text: '• Validate measurement methodology against DevTools; resolve request-count discrepancies\n', options: { fontSize: 13, color: COLORS.slate } },
    { text: '• Handle unknown-size responses (estimate or document coverage limits)\n', options: { fontSize: 13, color: COLORS.slate } },
    { text: '• Track SPA route changes as separate page views  •  Add session time dimension\n', options: { fontSize: 13, color: COLORS.slate } },
    { text: '• Use regional grid intensity (India: ~632 g CO₂/kWh) instead of global average', options: { fontSize: 13, color: COLORS.slate } },
  ], {
    x: 0.5, y: 4.3, w: 9, h: 1.0,
    fontFace: 'Fira Sans, Arial',
  });

  slide.addNotes(`Timeline is ambitious but structured by supervisor guidance. Validation and unknown-size handling are top priorities. Likely question: Is the timeline realistic? Answer: Phase 1 is nearly complete; phases 2-3 are UI and calculation extensions of existing code. Phase 4-5 depend on the enhanced model design and experiment execution—supervisor has approved the roadmap.`);
}

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 13: References (Appendix)
// ══════════════════════════════════════════════════════════════════════════
{
  const slide = addSlide();
  addTitle(slide, 'References');

  const refs = [
    '1. Sustainable Web Design Model (SWDM v4) and CO2.js — Green Web Foundation\n   https://www.thegreenwebfoundation.org/',
    '2. ISO/IEC 21031:2024 — Software Carbon Intensity (SCI) Specification',
    '3. RFC 9845 — Sustainability Insights',
    '4. RFC 6988 — Requirements for Energy Management',
    '5. RFC 8348 — A YANG Data Model for Hardware Management',
    '6. IETF GREEN Working Group Internet-Drafts',
    '7. University of Michigan, Center for Sustainable Systems (2026). "Carbon Footprint\n   Factsheet." Pub. No. CSS09-05.',
    '8. Climate Impact Partners. "The carbon footprint of the internet."',
  ];

  slide.addText(refs.join('\n\n'), {
    x: 0.5, y: 1.4, w: 9, h: 4.0,
    fontSize: 12,
    color: COLORS.navy,
    fontFace: 'Fira Sans, Arial',
    valign: 'top',
  });

  slide.addNotes(`References slide. SWDM/CO2.js is the primary source for the baseline model. RFCs and ISO standard inform the system-level framing.`);
}

// ══════════════════════════════════════════════════════════════════════════
// BACKUP SLIDE 1: Panel Q&A
// ══════════════════════════════════════════════════════════════════════════
{
  const slide = addSlide();
  addTitle(slide, 'Backup: Likely Panel Questions');

  const qaData = [
    [
      { text: 'Question', options: { fontSize: 13, bold: true, fill: { color: COLORS.navy }, color: COLORS.white } },
      { text: 'Short Answer', options: { fontSize: 13, bold: true, fill: { color: COLORS.navy }, color: COLORS.white } },
    ],
    [
      { text: 'How is this different from Carbonalyser or Website Carbon?', options: { fontSize: 12, bold: true } },
      { text: 'Those estimate by URL or total bytes. Emissync adds live session monitoring, source-wise attribution, temporal analysis, and baseline-vs-enhanced comparison.', options: { fontSize: 12 } },
    ],
    [
      { text: 'How accurate is it?', options: { fontSize: 12, bold: true } },
      { text: 'It is an estimate using SWDM, a published model. We flag unknown-size requests and compare against the baseline in Experiment D. Not a direct physical measurement.', options: { fontSize: 12 } },
    ],
    [
      { text: 'Why SWDM as the baseline?', options: { fontSize: 12, bold: true } },
      { text: 'Bottom-up, segmented, maintained, and built into CO2.js—results are reproducible.', options: { fontSize: 12 } },
    ],
    [
      { text: 'Why webRequest and not the Performance API?', options: { fontSize: 12, bold: true } },
      { text: 'The Performance API reports 0 bytes for cross-origin resources that lack Timing-Allow-Origin headers.', options: { fontSize: 12 } },
    ],
    [
      { text: 'What is your novelty?', options: { fontSize: 12, bold: true } },
      { text: 'Real-time session measurement, multi-segment attribution, temporal analysis, and model validation. We are not claiming "nobody has built a carbon extension"—the contribution is granularity and methodology rigor.', options: { fontSize: 12 } },
    ],
    [
      { text: 'Why no AI/ML?', options: { fontSize: 12, bold: true } },
      { text: 'The core problem is measurement and applying an established model. AI/ML is not required for that.', options: { fontSize: 12 } },
    ],
  ];

  slide.addTable(qaData, {
    x: 0.4, y: 1.5, w: 9.2, h: 3.8,
    border: { pt: 1, color: COLORS.lightGrey },
    fontSize: 12,
    fontFace: 'Fira Sans, Arial',
    color: COLORS.navy,
    valign: 'top',
    colW: [3.2, 6.0],
    rowH: [0.5, 0.6, 0.5, 0.5, 0.5, 0.7, 0.5],
  });

  slide.addNotes(`Backup Q&A slide. Practice these answers. Be ready to acknowledge what you do not yet know (e.g., DevTools discrepancy root cause) rather than speculating.`);
}

// ══════════════════════════════════════════════════════════════════════════
// BACKUP SLIDE 2: How Data Transfer Maps to Carbon
// ══════════════════════════════════════════════════════════════════════════
{
  const slide = addSlide();
  addTitle(slide, 'Backup: Data Transfer as a Carbon Proxy', { fontSize: 26 });

  addBullets(slide, [
    { text: 'System boundary: User device → network (cables, routers) → data centre → back to device', options: { ...FONTS.body, fontSize: 16 } },
    { text: 'Bytes transferred is a proxy for resource consumption at each stage (compute, storage, transmission)', options: { ...FONTS.body, fontSize: 16 } },
    { text: 'SWDM converts bytes → kWh using 0.300 kWh/GB, then kWh → CO₂e using grid intensity', options: { ...FONTS.body, fontSize: 16 } },
    { text: 'The model allocates energy across segments: device 52%, embodied 19%, DC 15%, network 14%', options: { ...FONTS.body, fontSize: 16 } },
    { text: '"Unknown size" means no Content-Length header → response not included in bytes total → undercounting', options: { ...FONTS.body, fontSize: 16 } },
    { text: 'Where the estimate breaks down: ignores server-side inefficiencies, caching, CDN topology, actual electricity source', options: { ...FONTS.body, fontSize: 16 } },
  ]);

  slide.addNotes(`Backup slide explaining the proxy logic. Bytes are observable; electricity/emissions are not. The model assumptions are documented and reproducible. Unknown-size responses are a known gap. Likely question: What about green energy? Answer: SWDM uses grid-average intensity; a future enhancement could use marginal or time-of-use carbon intensity, but that requires location and timestamp data.`);
}

// ══════════════════════════════════════════════════════════════════════════
// Write the presentation file
// ══════════════════════════════════════════════════════════════════════════
pptx.writeFile({ fileName: 'D:/Final Year Project/presentation.pptx' })
  .then(() => {
    console.log('✓ Presentation created: presentation.pptx');
  })
  .catch((err) => {
    console.error('✗ Error creating presentation:', err);
    process.exit(1);
  });
