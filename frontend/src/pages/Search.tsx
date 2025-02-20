import { FC, useState, useEffect } from 'react'
import { songService } from '../services/api'
import { Song } from '../types'
import './Search.css'

const Search: FC = () => {
  const [searchParams, setSearchParams] = useState({
    title: '',
    artist: '',
    genre: ''
  })
  const [songs, setSongs] = useState<Song[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async () => {
    setIsLoading(true)
    try {
      const results = await songService.search(searchParams)
      setSongs(results)
    } finally {
      setIsLoading(false)
    }
  }

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="search-page">
      <h1>Búsqueda de Canciones</h1>
      
      <div className="search-controls">
        <input
          type="text"
          value={searchParams.title}
          onChange={(e) => setSearchParams({...searchParams, title: e.target.value})}
          placeholder="Nombre de la canción"
          className="search-input"
        />
        <input
          type="text"
          value={searchParams.artist}
          onChange={(e) => setSearchParams({...searchParams, artist: e.target.value})}
          placeholder="Nombre del artista"
          className="search-input"
        />
        <select
          value={searchParams.genre}
          onChange={(e) => setSearchParams({...searchParams, genre: e.target.value})}
          className="search-select"
        >
          <option value="">Todos los géneros</option>
          <option value="rock">Rock</option>
          <option value="pop">Pop</option>
          <option value="jazz">Jazz</option>
          <option value="classical">Clásica</option>
        </select>
        <button onClick={handleSearch} className="search-button">
          🔍 Buscar
        </button>
      </div>

      {isLoading ? (
        <div className="search-loading">Buscando canciones...</div>
      ) : (
        <div className="search-results">
          {songs.map(song => (
            <div key={song.id} className="song-card">
              <img 
                src={song.coverUrl} 
                alt={`Carátula de ${song.title}`}
                className="song-cover"
              />
              <div className="song-info">
                <div className="song-header">
                  <h3 className="song-title">{song.title}</h3>
                  <p className="song-artist">{song.artist}</p>
                </div>
                <div className="song-details">
                  <span className="song-detail-item">
                    🎵 {song.genre}
                  </span>
                  <span className="song-detail-item">
                    📅 {song.year}
                  </span>
                  <span className="song-detail-item">
                    ⏱️ {formatDuration(song.duration)}
                  </span>
                </div>
                <div className="song-controls">
                  <button className="play-button">
                    ▶️ Reproducir
                  </button>
                  <button className="add-to-playlist">
                    + Lista
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Search
