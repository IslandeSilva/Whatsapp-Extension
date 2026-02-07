// Sidebar Manager - Slim sidebar + Modals
class SidebarManager {
  constructor() {
    this.init();
  }

  init() {
    // Wait for WhatsApp to load
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.createSidebar());
    } else {
      this.createSidebar();
    }
  }

  createSidebar() {
    // Create slim sidebar
    const sidebar = document.createElement('div');
    sidebar.id = 'wem-slim-sidebar';
    sidebar.innerHTML = `
      <button id="wem-kanban-btn" title="Gestão de Atendimentos">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M4 5h4v14H4V5zm6 0h4v8h-4V5zm6 0h4v11h-4V5z"/>
        </svg>
      </button>
      <button id="wem-profile-btn" title="Meu Perfil">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
        </svg>
      </button>
      <button id="wem-settings-btn" title="Configurações">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
        </svg>
      </button>
    `;
    document.body.appendChild(sidebar);

    // Create modals
    this.createKanbanModal();
    this.createProfileModal();
    this.createSettingsModal();

    // Setup event listeners
    this.setupEventListeners();
  }

  createKanbanModal() {
    const modal = document.createElement('div');
    modal.id = 'wem-kanban-modal';
    modal.className = 'wem-modal';
    modal.innerHTML = `
      <div class="wem-modal-content">
        <div class="wem-modal-header">
          <h2>📋 Gestão de Atendimentos</h2>
          <button class="wem-close" data-modal="wem-kanban-modal">&times;</button>
        </div>
        
        <div class="wem-kanban-board">
          <!-- Coluna: Novo -->
          <div class="wem-kanban-column" data-status="novo">
            <div class="wem-column-header">
              <span class="wem-status-icon">🟢</span>
              <h3>Novo</h3>
              <span class="wem-count">0</span>
            </div>
            <div class="wem-cards-container" data-status="novo"></div>
          </div>

          <!-- Coluna: Em Atendimento -->
          <div class="wem-kanban-column" data-status="em_atendimento">
            <div class="wem-column-header">
              <span class="wem-status-icon">🟡</span>
              <h3>Em Atendimento</h3>
              <span class="wem-count">0</span>
            </div>
            <div class="wem-cards-container" data-status="em_atendimento"></div>
          </div>

          <!-- Coluna: Aguardando -->
          <div class="wem-kanban-column" data-status="aguardando">
            <div class="wem-column-header">
              <span class="wem-status-icon">🔴</span>
              <h3>Aguardando</h3>
              <span class="wem-count">0</span>
            </div>
            <div class="wem-cards-container" data-status="aguardando"></div>
          </div>

          <!-- Coluna: Pausado -->
          <div class="wem-kanban-column" data-status="pausado">
            <div class="wem-column-header">
              <span class="wem-status-icon">⏸️</span>
              <h3>Pausado</h3>
              <span class="wem-count">0</span>
            </div>
            <div class="wem-cards-container" data-status="pausado"></div>
          </div>

          <!-- Coluna: Resolvido -->
          <div class="wem-kanban-column" data-status="resolvido">
            <div class="wem-column-header">
              <span class="wem-status-icon">✅</span>
              <h3>Resolvido</h3>
              <span class="wem-count">0</span>
            </div>
            <div class="wem-cards-container" data-status="resolvido"></div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  createProfileModal() {
    const modal = document.createElement('div');
    modal.id = 'wem-profile-modal';
    modal.className = 'wem-modal';
    modal.innerHTML = `
      <div class="wem-modal-content" style="max-width: 500px;">
        <div class="wem-modal-header">
          <h2>👤 Meu Perfil</h2>
          <button class="wem-close" data-modal="wem-profile-modal">&times;</button>
        </div>
        <div class="wem-modal-body">
          <div class="wem-form-group">
            <label>Nome Completo:</label>
            <input type="text" id="wem-user-name" placeholder="João Silva">
          </div>
          <div class="wem-form-group">
            <label>Cargo/Função:</label>
            <input type="text" id="wem-user-role" placeholder="Atendente">
          </div>
          <div class="wem-form-group">
            <label>Formato da Mensagem:</label>
            <select id="wem-message-format">
              <option value="*{name}:*">*Nome:* (negrito)</option>
              <option value="_{name}:_">_Nome:_ (itálico)</option>
              <option value="{name}:">{name}: (normal)</option>
              <option value="👤 {name}:">👤 Nome: (com emoji)</option>
            </select>
          </div>
          <div class="wem-preview">
            <strong>Preview:</strong>
            <div id="wem-preview-text">*João Silva:*</div>
          </div>
          <button id="wem-save-profile" class="wem-btn-primary">
            💾 Salvar Perfil
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  createSettingsModal() {
    const modal = document.createElement('div');
    modal.id = 'wem-settings-modal';
    modal.className = 'wem-modal';
    modal.innerHTML = `
      <div class="wem-modal-content" style="max-width: 500px;">
        <div class="wem-modal-header">
          <h2>⚙️ Configurações</h2>
          <button class="wem-close" data-modal="wem-settings-modal">&times;</button>
        </div>
        <div class="wem-modal-body">
          <div class="wem-settings-section">
            <h3>💾 Backup & Restore</h3>
            <button id="wem-export-data" class="wem-btn-secondary">
              📥 Exportar Dados
            </button>
            <button id="wem-import-data" class="wem-btn-secondary">
              📤 Importar Dados
            </button>
            <input type="file" id="wem-import-file" accept=".json" style="display:none;">
          </div>
          
          <div class="wem-settings-section">
            <h3>🗑️ Dados</h3>
            <button id="wem-clear-data" class="wem-btn-danger">
              🗑️ Limpar Todos os Dados
            </button>
          </div>

          <div class="wem-settings-section">
            <h3>ℹ️ Sobre</h3>
            <p><strong>WhatsApp Extension Manager</strong></p>
            <p>Versão: 1.0.0</p>
            <p>Sistema de gestão de atendimentos com Kanban</p>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  setupEventListeners() {
    // Sidebar buttons
    document.getElementById('wem-kanban-btn').addEventListener('click', () => {
      this.openModal('wem-kanban-modal');
      kanbanManager.renderCards();
      kanbanManager.setupDragAndDrop();
    });

    document.getElementById('wem-profile-btn').addEventListener('click', () => {
      this.openModal('wem-profile-modal');
      this.loadProfile();
    });

    document.getElementById('wem-settings-btn').addEventListener('click', () => {
      this.openModal('wem-settings-modal');
    });

    // Close buttons
    document.querySelectorAll('.wem-close').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modalId = e.target.dataset.modal;
        this.closeModal(modalId);
      });
    });

    // Close on outside click
    document.querySelectorAll('.wem-modal').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeModal(modal.id);
        }
      });
    });

    // Profile form
    document.getElementById('wem-save-profile').addEventListener('click', () => {
      this.saveProfile();
    });

    // Update preview on change
    document.getElementById('wem-user-name').addEventListener('input', () => {
      this.updatePreview();
    });

    document.getElementById('wem-message-format').addEventListener('change', () => {
      this.updatePreview();
    });

    // Settings buttons
    document.getElementById('wem-export-data').addEventListener('click', () => {
      this.exportData();
    });

    document.getElementById('wem-import-data').addEventListener('click', () => {
      document.getElementById('wem-import-file').click();
    });

    document.getElementById('wem-import-file').addEventListener('change', (e) => {
      this.importData(e.target.files[0]);
    });

    document.getElementById('wem-clear-data').addEventListener('click', () => {
      if (confirm('⚠️ Tem certeza? Todos os dados serão perdidos!')) {
        storageManager.clearAll();
        alert('✅ Dados limpos com sucesso!');
        this.closeModal('wem-settings-modal');
      }
    });
  }

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
    }
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
    }
  }

  loadProfile() {
    const profile = storageManager.getProfile();
    if (profile) {
      document.getElementById('wem-user-name').value = profile.userName || '';
      document.getElementById('wem-user-role').value = profile.userRole || '';
      document.getElementById('wem-message-format').value = profile.messageFormat || '*{name}:*';
      this.updatePreview();
    }
  }

  saveProfile() {
    const profile = {
      userName: document.getElementById('wem-user-name').value.trim(),
      userRole: document.getElementById('wem-user-role').value.trim(),
      userAvatar: '',
      messageFormat: document.getElementById('wem-message-format').value
    };

    storageManager.saveProfile(profile);
    alert('✅ Perfil salvo com sucesso!');
    this.closeModal('wem-profile-modal');
  }

  updatePreview() {
    const name = document.getElementById('wem-user-name').value.trim() || 'João Silva';
    const format = document.getElementById('wem-message-format').value;
    const preview = format.replace('{name}', name);
    document.getElementById('wem-preview-text').textContent = preview;
  }

  exportData() {
    const data = storageManager.exportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `whatsapp-extension-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  importData(file) {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        storageManager.importData(data);
        alert('✅ Dados importados com sucesso!');
        this.closeModal('wem-settings-modal');
      } catch (error) {
        alert('❌ Erro ao importar dados. Verifique o arquivo.');
      }
    };
    reader.readAsText(file);
  }
}

// Initialize Sidebar
const sidebarManager = new SidebarManager();
