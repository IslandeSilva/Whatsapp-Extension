// Background Service Worker - Minimal setup for Chrome Extension
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('WhatsApp Extension Manager installed!');
    
    // Open welcome page or setup page (optional)
    // chrome.tabs.create({ url: 'https://web.whatsapp.com' });
  } else if (details.reason === 'update') {
    console.log('WhatsApp Extension Manager updated!');
  }
});

// Listen for messages from content scripts (if needed in future)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'ping') {
    sendResponse({ status: 'pong' });
  }
  
  // Add more message handlers as needed
  return true;
});

// Keep service worker alive (if needed)
chrome.runtime.onConnect.addListener((port) => {
  console.log('Connected:', port.name);
});

console.log('WhatsApp Extension Manager service worker loaded');
