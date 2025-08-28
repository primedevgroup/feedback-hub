import axios from 'axios'

// Função para verificar se estamos no cliente
const isClient = typeof window !== 'undefined'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

api.interceptors.request.use(
  config => {
    if (isClient) {
      const token = localStorage.getItem('auth_token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
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
      // Token expirado ou inválido
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)
