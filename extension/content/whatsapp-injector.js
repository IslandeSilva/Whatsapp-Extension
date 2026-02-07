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
    // Use capture phase to inject BEFORE WhatsApp processes the send
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        const activeElement = document.activeElement;
        if (activeElement && activeElement.getAttribute('contenteditable') === 'true') {
          // Small delay to ensure text is in the box
          setTimeout(() => {
            this.injectSignature(activeElement);
          }, 10);
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
            // Inject signature immediately when button is clicked
            // But before WhatsApp processes the click
            this.injectSignature(messageBox);
          }
        }, true); // Use capture phase to run before WhatsApp's handler
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  injectSignature(messageElement) {
    console.log('[WEM] injectSignature called');
    
    const profile = storageManager.getProfile();
    console.log('[WEM] Profile loaded:', profile);
    
    if (!profile || !profile.userName || profile.userName.trim() === '') {
      console.log('[WEM] No profile or empty userName, skipping injection');
      return;
    }

    const currentText = messageElement.textContent || '';
    if (!currentText.trim()) {
      console.log('[WEM] Empty message, skipping injection');
      return;
    }

    // Get signature format
    const signature = this.formatSignature(profile);
    console.log('[WEM] Generated signature:', signature);

    // Check if signature already exists
    if (currentText.includes(signature)) {
      console.log('[WEM] Signature already exists, skipping injection');
      return;
    }

    // Prepend signature to message (at the beginning)
    const newText = signature + ' ' + currentText;
    console.log('[WEM] New text to inject:', newText);
    
    // Try multiple methods for better compatibility
    try {
      // Method 1: Use textContent (current method)
      messageElement.textContent = newText;
      
      // Method 2: Also try innerText as fallback
      messageElement.innerText = newText;
      
      // Method 3: Focus the element first
      messageElement.focus();
      
      // Trigger multiple events to ensure WhatsApp detects the change
      const inputEvent = new InputEvent('input', { 
        bubbles: true, 
        cancelable: true,
        inputType: 'insertText',
        data: newText
      });
      messageElement.dispatchEvent(inputEvent);
      
      const changeEvent = new Event('change', { bubbles: true });
      messageElement.dispatchEvent(changeEvent);
      
      // Also try textInput event
      const textInputEvent = new Event('textInput', { bubbles: true });
      messageElement.dispatchEvent(textInputEvent);
      
      // Move cursor to the end
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(messageElement);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
      
      console.log('[WEM] Signature injection complete');
    } catch (error) {
      console.error('[WEM] Error during injection:', error);
    }

  formatSignature(profile) {
    const format = profile.messageFormat || '*{name}:*';
    const userName = (profile.userName && profile.userName.trim()) || 'User';
    const signature = format.replace('{name}', userName);
    console.log('[WEM] formatSignature - format:', format, 'userName:', userName, 'result:', signature);
    return signature;
  }

  // Add visual indicator to current chat based on kanban status
  updateCurrentChatIndicator() {
    // Get current active chat
    const activeChat = document.querySelector('[data-testid="conversation-panel-wrapper"]');
    if (!activeChat) return;

    // Extract chat name
    const chatHeader = activeChat.querySelector('header [dir="auto"]');
    if (!chatHeader) return;

    const chatName = chatHeader.textContent.replace(/[🟢🟡🔴✅⏸️]/g, '').trim();
    const kanban = storageManager.getKanban();

    // Find matching chat in kanban
    const matchingChat = Object.values(kanban).find(chat => 
      chatName.toLowerCase().includes(chat.name.toLowerCase()) || 
      chat.name.toLowerCase().includes(chatName.toLowerCase())
    );
    
    if (matchingChat) {
      // Remove old indicator
      const oldIndicator = chatHeader.querySelector('.wem-chat-status');
      if (oldIndicator) oldIndicator.remove();

      // Add status indicator
      const indicator = document.createElement('span');
      indicator.className = 'wem-chat-status';
      indicator.textContent = ' ' + matchingChat.color;
      indicator.style.cssText = 'margin-left: 6px; font-size: 20px;';
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
