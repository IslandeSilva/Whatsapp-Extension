# 💬 WhatsApp Extension Manager

Extensão Chrome para enviar mensagens identificadas no WhatsApp Web. Ideal para equipes de atendimento que compartilham o mesmo número do WhatsApp.

## ✨ Funcionalidades

- 🏷️ **Mensagens Identificadas**: Cada colaborador tem seu nome exibido nas mensagens
- 📊 **Histórico Local**: Acompanhe todas as mensagens enviadas
- 🎨 **Personalizável**: Configure formato do nome, cargo e avatar
- 🤖 **Integração Evolution API**: Opção de enviar via API (opcional)
- 💾 **Armazenamento Local**: Todos os dados ficam no seu navegador
- 🔒 **Privacidade**: Nenhum dado é enviado para servidores externos
- 📱 **Open Source**: Código 100% aberto e gratuito

## 🚀 Instalação

### Opção 1: Chrome Web Store (em breve)
Aguardando publicação

### Opção 2: Instalação Manual

1. **Clone o repositório**
```bash
git clone https://github.com/IslandeSilva/Whatsapp-Extension.git
cd Whatsapp-Extension
```

2. **Abra o Chrome** e vá para `chrome://extensions/`

3. **Ative o "Modo do desenvolvedor"** (canto superior direito)

4. **Clique em "Carregar sem compactação"**

5. **Selecione a pasta `extension`** do projeto

6. **Pronto!** A extensão está instalada ✅

## 📖 Como Usar

### 1️⃣ Primeira Configuração

1. Abra o WhatsApp Web (https://web.whatsapp.com)
2. Clique no ícone 💬 no lado esquerdo da tela
3. Vá na aba **Config** ⚙️
4. Preencha seus dados:
   - Nome completo
   - Cargo/função
   - Avatar (opcional)
5. Clique em **Salvar Configurações**

### 2️⃣ Enviando Mensagens

1. Selecione um chat no WhatsApp Web
2. No painel lateral, digite sua mensagem
3. Veja o preview de como ficará
4. Clique em **Enviar** 📤

**Exemplo de mensagem enviada:**
```
*João Silva:*
Olá, como posso ajudar?
```

### 3️⃣ Integrando com Evolution API (Opcional)

Se você tem uma Evolution API rodando:

1. Vá em **Config** ⚙️
2. Preencha:
   - URL da Evolution API
   - API Key
   - Nome da Instância
3. Clique em **Testar Conexão**
4. Ao enviar mensagens, marque **"Enviar via Evolution API"**

## 🛠️ Configuração da Evolution API

Se você quiser bot automático 24/7, configure diretamente na Evolution API.

## 📊 Estrutura do Projeto

```
Whatsapp-Extension/
├── extension/
│   ├── manifest.json
│   ├── background/
│   │   └── service-worker.js
│   ├── content/
│   │   ├── storage.js
│   │   ├── sidebar.js
│   │   ├── sidebar.css
│   │   └── whatsapp-injector.js
│   ├── popup/
│   │   ├── popup.html
│   │   ├── popup.css
│   │   └── popup.js
│   └── assets/
│       └── icons/
├── README.md
├── .gitignore
└── LICENSE
```

## 🤝 Contribuindo

Contribuições são muito bem-vindas!

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 🐛 Reportar Bugs

Encontrou um bug? [Abra uma issue](https://github.com/IslandeSilva/Whatsapp-Extension/issues)

## 📝 Licença

MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes

## 👨‍💻 Autor

**IslandeSilva**
- GitHub: [@IslandeSilva](https://github.com/IslandeSilva)

---

**Nota**: Esta extensão não é afiliada ao WhatsApp ou Meta. É um projeto independente e open source.