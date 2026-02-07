// Kanban Manager - Main feature for chat management
class KanbanManager {
  constructor() {
    this.statusConfig = {
      novo: { icon: '🟢', label: 'Novo', color: '#4CAF50' },
      em_atendimento: { icon: '🟡', label: 'Em Atendimento', color: '#FFC107' },
      aguardando: { icon: '🔴', label: 'Aguardando', color: '#F44336' },
      pausado: { icon: '⏸️', label: 'Pausado', color: '#FF9800' },
      resolvido: { icon: '✅', label: 'Resolvido', color: '#9E9E9E' }
    };
    this.draggedPhone = null;
  }

  // Get kanban data from storage
  getKanban() {
    return storageManager.getKanban() || {};
  }

  // Save kanban data to storage
  saveKanban(data) {
    storageManager.saveKanban(data);
    this.updateWhatsAppIndicators();
  }

  // Add new chat to kanban
  addChat(phone, name, lastMessage = '') {
    const kanban = this.getKanban();
    if (!kanban[phone]) {
      kanban[phone] = {
        name: name || 'Desconhecido',
        phone,
        status: 'novo',
        color: this.statusConfig.novo.icon,
        lastMessage,
        timestamp: Date.now(),
        notes: ''
      };
      this.saveKanban(kanban);
      return true;
    }
    return false;
  }

  // Update chat status
  updateChatStatus(phone, newStatus) {
    const kanban = this.getKanban();
    if (kanban[phone] && this.statusConfig[newStatus]) {
      kanban[phone].status = newStatus;
      kanban[phone].color = this.statusConfig[newStatus].icon;
      kanban[phone].timestamp = Date.now();
      this.saveKanban(kanban);
      return true;
    }
    return false;
  }

  // Update chat info
  updateChat(phone, updates) {
    const kanban = this.getKanban();
    if (kanban[phone]) {
      kanban[phone] = { ...kanban[phone], ...updates, timestamp: Date.now() };
      this.saveKanban(kanban);
      return true;
    }
    return false;
  }

  // Remove chat from kanban
  removeChat(phone) {
    const kanban = this.getKanban();
    if (kanban[phone]) {
      delete kanban[phone];
      this.saveKanban(kanban);
      return true;
    }
    return false;
  }

  // Get chats by status
  getChatsByStatus(status) {
    const kanban = this.getKanban();
    return Object.values(kanban).filter(chat => chat.status === status);
  }

  // Render all kanban cards
  renderCards() {
    const kanban = this.getKanban();
    
    // Clear all columns
    document.querySelectorAll('.wem-cards-container').forEach(container => {
      container.innerHTML = '';
    });

    // Add cards to correct columns
    Object.values(kanban).forEach(chat => {
      const card = this.createCard(chat);
      const container = document.querySelector(`.wem-cards-container[data-status="${chat.status}"]`);
      if (container) {
        container.appendChild(card);
      }
    });

    // Update counters
    this.updateCounters();
  }

  // Create a kanban card element
  createCard(chat) {
    const card = document.createElement('div');
    card.className = 'wem-kanban-card';
    card.draggable = true;
    card.dataset.phone = chat.phone;
    
    const time = new Date(chat.timestamp).toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    const lastMsg = chat.lastMessage || 'Sem mensagens';
    const truncatedMsg = lastMsg.length > 50 ? lastMsg.substring(0, 50) + '...' : lastMsg;

    card.innerHTML = `
      <div class="wem-card-header">
        <span class="wem-card-status">${chat.color}</span>
        <span class="wem-card-name">${chat.name}</span>
      </div>
      <div class="wem-card-phone">📱 ${this.formatPhone(chat.phone)}</div>
      <div class="wem-card-message" title="${lastMsg}">${truncatedMsg}</div>
      <div class="wem-card-time">${time}</div>
    `;

    // Drag events
    card.addEventListener('dragstart', (e) => this.handleDragStart(e));
    card.addEventListener('dragend', (e) => this.handleDragEnd(e));
    
    // Click to view/edit
    card.addEventListener('click', () => this.showChatDetails(chat));

    return card;
  }

  // Format phone number for display
  formatPhone(phone) {
    // Simple formatting: +55 11 99999-8888
    if (phone.length >= 13) {
      return `+${phone.substring(0, 2)} ${phone.substring(2, 4)} ${phone.substring(4, 9)}-${phone.substring(9)}`;
    }
    return phone;
  }

  // Show chat details (for future expansion)
  showChatDetails(chat) {
    // Could open a detail modal in the future
    console.log('Chat details:', chat);
  }

