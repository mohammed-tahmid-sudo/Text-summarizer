// background.js

async function summarizeText(text) {
    // Build the prompt you want to send to DeepSeek.
    const prompt = `Summarize the following text:\n\n${text}`;
  
    try {
      const response = await fetch("http://localhost:11434/api/v1/models/deep-seek-r1-1.5b/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
          // Add any additional headers if needed (e.g., Authorization)
        },
        body: JSON.stringify({
          prompt: prompt,
          max_tokens: 150,      // Adjust these parameters as needed.
          temperature: 0.7
        })
      });
  
      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }
  
      const data = await response.json();
      // Adjust this based on the actual response structure from Ollama.
      // Here we assume the response returns an object with a "text" field containing the summary.
      return data.text;
    } catch (error) {
      console.error("Error summarizing text:", error);
      return "Error summarizing the text.";
    }
  }
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "summarize") {
      summarizeText(request.text)
        .then(summary => sendResponse({ summary }))
        .catch(error => sendResponse({ summary: "Error: " + error.message }));
      // Return true to indicate that we will send a response asynchronously.
      return true;
    }
  });
  