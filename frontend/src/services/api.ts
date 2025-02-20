import axios from 'axios'
import { mockSongs } from './mockData'
import { Song } from '../types'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

// Interfaces para las respuestas
interface AuthResponse {
  id: number
  username: string
  email: string
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
  username: 'usuario_prueba',
  email: 'prueba@example.com',
  password: 'password123',
} as const

export const authService = {
  login: async (
    username: string,
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    try {
      console.log('Intentando login con:', { username, email, password })
      console.log('Comparando con:', TEST_CREDENTIALS)

      if (
        username === TEST_CREDENTIALS.username &&
        email === TEST_CREDENTIALS.email &&
        password === TEST_CREDENTIALS.password
      ) {
        const mockUser: AuthResponse = {
          id: 1,
          username: TEST_CREDENTIALS.username,
          email: TEST_CREDENTIALS.email,
        }

        localStorage.setItem('token', 'mock-token-123')
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