  // Setup drag and drop for all containers
  setupDragAndDrop() {
    const containers = document.querySelectorAll('.wem-cards-container');
    containers.forEach(container => {
      container.addEventListener('dragover', (e) => this.handleDragOver(e));
      container.addEventListener('drop', (e) => this.handleDrop(e));
      container.addEventListener('dragleave', (e) => this.handleDragLeave(e));
    });
  }

  // Drag event handlers
  handleDragStart(e) {
    this.draggedPhone = e.currentTarget.dataset.phone;
    e.currentTarget.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', this.draggedPhone);
  }

  handleDragEnd(e) {
    e.currentTarget.classList.remove('dragging');
    this.draggedPhone = null;
  }

  handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    e.currentTarget.classList.add('drag-over');
  }

  handleDragLeave(e) {
    e.currentTarget.classList.remove('drag-over');
  }

  handleDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    
    const phone = e.dataTransfer.getData('text/plain');
    const newStatus = e.currentTarget.dataset.status;
    
    if (phone && newStatus) {
      this.updateChatStatus(phone, newStatus);
      this.renderCards();
    }
  }

  // Update column counters
  updateCounters() {
    const kanban = this.getKanban();
    const counts = {};
    
    Object.values(kanban).forEach(chat => {
      counts[chat.status] = (counts[chat.status] || 0) + 1;
    });

    Object.keys(this.statusConfig).forEach(status => {
      const counter = document.querySelector(`.wem-kanban-column[data-status="${status}"] .wem-count`);
      if (counter) {
        counter.textContent = counts[status] || 0;
      }
    });
  }

  // Update visual indicators in WhatsApp Web chat list
  updateWhatsAppIndicators() {
    const kanban = this.getKanban();
    
    // Wait for WhatsApp to be loaded
    setTimeout(() => {
      const chatList = document.querySelector('#pane-side');
      if (!chatList) return;

      Object.entries(kanban).forEach(([phone, chat]) => {
        // Find chat element in WhatsApp (this is a simplified approach)
        // In production, you'd need more robust phone number matching
        const chatElements = document.querySelectorAll('[data-testid="cell-frame-container"]');
        
        chatElements.forEach(el => {
          // Try to match phone number (simplified)
          const titleElement = el.querySelector('[dir="auto"]');
          if (titleElement && titleElement.textContent.includes(chat.name)) {
            // Remove old indicator
            const oldIndicator = el.querySelector('.wem-status-indicator');
            if (oldIndicator) oldIndicator.remove();

            // Add new indicator
            const indicator = document.createElement('span');
            indicator.className = 'wem-status-indicator';
            indicator.textContent = chat.color;
            indicator.style.cssText = 'margin-right: 8px; font-size: 16px;';
            
            titleElement.prepend(indicator);
          }
        });
      });
    }, 500);
  }

  // Auto-detect new chats from WhatsApp (simplified version)
  detectNewChats() {
    const chatElements = document.querySelectorAll('[data-testid="cell-frame-container"]');
    const kanban = this.getKanban();
    
    chatElements.forEach(el => {
      const nameEl = el.querySelector('[dir="auto"]');
      const name = nameEl?.textContent?.replace(/[🟢🟡🔴✅⏸️]/g, '').trim() || 'Desconhecido';
      
      // Simple phone extraction - in production, use WhatsApp's internal data
      // For now, use name as a fallback identifier
      const phone = this.extractPhoneFromElement(el) || `unknown_${Date.now()}`;
      
      // Only add if not already in kanban
      if (!kanban[phone] && phone !== `unknown_${Date.now()}`) {
        this.addChat(phone, name);
      }
    });
  }

  // Extract phone number from chat element (helper - simplified)
  extractPhoneFromElement(element) {
    // This is a placeholder - real implementation would need to:
    // 1. Access WhatsApp's internal Store/React data
    // 2. Or parse from href attributes
    // 3. Or listen to click events and extract from URL
    return null;
  }

  // Observe WhatsApp chat list for changes
  observeWhatsAppChats() {
    const chatList = document.querySelector('#pane-side');
    if (!chatList) {
      // Retry if not loaded yet
      setTimeout(() => this.observeWhatsAppChats(), 1000);
      return;
    }

    const observer = new MutationObserver(() => {
      this.detectNewChats();
    });

    observer.observe(chatList, { 
      childList: true, 
      subtree: true 
    });
  }
}

// Initialize Kanban Manager (will be used by sidebar.js)
const kanbanManager = new KanbanManager();
