console.log("background.js loaded");
let queue = Promise.resolve();

console.log(queue);

const getHeader = (headers = [], name) =>
  headers.find((h) => {
    // console.log(h.name);
    return h.name.toLowerCase() === name;
  })?.value ?? null;

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

// New page load: reset that tab's log
chrome.webRequest.onBeforeRequest.addListener(
  (d) => {
    console.log("onBeforeRequest", d);
    if (d.tabId < 0 || d.type !== "main_frame") return;
    update(d.tabId, (data) => {
      consolge.log(data);
      data.url = d.url;
      data.startedAt = Date.now();
      data.requests = [];
    });
  },
  { urls: ["<all_urls>"] },
);

// Request finished successfully
chrome.webRequest.onCompleted.addListener(
  (d) => {
    if (d.tabId < 0) return;
    const cl = getHeader(d.responseHeaders, "content-length");
    update(d.tabId, (data) => {
      data.requests.push({
        url: d.url,
        type: d.type,
        status: d.statusCode,
        fromCache: d.fromCache,
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

// Request failed (blocked, DNS error, aborted)
chrome.webRequest.onErrorOccurred.addListener(
  (d) => {
    if (d.tabId < 0) return;
    update(d.tabId, (data) => {
      data.requests.push({
        url: d.url,
        type: d.type,
        error: d.error,
        failed: true,
        fromCache: false,
        contentLength: null,
        t: Date.now(),
      });
    });
  },
  { urls: ["<all_urls>"] },
);

// Free storage when a tab closes
chrome.tabs.onRemoved.addListener((tabId) => {
  chrome.storage.session.remove(`tab_${tabId}`);
});
