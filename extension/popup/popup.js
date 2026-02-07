// Popup JavaScript
document.addEventListener('DOMContentLoaded', () => {
  loadProfileInfo();
  loadKanbanStats();
  setupEventListeners();
});

function loadProfileInfo() {
  chrome.storage.local.get(['wem_user_profile'], (result) => {
    const profile = result.wem_user_profile;
    const profileNameEl = document.getElementById('profile-name');
    
    if (profile && profile.userName) {
      profileNameEl.textContent = `${profile.userName} - ${profile.userRole || 'Atendente'}`;
    } else {
      profileNameEl.textContent = 'Não configurado';
    }
  });
}

function loadKanbanStats() {
  chrome.storage.local.get(['wem_kanban'], (result) => {
    const kanban = result.wem_kanban || {};
    const count = Object.keys(kanban).length;
    
    document.getElementById('kanban-count').textContent = `${count} ${count === 1 ? 'chat' : 'chats'}`;
  });
}

function setupEventListeners() {
  document.getElementById('open-whatsapp').addEventListener('click', () => {
    chrome.tabs.create({ url: 'https://web.whatsapp.com' });
  });

  document.getElementById('view-kanban').addEventListener('click', () => {
    // Query for WhatsApp Web tab
    chrome.tabs.query({ url: 'https://web.whatsapp.com/*' }, (tabs) => {
      if (tabs.length > 0) {
        // Focus existing WhatsApp tab
        chrome.tabs.update(tabs[0].id, { active: true });
        
        // Send message to open kanban modal
        chrome.tabs.sendMessage(tabs[0].id, { action: 'open-kanban' });
      } else {
        // Open new WhatsApp tab
        chrome.tabs.create({ url: 'https://web.whatsapp.com' });
      }
    });
  });
}
