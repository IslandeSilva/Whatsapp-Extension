// Simplified Storage Manager - Only Profile + Kanban
class StorageManager {
  constructor() {
    this.KEYS = {
      PROFILE: 'wem_user_profile',
      KANBAN: 'wem_kanban'
    };
    this.init();
  }

  init() {
    // Initialize default profile if not exists
    if (!this.getProfile()) {
      this.saveProfile({
        userName: '',
        userRole: '',
        userAvatar: '',
        messageFormat: '*{name}:*'
      });
    }

    // Initialize kanban storage if not exists
    if (!this.getKanban()) {
      this.saveKanban({});
    }
  }

  // Profile Management
  getProfile() {
    const data = localStorage.getItem(this.KEYS.PROFILE);
    const profile = data ? JSON.parse(data) : null;
    console.log('[WEM Storage] Getting profile from localStorage:', profile);
    return profile;
  }

  saveProfile(profile) {
    console.log('[WEM Storage] Saving profile to localStorage:', profile);
    localStorage.setItem(this.KEYS.PROFILE, JSON.stringify(profile));
    // Sync to chrome.storage immediately
    this.syncToChromeStorage();
    console.log('[WEM Storage] Profile saved successfully');
  }

  // Kanban Management
  getKanban() {
    const data = localStorage.getItem(this.KEYS.KANBAN);
    return data ? JSON.parse(data) : null;
  }

  saveKanban(kanban) {
    localStorage.setItem(this.KEYS.KANBAN, JSON.stringify(kanban));
    // Sync to chrome.storage immediately
    this.syncToChromeStorage();
  }

  // Sync localStorage to chrome.storage (for popup access)
  syncToChromeStorage() {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.set({
        wem_user_profile: this.getProfile(),
        wem_kanban: this.getKanban()
      });
    }
  }

  // Clear all data (for settings reset)
  clearAll() {
    localStorage.removeItem(this.KEYS.PROFILE);
    localStorage.removeItem(this.KEYS.KANBAN);
    this.init();
  }

  // Export data (for backup)
  exportData() {
    return {
      profile: this.getProfile(),
      kanban: this.getKanban(),
      exportDate: new Date().toISOString()
    };
  }

  // Import data (for restore)
  importData(data) {
    if (data.profile) this.saveProfile(data.profile);
    if (data.kanban) this.saveKanban(data.kanban);
  }
}

// Initialize storage manager
const storageManager = new StorageManager();
