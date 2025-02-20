import { api } from './api'
import { Song } from '../types'
import { mockSongs } from './mockData'
import { logError } from '../utils/logger'
import { ROUTES } from '../routes/paths'

// Convertimos localMockSongs a una variable privada del módulo
let _localMockSongs = [...mockSongs]

export const songService = {
  getAllSongs: async (): Promise<Song[]> => {
    try {
      return Promise.resolve([..._localMockSongs])
    } catch (error) {
      logError('Error al obtener canciones:', error)
      throw new Error('No se pudieron cargar las canciones')
    }
  },

  createSong: async (songData: Omit<Song, 'id'>): Promise<Song> => {
    try {
      const newSong: Song = {
        ...songData,
        id: Math.max(..._localMockSongs.map(s => s.id), 0) + 1,
      }
      _localMockSongs = [..._localMockSongs, newSong]
      return Promise.resolve({ ...newSong })
    } catch (error) {
      logError('Error al crear canción:', error)
      throw new Error('No se pudo crear la canción')
    }
  },

  updateSong: async (id: number, songData: Partial<Song>): Promise<Song> => {
    try {
      const songIndex = _localMockSongs.findIndex(song => song.id === id)
      if (songIndex === -1) throw new Error('Canción no encontrada')

      const updatedSong = {
        ..._localMockSongs[songIndex],
        ...songData,
      }
      _localMockSongs = _localMockSongs.map(song =>
        song.id === id ? updatedSong : song
      )
      return Promise.resolve({ ...updatedSong })
    } catch (error) {
      logError('Error al actualizar canción:', error)
      throw new Error('No se pudo actualizar la canción')
    }
  },

  deleteSong: async (id: number): Promise<void> => {
    try {
      const songIndex = _localMockSongs.findIndex(song => song.id === id)
      if (songIndex === -1) throw new Error('Canción no encontrada')

      _localMockSongs = _localMockSongs.filter(song => song.id !== id)
      return Promise.resolve()
    } catch (error) {
      logError('Error al eliminar canción:', error)
      throw new Error('No se pudo eliminar la canción')
    }
  },

  uploadAudio: async (file: File): Promise<string> => {
    try {
      const formData = new FormData()
      formData.append('audio', file)
      const response = await api.post('/upload/audio', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data.url
    } catch (error) {
      logError('Error al subir audio:', error)
      throw new Error('No se pudo subir el archivo de audio')
    }
  },

  uploadCover: async (file: File): Promise<string> => {
    try {
      const formData = new FormData()
      formData.append('cover', file)
      const response = await api.post('/upload/cover', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data.url
    } catch (error) {
      logError('Error al subir portada:', error)
      throw new Error('No se pudo subir la imagen de portada')
    }
  },
}
