import axios from 'axios'
import { mockSongs } from './mockData'
import { Song } from '../types'

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
  password: 'password123',
}

export const authService = {
  login: async (username: string, email: string, password: string) => {
    // Agregamos un console.log para debug
    console.log('Intentando login con:', { username, email, password })
    console.log('Comparando con:', TEST_CREDENTIALS)

    if (
      username === TEST_CREDENTIALS.username &&
      email === TEST_CREDENTIALS.email &&
      password === TEST_CREDENTIALS.password
    ) {
      const mockUser = {
        id: 1,
        username: TEST_CREDENTIALS.username,
        email: TEST_CREDENTIALS.email,
      }

      localStorage.setItem('token', 'mock-token-123')
      return mockUser
    }

    throw new Error('Credenciales incorrectas')
  },

  logout: () => {
    localStorage.removeItem('token')
  },
}

export const songService = {
  search: async (params: {
    title?: string
    artist?: string
    genre?: string
  }): Promise<Song[]> => {
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
        !params.genre || song.genre.toLowerCase() === params.genre.toLowerCase()

      return matchTitle && matchArtist && matchGenre
    })
  },
}
