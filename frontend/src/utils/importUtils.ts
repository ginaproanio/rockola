import { Song } from '../types'

export const validateSongData = (song: Partial<Song>): string[] => {
  const errors: string[] = []
  
  if (!song.title) errors.push('Title is required')
  if (!song.artist) errors.push('Artist is required')
  if (!song.genre) errors.push('Genre is required')
  if (!song.year || isNaN(Number(song.year))) errors.push('Valid year is required')
  if (!song.duration || isNaN(Number(song.duration))) errors.push('Valid duration is required')
  if (!song.url) errors.push('URL is required')
  
  return errors
}

export const parseCsvToSongs = (csv: string): { songs: Song[], errors: string[] } => {
  const errors: string[] = []
  const songs: Song[] = []
  
  const lines = csv.split('\n').filter(line => line.trim())
  const headers = lines[0].toLowerCase().split(',').map(h => h.trim())
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim())
    const songData: any = {}
    
    headers.forEach((header, index) => {
      songData[header] = values[index]
    })

    // Convertir valores numéricos
    songData.year = parseInt(songData.year)
    songData.duration = parseInt(songData.duration)
    
    const validationErrors = validateSongData(songData)
    if (validationErrors.length > 0) {
      errors.push(`Row ${i + 1}: ${validationErrors.join(', ')}`)
      continue
    }
    
    songs.push(songData as Song)
  }
  
  return { songs, errors }
}
