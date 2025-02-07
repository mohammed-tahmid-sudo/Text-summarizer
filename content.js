// content.js
function extractText() {
    // A simple text extraction; you might improve this to filter navigation, ads, etc.
    return document.body.innerText;
  }
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "extract_text") {
      sendResponse({ text: extractText() });
    }
  });
  