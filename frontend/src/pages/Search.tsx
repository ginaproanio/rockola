import { FC, useState } from 'react'
import { songService } from '../services/api'
import { Song } from '../types'

const Search: FC = () => {
  const [searchParams, setSearchParams] = useState({
    title: '',
    artist: '',
    genre: '',
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
    <div className="min-h-screen bg-gradient-to-b from-[#282828] to-[#121212] px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Búsqueda de Canciones
        </h1>

        <div className="bg-[#1a1a1a]/80 backdrop-blur-sm rounded-xl p-6 mb-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              value={searchParams.title}
              onChange={e =>
                setSearchParams({ ...searchParams, title: e.target.value })
              }
              placeholder="Nombre de la canción"
              className="w-full px-4 py-3 bg-[#282828] text-white rounded-lg focus:ring-2 focus:ring-[#1db954] focus:outline-none transition-all"
            />
            <input
              type="text"
              value={searchParams.artist}
              onChange={e =>
                setSearchParams({ ...searchParams, artist: e.target.value })
              }
              placeholder="Nombre del artista"
              className="w-full px-4 py-3 bg-[#282828] text-white rounded-lg focus:ring-2 focus:ring-[#1db954] focus:outline-none transition-all"
            />
            <select
              value={searchParams.genre}
              onChange={e =>
                setSearchParams({ ...searchParams, genre: e.target.value })
              }
              className="w-full px-4 py-3 bg-[#282828] text-white rounded-lg focus:ring-2 focus:ring-[#1db954] focus:outline-none transition-all"
            >
              <option value="">Todos los géneros</option>
              <option value="rock">Rock</option>
              <option value="pop">Pop</option>
              <option value="jazz">Jazz</option>
              <option value="classical">Clásica</option>
            </select>
          </div>
          <button
            onClick={handleSearch}
            className="w-full md:w-auto mt-4 px-8 py-3 bg-[#1db954] hover:bg-[#1ed760] text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <span>🔍</span> Buscar
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#1db954] border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {songs.map(song => (
              <div
                key={song.id}
                className="bg-[#1a1a1a] rounded-xl overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300 shadow-lg"
              >
                <img
                  src={song.coverUrl}
                  alt={`Carátula de ${song.title}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {song.title}
                    </h3>
                    <p className="text-[#1db954]">{song.artist}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-[#282828] rounded-full text-sm text-gray-300">
                      🎵 {song.genre}
                    </span>
                    <span className="px-2 py-1 bg-[#282828] rounded-full text-sm text-gray-300">
                      📅 {song.year}
                    </span>
                    <span className="px-2 py-1 bg-[#282828] rounded-full text-sm text-gray-300">
                      ⏱️ {formatDuration(song.duration)}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-[#1db954] hover:bg-[#1ed760] text-white rounded-lg transition-colors">
                      ▶️ Reproducir
                    </button>
                    <button className="flex-1 px-4 py-2 bg-[#282828] hover:bg-[#333] text-white rounded-lg transition-colors">
                      + Lista
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Search
