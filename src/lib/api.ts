import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://feedback-hub-back-end.onrender.com',
})
