/**
 * Storage Manager
 * Gerencia localStorage e chrome.storage da extensão
 */

const WhatsAppStorage = {
  /**
   * Obtém a configuração do usuário
   */
  async getConfig() {
    return new Promise((resolve) => {
      chrome.storage.local.get(['userConfig'], (result) => {
        resolve(result.userConfig || {
          name: '',
          position: '',
          avatar: '',
          format: '*{name}:*\n{message}',
          useEvolutionAPI: false,
          evolutionAPI: {
            url: '',
            apiKey: '',
            instanceName: ''
          }
        });
      });
    });
  },

  /**
   * Salva a configuração do usuário
   */
  async saveConfig(config) {
    return new Promise((resolve) => {
      chrome.storage.local.set({ userConfig: config }, () => {
        resolve(true);
      });
    });
  },

  /**
   * Obtém o histórico de mensagens
   */
  async getHistory(limit = 100) {
    return new Promise((resolve) => {
      chrome.storage.local.get(['messageHistory'], (result) => {
        const history = result.messageHistory || [];
        resolve(history.slice(-limit));
      });
    });
  },

  /**
   * Adiciona uma mensagem ao histórico
   */
  async addToHistory(message) {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({
        action: 'saveMessage',
        message: message
      }, (response) => {
        resolve(response?.success || false);
      });
    });
  },

  /**
   * Limpa o histórico de mensagens
   */
  async clearHistory() {
    return new Promise((resolve) => {
      chrome.storage.local.set({ messageHistory: [] }, () => {
        resolve(true);
      });
    });
  },

  /**
   * Exporta dados para backup
   */
  async exportData() {
    return new Promise((resolve) => {
      chrome.storage.local.get(null, (data) => {
        resolve(data);
      });
    });
  },

  /**
   * Importa dados de backup
   */
  async importData(data) {
    return new Promise((resolve) => {
      chrome.storage.local.set(data, () => {
        resolve(true);
      });
    });
  },

  /**
   * Formata mensagem com o nome do usuário
   */
  formatMessage(message, config) {
    if (!config || !config.name) {
      return message;
    }

    const format = config.format || '*{name}:*\n{message}';
    
    return format
      .replace('{name}', config.name)
      .replace('{position}', config.position || '')
      .replace('{message}', message);
  },

  /**
   * Testa conexão com Evolution API
   */
  async testEvolutionAPI(url, apiKey, instanceName) {
    try {
      const response = await fetch(`${url}/instance/connectionState/${instanceName}`, {
        method: 'GET',
        headers: {
          'apikey': apiKey
        }
      });

      if (!response.ok) {
        throw new Error('Falha na conexão');
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

// Exporta para uso global
window.WhatsAppStorage = WhatsAppStorage;
