import axios from 'axios'

// Função para verificar se estamos no cliente
const isClient = typeof window !== 'undefined'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // Incluir cookies nas requisições
})

api.interceptors.request.use(
  config => {
    // Com cookies HTTP-only, não precisamos adicionar o token manualmente
    // O navegador enviará automaticamente os cookies
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

// Interceptor para tratar erros de autenticação
api.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response?.status === 401 && isClient) {
      // Token expirado ou inválido - redirecionar para login apenas se não estiver já na página de login
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  },
)
