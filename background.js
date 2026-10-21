// ── Promise queue: serialises all chrome.storage read-modify-write cycles
// so concurrent webRequest events don't overwrite each other's data.
let queue = Promise.resolve();

// ── Helper: find a response header by name (case-insensitive).
// Response headers arrive as [{name, value}, …]; we need case-insensitive
// lookup because HTTP header names are case-insensitive per RFC 7230.
const getHeader = (headers = [], name) =>
  headers.find((h) => h.name.toLowerCase() === name)?.value ?? null;

// ── Read-modify-write a tab's record in session storage.
// Every caller goes through the queue so writes never race.
function update(tabId, fn) {
  queue = queue
    .then(async () => {
      const key = `tab_${tabId}`;
      const data = (await chrome.storage.session.get(key))[key] || {
        url: null,
        startedAt: Date.now(),
        requests: [],
      };
      fn(data);
      await chrome.storage.session.set({ [key]: data });
    })
    .catch(console.error);
}

// ── New page load: reset that tab's log.
// Fires only for top-level navigation (type === "main_frame"),
// so iframes and sub-resources don't clear the record.
chrome.webRequest.onBeforeRequest.addListener(
  (d) => {
    if (d.tabId < 0 || d.type !== "main_frame") return;
    update(d.tabId, (data) => {
      data.url = d.url;
      data.startedAt = Date.now();
      data.requests = [];
    });
  },
  { urls: ["<all_urls>"] },
);

// ── Request finished successfully: record size + metadata.
// content-length is the compressed (on-the-wire) body size when present.
// It's null for chunked-transfer responses — those become "unknown size".
chrome.webRequest.onCompleted.addListener(
  (d) => {
    if (d.tabId < 0) return;
    const cl = getHeader(d.responseHeaders, "content-length");
    update(d.tabId, (data) => {
      data.requests.push({
        url: d.url,
        type: d.type,
        method: d.method,
        status: d.statusCode,
        fromCache: d.fromCache,
        // 304 means the server confirmed the cache is valid —
        // only the small 304 header was transferred, not the full body
        is304: d.statusCode === 304,
        contentLength: cl !== null ? parseInt(cl, 10) : null,
        encoding: getHeader(d.responseHeaders, "content-encoding"),
        initiator: d.initiator ?? null,
        failed: false,
        t: Date.now(),
      });
    });
  },
  { urls: ["<all_urls>"] },
  ["responseHeaders"],
);

// ── Request failed (blocked, DNS error, aborted): record the error.
chrome.webRequest.onErrorOccurred.addListener(
  (d) => {
    if (d.tabId < 0) return;
    update(d.tabId, (data) => {
      data.requests.push({
        url: d.url,
        type: d.type,
        method: d.method,
        error: d.error,
        failed: true,
        fromCache: false,
        is304: false,
        contentLength: null,
        t: Date.now(),
      });
    });
  },
  { urls: ["<all_urls>"] },
);

// ── Listen for messages from the popup (e.g. "clear this tab's data")
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "clearTab" && typeof msg.tabId === "number") {
    const key = `tab_${msg.tabId}`;
    chrome.storage.session.remove(key).then(() => sendResponse({ ok: true }));
    // Return true to keep the message channel open for the async response
    return true;
  }
});

// ── Free storage when a tab closes
chrome.tabs.onRemoved.addListener((tabId) => {
  chrome.storage.session.remove(`tab_${tabId}`);
});
