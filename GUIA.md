# 📖 Guia de Instalação e Uso

## 🚀 Instalação Rápida

### Passo 1: Baixar o Projeto
```bash
git clone https://github.com/IslandeSilva/Whatsapp-Extension.git
cd Whatsapp-Extension
```

### Passo 2: Instalar no Chrome
1. Abra o Google Chrome
2. Digite na barra de endereços: `chrome://extensions/`
3. Ative o **"Modo do desenvolvedor"** (canto superior direito)
4. Clique em **"Carregar sem compactação"**
5. Navegue até a pasta `extension/` dentro do projeto
6. Clique em "Selecionar pasta"

✅ **A extensão está instalada!**

### Passo 3: Acessar WhatsApp Web
1. Abra uma nova aba
2. Acesse: https://web.whatsapp.com
3. Faça login com seu WhatsApp (QR Code)
4. A barra lateral verde aparecerá automaticamente no lado esquerdo

---

## 🎯 Primeiros Passos

### Configurar seu Perfil

1. Clique no botão **👤 Perfil** (segundo botão na barra lateral)
2. Preencha:
   - **Nome Completo**: Seu nome (ex: João Silva)
   - **Cargo/Função**: Seu papel (ex: Atendente, Suporte, Vendas)
   - **Formato da Mensagem**: Como sua assinatura aparecerá
3. Veja o preview em tempo real
4. Clique em **"💾 Salvar Perfil"**

**Formatos disponíveis:**
- `*Nome:*` → **Nome:** (negrito no WhatsApp)
- `_Nome:_` → _Nome:_ (itálico no WhatsApp)
- `Nome:` → Nome: (texto normal)
- `👤 Nome:` → 👤 Nome: (com emoji)

---

## 📋 Usando o Kanban

### Abrir o Kanban
1. Clique no botão **📋 Kanban** (primeiro botão na barra lateral)
2. O modal grande abrirá com 5 colunas

### As 5 Colunas do Kanban

| Coluna | Ícone | Uso |
|--------|-------|-----|
| **Novo** | 🟢 | Conversas recém-iniciadas |
| **Em Atendimento** | 🟡 | Atendimentos em andamento |
| **Aguardando** | 🔴 | Aguardando resposta do cliente |
| **Pausado** | ⏸️ | Atendimentos pausados temporariamente |
| **Resolvido** | ✅ | Atendimentos concluídos |

### Adicionar Chat ao Kanban (Manual)

Como a auto-detecção ainda está em desenvolvimento, você pode adicionar chats manualmente:

1. Abra o console do navegador (F12)
2. Execute:
```javascript
kanbanManager.addChat('5511999998888', 'Nome do Cliente', 'Última mensagem');
```

**Ou** use a extensão para criar uma interface de adição manual (futuro).

### Mover Chats Entre Status

1. **Clique e segure** um card
2. **Arraste** até a coluna desejada
3. **Solte** o card
4. ✅ O status é atualizado automaticamente!

### Bolinhas Coloridas no WhatsApp

Após adicionar chats ao Kanban, você verá:
- 🟢 Bolinha verde ao lado de chats "Novos"
- 🟡 Bolinha amarela ao lado de chats "Em Atendimento"
- E assim por diante...

Isso facilita identificar o status de cada chat diretamente na lista do WhatsApp!

---

## ⚙️ Configurações

### Abrir Configurações
Clique no botão **⚙️ Configurações** (terceiro botão na barra lateral)

### Backup de Dados

**Exportar:**
1. Clique em **"📥 Exportar Dados"**
2. Um arquivo JSON será baixado com todo seu perfil e kanban

**Importar:**
1. Clique em **"📤 Importar Dados"**
2. Selecione o arquivo JSON de backup
3. Seus dados serão restaurados

### Limpar Dados
⚠️ **CUIDADO**: Isso apaga tudo!

1. Clique em **"🗑️ Limpar Todos os Dados"**
2. Confirme a ação
3. Todos os dados serão removidos (perfil + kanban)

---

## 💡 Dicas de Uso

### 1. Organização de Atendimentos
- Use **"Novo"** para leads/primeiros contatos
- Mova para **"Em Atendimento"** quando começar a responder
- Use **"Aguardando"** quando estiver esperando resposta do cliente
- **"Pausado"** para casos que precisam de informações externas
- **"Resolvido"** para casos finalizados

### 2. Assinatura nas Mensagens
Com o perfil configurado, suas mensagens automaticamente terão sua assinatura:

**Antes:**
```
Olá! Tudo bem?
```

**Depois (com assinatura):**
```
Olá! Tudo bem?

*João Silva:*
```

### 3. Trabalho em Equipe
Cada pessoa da equipe deve:
1. Instalar a extensão individualmente
2. Configurar seu próprio perfil
3. Gerenciar seu próprio kanban

**Nota**: Os dados ficam salvos localmente no navegador de cada pessoa.

---

## 🔧 Solução de Problemas

### A barra lateral não aparece
1. Verifique se está em https://web.whatsapp.com
2. Atualize a página (F5)
3. Verifique se a extensão está ativada em `chrome://extensions/`

### Cards não aparecem no Kanban
1. Você precisa adicionar chats manualmente (por enquanto)
2. Use: `kanbanManager.addChat('telefone', 'nome', 'mensagem')`

### Assinatura não aparece nas mensagens
1. Verifique se configurou o perfil
2. Certifique-se de ter preenchido o "Nome Completo"
3. Tente recarregar o WhatsApp Web

### Dados foram perdidos
1. Se você fez backup, importe o arquivo JSON
2. Senão, será necessário reconfigurar manualmente

---

## 📊 Estrutura de Dados

### LocalStorage

A extensão salva dados em:

**`wem_user_profile`:**
```json
{
  "userName": "João Silva",
  "userRole": "Atendente",
  "userAvatar": "",
  "messageFormat": "*{name}:*"
}
```

**`wem_kanban`:**
```json
{
  "5511999998888": {
    "name": "Maria Silva",
    "phone": "5511999998888",
    "status": "novo",
    "color": "🟢",
    "lastMessage": "Preciso de ajuda...",
    "timestamp": 1707280927000,
    "notes": ""
  }
}
```

---

## 🆘 Suporte

Encontrou um bug? Tem uma sugestão?

1. Abra uma [issue no GitHub](https://github.com/IslandeSilva/Whatsapp-Extension/issues)
2. Descreva o problema ou sugestão
3. Inclua prints se possível

---

## 📄 Licença

Este projeto é open source. Veja o arquivo LICENSE para detalhes.

---

**Desenvolvido com ❤️ para melhorar o atendimento no WhatsApp**
