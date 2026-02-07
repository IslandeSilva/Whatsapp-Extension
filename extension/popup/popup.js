/**
 * Popup Script
 * Lógica do popup da extensão
 */

document.addEventListener('DOMContentLoaded', async () => {
  // Load statistics
  await loadStats();
  
  // Setup event listeners
  setupEventListeners();
});

/**
 * Load and display statistics
 */
async function loadStats() {
  try {
    // Get message count from storage
    chrome.storage.local.get(['messageHistory', 'userConfig'], (result) => {
      const messageCount = result.messageHistory?.length || 0;
      document.getElementById('message-count').textContent = messageCount;
      
      // Check if config is set
      const configStatus = document.getElementById('config-status');
      if (result.userConfig && result.userConfig.name) {
        configStatus.textContent = '✅';
      } else {
        configStatus.textContent = '❌';
      }
    });
  } catch (error) {
    console.error('Error loading stats:', error);
  }
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
  // Open WhatsApp Web button
  document.getElementById('open-whatsapp').addEventListener('click', () => {
    chrome.tabs.create({ url: 'https://web.whatsapp.com' });
  });
  
  // View help button
  document.getElementById('view-help').addEventListener('click', () => {
    const helpSection = document.getElementById('help-section');
    if (helpSection.style.display === 'none') {
      helpSection.style.display = 'block';
    } else {
      helpSection.style.display = 'none';
    }
  });
  
  // Export data button
  document.getElementById('export-data').addEventListener('click', async (e) => {
    e.preventDefault();
    await exportData();
  });
}

/**
 * Export all data as JSON
 */
async function exportData() {
  try {
    chrome.storage.local.get(null, (data) => {
      const dataStr = JSON.stringify(data, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `whatsapp-extension-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      // Show feedback
      showNotification('Dados exportados com sucesso!');
    });
  } catch (error) {
    console.error('Error exporting data:', error);
    showNotification('Erro ao exportar dados', 'error');
  }
}

/**
 * Show notification
 */
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    background: ${type === 'success' ? '#128C7E' : '#dc3545'};
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 13px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 9999;
    animation: slideIn 0.3s ease;
  `;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
