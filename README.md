# 💬 WhatsApp Extension Manager

Extensão Chrome para gerenciar atendimentos no WhatsApp Web com sistema Kanban integrado. Ideal para equipes de atendimento que compartilham o mesmo número do WhatsApp.

## ✨ Funcionalidades

### 📋 Sistema Kanban
- **Gestão Visual de Atendimentos**: Organize seus chats em 5 status diferentes
  - 🟢 **Novo**: Conversas recém-iniciadas
  - 🟡 **Em Atendimento**: Atendimentos em andamento
  - 🔴 **Aguardando**: Aguardando resposta do cliente
  - ⏸️ **Pausado**: Atendimentos temporariamente pausados
  - ✅ **Resolvido**: Atendimentos concluídos
- **Drag & Drop**: Arraste cards entre colunas para atualizar status
- **Indicadores Visuais**: Bolinhas coloridas aparecem diretamente nos chats do WhatsApp
- **Auto-detecção**: Novos chats são detectados e adicionados automaticamente ao Kanban

### 👤 Perfil Personalizado
- 🏷️ **Mensagens Identificadas**: Cada atendente tem seu nome nas mensagens (aparece automaticamente)
- 🎨 **Formatos Customizáveis**: Escolha entre negrito, itálico, emoji e mais
- 💼 **Cargo/Função**: Configure seu papel na equipe

### 🔧 Funcionalidades Técnicas
- 💾 **Armazenamento Local**: Todos os dados ficam no seu navegador
- 🔒 **Privacidade Total**: Nenhum dado enviado para servidores externos
- 🎯 **Interface Lateral**: Barra de 50px que empurra o WhatsApp para o lado (não sobrepõe)
- 📱 **Responsivo**: Funciona em diferentes tamanhos de tela
- 🚀 **Rápido e Leve**: Sem dependências pesadas

## 🎨 Interface

### Barra Lateral Slim (50px)
- **📋 Kanban**: Abre o quadro de gestão de atendimentos
- **👤 Perfil**: Configure seu nome e assinatura
- **⚙️ Configurações**: Backup, restore e limpeza de dados

### Modal Kanban
- Grade com 5 colunas de status
- Cards com informações do chat (nome, telefone, última mensagem, horário)
- Drag & drop funcional entre colunas
- Contador de cards por coluna

## 🚀 Instalação

1. Clone este repositório
2. Abra o Chrome e vá para `chrome://extensions/`
3. Ative o "Modo do desenvolvedor"
4. Clique em "Carregar sem compactação"
5. Selecione a pasta `extension/`
6. Acesse https://web.whatsapp.com
7. Pronto! A barra lateral aparecerá automaticamente

## 📖 Como Usar

### Configurar Perfil
1. Clique no ícone **👤 Perfil** na barra lateral
2. Preencha seu nome e cargo
3. Escolha o formato da sua assinatura
4. Clique em "Salvar Perfil"

### Gerenciar Atendimentos
1. Clique no ícone **📋 Kanban**
2. Veja todos os seus chats organizados
3. Arraste cards entre colunas para atualizar o status
4. Os indicadores coloridos aparecerão automaticamente nos chats

### Backup de Dados
1. Clique em **⚙️ Configurações**
2. Use "Exportar Dados" para fazer backup
3. Use "Importar Dados" para restaurar

## 🛠️ Estrutura do Projeto

```
extension/
├── manifest.json                  # Configuração da extensão
├── background/
│   └── service-worker.js         # Service worker mínimo
├── content/
│   ├── storage.js                # Gerenciamento de localStorage
│   ├── kanban.js                 # Lógica do Kanban + drag & drop
│   ├── sidebar.js                # Interface slim + modais
│   ├── sidebar.css               # Estilos completos
│   └── whatsapp-injector.js      # Injeção de assinatura
├── popup/
│   ├── popup.html                # Interface do popup
│   ├── popup.css                 # Estilos do popup
│   └── popup.js                  # Lógica do popup
└── assets/icons/                  # Ícones da extensão
```

## 💾 Dados Armazenados

A extensão usa `localStorage` para salvar:

### Perfil do Usuário
```javascript
wem_user_profile = {
  userName: "João Silva",
  userRole: "Atendente", 
  userAvatar: "",
  messageFormat: "*{name}:*"
}
```

### Kanban
```javascript
wem_kanban = {
  "5511999998888": {
    name: "Maria Silva",
    phone: "5511999998888",
    status: "novo",
    color: "🟢",
    lastMessage: "Última mensagem...",
    timestamp: 1234567890,
    notes: ""
  }
}
```

## 🔒 Privacidade

- ✅ Todos os dados ficam armazenados localmente no seu navegador
- ✅ Nenhuma informação é enviada para servidores externos
- ✅ Sem tracking ou analytics
- ✅ Código 100% open source para auditoria

## 📱 Compatibilidade

- ✅ Google Chrome (recomendado)
- ✅ Microsoft Edge
- ✅ Brave
- ✅ Outros navegadores baseados em Chromium

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir novas funcionalidades
- Enviar pull requests

## 🔧 Ferramentas de Diagnóstico

### Diagnostic Tool
Uma ferramenta HTML standalone para verificar a configuração da extensão:
- Abre `diagnostic.html` no navegador
- Verifica se o perfil está configurado corretamente
- Mostra preview da assinatura que será injetada
- Identifica problemas comuns (userName vazio, etc.)
- Permite limpar e reconfigurar dados

### Debugging Guide
Guia completo de depuração em `DEBUGGING-INJECTION.md`:
- Passos para debugar problemas de injeção
- Como verificar logs no console
- Soluções para problemas comuns
- Técnicas avançadas de debugging

### Console Logs
A extensão agora inclui logs detalhados no console do navegador:
- Pressione F12 no WhatsApp Web
- Procure por mensagens com prefixo `[WEM]`
- Acompanhe o fluxo de injeção de assinatura
- Identifique problemas facilmente

## 📄 Licença

Este projeto é open source e está disponível sob a licença especificada no arquivo LICENSE.

## 🎯 Roadmap

- [ ] Filtros e busca no Kanban
- [ ] Estatísticas de atendimento
- [ ] Tags personalizadas para chats
- [ ] Notas e comentários em cards
- [ ] Integração com notificações
- [ ] Temas dark/light

---

**Desenvolvido com ❤️ para equipes de atendimento que usam WhatsApp**