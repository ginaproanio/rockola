import { Song } from '../types'

export const validateSongData = (song: Partial<Song>): string[] => {
  const errors: string[] = []
  
  if (!song.title) errors.push('Title is required')
  if (!song.artist) errors.push('Artist is required')
  if (!song.url) errors.push('URL is required')
  if (!song.duration || song.duration <= 0) errors.push('Valid duration is required')
  
  return errors
}

export const parseCsvToSongs = (csv: string): { songs: Song[], errors: string[] } => {
  const errors: string[] = []
  const songs: Song[] = []
  
  const lines = csv.split('\n').filter(line => line.trim())
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase())
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim())
    const song: Partial<Song> = {}
    
    headers.forEach((header, index) => {
      switch(header) {
        case 'title':
          song.title = values[index]
          break
        case 'artist':
          song.artist = values[index]
          break
        case 'url':
          song.url = values[index]
          break
        case 'coverurl':
          song.coverUrl = values[index]
          break
        case 'duration':
          song.duration = parseInt(values[index])
          break
        case 'year':
          song.year = parseInt(values[index])
          break
        case 'genre':
          song.genre = values[index]
          break
      }
    })
    
    const validationErrors = validateSongData(song)
    if (validationErrors.length === 0) {
      songs.push(song as Song)
    } else {
      errors.push(`Row ${i + 1}: ${validationErrors.join(', ')}`)
    }
  }
  
  return { songs, errors }
}