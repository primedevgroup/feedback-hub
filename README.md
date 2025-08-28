# Feedback Hub

Uma plataforma para envio e recebimento de feedbacks anônimos.

## 🚀 Configuração Rápida

### 1. Instalar Dependências
```bash
pnpm install
```

### 2. Configurar Variáveis de Ambiente
Crie um arquivo `.env.local` na raiz do projeto:

```env
# API Configuration
NEXT_PUBLIC_API_URL="http://localhost:3333"

# Google OAuth Configuration
# Obtenha o Client ID em: https://console.cloud.google.com/apis/credentials
NEXT_PUBLIC_GOOGLE_CLIENT_ID="seu_client_id_aqui"
```

### 3. Configurar Google OAuth
Siga as instruções em [GOOGLE_OAUTH_SETUP.md](./GOOGLE_OAUTH_SETUP.md)

### 4. Executar o Projeto
```bash
pnpm dev
```

## 🔧 Tecnologias

- **Frontend**: Next.js 14, React, TypeScript
- **UI**: Radix UI, Tailwind CSS
- **Autenticação**: Google OAuth
- **Estado**: React Context, React Query
- **Estilização**: CSS Modules, Tailwind CSS

## 📁 Estrutura do Projeto

```
src/
├── app/                 # App Router do Next.js
├── components/          # Componentes reutilizáveis
├── contexts/           # Contextos React
├── hooks/              # Hooks customizados
├── lib/                # Utilitários e configurações
└── @types/             # Definições de tipos TypeScript
```

## 🚨 Solução de Problemas

### Erro "Missing required parameter: client_id"
Este erro ocorre quando a variável `NEXT_PUBLIC_GOOGLE_CLIENT_ID` não está configurada no arquivo `.env.local`.

**Solução:**
1. Verifique se o arquivo `.env.local` existe
2. Configure `NEXT_PUBLIC_GOOGLE_CLIENT_ID` com um Client ID válido do Google
3. Reinicie o servidor de desenvolvimento

### Sessão perdida ao recarregar
Este problema foi corrigido implementando verificação de ambiente e gerenciamento adequado do estado de autenticação.

## 📝 Licença

MIT