// popup.js
document.getElementById("summarize").addEventListener("click", () => {
    // Get the active tab.
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // Ask the content script to extract the page's text.
      chrome.tabs.sendMessage(tabs[0].id, { action: "extract_text" }, (response) => {
        if (response && response.text) {
          // Send the extracted text to the background script for summarization.
          chrome.runtime.sendMessage({ action: "summarize", text: response.text }, (summaryResponse) => {
            document.getElementById("summary").innerText = summaryResponse.summary;
          });
        } else {
          document.getElementById("summary").innerText = "Could not extract text from this page.";
        }
      });
    });
  });
  