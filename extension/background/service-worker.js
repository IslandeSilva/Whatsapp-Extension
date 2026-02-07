/**
 * Service Worker - Background Script
 * Gerencia eventos de background da extensão
 */

// Instalação da extensão
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('WhatsApp Extension Manager instalada com sucesso!');
    
    // Configuração inicial padrão
    chrome.storage.local.set({
      userConfig: {
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
      },
      messageHistory: []
    });
  } else if (details.reason === 'update') {
    console.log('WhatsApp Extension Manager atualizada!');
  }
});

// Listener para mensagens do content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'saveMessage') {
    // Salvar mensagem no histórico
    chrome.storage.local.get(['messageHistory'], (result) => {
      const history = result.messageHistory || [];
      history.push({
        ...request.message,
        timestamp: new Date().toISOString(),
        tabId: sender.tab?.id
      });
      
      // Manter apenas últimas 1000 mensagens
      if (history.length > 1000) {
        history.shift();
      }
      
      chrome.storage.local.set({ messageHistory: history }, () => {
        sendResponse({ success: true });
      });
    });
    return true; // Mantém o canal de mensagem aberto para resposta assíncrona
  }
  
  if (request.action === 'getConfig') {
    chrome.storage.local.get(['userConfig'], (result) => {
      sendResponse({ config: result.userConfig });
    });
    return true;
  }
  
  if (request.action === 'sendViaEvolutionAPI') {
    // Enviar mensagem via Evolution API
    handleEvolutionAPIRequest(request.data)
      .then(response => sendResponse({ success: true, response }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true;
  }
});

/**
 * Envia mensagem via Evolution API
 */
async function handleEvolutionAPIRequest(data) {
  const { url, apiKey, instanceName, phone, message } = data;
  
  const apiUrl = `${url}/message/sendText/${instanceName}`;
  
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': apiKey
    },
    body: JSON.stringify({
      number: phone,
      text: message
    })
  });
  
  if (!response.ok) {
    throw new Error(`Evolution API error: ${response.statusText}`);
  }
  
  return await response.json();
}

// Monitora mudanças no storage
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local') {
    if (changes.userConfig) {
      console.log('Configuração atualizada:', changes.userConfig.newValue);
    }
  }
});

console.log('Service Worker carregado com sucesso!');
