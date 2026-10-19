async function loadData() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const key = `tab_${tab.id}`;
  return (await chrome.storage.session.get(key))[key];
}

function summarise(data) {
  const reqs = data.requests;
  const failed = reqs.filter(r => r.failed);
  const cached = reqs.filter(r => r.fromCache);
  const network = reqs.filter(r => !r.fromCache && !r.failed);
  const sized = network.filter(r => r.contentLength !== null);
  const bytes = sized.reduce((s, r) => s + r.contentLength, 0);
  const byType = {};
  for (const r of sized) byType[r.type] = (byType[r.type] || 0) + r.contentLength;
  return { total: reqs.length, failed: failed.length, cached: cached.length,
           network: network.length, sized: sized.length,
           missing: network.length - sized.length, bytes, byType };
}

async function render() {
  const out = document.getElementById('out');
  const data = await loadData();
  if (!data) { out.textContent = 'No data. Reload the page with the extension active.'; return; }
  const s = summarise(data);
  const typeLines = Object.entries(s.byType)
    .sort((a, b) => b[1] - a[1])
    .map(([t, b]) => `  ${t.padEnd(14)} ${(b / 1024).toFixed(1)} KB`)
    .join('\n');
  out.textContent =
    `Page: ${data.url}\n\n` +
    `Total requests:      ${s.total}\n` +
    `  From cache:        ${s.cached}\n` +
    `  Failed:            ${s.failed}\n` +
    `  Over network:      ${s.network}\n` +
    `    size known:      ${s.sized}\n` +
    `    size MISSING:    ${s.missing}\n\n` +
    `Bytes (known only):  ${s.bytes} (${(s.bytes / 1024).toFixed(1)} KB)\n\n` +
    `By type:\n${typeLines}`;
}

document.getElementById('refresh').onclick = render;

document.getElementById('export').onclick = async () => {
  const data = await loadData();
  if (!data) return;
  const blob = new Blob([JSON.stringify({ ...data, summary: summarise(data) }, null, 2)],
                        { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `carbon_${Date.now()}.json`;
  a.click();
};

render();