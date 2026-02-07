// WhatsApp Injector - Adds name signature to messages
class WhatsAppInjector {
  constructor() {
    this.init();
  }

  init() {
    // Wait for WhatsApp to load
    this.waitForWhatsApp();
  }

  waitForWhatsApp() {
    const checkInterval = setInterval(() => {
      const messageBox = document.querySelector('[contenteditable="true"][data-tab="10"]');
      if (messageBox) {
        clearInterval(checkInterval);
        this.setupMessageInterceptor();
      }
    }, 1000);
  }

  setupMessageInterceptor() {
    // Observe the message input box
    const messageBox = document.querySelector('[contenteditable="true"][data-tab="10"]');
    if (!messageBox) return;

    // Listen for Enter key (send message)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        const activeElement = document.activeElement;
        if (activeElement && activeElement.getAttribute('contenteditable') === 'true') {
          this.injectSignature(activeElement);
        }
      }
    }, true);

    // Also observe the send button click
    this.observeSendButton();
  }

  observeSendButton() {
    // Use MutationObserver to detect send button
    const observer = new MutationObserver(() => {
      const sendButton = document.querySelector('[data-testid="send"]');
      if (sendButton && !sendButton.dataset.wemListener) {
        sendButton.dataset.wemListener = 'true';
        sendButton.addEventListener('click', () => {
          const messageBox = document.querySelector('[contenteditable="true"][data-tab="10"]');
          if (messageBox) {
            this.injectSignature(messageBox);
          }
        });
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  injectSignature(messageElement) {
    const profile = storageManager.getProfile();
    if (!profile || !profile.userName) return;

    const currentText = messageElement.textContent || '';
    if (!currentText.trim()) return;

    // Get signature format
    const signature = this.formatSignature(profile);

    // Check if signature already exists
    if (currentText.includes(signature)) return;

    // Append signature to message (at the end)
    const newText = currentText + '\n' + signature;
    
    // Update the message box
    messageElement.textContent = newText;

    // Trigger input event to update WhatsApp's internal state
    const inputEvent = new Event('input', { bubbles: true });
    messageElement.dispatchEvent(inputEvent);
  }

  formatSignature(profile) {
    const format = profile.messageFormat || '*{name}:*';
    return format.replace('{name}', profile.userName);
  }

  // Add visual indicator to current chat based on kanban status
  updateCurrentChatIndicator() {
    // Get current active chat
    const activeChat = document.querySelector('[data-testid="conversation-panel-wrapper"]');
    if (!activeChat) return;

    // Extract chat name/phone (simplified)
    const chatHeader = activeChat.querySelector('header [dir="auto"]');
    if (!chatHeader) return;

    const chatName = chatHeader.textContent;
    const kanban = storageManager.getKanban();

    // Find matching chat in kanban
    const matchingChat = Object.values(kanban).find(chat => chat.name === chatName);
    
    if (matchingChat) {
      // Remove old indicator
      const oldIndicator = chatHeader.querySelector('.wem-chat-status');
      if (oldIndicator) oldIndicator.remove();

      // Add status indicator
      const indicator = document.createElement('span');
      indicator.className = 'wem-chat-status';
      indicator.textContent = matchingChat.color;
      indicator.style.cssText = 'margin-left: 8px; font-size: 18px;';
      chatHeader.appendChild(indicator);
    }
  }

  // Monitor chat changes
  observeChatChanges() {
    const observer = new MutationObserver(() => {
      this.updateCurrentChatIndicator();
    });

    const chatPanel = document.querySelector('[data-testid="conversation-panel-wrapper"]');
    if (chatPanel) {
      observer.observe(chatPanel, {
        childList: true,
        subtree: true
      });
    }
  }
}

// Initialize WhatsApp Injector
const whatsappInjector = new WhatsAppInjector();

// Also start observing for chat changes
setTimeout(() => {
  whatsappInjector.observeChatChanges();
}, 2000);
