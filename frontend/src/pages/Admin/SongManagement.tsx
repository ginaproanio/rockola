import { FC, useState } from 'react'
import ImportForm from '../../components/SongImport/ImportForm'
import { Song } from '../../types'

const SongManagement: FC = () => {
  const [importErrors, setImportErrors] = useState<string[]>([])
  const [importedSongs, setImportedSongs] = useState<Song[]>([])

  const handleImportSuccess = (songs: Song[]) => {
    setImportedSongs(songs)
    setImportErrors([])
  }

  const handleImportError = (errors: string[]) => {
    setImportErrors(errors)
    setImportedSongs([])
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Song Management</h1>
      
      <div className="mb-8">
        <h2 className="text-xl mb-4">Import Songs</h2>
        <ImportForm
          onImportSuccess={handleImportSuccess}
          onImportError={handleImportError}
        />
      </div>

      {importErrors.length > 0 && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded">
          <h3 className="text-red-700 font-semibold mb-2">Import Errors:</h3>
          <ul className="list-disc pl-5">
            {importErrors.map((error, index) => (
              <li key={index} className="text-red-600">{error}</li>
            ))}
          </ul>
        </div>
      )}

      {importedSongs.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl mb-4">Imported Songs</h3>
          <div className="bg-white shadow rounded">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left">Title</th>
                  <th className="px-6 py-3 text-left">Artist</th>
                  <th className="px-6 py-3 text-left">Genre</th>
                  <th className="px-6 py-3 text-left">Year</th>
                </tr>
              </thead>
              <tbody>
                {importedSongs.map((song, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-6 py-4">{song.title}</td>
                    <td className="px-6 py-4">{song.artist}</td>
                    <td className="px-6 py-4">{song.genre}</td>
                    <td className="px-6 py-4">{song.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default SongManagement