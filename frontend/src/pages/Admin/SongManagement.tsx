import { FC, useState } from 'react'
import ImportForm from '../../components/SongImport/ImportForm'
import { Song } from '../../types'
import { songService } from '../../services/songService'
import { cloudinaryService } from '../../services/cloudinaryService'

const SongManagement: FC = () => {
  const [importErrors, setImportErrors] = useState<string[]>([])
  const [importedSongs, setImportedSongs] = useState<Song[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [newSong, setNewSong] = useState<Partial<Song>>({
    title: '',
    artist: '',
    genre: '',
    year: undefined,
    duration: undefined,
    url: '',
    coverUrl: ''
  })

  const handleImportSuccess = (songs: Song[]) => {
    setImportedSongs(songs)
    setImportErrors([])
  }

  const handleImportError = (errors: string[]) => {
    setImportErrors(errors)
    setImportedSongs([])
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewSong(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return

    const file = e.target.files[0]
    setIsLoading(true)

    try {
      const url = e.target.name === 'audioFile' 
        ? await cloudinaryService.uploadAudio(file)
        : await cloudinaryService.uploadCover(file)

      setNewSong(prev => ({
        ...prev,
        [e.target.name === 'audioFile' ? 'url' : 'coverUrl']: url
      }))
    } catch (error) {
      setImportErrors([error instanceof Error ? error.message : 'Error al subir el archivo'])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSingleSongSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const savedSong = await songService.createSong(newSong as Omit<Song, 'id'>)
      setImportedSongs(prev => [...prev, savedSong])
      setNewSong({
        title: '',
        artist: '',
        genre: '',
        year: undefined,
        duration: undefined,
        url: '',
        coverUrl: ''
      })
    } catch (error) {
      setImportErrors(['Error al guardar la canción'])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-[#121212] min-h-screen">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-white">Gestión de Canciones</h1>
        
        {/* Formulario de carga individual */}
        <div className="mb-8 bg-[#282828] rounded-lg p-6 shadow-lg">
          <h2 className="text-xl mb-4 text-white">Agregar Nueva Canción</h2>
          <form onSubmit={handleSingleSongSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Título</label>
                <input
                  type="text"
                  name="title"
                  value={newSong.title}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-[#3E3E3E] text-white rounded border-0 focus:ring-2 focus:ring-[#1db954] text-sm"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Artista</label>
                <input
                  type="text"
                  name="artist"
                  value={newSong.artist}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-[#3E3E3E] text-white rounded border-0 focus:ring-2 focus:ring-[#1db954] text-sm"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Género</label>
                <input
                  type="text"
                  name="genre"
                  value={newSong.genre}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-[#3E3E3E] text-white rounded border-0 focus:ring-2 focus:ring-[#1db954] text-sm"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Año</label>
                <input
                  type="number"
                  name="year"
                  value={newSong.year || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-[#3E3E3E] text-white rounded border-0 focus:ring-2 focus:ring-[#1db954] text-sm"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Duración (segundos)</label>
                <input
                  type="number"
                  name="duration"
                  value={newSong.duration || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-[#3E3E3E] text-white rounded border-0 focus:ring-2 focus:ring-[#1db954] text-sm"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Archivo de Audio</label>
                <input
                  type="file"
                  name="audioFile"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  className="w-full p-2 bg-[#3E3E3E] text-white rounded border-0 focus:ring-2 focus:ring-[#1db954] text-sm"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Imagen de Portada</label>
                <input
                  type="file"
                  name="coverFile"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="w-full p-2 bg-[#3E3E3E] text-white rounded border-0 focus:ring-2 focus:ring-[#1db954] text-sm"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full p-2 bg-[#1db954] text-white rounded hover:bg-[#1ed760] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
            >
              {isLoading ? 'Guardando...' : 'Guardar Canción'}
            </button>
          </form>
        </div>

        {/* Formulario de importación masiva */}
        <div className="mb-8 bg-[#282828] rounded-lg p-6 shadow-lg">
          <h2 className="text-xl mb-4 text-white">Importar Canciones (CSV)</h2>
          <ImportForm
            onImportSuccess={handleImportSuccess}
            onImportError={handleImportError}
          />
        </div>

        {/* Mensajes de error */}
        {importErrors.length > 0 && (
          <div className="mb-8 p-4 bg-red-900/50 border border-red-500 rounded">
            <h3 className="text-red-400 font-semibold mb-2">Errores de importación:</h3>
            <ul className="list-disc pl-5 space-y-1">
              {importErrors.map((error, index) => (
                <li key={index} className="text-red-300 text-sm">{error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Lista de canciones importadas */}
        {importedSongs.length > 0 && (
          <div className="bg-[#282828] rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-xl text-white">Canciones Importadas</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#1db954]/10">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Portada</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Título</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Artista</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Género</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Año</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Duración</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {importedSongs.map((song, index) => (
                    <tr key={index} className="hover:bg-[#3E3E3E] transition-colors">
                      <td className="px-4 py-2">
                        <img src={song.coverUrl} alt={song.title} className="w-10 h-10 rounded object-cover" />
                      </td>
                      <td className="px-4 py-2 text-sm text-white">{song.title}</td>
                      <td className="px-4 py-2 text-sm text-gray-300">{song.artist}</td>
                      <td className="px-4 py-2 text-sm text-gray-300">{song.genre}</td>
                      <td className="px-4 py-2 text-sm text-gray-300">{song.year}</td>
                      <td className="px-4 py-2 text-sm text-gray-300">
                        {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}
                      </td>
                      <td className="px-4 py-2">
                        <button className="text-[#1db954] hover:text-[#1ed760] text-sm">
                          Editar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SongManagement
