import { FC, useState, useRef, useEffect } from 'react'
import { Song } from '../types'
import { songService } from '../services/songService'

const Playlist: FC = () => {
  const [playlist, setPlaylist] = useState<Song[]>([])
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    loadPlaylist()
  }, [])

  const loadPlaylist = async () => {
    try {
      const songs = await songService.getAllSongs()
      setPlaylist(songs)
    } catch (error) {
      console.error('Error loading playlist:', error)
    }
  }

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleNext = () => {
    const nextIndex = (currentSongIndex + 1) % playlist.length
    setCurrentSongIndex(nextIndex)
  }

  const handlePrevious = () => {
    const prevIndex = currentSongIndex === 0 ? playlist.length - 1 : currentSongIndex - 1
    setCurrentSongIndex(prevIndex)
  }

  const handleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleEnded = () => {
    handleNext() // Reproducción secuencial
  }

  return (
    <div className="bg-[#282828] p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Mi Lista de Reproducción</h1>
      
      {/* Reproductor */}
      <div className="bg-[#181818] p-4 rounded-lg mb-6">
        {playlist[currentSongIndex] && (
          <div className="flex items-center space-x-4">
            <img 
              src={playlist[currentSongIndex].coverUrl} 
              alt="Cover" 
              className="w-20 h-20 rounded"
            />
            <div>
              <h2 className="text-lg font-semibold">{playlist[currentSongIndex].title}</h2>
              <p className="text-gray-400">{playlist[currentSongIndex].artist}</p>
            </div>
          </div>
        )}
        
        <audio
          ref={audioRef}
          src={playlist[currentSongIndex]?.url}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          onLoadedMetadata={() => audioRef.current && setDuration(audioRef.current.duration)}
        />

        {/* Controles */}
        <div className="flex items-center justify-center space-x-4 mt-4">
          <button onClick={handlePrevious} className="text-[#1db954] hover:text-white">
            ⏮️
          </button>
          <button onClick={handlePlayPause} className="text-[#1db954] hover:text-white text-2xl">
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          <button onClick={handleNext} className="text-[#1db954] hover:text-white">
            ⏭️
          </button>
          <button onClick={handleMute} className="text-[#1db954] hover:text-white">
            {isMuted ? '🔇' : '🔊'}
          </button>
        </div>

        {/* Barra de progreso */}
        <div className="mt-4 bg-gray-600 rounded-full h-1">
          <div 
            className="bg-[#1db954] h-1 rounded-full"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
        </div>
      </div>

      {/* Lista de canciones */}
      <div className="bg-[#181818] rounded-lg">
        {playlist.map((song, index) => (
          <div 
            key={song.id}
            className={`flex items-center p-4 hover:bg-[#282828] cursor-pointer ${
              index === currentSongIndex ? 'bg-[#282828]' : ''
            }`}
            onClick={() => setCurrentSongIndex(index)}
          >
            <img src={song.coverUrl} alt="Cover" className="w-12 h-12 rounded mr-4" />
            <div>
              <h3 className="font-medium">{song.title}</h3>
              <p className="text-gray-400 text-sm">{song.artist}</p>
            </div>
            <span className="ml-auto text-gray-400">{Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Playlist
