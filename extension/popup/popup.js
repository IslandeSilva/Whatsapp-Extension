// Popup JavaScript
document.addEventListener('DOMContentLoaded', () => {
  loadProfileInfo();
  loadKanbanStats();
  setupEventListeners();
});

function loadProfileInfo() {
  // Try to get data from chrome.storage.local first, fallback to querying active tab
  chrome.storage.local.get(['wem_user_profile'], (result) => {
    if (result.wem_user_profile) {
      updateProfileDisplay(result.wem_user_profile);
    } else {
      // Query the active WhatsApp tab for data
      chrome.tabs.query({ url: 'https://web.whatsapp.com/*' }, (tabs) => {
        if (tabs.length > 0) {
          chrome.tabs.sendMessage(tabs[0].id, { action: 'get-profile' }, (response) => {
            if (chrome.runtime.lastError) {
              console.warn('Could not get profile:', chrome.runtime.lastError);
              return;
            }
            if (response && response.profile) {
              updateProfileDisplay(response.profile);
            }
          });
        }
      });
    }
  });
}

function updateProfileDisplay(profile) {
  const profileNameEl = document.getElementById('profile-name');
  
  if (profile && profile.userName) {
    profileNameEl.textContent = `${profile.userName}${profile.userRole ? ' - ' + profile.userRole : ''}`;
  } else {
    profileNameEl.textContent = 'Não configurado';
  }
}

function loadKanbanStats() {
  chrome.storage.local.get(['wem_kanban'], (result) => {
    if (result.wem_kanban) {
      updateKanbanDisplay(result.wem_kanban);
    } else {
      // Query the active WhatsApp tab for data
      chrome.tabs.query({ url: 'https://web.whatsapp.com/*' }, (tabs) => {
        if (tabs.length > 0) {
          chrome.tabs.sendMessage(tabs[0].id, { action: 'get-kanban' }, (response) => {
            if (chrome.runtime.lastError) {
              console.warn('Could not get kanban data:', chrome.runtime.lastError);
              return;
            }
            if (response && response.kanban) {
              updateKanbanDisplay(response.kanban);
            }
          });
        }
      });
    }
  });
}

function updateKanbanDisplay(kanban) {
  const count = Object.keys(kanban).length;
  document.getElementById('kanban-count').textContent = `${count} ${count === 1 ? 'chat' : 'chats'}`;
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
        chrome.tabs.sendMessage(tabs[0].id, { action: 'open-kanban' }, () => {
          if (chrome.runtime.lastError) {
            console.warn('Could not send message:', chrome.runtime.lastError);
          }
          // Close popup after sending message
          window.close();
        });
      } else {
        // Open new WhatsApp tab
        chrome.tabs.create({ url: 'https://web.whatsapp.com' });
      }
    });
  });
}
