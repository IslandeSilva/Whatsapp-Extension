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
    return data ? JSON.parse(data) : null;
  }

  saveProfile(profile) {
    localStorage.setItem(this.KEYS.PROFILE, JSON.stringify(profile));
  }

  // Kanban Management
  getKanban() {
    const data = localStorage.getItem(this.KEYS.KANBAN);
    return data ? JSON.parse(data) : null;
  }

  saveKanban(kanban) {
    localStorage.setItem(this.KEYS.KANBAN, JSON.stringify(kanban));
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
