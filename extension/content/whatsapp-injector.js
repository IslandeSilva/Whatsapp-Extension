/**
 * WhatsApp Injector
 * Helpers para interagir com o WhatsApp Web
 */

const WhatsAppInjector = {
  /**
   * Verifica se o WhatsApp Web está carregado
   */
  isWhatsAppLoaded() {
    return document.querySelector('[data-testid="conversation-panel-body"]') !== null;
  },

  /**
   * Aguarda o WhatsApp Web carregar
   */
  async waitForWhatsApp(timeout = 10000) {
    const startTime = Date.now();
    
    while (!this.isWhatsAppLoaded()) {
      if (Date.now() - startTime > timeout) {
        throw new Error('WhatsApp Web não carregou no tempo esperado');
      }
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    return true;
  },

  /**
   * Obtém o chat atualmente selecionado
   */
  getCurrentChat() {
    const header = document.querySelector('header [data-testid="conversation-info-header"]');
    if (!header) return null;

    const titleElement = header.querySelector('[title]');
    return titleElement ? titleElement.getAttribute('title') : null;
  },

  /**
   * Obtém o número de telefone do chat atual
   */
  getCurrentPhoneNumber() {
    // Esta função tentará extrair o número do chat atual
    // No WhatsApp Web, isso pode variar dependendo da versão
    const url = window.location.href;
    const match = url.match(/whatsapp.com\/(.+)/);
    
    if (match) {
      const parts = match[1].split('/');
      if (parts.length > 0) {
        return parts[0].replace(/\D/g, '');
      }
    }
    
    return null;
  },

  /**
   * Obtém a caixa de texto de mensagem
   */
  getMessageBox() {
    return document.querySelector('[data-testid="conversation-compose-box-input"]') ||
           document.querySelector('[contenteditable="true"][data-tab="10"]');
  },

  /**
   * Insere texto na caixa de mensagem
   */
  insertMessage(text) {
    const messageBox = this.getMessageBox();
    if (!messageBox) {
      console.error('Caixa de mensagem não encontrada');
      return false;
    }

    // Simula evento de input
    messageBox.focus();
    
    // Define o texto usando diferentes métodos para compatibilidade
    if (messageBox.textContent !== undefined) {
      messageBox.textContent = text;
    } else {
      messageBox.value = text;
    }

    // Dispara eventos para que o WhatsApp detecte a mudança
    const inputEvent = new Event('input', { bubbles: true });
    messageBox.dispatchEvent(inputEvent);
    
    const changeEvent = new Event('change', { bubbles: true });
    messageBox.dispatchEvent(changeEvent);

    return true;
  },

  /**
   * Clica no botão de enviar
   */
  clickSendButton() {
    const sendButton = document.querySelector('[data-testid="compose-btn-send"]') ||
                       document.querySelector('[data-icon="send"]');
    
    if (sendButton) {
      sendButton.click();
      return true;
    }
    
    console.error('Botão de enviar não encontrado');
    return false;
  },

  /**
   * Envia uma mensagem completa
   */
  async sendMessage(text) {
    if (!this.isWhatsAppLoaded()) {
      throw new Error('WhatsApp Web não está carregado');
    }

    const chat = this.getCurrentChat();
    if (!chat) {
      throw new Error('Nenhum chat selecionado');
    }

    // Insere o texto
    if (!this.insertMessage(text)) {
      throw new Error('Não foi possível inserir a mensagem');
    }

    // Aguarda um pouco para garantir que o texto foi inserido
    await new Promise(resolve => setTimeout(resolve, 100));

    // Clica no botão de enviar
    if (!this.clickSendButton()) {
      throw new Error('Não foi possível enviar a mensagem');
    }

    return {
      success: true,
      chat: chat,
      message: text
    };
  },

  /**
   * Obtém informações do chat atual
   */
  getChatInfo() {
    return {
      name: this.getCurrentChat(),
      phone: this.getCurrentPhoneNumber(),
      isLoaded: this.isWhatsAppLoaded()
    };
  }
};

// Exporta para uso global
window.WhatsAppInjector = WhatsAppInjector;
