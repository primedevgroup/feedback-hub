# Configuração do Google OAuth

## 1. Criar Projeto no Google Cloud Console

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Ative a API do Google+ 

## 2. Configurar Credenciais OAuth

1. Vá para **APIs & Services** > **Credentials**
2. Clique em **Create Credentials** > **OAuth 2.0 Client IDs**
3. Configure o tipo de aplicação como **Web application**
4. Adicione as URLs autorizadas:
   - **Authorized JavaScript origins**: `http://localhost:3000`
   - **Authorized redirect URIs**: `http://localhost:3000`

## 3. Configurar Variável de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com:

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=seu_client_id_aqui
```

## 4. Como Funciona

1. **Usuário clica em "Login com Google"**
2. **Redirecionamento**: Usuário é redirecionado para Google
3. **Autorização**: Usuário autoriza o app
4. **Callback**: Google retorna um `idToken`
5. **Backend**: Seu backend valida o token em `/auth/signin/google`
6. **Login**: Usuário é logado no sistema

## 5. Estrutura da Requisição

```json
{
  "provider": "google",
  "idToken": "token_do_google_aqui"
}
```

## 6. Resposta Esperada

```json
{
  "access_token": "seu_jwt_token",
  "user": {
    "id": "user_id",
    "name": "Nome do Usuário",
    "email": "email@exemplo.com"
  }
}
``` 