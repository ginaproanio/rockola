import { FC, useState, useRef, useEffect } from 'react'
import { Song } from '../types'

const Playlist: FC = () => {
  // Estados para el reproductor
  const [currentPlaylist, setCurrentPlaylist] = useState<Song[]>([])
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Funciones de control
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
      setDuration(audioRef.current.duration)
    }
  }

  const handleSongEnd = () => {
    if (currentSongIndex < currentPlaylist.length - 1) {
      setCurrentSongIndex(prev => prev + 1)
    } else {
      setIsPlaying(false)
    }
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
                className={`flex items-center p-2 hover:bg-[#3e3e3e] rounded ${
                  currentSongIndex === index ? 'bg-[#3e3e3e]' : ''
                }`}
                onClick={() => setCurrentSongIndex(index)}
              >
                <span className="text-white">{song.title}</span>
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
            {/* Controles */}
            <div className="flex items-center justify-center gap-4 mb-2">
              <button
                onClick={togglePlay}
                className="text-white bg-green-500 rounded-full p-3 hover:bg-green-600"
              >
                {isPlaying ? 'Pause' : 'Play'}
              </button>
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
