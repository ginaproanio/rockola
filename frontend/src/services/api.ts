import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Credenciales de prueba
const TEST_CREDENTIALS = {
  username: 'usuario_prueba',
  email: 'prueba@example.com',
  password: 'password123'
}

export const authService = {
  login: async (username: string, email: string, password: string) => {
    // Validación de credenciales de prueba
    if (username === TEST_CREDENTIALS.username && 
        email === TEST_CREDENTIALS.email && 
        password === TEST_CREDENTIALS.password) {
      
      const mockUser = {
        id: 1,
        username: TEST_CREDENTIALS.username,
        email: TEST_CREDENTIALS.email
      }
      
      localStorage.setItem('token', 'mock-token-123')
      return mockUser
    }
    
    throw new Error('Credenciales incorrectas')
  },

  logout: () => {
    localStorage.removeItem('token')
  }
}
