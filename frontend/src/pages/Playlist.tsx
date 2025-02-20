import { FC, useState, useRef, useEffect } from 'react'
import { Song } from '../types'

const Playlist: FC = () => {
  // Estados para el reproductor y playlist
  const [currentPlaylist, setCurrentPlaylist] = useState<Song[]>([])
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Efecto para cargar la playlist inicial
  useEffect(() => {
    // Aquí cargaríamos las canciones desde el servicio
    const loadPlaylist = async () => {
      try {
        // Temporalmente usando mockSongs
        const response = await fetch('/api/playlist')
        const songs = await response.json()
        setCurrentPlaylist(songs)
      } catch (error) {
        console.error('Error loading playlist:', error)
      }
    }
    loadPlaylist()
  }, [])

  // Efecto para reiniciar la playlist cuando termina
  useEffect(() => {
    if (currentSongIndex >= currentPlaylist.length) {
      setCurrentSongIndex(0)
    }
  }, [currentSongIndex, currentPlaylist.length])

  // Funciones de control
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
      setDuration(audioRef.current.duration)
    }
  }

  const handleSongEnd = () => {
    setCurrentSongIndex(prev => (prev + 1) % currentPlaylist.length)
  }

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const playNext = () => {
    setCurrentSongIndex(prev => (prev + 1) % currentPlaylist.length)
  }

  const playPrevious = () => {
    setCurrentSongIndex(prev => (prev - 1 + currentPlaylist.length) % currentPlaylist.length)
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = (newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume
      setVolume(newVolume)
    }
  }

  const removeSong = (indexToRemove: number) => {
    setCurrentPlaylist(prev => prev.filter((_, index) => index !== indexToRemove))
    if (indexToRemove < currentSongIndex) {
      setCurrentSongIndex(prev => prev - 1)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Mi Playlist</h1>

        {/* Lista de canciones */}
        <div className="bg-[#282828] rounded-lg p-4 mb-20">
          {currentPlaylist.length > 0 ? (
            currentPlaylist.map((song, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 hover:bg-[#3e3e3e] rounded ${
                  currentSongIndex === index ? 'bg-[#3e3e3e]' : ''
                }`}
              >
                <div className="flex items-center flex-1">
                  <img 
                    src={song.coverUrl} 
                    alt={song.title} 
                    className="w-12 h-12 rounded mr-4"
                  />
                  <div>
                    <h3 className="text-white font-medium">{song.title}</h3>
                    <p className="text-gray-400 text-sm">{song.artist}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-gray-400">
                  <span>{song.genre}</span>
                  <span>{song.year}</span>
                  <span>{formatTime(song.duration)}</span>
                  <button
                    onClick={() => removeSong(index)}
                    className="text-red-500 hover:text-red-600"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center py-8">
              No hay canciones en la playlist
            </p>
          )}
        </div>

        {/* Reproductor */}
        <div className="fixed bottom-0 left-0 right-0 bg-[#282828] p-4">
          <audio
            ref={audioRef}
            src={currentPlaylist[currentSongIndex]?.url}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleSongEnd}
            onLoadedMetadata={handleTimeUpdate}
            hidden
          />

          <div className="max-w-4xl mx-auto">
            {/* Info de la canción actual */}
            {currentPlaylist[currentSongIndex] && (
              <div className="flex items-center mb-4">
                <img
                  src={currentPlaylist[currentSongIndex].coverUrl}
                  alt="cover"
                  className="w-14 h-14 rounded mr-4"
                />
                <div>
                  <h4 className="text-white">{currentPlaylist[currentSongIndex].title}</h4>
                  <p className="text-gray-400 text-sm">
                    {currentPlaylist[currentSongIndex].artist}
                  </p>
                </div>
              </div>
            )}

            {/* Controles */}
            <div className="flex items-center justify-center gap-4 mb-2">
              <button
                onClick={playPrevious}
                className="text-white hover:text-green-500"
              >
                ⏮️
              </button>
              <button
                onClick={togglePlay}
                className="text-white bg-green-500 rounded-full p-3 hover:bg-green-600"
              >
                {isPlaying ? '⏸️' : '▶️'}
              </button>
              <button
                onClick={playNext}
                className="text-white hover:text-green-500"
              >
                ⏭️
              </button>
              <button
                onClick={toggleMute}
                className="text-white hover:text-green-500"
              >
                {isMuted ? '🔇' : '🔊'}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-24"
              />
            </div>

            {/* Barra de progreso */}
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>{formatTime(currentTime)}</span>
              <div className="flex-1 h-1 bg-gray-600 rounded-full">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Playlist
