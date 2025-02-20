import axios from 'axios'
import { mockSongs } from './mockData'
import { Song } from '../types'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

// Interfaces para las respuestas
interface AuthResponse {
  id: number
  username: string
  email: string
  role: 'admin' | 'user'
}

interface ApiError {
  message: string
  code?: string
}

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Credenciales de prueba
const TEST_CREDENTIALS = {
  admin: {
    username: 'admin_rockola',
    email: 'admin@rockola.com',
    password: 'admin123',
    role: 'admin'
  },
  user: {
    username: 'usuario_prueba',
    email: 'prueba@example.com',
    password: 'password123',
    role: 'user'
  }
} as const

export const authService = {
  login: async (
    username: string,
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    try {
      console.log('Intentando login con:', { username, email, password })

      // Verificar credenciales de admin
      if (
        username === TEST_CREDENTIALS.admin.username &&
        email === TEST_CREDENTIALS.admin.email &&
        password === TEST_CREDENTIALS.admin.password
      ) {
        const mockAdmin: AuthResponse = {
          id: 1,
          username: TEST_CREDENTIALS.admin.username,
          email: TEST_CREDENTIALS.admin.email,
          role: TEST_CREDENTIALS.admin.role
        }
        localStorage.setItem('token', 'mock-admin-token-123')
        return mockAdmin
      }

      // Verificar credenciales de usuario regular
      if (
        username === TEST_CREDENTIALS.user.username &&
        email === TEST_CREDENTIALS.user.email &&
        password === TEST_CREDENTIALS.user.password
      ) {
        const mockUser: AuthResponse = {
          id: 2,
          username: TEST_CREDENTIALS.user.username,
          email: TEST_CREDENTIALS.user.email,
          role: TEST_CREDENTIALS.user.role
        }
        localStorage.setItem('token', 'mock-user-token-123')
        return mockUser
      }

      throw new Error('Credenciales incorrectas')
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error de autenticación: ${error.message}`)
      }
      throw new Error('Error de autenticación desconocido')
    }
  },

  logout: (): void => {
    localStorage.removeItem('token')
  },
}

interface SearchParams {
  title?: string
  artist?: string
  genre?: string
}

export const songService = {
  search: async (params: SearchParams): Promise<Song[]> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500))

      if (!params.title && !params.artist && !params.genre) {
        return mockSongs
      }

      return mockSongs.filter(song => {
        const matchTitle =
          !params.title ||
          song.title.toLowerCase().includes(params.title.toLowerCase())
        const matchArtist =
          !params.artist ||
          song.artist.toLowerCase().includes(params.artist.toLowerCase())
        const matchGenre =
          !params.genre ||
          song.genre.toLowerCase() === params.genre.toLowerCase()

        return matchTitle && matchArtist && matchGenre
      })
    } catch (error) {
      const apiError: ApiError = {
        message:
          error instanceof Error ? error.message : 'Error en la búsqueda',
        code: 'SEARCH_ERROR',
      }
      throw apiError
    }
  },
}
