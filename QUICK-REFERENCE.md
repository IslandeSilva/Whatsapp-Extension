# 🎯 Quick Reference - WhatsApp Extension Manager

## 🎨 Atalhos Visuais

### Barra Lateral (50px - sempre visível)
```
┌─────┐
│ 📋  │ ← Kanban: Gestão de Atendimentos
│ 👤  │ ← Perfil: Configure seu nome e assinatura
│ ⚙️  │ ← Configurações: Backup e limpeza
└─────┘
```

### Status do Kanban
| Ícone | Status | Quando usar |
|-------|--------|-------------|
| 🟢 | Novo | Primeira mensagem de um cliente |
| 🟡 | Em Atendimento | Você está atendendo agora |
| 🔴 | Aguardando | Esperando resposta do cliente |
| ⏸️ | Pausado | Precisa pausar temporariamente |
| ✅ | Resolvido | Atendimento finalizado |

## ⌨️ Comandos no Console

### Adicionar chat ao Kanban
```javascript
kanbanManager.addChat('5511999998888', 'João Silva', 'Olá!');
```

### Ver todos os chats do Kanban
```javascript
console.table(kanbanManager.getKanban());
```

### Ver perfil atual
```javascript
console.log(storageManager.getProfile());
```

### Atualizar status de um chat
```javascript
kanbanManager.updateChatStatus('5511999998888', 'em_atendimento');
```

### Remover chat do Kanban
```javascript
kanbanManager.removeChat('5511999998888');
```

### Exportar dados manualmente
```javascript
console.log(JSON.stringify(storageManager.exportData(), null, 2));
```

## 🎯 Fluxo de Trabalho Recomendado

### Para Atendentes
```
1. Cliente envia mensagem → 🟢 Novo
2. Você responde → 🟡 Em Atendimento
3. Cliente não responde → 🔴 Aguardando
4. Resolveu o problema → ✅ Resolvido
```

### Para Gestores
```
1. Visualizar Kanban → Ver todos os atendimentos
2. Checar coluna "Aguardando" → Identificar clientes sem resposta
3. Checar coluna "Pausado" → Ver casos pendentes
4. Analisar "Resolvido" → Verificar produtividade
```

## 💾 Backup & Restore

### Fazer Backup
1. ⚙️ Configurações
2. 📥 Exportar Dados
3. Salvar arquivo JSON em local seguro

### Restaurar Backup
1. ⚙️ Configurações
2. 📤 Importar Dados
3. Selecionar arquivo JSON

**Recomendação**: Faça backup semanalmente!

## 🔍 Teclas de Atalho

| Ação | Atalho |
|------|--------|
| Abrir Console | `F12` |
| Recarregar Página | `F5` ou `Ctrl+R` |
| Fechar Modal | `Esc` ou clicar fora |

## 📱 Formatos de Telefone

**Formato aceito**: Código do país + DDD + número

Exemplos:
- ✅ `5511999998888` (Brasil)
- ✅ `351912345678` (Portugal)
- ✅ `1234567890` (Outros)

## 🎨 Formatos de Assinatura

### Disponíveis
1. `*{name}:*` → **João Silva:** (negrito)
2. `_{name}:_` → _João Silva:_ (itálico)
3. `{name}:` → João Silva: (normal)
4. `👤 {name}:` → 👤 João Silva: (com emoji)

### Personalizado
Você pode criar seu próprio formato usando `{name}`:
- `✍️ {name}` → ✍️ João Silva
- `[{name}]` → [João Silva]
- `- {name}` → - João Silva

## 🚨 Troubleshooting Rápido

| Problema | Solução |
|----------|---------|
| Sidebar não aparece | F5 para recarregar |
| Cards não movem | Verifique se está arrastando corretamente |
| Assinatura não funciona | Configure o perfil primeiro |
| Dados sumiram | Restaure o backup |
| Bolinha não aparece | Adicione o chat ao Kanban |

## 📊 Análise de Dados

### Ver estatísticas
```javascript
const kanban = kanbanManager.getKanban();
const stats = {
  novo: Object.values(kanban).filter(c => c.status === 'novo').length,
  em_atendimento: Object.values(kanban).filter(c => c.status === 'em_atendimento').length,
  aguardando: Object.values(kanban).filter(c => c.status === 'aguardando').length,
  pausado: Object.values(kanban).filter(c => c.status === 'pausado').length,
  resolvido: Object.values(kanban).filter(c => c.status === 'resolvido').length,
  total: Object.keys(kanban).length
};
console.table(stats);
```

## 🔐 Privacidade

✅ **O que fica no seu navegador:**
- Perfil do usuário
- Dados do Kanban
- Configurações

❌ **O que NÃO é enviado:**
- Nenhum dado para servidores externos
- Nenhuma informação de rastreamento
- Nenhuma mensagem do WhatsApp

## 🆘 Links Úteis

- 📖 [Guia Completo](GUIA.md)
- 📚 [README Principal](README.md)
- 🐛 [Reportar Bug](https://github.com/IslandeSilva/Whatsapp-Extension/issues)
- 💡 [Sugerir Feature](https://github.com/IslandeSilva/Whatsapp-Extension/issues)

---

**Última atualização**: 2024
**Versão**: 1.0.0
