// ═══════════════════════════════════════════════════════════════════════
// popup.js — UI for the Web Carbon Tracker popup
//
// Reads the current tab's measurement data from chrome.storage.session,
// computes a summary, renders it, and handles JSON export + clear.
// ═══════════════════════════════════════════════════════════════════════

// ── Load the current tab's measurement record from session storage.
// Returns both the data and the tabId (needed for the clear action).
async function getTabInfo() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const key = `tab_${tab.id}`;
  const data = (await chrome.storage.session.get(key))[key] ?? null;
  return { tabId: tab.id, data };
}

// ── Summarise raw request records into aggregate numbers.
//
// Classification rules (order matters):
//   failed    → request never completed (DNS error, blocked, aborted)
//   fromCache → served from disk/memory cache, no network transfer
//   is304     → server replied "not modified", only tiny 304 header sent
//   network   → everything else: actually transferred over the wire
//
// bytesTransferred counts ONLY "network" requests that have a known
// Content-Length. Requests without one are counted as "missing".
function summarise(data) {
  const reqs    = data.requests;
  const failed  = reqs.filter(r => r.failed);
  const cached  = reqs.filter(r => r.fromCache);
  const got304  = reqs.filter(r => r.is304 && !r.fromCache);
  const network = reqs.filter(r => !r.fromCache && !r.is304 && !r.failed);
  const sized   = network.filter(r => r.contentLength !== null);
  const bytes   = sized.reduce((s, r) => s + r.contentLength, 0);

  // Breakdown by resource type (image, script, stylesheet, etc.)
  const byType = {};
  for (const r of sized) {
    byType[r.type] = (byType[r.type] || 0) + r.contentLength;
  }

  return {
    total:   reqs.length,
    failed:  failed.length,
    cached:  cached.length,
    got304:  got304.length,
    network: network.length,
    sized:   sized.length,
    missing: network.length - sized.length,
    bytes,
    byType,
  };
}

// ── Format bytes into a human-readable string with appropriate unit.
function fmtBytes(b) {
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / (1024 * 1024)).toFixed(2)} MB`;
}

// ── Build the export object that conforms to our data contract.
// Schema: url, timestamp, method, requestCount, bytesTransferred,
//         requestsWithUnknownSize, cacheState, perRequest[]
function buildExport(data, cacheState) {
  const s = summarise(data);
  return {
    url:                     data.url,
    timestamp:               data.startedAt,
    method:                  "A",
    requestCount:            s.total,
    bytesTransferred:        s.bytes,
    requestsWithUnknownSize: s.missing,
    cacheState:              cacheState,
    perRequest: data.requests.map(r => ({
      url:       r.url,
      type:      r.type,
      method:    r.method ?? null,
      status:    r.status ?? null,
      fromCache: r.fromCache,
      is304:     r.is304 ?? false,
      bytes:     r.contentLength,
      encoding:  r.encoding ?? null,
      initiator: r.initiator ?? null,
      failed:    r.failed,
      error:     r.error ?? null,
    })),
  };
}

// ── Render the popup UI
async function render() {
  const statsEl   = document.getElementById("stats");
  const detailsEl = document.getElementById("details");
  const { data }  = await getTabInfo();

  if (!data || !data.url) {
    statsEl.innerHTML = "";
    detailsEl.innerHTML =
      '<div class="empty-state">No data yet.<br>Navigate to a page with the extension active.</div>';
    return;
  }

  const s = summarise(data);

  // ── Stat boxes
  statsEl.innerHTML =
    statBox("Requests",  s.total, `${s.network} net · ${s.cached} cache · ${s.failed} fail`) +
    statBox("Transferred", fmtBytes(s.bytes), `${s.missing} unknown size`) +
    statBox("Page", "", truncateUrl(data.url, 60), true);

  // ── Detail breakdown by resource type
  const typeLines = Object.entries(s.byType)
    .sort((a, b) => b[1] - a[1])
    .map(([t, b]) => `  ${t.padEnd(14)} ${fmtBytes(b).padStart(10)}`)
    .join("\n");

  const time = new Date(data.startedAt).toLocaleTimeString();

  detailsEl.textContent =
    `Measured at: ${time}\n` +
    `──────────────────────────────────\n` +
    `Total requests:      ${s.total}\n` +
    `  From cache:        ${s.cached}\n` +
    `  304 Not Modified:  ${s.got304}\n` +
    `  Failed:            ${s.failed}\n` +
    `  Over network:      ${s.network}\n` +
    `    size known:      ${s.sized}\n` +
    `    size MISSING:    ${s.missing}\n` +
    `──────────────────────────────────\n` +
    `Bytes transferred:   ${fmtBytes(s.bytes)}\n\n` +
    `By resource type:\n${typeLines || "  (none)"}`;
}

// ── Helper: create one stat-box HTML
function statBox(label, value, sub, wide) {
  return `<div class="stat-box${wide ? " wide" : ""}">
    <div class="label">${label}</div>
    <div class="value">${value}</div>
    ${sub ? `<div class="label">${sub}</div>` : ""}
  </div>`;
}

// ── Helper: shorten a URL for display
function truncateUrl(url, max) {
  try {
    const u = new URL(url);
    const short = u.hostname + u.pathname;
    return short.length > max ? short.slice(0, max) + "…" : short;
  } catch {
    return url.slice(0, max);
  }
}

// ═══════════════════════════════════════════════════════════════════════
// Event handlers
// ═══════════════════════════════════════════════════════════════════════

// Refresh button
document.getElementById("refresh").onclick = render;

// Export JSON — uses the cache-state dropdown value
document.getElementById("export").onclick = async () => {
  const { data } = await getTabInfo();
  if (!data) return;

  const cacheState = document.getElementById("cacheState").value;
  const exportObj  = buildExport(data, cacheState);

  // Build a short filename from the page hostname + timestamp
  let host = "page";
  try { host = new URL(data.url).hostname.replace(/\./g, "_"); } catch {}
  const ts = new Date(data.startedAt).toISOString().slice(0, 19).replace(/[:T]/g, "-");

  const blob = new Blob(
    [JSON.stringify(exportObj, null, 2)],
    { type: "application/json" }
  );
  const a  = document.createElement("a");
  a.href   = URL.createObjectURL(blob);
  a.download = `carbon_${host}_${ts}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
};

// Clear button — removes this tab's data from storage
document.getElementById("clear").onclick = async () => {
  const { tabId } = await getTabInfo();
  await chrome.runtime.sendMessage({ action: "clearTab", tabId });
  render();
};

// Render on popup open
render();
