/**
 * Sidebar - Interface principal da extensão
 * Injeta um painel lateral no WhatsApp Web
 */

class WhatsAppSidebar {
  constructor() {
    this.isOpen = false;
    this.currentTab = 'send';
    this.config = null;
    this.init();
  }

  async init() {
    await this.loadConfig();
    this.injectSidebar();
    this.setupEventListeners();
    console.log('WhatsApp Extension Manager carregado!');
  }

  async loadConfig() {
    this.config = await WhatsAppStorage.getConfig();
  }

  injectSidebar() {
    // Cria o container da sidebar
    const sidebar = document.createElement('div');
    sidebar.id = 'whatsapp-ext-sidebar';
    sidebar.className = 'whatsapp-ext-sidebar';
    
    sidebar.innerHTML = `
      <div class="sidebar-toggle" id="sidebar-toggle">
        <span>💬</span>
      </div>
      
      <div class="sidebar-panel" id="sidebar-panel">
        <div class="sidebar-header">
          <h2>WhatsApp Manager</h2>
          <button class="close-btn" id="close-sidebar">×</button>
        </div>
        
        <div class="sidebar-tabs">
          <button class="tab-btn active" data-tab="send">Enviar</button>
          <button class="tab-btn" data-tab="history">Histórico</button>
          <button class="tab-btn" data-tab="config">Config</button>
        </div>
        
        <div class="sidebar-content">
          <!-- Aba Enviar -->
          <div class="tab-content active" id="tab-send">
            <div class="chat-info">
              <span id="current-chat">Nenhum chat selecionado</span>
            </div>
            
            <div class="form-group">
              <label>Mensagem:</label>
              <textarea id="message-input" placeholder="Digite sua mensagem aqui..." rows="6"></textarea>
            </div>
            
            <div class="preview-box">
              <strong>Preview:</strong>
              <div id="message-preview">*Seu Nome:*\nSua mensagem aqui...</div>
            </div>
            
            <div class="form-group">
              <label>
                <input type="checkbox" id="use-evolution-api">
                Enviar via Evolution API
              </label>
            </div>
            
            <button class="btn-primary" id="send-message">Enviar Mensagem 📤</button>
          </div>
          
          <!-- Aba Histórico -->
          <div class="tab-content" id="tab-history">
            <div class="history-header">
              <h3>Últimas Mensagens</h3>
              <button class="btn-small" id="clear-history">Limpar</button>
            </div>
            <div class="history-list" id="history-list">
              <p class="empty-state">Nenhuma mensagem enviada ainda</p>
            </div>
          </div>
          
          <!-- Aba Config -->
          <div class="tab-content" id="tab-config">
            <div class="form-group">
              <label>Nome Completo:</label>
              <input type="text" id="config-name" placeholder="Ex: João Silva">
            </div>
            
            <div class="form-group">
              <label>Cargo/Função:</label>
              <input type="text" id="config-position" placeholder="Ex: Suporte Técnico">
            </div>
            
            <div class="form-group">
              <label>Avatar (URL):</label>
              <input type="text" id="config-avatar" placeholder="https://...">
            </div>
            
            <div class="form-group">
              <label>Formato da Mensagem:</label>
              <textarea id="config-format" rows="3" placeholder="*{name}:*\n{message}"></textarea>
              <small>Use: {name}, {position}, {message}</small>
            </div>
            
            <hr>
            
            <h3>Evolution API (Opcional)</h3>
            
            <div class="form-group">
              <label>URL da API:</label>
              <input type="text" id="evolution-url" placeholder="https://api.exemplo.com">
            </div>
            
            <div class="form-group">
              <label>API Key:</label>
              <input type="password" id="evolution-apikey" placeholder="Sua API Key">
            </div>
            
            <div class="form-group">
              <label>Nome da Instância:</label>
              <input type="text" id="evolution-instance" placeholder="instance-1">
            </div>
            
            <button class="btn-secondary" id="test-evolution">Testar Conexão</button>
            <button class="btn-primary" id="save-config">Salvar Configurações</button>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(sidebar);
  }

  setupEventListeners() {
    // Toggle sidebar
    document.getElementById('sidebar-toggle').addEventListener('click', () => {
      this.toggleSidebar();
    });
    
    document.getElementById('close-sidebar').addEventListener('click', () => {
      this.closeSidebar();
    });
    
    // Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.switchTab(e.target.dataset.tab);
      });
    });
    
    // Send message
    document.getElementById('send-message').addEventListener('click', () => {
      this.sendMessage();
    });
    
    // Message input - update preview
    document.getElementById('message-input').addEventListener('input', (e) => {
      this.updatePreview(e.target.value);
    });
    
    // Save config
    document.getElementById('save-config').addEventListener('click', () => {
      this.saveConfig();
    });
    
    // Test Evolution API
    document.getElementById('test-evolution').addEventListener('click', () => {
      this.testEvolutionAPI();
    });
    
    // Clear history
    document.getElementById('clear-history').addEventListener('click', () => {
      this.clearHistory();
    });
    
    // Load config on config tab
    this.loadConfigForm();
    
    // Update chat info periodically
    setInterval(() => this.updateChatInfo(), 1000);
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
    const panel = document.getElementById('sidebar-panel');
    
    if (this.isOpen) {
      panel.classList.add('open');
      if (this.currentTab === 'history') {
        this.loadHistory();
      }
    } else {
      panel.classList.remove('open');
    }
  }

  closeSidebar() {
    this.isOpen = false;
    document.getElementById('sidebar-panel').classList.remove('open');
  }

  switchTab(tabName) {
    this.currentTab = tabName;
    
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.toggle('active', content.id === `tab-${tabName}`);
    });
    
    // Load data if needed
    if (tabName === 'history') {
      this.loadHistory();
    } else if (tabName === 'config') {
      this.loadConfigForm();
    }
  }

  updateChatInfo() {
    const chatInfo = WhatsAppInjector.getChatInfo();
    const chatElement = document.getElementById('current-chat');
    
    if (chatElement) {
      chatElement.textContent = chatInfo.name || 'Nenhum chat selecionado';
    }
  }

  updatePreview(message) {
    const preview = document.getElementById('message-preview');
    const formatted = WhatsAppStorage.formatMessage(message, this.config);
    preview.textContent = formatted || 'Digite uma mensagem...';
  }

  async sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();
    
    if (!message) {
      alert('Digite uma mensagem!');
      return;
    }
    
    const useAPI = document.getElementById('use-evolution-api').checked;
    const formatted = WhatsAppStorage.formatMessage(message, this.config);
    
    try {
      if (useAPI && this.config.useEvolutionAPI) {
        await this.sendViaEvolutionAPI(formatted);
      } else {
        await WhatsAppInjector.sendMessage(formatted);
      }
      
      // Salva no histórico
      await WhatsAppStorage.addToHistory({
        message: message,
        formatted: formatted,
        chat: WhatsAppInjector.getCurrentChat(),
        method: useAPI ? 'evolution-api' : 'web'
      });
      
      // Limpa o input
      messageInput.value = '';
      this.updatePreview('');
      
      alert('Mensagem enviada com sucesso! ✅');
    } catch (error) {
      alert('Erro ao enviar mensagem: ' + error.message);
      console.error(error);
    }
  }

  async sendViaEvolutionAPI(message) {
    const phone = WhatsAppInjector.getCurrentPhoneNumber();
    
    if (!phone) {
      throw new Error('Não foi possível obter o número do chat');
    }
    
    const response = await chrome.runtime.sendMessage({
      action: 'sendViaEvolutionAPI',
      data: {
        url: this.config.evolutionAPI.url,
        apiKey: this.config.evolutionAPI.apiKey,
        instanceName: this.config.evolutionAPI.instanceName,
        phone: phone,
        message: message
      }
    });
    
    if (!response.success) {
      throw new Error(response.error);
    }
  }

  async loadHistory() {
    const history = await WhatsAppStorage.getHistory(50);
    const listElement = document.getElementById('history-list');
    
    if (history.length === 0) {
      listElement.innerHTML = '<p class="empty-state">Nenhuma mensagem enviada ainda</p>';
      return;
    }
    
    listElement.innerHTML = history.reverse().map(item => `
      <div class="history-item">
        <div class="history-chat">${item.chat || 'Chat desconhecido'}</div>
        <div class="history-message">${item.message}</div>
        <div class="history-time">${new Date(item.timestamp).toLocaleString()}</div>
        <div class="history-method">${item.method === 'evolution-api' ? '🤖 API' : '🌐 Web'}</div>
      </div>
    `).join('');
  }

  async clearHistory() {
    if (confirm('Tem certeza que deseja limpar todo o histórico?')) {
      await WhatsAppStorage.clearHistory();
      this.loadHistory();
    }
  }

  async loadConfigForm() {
    const config = await WhatsAppStorage.getConfig();
    
    document.getElementById('config-name').value = config.name || '';
    document.getElementById('config-position').value = config.position || '';
    document.getElementById('config-avatar').value = config.avatar || '';
    document.getElementById('config-format').value = config.format || '*{name}:*\n{message}';
    
    if (config.evolutionAPI) {
      document.getElementById('evolution-url').value = config.evolutionAPI.url || '';
      document.getElementById('evolution-apikey').value = config.evolutionAPI.apiKey || '';
      document.getElementById('evolution-instance').value = config.evolutionAPI.instanceName || '';
    }
  }

  async saveConfig() {
    const config = {
      name: document.getElementById('config-name').value,
      position: document.getElementById('config-position').value,
      avatar: document.getElementById('config-avatar').value,
      format: document.getElementById('config-format').value,
      useEvolutionAPI: false,
      evolutionAPI: {
        url: document.getElementById('evolution-url').value,
        apiKey: document.getElementById('evolution-apikey').value,
        instanceName: document.getElementById('evolution-instance').value
      }
    };
    
    // Verifica se Evolution API está configurada
    if (config.evolutionAPI.url && config.evolutionAPI.apiKey && config.evolutionAPI.instanceName) {
      config.useEvolutionAPI = true;
    }
    
    await WhatsAppStorage.saveConfig(config);
    this.config = config;
    
    alert('Configurações salvas com sucesso! ✅');
  }

  async testEvolutionAPI() {
    const url = document.getElementById('evolution-url').value;
    const apiKey = document.getElementById('evolution-apikey').value;
    const instanceName = document.getElementById('evolution-instance').value;
    
    if (!url || !apiKey || !instanceName) {
      alert('Preencha todos os campos da Evolution API!');
      return;
    }
    
    const result = await WhatsAppStorage.testEvolutionAPI(url, apiKey, instanceName);
    
    if (result.success) {
      alert('Conexão com Evolution API bem-sucedida! ✅\nEstado: ' + JSON.stringify(result.data));
    } else {
      alert('Erro ao conectar com Evolution API: ' + result.error);
    }
  }
}

// Inicializa quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new WhatsAppSidebar();
  });
} else {
  new WhatsAppSidebar();
}
